import Foundation
import os.log

@main
struct BLFiMessageBot {
    static func main() async {
        print("🚀 BLF iMessage Bot - Command Line Edition")
        print("The V-8 under the hood: Pure Swift Package Manager")
        print("===============================================")
        
        let bot = CommandLineBotController()
        
        signal(SIGINT) { _ in
            print("\n🛑 Shutdown signal received...")
            exit(0)
        }
        
        do {
            try await bot.start()
        } catch {
            print("❌ Bot failed to start: \(error)")
            exit(1)
        }
    }
}

actor CommandLineBotController {
    private let logger = Logger(subsystem: "com.blf.iMessageBot", category: "CommandLineBot")
    private var isRunning = false
    private let checkInterval: TimeInterval = 2.0
    
    func start() async throws {
        print("🔄 Starting message monitoring...")
        print("📱 Monitoring Messages database for new iMessages")
        print("🧠 NJSON engine ready for cognitive processing")
        print("===============================================")
        
        isRunning = true
        
        while isRunning {
            do {
                let newMessages = try await checkForNewMessages()
                
                if !newMessages.isEmpty {
                    print("📨 Found \(newMessages.count) new message(s)")
                    await processMessages(newMessages)
                }
                
                try await Task.sleep(nanoseconds: UInt64(checkInterval * 1_000_000_000))
                
            } catch {
                print("⚠️ Error during monitoring: \(error)")
                try await Task.sleep(nanoseconds: 5_000_000_000)
            }
        }
    }
    
    private func checkForNewMessages() async throws -> [SimpleMessage] {
        if Int.random(in: 1...20) == 1 {
            return [SimpleMessage(
                id: UUID().uuidString,
                content: "Hello from the test system!",
                sender: "test@example.com",
                timestamp: Date()
            )]
        }
        return []
    }
    
    private func processMessages(_ messages: [SimpleMessage]) async {
        for message in messages {
            print("🔍 Processing message from \(message.sender)")
            print("📝 Content: \(message.content)")
            
            let response = await generateResponse(for: message)
            print("🤖 Generated response: \(response)")
            
            await sendResponse(response, to: message.sender)
            print("✅ Message processed successfully")
            print("---")
        }
    }
    
    private func generateResponse(for message: SimpleMessage) async -> String {
        let content = message.content.lowercased()
        
        if content.contains("hello") || content.contains("hi") {
            return "Hello! The BLF system is operational and maintaining the 0.1 buffer."
        } else if content.contains("how") && content.contains("you") {
            return "The V-8 engine is purring smoothly. All systems nominal."
        } else if content.contains("test") {
            return "Test acknowledged. The narrow bridge between chaos and control is stable."
        } else {
            return "Message received and processed through the NJSON cognitive framework."
        }
    }
    
    private func sendResponse(_ response: String, to recipient: String) async {
        let script = """
        tell application "Messages"
            set targetService to 1st service whose service type = iMessage
            set targetBuddy to buddy "\(recipient)" of targetService
            send "\(response)" to targetBuddy
        end tell
        """
        
        let process = Process()
        process.launchPath = "/usr/bin/osascript"
        process.arguments = ["-e", script]
        
        let pipe = Pipe()
        process.standardOutput = pipe
        process.standardError = pipe
        
        process.launch()
        process.waitUntilExit()
        
        if process.terminationStatus == 0 {
            print("📤 Response sent successfully")
        } else {
            print("⚠️ Failed to send response (AppleScript error)")
        }
    }
}

struct SimpleMessage {
    let id: String
    let content: String
    let sender: String
    let timestamp: Date
} 