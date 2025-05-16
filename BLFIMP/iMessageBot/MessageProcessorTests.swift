import XCTest
@testable import BLFiMessageBot

class MessageProcessorTests: XCTestCase {
    var processor: MessageProcessor!
    
    override func setUp() {
        super.setUp()
        processor = MessageProcessor(userAge: 30)
    }
    
    override func tearDown() {
        processor = nil
        super.tearDown()
    }
    
    // MARK: - Core AMF Tests
    
    func testProcessMessageWithExactBuffer() {
        // Test that the 0.1 buffer is maintained exactly
        let result = processor.process(message: "Hello, how are you today?")
        
        // Verify buffer integrity in processing metrics
        XCTAssertTrue(result.processingMetrics.bufferIntegrity, "0.1 buffer integrity should be maintained")
        
        // Verify confidence never exceeds 0.9 (due to 0.1 buffer)
        XCTAssertLessThanOrEqual(result.confidence, 0.9, "Confidence should never exceed 0.9 due to 0.1 buffer")
    }
    
    func testHeatShieldActivation() {
        // Test that heat shield activates for uncertain messages
        let result = processor.process(message: "I believe that this might be true, but I'm not sure")
        
        // Heat shield should activate due to "I believe" and "might be" uncertainty markers
        XCTAssertGreaterThan(result.processingMetrics.heatShieldActivations, 0, "Heat shield should activate for uncertain statements")
    }
    
    func testLLSDTValidation() {
        // Test LLSDT boundary enforcement
        let result = processor.process(message: "Testing LLSDT boundary enforcement")
        
        // LLSDT validation should occur for any message
        XCTAssertGreaterThan(result.processingMetrics.llsdtValidations, 0, "LLSDT validation should occur")
    }
    
    // MARK: - AMF Formula Tests
    
    func testObservationalMathematics() {
        // Test concept extraction and connection building
        let message = "Testing observational mathematics with multiple concepts"
        let result = processor.process(message: message)
        
        // Should process the message and handle concepts
        XCTAssertFalse(result.requiresIntervention, "Basic message should not require intervention")
        XCTAssertGreaterThan(result.confidence, 0.0, "Should calculate confidence")
    }
    
    func testJournalGeneration() {
        // Test journal logging functions
        processor.process(message: "Test message for journal")
        let journalContent = processor.exportJournalMarkdown()
        
        // Journal should contain buffer integrity confirmation
        XCTAssertTrue(journalContent.contains("Buffer integrity"), "Journal should track buffer integrity")
    }
    
    // MARK: - Recovery System Tests
    
    func testRecoverySystem() {
        // Create a processor with private access for testing
        let testProcessor = MessageProcessorTestable(userAge: 30)
        
        // Simulate a cognitive alignment violation
        testProcessor.simulateCognitiveAlignmentViolation(delta: 0.001)
        
        // Process a message, which should trigger recovery
        let result = testProcessor.process(message: "Testing recovery system")
        
        // Recovery should have been attempted
        XCTAssertTrue(result.recoveryAttempted, "Recovery should be attempted when cognitive alignment is violated")
        
        // Verify recovery stats were generated
        XCTAssertNotNil(result.processingMetrics.recoveryStats, "Recovery stats should be generated")
        
        if let stats = result.processingMetrics.recoveryStats {
            // At least one attempt should be recorded
            XCTAssertGreaterThan(stats.attemptCount, 0, "Recovery attempt count should be incremented")
        }
    }
    
    func testMultipleLevelRecovery() {
        // Create a processor with testing access
        let testProcessor = MessageProcessorTestable(userAge: 30)
        
        // Cause a severe violation that will require level 2 or 3 recovery
        testProcessor.simulateCognitiveAlignmentViolation(delta: 0.01)
        
        // Process message to trigger recovery
        let result = testProcessor.process(message: "Testing severe violation recovery")
        
        // Check if recovery was more severe (confidence lower indicates higher recovery level)
        XCTAssertTrue(result.recoveryAttempted, "Recovery should be attempted for severe violation")
    }
    
    func testCriticalFailureRecovery() {
        // Create a processor with testing access
        let testProcessor = MessageProcessorTestable(userAge: 30)
        
        // Cause an unrecoverable violation
        testProcessor.simulateUnrecoverableViolation()
        
        // Process message to trigger emergency fallback
        let result = testProcessor.process(message: "Testing critical failure recovery")
        
        // Should see emergency message
        XCTAssertTrue(result.response.contains("EMERGENCY") || result.response.contains("WARNING"), 
                    "Critical failures should produce emergency or warning messages")
        
        // Should require intervention for safety
        XCTAssertTrue(result.requiresIntervention, "Critical failures should require intervention")
    }
    
    func testRecoveryModeExit() {
        // Create processor with testing access
        let testProcessor = MessageProcessorTestable(userAge: 30)
        
        // Cause a recoverable violation
        testProcessor.simulateCognitiveAlignmentViolation(delta: 0.0005)
        
        // First message triggers recovery
        let result1 = testProcessor.process(message: "First message after violation")
        XCTAssertTrue(result1.recoveryAttempted, "Recovery should be attempted")
        
        // Enter recovery mode successfully
        XCTAssertTrue(testProcessor.isInRecoveryMode(), "Should enter recovery mode after successful recovery")
        
        // Process multiple messages to exit recovery mode
        testProcessor.process(message: "Second stable message")
        testProcessor.process(message: "Third stable message")
        testProcessor.process(message: "Fourth stable message")
        testProcessor.process(message: "Fifth stable message")
        let result6 = testProcessor.process(message: "Sixth stable message")
        
        // Should have exited recovery mode after 5 stable messages
        XCTAssertFalse(testProcessor.isInRecoveryMode(), "Should exit recovery mode after 5 stable messages")
        
        // Journal should record recovery exit
        let journal = testProcessor.exportJournalMarkdown()
        XCTAssertTrue(journal.contains("Recovery exit"), "Journal should record recovery mode exit")
    }
}

// Test helper class with access to internal state for testing
class MessageProcessorTestable: MessageProcessor {
    // Access to recovery mode state
    func isInRecoveryMode() -> Bool {
        // Access the private property through reflection
        let mirror = Mirror(reflecting: self)
        if let inRecoveryMode = mirror.children.first(where: { $0.label == "inRecoveryMode" })?.value as? Bool {
            return inRecoveryMode
        }
        return false
    }
    
    // Simulate a cognitive alignment violation
    func simulateCognitiveAlignmentViolation(delta: Double) {
        // Access private properties through reflection
        let mirror = Mirror(reflecting: self)
        
        // Find and modify cognitive alignment
        if let cognitiveAlignmentChild = mirror.children.first(where: { $0.label == "cognitiveAlignment" }) {
            if let cognitiveAlignment = cognitiveAlignmentChild.value as? CognitiveAlignment {
                // Create a new cognitive alignment with a violation
                let newAlignment = CognitiveAlignment(
                    aiCognitive: cognitiveAlignment.aiCognitive,
                    buffer: cognitiveAlignment.buffer,
                    booleanMindQs: cognitiveAlignment.booleanMindQs + delta
                )
                
                // Use reflection to set the property
                setValue(newAlignment, forKey: "cognitiveAlignment")
            }
        }
    }
    
    // Simulate an unrecoverable violation
    func simulateUnrecoverableViolation() {
        // Create a severe misalignment that won't be fixable
        let mirror = Mirror(reflecting: self)
        
        if let cognitiveAlignmentChild = mirror.children.first(where: { $0.label == "cognitiveAlignment" }) {
            if let cognitiveAlignment = cognitiveAlignmentChild.value as? CognitiveAlignment {
                // Create a new cognitive alignment with a major violation
                let newAlignment = CognitiveAlignment(
                    aiCognitive: cognitiveAlignment.aiCognitive + 0.5,  // Major change
                    buffer: cognitiveAlignment.buffer,
                    booleanMindQs: cognitiveAlignment.booleanMindQs - 0.5  // In opposite direction
                )
                
                // Use reflection to set the property
                setValue(newAlignment, forKey: "cognitiveAlignment")
                
                // Also corrupt the quantum state
                let corruptedState = QuantumState(
                    pure: false,
                    fog: true,
                    breathing: false,
                    jumps: QuantumJumps(
                        active: false,
                        power: "corrupted",
                        distance: -1,
                        direction: "invalid"
                    )
                )
                
                setValue(corruptedState, forKey: "quantumState")
            }
        }
    }
} 