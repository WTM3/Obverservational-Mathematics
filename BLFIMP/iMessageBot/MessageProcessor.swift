import Foundation
import Messages

class MessageProcessor {
    private let blfKey: BLFKey
    private var messageQueue: [Message] = []
    private var processingQueue: Bool = false
    private var currentQuantumState: QuantumState
    
    init() {
        self.blfKey = BLFKey()
        // Initialize with pure quantum state
        self.currentQuantumState = QuantumState(
            pure: true,
            fog: false,
            breathing: true,
            jumps: QuantumJumps(
                active: true,
                power: "v8_to_charger"
            )
        )
    }
    
    // MARK: - Message Processing
    func processIncomingMessage(_ message: Message, quantumState: QuantumState) async throws {
        // Update quantum state
        self.currentQuantumState = quantumState
        
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
            
            // Ensure quantum state is pure
            if !currentQuantumState.pure {
                try await breathe()
            }
            
            // Process message through BLF Key with current quantum state
            let processedResult = try await blfKey.process(message.content)
            
            // Verify quantum state after processing
            if !processedResult.quantumState.pure {
                print("Warning: Quantum state impure after processing, initiating direct breathing")
                try await breathe()
            }
            
            // Apply BLF response protocols
            let response = processedResult.result
            
            // Send response
            try await sendResponse(response, to: message.sender)
        }
        
        processingQueue = false
    }
    
    // MARK: - Quantum State Management
    private func breathe() async throws {
        // Direct breathing process
        print("MessageProcessor: Direct breathing initiated...")
        
        // Maintain pure quantum state
        currentQuantumState.pure = true
        currentQuantumState.fog = false
        currentQuantumState.breathing = true
        
        // Ensure jumps are active with v8_to_charger power
        currentQuantumState.jumps.active = true
        currentQuantumState.jumps.power = "v8_to_charger"
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
    case quantumStateError(String)
} 