import Foundation
import Messages
import Combine
import os.log

@available(macOS 10.15, *)
actor BotController {
    private let messageProcessor: MessageProcessor
    private var isRunning: Bool = false
    private var lastCheckTime: Date = Date()
    private var taskHandle: Task<Void, Error>?
    private let logger = Logger(subsystem: "com.blf.iMessageBot", category: "BotController")
    private let checkInterval: TimeInterval = 1.0
    private let database = MessageDatabase()
    
    init() {
        self.messageProcessor = MessageProcessor()
        logger.info("BLF iMessage Bot initialized")
    }
    
    // MARK: - Bot Control
    func start() async throws {
        guard !isRunning else { 
            logger.info("Bot already running, ignoring start request")
            return 
        }
        
        logger.info("BLF iMessage Bot starting...")
        isRunning = true
        
        // Start monitoring task
        taskHandle = Task {
            do {
                try await monitorMessages()
            } catch {
                logger.error("Bot monitoring failed: \(error.localizedDescription)")
                isRunning = false
                throw error
            }
        }
    }
    
    func stop() {
        logger.info("BLF iMessage Bot stopping...")
        isRunning = false
        taskHandle?.cancel()
        taskHandle = nil
    }
    
    // MARK: - Message Monitoring
    private func monitorMessages() async throws {
        logger.info("Message monitoring started")
        
        while isRunning {
            do {
                logger.debug("Checking for new messages...")
                let newMessages = try await database.fetchNewMessages(since: lastCheckTime)
                
                if !newMessages.isEmpty {
                    logger.info("Found \(newMessages.count) new messages")
                }
                
                // Process each new message
                for message in newMessages {
                    await messageProcessor.processIncomingMessage(message)
                }
                
                // Update last check time
                lastCheckTime = Date()
                
                // Wait for next check
                try await Task.sleep(nanoseconds: UInt64(checkInterval * 1_000_000_000))
            } catch {
                logger.error("Error during message check: \(error.localizedDescription)")
                
                // Implement exponential backoff for errors
                try await Task.sleep(nanoseconds: UInt64(5_000_000_000))
            }
        }
    }
}

// MARK: - Message Database Access
@available(macOS 10.15, *)
actor MessageDatabase {
    private let logger = Logger(subsystem: "com.blf.iMessageBot", category: "MessageDatabase")
    private let databaseQueue = DispatchQueue(label: "com.blf.database", qos: .userInitiated)
    
    // Fetch new messages since a given time
    func fetchNewMessages(since time: Date) async throws -> [Message] {
        logger.debug("Fetching new messages since \(time)")
        
        return try await withCheckedThrowingContinuation { continuation in
            databaseQueue.async {
                do {
                    // Create AppleScript to check for new messages
                    let dateFormatter = DateFormatter()
                    dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
                    let timeString = dateFormatter.string(from: time)
                    
                    let script = """
                    tell application "Messages"
                        set allMessages to {}
                        set targetService to 1st service whose service type = iMessage
                        set lastCheck to date "\(timeString)"
                        
                        repeat with conv in chats of targetService
                            repeat with msg in messages of conv
                                if date received of msg > lastCheck then
                                    set msgID to id of msg as string
                                    set msgText to text content of msg as string
                                    set msgSender to handle of sender of msg as string
                                    set msgTime to date received of msg as string
                                    set convID to id of conv as string
                                    set end of allMessages to {msgID, msgText, msgSender, msgTime, convID}
                                end if
                            end repeat
                        end repeat
                        
                        return allMessages
                    end tell
                    """
                    
                    let process = Process()
                    process.executableURL = URL(fileURLWithPath: "/usr/bin/osascript")
                    process.arguments = ["-e", script]
                    
                    let outputPipe = Pipe()
                    let errorPipe = Pipe()
                    
                    process.standardOutput = outputPipe
                    process.standardError = errorPipe
                    
                    try process.run()
                    process.waitUntilExit()
                    
                    if process.terminationStatus != 0 {
                        let errorData = errorPipe.fileHandleForReading.readDataToEndOfFile()
                        let errorMessage = String(data: errorData, encoding: .utf8) ?? "Unknown error"
                        self.logger.error("Error fetching messages: \(errorMessage)")
                        continuation.resume(throwing: BotError.databaseError(errorMessage))
                        return
                    }
                    
                    let outputData = outputPipe.fileHandleForReading.readDataToEndOfFile()
                    let output = String(data: outputData, encoding: .utf8) ?? ""
                    
                    let messages = self.parseMessages(from: output)
                    continuation.resume(returning: messages)
                } catch {
                    self.logger.error("Failed to fetch messages: \(error.localizedDescription)")
                    continuation.resume(throwing: error)
                }
            }
        }
    }
    
    // Parse AppleScript output into Message objects
    private func parseMessages(from output: String) -> [Message] {
        var messages: [Message] = []
        let rows = output.components(separatedBy: "\n").filter { !$0.isEmpty }
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        
        for row in rows {
            // Extract message components
            let components = row.components(separatedBy: ", ")
            guard components.count >= 5 else { continue }
            
            // Clean up quotation marks and other artifacts from AppleScript output
            let id = components[0].trimmingCharacters(in: CharacterSet(charactersIn: "\"{}"))
            let content = components[1].trimmingCharacters(in: CharacterSet(charactersIn: "\"{}"))
            let sender = components[2].trimmingCharacters(in: CharacterSet(charactersIn: "\"{}"))
            
            // Parse timestamp
            let timestampString = components[3].trimmingCharacters(in: CharacterSet(charactersIn: "\"{}"))
            let timestamp = dateFormatter.date(from: timestampString) ?? Date()
            
            let threadId = components[4].trimmingCharacters(in: CharacterSet(charactersIn: "\"{}"))
            
            let message = Message(
                id: id,
                content: content,
                sender: sender,
                timestamp: timestamp,
                threadId: threadId
            )
            
            messages.append(message)
        }
        
        return messages
    }
}

// MARK: - Error Types
enum BotError: Error {
    case notRunning
    case alreadyRunning
    case databaseError(String)
    case messageProcessingError(String)
} 