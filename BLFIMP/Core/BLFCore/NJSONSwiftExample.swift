import Foundation
import SwiftUI

// MARK: - NJSON Swift Integration Example

/// Example showing how to use the thin Swift wrapper for NJSON
/// Demonstrates the minimal Swift code needed while leveraging the V-8 engine
@available(macOS 10.15, iOS 14.0, *)
struct NJSONSwiftExample {
    // MARK: - Implementation
    
    /// Run a complete example of NJSON integration
    static func runExample() async {
        do {
            print("🏎️ Starting NJSON Swift Integration Example")
            print("-------------------------------------------")
            
            // Create bridge with minimal overhead
            let bridge = NJSONSwiftBridge()
            
            // 1. Process a simple message
            print("\n1. Processing a simple message:")
            let messageResult = try await bridge.processMessage(
                "Hello, how are you today?",
                from: "exampleUser"
            )
            
            print("→ Response: \"\(messageResult.content)\"")
            print("→ Processing time: \(String(format: "%.4f", messageResult.processingTime))s")
            print("→ Buffer intact: \(messageResult.bufferIntact ? "Yes" : "No")")
            
            // 2. Configure the engine
            print("\n2. Configuring NJSON engine:")
            await bridge.configure(branch: .professional, padding: .minimal)
            print("→ Engine configured with professional branch and minimal padding")
            
            // 3. Process a message with the new configuration
            print("\n3. Processing with new configuration:")
            let professionalResult = try await bridge.processMessage(
                "Could you please provide information on the latest project status?",
                from: "businessUser"
            )
            
            print("→ Response: \"\(professionalResult.content)\"")
            print("→ Processing time: \(String(format: "%.4f", professionalResult.processingTime))s")
            
            // 4. Get system status
            print("\n4. Retrieving system status:")
            let status = await bridge.getSystemStatus()
            
            print("→ Bridge call count: \(status.bridgeCallCount)")
            print("→ Last call duration: \(String(format: "%.4f", status.lastCallDuration))s")
            print("→ Buffer integrity violations: \(status.bufferIntegrityViolations)")
            print("→ Processing cycles: \(status.engineStatus.processingCycles)")
            
            // 5. Demonstrate error handling
            print("\n5. Error handling demonstration:")
            do {
                // Force an error for demonstration
                _ = try await bridge.processMessage(
                    "", // Empty message to trigger error
                    from: "errorUser"
                )
            } catch let error as NJSONBridgeError {
                switch error {
                case .bufferIntegrityViolation(let reason):
                    print("→ Buffer integrity violation: \(reason)")
                case .processingFailure(let underlying):
                    print("→ Processing failure: \(underlying.localizedDescription)")
                case .timeout(let duration):
                    print("→ Timeout after \(duration)s")
                }
            } catch {
                print("→ Unexpected error: \(error.localizedDescription)")
            }
            
            print("\n✅ NJSON Swift Integration Example Completed")
            print("--------------------------------------------")
        } catch {
            print("❌ Example failed: \(error.localizedDescription)")
        }
    }
}

// MARK: - SwiftUI Integration Example

/// Example view showing how to integrate with SwiftUI
@available(macOS 10.15, iOS 14.0, *)
struct NJSONSwiftUIExample: View {
    // MARK: - Properties
    
    @State private var messageText = ""
    @State private var responses: [ChatMessage] = []
    @State private var isProcessing = false
    
    // The bridge - minimal Swift code
    private let bridge = NJSONSwiftBridge()
    
    // MARK: - UI
    
    var body: some View {
        VStack {
            // Chat display
            ScrollView {
                LazyVStack(alignment: .leading, spacing: 10) {
                    ForEach(responses) { message in
                        ChatBubble(message: message)
                    }
                }
                .padding()
            }
            
            // Input area
            HStack {
                TextField("Type a message...", text: $messageText)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .disabled(isProcessing)
                
                Button(action: sendMessage) {
                    Image(systemName: "arrow.up.circle.fill")
                        .resizable()
                        .frame(width: 30, height: 30)
                        .foregroundColor(.blue)
                }
                .disabled(messageText.isEmpty || isProcessing)
            }
            .padding()
        }
        .navigationTitle("BLF iMessage")
    }
    
    // MARK: - Methods
    
    private func sendMessage() {
        // Add user message
        let userMessage = ChatMessage(id: UUID().uuidString, content: messageText, isUser: true)
        responses.append(userMessage)
        
        // Clear input and set processing state
        let messageToProcess = messageText
        messageText = ""
        isProcessing = true
        
        // Minimal Swift code to process message through NJSON
        Task {
            do {
                // Process with the thin wrapper
                let result = try await bridge.processMessage(
                    messageToProcess,
                    from: "user"
                )
                
                // Update UI with response
                let responseMessage = ChatMessage(
                    id: UUID().uuidString,
                    content: result.content,
                    isUser: false
                )
                
                // Update UI on main thread
                await MainActor.run {
                    responses.append(responseMessage)
                    isProcessing = false
                }
            } catch {
                // Handle error
                let errorMessage = ChatMessage(
                    id: UUID().uuidString,
                    content: "Error: \(error.localizedDescription)",
                    isUser: false,
                    isError: true
                )
                
                await MainActor.run {
                    responses.append(errorMessage)
                    isProcessing = false
                }
            }
        }
    }
}

// MARK: - Supporting Types

/// Chat message model
struct ChatMessage: Identifiable {
    let id: String
    let content: String
    let isUser: Bool
    let isError: Bool
    let timestamp: Date
    
    init(id: String, content: String, isUser: Bool, isError: Bool = false, timestamp: Date = Date()) {
        self.id = id
        self.content = content
        self.isUser = isUser
        self.isError = isError
        self.timestamp = timestamp
    }
}

/// Chat bubble view
@available(macOS 10.15, iOS 14.0, *)
struct ChatBubble: View {
    let message: ChatMessage
    
    var body: some View {
        HStack {
            if message.isUser {
                Spacer()
            }
            
            Text(message.content)
                .padding(10)
                .background(
                    message.isError ? Color.red.opacity(0.2) :
                        message.isUser ? Color.blue.opacity(0.2) : Color.gray.opacity(0.2)
                )
                .foregroundColor(message.isError ? .red : .primary)
                .cornerRadius(10)
            
            if !message.isUser {
                Spacer()
            }
        }
    }
} 