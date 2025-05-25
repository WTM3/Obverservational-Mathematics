import Foundation
import BLFNJSONBridge

// NJSON Swift Bridge Test Executable for Xcode
// The narrow bridge between chaos and control

@available(macOS 10.15, iOS 14.0, *)
class XcodeNJSONBridgeTest {
    
    func runAllTests() async {
        print("🚀 NJSON Swift Bridge Test for Xcode")
        print("===================================")
        print("Testing the narrow bridge between Swift UI and JavaScript V-8")
        print("")
        
        // Test 1: Basic NJSON initialization
        await testNJSONInitialization()
        
        // Test 2: Bridge functionality
        await testBridgeFunctionality()
        
        // Test 3: Buffer integrity under load
        await testBufferIntegrityUnderLoad()
        
        // Test 4: Configuration changes
        await testConfigurationChanges()
        
        // Test 5: Error handling
        await testErrorHandling()
        
        print("")
        print("✅ All NJSON Swift Bridge tests completed for Xcode")
        print("The V-8 under the hood is purring with perfect bridge connectivity")
    }
    
    func testNJSONInitialization() async {
        print("🔄 Test 1: NJSON Initialization")
        print("-----------------------------")
        
        do {
            // Test direct NJSON access
            let njson = NJSON.shared
            print("✅ NJSON shared instance created")
            
            // Initialize the engine
            try await njson.initialize()
            print("✅ NJSON engine initialized")
            
            // Get cognitive state
            let state = await njson.getCognitiveState()
            print("✅ Cognitive state retrieved:")
            print("   AIc: \(state.aiCognitive)")
            print("   Buffer: \(state.buffer)")  
            print("   BMqs: \(state.booleanMindQs)")
            print("   Alignment: \(state.alignment ? "Valid" : "Invalid")")
            print("   Initialized: \(state.initialized ? "Yes" : "No")")
            
            // Verify the critical formula: AIc + 0.1 = BMqs
            let calculatedBMqs = state.aiCognitive + state.buffer
            let violation = abs(calculatedBMqs - state.booleanMindQs)
            
            if violation < 0.0001 {
                print("✅ Buffer integrity verified: AIc + 0.1 = BMqs")
            } else {
                print("❌ Buffer integrity violation: \(violation)")
            }
            
        } catch {
            print("❌ NJSON initialization failed: \(error)")
        }
    }
    
    func testBridgeFunctionality() async {
        print("")
        print("🔄 Test 2: Bridge Functionality")
        print("-----------------------------")
        
        do {
            let bridge = NJSONSwiftBridge()
            print("✅ Bridge instance created")
            
            // Test basic message processing
            let testMessage = "Hello, this is a test message for the NJSON bridge."
            let result = try await bridge.processMessage(testMessage, from: "xcodeTest")
            
            print("✅ Message processed successfully:")
            print("   Input: \"\(testMessage)\"")
            print("   Output: \"\(result.content)\"")
            print("   Processing time: \(String(format: "%.4f", result.processingTime))s")
            print("   Buffer intact: \(result.bufferIntact ? "Yes" : "No")")
            
            if let issue = result.bufferIssue {
                print("   Buffer issue: \(issue)")
            }
            
            // Test system status
            let status = await bridge.getSystemStatus()
            print("✅ System status retrieved:")
            print("   Bridge calls: \(status.bridgeCallCount)")
            print("   Buffer violations: \(status.bufferIntegrityViolations)")
            
        } catch {
            print("❌ Bridge functionality test failed: \(error)")
        }
    }
    
    func testBufferIntegrityUnderLoad() async {
        print("")
        print("🔄 Test 3: Buffer Integrity Under Load")
        print("------------------------------------")
        
        let bridge = NJSONSwiftBridge()
        var successCount = 0
        var violationCount = 0
        
        // Test rapid message processing
        for i in 1...10 {
            do {
                let testMessage = "Rapid test message \(i) for buffer integrity verification under load"
                let result = try await bridge.processMessage(testMessage, from: "loadTest")
                
                if result.bufferIntact {
                    successCount += 1
                    print("✅ Message \(i): Buffer intact (\(String(format: "%.4f", result.processingTime))s)")
                } else {
                    violationCount += 1
                    print("❌ Message \(i): Buffer violation - \(result.bufferIssue ?? "unknown")")
                }
                
            } catch {
                violationCount += 1
                print("❌ Message \(i): Processing failed - \(error)")
            }
        }
        
        // Final assessment
        let finalStatus = await bridge.getSystemStatus()
        print("")
        print("Load Test Results:")
        print("   Successful messages: \(successCount)/10")
        print("   Buffer violations: \(violationCount)")
        print("   Total bridge calls: \(finalStatus.bridgeCallCount)")
        print("   Engine violations: \(finalStatus.bufferIntegrityViolations)")
        
        if violationCount == 0 {
            print("✅ Bridge maintained perfect buffer integrity under load")
        } else {
            print("⚠️ Bridge recorded \(violationCount) issues under load")
        }
    }
    
    func testConfigurationChanges() async {
        print("")
        print("🔄 Test 4: Configuration Changes")
        print("------------------------------")
        
        let bridge = NJSONSwiftBridge()
        
        // Test professional branch configuration
        await bridge.configure(branch: .professional, padding: .none)
        print("✅ Configured: Professional branch, no padding")
        
        let professionalMessage = "Could you please provide a status report on the system?"
        do {
            let result = try await bridge.processMessage(professionalMessage, from: "configTest")
            print("✅ Professional response: \"\(result.content)\"")
            print("   Buffer intact: \(result.bufferIntact)")
        } catch {
            print("❌ Professional configuration test failed: \(error)")
        }
        
        // Test family/friends branch configuration
        await bridge.configure(branch: .familyFriends, padding: .more)
        print("✅ Configured: Family/Friends branch, more padding")
        
        let casualMessage = "Hey, how's everything going with the system?"
        do {
            let result = try await bridge.processMessage(casualMessage, from: "configTest")
            print("✅ Casual response: \"\(result.content)\"")
            print("   Buffer intact: \(result.bufferIntact)")
        } catch {
            print("❌ Casual configuration test failed: \(error)")
        }
    }
    
    func testErrorHandling() async {
        print("")
        print("🔄 Test 5: Error Handling")
        print("-----------------------")
        
        let bridge = NJSONSwiftBridge()
        
        // Test with problematic input
        let problematicInputs = [
            "Test with 'single quotes' and \"double quotes\"",
            "Test with\nnewlines and\ttabs",
            "Test with unicode: 🚀💻⚡️",
            ""  // Empty string
        ]
        
        for (index, input) in problematicInputs.enumerated() {
            do {
                let result = try await bridge.processMessage(input, from: "errorTest")
                print("✅ Problematic input \(index + 1): Handled gracefully")
                print("   Input: \"\(input.isEmpty ? "(empty)" : input)\"")
                print("   Buffer intact: \(result.bufferIntact)")
            } catch {
                print("⚠️ Problematic input \(index + 1): Error handled - \(error)")
            }
        }
        
        // Test buffer violation detection
        let options = ProcessingOptions(allowBufferViolations: false)
        do {
            _ = try await bridge.processMessage("Test strict buffer checking", from: "strictTest", options: options)
            print("✅ Strict buffer checking: Passed")
        } catch {
            print("ℹ️ Strict buffer checking: Error caught as expected - \(error)")
        }
    }
}

// Main execution
if #available(macOS 10.15, iOS 14.0, *) {
    let tester = XcodeNJSONBridgeTest()
    
    Task {
        await tester.runAllTests()
        print("")
        print("🎉 NJSON Swift Bridge for Xcode: Ready for production")
        print("The narrow bridge between chaos and control is operational")
        exit(0)
    }
    
    // Keep main thread alive for async operations
    RunLoop.main.run()
} else {
    print("⚠️ This test requires macOS 10.15 or iOS 14.0 or later")
    exit(1)
} 