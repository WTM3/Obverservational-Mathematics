//
// ContactManager.swift
// iOS Native Contact Integration
//
// This class handles ONLY iOS native contact functionality
// NO BLF/AMF processing - that stays in JavaScript
//

import Foundation
import Contacts
import SwiftUI

#if canImport(ContactsUI) && canImport(UIKit)
import ContactsUI
import UIKit
#endif

@MainActor
class ContactManager: NSObject, ObservableObject {
    @Published var contacts: [BLFContact] = []
    @Published var hasContactsPermission = false
    
    private let contactStore = CNContactStore()
    
    override init() {
        super.init()
        requestContactsPermission()
    }
    
    // MARK: - Contacts Permission (iOS Native Only)
    func requestContactsPermission() {
        let authorizationStatus = CNContactStore.authorizationStatus(for: .contacts)
        
        switch authorizationStatus {
        case .authorized:
            hasContactsPermission = true
            loadContacts()
        case .notDetermined:
            contactStore.requestAccess(for: .contacts) { [weak self] granted, error in
                DispatchQueue.main.async {
                    self?.hasContactsPermission = granted
                    if granted {
                        self?.loadContacts()
                    }
                }
            }
        case .denied, .restricted:
            hasContactsPermission = false
        @unknown default:
            hasContactsPermission = false
        }
    }
    
    // MARK: - Load iOS Contacts (Native Functionality)
    private func loadContacts() {
        let keys = [
            CNContactGivenNameKey,
            CNContactFamilyNameKey,
            CNContactPhoneNumbersKey,
            CNContactEmailAddressesKey,
            CNContactNoteKey
        ] as [CNKeyDescriptor]
        
        let request = CNContactFetchRequest(keysToFetch: keys)
        
        var fetchedContacts: [BLFContact] = []
        
        do {
            try contactStore.enumerateContacts(with: request) { contact, _ in
                let blfContact = BLFContact(
                    id: contact.identifier,
                    firstName: contact.givenName,
                    lastName: contact.familyName,
                    phoneNumbers: contact.phoneNumbers.map { $0.value.stringValue },
                    emailAddresses: contact.emailAddresses.map { $0.value as String },
                    notes: contact.note,
                    cognitiveType: "Unknown" // Will be determined by JavaScript BLF engine
                )
                fetchedContacts.append(blfContact)
            }
            
            self.contacts = fetchedContacts
        } catch {
            print("Failed to fetch contacts: \(error)")
        }
    }
    
    // MARK: - Add Contact (iOS Native)
    func addContact(firstName: String, lastName: String, phoneNumber: String, completion: @escaping (Bool) -> Void) {
        let newContact = CNMutableContact()
        newContact.givenName = firstName
        newContact.familyName = lastName
        
        if !phoneNumber.isEmpty {
            let phoneNumberValue = CNPhoneNumber(stringValue: phoneNumber)
            let phoneNumberLabel = CNLabeledValue(label: CNLabelPhoneNumberMain, value: phoneNumberValue)
            newContact.phoneNumbers = [phoneNumberLabel]
        }
        
        let saveRequest = CNSaveRequest()
        saveRequest.add(newContact, toContainerWithIdentifier: nil)
        
        do {
            try contactStore.execute(saveRequest)
            loadContacts() // Refresh contacts list
            completion(true)
        } catch {
            print("Failed to save contact: \(error)")
            completion(false)
        }
    }
    
    // MARK: - Update Contact with BLF Data (Pass to JavaScript)
    func updateContactWithBLFData(contactId: String, cognitiveType: String, communicationStyle: String) {
        // Update local contact model (thin wrapper only)
        if let index = contacts.firstIndex(where: { $0.id == contactId }) {
            contacts[index].cognitiveType = cognitiveType
            contacts[index].communicationStyle = communicationStyle
        }
        
        // Note: Actual cognitive analysis is done in JavaScript BLF engine
    }
    
    // MARK: - Search Contacts (iOS Native)
    func searchContacts(query: String) -> [BLFContact] {
        guard !query.isEmpty else { return contacts }
        
        return contacts.filter { contact in
            let fullName = "\(contact.firstName) \(contact.lastName)".lowercased()
            return fullName.contains(query.lowercased()) ||
                   contact.phoneNumbers.contains { $0.contains(query) }
        }
    }
}

// MARK: - BLF Contact Model (Thin Wrapper)
struct BLFContact: Identifiable {
    let id: String
    let firstName: String
    let lastName: String
    let phoneNumbers: [String]
    let emailAddresses: [String]
    let notes: String
    var cognitiveType: String // Determined by JavaScript BLF engine
    var communicationStyle: String // Determined by JavaScript BLF engine
    
    var fullName: String {
        "\(firstName) \(lastName)".trimmingCharacters(in: .whitespaces)
    }
    
    var primaryPhoneNumber: String {
        phoneNumbers.first ?? ""
    }
    
    init(id: String, firstName: String, lastName: String, phoneNumbers: [String], emailAddresses: [String], notes: String, cognitiveType: String = "Unknown", communicationStyle: String = "Standard") {
        self.id = id
        self.firstName = firstName
        self.lastName = lastName
        self.phoneNumbers = phoneNumbers
        self.emailAddresses = emailAddresses
        self.notes = notes
        self.cognitiveType = cognitiveType
        self.communicationStyle = communicationStyle
    }
}

// MARK: - Contact Picker View (iOS Native UI)
#if canImport(ContactsUI) && canImport(UIKit)
struct ContactPickerView: UIViewControllerRepresentable {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var contactManager: ContactManager
    @EnvironmentObject var jsEngine: BLFJavaScriptEngine
    
    func makeUIViewController(context: Context) -> CNContactPickerViewController {
        let picker = CNContactPickerViewController()
        picker.delegate = context.coordinator
        picker.predicateForEnablingContact = NSPredicate(format: "phoneNumbers.@count > 0")
        return picker
    }
    
    func updateUIViewController(_ uiViewController: CNContactPickerViewController, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, CNContactPickerDelegate {
        let parent: ContactPickerView
        
        init(_ parent: ContactPickerView) {
            self.parent = parent
        }
        
        func contactPicker(_ picker: CNContactPickerViewController, didSelect contact: CNContact) {
            Task { @MainActor in
                // iOS native contact selected - pass to JavaScript for BLF processing
                let phoneNumber = contact.phoneNumbers.first?.value.stringValue ?? ""
                let fullName = "\(contact.givenName) \(contact.familyName)"
                let bio = contact.note
                
                // Register contact with JavaScript BLF engine (thin wrapper call)
                parent.jsEngine.registerContact(
                    name: fullName,
                    phoneNumber: phoneNumber,
                    bio: bio
                ) { contactId in
                    // Contact registered in JavaScript BLF engine
                    print("Contact registered with BLF: \(contactId ?? "error")")
                }
                
                parent.dismiss()
            }
        }
        
        func contactPickerDidCancel(_ picker: CNContactPickerViewController) {
            parent.dismiss()
        }
    }
}
#else
// Fallback for macOS/other platforms
struct ContactPickerView: View {
    var body: some View {
        Text("Contact picker not available on this platform")
    }
}
#endif

// MARK: - Manual Contact Entry View (iOS Native UI)
struct ManualContactEntryView: View {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var contactManager: ContactManager
    @EnvironmentObject var jsEngine: BLFJavaScriptEngine
    
    @State private var firstName = ""
    @State private var lastName = ""
    @State private var phoneNumber = ""
    @State private var bio = ""
    @State private var isLoading = false
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Contact Information")) {
                    TextField("First Name", text: $firstName)
                    TextField("Last Name", text: $lastName)
                    TextField("Phone Number", text: $phoneNumber)
                        #if os(iOS)
                        .keyboardType(.phonePad)
                        #endif
                }
                
                Section(header: Text("Communication Style Analysis")) {
                    TextField("Bio or Communication Sample", text: $bio, axis: .vertical)
                        .lineLimit(3...6)
                }
                
                Section(footer: Text("Bio will be analyzed by BLF engine for cognitive type detection")) {
                    Button("Add Contact") {
                        addContact()
                    }
                    .disabled(firstName.isEmpty || phoneNumber.isEmpty || isLoading)
                }
            }
            .navigationTitle("Add Contact")
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Save") {
                        addContact()
                    }
                    .disabled(firstName.isEmpty || phoneNumber.isEmpty || isLoading)
                }
            }
        }
    }
    
    private func addContact() {
        isLoading = true
        
        // Add to iOS contacts (native functionality)
        contactManager.addContact(
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
        ) { success in
            if success {
                // Register with JavaScript BLF engine for cognitive analysis
                jsEngine.registerContact(
                    name: "\(firstName) \(lastName)",
                    phoneNumber: phoneNumber,
                    bio: bio
                ) { contactId in
                    isLoading = false
                    dismiss()
                }
            } else {
                isLoading = false
            }
        }
    }
} 