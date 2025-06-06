import Foundation

/// Standalone ASPD Formula Validator - Alternative to XCTest
/// Tests ASPD = (SPD v SBMPD/AMF)v implementation without external test frameworks
public struct ASPDValidator {
    
    public static func runComprehensiveValidation() async -> ValidationReport {
        print("🧪 Starting Comprehensive ASPD Formula Validation")
        print("⚡ Testing: ASPD = (SPD v SBMPD/AMF)v")
        print("===============================================")
        
        var report = ValidationReport()
        
        // Initialize NJSON engine
        guard let njson = try? NJSON() else {
            report.addError("Failed to initialize NJSON engine")
            return report
        }
        
        do {
            try await njson.initialize()
            report.addSuccess("✅ NJSON engine initialized successfully")
        } catch {
            report.addError("❌ NJSON initialization failed: \(error)")
            return report
        }
        
        // Test 1: AMF Formula Validation
        await testAMFFormulaValidation(njson: njson, report: &report)
        
        // Test 2: Academic Context Detection
        await testAcademicContextDetection(njson: njson, report: &report)
        
        // Test 3: ASPD Formula Application
        await testASPDFormulaApplication(njson: njson, report: &report)
        
        // Test 4: Boolean Mind Padding Levels
        await testBooleanMindPaddingLevels(njson: njson, report: &report)
        
        // Test 5: Performance Benchmarks
        await testPerformanceBenchmarks(njson: njson, report: &report)
        
        // Test 6: Edge Cases and Stress Testing
        await testEdgeCasesAndStress(njson: njson, report: &report)
        
        // Final Report
        print("\n📊 ASPD Validation Complete")
        print("✅ Passed: \(report.passedTests)")
        print("❌ Failed: \(report.failedTests)")
        print("📈 Success Rate: \(String(format: "%.1f", report.successRate * 100))%")
        
        if report.successRate >= 0.95 {
            print("🎉 ASPD Formula: OPTIMAL - V-8 engine purring perfectly")
        } else if report.successRate >= 0.8 {
            print("⚠️ ASPD Formula: Good - Minor issues detected")
        } else {
            print("🚨 ASPD Formula: Needs attention - Critical issues found")
        }
        
        return report
    }
    
    // MARK: - Individual Test Functions
    
    private static func testAMFFormulaValidation(njson: NJSON, report: inout ValidationReport) async {
        print("\n🧠 Testing AMF Formula Validation...")
        
        let state = await njson.getCognitiveState()
        
        // Test mathematical precision
        if abs(state.aiCognitive - 2.89) < 0.0001 {
            report.addSuccess("✅ AI Cognitive value precise: \(state.aiCognitive)")
        } else {
            report.addError("❌ AI Cognitive value incorrect: \(state.aiCognitive)")
        }
        
        if abs(state.buffer - 0.1) < 0.0001 {
            report.addSuccess("✅ Buffer value precise: \(state.buffer)")
        } else {
            report.addError("❌ Buffer value incorrect: \(state.buffer)")
        }
        
        if abs(state.booleanMindQs - 2.99) < 0.0001 {
            report.addSuccess("✅ Boolean Mind QS value precise: \(state.booleanMindQs)")
        } else {
            report.addError("❌ Boolean Mind QS value incorrect: \(state.booleanMindQs)")
        }
        
        // Test formula alignment
        if state.alignment {
            report.addSuccess("✅ AMF formula alignment maintained: \(state.formula)")
        } else {
            report.addError("❌ AMF formula alignment violated: \(state.formula)")
        }
        
        // Test AMF ratio (2.89/2.99 = 0.9666...)
        let amfRatio = state.aiCognitive / state.booleanMindQs
        if amfRatio >= 0.96 {
            report.addSuccess("✅ AMF ratio optimal: \(String(format: "%.4f", amfRatio)) ≥ 0.96")
        } else {
            report.addError("❌ AMF ratio suboptimal: \(String(format: "%.4f", amfRatio)) < 0.96")
        }
    }
    
    private static func testAcademicContextDetection(njson: NJSON, report: inout ValidationReport) async {
        print("\n🎓 Testing Academic Context Detection...")
        
        let testCases: [(input: String, expectedAcademic: Bool, expectedMode: ASPDMode, description: String)] = [
            ("This academic research presents scholarly analysis through university methodology.", true, .spd, "Formal Academic"),
            ("I'm sharing my personal autism experience in academic settings.", true, .sbmpdAmf, "Neurodiversity Scholarly"),
            ("I feel happy sharing this emotional story with my family.", false, .sbmpdAmf, "Personal Communication"),
            ("University course research study for academic inquiry.", true, .velocity, "Casual Academic"),
            ("Academic neurodiversity research shows important insights.", true, .sbmpdAmf, "Neurodiversity Academic")
        ]
        
        for testCase in testCases {
            let context = await njson.detectAcademicContext(testCase.input)
            
            if context.isAcademic == testCase.expectedAcademic {
                report.addSuccess("✅ \(testCase.description): Academic detection correct (\(context.isAcademic))")
            } else {
                report.addError("❌ \(testCase.description): Academic detection wrong (expected \(testCase.expectedAcademic), got \(context.isAcademic))")
            }
            
            if context.suggestedMode == testCase.expectedMode {
                report.addSuccess("✅ \(testCase.description): ASPD mode correct (\(context.suggestedMode))")
            } else {
                report.addError("❌ \(testCase.description): ASPD mode wrong (expected \(testCase.expectedMode), got \(context.suggestedMode))")
            }
        }
    }
    
    private static func testASPDFormulaApplication(njson: NJSON, report: inout ValidationReport) async {
        print("\n📐 Testing ASPD Formula Application...")
        
        do {
            // Test SPD mode
            let academicInput = "This academic research demonstrates scholarly methodology through peer-review."
            let (spdProcessed, spdReport) = try await njson.applyASPDFormula(academicInput)
            
            if !spdProcessed.isEmpty {
                report.addSuccess("✅ SPD mode processing generates output")
            } else {
                report.addError("❌ SPD mode processing failed to generate output")
            }
            
            if spdReport.amfAlignment {
                report.addSuccess("✅ SPD mode maintains AMF alignment")
            } else {
                report.addError("❌ SPD mode breaks AMF alignment")
            }
            
            // Test SBMPD/AMF mode
            let neurodiversityInput = "Personal sharing about autism research in academic contexts."
            let (sbmpdProcessed, sbmpdReport) = try await njson.applyASPDFormula(neurodiversityInput)
            
            if sbmpdReport.academicContext.suggestedMode == .sbmpdAmf {
                report.addSuccess("✅ SBMPD/AMF mode correctly selected for neurodiversity content")
            } else {
                report.addError("❌ SBMPD/AMF mode not selected for neurodiversity content")
            }
            
            if sbmpdProcessed.contains("AMF alignment") {
                report.addSuccess("✅ SBMPD/AMF mode includes AMF alignment reference")
            } else {
                report.addError("❌ SBMPD/AMF mode missing AMF alignment reference")
            }
            
        } catch {
            report.addError("❌ ASPD formula application failed: \(error)")
        }
    }
    
    private static func testBooleanMindPaddingLevels(njson: NJSON, report: inout ValidationReport) async {
        print("\n🧠 Testing Boolean Mind Padding Levels...")
        
        let testMessage = "Test message for padding validation"
        
        // Test all padding levels
        let paddingLevels: [SocialPadding] = [.none, .light, .medium, .enhanced]
        
        for level in paddingLevels {
            let paddedMessage = await njson.applyBooleanMindSocialPadding(testMessage, level: level)
            
            switch level {
            case .none:
                if paddedMessage == testMessage {
                    report.addSuccess("✅ None padding preserves original message")
                } else {
                    report.addError("❌ None padding modified message")
                }
            case .light, .medium, .enhanced:
                if paddedMessage != testMessage {
                    report.addSuccess("✅ \(level.rawValue.capitalized) padding modifies message appropriately")
                } else {
                    report.addError("❌ \(level.rawValue.capitalized) padding failed to modify message")
                }
            }
        }
    }
    
    private static func testPerformanceBenchmarks(njson: NJSON, report: inout ValidationReport) async {
        print("\n⚡ Testing Performance Benchmarks...")
        
        let testInput = "Academic research on neurodiversity demonstrates scholarly excellence through university-based peer-review methodology."
        
        // Academic context detection benchmark (<50ms)
        let contextStartTime = CFAbsoluteTimeGetCurrent()
        let _ = await njson.detectAcademicContext(testInput)
        let contextTime = (CFAbsoluteTimeGetCurrent() - contextStartTime) * 1000
        
        if contextTime < 50.0 {
            report.addSuccess("✅ Academic context detection: \(String(format: "%.1f", contextTime))ms (<50ms target)")
        } else {
            report.addError("❌ Academic context detection slow: \(String(format: "%.1f", contextTime))ms (≥50ms)")
        }
        
        // ASPD formula application benchmark (<100ms)
        do {
            let aspdStartTime = CFAbsoluteTimeGetCurrent()
            let _ = try await njson.applyASPDFormula(testInput)
            let aspdTime = (CFAbsoluteTimeGetCurrent() - aspdStartTime) * 1000
            
            if aspdTime < 100.0 {
                report.addSuccess("✅ ASPD formula application: \(String(format: "%.1f", aspdTime))ms (<100ms target)")
            } else {
                report.addError("❌ ASPD formula application slow: \(String(format: "%.1f", aspdTime))ms (≥100ms)")
            }
        } catch {
            report.addError("❌ ASPD performance test failed: \(error)")
        }
        
        // Boolean Mind padding benchmark (<25ms)
        let paddingStartTime = CFAbsoluteTimeGetCurrent()
        let _ = await njson.applyBooleanMindSocialPadding(testInput, level: .enhanced)
        let paddingTime = (CFAbsoluteTimeGetCurrent() - paddingStartTime) * 1000
        
        if paddingTime < 25.0 {
            report.addSuccess("✅ Boolean Mind padding: \(String(format: "%.1f", paddingTime))ms (<25ms target)")
        } else {
            report.addError("❌ Boolean Mind padding slow: \(String(format: "%.1f", paddingTime))ms (≥25ms)")
        }
    }
    
    private static func testEdgeCasesAndStress(njson: NJSON, report: inout ValidationReport) async {
        print("\n🔬 Testing Edge Cases and Stress Scenarios...")
        
        let edgeCases = [
            ("", "Empty string"),
            ("a", "Single character"),
            (String(repeating: "academic research ", count: 100), "Very long input"),
            ("Academic émojis 🎓📚 spëcial chars: @#$%", "Special characters"),
            ("Mix of academic research and personal feeling emotional sharing", "Mixed context")
        ]
        
        for (input, description) in edgeCases {
            do {
                let (processed, aspdReport) = try await njson.applyASPDFormula(input)
                
                if !processed.isEmpty || input.isEmpty {
                    report.addSuccess("✅ Edge case handled: \(description)")
                } else {
                    report.addError("❌ Edge case failed: \(description) - no output")
                }
                
                if aspdReport.amfAlignment {
                    report.addSuccess("✅ AMF alignment maintained for: \(description)")
                } else {
                    report.addError("❌ AMF alignment broken for: \(description)")
                }
                
            } catch {
                report.addError("❌ Edge case error for \(description): \(error)")
            }
        }
        
        // Stress test with concurrent processing
        print("🔥 Stress testing concurrent ASPD processing...")
        
        let concurrentInputs = [
            "Academic research input 1",
            "Personal sharing input 2",
            "Neurodiversity scholarly input 3",
            "Casual academic input 4",
            "Professional communication input 5"
        ]
        
        let startTime = CFAbsoluteTimeGetCurrent()
        
        await withTaskGroup(of: Bool.self) { group in
            for (index, input) in concurrentInputs.enumerated() {
                group.addTask {
                    do {
                        let (_, report) = try await njson.applyASPDFormula(input)
                        return report.amfAlignment
                    } catch {
                        print("⚠️ Concurrent processing error for input \(index + 1): \(error)")
                        return false
                    }
                }
            }
            
            var allSuccessful = true
            for await success in group {
                if !success {
                    allSuccessful = false
                }
            }
            
            let concurrentTime = (CFAbsoluteTimeGetCurrent() - startTime) * 1000
            
            if allSuccessful {
                report.addSuccess("✅ Concurrent processing successful in \(String(format: "%.1f", concurrentTime))ms")
            } else {
                report.addError("❌ Concurrent processing failed")
            }
        }
    }
}

// MARK: - Validation Report Structure

public struct ValidationReport {
    private var successes: [String] = []
    private var errors: [String] = []
    
    public var passedTests: Int { successes.count }
    public var failedTests: Int { errors.count }
    public var totalTests: Int { successes.count + errors.count }
    public var successRate: Double { 
        totalTests > 0 ? Double(passedTests) / Double(totalTests) : 0.0 
    }
    
    mutating func addSuccess(_ message: String) {
        successes.append(message)
        print(message)
    }
    
    mutating func addError(_ message: String) {
        errors.append(message)
        print(message)
    }
    
    public func printDetailedReport() {
        print("\n📊 Detailed Validation Report")
        print("===============================================")
        
        if !successes.isEmpty {
            print("\n✅ Successful Tests (\(successes.count)):")
            for success in successes {
                print("   \(success)")
            }
        }
        
        if !errors.isEmpty {
            print("\n❌ Failed Tests (\(errors.count)):")
            for error in errors {
                print("   \(error)")
            }
        }
        
        print("\n📈 Summary:")
        print("   Total Tests: \(totalTests)")
        print("   Passed: \(passedTests)")
        print("   Failed: \(failedTests)")
        print("   Success Rate: \(String(format: "%.1f", successRate * 100))%")
    }
}