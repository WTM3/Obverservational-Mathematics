import Foundation
import Messages
import Combine
import os.log

@available(macOS 10.15, *)
actor MessageProcessor {
    private let blfKey: BLFKey
    private var messageQueue: [Message] = []
    private var processingActive = false
    private let logger = Logger(subsystem: "com.blf.iMessageBot", category: "MessageProcessor")
    private var messageSubject = PassthroughSubject<Message, Never>()
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        // Initialize with default configuration
        self.blfKey = BLFKey()
        setupMessageProcessingPipeline()
    }
    
    // MARK: - Setup Processing Pipeline
    private func setupMessageProcessingPipeline() {
        // Create a high-performance processing pipeline using Combine
        messageSubject
            .filter { !$0.content.isEmpty }
            .throttle(for: .milliseconds(50), scheduler: DispatchQueue.global(qos: .userInteractive), latest: true)
            .sink { [weak self] message in
                Task {
                    await self?.processMessage(message)
                }
            }
            .store(in: &cancellables)
    }
    
    // MARK: - Message Processing
    func enqueueMessage(_ message: Message) {
        messageSubject.send(message)
    }
    
    func processIncomingMessage(_ message: Message) async {
        // Add message to queue
        messageQueue.append(message)
        
        // Process queue if not already processing
        if !processingActive {
            await processMessageQueue()
        }
    }
    
    private func processMessageQueue() async {
        guard !processingActive else { return }
        processingActive = true
        
        while !messageQueue.isEmpty {
            do {
                let message = messageQueue.removeFirst()
                try await processMessage(message)
            } catch {
                logger.error("Error processing message: \(error.localizedDescription)")
            }
        }
        
        processingActive = false
    }
    
    private func processMessage(_ message: Message) async {
        do {
            // Process using BLF Key (the V8 engine)
            logger.debug("Processing message: \(message.id)")
            let startTime = CFAbsoluteTimeGetCurrent()
            
            let processedResult = try await blfKey.process(message.content)
            
            let totalTime = CFAbsoluteTimeGetCurrent() - startTime
            logger.debug("Message processed in \(totalTime)s with status: \(processedResult.status)")
            
            // Only send response if processing was successful
            if processedResult.status == .completed {
                try await sendResponse(processedResult.result, to: message.sender)
            }
        } catch let error as BLFError {
            logger.error("BLF processing error: \(error)")
        } catch {
            logger.error("Unexpected error: \(error.localizedDescription)")
        }
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
        
        do {
            try process.run()
            process.waitUntilExit()
            
            if process.terminationStatus != 0 {
                let errorData = errorPipe.fileHandleForReading.readDataToEndOfFile()
                let errorMessage = String(data: errorData, encoding: .utf8) ?? "Unknown error"
                throw MessageProcessorError.sendingError(errorMessage)
            }
        } catch {
            throw MessageProcessorError.sendingError(error.localizedDescription)
        }
    }
}

// MARK: - Supporting Types
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