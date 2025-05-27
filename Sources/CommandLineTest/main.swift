import Foundation
import CursorXcodeExtension

@main
struct CommandLineTest {
    static func main() async {
        print("🧠 BLF Dropdown @Mention Menu Command Line Test")
        print("The V-8 engine: Testing automatic sign-in")
        print("===============================================")
        
        let dropdownMenu = iMessageDropdownMenu()
        let paddingManager = SocialPaddingManager()
        
        print("\n🚗 V-8 engine: Initializing dropdown menu...")
        print("Initial auth status: \(dropdownMenu.authenticationStatus)")
        print("Initial signed in: \(dropdownMenu.isSignedIn)")
        
        // Wait for automatic sign-in to complete
        print("\n⏰ Waiting for automatic sign-in process...")
        try? await Task.sleep(nanoseconds: 3_000_000_000) // 3 seconds
        
        print("\n📊 Post-initialization status:")
        print("Auth status: \(dropdownMenu.authenticationStatus)")
        print("Signed in: \(dropdownMenu.isSignedIn)")
        print("Contacts loaded: \(dropdownMenu.contacts.count)")
        
        if dropdownMenu.contacts.count > 0 {
            print("\n📱 First few contacts:")
            for contact in dropdownMenu.contacts.prefix(3) {
                print("- \(contact.name) (\(contact.isBot ? "Bot" : "Contact"))")
            }
        }
        
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
        
        print("\n✅ Automatic sign-in test completed!")
        print("🎯 Status: \(dropdownMenu.isSignedIn ? "SUCCESS - Auto-signed in" : "FAILED - Not signed in")")
        print("🧠 Boolean Mind social padding: \(paddingManager.availablePadding.isEmpty ? "Not loaded" : "Operational")")
        print("🛡️ Heat shield: Protecting the 0.1 buffer")
        
        if dropdownMenu.authenticationStatus == .denied {
            print("📋 Note: Contacts access denied - using mock contacts (expected behavior)")
        }
    }
} 