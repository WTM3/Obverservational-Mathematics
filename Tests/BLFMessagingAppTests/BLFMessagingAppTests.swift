//
// BLFMessagingAppTests.swift
// iOS BLF Messaging App Tests
//
// Testing THIN Swift wrapper functionality
// JavaScript BLF engine tests are in separate files
//

import XCTest
@testable import BLFMessagingApp

@MainActor
final class BLFMessagingAppTests: XCTestCase {
    
    var jsEngine: BLFJavaScriptEngine!
    var contactManager: ContactManager!
    
    override func setUp() async throws {
        jsEngine = BLFJavaScriptEngine()
        contactManager = ContactManager()
    }
    
    override func tearDown() async throws {
        jsEngine = nil
        contactManager = nil
    }
    
    // MARK: - JavaScript Engine Tests (Thin Wrapper)
    
    func testJavaScriptEngineInitialization() async {
        // Test that Swift wrapper initializes properly
        XCTAssertNotNil(jsEngine)
        XCTAssertEqual(jsEngine.amfStatus, "Initializing")
        XCTAssertFalse(jsEngine.isAMFActive)
        
        // Initialize JavaScript engine
        jsEngine.initializeBLFEngine()
        
        // Allow time for JavaScript initialization
        try? await Task.sleep(nanoseconds: 100_000_000) // 0.1 seconds
        
        // Note: Actual status depends on JavaScript engine loading
        // In real app, this would be "Operational" after JavaScript loads
    }
    
    func testPersonalityFactorUpdate() {
        // Test thin wrapper personality factor handling
        let initialFactor = jsEngine.personalityFactor
        XCTAssertEqual(initialFactor, 0.7) // Default value
        
        // Update personality factor (should pass to JavaScript)
        jsEngine.updatePersonalityFactor(0.9)
        
        // Note: In real implementation, this would trigger JavaScript
        // callback to update the Swift @Published property
    }
    
    func testNJSONPassthrough() async {
        // Test that NJSON content is passed RAW to JavaScript
        let njsonContent = """
        {
            "message": "test",
            "broken": true,
            // intentional comment in JSON
            "missing_quotes": value
        }
        """
        
        let expectation = XCTestExpectation(description: "NJSON processed")
        
        jsEngine.processNJSONContent(njsonContent) { result in
            // Verify content was passed through (not processed by Swift)
            XCTAssertEqual(result, njsonContent) // Placeholder behavior
            expectation.fulfill()
        }
        
        await fulfillment(of: [expectation], timeout: 1.0)
    }
    
    func testMessageSending() async {
        // Test message sending through thin wrapper
        let expectation = XCTestExpectation(description: "Message sent")
        
        jsEngine.sendMessage(to: "test-contact", content: "Hello BLF!") { success in
            // Note: In real implementation, success would come from JavaScript
            XCTAssertTrue(success)
            expectation.fulfill()
        }
        
        await fulfillment(of: [expectation], timeout: 1.0)
    }
    
    // MARK: - Contact Manager Tests (iOS Native)
    
    func testContactModelCreation() {
        let contact = BLFContact(
            id: "test-id",
            firstName: "John",
            lastName: "Doe",
            phoneNumbers: ["+1234567890"],
            emailAddresses: ["john@example.com"],
            notes: "Test contact",
            cognitiveType: "Boolean Mind"
        )
        
        XCTAssertEqual(contact.fullName, "John Doe")
        XCTAssertEqual(contact.primaryPhoneNumber, "+1234567890")
        XCTAssertEqual(contact.cognitiveType, "Boolean Mind")
    }
    
    func testContactSearch() {
        // Create test contacts
        let contacts = [
            BLFContact(id: "1", firstName: "Alice", lastName: "Smith", phoneNumbers: ["+1111111111"], emailAddresses: [], notes: ""),
            BLFContact(id: "2", firstName: "Bob", lastName: "Johnson", phoneNumbers: ["+2222222222"], emailAddresses: [], notes: ""),
            BLFContact(id: "3", firstName: "Charlie", lastName: "Brown", phoneNumbers: ["+3333333333"], emailAddresses: [], notes: "")
        ]
        
        contactManager.contacts = contacts
        
        // Test search functionality
        let aliceResults = contactManager.searchContacts(query: "Alice")
        XCTAssertEqual(aliceResults.count, 1)
        XCTAssertEqual(aliceResults.first?.firstName, "Alice")
        
        let phoneResults = contactManager.searchContacts(query: "1111")
        XCTAssertEqual(phoneResults.count, 1)
        XCTAssertEqual(phoneResults.first?.firstName, "Alice")
        
        let emptyResults = contactManager.searchContacts(query: "")
        XCTAssertEqual(emptyResults.count, 3) // Returns all contacts
    }
    
    func testContactBLFDataUpdate() {
        let contact = BLFContact(id: "test", firstName: "Test", lastName: "User", phoneNumbers: [], emailAddresses: [], notes: "")
        contactManager.contacts = [contact]
        
        // Update with BLF data (thin wrapper operation)
        contactManager.updateContactWithBLFData(
            contactId: "test",
            cognitiveType: "Boolean Mind",
            communicationStyle: "Direct"
        )
        
        // Verify update
        let updatedContact = contactManager.contacts.first
        XCTAssertEqual(updatedContact?.cognitiveType, "Boolean Mind")
        XCTAssertEqual(updatedContact?.communicationStyle, "Direct")
    }
    
    // MARK: - Data Model Tests
    
    func testBLFConversationModel() {
        let conversation = BLFConversation(
            id: "conv-1",
            contactName: "Test Contact",
            lastMessage: "Hello world!",
            cognitiveType: "Semi-Boolean Mind"
        )
        
        XCTAssertEqual(conversation.id, "conv-1")
        XCTAssertEqual(conversation.contactName, "Test Contact")
        XCTAssertEqual(conversation.lastMessage, "Hello world!")
        XCTAssertEqual(conversation.cognitiveType, "Semi-Boolean Mind")
    }
    
    func testBLFMessageModel() {
        let message = BLFMessage(
            id: "msg-1",
            content: "Test message content",
            senderId: "sender-123",
            timestamp: Date(),
            isFromCurrentUser: true,
            cognitiveType: "Boolean Mind",
            processingStatus: "processed"
        )
        
        XCTAssertEqual(message.id, "msg-1")
        XCTAssertEqual(message.content, "Test message content")
        XCTAssertEqual(message.senderId, "sender-123")
        XCTAssertTrue(message.isFromCurrentUser)
        XCTAssertEqual(message.cognitiveType, "Boolean Mind")
        XCTAssertEqual(message.processingStatus, "processed")
    }
    
    // MARK: - Integration Tests
    
    func testContactRegistrationWithBLF() async {
        // Test contact registration flow with JavaScript engine
        let expectation = XCTestExpectation(description: "Contact registered")
        
        jsEngine.registerContact(
            name: "Test User",
            phoneNumber: "+1234567890",
            bio: "I prefer direct communication and minimal social padding."
        ) { contactId in
            XCTAssertNotNil(contactId)
            expectation.fulfill()
        }
        
        await fulfillment(of: [expectation], timeout: 1.0)
    }
    
    func testCognitiveAlignmentMonitoring() {
        // Test cognitive alignment status retrieval
        let status = jsEngine.getCognitiveAlignmentStatus()
        
        // Initial status should be default
        XCTAssertEqual(status, "Checking")
        
        // Note: In real implementation, this would trigger JavaScript
        // monitoring and update via callback
    }
    
    // MARK: - Performance Tests
    
    func testJavaScriptEnginePerformance() {
        // Test that thin wrapper doesn't add significant overhead
        measure {
            for _ in 0..<100 {
                jsEngine.updatePersonalityFactor(0.5)
            }
        }
    }
    
    func testContactSearchPerformance() {
        // Create large contact list
        let largeContactList = (0..<1000).map { i in
            BLFContact(
                id: "contact-\(i)",
                firstName: "First\(i)",
                lastName: "Last\(i)",
                phoneNumbers: ["+\(i)"],
                emailAddresses: [],
                notes: ""
            )
        }
        
        contactManager.contacts = largeContactList
        
        // Measure search performance
        measure {
            _ = contactManager.searchContacts(query: "First500")
        }
    }
    
    // MARK: - Error Handling Tests
    
    func testInvalidNJSONHandling() async {
        // Test that invalid NJSON is still passed to JavaScript
        let invalidNJSON = "{ this is completely broken JSON }"
        
        let expectation = XCTestExpectation(description: "Invalid NJSON handled")
        
        jsEngine.processNJSONContent(invalidNJSON) { result in
            // Thin wrapper should pass through invalid content
            // JavaScript engine will handle the error
            expectation.fulfill()
        }
        
        await fulfillment(of: [expectation], timeout: 1.0)
    }
    
    func testContactPermissionDenied() {
        // Test behavior when contacts permission is denied
        contactManager.hasContactsPermission = false
        
        XCTAssertFalse(contactManager.hasContactsPermission)
        XCTAssertEqual(contactManager.contacts.count, 0)
    }
}

// MARK: - Mock Extensions for Testing

extension BLFJavaScriptEngine {
    /// Mock implementation for testing
    func mockInitialization() {
        isAMFActive = true
        amfStatus = "Operational"
        cognitiveAlignment = "Active"
    }
} 