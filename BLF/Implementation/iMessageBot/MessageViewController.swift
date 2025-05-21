import UIKit
import Messages

class MessageViewController: MSMessagesAppViewController {
    // MARK: - Properties
    private let messageExtension = MessagesExtension()
    private let messageBot = BLFMessageBot()
    
    // UI Elements
    private let statusLabel = UILabel()
    private let inputTextField = UITextField()
    private let sendButton = UIButton(type: .system)
    private let statusButton = UIButton(type: .system)
    
    // MARK: - Lifecycle Methods
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        messageBot.initialize()
    }
    
    override func willBecomeActive(with conversation: MSConversation) {
        super.willBecomeActive(with: conversation)
        messageExtension.willBecomeActive(with: conversation)
        updateStatusLabel("BLF Bot Active")
    }
    
    override func didResignActive(with conversation: MSConversation) {
        super.didResignActive(with: conversation)
        messageExtension.willResignActive(with: conversation)
        updateStatusLabel("BLF Bot Inactive")
    }
    
    override func didReceive(_ message: MSMessage, conversation: MSConversation) {
        super.didReceive(message, conversation)
        messageExtension.didReceive(message, conversation)
    }
    
    // MARK: - UI Setup
    
    private func setupUI() {
        // Configure view
        view.backgroundColor = UIColor(white: 0.95, alpha: 1.0)
        
        // Configure status label
        statusLabel.translatesAutoresizingMaskIntoConstraints = false
        statusLabel.text = "BLF Bot Ready"
        statusLabel.textAlignment = .center
        statusLabel.font = UIFont.systemFont(ofSize: 16, weight: .medium)
        statusLabel.textColor = .darkGray
        view.addSubview(statusLabel)
        
        // Configure input text field
        inputTextField.translatesAutoresizingMaskIntoConstraints = false
        inputTextField.placeholder = "Type a message..."
        inputTextField.borderStyle = .roundedRect
        inputTextField.returnKeyType = .send
        inputTextField.delegate = self
        view.addSubview(inputTextField)
        
        // Configure send button
        sendButton.translatesAutoresizingMaskIntoConstraints = false
        sendButton.setTitle("Send", for: .normal)
        sendButton.titleLabel?.font = UIFont.systemFont(ofSize: 16, weight: .semibold)
        sendButton.addTarget(self, action: #selector(sendButtonTapped), for: .touchUpInside)
        view.addSubview(sendButton)
        
        // Configure status button
        statusButton.translatesAutoresizingMaskIntoConstraints = false
        statusButton.setTitle("Status", for: .normal)
        statusButton.titleLabel?.font = UIFont.systemFont(ofSize: 14)
        statusButton.addTarget(self, action: #selector(statusButtonTapped), for: .touchUpInside)
        view.addSubview(statusButton)
        
        // Setup constraints
        NSLayoutConstraint.activate([
            // Status label constraints
            statusLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 16),
            statusLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            statusLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            
            // Status button constraints
            statusButton.topAnchor.constraint(equalTo: statusLabel.bottomAnchor, constant: 8),
            statusButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            // Input text field constraints
            inputTextField.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            inputTextField.trailingAnchor.constraint(equalTo: sendButton.leadingAnchor, constant: -8),
            inputTextField.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -16),
            
            // Send button constraints
            sendButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            sendButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -16),
            sendButton.widthAnchor.constraint(equalToConstant: 70)
        ])
    }
    
    // MARK: - Actions
    
    @objc private func sendButtonTapped() {
        guard let text = inputTextField.text, !text.isEmpty else {
            return
        }
        
        sendMessage(text)
        inputTextField.text = ""
    }
    
    @objc private func statusButtonTapped() {
        // Show the current status of the bot
        let status = messageBot.getStatus()
        showStatusAlert(status)
    }
    
    // MARK: - Helper Methods
    
    /// Update the status label with a new message
    /// - Parameter message: The message to display
    private func updateStatusLabel(_ message: String) {
        statusLabel.text = message
    }
    
    /// Send a message through the bot
    /// - Parameter text: The message text to send
    private func sendMessage(_ text: String) {
        // Process the message through the bot
        let response = messageBot.processMessage(text)
        
        // Check if we have an active conversation
        guard let conversation = activeConversation else {
            updateStatusLabel("No active conversation")
            return
        }
        
        // Create a message layout
        let layout = MSMessageTemplateLayout()
        layout.caption = "BLF Bot"
        layout.subcaption = response
        
        // Create a message
        let message = MSMessage()
        message.layout = layout
        
        // Insert the message into the conversation
        conversation.insert(message) { error in
            if let error = error {
                self.updateStatusLabel("Error: \(error.localizedDescription)")
            } else {
                self.updateStatusLabel("Message sent")
            }
        }
    }
    
    /// Show an alert with the current status
    /// - Parameter status: The status text to display
    private func showStatusAlert(_ status: String) {
        let alert = UIAlertController(title: "BLF Bot Status", message: status, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        present(alert, animated: true, completion: nil)
    }
}

// MARK: - UITextFieldDelegate

extension MessageViewController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        sendButtonTapped()
        return true
    }
} 