import Foundation
import Messages

class MessagesExtension: NSObject, MSMessagesAppViewControllerDelegate {
    // MARK: - Properties
    private let messageBot = BLFMessageBot()
    private var isActive = false
    
    // MARK: - MSMessagesAppViewControllerDelegate
    
    func willBecomeActive(with conversation: MSConversation) {
        Logger.info("Messages extension becoming active")
        
        // Initialize the bot when the extension becomes active
        messageBot.initialize()
        isActive = true
        
        // If there's a selected message, process it
        if let selectedMessage = conversation.selectedMessage,
           let messageText = selectedMessage.url?.absoluteString.removingPercentEncoding {
            handleIncomingMessage(messageText, in: conversation)
        }
    }
    
    func willResignActive(with conversation: MSConversation) {
        Logger.info("Messages extension resigning active")
        isActive = false
    }
    
    func didReceive(_ message: MSMessage, conversation: MSConversation) {
        Logger.info("Message received in conversation")
        
        // Only process messages when the extension is active
        guard isActive, 
              let messageURL = message.url,
              let messageText = messageURL.absoluteString.removingPercentEncoding else {
            return
        }
        
        handleIncomingMessage(messageText, in: conversation)
    }
    
    // MARK: - Message Handling
    
    /// Handle an incoming message from iMessage
    /// - Parameters:
    ///   - messageText: The text of the message
    ///   - conversation: The conversation the message is part of
    private func handleIncomingMessage(_ messageText: String, in conversation: MSConversation) {
        // Process the message through the BLF system
        let response = messageBot.processMessage(messageText)
        
        // Send the response back to the conversation
        sendResponse(response, to: conversation)
    }
    
    /// Send a response message to the conversation
    /// - Parameters:
    ///   - response: The response text to send
    ///   - conversation: The conversation to send the response to
    private func sendResponse(_ response: String, to conversation: MSConversation) {
        // Create a new message with the response
        let message = composeMessage(with: response, in: conversation)
        
        // Insert the message into the conversation
        conversation.insert(message) { error in
            if let error = error {
                Logger.error("Failed to insert message: \(error.localizedDescription)")
            } else {
                Logger.info("Response message inserted successfully")
            }
        }
    }
    
    /// Compose a new message with the given text
    /// - Parameters:
    ///   - text: The text for the message
    ///   - conversation: The conversation the message is for
    /// - Returns: A composed MSMessage
    private func composeMessage(with text: String, in conversation: MSConversation) -> MSMessage {
        // Create a new message
        let message = MSMessage(session: conversation.selectedMessage?.session ?? MSSession())
        
        // Create a message layout
        let layout = MSMessageTemplateLayout()
        layout.caption = "BLF Bot"
        layout.subcaption = text
        
        // Set the layout on the message
        message.layout = layout
        
        // Encode the message text in the URL
        if let encodedText = text.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed),
           let url = URL(string: "blf-message://\(encodedText)") {
            message.url = url
        }
        
        return message
    }
}

// MARK: - URL Helper Extension

extension String {
    /// Remove URL percent encoding
    var removingPercentEncoding: String? {
        return self.removingPercentEncoding
    }
} 