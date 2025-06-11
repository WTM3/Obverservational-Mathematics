//
// BLFMessagingApp.swift
// Boolean Language Framework Messaging App
//
// CRITICAL: VERY THIN Swift wrapper - iOS native functionality ONLY
// All BLF/AMF/NJSON processing handled by JavaScript engine
//

import SwiftUI

@main
struct BLFMessagingApp: App {
    // THIN WRAPPER: Only iOS app lifecycle, no BLF processing
    @StateObject private var jsEngine = BLFJavaScriptEngine()
    @StateObject private var contactManager = ContactManager()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(jsEngine)
                .environmentObject(contactManager)
                .onAppear {
                    // Initialize JavaScript BLF engine (not Swift processing)
                    jsEngine.initializeBLFEngine()
                }
        }
    }
}

// MARK: - Content View (Thin UI Layer)
struct ContentView: View {
    @EnvironmentObject var jsEngine: BLFJavaScriptEngine
    @EnvironmentObject var contactManager: ContactManager
    @State private var showingContactPicker = false
    
    var body: some View {
        NavigationView {
            VStack {
                // AMF Status Display (data from JavaScript)
                AMFStatusView()
                
                // Conversations List (thin Swift UI only)
                ConversationListView()
                
                Spacer()
                
                // Contact Integration Button
                Button("Add Contact") {
                    showingContactPicker = true
                }
                .sheet(isPresented: $showingContactPicker) {
                    ContactPickerView()
                }
            }
            .navigationTitle("BLF Messaging")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Settings") {
                        // Navigate to settings (thin Swift UI)
                    }
                }
            }
        }
    }
}

// MARK: - AMF Status Display (JavaScript Data Only)
struct AMFStatusView: View {
    @EnvironmentObject var jsEngine: BLFJavaScriptEngine
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Circle()
                    .fill(jsEngine.isAMFActive ? Color.green : Color.red)
                    .frame(width: 8, height: 8)
                
                Text("AMF Status: \(jsEngine.amfStatus)")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Text("Formula: F = ((AICM ∨ AICRM)(GA)(AP)^P^I + BM(qs)^±x)v")
                .font(.system(.caption2, design: .monospaced))
                .foregroundColor(.secondary)
            
            Text("Constraint: AIc + 0.1 = BMqs")
                .font(.system(.caption2, design: .monospaced))
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color.secondary.opacity(0.1))
        .cornerRadius(8)
        .padding(.horizontal)
    }
}

// MARK: - Conversation List (Thin Swift UI)
struct ConversationListView: View {
    @EnvironmentObject var jsEngine: BLFJavaScriptEngine
    
    var body: some View {
        List {
            ForEach(jsEngine.conversations, id: \.id) { conversation in
                NavigationLink(destination: ChatView(conversation: conversation)) {
                    ConversationRowView(conversation: conversation)
                }
            }
        }
    }
}

// MARK: - Conversation Row (Display Only)
struct ConversationRowView: View {
    let conversation: BLFConversation
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(conversation.contactName)
                    .font(.headline)
                
                Spacer()
                
                // Cognitive type badge (data from JavaScript)
                Text(conversation.cognitiveType)
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 2)
                    .background(conversation.cognitiveType == "Boolean Mind" ? Color.green.opacity(0.2) : Color.purple.opacity(0.2))
                    .cornerRadius(4)
            }
            
            Text(conversation.lastMessage)
                .font(.subheadline)
                .foregroundColor(.secondary)
                .lineLimit(2)
        }
        .padding(.vertical, 2)
    }
} 