//
// ChatView.swift
// BLF Messaging Chat Interface
//
// CRITICAL: THIN Swift wrapper - UI only
// All message processing, NJSON handling, AMF calculations in JavaScript
//

import SwiftUI

struct ChatView: View {
    let conversation: BLFConversation
    @EnvironmentObject var jsEngine: BLFJavaScriptEngine
    
    @State private var messageText = ""
    @State private var messages: [BLFMessage] = []
    @State private var isTyping = false
    @State private var showingPersonalitySlider = false
    
    var body: some View {
        VStack(spacing: 0) {
            // AMF Real-time Status Bar
            AMFStatusBar()
            
            // Messages List
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack(spacing: 8) {
                        ForEach(messages) { message in
                            MessageRowView(message: message)
                        }
                    }
                    .padding()
                }
                .onChange(of: messages.count) { _ in
                    if let lastMessage = messages.last {
                        withAnimation {
                            proxy.scrollTo(lastMessage.id, anchor: .bottom)
                        }
                    }
                }
            }
            
            // Message Input (Thin Swift UI only)
            MessageInputView()
        }
        .navigationTitle(conversation.contactName)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                personalityButton
            }
        }
        .onAppear {
            loadMessages()
        }
    }
    
    private var personalityButton: some View {
        Button("P: \(String(format: "%.1f", jsEngine.personalityFactor))") {
            showingPersonalitySlider = true
        }
        .sheet(isPresented: $showingPersonalitySlider) {
            PersonalityAdjustmentView()
        }
    }
    
    private func loadMessages() {
        // Load messages from JavaScript BLF engine (thin wrapper call)
        // Messages would be populated from JavaScript callbacks
        // For now, add sample messages to demonstrate
        messages = [
            BLFMessage(
                id: "1",
                content: "Hey, how's it going?",
                senderId: "other",
                timestamp: Date().addingTimeInterval(-3600),
                isFromCurrentUser: false,
                cognitiveType: "Boolean Mind",
                processingStatus: "processed"
            ),
            BLFMessage(
                id: "2",
                content: "Good! Working on some BLF stuff.",
                senderId: "current",
                timestamp: Date().addingTimeInterval(-1800),
                isFromCurrentUser: true,
                cognitiveType: "Boolean Mind",
                processingStatus: "processed"
            )
        ]
    }
}

// MARK: - AMF Status Bar (JavaScript Data Display)
struct AMFStatusBar: View {
    @EnvironmentObject var jsEngine: BLFJavaScriptEngine
    
    var body: some View {
        HStack {
            // Real-time AMF monitoring
            HStack(spacing: 4) {
                Circle()
                    .fill(jsEngine.isAMFActive ? Color.green : Color.red)
                    .frame(width: 6, height: 6)
                Text("AMF")
                    .font(.caption2)
                    .fontWeight(.semibold)
            }
            
            Spacer()
            
            // Cognitive alignment status
            Text("AIc + 0.1 = BMqs: \(jsEngine.cognitiveAlignment)")
                .font(.caption2)
                .foregroundColor(.secondary)
            
            Spacer()
            
            // Personality factor
            Text("P: \(String(format: "%.1f", jsEngine.personalityFactor))")
                .font(.caption2)
                .fontWeight(.medium)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 6)
        .background(Color.secondary.opacity(0.1))
    }
}

// MARK: - Message Row View (Display Only)
struct MessageRowView: View {
    let message: BLFMessage
    
    var body: some View {
        HStack {
            if message.isFromCurrentUser {
                Spacer()
            }
            
            VStack(alignment: message.isFromCurrentUser ? .trailing : .leading, spacing: 4) {
                // Message content (passed through from JavaScript)
                Text(message.content)
                    .padding(12)
                    .background(
                        message.isFromCurrentUser ? Color.blue : Color.secondary.opacity(0.2)
                    )
                    .foregroundColor(
                        message.isFromCurrentUser ? .white : .primary
                    )
                    .cornerRadius(16)
                
                // BLF processing status
                HStack(spacing: 4) {
                    Text(message.cognitiveType)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    
                    Circle()
                        .fill(processingStatusColor)
                        .frame(width: 4, height: 4)
                    
                    Text(message.timestamp, style: .time)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
            
            if !message.isFromCurrentUser {
                Spacer()
            }
        }
    }
    
    private var processingStatusColor: Color {
        switch message.processingStatus {
        case "processed": return .green
        case "processing": return .orange
        case "error": return .red
        default: return .gray
        }
    }
}

// MARK: - Message Input View (Thin Swift UI)
struct MessageInputView: View {
    @EnvironmentObject var jsEngine: BLFJavaScriptEngine
    @State private var messageText = ""
    @State private var isSending = false
    
    var body: some View {
        HStack(spacing: 12) {
            // Message text field
            TextField("Message (NJSON supported)", text: $messageText, axis: .vertical)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .lineLimit(1...4)
            
            // Send button
            Button(action: sendMessage) {
                Image(systemName: "arrow.up.circle.fill")
                    .font(.title2)
                    .foregroundColor(messageText.isEmpty ? .gray : .blue)
            }
            .disabled(messageText.isEmpty || isSending)
        }
        .padding()
        .background(Color.secondary.opacity(0.05))
    }
    
    private func sendMessage() {
        guard !messageText.isEmpty else { return }
        
        let content = messageText
        messageText = ""
        isSending = true
        
        // CRITICAL: Pass raw message to JavaScript BLF engine
        // NO Swift processing of NJSON or message content
        jsEngine.sendMessage(to: "contact-id", content: content) { success in
            isSending = false
            if success {
                // Message sent via JavaScript BLF engine
                // UI will be updated via JavaScript callbacks
            }
        }
    }
}

// MARK: - Personality Adjustment View (Thin Swift UI)
struct PersonalityAdjustmentView: View {
    @Environment(\.dismiss) var dismiss
    @EnvironmentObject var jsEngine: BLFJavaScriptEngine
    @State private var personalityFactor: Double = 0.7
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("AMF Personality Factor (P)")
                    .font(.headline)
                
                Text("Current: \(String(format: "%.2f", personalityFactor))")
                    .font(.title)
                    .fontWeight(.bold)
                
                // Personality slider
                VStack(alignment: .leading) {
                    HStack {
                        Text("0.1")
                            .font(.caption)
                        Spacer()
                        Text("1.0")
                            .font(.caption)
                    }
                    
                    Slider(value: $personalityFactor, in: 0.1...1.0, step: 0.1)
                        .onChange(of: personalityFactor) { newValue in
                            // Pass personality change to JavaScript AMF engine
                            jsEngine.updatePersonalityFactor(newValue)
                        }
                }
                
                // AMF Formula display
                VStack(alignment: .leading, spacing: 8) {
                    Text("AMF Formula Impact:")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                    
                    Text("F = ((AICM ∨ AICRM)(GA)(AP)^P^I + BM(qs)^±x)v")
                        .font(.system(.caption, design: .monospaced))
                        .foregroundColor(.secondary)
                    
                    Text("P controls adaptive precision in Boolean Mind processing")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                .padding()
                .background(Color.secondary.opacity(0.1))
                .cornerRadius(8)
                
                Spacer()
            }
            .padding()
            .navigationTitle("AMF Settings")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
        .onAppear {
            personalityFactor = jsEngine.personalityFactor
        }
    }
}

// MARK: - BLF Message Model (Thin Wrapper)
struct BLFMessage: Identifiable {
    let id: String
    let content: String
    let senderId: String
    let timestamp: Date
    let isFromCurrentUser: Bool
    let cognitiveType: String
    let processingStatus: String // processed, processing, error
    
    init(id: String = UUID().uuidString, content: String, senderId: String, timestamp: Date = Date(), isFromCurrentUser: Bool, cognitiveType: String, processingStatus: String = "processed") {
        self.id = id
        self.content = content
        self.senderId = senderId
        self.timestamp = timestamp
        self.isFromCurrentUser = isFromCurrentUser
        self.cognitiveType = cognitiveType
        self.processingStatus = processingStatus
    }
} 