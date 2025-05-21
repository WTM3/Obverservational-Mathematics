import Foundation
import XCTest

/// Test case for the thin NJSON Swift Wrapper
/// Demonstrates that the 0.1 buffer is maintained throughout
@available(macOS 10.15, iOS 14.0, *)
class NJSONSwiftWrapperTest: XCTestCase {
    
    // MARK: - Properties
    private var bridge: NJSONSwiftBridge!
    
    // MARK: - Test Lifecycle
    
    override func setUp() async throws {
        // Create the bridge with minimal overhead
        bridge = NJSONSwiftBridge()
    }
    
    override func tearDown() async throws {
        bridge = nil
    }
    
    // MARK: - Tests
    
    /// Test simple message processing
    func testMessageProcessing() async throws {
        print("🏎️ Testing NJSON Swift Wrapper - Message Processing")
        print("---------------------------------------------------")
        
        // Simple message to process
        let testMessage = "Hello, how do I use the Boolean Language Framework?"
        let sender = "testUser"
        
        print("Processing message: \"\(testMessage)\"")
        
        // Process through the thin wrapper
        let result = try await bridge.processMessage(testMessage, from: sender)
        
        // Verify buffer integrity
        XCTAssertTrue(result.bufferIntact, "Buffer integrity must be maintained")
        
        print("Response: \"\(result.content)\"")
        print("Processing time: \(String(format: "%.4f", result.processingTime))s")
        print("Buffer intact: \(result.bufferIntact ? "Yes ✅" : "No ❌")")
        
        if let issue = result.bufferIssue {
            print("Buffer issue: \(issue)")
        }
    }
    
    /// Test buffer integrity with different message types
    func testBufferIntegrity() async throws {
        print("🏎️ Testing NJSON Swift Wrapper - Buffer Integrity")
        print("-------------------------------------------------")
        
        // Messages to test with varying complexity
        let messages = [
            "Simple question?",
            "Can you tell me about the BLF project?",
            "I need a detailed explanation of the AMF formula and how it relates to the 0.1 buffer.",
            "What is the relationship between AIc + 0.1 = BMqs?"
        ]
        
        // Process each message and verify buffer integrity
        for (index, message) in messages.enumerated() {
            print("\n[\(index+1)/\(messages.count)] Testing: \"\(message)\"")
            
            let result = try await bridge.processMessage(message, from: "integrityTest")
            
            // Verify buffer integrity
            XCTAssertTrue(result.bufferIntact, "Buffer integrity must be maintained for message: \(message)")
            
            print("→ Buffer intact: \(result.bufferIntact ? "Yes ✅" : "No ❌")")
            print("→ Processing time: \(String(format: "%.4f", result.processingTime))s")
        }
    }
    
    /// Test bridge metrics
    func testBridgeMetrics() async throws {
        print("🏎️ Testing NJSON Swift Wrapper - Bridge Metrics")
        print("-----------------------------------------------")
        
        // Process a few messages to generate metrics
        for i in 1...3 {
            _ = try await bridge.processMessage(
                "Test message \(i) for metrics collection",
                from: "metricsTest"
            )
        }
        
        // Get system status
        let status = await bridge.getSystemStatus()
        
        // Verify metrics
        XCTAssertEqual(status.bridgeCallCount, 3, "Bridge call count should match number of processed messages")
        XCTAssertGreaterThan(status.lastCallDuration, 0, "Last call duration should be greater than 0")
        XCTAssertEqual(status.bufferIntegrityViolations, 0, "There should be no buffer integrity violations")
        
        print("Bridge call count: \(status.bridgeCallCount)")
        print("Last call duration: \(String(format: "%.4f", status.lastCallDuration))s")
        print("Buffer integrity violations: \(status.bufferIntegrityViolations)")
        print("Processing cycles: \(status.engineStatus.processingCycles)")
    }
    
    /// Test configuration
    func testConfiguration() async throws {
        print("🏎️ Testing NJSON Swift Wrapper - Configuration")
        print("---------------------------------------------")
        
        // Configure with professional branch
        await bridge.configure(branch: .professional, padding: .minimal)
        print("Configured with professional branch and minimal padding")
        
        // Process a message with this configuration
        let professionalMessage = "Could you please provide a status update on the project?"
        let result = try await bridge.processMessage(professionalMessage, from: "configTest")
        
        print("Professional response: \"\(result.content)\"")
        
        // Now configure with family/friends branch
        await bridge.configure(branch: .familyFriends, padding: .more)
        print("Reconfigured with family/friends branch and more padding")
        
        // Process same message with new configuration
        let casualMessage = "How's the project going?"
        let casualResult = try await bridge.processMessage(casualMessage, from: "configTest")
        
        print("Casual response: \"\(casualResult.content)\"")
        
        // Verify both maintained buffer integrity
        XCTAssertTrue(result.bufferIntact, "Professional configuration should maintain buffer integrity")
        XCTAssertTrue(casualResult.bufferIntact, "Casual configuration should maintain buffer integrity")
    }
    
    // MARK: - Main Test Entry Point
    
    /// Run all tests from command line
    static func main() async {
        print("🧪 Running NJSON Swift Wrapper Tests")
        print("===================================")
        
        if #available(macOS 10.15, iOS 14.0, *) {
            let test = NJSONSwiftWrapperTest()
            
            do {
                try await test.setUp()
                
                try await test.testMessageProcessing()
                try await test.testBufferIntegrity()
                try await test.testBridgeMetrics()
                try await test.testConfiguration()
                
                try await test.tearDown()
                
                print("\n✅ All tests completed successfully")
                print("===================================")
            } catch {
                print("\n❌ Tests failed: \(error.localizedDescription)")
            }
        } else {
            print("⚠️ Tests require macOS 10.15 or iOS 14.0 or later")
        }
    }
}

// Run tests when executed directly
if #available(macOS 10.15, iOS 14.0, *) {
    Task {
        await NJSONSwiftWrapperTest.main()
    }
} 