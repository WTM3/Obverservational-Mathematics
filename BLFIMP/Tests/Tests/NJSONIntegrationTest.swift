import Foundation
import os.log

/// NJSON Integration Test - Validates the integration between BotController and NJSON
/// This minimal Swift code acts as a bridge between the test harness and NJSON functionality
@available(macOS 10.15, *)
struct NJSONIntegrationTest {
    private let logger = Logger(subsystem: "com.blf.test", category: "NJSONIntegration")
    private let njson = NJSON.shared
    
    /// Run the integration test suite
    func runTests() async {
        printBanner("NJSON Integration Test Suite")
        
        // Run NJSON self-test
        await testNJSONCore()
        
        // Test BotController integration
        await testBotControllerIntegration()
        
        // Test subject detection
        await testSubjectDetection()
        
        // Test NJSON configuration
        await testNJSONConfiguration()
        
        // Test metrics collection
        await testMetricsCollection()
        
        // Print summary
        printBanner("Test Suite Completed")
    }
    
    /// Test NJSON core functionality
    private func testNJSONCore() async {
        printHeader("1. NJSON Core Self-Test")
        
        let results = await njson.runSelfTest()
        
        print("NJSON self-test results:")
        print("Total tests: \(results.results.count)")
        print("Passed: \(results.passCount)")
        print("Failed: \(results.failCount)")
        
        if results.failCount > 0 {
            print("\nFailed tests:")
            for result in results.results.filter({ !$0.passed }) {
                print("❌ \(result.name): \(result.message)")
            }
        }
    }
    
    /// Test BotController integration with NJSON
    private func testBotControllerIntegration() async {
        printHeader("2. BotController-NJSON Integration")
        
        // Create a test message
        let testMessage = Message(
            id: "test-1",
            content: "Hello, how are you?",
            sender: "test-user",
            timestamp: Date(),
            threadId: "test-thread"
        )
        
        // Create a minimal BotController
        let botController = BotController(
            checkInterval: 1.0,
            metricsReportingInterval: 60.0
        )
        
        // Process a message through the BotController
        print("Processing test message through BotController...")
        
        let start = CFAbsoluteTimeGetCurrent()
        await botController.processMessageWithNJSON(testMessage, priority: .normal)
        let duration = CFAbsoluteTimeGetCurrent() - start
        
        print("Message processed in \(String(format: "%.3f", duration))s")
        
        // Get metrics to verify processing occurred
        let metrics = await botController.getCurrentMetrics()
        print("Messages processed: \(metrics.messagesProcessed)")
        
        // Get NJSON metrics to verify integration
        let njsonState = await njson.getCognitiveState()
        print("NJSON processing cycles: \(njsonState.processingCycles)")
        
        if metrics.messagesProcessed > 0 && njsonState.processingCycles > 0 {
            print("✅ BotController successfully integrated with NJSON")
        } else {
            print("❌ BotController integration test failed")
        }
    }
    
    /// Test subject detection capabilities
    private func testSubjectDetection() async {
        printHeader("3. Enhanced Subject Detection")
        
        // Test messages with different subjects
        let testMessages = [
            "Let's talk about the weather forecast for tomorrow",
            "What time does the movie start?",
            "I'm thinking about buying a new car",
            "Can you tell me about the latest technology news?",
            "I'm having problems with my computer"
        ]
        
        print("Testing subject detection with sample messages:")
        
        for message in testMessages {
            // Process message to detect subject
            let _ = try? await njson.processIncomingMessage(message, from: "test-user")
            
            // Get detected subject
            if let subject = await njson.lastSubject {
                print("✓ \"\(message.prefix(30))...\" → Subject: \"\(subject)\"")
            } else {
                print("✗ \"\(message.prefix(30))...\" → No subject detected")
            }
        }
        
        // Get subject history
        let subjectDetector = await njson.subjectDetector
        let history = await subjectDetector.getSubjectHistory()
        
        print("\nSubject history (most recent first):")
        for subject in history.prefix(5) {
            print("→ \(subject)")
        }
        
        // Get frequent subjects
        let frequentSubjects = await subjectDetector.getFrequentSubjects()
        
        print("\nMost frequent subjects:")
        for (subject, count) in frequentSubjects {
            print("→ \(subject): \(count) occurrences")
        }
    }
    
    /// Test NJSON configuration capabilities
    private func testNJSONConfiguration() async {
        printHeader("4. NJSON Configuration")
        
        // Test branch switching
        let originalBranch = await njson.activeBranch
        print("Current branch: \(originalBranch.rawValue)")
        
        // Switch branch
        await njson.setBranch(.professional)
        let newBranch = await njson.activeBranch
        print("Switched branch to: \(newBranch.rawValue)")
        
        // Test padding adjustment
        let originalPadding = await njson.activeBranch.padding
        print("Current padding: \(originalPadding.rawValue)")
        
        // Change padding
        await njson.setPadding(.more)
        let newPadding = await njson.activeBranch.padding
        print("Changed padding to: \(newPadding.rawValue)")
        
        // Test permission state storage
        let testPermissionState = PermissionState(
            hasPermission: true,
            requestedAt: Date(),
            status: .granted
        )
        
        await njson.setPermissionState(testPermissionState)
        let retrievedState = await njson.getPermissionState()
        
        print("\nPermission state storage test:")
        print("→ Status: \(retrievedState.status.rawValue)")
        print("→ Has permission: \(retrievedState.hasPermission)")
        
        if retrievedState.hasPermission == testPermissionState.hasPermission && 
           retrievedState.status == testPermissionState.status {
            print("✅ Permission state stored and retrieved successfully")
        } else {
            print("❌ Permission state storage test failed")
        }
        
        // Restore original branch
        await njson.setBranch(originalBranch)
    }
    
    /// Test metrics collection
    private func testMetricsCollection() async {
        printHeader("5. Metrics Collection")
        
        // Record some test metrics
        await njson.recordMetric("test_integration", value: 100)
        await njson.recordMetric("response_time", value: 0.23)
        await njson.recordMetric("message_length", value: 42)
        
        // Get all metrics
        let metrics = await njson.getAllMetrics()
        
        print("Collected metrics:")
        for (key, value) in metrics.sorted(by: { $0.key < $1.key }) {
            print("→ \(key): \(value)")
        }
        
        // Test NJSON format export
        let njsonMetrics = await njson.exportMetricsAsNJSON()
        print("\nNJSON metrics export sample:")
        print(njsonMetrics.prefix(200) + "...\n")
        
        // Test logging
        await njson.logEvent(.systemStart, details: "Test logging event")
        let logs = await njson.getRecentLogs(count: 1)
        
        print("Log entry test:")
        if !logs.isEmpty {
            print("✅ Successfully created log entry: \(logs[0].eventType?.rawValue ?? "unknown")")
        } else {
            print("❌ Failed to create log entry")
        }
    }
    
    // MARK: - Formatting Helpers
    
    private func printBanner(_ text: String) {
        let line = String(repeating: "=", count: text.count + 4)
        print("\n\(line)")
        print("  \(text)  ")
        print("\(line)\n")
    }
    
    private func printHeader(_ text: String) {
        print("\n----- \(text) -----\n")
    }
}

// MARK: - Helper Types for Testing

/// Simple Message struct for testing
struct Message: Identifiable, Hashable {
    let id: String
    let content: String
    let sender: String
    let timestamp: Date
    let threadId: String
}

/// Run test from command line
if #available(macOS 10.15, *) {
    Task {
        let test = NJSONIntegrationTest()
        await test.runTests()
        exit(0)
    }
    
    // Keep the process alive while tests run
    RunLoop.main.run()
} else {
    print("This test requires macOS 10.15 or later")
    exit(1)
} 