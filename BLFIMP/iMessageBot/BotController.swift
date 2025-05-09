import Foundation
import Messages

class BotController {
    private let messageProcessor: MessageProcessor
    private var isRunning: Bool = false
    private var lastCheckTime: Date = Date()
    private let checkInterval: TimeInterval = 1.0
    
    init() {
        self.messageProcessor = MessageProcessor()
    }
    
    // MARK: - Bot Control
    func start() async throws {
        guard !isRunning else { return }
        isRunning = true
        
        print("BLF iMessage Bot starting...")
        print("V8 POWER: ON")
        
        // Start monitoring loop
        try await monitorMessages()
    }
    
    func stop() {
        isRunning = false
        print("BLF iMessage Bot stopping...")
    }
    
    // MARK: - Message Monitoring
    private func monitorMessages() async throws {
        while isRunning {
            // Check for new messages
            let newMessages = try await checkForNewMessages()
            
            // Process any new messages
            for message in newMessages {
                try await messageProcessor.processIncomingMessage(message)
            }
            
            // Wait for next check
            try await Task.sleep(nanoseconds: UInt64(checkInterval * 1_000_000_000))
        }
    }
    
    private func checkForNewMessages() async throws -> [Message] {
        // Create AppleScript to check for new messages
        let script = """
        tell application "Messages"
            set targetService to 1st service whose service type = iMessage
            set allMessages to {}
            set lastCheck to date "\(lastCheckTime)"
            
            repeat with conv in conversations of targetService
                repeat with msg in messages of conv
                    if date received of msg > lastCheck then
                        set end of allMessages to {id:id of msg, content:content of msg, sender:sender of msg, timestamp:date received of msg, threadId:id of conv}
                    end if
                end repeat
            end repeat
            
            return allMessages
        end tell
        """
        
        // Execute AppleScript
        let process = Process()
        process.launchPath = "/usr/bin/osascript"
        process.arguments = ["-e", script]
        
        let pipe = Pipe()
        process.standardOutput = pipe
        
        try process.run()
        process.waitUntilExit()
        
        // Parse results
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        let output = String(data: data, encoding: .utf8) ?? ""
        
        // Update last check time
        lastCheckTime = Date()
        
        // Parse messages from output
        return parseMessages(from: output)
    }
    
    private func parseMessages(from output: String) -> [Message] {
        var messages: [Message] = []
        let entries = output.components(separatedBy: "\n")
        
        for entry in entries {
            if let message = parseMessageEntry(entry) {
                messages.append(message)
            }
        }
        
        return messages
    }
    
    private func parseMessageEntry(_ entry: String) -> Message? {
        let components = entry.components(separatedBy: ",")
        guard components.count >= 5 else { return nil }
        
        return Message(
            id: components[0],
            content: components[1],
            sender: components[2],
            timestamp: Date(timeIntervalSince1970: Double(components[3]) ?? 0),
            threadId: components[4]
        )
    }
} 