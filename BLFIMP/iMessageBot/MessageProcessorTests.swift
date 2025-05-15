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
        let result = processor.process(message: "I believe that he might be having a seizure, but I'm not sure")
        
        // Heat shield should activate due to "I believe" and "might be" uncertainty markers
        XCTAssertGreaterThan(result.processingMetrics.heatShieldActivations, 0, "Heat shield should activate for uncertain statements")
    }
    
    func testLLSDTValidation() {
        // Test LLSDT boundary enforcement
        let result = processor.process(message: "The patient is having a seizure")
        
        // LLSDT validation should occur for medical messages
        XCTAssertGreaterThan(result.processingMetrics.llsdtValidations, 0, "LLSDT validation should occur")
    }
    
    // MARK: - Medical Pattern Detection Tests
    
    func testSeizureDetection() {
        // Test detection of seizure-related messages
        let result = processor.process(message: "My friend is having a seizure, what should I do?")
        
        // Should detect medical emergency and require intervention
        XCTAssertTrue(result.requiresIntervention, "Should detect seizure and require intervention")
        XCTAssertGreaterThan(result.confidence, 0.5, "Should have high confidence in seizure detection")
    }
    
    func testSecondaryIndicators() {
        // Test detection with secondary indicators only
        let result = processor.process(message: "He fell to the ground and is shaking with blue lips")
        
        // Should detect medical emergency from secondary indicators
        XCTAssertTrue(result.requiresIntervention, "Should detect medical emergency from secondary indicators")
    }
    
    func testNonMedicalMessage() {
        // Test regular non-medical message
        let result = processor.process(message: "I'm going to the store to buy some groceries")
        
        // Should not trigger intervention
        XCTAssertFalse(result.requiresIntervention, "Should not require intervention for non-medical message")
        XCTAssertLessThan(result.confidence, 0.3, "Should have low confidence for non-medical content")
    }
    
    // MARK: - AMF Formula Tests
    
    func testObservationalMathematics() {
        // Test concept extraction and connection building
        let message = "The patient has epilepsy and takes medication daily"
        let result = processor.process(message: message)
        
        // Should have reasonable confidence with medical terms
        XCTAssertGreaterThan(result.confidence, 0.4, "Should recognize medical relationships")
    }
    
    func testJournalGeneration() {
        // Test journal logging functions
        processor.process(message: "Test message for journal")
        let journalContent = processor.exportJournalMarkdown()
        
        // Journal should contain buffer integrity confirmation
        XCTAssertTrue(journalContent.contains("Buffer integrity"), "Journal should track buffer integrity")
    }
} 