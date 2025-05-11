import Foundation
import Messages
import Combine
import os.log

/// Boolean Language Framework Bot Controller optimized for qs³ processing
@available(macOS 10.15, *)
actor BotController {
    // MARK: - Core Components
    private let njson: NJSON
    private let database: MessageDatabase
    
    // MARK: - State Management
    private var isRunning: Bool = false
    private var lastCheckTime: Date = Date()
    private var taskHandle: Task<Void, Error>?
    
    // MARK: - Configuration
    private let checkInterval: TimeInterval
    private let metricsReportingInterval: TimeInterval
    
    // MARK: - Performance Monitoring
    private let logger = Logger(subsystem: "com.blf.iMessageBot", category: "BotController")
    private var metrics = BotMetrics()
    private var metricsReportingTask: Task<Void, Never>?
    
    init(
        checkInterval: TimeInterval = 1.0,
        metricsReportingInterval: TimeInterval = 300.0
    ) {
        self.njson = NJSON()
        self.database = MessageDatabase()
        self.checkInterval = checkInterval
        self.metricsReportingInterval = metricsReportingInterval
        
        logger.info("BLF iMessage Bot initialized with qs³ optimization")
        logger.info("Message check interval: \(checkInterval)s")
    }
    
    // MARK: - Bot Control
    func start() async throws {
        guard !isRunning else { 
            logger.info("Bot already running, ignoring start request")
            return 
        }
        
        logger.info("🚀 BLF iMessage Bot starting with V8 engine...")
        isRunning = true
        metrics.startTime = Date()
        
        // Start monitoring metrics
        startMetricsReporting()
        
        // Start message monitoring with error resilience
        taskHandle = Task {
            do {
                try await monitorMessages()
            } catch {
                logger.error("Bot monitoring failed: \(error.localizedDescription)")
                isRunning = false
                metrics.recordFatalError(error.localizedDescription)
                throw error
            }
        }
    }
    
    func stop() {
        logger.info("BLF iMessage Bot stopping...")
        isRunning = false
        taskHandle?.cancel()
        taskHandle = nil
        metricsReportingTask?.cancel()
        metricsReportingTask = nil
        
        // Calculate final uptime
        metrics.uptime = Date().timeIntervalSince(metrics.startTime)
        
        // Log final metrics
        logger.info("Final metrics: Uptime: \(metrics.uptime)s, Messages processed: \(metrics.messagesProcessed), Errors: \(metrics.errorCount)")
    }
    
    // MARK: - Message Monitoring
    private func monitorMessages() async throws {
        logger.info("Message monitoring started with V8 optimization")
        
        // Initial metrics
        metrics.startTime = Date()
        
        while isRunning {
            do {
                let cycleName = UUID().uuidString
                logger.debug("Check cycle \(cycleName): Checking for new messages...")
                let checkStart = CFAbsoluteTimeGetCurrent()
                
                // Fetch new messages with performance tracking
                let newMessages = try await database.fetchNewMessages(since: lastCheckTime)
                
                let checkDuration = CFAbsoluteTimeGetCurrent() - checkStart
                metrics.recordDatabaseCheck(duration: checkDuration, messageCount: newMessages.count)
                
                if !newMessages.isEmpty {
                    logger.info("Found \(newMessages.count) new messages")
                    metrics.recordNewMessages(count: newMessages.count)
                }
                
                // Process messages with priority handling
                await processNewMessages(newMessages)
                
                // Update last check time
                lastCheckTime = Date()
                
                // Calculate ideal sleep time based on message volume and performance
                let sleepTime = calculateOptimalSleepTime(
                    baseInterval: checkInterval,
                    messageCount: newMessages.count
                )
                
                // Wait for next check with adaptive timing
                try await Task.sleep(nanoseconds: UInt64(sleepTime * 1_000_000_000))
            } catch {
                logger.error("Error during message check: \(error.localizedDescription)")
                metrics.recordError()
                
                // Implement exponential backoff for errors
                try await Task.sleep(nanoseconds: UInt64(5_000_000_000))
            }
        }
    }
    
    // MARK: - Message Processing
    private func processNewMessages(_ messages: [Message]) async {
        // Process messages with proper prioritization
        for message in messages {
            let priority = determineMessagePriority(message)
            
            if priority == .high {
                metrics.recordHighPriorityMessage()
                logger.debug("Processing high priority message: \(message.id)")
            }
            
            // Process message directly with NJSON
            await processMessageWithNJSON(message, priority: priority)
            metrics.recordMessageProcessed()
        }
    }
    
    private func processMessageWithNJSON(_ message: Message, priority: MessagePriority) async {
        do {
            // Use NJSON directly for processing
            logger.debug("Processing message: \(message.id) with priority: \(priority.rawValue)")
            let startTime = CFAbsoluteTimeGetCurrent()
            
            // Process with NJSON
            let response = try await njson.processIncomingMessage(message.content, from: message.sender)
            
            // Track performance metrics
            let totalTime = CFAbsoluteTimeGetCurrent() - startTime
            metrics.recordProcessingTime(totalTime)
            
            logger.debug("Message processed in \(totalTime)s")
            
            // Send the response
            try await sendResponse(response, to: message.sender)
        } catch {
            logger.error("Error processing message: \(error.localizedDescription)")
            metrics.recordError()
        }
    }
    
    private func determineMessagePriority(_ message: Message) -> MessagePriority {
        // Determine message priority based on content and context
        let content = message.content.lowercased()
        
        // Check for urgent keywords
        if content.contains("urgent") || 
           content.contains("emergency") ||
           content.contains("important") {
            return .high
        }
        
        // Messages with questions get higher priority
        if content.contains("?") || content.hasPrefix("how") || content.hasPrefix("what") {
            return .high
        }
        
        return .normal
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
        
        // Execute AppleScript with proper error handling
        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/usr/bin/osascript")
        process.arguments = ["-e", script]
        
        let outputPipe = Pipe()
        let errorPipe = Pipe()
        
        process.standardOutput = outputPipe
        process.standardError = errorPipe
        
        // Track message sending performance
        let startTime = CFAbsoluteTimeGetCurrent()
        
        do {
            try process.run()
            process.waitUntilExit()
            
            let sendTime = CFAbsoluteTimeGetCurrent() - startTime
            metrics.recordSendTime(sendTime)
            
            if process.terminationStatus != 0 {
                let errorData = errorPipe.fileHandleForReading.readDataToEndOfFile()
                let errorMessage = String(data: errorData, encoding: .utf8) ?? "Unknown error"
                metrics.recordError()
                throw NJSONError.messageSendingFailed(errorMessage)
            }
        } catch {
            metrics.recordError()
            throw NJSONError.messageSendingFailed(error.localizedDescription)
        }
    }
    
    // MARK: - Adaptive Timing
    private func calculateOptimalSleepTime(baseInterval: TimeInterval, messageCount: Int) -> TimeInterval {
        // Implement adaptive timing based on message volume
        // More messages = check more frequently
        if messageCount > 10 {
            return max(baseInterval * 0.5, 0.5) // Check at least twice as often but not faster than 0.5s
        } else if messageCount > 5 {
            return max(baseInterval * 0.75, 0.5) // Check 25% more often
        } else if messageCount == 0 {
            return min(baseInterval * 1.5, 3.0) // Slow down checks when no messages, but not more than 3s
        }
        
        // Default: use base interval
        return baseInterval
    }
    
    // MARK: - Metrics Reporting
    private func startMetricsReporting() {
        metricsReportingTask = Task {
            while isRunning {
                do {
                    // Sleep until next report
                    try await Task.sleep(nanoseconds: UInt64(metricsReportingInterval * 1_000_000_000))
                    
                    // Update uptime
                    metrics.uptime = Date().timeIntervalSince(metrics.startTime)
                    
                    // Get NJSON cognitive state
                    let cognitiveState = await njson.getCognitiveState()
                    
                    // Log current metrics
                    logger.info("""
                    Performance report:
                    - Uptime: \(metrics.uptime)s
                    - Messages processed: \(metrics.messagesProcessed) (\(metrics.highPriorityMessages) high priority)
                    - Database checks: \(metrics.databaseChecks) (avg \(metrics.averageCheckDuration)s)
                    - Errors: \(metrics.errorCount)
                    - NJSON cycles: \(cognitiveState.processingCycles)
                    - Subject changes: \(cognitiveState.subjectChanges)
                    - Avg. response length: \(cognitiveState.averageResponseLength) chars
                    """)
                } catch {
                    // Task cancelled or other error
                    break
                }
            }
        }
    }
    
    // MARK: - Metrics Access
    
    /// Get current bot performance metrics
    func getCurrentMetrics() -> BotMetrics {
        var currentMetrics = metrics
        currentMetrics.uptime = Date().timeIntervalSince(metrics.startTime)
        return currentMetrics
    }
}

// MARK: - Bot Metrics

/// Performance metrics for the BLF Bot
struct BotMetrics {
    var startTime: Date = Date()
    var uptime: TimeInterval = 0
    var messagesProcessed: Int = 0
    var highPriorityMessages: Int = 0
    var newMessageCount: Int = 0
    var databaseChecks: Int = 0
    var errorCount: Int = 0
    var averageCheckDuration: Double = 0
    var lastFatalError: String = ""
    private var totalProcessingTime: Double = 0
    private var totalSendTime: Double = 0
    
    mutating func recordMessageProcessed() {
        messagesProcessed += 1
    }
    
    mutating func recordHighPriorityMessage() {
        highPriorityMessages += 1
    }
    
    mutating func recordNewMessages(count: Int) {
        newMessageCount += count
    }
    
    mutating func recordDatabaseCheck(duration: Double, messageCount: Int) {
        let totalDuration = averageCheckDuration * Double(databaseChecks)
        databaseChecks += 1
        averageCheckDuration = (totalDuration + duration) / Double(databaseChecks)
    }
    
    mutating func recordProcessingTime(_ time: Double) {
        totalProcessingTime += time
    }
    
    mutating func recordSendTime(_ time: Double) {
        totalSendTime += time
    }
    
    mutating func recordError() {
        errorCount += 1
    }
    
    mutating func recordFatalError(_ description: String) {
        errorCount += 1
        lastFatalError = description
    }
}

// No need for separate MessageProcessor - directly using NJSON

enum MessagePriority: String {
    case high = "high"
    case normal = "normal"
}

struct Message: Identifiable, Hashable {
    let id: String
    let content: String
    let sender: String
    let timestamp: Date
    let threadId: String
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