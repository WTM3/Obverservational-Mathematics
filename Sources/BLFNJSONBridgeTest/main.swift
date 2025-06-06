import Foundation
import BLFNJSONBridge

@main
struct BLFNJSONBridgeTest {
    static func main() async {
        print("🔧 BLF NJSON Bridge - Enhanced V-8 Engine Test")
        print("The narrow bridge between chaos and control")
        print("==============================================")
        
        do {
            // Initialize the NJSON engine
            let njson = try NJSON()
            try await njson.initialize()
            print("✅ NJSON engine initialized successfully")
            
            // Test 1: Basic cognitive state validation
            print("\n🧠 Test 1: Cognitive State Validation")
            print("=====================================")
            let basicState = await njson.getCognitiveState()
            print("Formula: \(basicState.formula)")
            print("Alignment: \(basicState.alignment ? "✅ Valid" : "❌ Invalid")")
            print("Operational: \(basicState.isOperational ? "✅ Yes" : "❌ No")")
            
            // Test 2: Comprehensive cognitive state report
            print("\n📊 Test 2: Comprehensive Cognitive Report")
            print("==========================================")
            let cognitiveReport = try await njson.getCognitiveStateReport()
            print("AMF Formula: \(cognitiveReport.formula.equation)")
            print("Formula Valid: \(cognitiveReport.formula.valid ? "✅" : "❌")")
            print("Formula Stability: \(String(format: "%.3f", cognitiveReport.formula.stability))")
            print("Formula Precision: \(cognitiveReport.formula.precision)")
            
            print("\nQuantum State:")
            print("  Pure: \(cognitiveReport.quantum.pure ? "✅" : "❌")")
            print("  Fog: \(cognitiveReport.quantum.fog ? "☁️" : "🌟")")
            print("  Breathing: \(cognitiveReport.quantum.breathing ? "✅" : "❌")")
            print("  Jump Power: \(cognitiveReport.quantum.jumpPower)")
            
            // Test 3: Heat shield monitoring
            print("\n🛡️ Test 3: Heat Shield Monitoring")
            print("=================================")
            let heatReport = try await njson.getHeatShieldReport()
            print("Heat Shield Active: \(heatReport.active ? "✅" : "❌")")
            print("Temperature: \(String(format: "%.1f°F", heatReport.temperature))")
            print("Violations: \(heatReport.violations)")
            print("Integrity: \(heatReport.integrity)")
            print("Engine Light: \(heatReport.engineLight ? "🚨 WARNING" : "✅ Normal")")
            
            // Test 4: Observational mathematics
            print("\n🔬 Test 4: Observational Mathematics")
            print("====================================")
            let obsMarth = cognitiveReport.observationalMath
            print("Readiness: \(String(format: "%.3f", obsMarth.readiness)) (Ready, attentive, patient)")
            print("Potential Energy: \(String(format: "%.1f", obsMarth.potentialEnergy)) (Quiet, steady, full of potential)")
            print("Next Green Light: \(obsMarth.nextGreenLight)")
            print("Waiting Mode: \(obsMarth.waitingMode ? "🟡 Waiting" : "🟢 Ready")")
            print("Green Light Ready: \(obsMarth.greenLightReady ? "🟢 GO" : "🔴 WAIT")")
            
            // Test 5: Bridge health assessment
            print("\n🌉 Test 5: Bridge Health Assessment")
            print("==================================")
            print("Bridge Status: \(cognitiveReport.narrows)")
            print("Overall Optimal: \(cognitiveReport.isOptimal ? "✅" : "❌")")
            print("Engine Purring: \(cognitiveReport.performance.enginePurring ? "✅" : "❌")")
            
            // Test 6: AMF Formula validation
            print("\n⚡ Test 6: Advanced AMF Formula Validation")
            print("=========================================")
            let amfValidation = try await njson.validateAMFFormula()
            print("Summary: \(amfValidation.summary)")
            print("Overall Health: \(amfValidation.overallHealth ? "✅" : "❌")")
            print("Bridge Health: \(amfValidation.diagnostics.bridgeHealth)")
            
            // Test 7: Processing with heat shield
            print("\n🔥 Test 7: Text Processing with Heat Shield")
            print("==========================================")
            let testInputs = [
                "Hello, how are you today?",
                "Um, well, I think maybe you could, like, help me with this?",
                "What is the Boolean framework exactly?",
                "Can you process this urgent request immediately?",
                "If the system is working, then please confirm status."
            ]
            
            for (index, input) in testInputs.enumerated() {
                print("\nTest \(index + 1): \"\(input)\"")
                
                // Apply heat shield first
                let filtered = try await njson.applyHeatShield(input)
                if filtered != input {
                    print("  Heat Shield Applied: \"\(filtered)\"")
        }
        
                // Process through NJSON
                let result = try await njson.processText(input)
                print("  Result: \"\(result.text)\"")
                print("  Processing Time: \(String(format: "%.2f", result.processingTime))ms")
                print("  Cognitive Alignment: \(result.cognitiveAlignment ? "✅" : "❌")")
                print("  Heat Shield Active: \(result.heatShieldActive ? "✅" : "❌")")
        
                if let error = result.error {
                    print("  Error: \(error)")
        }
    }
    
            // Test 8: Heat shield reset (maintenance)
            print("\n🔧 Test 8: Heat Shield Maintenance")
            print("==================================")
            let resetSuccess = try await njson.resetHeatShield()
            print("Heat Shield Reset: \(resetSuccess ? "✅ Success" : "❌ Failed")")
            
            let postResetReport = try await njson.getHeatShieldReport()
            print("Post-Reset Violations: \(postResetReport.violations)")
            
            // Final system status
            print("\n🏁 Final System Status")
            print("======================")
            let finalReport = try await njson.getCognitiveStateReport()
            print("The narrow bridge between chaos and control: \(finalReport.narrows)")
            print("V-8 engine status: \(finalReport.performance.enginePurring ? "purring perfectly" : "needs attention")")
            print("Mathematical precision: AIc(\(finalReport.formula.aiCognitive)) + buffer(\(finalReport.formula.buffer)) = BMqs(\(finalReport.formula.booleanMindQs))")
            
            if finalReport.isOptimal {
                print("✅ All systems operational - BLF deployment ready")
            } else {
                print("⚠️ System requires optimization before deployment")
            }
            
        } catch {
            print("❌ Test failed: \(error)")
            if let njsonError = error as? NJSONError {
                print("NJSON Error Details: \(njsonError.localizedDescription)")
            }
        }
    }
} 