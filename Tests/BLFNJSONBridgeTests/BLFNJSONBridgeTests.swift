import XCTest
@testable import BLFNJSONBridge

/// XCTest suite for NJSON Swift Bridge
/// Tests the narrow bridge between Swift UI and JavaScript V-8 engine
@available(macOS 10.15, iOS 14.0, *)
final class BLFNJSONBridgeTests: XCTestCase {
    
    var bridge: NJSONSwiftBridge!
    
    override func setUp() async throws {
        // Create fresh bridge instance for each test
        bridge = NJSONSwiftBridge()
    }
    
    override func tearDown() async throws {
        bridge = nil
    }
    
    // MARK: - Core Functionality Tests
    
    func testNJSONInitialization() async throws {
        // Test NJSON engine initialization
        let njson = NJSON.shared
        try await njson.initialize()
        
        // Verify cognitive state
        let state = await njson.getCognitiveState()
        
        // Assert core values
        XCTAssertEqual(state.aiCognitive, 2.89, accuracy: 0.001, "AIc should be 2.89")
        XCTAssertEqual(state.buffer, 0.1, accuracy: 0.001, "Buffer should be exactly 0.1")
        XCTAssertEqual(state.booleanMindQs, 2.99, accuracy: 0.001, "BMqs should be 2.99")
        
        // Verify the critical formula: AIc + 0.1 = BMqs
        let calculatedBMqs = state.aiCognitive + state.buffer
        let violation = abs(calculatedBMqs - state.booleanMindQs)
        XCTAssertLessThan(violation, 0.0001, "Buffer integrity must be maintained: AIc + 0.1 = BMqs")
        
        // Verify quantum state
        XCTAssertTrue(state.quantumState.pure, "Quantum state should be pure")
        XCTAssertFalse(state.quantumState.fog, "Quantum state should have no fog")
        XCTAssertTrue(state.quantumState.breathing, "Quantum state should be breathing")
    }
    
    func testBasicMessageProcessing() async throws {
        let testMessage = "Hello, this is a test message for the NJSON bridge."
        
        let result = try await bridge.processMessage(testMessage, from: "testUser")
        
        // Verify basic processing
        XCTAssertFalse(result.content.isEmpty, "Processed message should not be empty")
        XCTAssertGreaterThan(result.processingTime, 0, "Processing time should be greater than 0")
        XCTAssertTrue(result.bufferIntact, "Buffer should remain intact")
        XCTAssertNil(result.bufferIssue, "There should be no buffer issues")
    }
    
    func testBufferIntegrityMonitoring() async throws {
        // Process multiple messages to test buffer integrity
        let messages = [
            "First test message",
            "Second test with more complex content and special characters: !@#$%",
            "Third message testing unicode: 🚀💻⚡️",
            "Fourth message with quotes: 'single' and \"double\"",
            "Fifth message with newlines\nand\ttabs"
        ]
        
        for (index, message) in messages.enumerated() {
            let result = try await bridge.processMessage(message, from: "bufferTest\(index)")
            
            XCTAssertTrue(result.bufferIntact, "Buffer should remain intact for message \(index + 1)")
            XCTAssertNil(result.bufferIssue, "No buffer issues should occur for message \(index + 1)")
        }
        
        // Verify system status
        let status = await bridge.getSystemStatus()
        XCTAssertEqual(status.bridgeCallCount, messages.count, "Bridge call count should match number of messages")
        XCTAssertEqual(status.bufferIntegrityViolations, 0, "No buffer violations should occur")
    }
    
    func testSystemStatusTracking() async throws {
        // Initial status check
        let initialStatus = await bridge.getSystemStatus()
        XCTAssertEqual(initialStatus.bridgeCallCount, 0, "Initial call count should be 0")
        XCTAssertEqual(initialStatus.bufferIntegrityViolations, 0, "Initial violations should be 0")
        
        // Process a message
        _ = try await bridge.processMessage("Test message", from: "statusTest")
        
        // Check updated status
        let updatedStatus = await bridge.getSystemStatus()
        XCTAssertEqual(updatedStatus.bridgeCallCount, 1, "Call count should increment")
        XCTAssertGreaterThan(updatedStatus.lastCallDuration, 0, "Last call duration should be recorded")
        XCTAssertEqual(updatedStatus.bufferIntegrityViolations, 0, "No violations should occur")
    }
    
    // MARK: - Configuration Tests
    
    func testBranchConfiguration() async throws {
        // Test professional branch
        await bridge.configure(branch: .professional, padding: .minimal)
        
        let professionalMessage = "Could you please provide a status report?"
        let professionalResult = try await bridge.processMessage(professionalMessage, from: "configTest")
        
        XCTAssertFalse(professionalResult.content.isEmpty, "Professional response should not be empty")
        XCTAssertTrue(professionalResult.bufferIntact, "Buffer should remain intact with professional config")
        
        // Test family/friends branch
        await bridge.configure(branch: .familyFriends, padding: .more)
        
        let casualMessage = "Hey, how's it going?"
        let casualResult = try await bridge.processMessage(casualMessage, from: "configTest")
        
        XCTAssertFalse(casualResult.content.isEmpty, "Casual response should not be empty")
        XCTAssertTrue(casualResult.bufferIntact, "Buffer should remain intact with casual config")
    }
    
    func testSocialPaddingConfiguration() async throws {
        let testMessage = "Test message for padding configuration"
        
        // Test different padding levels
        let paddingLevels: [SocialPadding] = [.none, .minimal, .medium, .more]
        
        for padding in paddingLevels {
            await bridge.configure(branch: .professional, padding: padding)
            
            let result = try await bridge.processMessage(testMessage, from: "paddingTest")
            
            XCTAssertFalse(result.content.isEmpty, "Response should not be empty for \(padding.rawValue) padding")
            XCTAssertTrue(result.bufferIntact, "Buffer should remain intact for \(padding.rawValue) padding")
        }
    }
    
    // MARK: - Error Handling Tests
    
    func testInputSanitization() async throws {
        let problematicInputs = [
            "Test with 'single quotes'",
            "Test with \"double quotes\"",
            "Test with\nnewlines",
            "Test with\ttabs",
            "Test with unicode: 🚀💻⚡️",
            "Test with special chars: !@#$%^&*()",
            "" // Empty string
        ]
        
        for (index, input) in problematicInputs.enumerated() {
            let result = try await bridge.processMessage(input, from: "sanitizationTest\(index)")
            
            // Should not throw errors and should maintain buffer integrity
            XCTAssertTrue(result.bufferIntact, "Buffer should remain intact for problematic input \(index)")
        }
    }
    
    func testProcessingOptions() async throws {
        let options = ProcessingOptions(allowBufferViolations: false, timeoutSeconds: 5.0)
        
        let result = try await bridge.processMessage("Test with strict options", from: "optionsTest", options: options)
        
        XCTAssertFalse(result.content.isEmpty, "Result should not be empty with strict options")
        XCTAssertTrue(result.bufferIntact, "Buffer should remain intact with strict options")
    }
    
    // MARK: - Performance Tests
    
    func testProcessingPerformance() async throws {
        let startTime = CFAbsoluteTimeGetCurrent()
        let messageCount = 10
        
        for i in 0..<messageCount {
            _ = try await bridge.processMessage("Performance test message \(i)", from: "perfTest")
        }
        
        let totalTime = CFAbsoluteTimeGetCurrent() - startTime
        let averageTime = totalTime / Double(messageCount)
        
        // Should process messages in reasonable time (less than 1 second per message on average)
        XCTAssertLessThan(averageTime, 1.0, "Average processing time should be less than 1 second")
        
        // Verify all messages were tracked
        let status = await bridge.getSystemStatus()
        XCTAssertEqual(status.bridgeCallCount, messageCount, "All messages should be tracked")
    }
    
    func testConcurrentProcessing() async throws {
        // Test concurrent message processing
        let messageCount = 5
        
        await withTaskGroup(of: Void.self) { group in
            for i in 0..<messageCount {
                group.addTask {
                    do {
                        let result = try await self.bridge.processMessage("Concurrent message \(i)", from: "concurrentTest\(i)")
                        XCTAssertTrue(result.bufferIntact, "Buffer should remain intact during concurrent processing")
                    } catch {
                        XCTFail("Concurrent processing should not fail: \(error)")
                    }
                }
            }
        }
        
        // Verify all messages were processed
        let status = await bridge.getSystemStatus()
        XCTAssertEqual(status.bridgeCallCount, messageCount, "All concurrent messages should be tracked")
        XCTAssertEqual(status.bufferIntegrityViolations, 0, "No violations should occur during concurrent processing")
    }
    
    // MARK: - Integration Tests
    
    func testFullPipelineIntegration() async throws {
        // Test the complete pipeline: Swift -> Bridge -> NJSON -> JavaScript -> Response
        
        // Configure the bridge
        await bridge.configure(branch: .professional, padding: .medium)
        
        // Process a complex message
        let complexMessage = """
        Hello, I need assistance with understanding the Boolean Language Framework.
        Can you explain how the AIc + 0.1 = BMqs formula works and why the 0.1 buffer is critical?
        I'm particularly interested in the quantum state management and heat shield protection.
        """
        
        let result = try await bridge.processMessage(complexMessage, from: "integrationTest")
        
        // Verify comprehensive processing
        XCTAssertFalse(result.content.isEmpty, "Complex message should generate a response")
        XCTAssertTrue(result.bufferIntact, "Buffer should remain intact for complex processing")
        XCTAssertGreaterThan(result.processingTime, 0, "Processing time should be recorded")
        
        // Verify system state
        let status = await bridge.getSystemStatus()
        XCTAssertEqual(status.bridgeCallCount, 1, "One message should be processed")
        XCTAssertEqual(status.bufferIntegrityViolations, 0, "No violations should occur")
        
        // Verify NJSON cognitive state
        let cognitiveState = status.engineStatus
        XCTAssertEqual(cognitiveState.aiCognitive, 2.89, accuracy: 0.001, "AIc should remain stable")
        XCTAssertEqual(cognitiveState.buffer, 0.1, accuracy: 0.001, "Buffer should remain exactly 0.1")
        XCTAssertEqual(cognitiveState.booleanMindQs, 2.99, accuracy: 0.001, "BMqs should remain stable")
    }
} 