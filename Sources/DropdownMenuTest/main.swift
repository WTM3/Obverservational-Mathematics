import Foundation
import SwiftUI
import CursorXcodeExtension

@main
struct DropdownMenuTestApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @StateObject private var dropdownMenu = iMessageDropdownMenu()
    @StateObject private var paddingManager = SocialPaddingManager()
    @State private var messageText = ""
    @State private var showDropdown = false
    @State private var cursorPosition: CGPoint = .zero
    
    var body: some View {
        VStack(spacing: 20) {
            Text("🧠 BLF iMessage Dropdown @Mention Test")
                .font(.title)
                .padding()
            
            Text("The narrow bridge between contact chaos and communication control")
                .font(.caption)
                .foregroundColor(.secondary)
            
            // Show sign-in view if not signed in
            if !dropdownMenu.isSignedIn {
                SignInView(dropdownMenu: dropdownMenu)
                    .transition(.opacity)
            } else {
                mainContentView
            }
        }
        .padding()
        .frame(maxWidth: 600, maxHeight: 800)
    }
    
    private var mainContentView: some View {
        VStack(spacing: 20) {
            
            // Message composition area
            VStack(alignment: .leading, spacing: 8) {
                Text("Compose Message:")
                    .font(.headline)
                
                ZStack(alignment: .topLeading) {
                    TextEditor(text: $messageText)
                        .frame(minHeight: 100)
                        .padding(8)
                        .background(Color.gray.opacity(0.1))
                        .cornerRadius(8)
                        .onChange(of: messageText) { text in
                            checkForMention(in: text)
                        }
                    
                    if messageText.isEmpty {
                        Text("Type @ to mention someone...")
                            .foregroundColor(.secondary)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 16)
                            .allowsHitTesting(false)
                    }
                }
                
                // Show dropdown when @ is typed
                if showDropdown {
                    DropdownMenuView(
                        dropdownMenu: dropdownMenu,
                        paddingManager: paddingManager
                    )
                    .transition(.opacity)
                }
            }
            
            // Social padding preview
            if !paddingManager.selectedPadding.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Message Preview with Social Padding:")
                        .font(.headline)
                    
                    let paddedMessage = paddingManager.generatePaddedMessage(coreMessage: messageText)
                    Text(paddedMessage)
                        .padding()
                        .background(Color.blue.opacity(0.1))
                        .cornerRadius(8)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
            
            // Action buttons
            HStack(spacing: 16) {
                Button("Clear Padding") {
                    paddingManager.clearPadding()
                }
                .buttonStyle(.bordered)
                
                Button("Send Message") {
                    sendMessage()
                }
                .buttonStyle(.bordered)
                .disabled(messageText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            }
            
            Spacer()
            
            // Debug info
            VStack(alignment: .leading, spacing: 4) {
                Text("Debug Info:")
                    .font(.caption)
                    .foregroundColor(.secondary)
                
                Text("Contacts loaded: \(dropdownMenu.contacts.count)")
                    .font(.caption)
                    .foregroundColor(.secondary)
                
                Text("Selected padding: \(paddingManager.selectedPadding.count)")
                    .font(.caption)
                    .foregroundColor(.secondary)
                
                if let selectedContact = dropdownMenu.selectedContact {
                    Text("Selected: \(selectedContact.name)")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
            .background(Color.gray.opacity(0.1))
            .cornerRadius(8)
        }
    }
    
    private func checkForMention(in text: String) {
        // Simple @ detection - in real implementation this would be more sophisticated
        if text.contains("@") && !showDropdown {
            withAnimation(.easeInOut(duration: 0.2)) {
                showDropdown = true
            }
        } else if !text.contains("@") && showDropdown {
            withAnimation(.easeInOut(duration: 0.2)) {
                showDropdown = false
                dropdownMenu.hideDropdown()
            }
        }
    }
    
    private func sendMessage() {
        let finalMessage = paddingManager.generatePaddedMessage(coreMessage: messageText)
        
        print("🚀 Sending message:")
        print("Original: \(messageText)")
        print("With padding: \(finalMessage)")
        print("Selected contact: \(dropdownMenu.selectedContact?.name ?? "None")")
        print("Padding buttons used: \(paddingManager.selectedPadding.map { $0.displayText })")
        
        // Reset for next message
        messageText = ""
        paddingManager.clearPadding()
        dropdownMenu.hideDropdown()
        showDropdown = false
    }
}

// MARK: - Command Line Test Runner

struct DropdownMenuTest {
    static func main() async {
        print("🧠 BLF Dropdown @Mention Menu Test")
        print("The V-8 engine: Contact selection with social padding")
        print("===============================================")
        
        let dropdownMenu = iMessageDropdownMenu()
        let paddingManager = SocialPaddingManager()
        
        // Wait for contacts to load
        try? await Task.sleep(nanoseconds: 2_000_000_000) // 2 seconds
        
        print("\n📱 Contacts loaded: \(dropdownMenu.contacts.count)")
        
        // Test contact filtering
        print("\n🔍 Testing contact search...")
        dropdownMenu.filterContacts(with: "bot")
        print("Filtered contacts (bot): \(dropdownMenu.filteredContacts.count)")
        
        // Test social padding for different contexts
        print("\n🛡️ Testing social padding...")
        
        // Work context
        paddingManager.showPaddingOptions(for: SocialPaddingManager.SocialPaddingButton.ConversationContext.work)
        print("Work padding options: \(paddingManager.availablePadding.count)")
        
        // Add some padding
        if let firstPadding = paddingManager.availablePadding.first {
            paddingManager.addPadding(firstPadding)
            print("Added padding: \(firstPadding.displayText)")
        }
        
        // Generate padded message
        let testMessage = "Can you review this code?"
        let paddedMessage = paddingManager.generatePaddedMessage(coreMessage: testMessage)
        
        print("\n📝 Message transformation:")
        print("Original: \(testMessage)")
        print("Padded: \(paddedMessage)")
        
        // Test bot context
        print("\n🤖 Testing bot context...")
        paddingManager.showPaddingOptions(for: SocialPaddingManager.SocialPaddingButton.ConversationContext.bot)
        print("Bot padding options: \(paddingManager.availablePadding.count)")
        
        for padding in paddingManager.availablePadding.prefix(2) {
            print("- \(padding.displayText) (\(padding.position))")
        }
        
        print("\n✅ Dropdown @mention menu test completed!")
        print("🎯 Ready for Xcode extension integration")
        print("🧠 Boolean Mind social padding: Operational")
        print("🛡️ Heat shield: Protecting the 0.1 buffer")
    }
} 