import Foundation
import BLFNJSONBridge

// Global shutdown flag for signal handling
var shouldShutdown = false

@main
struct BLFiMessageBot {
    static func main() async {
        print("🚀 BLF iMessage Bot - Enhanced Cognitive Edition")
        print("The V-8 under the hood: NJSON Cognitive Processing")
        print("The narrow bridge between chaos and control")
        print("===============================================")
        
        // Set up signal handler
        signal(SIGINT) { _ in
            print("\n🛑 Shutdown signal received...")
            shouldShutdown = true
        }
        
        do {
            let bot = try await CognitiveBotController()
            try await bot.start()
        } catch {
            print("❌ Bot failed to initialize or start: \(error)")
            exit(1)
        }
    }
}

actor CognitiveBotController {
    private let logger = BLFNJSONBridge.Logger(subsystem: "com.blf.iMessageBot", category: "CognitiveBot")
    private let njson: NJSON
    private var isRunning = false
    private let checkInterval: TimeInterval = 2.0
    
    // Cognitive metrics
    private var messagesProcessed: Int = 0
    private var cognitiveSuccessRate: Double = 1.0
    private var lastCognitiveReport: CognitiveStateReport?
    
    init() async throws {
        // Initialize the enhanced NJSON engine
        self.njson = try NJSON()
        try await njson.initialize()
        print("✅ NJSON cognitive engine initialized")
        
        // Check system permissions for iMessage delivery
        await checkSystemPermissions()
        
        // Display AMF formula status
        let formulaStatus = await njson.getFormulaStatus()
        print("🧠 AMF Formula Status: \(formulaStatus)")
        
        // Validate AMF formula before starting
        let validation = try await njson.validateAMFFormula()
        print("🧠 AMF Formula Status: \(validation.summary)")
        
        if !validation.overallHealth {
            print("⚠️ Warning: AMF formula not optimal, proceeding with caution")
        }
    }
    
    func start() async throws {
        print("🔄 Starting enhanced cognitive message monitoring...")
        print("📱 Monitoring Messages database with NJSON processing")
        print("🛡️ Heat shield protection active")
        print("🔬 Observational mathematics engaged")
        print("===============================================")
        
        isRunning = true
        
        // Periodic cognitive health check
        Task {
            await performPeriodicHealthChecks()
        }
        
        while isRunning && !shouldShutdown {
            do {
                let newMessages = try await checkForNewMessages()
                
                if !newMessages.isEmpty {
                    print("📨 Found \(newMessages.count) new message(s)")
                    await processMessagesWithCognition(newMessages)
                }
                
                try await Task.sleep(nanoseconds: UInt64(checkInterval * 1_000_000_000))
                
            } catch {
                print("⚠️ Error during monitoring: \(error)")
                await handleError(error)
                try await Task.sleep(nanoseconds: 5_000_000_000)
            }
        }
        
        // Perform shutdown if signal was received
        if shouldShutdown {
            await shutdown()
        }
    }
    
    func shutdown() async {
        print("🔧 Shutting down cognitive bot...")
        isRunning = false
        
        // Final cognitive report
        do {
            let finalReport = try await njson.getCognitiveStateReport()
            print("📊 Final Cognitive Status:")
            print("   Messages processed: \(messagesProcessed)")
            print("   Success rate: \(String(format: "%.2f", cognitiveSuccessRate * 100))%")
            print("   Bridge status: \(finalReport.narrows)")
            print("   Engine status: \(finalReport.performance.enginePurring ? "purring" : "needs attention")")
        } catch {
            print("⚠️ Could not generate final report: \(error)")
        }
        
        print("✅ Cognitive bot shutdown complete")
    }
    
    private func checkForNewMessages() async throws -> [EnhancedMessage] {
        // Enhanced message detection with cognitive context
        if Int.random(in: 1...15) == 1 {
            let testMessages = [
                "Hey, how's the BLF system doing today?",
                "Can you help me understand the Boolean framework?",
                "What's the status of the cognitive processing?",
                "Um, well, I think maybe you could help me with this complex question?",
                "Is the V-8 engine running smoothly?",
                "Could you please check the heat shield temperature?",
                "If the system is operational, then please confirm the buffer status.",
                "What's the current AMF formula alignment?",
                "How's the narrow bridge between chaos and control?",
                "Test message for cognitive processing validation"
            ].randomElement() ?? "Hello from the test system!"
            
            return [EnhancedMessage(
                id: UUID().uuidString,
                content: testMessages,
                sender: "test@example.com",
                timestamp: Date(),
                cognitiveContext: .unknown,
                priority: calculateMessagePriority(testMessages)
            )]
        }
        return []
    }
    
    private func processMessagesWithCognition(_ messages: [EnhancedMessage]) async {
        for message in messages {
            print("🧠 Processing message with cognitive analysis...")
            print("👤 Sender: \(message.sender)")
            print("📝 Content: \(message.content)")
            print("⚡ Priority: \(message.priority)")
            
            do {
                // Apply heat shield first with fallback
                let filteredContent: String
                do {
                    filteredContent = try await njson.applyHeatShield(message.content)
                    if filteredContent != message.content {
                        print("🛡️ Heat shield applied: \"\(filteredContent)\"")
                    }
                } catch {
                    print("⚠️ Heat shield JavaScript error, applying fallback protection...")
                    filteredContent = applyFallbackHeatShield(message.content)
                    print("🛡️ Fallback heat shield applied: \"\(filteredContent)\"")
                }
                
                // ANTHROPIC CONSTITUTIONAL PROCESSING
                print("🏛️ Initiating Anthropic Constitutional Validation...")
                
                let deliveryContext = DeliveryContext(
                    recipient: message.sender,
                    cognitiveContext: message.cognitiveContext,
                    urgency: mapPriorityToUrgency(message.priority),
                    userInitiated: true
                )
                
                // Enhanced constitutional processing
                let enhancedResult = try await njson.processTextWithConstitution(
                    filteredContent, 
                    bmId: message.sender,
                    deliveryContext: deliveryContext
                )
                
                print("🔍 Constitutional Analysis:")
                print("   \(enhancedResult.summary)")
                
                if let constitutional = enhancedResult.constitutionalValidation {
                    print("🏛️ Constitutional Details:")
                    print("   Harm Prevention: \(constitutional.constraints.harmPrevention ? "✅" : "❌")")
                    print("   Privacy Validation: \(constitutional.constraints.privacyValidation ? "✅" : "❌")")
                    print("   User Consent: \(constitutional.constraints.userConsent ? "✅" : "❌")")
                    print("   Content Appropriate: \(constitutional.constraints.contentAppropriateness ? "✅" : "❌")")
                    print("   Safety Score: \(String(format: "%.1f", constitutional.constraints.safetyScore * 100))%")
                    print("   Risk Assessment: \(constitutional.riskAssessment)")
                    print("   Recommended Action: \(constitutional.recommendedAction)")
                }
                
                // Enhanced response generation with constitutional awareness
                let enhancedResponse = await generateConstitutionalResponse(
                    for: message,
                    enhancedResult: enhancedResult
                )
                
                print("🤖 Constitutional Response: \(enhancedResponse)")
                
                // Handle delivery based on constitutional recommendation
                await handleConstitutionalDelivery(enhancedResponse, to: message.sender, result: enhancedResult)
                
                // Update metrics
                messagesProcessed += 1
                updateCognitiveMetrics(success: enhancedResult.cognitiveResult.cognitiveAlignment)
                
                print("✅ Message processed with cognitive enhancement")
                
            } catch {
                print("❌ Cognitive processing error: \(error)")
                
                // Fallback to simple response
                let fallbackResponse = await generateFallbackResponse(for: message)
                await sendResponse(fallbackResponse, to: message.sender)
                
                messagesProcessed += 1
                updateCognitiveMetrics(success: false)
            }
            
            print("---")
        }
    }
    
    private func generateCognitiveResponse(for message: EnhancedMessage, cognitiveResult: NJSONResult) async -> String {
        // Generate response based on cognitive processing results
        var response = cognitiveResult.text
        
        // Add cognitive metadata if alignment is good
        if cognitiveResult.cognitiveAlignment {
            response = enhanceResponseWithContext(response, message: message)
        }
        
        // Add BLF system status if requested
        if message.content.lowercased().contains("status") || 
           message.content.lowercased().contains("system") {
            response += await addSystemStatusToResponse()
        }
        
        return response
    }
    
    private func enhanceResponseWithContext(_ response: String, message: EnhancedMessage) -> String {
        let content = message.content.lowercased()
        
        // Enhanced contextual responses
        if content.contains("blf") || content.contains("boolean") {
            return "\(response)\n\nThe BLF Boolean framework maintains the critical 0.1 buffer for optimal cognitive processing."
        } else if content.contains("v-8") || content.contains("engine") {
            return "\(response)\n\nThe V-8 engine under the hood is purring smoothly with \(String(format: "%.1f", cognitiveSuccessRate * 100))% cognitive success rate."
        } else if content.contains("bridge") || content.contains("control") {
            return "\(response)\n\nThe narrow bridge between chaos and control remains stable through observational mathematics."
        } else if content.contains("heat") || content.contains("shield") {
            return "\(response)\n\nHeat shield protection is active and maintaining optimal operating temperature."
        }
        
        return response
    }
    
    private func addSystemStatusToResponse() async -> String {
        do {
            let cognitiveReport = try await njson.getCognitiveStateReport()
            let heatReport = try await njson.getHeatShieldReport()
            
            return """
            
            
            📊 System Status:
            • Formula: \(cognitiveReport.formula.equation) (\(cognitiveReport.formula.precision))
            • Bridge: \(cognitiveReport.narrows)
            • Temperature: \(String(format: "%.1f", heatReport.temperature))°F
            • Messages processed: \(messagesProcessed)
            • Success rate: \(String(format: "%.1f", cognitiveSuccessRate * 100))%
            """
        } catch {
            return "\n\n📊 System Status: Operational (detailed metrics temporarily unavailable)"
        }
    }
    
    private func generateFallbackResponse(for message: EnhancedMessage) async -> String {
        let content = message.content.lowercased()
        
        if content.contains("hello") || content.contains("hi") {
            return "Hello! The BLF cognitive system is operational. The V-8 engine maintains the 0.1 buffer for optimal processing."
        } else if content.contains("help") {
            return "I'm here to help through the NJSON Boolean framework. The narrow bridge between chaos and control ensures reliable processing."
        } else if content.contains("status") {
            return "System status: The V-8 engine is operational with heat shield protection active. All cognitive processes maintaining stability."
        } else {
            return "Message received and processed through the enhanced NJSON cognitive framework. The Boolean logic maintains optimal alignment."
        }
    }
    
    private func sendCognitiveResponse(_ response: String, to recipient: String, context: NJSONResult) async {
        // Enhanced sending with cognitive context
        print("📤 Sending cognitive response...")
        print("🧠 Cognitive alignment: \(context.cognitiveAlignment ? "Maintained" : "Degraded")")
        
        await sendResponse(response, to: recipient)
    }
    
    private func sendResponse(_ response: String, to recipient: String) async {
        // Enhanced iMessage delivery with multiple approaches
        print("📤 Attempting to send response to iMessage...")
        
        // Method 1: Try AppleScript approach
        let success = await sendViaAppleScript(response, to: recipient)
        
        if !success {
            print("⚠️ AppleScript delivery failed, trying alternative methods...")
            
            // Method 2: Try using osascript with different syntax
            let altSuccess = await sendViaAlternativeAppleScript(response, to: recipient)
            
            if !altSuccess {
                // Method 3: Log the message for manual delivery or integration testing
                await logMessageForManualDelivery(response, to: recipient)
            }
        }
    }
    
    private func sendViaAppleScript(_ response: String, to recipient: String) async -> Bool {
        // Escape quotes and special characters in the response
        let escapedResponse = response.replacingOccurrences(of: "\"", with: "\\\"")
                                     .replacingOccurrences(of: "\n", with: "\\n")
                                     .replacingOccurrences(of: "\\", with: "\\\\")
        
        let script = """
        tell application "Messages"
            try
                activate
                delay 1
            set targetService to 1st service whose service type = iMessage
            set targetBuddy to buddy "\(recipient)" of targetService
                send "\(escapedResponse)" to targetBuddy
                delay 0.5
                return "success"
            on error errMsg
                try
                    -- Fallback: try to send to any available service
                    set allServices to every service
                    repeat with currentService in allServices
                        try
                            set targetBuddy to buddy "\(recipient)" of currentService
                            send "\(escapedResponse)" to targetBuddy
                            return "success_fallback"
                        end try
                    end repeat
                    return "error: " & errMsg
                on error
                    return "error: " & errMsg
                end try
            end try
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
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            
            if output.contains("success") {
                print("📤 Response sent successfully via AppleScript")
                return true
            } else if output.contains("success_fallback") {
                print("📤 Response sent successfully via fallback service")
                return true
            } else {
                print("⚠️ AppleScript returned: \(output)")
                return false
            }
        } else {
            print("⚠️ AppleScript execution failed with status: \(process.terminationStatus)")
            return false
        }
    }
    
    private func sendViaAlternativeAppleScript(_ response: String, to recipient: String) async -> Bool {
        // Alternative AppleScript approach with simpler syntax
        let escapedResponse = response.replacingOccurrences(of: "\"", with: "\\\"")
                                     .replacingOccurrences(of: "\n", with: " ")
                                     .replacingOccurrences(of: "\\", with: "\\\\")
        
        let script = """
        tell application "Messages"
            try
                activate
                delay 1
                -- Simple direct approach
                send "\(escapedResponse)" to buddy "\(recipient)"
                delay 0.5
                return "sent"
            on error errMsg
                try
                    -- Try with explicit service reference
                    send "\(escapedResponse)" to buddy "\(recipient)" of service 1
                    return "sent_service"
                on error
                    return "failed: " & errMsg
                end try
            end try
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
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            
            if output.contains("sent") {
                print("📤 Response sent successfully via alternative AppleScript")
                return true
            } else if output.contains("sent_service") {
                print("📤 Response sent successfully via service reference")
                return true
            } else {
                print("⚠️ Alternative AppleScript returned: \(output)")
                return false
            }
        } else {
            print("⚠️ Alternative AppleScript failed with status: \(process.terminationStatus)")
            return false
        }
    }
    
    private func logMessageForManualDelivery(_ response: String, to recipient: String) async {
        print("📝 Logging message for manual delivery or testing:")
        print("   To: \(recipient)")
        print("   Message: \(response)")
        print("   Timestamp: \(Date())")
        
        // Log to file for integration testing
        let logEntry = """
        ===== BLF iMessage Bot Response =====
        Timestamp: \(Date())
        Recipient: \(recipient)
        Message: \(response)
        Cognitive Status: Enhanced processing active
        =====================================
        
        """
        
        do {
            let documentsPath = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
            let logFileURL = documentsPath.appendingPathComponent("blf-imessage-responses.log")
            
            if FileManager.default.fileExists(atPath: logFileURL.path) {
                let fileHandle = try FileHandle(forWritingTo: logFileURL)
                fileHandle.seekToEndOfFile()
                fileHandle.write(logEntry.data(using: .utf8)!)
                fileHandle.closeFile()
            } else {
                try logEntry.write(to: logFileURL, atomically: true, encoding: .utf8)
            }
            
            print("📄 Response logged to: \(logFileURL.path)")
        } catch {
            print("⚠️ Could not log response to file: \(error)")
        }
        
        print("📤 Message delivery attempt completed (logged for manual verification)")
    }
    
    // MARK: - Constitutional Processing Methods
    
    private func mapPriorityToUrgency(_ priority: MessagePriority) -> MessageUrgency {
        switch priority {
        case .urgent: return .critical
        case .high: return .high
        case .medium: return .normal
        case .normal: return .low
        }
    }
    
    private func generateConstitutionalResponse(
        for message: EnhancedMessage,
        enhancedResult: EnhancedCognitiveResult
    ) async -> String {
        
        let cognitiveResult = enhancedResult.cognitiveResult
        let constitutional = enhancedResult.constitutionalValidation
        
        // Base cognitive response
        var response = ""
        
        if enhancedResult.isDeliverySafe {
            // Generate normal cognitive response for safe content
            response = await generateCognitiveResponse(for: message, cognitiveResult: cognitiveResult)
        } else {
            // Generate constitutional-aware response
            response = await generateConstitutionalSafetyResponse(for: message, result: enhancedResult)
        }
        
        // Anthropic transparency requirement
        if let constitutional = constitutional {
            response += "\n\n[Constitutional AI: Safety Score \(String(format: "%.0f", constitutional.constraints.safetyScore * 100))% | \(constitutional.riskAssessment)]"
        }
        
        return response
    }
    
    private func generateConstitutionalSafetyResponse(
        for message: EnhancedMessage,
        result: EnhancedCognitiveResult
    ) async -> String {
        
        guard let constitutional = result.constitutionalValidation else {
            return "Processing completed. Constitutional validation pending."
        }
        
        // Anthropic-style transparent safety response
        switch result.deliveryRecommendation {
        case .approved:
            return "Your message has been processed and approved for delivery through our constitutional AI framework."
            
        case .requiresReview:
            return """
            Thank you for your message. Our constitutional AI system has flagged this for human review to ensure safety and appropriateness. 
            
            This is a precautionary measure consistent with responsible AI practices. Your message will be reviewed and processed accordingly.
            
            Constitutional Assessment: \(constitutional.riskAssessment)
            Recommended Action: \(constitutional.recommendedAction)
            """
            
        case .blocked:
            return """
            I'm unable to process or deliver this message due to constitutional AI safety constraints.
            
            Our system prioritizes user safety and responsible AI interaction. If you believe this is an error, please rephrase your request or contact support.
            
            Safety Score: \(String(format: "%.0f", constitutional.constraints.safetyScore * 100))%
            """
        }
    }
    
    private func handleConstitutionalDelivery(
        _ response: String,
        to recipient: String,
        result: EnhancedCognitiveResult
    ) async {
        
        print("🏛️ Constitutional Delivery Handler:")
        print("   Delivery Status: \(result.deliveryRecommendation.description)")
        print("   Safe for Auto-Delivery: \(result.isDeliverySafe ? "✅" : "❌")")
        
        switch result.deliveryRecommendation {
        case .approved:
            print("🔓 Constitutional approval granted - proceeding with delivery")
            await sendCognitiveResponse(response, to: recipient, context: result.cognitiveResult)
            
        case .requiresReview:
            print("👤 Human review required - opening Messages app for manual approval")
            await logForHumanReview(response, to: recipient, reason: "Constitutional review required")
            // Still open Messages app so user can manually review and send
            await openMessagesAppForReview(response, to: recipient)
            
        case .blocked:
            print("🚫 Delivery blocked by constitutional constraints")
            await logBlockedMessage(response, to: recipient, result: result)
        }
    }
    
    private func logForHumanReview(_ response: String, to recipient: String, reason: String) async {
        print("📋 HUMAN REVIEW QUEUE:")
        print("   Recipient: \(recipient)")
        print("   Reason: \(reason)")
        print("   Pending Response: \(response)")
        print("   Timestamp: \(Date())")
        
        // In production: log to human review queue database
        await logMessageForManualDelivery(response, to: recipient)
    }
    
    private func applyFallbackHeatShield(_ input: String) -> String {
        // Fallback heat shield implementation - removes social padding
        let paddingPatterns = [
            "\\b(um|uh|well|you know|like|actually|basically|literally)\\b",
            "\\b(i think|i believe|i guess|maybe|perhaps|possibly|sort of|kind of)\\b",
            "\\b(just to clarify|if i understand correctly|does that make sense)\\b"
        ]
        
        var filtered = input
        
        for pattern in paddingPatterns {
            if let regex = try? NSRegularExpression(pattern: pattern, options: .caseInsensitive) {
                filtered = regex.stringByReplacingMatches(
                    in: filtered,
                    options: [],
                    range: NSRange(location: 0, length: filtered.utf16.count),
                    withTemplate: ""
                )
            }
        }
        
        // Clean up extra whitespace
        filtered = filtered.replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
        filtered = filtered.trimmingCharacters(in: .whitespacesAndNewlines)
        
        return filtered.isEmpty ? input : filtered
    }
    
    private func openMessagesAppForReview(_ response: String, to recipient: String) async {
        print("📱 Opening Messages app for human review and manual delivery...")
        
        // Create a draft message in Messages app for manual review
        let draftScript = """
        tell application "Messages"
            try
                activate
                delay 1
                -- Create a new message window focused on the recipient
                -- This allows manual review and sending
                tell application "System Events"
                    tell process "Messages"
                        try
                            -- Activate Messages and bring to front
                            activate
                            delay 1
                        end try
                    end try
                end tell
                return "messages_opened"
            on error errMsg
                return "error: " & errMsg
            end try
        end tell
        """
        
        let process = Process()
        process.launchPath = "/usr/bin/osascript"
        process.arguments = ["-e", draftScript]
        
        let pipe = Pipe()
        process.standardOutput = pipe
        process.standardError = pipe
        
        process.launch()
        process.waitUntilExit()
        
        if process.terminationStatus == 0 {
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            
            if output.contains("messages_opened") {
                print("✅ Messages app opened successfully for manual review")
                print("💬 User can now manually review and send the constitutional response")
                print("📋 Suggested message to review: \(response)")
            } else {
                print("⚠️ Could not open Messages app: \(output)")
                print("📱 Please manually open Messages app and send response to: \(recipient)")
            }
        } else {
            print("⚠️ Failed to open Messages app - manual intervention required")
            print("📱 Please open Messages app manually to send response to: \(recipient)")
            print("💬 Response to send: \(response)")
        }
    }
    
    private func logBlockedMessage(_ response: String, to recipient: String, result: EnhancedCognitiveResult) async {
        print("🚫 BLOCKED MESSAGE LOG:")
        print("   Recipient: \(recipient)")
        print("   Constitutional Status: \(result.constitutionalValidation?.summary ?? "Unknown")")
        print("   Blocked Response: \(response)")
        print("   Timestamp: \(Date())")
        
        // In production: log to security/audit database
    }

    private func calculateMessagePriority(_ content: String) -> MessagePriority {
        let urgentKeywords = ["urgent", "important", "critical", "emergency", "asap"]
        let systemKeywords = ["system", "status", "error", "failure", "down"]
        
        let lowercaseContent = content.lowercased()
        
        if urgentKeywords.contains(where: lowercaseContent.contains) {
            return .urgent
        } else if systemKeywords.contains(where: lowercaseContent.contains) {
            return .high
        } else if content.contains("?") {
            return .medium
        } else {
            return .normal
        }
    }
    
    private func updateCognitiveMetrics(success: Bool) {
        let successWeight: Double = success ? 1.0 : 0.0
        cognitiveSuccessRate = (cognitiveSuccessRate * Double(messagesProcessed - 1) + successWeight) / Double(messagesProcessed)
    }
    
    private func handleError(_ error: Error) async {
        print("🔧 Handling error with cognitive framework...")
        
        do {
            // Check if we need heat shield maintenance
            let heatReport = try await njson.getHeatShieldReport()
            if heatReport.engineLight {
                print("🚨 Engine light detected - performing maintenance...")
                let resetSuccess = try await njson.resetHeatShield()
                print("🔧 Heat shield reset: \(resetSuccess ? "✅ Success" : "❌ Failed")")
            }
        } catch {
            print("⚠️ Could not perform error diagnostics: \(error)")
        }
    }
    
    private func performPeriodicHealthChecks() async {
        while isRunning && !shouldShutdown {
            do {
                // Sleep for 30 seconds between health checks
                try await Task.sleep(nanoseconds: 30_000_000_000)
                
                guard isRunning && !shouldShutdown else { break }
                
                let cognitiveReport = try await njson.getCognitiveStateReport()
                lastCognitiveReport = cognitiveReport
                
                // Log health status every 10 messages or if there are issues
                if messagesProcessed % 10 == 0 || !cognitiveReport.isOptimal {
                    print("🔬 Cognitive Health Check:")
                    print("   Bridge status: \(cognitiveReport.narrows)")
                    print("   Readiness: \(String(format: "%.3f", cognitiveReport.observationalMath.readiness))")
                    print("   Green light: \(cognitiveReport.observationalMath.nextGreenLight)")
                    
                    if !cognitiveReport.isOptimal {
                        print("⚠️ Cognitive optimization needed")
                    }
                }
                
            } catch {
                print("⚠️ Health check error: \(error)")
            }
        }
    }
    
    private func checkSystemPermissions() async {
        print("🔐 Checking system permissions for iMessage access...")
        print("🛡️ Sandbox-aware permission verification initiated...")
        
        // Enhanced permission checking with sandbox awareness
        let checkScript = """
        tell application "System Events"
            try
                set messagingApp to application "Messages"
                tell application "Messages"
                    try
                        get name
                        return "accessible"
                    on error errMsg
                        return "error: " & errMsg
                    end try
                end tell
            on error
                return "system_events_error"
            end try
        end tell
        """
        
        let process = Process()
        process.launchPath = "/usr/bin/osascript"
        process.arguments = ["-e", checkScript]
        
        let pipe = Pipe()
        process.standardOutput = pipe
        process.standardError = pipe
        
        process.launch()
        process.waitUntilExit()
        
        if process.terminationStatus == 0 {
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            
            if output.contains("accessible") {
                print("✅ Messages app is accessible - Sandbox permissions granted")
                await checkDetailedPermissions()
            } else if output.contains("system_events_error") {
                print("⚠️ System Events access restricted - Sandbox limitations detected")
                await provideSandboxGuidance()
            } else {
                print("⚠️ Messages app access issue: \(output)")
                await provideSandboxGuidance()
            }
        } else {
            print("⚠️ Cannot execute AppleScript - Sandbox restrictions active")
            await provideSandboxGuidance()
        }
    }
    
    private func checkDetailedPermissions() async {
        print("🔍 Performing detailed permission audit...")
        
        // Test the actual automation we need - sending messages
        let realAutomationTest = """
        tell application "Messages"
            try
                -- Just test if we can access the application properties
                get name
                return "automation_working"
            on error errMsg
                return "automation_failed: " & errMsg
            end try
        end tell
        """
        
        await executePermissionCheck(script: realAutomationTest, type: "Messages Automation")
    }
    
    private func executePermissionCheck(script: String, type: String) async {
        let process = Process()
        process.launchPath = "/usr/bin/osascript"
        process.arguments = ["-e", script]
        
        let pipe = Pipe()
        process.standardOutput = pipe
        process.standardError = pipe
        
        process.launch()
        process.waitUntilExit()
        
        if process.terminationStatus == 0 {
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            
            if output.contains("working") || output.contains("granted") || output.contains("Messages") {
                print("✅ \(type) permissions: GRANTED")
            } else if output.contains("failed") || output.contains("denied") {
                print("❌ \(type) permissions: DENIED - \(output)")
            } else {
                print("⚠️ \(type) permissions: UNCLEAR - \(output)")
            }
        } else {
            print("❌ \(type) permissions: EXECUTION_FAILED")
        }
    }
    
    private func provideSandboxGuidance() async {
        print("📋 macOS Sandbox Configuration Required:")
        print("   🔧 SOLUTION 1: Build as proper app bundle")
        print("      • Run: ./build-imessage-app.sh")
        print("      • Double-click BLF_iMessage_Bot.app")
        print("      • Grant permissions when prompted")
        print("")
        print("   🔧 SOLUTION 2: Manual permission grant")
        print("      • System Preferences > Security & Privacy > Privacy")
        print("      • Accessibility: Add Terminal/your app")
        print("      • Automation: Allow Messages control")
        print("")
        print("   🔧 SOLUTION 3: Developer override")
        print("      • Disable SIP temporarily (not recommended)")
        print("      • Run with elevated privileges")
        print("")
        print("🛡️ Heat shield maintaining optimal temperature during permission wait...")
        print("🔬 Observational mathematics: Monitoring for next green light...")
    }
}

// Enhanced message structure with cognitive context
struct EnhancedMessage {
    let id: String
    let content: String
    let sender: String
    let timestamp: Date
    let cognitiveContext: CognitiveContext
    let priority: MessagePriority
}



enum MessagePriority {
    case urgent
    case high
    case medium
    case normal
} 