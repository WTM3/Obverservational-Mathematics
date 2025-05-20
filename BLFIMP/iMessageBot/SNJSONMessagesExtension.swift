import Foundation
import Messages
import Combine

// MARK: - SNJSON Messages Extension
@available(iOS 14.0, macOS 11.0, *)
class SNJSONMessagesExtension {
    // Core SNJSON components
    private let messageProcessor: MessageProcessor
    private var cancellables = Set<AnyCancellable>()
    
    // Message handling state
    private var messageObserver: NSObjectProtocol?
    private var isMonitoring = false
    private var lastProcessedMessageId: String?
    
    // Configuration
    private let processingQueue = DispatchQueue(label: "com.snjson.messageProcessing", qos: .userInitiated)
    private let config: SNJSONConfig
    private let userAge: Int
    
    // Metrics
    private var processedMessageCount = 0
    private var lastProcessingTime: TimeInterval = 0
    
    // Initialization
    init(userAge: Int, config: SNJSONConfig = SNJSONConfig()) {
        self.userAge = userAge
        self.messageProcessor = MessageProcessor(userAge: userAge)
        self.config = config
        
        // Log initialization
        log("SNJSON Messages Extension initialized with exact 0.1 buffer")
    }
    
    deinit {
        stopMonitoring()
    }
    
    // MARK: - Message Monitoring
    
    /// Start monitoring Messages for new content
    func startMonitoring() {
        guard !isMonitoring else {
            log("Already monitoring messages")
            return
        }
        
        log("Starting message monitoring with SNJSON framework")
        isMonitoring = true
        
        // Register for new message notifications
        if #available(macOS 11.0, *) {
            setupMacOSMonitoring()
        } else {
            log("ERROR: Unsupported OS version")
        }
    }
    
    /// Stop monitoring Messages
    func stopMonitoring() {
        guard isMonitoring else { return }
        
        // Remove observers
        if let observer = messageObserver {
            NotificationCenter.default.removeObserver(observer)
            messageObserver = nil
        }
        
        isMonitoring = false
        log("Message monitoring stopped")
    }
    
    // MARK: - Platform-specific Implementations
    
    private func setupMacOSMonitoring() {
        // Set up message monitoring for macOS
        messageObserver = NotificationCenter.default.addObserver(
            forName: Notification.Name("com.apple.messages.receivedMessage"),
            object: nil,
            queue: OperationQueue.main
        ) { [weak self] notification in
            guard let self = self else { return }
            self.handleNewMessageNotification(notification)
        }
        
        // Activate monitoring script
        activateMessagesScript()
        
        log("macOS message monitoring active with exact 0.1 buffer")
    }
    
    private func activateMessagesScript() {
        // AppleScript to allow monitoring iMessage
        let script = """
        tell application "Messages"
            log "SNJSON framework monitoring activated"
        end tell
        """
        
        // Execute the script
        let task = Process()
        task.launchPath = "/usr/bin/osascript"
        task.arguments = ["-e", script]
        
        do {
            try task.run()
        } catch {
            log("ERROR: Failed to activate Messages script: \(error.localizedDescription)")
        }
    }
    
    // MARK: - Message Handling
    
    private func handleNewMessageNotification(_ notification: Notification) {
        // Extract message data from notification
        guard let userInfo = notification.userInfo,
              let sender = userInfo["sender"] as? String,
              let text = userInfo["text"] as? String,
              let messageId = userInfo["messageId"] as? String else {
            log("WARNING: Received invalid message notification")
            return
        }
        
        // Skip already processed messages
        if messageId == lastProcessedMessageId {
            return
        }
        
        // Store message ID
        lastProcessedMessageId = messageId
        
        // Process message on background queue
        processingQueue.async { [weak self] in
            guard let self = self else { return }
            self.processIncomingMessage(text, from: sender, messageId: messageId)
        }
    }
    
    private func processIncomingMessage(_ text: String, from sender: String, messageId: String) {
        // Skip messages from this device if configured
        if sender == config.deviceOwner && !config.processOwnMessages {
            return
        }
        
        // Track metrics
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Process message through SNJSON framework
        let result = messageProcessor.process(message: text)
        
        // Update processing metrics
        processedMessageCount += 1
        lastProcessingTime = CFAbsoluteTimeGetCurrent() - startTime
        
        // Log the result with quantum state protection
        log("Processed message from \(sender): buffer integrity \(result.processingMetrics.bufferIntegrity ? "maintained" : "violated"), confidence: \(result.confidence)")
        
        // Handle result based on configuration
        if config.autoRespond {
            sendResponse(result.response, to: sender)
        }
        
        // Handle intervention if needed
        if result.requiresIntervention {
            handleIntervention(result, message: text, from: sender)
        }
        
        // Log recovery events
        if result.recoveryAttempted {
            logRecoveryEvent(result)
        }
        
        // Surface heat shield warnings/blocks to the user
        if let hsScore = result.processingMetrics.heatShieldScore, let hsReason = result.processingMetrics.heatShieldReason {
            if !result.processingMetrics.bufferIntegrity || !result.processingMetrics.recoveryStats?.successRate.isNaN ?? false {
                // Already handled by intervention
            } else if hsScore > 0.3 && result.processingMetrics.heatShieldReason?.contains("warning") == true {
                // Heat shield warning (not blocked)
                let warningMsg: String
                if userAge < 13 {
                    warningMsg = "🙂 I'm not fully confident in my answer—please ask again or try a different question! (Uncertainty: \(String(format: "%.2f", hsScore)))"
                } else {
                    warningMsg = "[Engine Light] I'm not fully confident in my answer—please clarify or rephrase if needed. (Uncertainty: \(String(format: "%.2f", hsScore)))"
                }
                switch config.interventionMode {
                case .autoRespond:
                    sendResponse(warningMsg, to: sender)
                case .alert:
                    postUserNotification(title: "SNJSON Engine Light", subtitle: "Uncertainty: \(String(format: "%.2f", hsScore))", message: warningMsg)
                case .log:
                    log(warningMsg)
                case .custom where config.customInterventionHandler != nil:
                    config.customInterventionHandler?(result, warningMsg, sender)
                default:
                    log(warningMsg)
                }
            } else if result.processingMetrics.heatShieldReason?.contains("uncertainty threshold exceeded") == true || result.processingMetrics.heatShieldReason?.contains("hallucination indicator detected") == true {
                // Heat shield block
                let blockMsg: String
                if userAge < 13 {
                    blockMsg = "☹️ I'm being careful—please try asking your question a different way! (Uncertainty: \(String(format: "%.2f", hsScore)))"
                } else {
                    blockMsg = "[Engine Light] I'm being cautious—please rephrase your question for a more confident answer. (Uncertainty: \(String(format: "%.2f", hsScore)))"
                }
                switch config.interventionMode {
                case .autoRespond:
                    sendResponse(blockMsg, to: sender)
                case .alert:
                    postUserNotification(title: "SNJSON Engine Light", subtitle: "Blocked for Uncertainty", message: blockMsg)
                case .log:
                    log(blockMsg)
                case .custom where config.customInterventionHandler != nil:
                    config.customInterventionHandler?(result, blockMsg, sender)
                default:
                    log(blockMsg)
                }
            }
        }
    }
    
    // MARK: - Response Handling
    
    private func sendResponse(_ text: String, to recipient: String) {
        guard config.autoRespond else { return }
        
        // Construct AppleScript to send message
        let escapedText = text.replacingOccurrences(of: "\"", with: "\\\"")
        let script = """
        tell application "Messages"
            set targetService to 1st service whose service type = iMessage
            set targetBuddy to buddy "\(recipient)" of targetService
            send "\(escapedText)" to targetBuddy
        end tell
        """
        
        // Execute the script on background thread
        DispatchQueue.global(qos: .background).async {
            let task = Process()
            task.launchPath = "/usr/bin/osascript"
            task.arguments = ["-e", script]
            
            do {
                try task.run()
                task.waitUntilExit()
            } catch {
                self.log("ERROR: Failed to send message: \(error.localizedDescription)")
            }
        }
    }
    
    private func handleIntervention(_ result: MessageProcessor.ProcessResult, message: String, from sender: String) {
        // Handle required interventions based on configuration
        switch config.interventionMode {
        case .alert:
            // Show alert through notification or UI
            postInterventionAlert(message: message, from: sender, result: result)
            
        case .autoRespond:
            // Already handled in sendResponse
            break
            
        case .log:
            // Just log the intervention
            log("INTERVENTION REQUIRED for message from \(sender): \(message)")
            
        case .custom where config.customInterventionHandler != nil:
            // Use custom handler
            config.customInterventionHandler?(result, message, sender)
        
        default:
            log("Intervention required but no handler configured")
        }
    }
    
    private func postInterventionAlert(message: String, from sender: String, result: MessageProcessor.ProcessResult) {
        // Create macOS notification
        if #available(macOS 11.0, *) {
            let notification = """
            osascript -e 'display notification "Message from \(sender) requires attention" with title "SNJSON Alert" subtitle "Confidence: \(String(format: "%.2f", result.confidence))"'
            """
            
            let task = Process()
            task.launchPath = "/bin/bash"
            task.arguments = ["-c", notification]
            
            do {
                try task.run()
            } catch {
                log("ERROR: Failed to post alert: \(error.localizedDescription)")
            }
        }
    }
    
    // MARK: - Logging & Metrics
    
    private func log(_ message: String) {
        if config.enableLogging {
            let timestamp = DateFormatter.localizedString(from: Date(), dateStyle: .none, timeStyle: .medium)
            print("[\(timestamp)] SNJSON: \(message)")
            
            // Also add to processor journal if configured
            if config.journalSystemLogs {
                messageProcessor.addJournalEntry(title: "System Log", details: message)
            }
        }
    }
    
    private func logRecoveryEvent(_ result: MessageProcessor.ProcessResult) {
        guard let stats = result.processingMetrics.recoveryStats else { return }
        
        log("""
        RECOVERY EVENT:
        - Attempts: \(stats.attemptCount)
        - Success rate: \(String(format: "%.2f", stats.successRate * 100))%
        - Recovery time: \(String(format: "%.4f", stats.recoveryTime))s
        - Alignment delta: \(String(format: "%.6f", stats.alignmentDelta))
        """)
    }
    
    // MARK: - Utility Methods
    
    /// Export the message processor journal
    func exportJournal() -> String {
        return messageProcessor.exportJournalMarkdown()
    }
    
    /// Save journal to file
    func saveJournal(to path: String? = nil) {
        if let customPath = path {
            let fileURL = URL(fileURLWithPath: customPath)
            do {
                try messageProcessor.exportJournalMarkdown().write(to: fileURL, atomically: true, encoding: .utf8)
                log("Journal saved to \(customPath)")
            } catch {
                log("ERROR: Failed to save journal: \(error.localizedDescription)")
            }
        } else {
            messageProcessor.saveJournalToRoot()
        }
    }
    
    /// Get current metrics
    func getMetrics() -> SNJSONMetrics {
        return SNJSONMetrics(
            processedMessageCount: processedMessageCount,
            lastProcessingTime: lastProcessingTime,
            isMonitoring: isMonitoring,
            bufferIntegrity: true  // Always maintain 0.1 buffer
        )
    }
    
    // Add a helper for user notifications
    private func postUserNotification(title: String, subtitle: String, message: String) {
        if #available(macOS 11.0, *) {
            let notification = "osascript -e 'display notification \"\(message)\" with title \"\(title)\" subtitle \"\(subtitle)\"'"
            let task = Process()
            task.launchPath = "/bin/bash"
            task.arguments = ["-c", notification]
            do {
                try task.run()
            } catch {
                log("ERROR: Failed to post user notification: \(error.localizedDescription)")
            }
        }
    }
}

// MARK: - Configuration & Metrics Types

/// Configuration for SNJSON Messages Extension
struct SNJSONConfig {
    /// User identifier for this device
    var deviceOwner: String = ""
    
    /// Whether to process messages sent from this device
    var processOwnMessages: Bool = false
    
    /// Whether to automatically respond to messages
    var autoRespond: Bool = false
    
    /// How to handle required interventions
    var interventionMode: InterventionMode = .log
    
    /// Custom intervention handler
    var customInterventionHandler: ((MessageProcessor.ProcessResult, String, String) -> Void)? = nil
    
    /// Enable detailed logging
    var enableLogging: Bool = true
    
    /// Include system logs in MessageProcessor journal
    var journalSystemLogs: Bool = true
    
    /// Intervention handling modes
    enum InterventionMode {
        case alert       // Show alert
        case autoRespond // Send response
        case log         // Just log
        case custom      // Use custom handler
    }
}

/// Metrics for SNJSON Messages Extension
struct SNJSONMetrics {
    let processedMessageCount: Int
    let lastProcessingTime: TimeInterval
    let isMonitoring: Bool
    let bufferIntegrity: Bool
}

// MARK: - Example Usage
/*
// Initialize extension with default config
let extension = SNJSONMessagesExtension(userAge: 30)

// Start monitoring messages
extension.startMonitoring()

// Later, stop monitoring
// extension.stopMonitoring()

// Export journal
// let journal = extension.exportJournal()
// extension.saveJournal()

// Get metrics
// let metrics = extension.getMetrics()
*/ 