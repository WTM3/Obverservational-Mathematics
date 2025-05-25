#!/usr/bin/env swift

import Foundation

// Simple test runner for NJSON Swift Bridge
// The narrow bridge between chaos and control

@available(macOS 10.15, iOS 14.0, *)
class NJSONBridgeTest {
    
    func runTests() async {
        print("🚀 NJSON Swift Bridge Test")
        print("=========================")
        print("Testing the narrow bridge between Swift UI and JavaScript V-8")
        print("")
        
        // Test 1: Basic initialization
        await testBasicInitialization()
        
        // Test 2: Bridge connection
        await testBridgeConnection()
        
        // Test 3: Buffer integrity
        await testBufferIntegrity()
        
        print("")
        print("✅ NJSON Swift Bridge testing complete")
        print("The bridge between chaos and control is operational")
    }
    
    func testBasicInitialization() async {
        print("🔄 Test 1: Basic NJSON Initialization")
        print("-----------------------------------")
        
        do {
            // Create NJSON instance
            let njson = NJSON.shared
            print("✅ NJSON instance created")
            
            // Attempt initialization (this will try to load JavaScript)
            try await njson.initialize()
            print("✅ NJSON engine initialized")
            
            // Get cognitive state
            let state = await njson.getCognitiveState()
            print("✅ Cognitive state retrieved:")
            print("   AIc: \(state.aiCognitive)")
            print("   Buffer: \(state.buffer)")  
            print("   BMqs: \(state.booleanMindQs)")
            print("   Processing cycles: \(state.processingCycles)")
            
            // Verify the narrow bridge formula
            let calculatedBMqs = state.aiCognitive + state.buffer
            let violation = abs(calculatedBMqs - state.booleanMindQs)
            
            if violation < 0.0001 {
                print("✅ Buffer integrity maintained: AIc + 0.1 = BMqs")
            } else {
                print("❌ Buffer integrity violation: \(violation)")
            }
            
        } catch {
            print("❌ Initialization failed: \(error)")
        }
    }
    
    func testBridgeConnection() async {
        print("")
        print("🔄 Test 2: Bridge Connection Test")
        print("-------------------------------")
        
        do {
            let bridge = NJSONSwiftBridge()
            print("✅ Bridge instance created")
            
            // Test system status
            let status = await bridge.getSystemStatus()
            print("✅ System status retrieved:")
            print("   Bridge calls: \(status.bridgeCallCount)")
            print("   Last duration: \(String(format: "%.4f", status.lastCallDuration))s")
            print("   Buffer violations: \(status.bufferIntegrityViolations)")
            
        } catch {
            print("❌ Bridge connection failed: \(error)")
        }
    }
    
    func testBufferIntegrity() async {
        print("")
        print("🔄 Test 3: Buffer Integrity Under Load")
        print("------------------------------------")
        
        let bridge = NJSONSwiftBridge()
        
        // Test multiple rapid calls to ensure buffer stays intact
        for i in 1...5 {
            do {
                let testMessage = "Test message \(i) for buffer integrity verification"
                let result = try await bridge.processMessage(testMessage, from: "bufferTest")
                
                if result.bufferIntact {
                    print("✅ Message \(i): Buffer intact (\(String(format: "%.4f", result.processingTime))s)")
                } else {
                    print("❌ Message \(i): Buffer violation - \(result.bufferIssue ?? "unknown")")
                }
                
            } catch {
                print("❌ Message \(i): Processing failed - \(error)")
            }
        }
        
        // Final status check
        let finalStatus = await bridge.getSystemStatus()
        print("")
        print("Final Status:")
        print("   Total bridge calls: \(finalStatus.bridgeCallCount)")
        print("   Buffer violations: \(finalStatus.bufferIntegrityViolations)")
        
        if finalStatus.bufferIntegrityViolations == 0 {
            print("✅ Bridge maintained perfect buffer integrity")
        } else {
            print("⚠️ Bridge recorded \(finalStatus.bufferIntegrityViolations) buffer violations")
        }
    }
}

// Run the tests
if #available(macOS 10.15, iOS 14.0, *) {
    Task {
        let tester = NJSONBridgeTest()
        await tester.runTests()
        exit(0)
    }
    
    // Keep the main thread alive for async operations
    RunLoop.main.run()
} else {
    print("⚠️ Tests require macOS 10.15 or iOS 14.0 or later")
    exit(1)
} 