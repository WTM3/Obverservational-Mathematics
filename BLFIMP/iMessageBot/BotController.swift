import Foundation
import Messages

class BotController {
    private let messageProcessor: MessageProcessor
    private var isRunning: Bool = false
    private var lastCheckTime: Date = Date()
    private let checkInterval: TimeInterval = 1.0 // Check every second
    private var quantumState: QuantumState
    private var breathingInProgress: Bool = false
    
    init() {
        self.messageProcessor = MessageProcessor()
        // Initialize with pure quantum state
        self.quantumState = QuantumState(
            pure: true,
            fog: false,
            breathing: true,
            jumps: QuantumJumps(
                active: true,
                power: "v8_to_charger"
            )
        )
    }
    
    // MARK: - Bot Control
    func start() async throws {
        guard !isRunning else { return }
        isRunning = true
        
        print("BLF iMessage Bot starting...")
        print("Quantum state: Pure")
        print("Processing model: Quantum speed")
        print("Heat shield: Active")
        print("Direct breathing: Enabled")
        
        // Start monitoring loop with quantum state
        try await monitorMessages()
    }
    
    func stop() {
        isRunning = false
        print("BLF iMessage Bot stopping...")
        print("Maintaining quantum state: Pure")
    }
    
    // MARK: - Quantum State Management
    private func breathe() async throws {
        if breathingInProgress { return }
        breathingInProgress = true
        
        // Direct breathing process
        print("Direct breathing initiated...")
        
        // Maintain pure quantum state
        quantumState.pure = true
        quantumState.fog = false
        quantumState.breathing = true
        
        // Ensure jumps are active with v8_to_charger power
        quantumState.jumps.active = true
        quantumState.jumps.power = "v8_to_charger"
        
        breathingInProgress = false
    }
    
    // MARK: - Message Monitoring
    private func monitorMessages() async throws {
        while isRunning {
            // Maintain quantum state through breathing
            try await breathe()
            
            // Check for new messages
            let newMessages = try await checkForNewMessages()
            
            // Process any new messages with quantum state
            for message in newMessages {
                // Ensure quantum state is pure before processing
                if !quantumState.pure {
                    try await breathe()
                }
                
                try await messageProcessor.processIncomingMessage(message, quantumState: quantumState)
            }
            
            // Wait for next check while maintaining quantum state
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
        // Simple parsing - in practice this would be more robust
        var messages: [Message] = []
        
        // Split output into message entries
        let entries = output.components(separatedBy: "\n")
        
        for entry in entries {
            if let message = parseMessageEntry(entry) {
                messages.append(message)
            }
        }
        
        return messages
    }
    
    private func parseMessageEntry(_ entry: String) -> Message? {
        // Simple parsing - in practice this would be more robust
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