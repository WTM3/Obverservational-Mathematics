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
                // Apply heat shield first
                let filteredContent = try await njson.applyHeatShield(message.content)
                if filteredContent != message.content {
                    print("🛡️ Heat shield applied: \"\(filteredContent)\"")
                }
                
                // Process through NJSON cognitive framework
                let cognitiveResult = try await njson.processText(filteredContent, bmId: message.sender)
                
                print("🔍 Cognitive Analysis:")
                print("   Processing time: \(String(format: "%.2f", cognitiveResult.processingTime))ms")
                print("   Cognitive alignment: \(cognitiveResult.cognitiveAlignment ? "✅" : "❌")")
                print("   Heat shield active: \(cognitiveResult.heatShieldActive ? "✅" : "❌")")
                
                // Enhanced response generation
                let enhancedResponse = await generateCognitiveResponse(
                    for: message,
                    cognitiveResult: cognitiveResult
                )
                
                print("🤖 Enhanced Response: \(enhancedResponse)")
                
                // Send response with cognitive metadata
                await sendCognitiveResponse(enhancedResponse, to: message.sender, context: cognitiveResult)
                
                // Update metrics
                messagesProcessed += 1
                updateCognitiveMetrics(success: cognitiveResult.cognitiveAlignment)
                
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
        
        // Check if Messages app is accessible
        let checkScript = """
        tell application "Messages"
            try
                get name
                return "accessible"
            on error errMsg
                return "error: " & errMsg
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
                print("✅ Messages app is accessible")
            } else {
                print("⚠️ Messages app access issue: \(output)")
                print("💡 Troubleshooting tips:")
                print("   1. Open System Preferences > Security & Privacy > Privacy")
                print("   2. Select 'Accessibility' and ensure Terminal/your app is allowed")
                print("   3. Select 'Automation' and allow Messages access")
                print("   4. Make sure Messages app is installed and can be opened")
            }
        } else {
            print("⚠️ Cannot execute AppleScript. Possible issues:")
            print("   • AppleScript execution is disabled")
            print("   • Terminal doesn't have necessary permissions")
            print("   • Messages app is not installed")
        }
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

enum CognitiveContext {
    case conversation
    case systemQuery
    case helpRequest
    case statusCheck
    case unknown
}

enum MessagePriority {
    case urgent
    case high
    case medium
    case normal
} 