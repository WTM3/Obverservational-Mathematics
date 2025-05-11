import Foundation
import Messages
import Combine
import os.log

/// Boolean Language Framework Message Processor optimized for qs³ processing
@available(macOS 10.15, *)
actor MessageProcessor {
    // Core components
    private let blfKey: BLFKey
    private let processingDispatchQueue = DispatchQueue(label: "com.blf.message.processing", 
                                                      qos: .userInteractive, 
                                                      attributes: .concurrent)
    
    // Message queuing with optimized flow
    private var messageQueue: [Message] = []
    private var priorityQueue: [Message] = []
    private var processingActive = false
    
    // Performance monitoring
    private var processingMetrics = ProcessingMetrics()
    private let logger = Logger(subsystem: "com.blf.iMessageBot", category: "MessageProcessor")
    
    // Reactive pipeline components for qs³ optimization
    private var messageSubject = PassthroughSubject<Message, Never>()
    private var priorityMessageSubject = PassthroughSubject<Message, Never>()
    private var cancellables = Set<AnyCancellable>()
    
    // MARK: - Initialization
    
    init() {
        // Initialize with optimized BLF Key for V8 performance
        self.blfKey = BLFKey()
        setupOptimizedProcessingPipeline()
        
        logger.debug("MessageProcessor initialized with qs³ optimization")
    }
    
    // MARK: - Pipeline Setup
    
    private func setupOptimizedProcessingPipeline() {
        // Regular message processing pipeline
        messageSubject
            .filter { !$0.content.isEmpty }
            // Apply throttling to manage flow at optimal throughput
            .throttle(for: .milliseconds(20), scheduler: DispatchQueue.global(qos: .userInteractive), latest: true)
            .sink { [weak self] message in
                Task {
                    await self?.processMessage(message, priority: .normal)
                }
            }
            .store(in: &cancellables)
        
        // Priority message processing pipeline (no throttling)
        priorityMessageSubject
            .filter { !$0.content.isEmpty }
            .sink { [weak self] message in
                Task {
                    await self?.processMessage(message, priority: .high)
                }
            }
            .store(in: &cancellables)
    }
    
    // MARK: - Message Processing
    
    func enqueueMessage(_ message: Message, priority: MessagePriority = .normal) {
        // Route to appropriate subject based on priority for qs³ optimization
        switch priority {
        case .high:
            priorityMessageSubject.send(message)
        case .normal:
            messageSubject.send(message)
        }
    }
    
    func processIncomingMessage(_ message: Message) async {
        // Add message to appropriate queue based on message characteristics
        if isHighPriorityMessage(message) {
            priorityQueue.append(message)
        } else {
            messageQueue.append(message)
        }
        
        // Process queue if not already processing
        if !processingActive {
            await processMessageQueue()
        }
    }
    
    private func isHighPriorityMessage(_ message: Message) -> Bool {
        // Identify high priority messages for quantum acceleration
        let content = message.content.lowercased()
        
        // Quick priority checks
        if content.contains("urgent") || 
           content.contains("emergency") ||
           content.contains("important") ||
           content.contains("asap") ||
           content.contains("right now") {
            return true
        }
        
        // Check for questions which often need faster responses
        if content.hasPrefix("what") ||
           content.hasPrefix("how") ||
           content.hasPrefix("when") ||
           content.hasPrefix("where") ||
           content.hasPrefix("why") ||
           content.hasSuffix("?") {
            return true
        }
        
        return false
    }
    
    private func processMessageQueue() async {
        guard !processingActive else { return }
        processingActive = true
        
        // First process all priority messages
        while !priorityQueue.isEmpty {
            do {
                let message = priorityQueue.removeFirst()
                try await processMessage(message, priority: .high)
            } catch {
                logger.error("Error processing priority message: \(error.localizedDescription)")
            }
        }
        
        // Then process regular messages
        while !messageQueue.isEmpty {
            do {
                let message = messageQueue.removeFirst()
                try await processMessage(message, priority: .normal)
            } catch {
                logger.error("Error processing message: \(error.localizedDescription)")
            }
        }
        
        processingActive = false
    }
    
    private func processMessage(_ message: Message, priority: MessagePriority) async {
        do {
            // Process using BLF Key with performance metrics
            logger.debug("Processing message: \(message.id) with priority: \(priority.rawValue)")
            let startTime = CFAbsoluteTimeGetCurrent()
            
            // Process with V8 engine
            let processedResult = try await blfKey.process(message.content)
            
            // Track performance metrics
            let totalTime = CFAbsoluteTimeGetCurrent() - startTime
            processingMetrics.recordProcessingTime(totalTime, priority: priority)
            
            logger.debug("Message processed in \(totalTime)s with status: \(processedResult.status)")
            
            // Only send response if processing was successful
            if processedResult.status == .completed {
                try await sendResponse(processedResult.result, to: message.sender, priority: priority)
            }
        } catch let error as BLFError {
            logger.error("BLF processing error: \(error)")
        } catch {
            logger.error("Unexpected error: \(error.localizedDescription)")
        }
    }
    
    // MARK: - Message Sending
    
    private func sendResponse(_ response: String, to recipient: String, priority: MessagePriority) async throws {
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
            processingMetrics.recordSendTime(sendTime, priority: priority)
            
            if process.terminationStatus != 0 {
                let errorData = errorPipe.fileHandleForReading.readDataToEndOfFile()
                let errorMessage = String(data: errorData, encoding: .utf8) ?? "Unknown error"
                processingMetrics.recordError()
                throw MessageProcessorError.sendingError(errorMessage)
            }
        } catch {
            processingMetrics.recordError()
            throw MessageProcessorError.sendingError(error.localizedDescription)
        }
    }
    
    // MARK: - Performance Metrics
    
    /// Get current performance metrics for monitoring
    func getPerformanceMetrics() -> ProcessingMetrics {
        return processingMetrics
    }
    
    /// Reset performance metrics
    func resetPerformanceMetrics() {
        processingMetrics = ProcessingMetrics()
    }
}

// MARK: - Supporting Types

/// Quantum-optimized message processing metrics
struct ProcessingMetrics {
    var totalMessagesProcessed: Int = 0
    var highPriorityMessagesProcessed: Int = 0
    var averageProcessingTime: Double = 0.0
    var highPriorityAverageProcessingTime: Double = 0.0
    var averageSendTime: Double = 0.0
    var errorCount: Int = 0
    
    mutating func recordProcessingTime(_ time: Double, priority: MessagePriority) {
        if priority == .high {
            // Update high priority stats
            let newTotal = highPriorityMessagesProcessed * highPriorityAverageProcessingTime + time
            highPriorityMessagesProcessed += 1
            highPriorityAverageProcessingTime = newTotal / Double(highPriorityMessagesProcessed)
        }
        
        // Update overall stats
        let newTotal = totalMessagesProcessed * averageProcessingTime + time
        totalMessagesProcessed += 1
        averageProcessingTime = newTotal / Double(totalMessagesProcessed)
    }
    
    mutating func recordSendTime(_ time: Double, priority: MessagePriority) {
        // For now we don't differentiate send time by priority
        let newTotal = totalMessagesProcessed * averageSendTime + time
        averageSendTime = newTotal / Double(totalMessagesProcessed)
    }
    
    mutating func recordError() {
        errorCount += 1
    }
}

/// Message priority for quantum acceleration
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

// MARK: - Error Types
enum MessageProcessorError: Error {
    case processingError(String)
    case sendingError(String)
    case queueError(String)
} 