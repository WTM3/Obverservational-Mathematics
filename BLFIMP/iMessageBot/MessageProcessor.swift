import Foundation
import Messages

class MessageProcessor {
    private let blfKey: BLFKey
    private var messageQueue: [Message] = []
    private var processingQueue: Bool = false
    
    init() {
        self.blfKey = BLFKey()
    }
    
    // MARK: - Message Processing
    func processIncomingMessage(_ message: Message) async throws {
        // Add message to queue
        messageQueue.append(message)
        
        // Process queue if not already processing
        if !processingQueue {
            try await processMessageQueue()
        }
    }
    
    private func processMessageQueue() async throws {
        processingQueue = true
        
        while !messageQueue.isEmpty {
            let message = messageQueue.removeFirst()
            
            // Process message with V8 power
            let processedResult = try await blfKey.process(message.content)
            
            // Send response
            try await sendResponse(processedResult.result, to: message.sender)
        }
        
        processingQueue = false
    }
    
    // MARK: - Message Sending
    private func sendResponse(_ response: String, to recipient: String) async throws {
        // Create AppleScript command to send message
        let script = """
        tell application "Messages"
            set targetService to 1st service whose service type = iMessage
            set targetBuddy to buddy "\(recipient)" of targetService
            send "\(response)" to targetBuddy
        end tell
        """
        
        // Execute AppleScript
        let process = Process()
        process.launchPath = "/usr/bin/osascript"
        process.arguments = ["-e", script]
        
        try process.run()
        process.waitUntilExit()
    }
}

// MARK: - Supporting Types
struct Message {
    let id: String
    let content: String
    let sender: String
    let timestamp: Date
    let threadId: String
}

// MARK: - Error Types
enum MessageProcessorError: Error {
    case processingError(String)
    case sendingError(String)
    case queueError(String)
} 