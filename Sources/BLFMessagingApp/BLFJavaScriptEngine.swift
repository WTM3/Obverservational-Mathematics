//
// BLFJavaScriptEngine.swift
// CRITICAL: VERY THIN wrapper around JavaScript BLF engine
//
// This class ONLY:
// - Loads JavaScript BLF engine
// - Passes data to/from JavaScript (NO Swift processing)
// - Manages JavaScript Core context
// - NEVER processes NJSON or AMF data in Swift
//

import Foundation
import JavaScriptCore
import Combine

@MainActor
class BLFJavaScriptEngine: ObservableObject {
    // THIN WRAPPER: Only state management, no BLF logic
    @Published var isAMFActive: Bool = false
    @Published var amfStatus: String = "Initializing"
    @Published var conversations: [BLFConversation] = []
    @Published var cognitiveAlignment: String = "Checking"
    @Published var personalityFactor: Double = 0.7
    
    private var jsContext: JSContext?
    private var blfEngine: JSValue?
    
    // MARK: - JavaScript Engine Initialization (Thin Wrapper Only)
    func initializeBLFEngine() {
        setupJavaScriptContext()
        loadBLFJavaScriptCode()
        initializeBLFPlatform()
    }
    
    private func setupJavaScriptContext() {
        jsContext = JSContext()
        
        // Add console.log for debugging (thin wrapper utility only)
        jsContext?.setObject(unsafeBitCast({ (message: String) -> Void in
            print("[BLF JS]: \(message)")
        } as @convention(block) (String) -> Void, to: AnyObject.self), forKeyedSubscript: "consoleLog" as NSString)
        
        jsContext?.evaluateScript("var console = { log: consoleLog };")
        
        // Add Swift callback bridge (thin wrapper only)
        let swiftCallback: @convention(block) (String, JSValue) -> Void = { [weak self] (event, data) in
            DispatchQueue.main.async {
                self?.handleJavaScriptCallback(event: event, data: data)
            }
        }
        jsContext?.setObject(swiftCallback, forKeyedSubscript: "swiftCallback" as NSString)
    }
    
    private func loadBLFJavaScriptCode() {
        // Load the complete BLF messaging platform JavaScript code
        guard let jsPath = Bundle.main.path(forResource: "blf-messaging-platform", ofType: "js"),
              let jsCode = try? String(contentsOfFile: jsPath) else {
            print("Error: Could not load BLF JavaScript engine")
            return
        }
        
        // Execute BLF JavaScript code (NO Swift modification)
        jsContext?.evaluateScript(jsCode)
        
        // Add iOS-specific bridge functions (thin wrapper only)
        let iOSBridgeCode = """
        // iOS Bridge - THIN wrapper functions only
        function notifySwift(event, data) {
            swiftCallback(event, data || {});
        }
        
        // Override platform events to notify Swift UI
        const originalEmit = global.blfPlatform ? global.blfPlatform.emit : function() {};
        if (global.blfPlatform) {
            global.blfPlatform.emit = function(event, data) {
                originalEmit.call(this, event, data);
                notifySwift(event, data);
            };
        }
        """
        
        jsContext?.evaluateScript(iOSBridgeCode)
    }
    
    private func initializeBLFPlatform() {
        // Initialize BLF platform in JavaScript (NOT Swift)
        let initScript = """
        if (typeof BLFMessagingPlatform !== 'undefined') {
            global.blfPlatform = new BLFMessagingPlatform({
                personality: 0.7,
                intelligence: 1.0,
                chaosProcessing: 2.0,
                velocityAdjustment: 1.5
            });
            
            global.blfPlatform.initialize().then(() => {
                notifySwift('platform:ready', {
                    status: 'operational',
                    amfActive: true
                });
            }).catch((error) => {
                notifySwift('platform:error', {
                    error: error.message
                });
            });
        } else {
            notifySwift('platform:error', {
                error: 'BLF Platform not found'
            });
        }
        """
        
        jsContext?.evaluateScript(initScript)
    }
    
    // MARK: - JavaScript Callback Handler (Thin Wrapper Only)
    private func handleJavaScriptCallback(event: String, data: JSValue) {
        // THIN WRAPPER: Only update Swift UI state, no processing
        switch event {
        case "platform:ready":
            isAMFActive = true
            amfStatus = "Operational"
            cognitiveAlignment = "Active"
            
        case "platform:error":
            isAMFActive = false
            amfStatus = "Error"
            
        case "user:registered":
            // User registered in JavaScript, update UI only
            updateConversationsList()
            
        case "message:sent", "message:delivered":
            // Message processed in JavaScript, update UI only
            updateConversationsList()
            
        case "personality:updated":
            // Personality updated in JavaScript, reflect in UI
            if let factor = data.objectForKeyedSubscript("personalityFactor")?.toDouble() {
                personalityFactor = factor
            }
            
        case "cognitive:alignment":
            // Cognitive alignment from JavaScript
            if let status = data.objectForKeyedSubscript("status")?.toString() {
                cognitiveAlignment = status
            }
            
        default:
            break
        }
    }
    
    // MARK: - Message Sending (Pass-through to JavaScript)
    func sendMessage(to contactId: String, content: String, completion: @escaping (Bool) -> Void) {
        // CRITICAL: Pass raw content to JavaScript, NO Swift processing
        let script = """
        if (global.blfPlatform) {
            global.blfPlatform.sendMessage('\(getCurrentUserId())', '\(contactId)', {
                content: `\(content.replacingOccurrences(of: "`", with: "\\`"))`
            }).then((messageId) => {
                notifySwift('message:sent', { messageId: messageId, success: true });
            }).catch((error) => {
                notifySwift('message:error', { error: error.message, success: false });
            });
        }
        """
        
        jsContext?.evaluateScript(script)
        
        // Listen for callback
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            completion(true) // Will be updated by JavaScript callback
        }
    }
    
    // MARK: - Contact Registration (Pass-through to JavaScript)
    func registerContact(name: String, phoneNumber: String, bio: String, completion: @escaping (String?) -> Void) {
        // THIN WRAPPER: Pass contact data to JavaScript for cognitive analysis
        let script = """
        if (global.blfPlatform) {
            global.blfPlatform.registerUser({
                name: '\(name)',
                phoneNumber: '\(phoneNumber)',
                bio: '\(bio)',
                communicationSample: '\(bio)' // Use bio as communication sample
            }).then((result) => {
                notifySwift('contact:registered', {
                    userId: result.userId,
                    name: '\(name)',
                    cognitiveType: 'Boolean Mind' // Will be determined by JavaScript
                });
            }).catch((error) => {
                notifySwift('contact:error', { error: error.message });
            });
        }
        """
        
        jsContext?.evaluateScript(script)
        
        // Return placeholder - will be updated by JavaScript callback
        completion(UUID().uuidString)
    }
    
    // MARK: - Personality Adjustment (Pass-through to JavaScript)
    func updatePersonalityFactor(_ factor: Double) {
        // THIN WRAPPER: Pass personality change to JavaScript AMF engine
        let script = """
        if (global.blfPlatform) {
            global.blfPlatform.updateUserPersonality('\(getCurrentUserId())', \(factor));
        }
        """
        
        jsContext?.evaluateScript(script)
    }
    
    // MARK: - NJSON Processing (NEVER in Swift - JavaScript Only)
    func processNJSONContent(_ content: String, completion: @escaping (String) -> Void) {
        // CRITICAL: NEVER process NJSON in Swift - pass to JavaScript engine
        let script = """
        if (global.blfPlatform && global.blfPlatform.njsonProcessor) {
            global.blfPlatform.njsonProcessor.process(`\(content.replacingOccurrences(of: "`", with: "\\`"))`).then((result) => {
                notifySwift('njson:processed', {
                    processed: result.processed,
                    original: result.input
                });
            });
        }
        """
        
        jsContext?.evaluateScript(script)
        
        // JavaScript will callback with processed result
        completion(content) // Placeholder
    }
    
    // MARK: - Cognitive Alignment Monitoring (JavaScript Only)
    func getCognitiveAlignmentStatus() -> String {
        // Request status from JavaScript engine
        let script = """
        if (global.blfPlatform) {
            global.blfPlatform.getDiagnostics().then((diagnostics) => {
                notifySwift('diagnostics:update', {
                    cognitiveAlignment: diagnostics.cognitiveAlignment,
                    amfStatus: diagnostics.amf.status
                });
            });
        }
        """
        
        jsContext?.evaluateScript(script)
        return cognitiveAlignment
    }
    
    // MARK: - Helper Functions (Thin Wrapper Utilities)
    private func getCurrentUserId() -> String {
        // Return current user ID (thin wrapper utility)
        return "current-user-id" // Would be stored in UserDefaults
    }
    
    private func updateConversationsList() {
        // Update conversations from JavaScript data
        let script = """
        if (global.blfPlatform) {
            const convs = Array.from(global.blfPlatform.conversations.values()).map(conv => ({
                id: conv.id,
                participants: conv.participants,
                lastMessage: conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].encryptedContent : 'No messages',
                contactName: 'Contact Name' // Would get from contacts
            }));
            notifySwift('conversations:update', { conversations: convs });
        }
        """
        
        jsContext?.evaluateScript(script)
    }
}

// MARK: - Data Models (Thin Wrappers Only)
struct BLFConversation: Identifiable {
    let id: String
    let contactName: String
    let lastMessage: String
    let cognitiveType: String
    
    init(id: String = UUID().uuidString, contactName: String, lastMessage: String, cognitiveType: String = "Boolean Mind") {
        self.id = id
        self.contactName = contactName
        self.lastMessage = lastMessage
        self.cognitiveType = cognitiveType
    }
} 