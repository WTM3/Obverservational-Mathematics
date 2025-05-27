import Foundation
import Contacts
import SwiftUI

#if canImport(UIKit)
import UIKit
#endif

/// iMessage Dropdown @Mention Menu
/// The narrow bridge between contact chaos and communication control
/// Optimized for Boolean Mind cognitive efficiency
public class iMessageDropdownMenu: ObservableObject {
    
    // MARK: - Core Components
    @Published public var isVisible: Bool = false
    @Published public var contacts: [ContactItem] = []
    @Published public var filteredContacts: [ContactItem] = []
    @Published public var selectedContact: ContactItem?
    @Published public var searchText: String = ""
    @Published public var isSignedIn: Bool = false
    @Published public var authenticationStatus: AuthenticationStatus = .notDetermined
    
    private let contactStore = CNContactStore()
    private var socialPaddingManager: SocialPaddingManager?
    
    public enum AuthenticationStatus {
        case notDetermined
        case requesting
        case authorized
        case denied
        case restricted
    }
    
    public init() {
        checkAuthenticationStatus()
        // Automatically attempt sign-in on initialization
        autoSignIn()
    }
    
    public func setSocialPaddingManager(_ manager: SocialPaddingManager) {
        self.socialPaddingManager = manager
        print("🔗 Social padding manager connected to dropdown menu")
    }
    
    // MARK: - Authentication Flow
    
    private func autoSignIn() {
        // Automatically attempt sign-in based on current status
        Task {
            switch authenticationStatus {
            case .notDetermined:
                // Automatically request access for new users
                print("🚗 V-8 engine: Auto-requesting contacts access...")
                let _ = await requestContactsAccess()
            case .denied, .restricted:
                // For denied/restricted, automatically load mock contacts
                print("🛡️ Heat shield: Auto-loading mock contacts for testing...")
                await MainActor.run {
                    self.isSignedIn = true // Enable functionality with mock data
                }
            case .authorized:
                // Already authorized, ensure we're signed in
                await MainActor.run {
                    self.isSignedIn = true
                }
            case .requesting:
                // Already in progress, wait for completion
                break
            }
        }
    }
    
    private func checkAuthenticationStatus() {
        let status = CNContactStore.authorizationStatus(for: .contacts)
        
        DispatchQueue.main.async {
            switch status {
            case .authorized:
                self.authenticationStatus = .authorized
                self.isSignedIn = true
                self.loadContacts()
            case .denied:
                self.authenticationStatus = .denied
                self.isSignedIn = true // Enable functionality with mock contacts
                self.loadMockContacts() // Fallback for testing
            case .restricted:
                self.authenticationStatus = .restricted
                self.isSignedIn = true // Enable functionality with mock contacts
                self.loadMockContacts() // Fallback for testing
            case .notDetermined:
                self.authenticationStatus = .notDetermined
            @unknown default:
                self.authenticationStatus = .notDetermined
            }
        }
    }
    
    public func requestContactsAccess() async -> Bool {
        await MainActor.run {
            self.authenticationStatus = .requesting
        }
        
        do {
            let granted = try await contactStore.requestAccess(for: .contacts)
            
            await MainActor.run {
                if granted {
                    self.authenticationStatus = .authorized
                    self.isSignedIn = true
                    self.loadContacts()
                } else {
                    self.authenticationStatus = .denied
                    self.isSignedIn = true // Enable functionality with mock contacts
                    self.loadMockContacts() // Fallback for testing
                }
            }
            
            return granted
        } catch {
            print("🛡️ Heat shield: Contact access error - \(error)")
            
            await MainActor.run {
                self.authenticationStatus = .denied
                self.isSignedIn = true // Enable functionality with mock contacts
                self.loadMockContacts() // Fallback for testing
            }
            
            return false
        }
    }
    
    public func signIn() {
        Task {
            await requestContactsAccess()
        }
    }
    
    public func signOut() {
        DispatchQueue.main.async {
            self.isSignedIn = false
            self.authenticationStatus = .notDetermined
            self.contacts = []
            self.filteredContacts = []
            self.selectedContact = nil
            self.searchText = ""
        }
    }
    
    public func forceSignInWithMockContacts() {
        // Force sign-in with mock contacts to bypass permission issues
        Task {
            await fetchMockContacts()
            await MainActor.run {
                self.isSignedIn = true
                self.authenticationStatus = .authorized
            }
        }
    }
    
    // MARK: - Contact Management
    
    public struct ContactItem: Identifiable, Hashable {
        public let id = UUID()
        public let name: String
        public let phoneNumber: String?
        public let email: String?
        public let avatar: Data?
        public let isBot: Bool
        public let lastMessageTime: Date?
        public let conversationContext: ConversationContext
        
        public enum ConversationContext {
            case work
            case personal
            case bot
            case group
            case unknown
        }
    }
    
    private func loadContacts() {
        Task {
            await fetchContacts()
        }
    }
    
    private func loadMockContacts() {
        Task {
            await fetchMockContacts()
        }
    }
    
    private func fetchContacts() async {
        let keys = [
            CNContactGivenNameKey,
            CNContactFamilyNameKey,
            CNContactPhoneNumbersKey,
            CNContactEmailAddressesKey,
            CNContactImageDataKey
        ] as [CNKeyDescriptor]
        
        let request = CNContactFetchRequest(keysToFetch: keys)
        
        var contactItems: [ContactItem] = []
        
        // Add BLF Bot as first contact
        contactItems.append(ContactItem(
            name: "🤖 BLF Bot",
            phoneNumber: nil,
            email: "blf@bot.local",
            avatar: nil,
            isBot: true,
            lastMessageTime: Date(),
            conversationContext: .bot
        ))
        
        // Check if we have contacts access
        let status = CNContactStore.authorizationStatus(for: .contacts)
        
        if status == .authorized {
            do {
                try contactStore.enumerateContacts(with: request) { contact, _ in
                    let fullName = "\(contact.givenName) \(contact.familyName)".trimmingCharacters(in: .whitespaces)
                    
                    let phoneNumber = contact.phoneNumbers.first?.value.stringValue
                    let email = contact.emailAddresses.first?.value as String?
                    
                    let contactItem = ContactItem(
                        name: fullName,
                        phoneNumber: phoneNumber,
                        email: email,
                        avatar: contact.imageData,
                        isBot: false,
                        lastMessageTime: nil, // Would be populated from Messages database
                        conversationContext: .unknown
                    )
                    
                    contactItems.append(contactItem)
                }
            } catch {
                print("🛡️ Heat shield: Contact fetch error - \(error)")
                // Fall back to mock contacts
                contactItems.append(contentsOf: createMockContacts())
            }
        } else {
            print("🛡️ Heat shield: Contacts access not authorized - using real contacts")
            // This shouldn't happen if we're calling fetchContacts() only when authorized
        }
        
        let sortedContacts = contactItems.sorted { contact1, contact2 in
                // Sort: Bots first, then by last message time, then alphabetically
                if contact1.isBot && !contact2.isBot { return true }
                if !contact1.isBot && contact2.isBot { return false }
                
                if let time1 = contact1.lastMessageTime, let time2 = contact2.lastMessageTime {
                    return time1 > time2
                }
                
                return contact1.name < contact2.name
            }
        
        await MainActor.run {
            self.contacts = sortedContacts
            self.filteredContacts = sortedContacts
        }
    }
    
    private func fetchMockContacts() async {
        var contactItems: [ContactItem] = []
        
        // Add BLF Bot as first contact
        contactItems.append(ContactItem(
            name: "🤖 BLF Bot",
            phoneNumber: nil,
            email: "blf@bot.local",
            avatar: nil,
            isBot: true,
            lastMessageTime: Date(),
            conversationContext: .bot
        ))
        
        // Add mock contacts for testing
        contactItems.append(contentsOf: createMockContacts())
        
        let sortedContacts = contactItems.sorted { contact1, contact2 in
            // Sort: Bots first, then by last message time, then alphabetically
            if contact1.isBot && !contact2.isBot { return true }
            if !contact1.isBot && contact2.isBot { return false }
            
            if let time1 = contact1.lastMessageTime, let time2 = contact2.lastMessageTime {
                return time1 > time2
            }
            
            return contact1.name < contact2.name
        }
        
        await MainActor.run {
            self.contacts = sortedContacts
            self.filteredContacts = sortedContacts
        }
    }
    
    private func createMockContacts() -> [ContactItem] {
        return [
            ContactItem(
                name: "Alice Johnson",
                phoneNumber: "+1-555-0123",
                email: "alice@work.com",
                avatar: nil,
                isBot: false,
                lastMessageTime: Date().addingTimeInterval(-3600), // 1 hour ago
                conversationContext: .work
            ),
            ContactItem(
                name: "Bob Smith",
                phoneNumber: "+1-555-0456",
                email: "bob@personal.com",
                avatar: nil,
                isBot: false,
                lastMessageTime: Date().addingTimeInterval(-7200), // 2 hours ago
                conversationContext: .personal
            ),
            ContactItem(
                name: "Carol Davis",
                phoneNumber: "+1-555-0789",
                email: "carol@company.com",
                avatar: nil,
                isBot: false,
                lastMessageTime: Date().addingTimeInterval(-86400), // 1 day ago
                conversationContext: .work
            ),
            ContactItem(
                name: "David Wilson",
                phoneNumber: "+1-555-0321",
                email: "david@friend.com",
                avatar: nil,
                isBot: false,
                lastMessageTime: Date().addingTimeInterval(-172800), // 2 days ago
                conversationContext: .personal
            ),
            ContactItem(
                name: "Emma Brown",
                phoneNumber: "+1-555-0654",
                email: "emma@team.com",
                avatar: nil,
                isBot: false,
                lastMessageTime: nil,
                conversationContext: .group
            )
        ]
    }
    
    // MARK: - Search and Filtering
    
    public func filterContacts(with searchText: String) {
        if searchText.isEmpty {
            filteredContacts = contacts
        } else {
            filteredContacts = contacts.filter { contact in
                contact.name.localizedCaseInsensitiveContains(searchText) ||
                contact.email?.localizedCaseInsensitiveContains(searchText) == true ||
                contact.phoneNumber?.contains(searchText) == true
            }
        }
    }
    
    // MARK: - Dropdown Display Logic
    
    public func showDropdown(at position: CGPoint) {
        isVisible = true
        // Position dropdown near cursor/touch point
    }
    
    public func hideDropdown() {
        isVisible = false
        selectedContact = nil
        searchText = ""
        filteredContacts = contacts
    }
    
    public func selectContact(_ contact: ContactItem) {
        print("🎯 Selecting contact: \(contact.name)")
        selectedContact = contact
        
        // If it's the BLF Bot, show command menu
        if contact.isBot {
            print("🤖 Bot selected - showing command menu")
            showBotCommandMenu()
        } else {
            print("👤 Regular contact selected - showing social padding")
            // For regular contacts, show social padding options
            showSocialPaddingOptions(for: contact)
        }
    }
    
    // MARK: - Bot Command Menu
    
    private func showBotCommandMenu() {
        print("🤖 Showing bot command menu for BLF Bot")
        // Show BLF Bot specific commands
        // For now, just trigger social padding to show visual feedback
        socialPaddingManager?.showPaddingOptions(for: .bot)
    }
    
    // MARK: - Social Padding Integration
    
    private func showSocialPaddingOptions(for contact: ContactItem) {
        let paddingContext: SocialPaddingManager.SocialPaddingButton.ConversationContext
        switch contact.conversationContext {
        case .work:
            paddingContext = .work
        case .personal:
            paddingContext = .personal
        case .bot:
            paddingContext = .bot
        case .group:
            paddingContext = .group
        case .unknown:
            paddingContext = .unknown
        }
        print("👤 Showing social padding for context: \(paddingContext)")
        socialPaddingManager?.showPaddingOptions(for: paddingContext)
    }
}

// MARK: - Social Padding Manager

public class SocialPaddingManager: ObservableObject {
    
    @Published public var availablePadding: [SocialPaddingButton] = []
    @Published public var selectedPadding: [SocialPaddingButton] = []
    
    public init() {}
    
    public struct SocialPaddingButton: Identifiable, Hashable {
        public let id = UUID()
        public let text: String
        public let emoji: String
        public let context: ConversationContext
        public let position: PaddingPosition
        
        public enum ConversationContext: Hashable {
            case work
            case personal
            case bot
            case group
            case unknown
        }
        
        public enum PaddingPosition {
            case opening
            case closing
            case qualifier
        }
        
        public var displayText: String {
            return "\(emoji) \(text)"
        }
    }
    
    public func showPaddingOptions(for context: SocialPaddingManager.SocialPaddingButton.ConversationContext) {
        availablePadding = getPaddingButtons(for: context)
        print("🎨 Padding options set: \(availablePadding.count) buttons for context \(context)")
        for button in availablePadding {
            print("  - \(button.displayText)")
        }
    }
    
    private func getPaddingButtons(for context: SocialPaddingManager.SocialPaddingButton.ConversationContext) -> [SocialPaddingButton] {
        switch context {
        case .work:
            return [
                // Opening padding
                SocialPaddingButton(text: "Hi there!", emoji: "👋", context: SocialPaddingButton.ConversationContext.work, position: SocialPaddingButton.PaddingPosition.opening),
                SocialPaddingButton(text: "Quick question:", emoji: "🤔", context: SocialPaddingButton.ConversationContext.work, position: SocialPaddingButton.PaddingPosition.opening),
                SocialPaddingButton(text: "When you have a moment:", emoji: "⏰", context: SocialPaddingButton.ConversationContext.work, position: SocialPaddingButton.PaddingPosition.opening),
                
                // Closing padding
                SocialPaddingButton(text: "Thanks in advance", emoji: "🙏", context: SocialPaddingButton.ConversationContext.work, position: SocialPaddingButton.PaddingPosition.closing),
                SocialPaddingButton(text: "No rush on this", emoji: "⚡", context: SocialPaddingButton.ConversationContext.work, position: SocialPaddingButton.PaddingPosition.closing),
                SocialPaddingButton(text: "Appreciate your help", emoji: "😊", context: SocialPaddingButton.ConversationContext.work, position: SocialPaddingButton.PaddingPosition.closing),
                
                // Qualifiers
                SocialPaddingButton(text: "Just thinking out loud:", emoji: "💭", context: SocialPaddingButton.ConversationContext.work, position: SocialPaddingButton.PaddingPosition.qualifier),
                SocialPaddingButton(text: "Brain dump incoming:", emoji: "🧠", context: SocialPaddingButton.ConversationContext.work, position: SocialPaddingButton.PaddingPosition.qualifier)
            ]
            
        case .personal:
            return [
                // Opening padding
                SocialPaddingButton(text: "Hey!", emoji: "👋", context: SocialPaddingButton.ConversationContext.personal, position: SocialPaddingButton.PaddingPosition.opening),
                SocialPaddingButton(text: "Hope you're good!", emoji: "😊", context: SocialPaddingButton.ConversationContext.personal, position: SocialPaddingButton.PaddingPosition.opening),
                SocialPaddingButton(text: "Random thought:", emoji: "💭", context: SocialPaddingButton.ConversationContext.personal, position: SocialPaddingButton.PaddingPosition.opening),
                
                // Closing padding
                SocialPaddingButton(text: "Thanks!", emoji: "🙏", context: SocialPaddingButton.ConversationContext.personal, position: SocialPaddingButton.PaddingPosition.closing),
                SocialPaddingButton(text: "You're awesome", emoji: "⭐", context: SocialPaddingButton.ConversationContext.personal, position: SocialPaddingButton.PaddingPosition.closing),
                SocialPaddingButton(text: "Talk soon", emoji: "💬", context: SocialPaddingButton.ConversationContext.personal, position: SocialPaddingButton.PaddingPosition.closing)
            ]
            
        case .bot:
            return [
                // Bot-specific padding
                SocialPaddingButton(text: "AMF request:", emoji: "🧠", context: SocialPaddingButton.ConversationContext.bot, position: SocialPaddingButton.PaddingPosition.opening),
                SocialPaddingButton(text: "Buffer check:", emoji: "🛡️", context: SocialPaddingButton.ConversationContext.bot, position: SocialPaddingButton.PaddingPosition.opening),
                SocialPaddingButton(text: "V-8 status:", emoji: "🚗", context: SocialPaddingButton.ConversationContext.bot, position: SocialPaddingButton.PaddingPosition.opening),
                SocialPaddingButton(text: "Quick analysis:", emoji: "⚡", context: SocialPaddingButton.ConversationContext.bot, position: SocialPaddingButton.PaddingPosition.opening)
            ]
            
        default:
            return [
                SocialPaddingButton(text: "Hi!", emoji: "👋", context: SocialPaddingButton.ConversationContext.unknown, position: SocialPaddingButton.PaddingPosition.opening),
                SocialPaddingButton(text: "Thanks!", emoji: "🙏", context: SocialPaddingButton.ConversationContext.unknown, position: SocialPaddingButton.PaddingPosition.closing)
            ]
        }
    }
    
    public func addPadding(_ button: SocialPaddingButton) {
        if !selectedPadding.contains(button) {
            selectedPadding.append(button)
        }
    }
    
    public func removePadding(_ button: SocialPaddingButton) {
        selectedPadding.removeAll { $0.id == button.id }
    }
    
    public func generatePaddedMessage(coreMessage: String) -> String {
        let openingPadding = selectedPadding
            .filter { $0.position == .opening }
            .map { $0.displayText }
            .joined(separator: " ")
        
        let qualifiers = selectedPadding
            .filter { $0.position == .qualifier }
            .map { $0.displayText }
            .joined(separator: " ")
        
        let closingPadding = selectedPadding
            .filter { $0.position == .closing }
            .map { $0.displayText }
            .joined(separator: " ")
        
        var components: [String] = []
        
        if !openingPadding.isEmpty {
            components.append(openingPadding)
        }
        
        if !qualifiers.isEmpty {
            components.append(qualifiers)
        }
        
        components.append(coreMessage)
        
        if !closingPadding.isEmpty {
            components.append(closingPadding)
        }
        
        return components.joined(separator: " ")
    }
    
    public func clearPadding() {
        selectedPadding.removeAll()
    }
}

// MARK: - SwiftUI View Components

@available(iOS 14.0, macOS 11.0, *)
public struct SignInView: View {
    @ObservedObject var dropdownMenu: iMessageDropdownMenu
    
    public init(dropdownMenu: iMessageDropdownMenu) {
        self.dropdownMenu = dropdownMenu
    }
    
    public var body: some View {
        VStack(spacing: 20) {
            // BLF Logo/Icon
            Circle()
                .fill(Color.blue)
                .frame(width: 60, height: 60)
                .overlay(
                    Text("🧠")
                        .font(.title)
                )
            
            VStack(spacing: 8) {
                Text("BLF iMessage Integration")
                    .font(.title2)
                    .fontWeight(.semibold)
                
                Text("The narrow bridge between contact chaos and communication control")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
            
            VStack(spacing: 12) {
                switch dropdownMenu.authenticationStatus {
                case .notDetermined:
                    VStack(spacing: 8) {
                        Text("Initializing automatic sign-in...")
                            .font(.body)
                            .multilineTextAlignment(.center)
                            .foregroundColor(.secondary)
                        
                        Text("The V-8 engine is warming up to request contacts access")
                            .font(.caption)
                            .multilineTextAlignment(.center)
                            .foregroundColor(.secondary)
                        
                        Button("Manual Sign In") {
                            dropdownMenu.signIn()
                        }
                        .buttonStyle(.bordered)
                    }
                    
                case .requesting:
                    HStack {
                        ProgressView()
                            .scaleEffect(0.8)
                        Text("Requesting access...")
                    }
                    .foregroundColor(.secondary)
                    
                case .denied:
                    VStack(spacing: 8) {
                        Text("Contacts access was denied")
                            .font(.headline)
                            .foregroundColor(.red)
                        
                        Text("To enable full functionality, please grant Contacts access in System Preferences > Security & Privacy > Privacy > Contacts")
                            .font(.caption)
                            .multilineTextAlignment(.center)
                            .foregroundColor(.secondary)
                        
                        Button("Continue with Mock Contacts") {
                            // Force sign-in with mock contacts to unblock text field
                            dropdownMenu.forceSignInWithMockContacts()
                        }
                        .buttonStyle(.bordered)
                        .foregroundColor(.blue)
                    }
                    
                case .restricted:
                    VStack(spacing: 8) {
                        Text("Contacts access is restricted")
                            .font(.headline)
                            .foregroundColor(.orange)
                        
                        Text("Contact access is restricted by device management policies.")
                            .font(.caption)
                            .multilineTextAlignment(.center)
                            .foregroundColor(.secondary)
                        
                        Button("Continue with Mock Contacts") {
                            // Already loaded mock contacts
                        }
                        .buttonStyle(.bordered)
                        .foregroundColor(.blue)
                    }
                    
                case .authorized:
                    HStack {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                        Text("Signed in successfully!")
                            .foregroundColor(.green)
                    }
                }
            }
            
            // Debug info
            if dropdownMenu.contacts.count > 0 {
                Text("Contacts loaded: \(dropdownMenu.contacts.count)")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .padding(24)
        .frame(width: 300)
        .background(Color.white)
        .cornerRadius(12)
        .shadow(radius: 8)
    }
}

@available(iOS 14.0, macOS 11.0, *)
public struct DropdownMenuView: View {
    @ObservedObject var dropdownMenu: iMessageDropdownMenu
    @ObservedObject var paddingManager: SocialPaddingManager
    
    public init(dropdownMenu: iMessageDropdownMenu, paddingManager: SocialPaddingManager) {
        self.dropdownMenu = dropdownMenu
        self.paddingManager = paddingManager
    }
    
    public var body: some View {
        VStack(spacing: 0) {
            // Search bar
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(.gray)
                TextField("Search contacts...", text: $dropdownMenu.searchText)
                    .onChange(of: dropdownMenu.searchText) { searchText in
                        dropdownMenu.filterContacts(with: searchText)
                    }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(Color.gray.opacity(0.1))
            
            Divider()
            
            // Contact list
            ScrollView {
                LazyVStack(spacing: 0) {
                    ForEach(dropdownMenu.filteredContacts) { contact in
                        ContactRowView(contact: contact) {
                            dropdownMenu.selectContact(contact)
                        }
                    }
                }
            }
            .frame(maxHeight: 200)
            
            // Social padding section (if contact selected)
            if dropdownMenu.selectedContact != nil && !paddingManager.availablePadding.isEmpty {
                Divider()
                SocialPaddingView(paddingManager: paddingManager)
                    .onAppear {
                        print("🎨 Social padding view appeared with \(paddingManager.availablePadding.count) options")
                    }
            } else {
                // Debug why padding isn't showing
                if dropdownMenu.selectedContact == nil {
                    Text("Debug: No contact selected")
                        .font(.caption)
                        .foregroundColor(.red)
                        .onAppear {
                            print("🔍 Debug: No contact selected")
                        }
                } else if paddingManager.availablePadding.isEmpty {
                    Text("Debug: No padding options available")
                        .font(.caption)
                        .foregroundColor(.red)
                        .onAppear {
                            print("🔍 Debug: No padding options available")
                        }
                }
            }
        }
        .background(Color.white)
        .cornerRadius(8)
        .shadow(radius: 8)
        .frame(width: 300)
    }
}

@available(iOS 14.0, macOS 11.0, *)
struct ContactRowView: View {
    let contact: iMessageDropdownMenu.ContactItem
    let onSelect: () -> Void
    
    var body: some View {
        HStack {
            // Avatar or icon
            Group {
                #if canImport(UIKit)
                if let avatarData = contact.avatar, let uiImage = UIImage(data: avatarData) {
                    Image(uiImage: uiImage)
                        .resizable()
                        .frame(width: 32, height: 32)
                        .clipShape(Circle())
                } else {
                    Circle()
                        .fill(contact.isBot ? Color.blue : Color.gray)
                        .frame(width: 32, height: 32)
                        .overlay(
                            Text(contact.isBot ? "🤖" : String(contact.name.prefix(1)))
                                .foregroundColor(.white)
                                .font(.caption)
                        )
                }
                #else
                Circle()
                    .fill(contact.isBot ? Color.blue : Color.gray)
                    .frame(width: 32, height: 32)
                    .overlay(
                        Text(contact.isBot ? "🤖" : String(contact.name.prefix(1)))
                            .foregroundColor(.white)
                            .font(.caption)
                    )
                #endif
            }
            
            VStack(alignment: .leading, spacing: 2) {
                Text(contact.name)
                    .font(.body)
                    .foregroundColor(.primary)
                
                if let email = contact.email {
                    Text(email)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            
            Spacer()
            
            if contact.isBot {
                Image(systemName: "brain.head.profile")
                    .foregroundColor(.blue)
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .contentShape(Rectangle())
        .onTapGesture {
            print("🖱️ Contact clicked: \(contact.name)")
            onSelect()
        }
        .background(Color.white)
        .overlay(
            Rectangle()
                .fill(Color.blue.opacity(0.1))
                .opacity(0) // Will be animated on hover/press
        )
        #if !os(macOS)
        .hoverEffect(.highlight)
        #endif
    }
}

@available(iOS 14.0, macOS 11.0, *)
struct SocialPaddingView: View {
    @ObservedObject var paddingManager: SocialPaddingManager
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Social Padding")
                .font(.caption)
                .foregroundColor(.secondary)
                .padding(.horizontal, 12)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(paddingManager.availablePadding) { button in
                        PaddingButtonView(
                            button: button,
                            isSelected: paddingManager.selectedPadding.contains(button)
                        ) {
                            if paddingManager.selectedPadding.contains(button) {
                                paddingManager.removePadding(button)
                            } else {
                                paddingManager.addPadding(button)
                            }
                        }
                    }
                }
                .padding(.horizontal, 12)
            }
        }
        .padding(.vertical, 8)
        .background(Color.gray.opacity(0.1))
    }
}

@available(iOS 14.0, macOS 11.0, *)
struct PaddingButtonView: View {
    let button: SocialPaddingManager.SocialPaddingButton
    let isSelected: Bool
    let onTap: () -> Void
    
    var body: some View {
        Text(button.displayText)
            .font(.caption)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(isSelected ? Color.blue : Color.gray.opacity(0.2))
            .foregroundColor(isSelected ? .white : .primary)
            .cornerRadius(12)
            .onTapGesture {
                onTap()
            }
    }
} 