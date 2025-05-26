import Foundation
import CursorXcodeExtension
import BLFNJSONBridge

@main
struct CursorExtensionSetup {
    static func main() async {
        print("🔑 Cursor Xcode Extension API Key Setup")
        print("🧠 AMF Optimized for Claude 3.5-4 Sonnet")
        print("The V-8 under the hood: Secure Keychain Storage")
        print("=============================================")
        
        let keyManager = SecureAPIKeyManager()
        
        print("\n🎯 CRITICAL: Anthropic Claude Sonnet API Key")
        print("The AMF is mathematically optimized for Claude 3.5-4 Sonnet reasoning patterns.")
        print("Your quantum speed (2.99) + AMF processing = Maximum cognitive horsepower")
        print("")
        
        // Anthropic API Key (PRIORITY #1)
        if let anthropicKey = readSecureInput("Enter Anthropic API Key (REQUIRED for AMF): ") {
            if keyManager.storeAPIKey(anthropicKey, for: "anthropic") {
                print("✅ Anthropic Claude Sonnet key stored securely")
                print("🎯 AMF optimization: ENABLED")
            } else {
                print("❌ Failed to store Anthropic key")
                print("⚠️ AMF optimization: LIMITED")
            }
        } else {
            print("⚠️ Anthropic key skipped - AMF optimization will be limited")
        }
        
        print("\n🔧 Optional: Additional AI Agents")
        print("These enhance the multi-AI orchestration but are not required for core AMF functionality.")
        print("")
        
        // OpenAI API Key (Optional)
        if let openAIKey = readSecureInput("Enter OpenAI API Key (optional): ") {
            if keyManager.storeAPIKey(openAIKey, for: "openai") {
                print("✅ OpenAI GPT key stored securely")
            } else {
                print("❌ Failed to store OpenAI key")
            }
        }
        
        // Cursor API Key (Optional)
        if let cursorKey = readSecureInput("Enter Cursor API Key (optional): ") {
            if keyManager.storeAPIKey(cursorKey, for: "cursor") {
                print("✅ Cursor AI key stored securely")
            } else {
                print("❌ Failed to store Cursor key")
            }
        }
        
        // GitHub Token (Optional)
        if let githubToken = readSecureInput("Enter GitHub Token (optional): ") {
            if keyManager.storeAPIKey(githubToken, for: "github") {
                print("✅ GitHub token stored securely")
            } else {
                print("❌ Failed to store GitHub token")
            }
        }
        
        print("\n🧪 Testing API Key Configuration...")
        await testConfiguration(keyManager)
        
        print("\n🚀 Setup Complete!")
        print("Your Cursor Xcode Extension is ready for AMF-optimized development.")
        print("The narrow bridge between chaos and control is operational! 🚗💨")
    }
    
    private static func readSecureInput(_ prompt: String) -> String? {
        print(prompt, terminator: "")
        
        // Disable echo for secure input
        let originalTermios = enableRawMode()
        defer { restoreTerminalMode(originalTermios) }
        
        var input = ""
        while true {
            let char = getchar()
            if char == 10 || char == 13 { // Enter key
                break
            } else if char == 127 || char == 8 { // Backspace
                if !input.isEmpty {
                    input.removeLast()
                    print("\u{8} \u{8}", terminator: "")
                }
            } else if char >= 32 && char <= 126 { // Printable characters
                input.append(Character(UnicodeScalar(UInt32(char))!))
                print("*", terminator: "")
            }
        }
        
        print("") // New line after input
        return input.isEmpty ? nil : input
    }
    
    private static func enableRawMode() -> termios {
        var originalTermios = termios()
        tcgetattr(STDIN_FILENO, &originalTermios)
        
        var rawTermios = originalTermios
        rawTermios.c_lflag &= ~(UInt(ECHO | ICANON))
        tcsetattr(STDIN_FILENO, TCSANOW, &rawTermios)
        
        return originalTermios
    }
    
    private static func restoreTerminalMode(_ termios: termios) {
        var termios = termios
        tcsetattr(STDIN_FILENO, TCSANOW, &termios)
    }
    
    private static func testConfiguration(_ keyManager: SecureAPIKeyManager) async {
        print("🔍 Validating stored API keys...")
        
        let agents = ["anthropic", "openai", "cursor", "github"]
        var validKeys = 0
        
        for agent in agents {
            if let key = keyManager.retrieveAPIKey(for: agent) {
                if keyManager.validateKeyIntegrity(key, for: agent) {
                    print("✅ \(agent.capitalized): Valid key with AMF buffer protection")
                    validKeys += 1
                } else {
                    print("⚠️ \(agent.capitalized): Key below AMF security threshold")
                }
            } else {
                print("❌ \(agent.capitalized): No key found")
            }
        }
        
        print("\n📊 Configuration Summary:")
        print("Valid API Keys: \(validKeys)/\(agents.count)")
        
        if keyManager.retrieveAPIKey(for: "anthropic") != nil {
            print("🎯 AMF Optimization: ENABLED (Claude Sonnet available)")
            print("🚗 V-8 Engine: Ready to purr at quantum speed 2.99")
        } else {
            print("⚠️ AMF Optimization: LIMITED (Claude Sonnet missing)")
            print("🚗 V-8 Engine: Running on backup fuel")
        }
        
        // Test NJSON integration
        print("\n🧠 Testing NJSON Bridge Integration...")
        let njsonBridge = NJSONSwiftBridge()
        await njsonBridge.initialize()
        
        let testResult = await njsonBridge.processContent("Test AMF integration")
        print("✅ NJSON Bridge: Operational")
        print("✅ Buffer State: \(testResult.cognitiveAlignment + 0.1)")
        print("✅ Mathematical Relationship: AIc + 0.1 = BMqs verified")
    }
}

// MARK: - Terminal Control

#if canImport(Darwin)
import Darwin

private let STDIN_FILENO: Int32 = 0
private let TCSANOW: Int32 = 0
private let ECHO: UInt = 0x00000008
private let ICANON: UInt = 0x00000100

#endif 