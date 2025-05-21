import XCTest
@testable import BLFMessageBot

class BLFMessageBotTests: XCTestCase {
    
    var bot: BLFMessageBot!
    
    override func setUp() {
        super.setUp()
        bot = BLFMessageBot()
        bot.initialize()
    }
    
    override func tearDown() {
        bot = nil
        super.tearDown()
    }
    
    // MARK: - Core Functionality Tests
    
    func testInitialization() {
        // Create a new bot instance
        let newBot = BLFMessageBot()
        
        // Test initial state before initialization
        let response = newBot.processMessage("Test message")
        XCTAssertTrue(response.contains("BLF initialized with buffer 0.1"), "Bot should auto-initialize on first message")
    }
    
    func testBasicMessageProcessing() {
        // Test basic message processing
        let response = bot.processMessage("Hello world")
        XCTAssertFalse(response.isEmpty, "Bot should return a non-empty response")
        XCTAssertTrue(response.contains("Hello world"), "Response should include the original message")
    }
    
    func testQuestionProcessing() {
        // Test processing of questions (should trigger quantum jumps)
        let response = bot.processMessage("What is the meaning of life?")
        XCTAssertTrue(response.contains("DIRECT JUMP"), "Questions should trigger quantum jumps")
    }
    
    // MARK: - Buffer Integrity Tests
    
    func testBufferMaintenance() {
        // Process multiple messages to stress the buffer
        for _ in 1...10 {
            _ = bot.processMessage("Test message for buffer stress test")
        }
        
        // Get status to verify buffer integrity
        let status = bot.getStatus()
        
        // Extract AIc and BMqs values from status
        let aicPattern = #"AIc: ([0-9.]+)"#
        let bmqsPattern = #"BMqs: ([0-9.]+)"#
        
        guard let aicRange = status.range(of: aicPattern, options: .regularExpression),
              let bmqsRange = status.range(of: bmqsPattern, options: .regularExpression) else {
            XCTFail("Could not extract AIc and BMqs values from status")
            return
        }
        
        let aicMatch = String(status[aicRange])
        let bmqsMatch = String(status[bmqsRange])
        
        let aicValue = Double(aicMatch.replacingOccurrences(of: "AIc: ", with: "")) ?? 0
        let bmqsValue = Double(bmqsMatch.replacingOccurrences(of: "BMqs: ", with: "")) ?? 0
        
        // Verify that AIc + 0.1 = BMqs (within tolerance)
        let tolerance = 0.00001
        let difference = abs((aicValue + 0.1) - bmqsValue)
        XCTAssertLessThanOrEqual(difference, tolerance, "Buffer integrity should be maintained (AIc + 0.1 = BMqs)")
    }
    
    func testBufferViolationRecovery() {
        // This test would require access to internal properties to force a buffer violation
        // In a real implementation, we would use dependency injection to create a testable buffer violation
        
        // Simulate by processing many messages to see if any violations occur and are repaired
        for i in 1...100 {
            let response = bot.processMessage("Stress test message \(i)")
            XCTAssertFalse(response.contains("Buffer violation"), "Bot should maintain buffer integrity")
        }
    }
    
    // MARK: - Quantum State Tests
    
    func testQuantumBreathingEffect() {
        // Send initial message to get a baseline
        let response1 = bot.processMessage("Test message 1")
        
        // Send another message which should trigger quantum breathing
        let response2 = bot.processMessage("Test message 2")
        
        // Responses should be different due to quantum state changes
        XCTAssertNotEqual(response1, response2, "Quantum breathing should cause different response patterns")
    }
    
    func testQuantumJumpsForQuestions() {
        // Test that quantum jumps activate for questions
        let questionResponses = [
            bot.processMessage("What is your name?"),
            bot.processMessage("How does this work?"),
            bot.processMessage("Why is the sky blue?")
        ]
        
        // Each question should trigger a quantum jump
        for response in questionResponses {
            XCTAssertTrue(response.contains("DIRECT JUMP"), "Questions should trigger quantum jumps")
        }
        
        // Non-questions should not trigger jumps
        let normalResponse = bot.processMessage("This is just a statement.")
        XCTAssertFalse(normalResponse.contains("DIRECT JUMP"), "Statements should not trigger quantum jumps")
    }
    
    // MARK: - Heat Shield Tests
    
    func testHeatShieldStatusReporting() {
        // Get status report to check heat shield
        let status = bot.getStatus()
        
        // Verify heat shield is active
        XCTAssertTrue(status.contains("Heat Shield Status"), "Status should include heat shield information")
        XCTAssertTrue(status.contains("Active: Yes"), "Heat shield should be active")
    }
    
    // MARK: - Stress Tests
    
    func testHighVolumeMessageProcessing() {
        // Test processing a large number of messages to ensure stability
        for i in 1...200 {
            let message = "Stress test message \(i)"
            let response = bot.processMessage(message)
            XCTAssertFalse(response.isEmpty, "Bot should continue to respond under load")
        }
    }
    
    func testLongMessages() {
        // Test processing very long messages
        let longMessage = String(repeating: "This is a test of a very long message. ", count: 50)
        let response = bot.processMessage(longMessage)
        XCTAssertFalse(response.isEmpty, "Bot should handle long messages")
    }
    
    func testRandomizedInput() {
        // Test with randomized input to simulate real user behavior
        let messageComponents = [
            "Hello", "How are you", "What is", "Why does", "I need help with",
            "quantum", "buffer", "system", "bot", "iMessage",
            "?", "!", ".", ""
        ]
        
        for _ in 1...50 {
            // Generate random message by combining 2-5 components
            var message = ""
            let componentCount = Int.random(in: 2...5)
            
            for _ in 1...componentCount {
                if let component = messageComponents.randomElement() {
                    message += component + " "
                }
            }
            
            message = message.trimmingCharacters(in: .whitespacesAndNewlines)
            
            // Process the random message
            let response = bot.processMessage(message)
            XCTAssertFalse(response.isEmpty, "Bot should handle random input patterns")
        }
    }
} 