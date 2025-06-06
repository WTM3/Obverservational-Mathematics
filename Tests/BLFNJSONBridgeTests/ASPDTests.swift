import XCTest
@testable import BLFNJSONBridge

/// Comprehensive test suite for ASPD Formula: Academic Social Padding Detection
/// Tests: ASPD = (SPD v SBMPD/AMF)v
/// 
/// This test suite validates the implementation of the Academic Social Padding Detection
/// formula with Boolean Mind padding levels and AMF alignment verification.
@available(macOS 10.15, iOS 14.0, *)
final class ASPDTests: XCTestCase {
    
    var njson: NJSON!
    
    override func setUp() async throws {
        // Initialize NJSON engine for each test
        njson = try NJSON()
        try await njson.initialize()
        
        // Verify mathematical foundation before testing
        let state = await njson.getCognitiveState()
        XCTAssertTrue(state.alignment, "AMF formula alignment must be maintained: 2.89 + 0.1 = 2.99")
    }
    
    override func tearDown() async throws {
        njson = nil
    }
    
    // MARK: - Academic Context Detection Tests
    
    func testAcademicContextDetection_FormalAcademic() async throws {
        let academicInputs = [
            "This academic research explores the scholarly implications of university-based studies.",
            "The dissertation presents empirical analysis through peer-review methodology.",
            "Journal publications require rigorous academic standards and scholarly discourse.",
            "Conference presentations demonstrate research inquiry at the university level."
        ]
        
        for input in academicInputs {
            let context = await njson.detectAcademicContext(input)
            
            XCTAssertTrue(context.isAcademic, "Should detect academic context for: \(input)")
            XCTAssertEqual(context.contextType, "formal_academic", "Should classify as formal academic")
            XCTAssertEqual(context.suggestedMode, .spd, "Should suggest SPD mode for formal academic")
            XCTAssertEqual(context.velocityAdjustment, 1.5, accuracy: 0.1, "Should apply standard academic velocity")
            XCTAssertGreaterThan(context.confidence, 0.6, "Confidence should be high for clear academic content")
        }
    }
    
    func testAcademicContextDetection_NeurodiversityScholarly() async throws {
        let neurodiversityInputs = [
            "Academic research on neurodiversity reveals important insights about autism spectrum considerations.",
            "Scholarly analysis of cognitive differences in university settings shows diversity benefits.",
            "Research inquiry into behavioral patterns among neurodivergent academic populations.",
            "University-based studies examining autism and academic performance correlations."
        ]
        
        for input in neurodiversityInputs {
            let context = await njson.detectAcademicContext(input)
            
            XCTAssertTrue(context.isAcademic, "Should detect academic context for neurodiversity content")
            XCTAssertEqual(context.contextType, "neurodiversity_scholarly", "Should classify as neurodiversity scholarly")
            XCTAssertEqual(context.suggestedMode, .sbmpdAmf, "Should suggest SBMPD/AMF mode for neurodiversity")
            XCTAssertEqual(context.velocityAdjustment, 1.2, accuracy: 0.1, "Should apply slower velocity for neurodiversity awareness")
        }
    }
    
    func testAcademicContextDetection_CasualAcademic() async throws {
        let casualAcademicInputs = [
            "I'm studying this research topic for my college paper.",
            "Can you help me understand this academic concept better?",
            "This university course is covering some interesting research areas."
        ]
        
        for input in casualAcademicInputs {
            let context = await njson.detectAcademicContext(input)
            
            XCTAssertTrue(context.isAcademic, "Should detect academic context for casual academic content")
            XCTAssertEqual(context.contextType, "casual_academic", "Should classify as casual academic")
            XCTAssertEqual(context.suggestedMode, .velocity, "Should suggest velocity mode for casual academic")
            XCTAssertEqual(context.velocityAdjustment, 1.3, accuracy: 0.1, "Should apply moderate velocity adjustment")
        }
    }
    
    func testAcademicContextDetection_PersonalCommunication() async throws {
        let personalInputs = [
            "I feel really happy about sharing this personal experience with you.",
            "My family and I think this story is worth telling emotionally.",
            "I believe this personal opinion reflects my feelings about the situation.",
            "Sharing my emotional story with friends makes me feel connected."
        ]
        
        for input in personalInputs {
            let context = await njson.detectAcademicContext(input)
            
            XCTAssertFalse(context.isAcademic, "Should not detect academic context for personal content")
            XCTAssertEqual(context.contextType, "personal_communication", "Should classify as personal communication")
            XCTAssertEqual(context.suggestedMode, .sbmpdAmf, "Should suggest SBMPD/AMF for personal sharing")
            XCTAssertEqual(context.velocityAdjustment, 1.0, accuracy: 0.1, "Should use normal personal pacing")
        }
    }
    
    // MARK: - ASPD Formula Application Tests
    
    func testASPDFormula_SPDMode() async throws {
        let academicInput = "This academic research paper presents scholarly analysis through rigorous university-based methodology."
        
        let (processedText, report) = try await njson.applyASPDFormula(academicInput)
        
        // Verify ASPD processing
        XCTAssertFalse(processedText.isEmpty, "ASPD should generate processed text")
        XCTAssertNotEqual(processedText, academicInput, "ASPD should modify the input")
        
        // Verify report details
        XCTAssertEqual(report.academicContext.suggestedMode, .spd, "Should use SPD mode")
        XCTAssertEqual(report.paddingApplied, "SPD (Standard Social Padding)", "Should apply standard social padding")
        XCTAssertEqual(report.booleanMindLevel, .medium, "Should use medium Boolean Mind padding for SPD")
        XCTAssertTrue(report.amfAlignment, "AMF alignment should be maintained")
        XCTAssertEqual(report.formulaEquation, "ASPD = (SPD v SBMPD/AMF)v", "Should record correct formula")
    }
    
    func testASPDFormula_SBMPDAmfMode() async throws {
        let neurodiversityInput = "I'm sharing my personal experience with autism research in academic settings."
        
        let (processedText, report) = try await njson.applyASPDFormula(neurodiversityInput)
        
        // Verify ASPD processing
        XCTAssertFalse(processedText.isEmpty, "ASPD should generate processed text")
        XCTAssertTrue(processedText.contains("AMF alignment"), "Should include AMF alignment reference")
        
        // Verify report details
        XCTAssertEqual(report.academicContext.suggestedMode, .sbmpdAmf, "Should use SBMPD/AMF mode")
        XCTAssertEqual(report.paddingApplied, "SBMPD/AMF (Semi-Boolean Mind Padding modified by AMF)", "Should apply SBMPD/AMF")
        XCTAssertTrue(report.amfAlignment, "AMF alignment should be maintained")
    }
    
    func testASPDFormula_VelocityMode() async throws {
        let casualInput = "I'm studying this research topic for my university course project."
        
        let (processedText, report) = try await njson.applyASPDFormula(casualInput)
        
        // Verify ASPD processing
        XCTAssertFalse(processedText.isEmpty, "ASPD should generate processed text")
        
        // Verify report details
        XCTAssertEqual(report.academicContext.suggestedMode, .velocity, "Should use velocity mode")
        XCTAssertTrue(report.paddingApplied.contains("Velocity-adjusted"), "Should apply velocity-adjusted padding")
        XCTAssertEqual(report.velocityFactor, 1.3, accuracy: 0.1, "Should use correct velocity factor")
    }
    
    // MARK: - AMF Ratio Threshold Tests
    
    func testAMFRatioThreshold_ValidAlignment() async throws {
        // Test the critical AMF ratio: 2.89 / 2.99 = 0.9666... ≥ 0.96
        let state = await njson.getCognitiveState()
        let amfRatio = state.aiCognitive / state.booleanMindQs
        
        XCTAssertEqual(amfRatio, 0.9666, accuracy: 0.001, "AMF ratio should be approximately 0.9666")
        XCTAssertGreaterThanOrEqual(amfRatio, 0.96, "AMF ratio must be ≥ 0.96 for optimal alignment")
        
        // Test ASPD behavior with optimal AMF ratio
        let testInput = "Personal sharing about neurodiversity experiences in academic settings."
        let (_, report) = try await njson.applyASPDFormula(testInput)
        
        // With AMF ratio ≥ 0.96, should use light padding for SBMPD/AMF mode
        if report.academicContext.suggestedMode == .sbmpdAmf {
            XCTAssertEqual(report.booleanMindLevel, .light, "Should use light padding when AMF ratio ≥ 0.96")
        }
    }
    
    func testAMFFormulaValidation_PrecisionMaintenance() async throws {
        let validation = try await njson.validateAMFFormula()
        
        XCTAssertTrue(validation.formulaValid, "AMF formula should be mathematically valid")
        XCTAssertTrue(validation.temperatureNormal, "Heat shield temperature should be normal")
        XCTAssertTrue(validation.bufferIntact, "The 0.1 buffer should remain intact")
        XCTAssertTrue(validation.overallHealth, "Overall AMF system health should be optimal")
        
        // Verify specific mathematical precision
        let diagnostics = validation.diagnostics
        XCTAssertEqual(diagnostics.aiCognitive, 2.89, accuracy: 0.0001, "AIc precision must be maintained")
        XCTAssertEqual(diagnostics.buffer, 0.1, accuracy: 0.0001, "Buffer precision must be exact")
        XCTAssertEqual(diagnostics.booleanMindQs, 2.99, accuracy: 0.0001, "BMqs precision must be maintained")
        
        // Verify bridge health
        XCTAssertTrue(diagnostics.bridgeHealth.contains("stable"), "The narrow bridge should remain stable")
    }
    
    // MARK: - Boolean Mind Padding Level Tests
    
    func testBooleanMindPadding_None() async throws {
        let testMessage = "Direct test message"
        let paddedMessage = await njson.applyBooleanMindSocialPadding(testMessage, level: .none)
        
        XCTAssertEqual(paddedMessage, testMessage, "None padding should return original message")
    }
    
    func testBooleanMindPadding_Light() async throws {
        let testMessage = "Can you help me with this request"
        let paddedMessage = await njson.applyBooleanMindSocialPadding(testMessage, level: .light)
        
        XCTAssertNotEqual(paddedMessage, testMessage, "Light padding should modify the message")
        XCTAssertTrue(paddedMessage.contains("Please") || paddedMessage.contains("Regarding"), "Should add basic politeness")
    }
    
    func testBooleanMindPadding_Medium() async throws {
        let testMessage = "What is the status of the system?"
        let paddedMessage = await njson.applyBooleanMindSocialPadding(testMessage, level: .medium, branch: .professional)
        
        XCTAssertNotEqual(paddedMessage, testMessage, "Medium padding should modify the message")
        XCTAssertTrue(paddedMessage.contains("academic") || paddedMessage.contains("Thank you"), "Should add conversational elements")
    }
    
    func testBooleanMindPadding_Enhanced() async throws {
        let testMessage = "I need information about this topic"
        let paddedMessage = await njson.applyBooleanMindSocialPadding(testMessage, level: .enhanced, branch: .familyFriends)
        
        XCTAssertNotEqual(paddedMessage, testMessage, "Enhanced padding should significantly modify the message")
        XCTAssertTrue(paddedMessage.contains("appreciate") || paddedMessage.contains("hope"), "Should add personalization")
    }
    
    // MARK: - Edge Case and Confidence Tests
    
    func testConfidenceCalculation_EdgeCases() async throws {
        let edgeCases = [
            ("", 0.5), // Empty string should default to 0.5 confidence
            ("No keywords here", 0.5), // No academic or personal keywords
            ("academic academic academic", 1.0), // All academic keywords
            ("personal feeling emotional story", 0.0), // All personal keywords
            ("academic personal study feeling", 0.5) // Equal mix
        ]
        
        for (input, expectedConfidence) in edgeCases {
            let context = await njson.detectAcademicContext(input)
            XCTAssertEqual(context.confidence, expectedConfidence, accuracy: 0.1, "Confidence calculation failed for: \(input)")
        }
    }
    
    func testASPDFormula_EmptyInput() async throws {
        let (processedText, report) = try await njson.applyASPDFormula("")
        
        XCTAssertFalse(processedText.isEmpty, "Should handle empty input gracefully")
        XCTAssertEqual(report.academicContext.confidence, 0.5, "Empty input should have neutral confidence")
        XCTAssertTrue(report.amfAlignment, "AMF alignment should be maintained even with empty input")
    }
    
    func testASPDFormula_VeryLongInput() async throws {
        let longInput = String(repeating: "academic research university scholarly ", count: 100)
        let (processedText, report) = try await njson.applyASPDFormula(longInput)
        
        XCTAssertFalse(processedText.isEmpty, "Should handle very long input")
        XCTAssertTrue(report.academicContext.isAcademic, "Should detect academic context in long input")
        XCTAssertTrue(report.amfAlignment, "AMF alignment should be maintained with long input")
    }
    
    func testASPDFormula_SpecialCharacters() async throws {
        let specialInput = "Academic research with émojis 🎓📚 and spëcial characters: @#$%"
        let (processedText, report) = try await njson.applyASPDFormula(specialInput)
        
        XCTAssertFalse(processedText.isEmpty, "Should handle special characters")
        XCTAssertTrue(report.academicContext.isAcademic, "Should detect academic context despite special characters")
        XCTAssertTrue(report.amfAlignment, "AMF alignment should be maintained with special characters")
    }
    
    // MARK: - Performance Benchmarks
    
    func testASPDPerformance_AcademicDetection() async throws {
        let testInputs = [
            "Academic research demonstrates scholarly excellence through university-based peer-review.",
            "Personal sharing of emotional experiences with family and friends.",
            "Neurodiversity research in academic settings requires special consideration.",
            "Simple conversation about daily topics."
        ]
        
        let startTime = CFAbsoluteTimeGetCurrent()
        
        for input in testInputs {
            let _ = await njson.detectAcademicContext(input)
        }
        
        let totalTime = CFAbsoluteTimeGetCurrent() - startTime
        let averageTime = totalTime / Double(testInputs.count) * 1000 // Convert to milliseconds
        
        XCTAssertLessThan(averageTime, 50.0, "Academic context detection should average <50ms")
    }
    
    func testASPDPerformance_FormulaApplication() async throws {
        let testInput = "Academic research on neurodiversity shows important insights for scholarly communication."
        
        let startTime = CFAbsoluteTimeGetCurrent()
        
        let _ = try await njson.applyASPDFormula(testInput)
        
        let processingTime = (CFAbsoluteTimeGetCurrent() - startTime) * 1000 // Convert to milliseconds
        
        XCTAssertLessThan(processingTime, 100.0, "ASPD formula application should complete <100ms")
    }
    
    func testBooleanMindPerformance() async throws {
        let testMessage = "Test message for Boolean Mind padding performance evaluation."
        
        let startTime = CFAbsoluteTimeGetCurrent()
        
        let _ = await njson.applyBooleanMindSocialPadding(testMessage, level: .enhanced)
        
        let processingTime = (CFAbsoluteTimeGetCurrent() - startTime) * 1000 // Convert to milliseconds
        
        XCTAssertLessThan(processingTime, 25.0, "Boolean Mind padding should complete <25ms")
    }
    
    // MARK: - Integration Stress Tests
    
    func testASPDIntegration_StressTest() async throws {
        let stressInputs = [
            "Complex academic research combining neurodiversity studies with university-based scholarly methodology.",
            "Personal emotional sharing about autism spectrum experiences in academic conference settings.",
            "Velocity-adjusted communication for casual academic inquiry about research methodology.",
            "Professional consultation requiring enhanced social padding for neurotypical academic discourse.",
            "Standard academic paper discussing empirical analysis through peer-review publication processes."
        ]
        
        for (index, input) in stressInputs.enumerated() {
            let (processedText, report) = try await njson.applyASPDFormula(input)
            
            XCTAssertFalse(processedText.isEmpty, "Stress test \(index + 1) should produce output")
            XCTAssertTrue(report.amfAlignment, "AMF alignment must be maintained in stress test \(index + 1)")
            XCTAssertNotNil(report.booleanMindLevel, "Boolean Mind level should be determined in stress test \(index + 1)")
            
            // Verify formula equation is preserved
            XCTAssertEqual(report.formulaEquation, "ASPD = (SPD v SBMPD/AMF)v", "Formula equation must be consistent")
        }
    }
    
    func testConcurrentASPDProcessing() async throws {
        let concurrentInputs = [
            "Academic research input 1",
            "Personal sharing input 2", 
            "Neurodiversity scholarly input 3",
            "Casual academic input 4",
            "Professional communication input 5"
        ]
        
        await withTaskGroup(of: Void.self) { group in
            for (index, input) in concurrentInputs.enumerated() {
                group.addTask {
                    do {
                        let (_, report) = try await self.njson.applyASPDFormula(input)
                        XCTAssertTrue(report.amfAlignment, "Concurrent AMF alignment must be maintained for input \(index + 1)")
                    } catch {
                        XCTFail("Concurrent ASPD processing failed for input \(index + 1): \(error)")
                    }
                }
            }
        }
    }
    
    // MARK: - Real-World Validation Tests
    
    func testRealWorldValidation_AcademicTransition() async throws {
        // Test the real-world scenario: switching from personal to academic communication
        let personalInput = "I feel excited to share my personal experience with this topic."
        let academicInput = "This research demonstrates significant scholarly findings through university-based peer-review."
        
        // Process personal input
        let (personalProcessed, personalReport) = try await njson.applyASPDFormula(personalInput)
        XCTAssertEqual(personalReport.academicContext.suggestedMode, .sbmpdAmf, "Personal input should use SBMPD/AMF")
        
        // Process academic input
        let (academicProcessed, academicReport) = try await njson.applyASPDFormula(academicInput)
        XCTAssertEqual(academicReport.academicContext.suggestedMode, .spd, "Academic input should use SPD")
        
        // Verify different processing approaches
        XCTAssertNotEqual(personalProcessed, academicProcessed, "Different contexts should produce different outputs")
        XCTAssertNotEqual(personalReport.booleanMindLevel, academicReport.booleanMindLevel, "Different Boolean Mind levels should be applied")
        
        // Both should maintain AMF alignment
        XCTAssertTrue(personalReport.amfAlignment, "Personal processing should maintain AMF alignment")
        XCTAssertTrue(academicReport.amfAlignment, "Academic processing should maintain AMF alignment")
    }
}