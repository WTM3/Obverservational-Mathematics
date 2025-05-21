import Foundation
import Messages
import JavaScriptCore

/// BLFMessageBot - A thin wrapper over the core AMF/BLF JavaScript implementation
class BLFMessageBot {
    // MARK: - Properties
    private let bufferValue: Double = 0.1
    private var initialized: Bool = false
    private var jsContext: JSContext?
    
    // MARK: - Initialization
    init() {
        Logger.info("BLFMessageBot thin wrapper initialized")
    }
    
    // MARK: - Public Methods
    
    /// Process an incoming message by delegating to the JavaScript AMF implementation
    /// - Parameter message: The message text to process
    /// - Returns: The processed response
    func processMessage(_ message: String) -> String {
        guard initialized else {
            initialize()
            return "BLF initialized with buffer \(bufferValue). Ready to process messages."
        }
        
        Logger.info("Processing message: \(message)")
        
        // Delegate to the JavaScript AMF implementation
        return callJSMethod("processMessage", withArgs: [message]) ?? 
               "Failed to process message through AMF core"
    }
    
    /// Initialize the connection to the AMF JavaScript system
    func initialize() {
        Logger.info("Initializing BLF Message Bot...")
        
        // Set up JavaScript context
        setupJSContext()
        
        initialized = true
        Logger.info("BLF Message Bot initialization complete")
    }
    
    /// Get the current status directly from the AMF core
    /// - Returns: A status report string
    func getStatus() -> String {
        return callJSMethod("getStatus", withArgs: []) ?? 
               "Unable to retrieve AMF system status"
    }
    
    // MARK: - Private Methods
    
    /// Set up the JavaScript context with the AMF code
    private func setupJSContext() {
        // Create a new JavaScript context
        jsContext = JSContext()
        
        // Handle JS exceptions
        jsContext?.exceptionHandler = { context, exception in
            if let exc = exception {
                Logger.error("JS Exception: \(exc.toString() ?? "unknown error")")
            }
        }
        
        // Load the AMF.js content
        if let amfPath = Bundle.main.path(forResource: "AMF", ofType: "js"),
           let amfJS = try? String(contentsOfFile: amfPath, encoding: .utf8) {
            jsContext?.evaluateScript(amfJS)
            Logger.info("Loaded AMF.js core implementation")
        } else {
            Logger.error("Failed to load AMF.js")
        }
        
        // Register the thin wrapper bridge
        registerSwiftFunctions()
        
        // Verify the 0.1 buffer is intact in the JS implementation
        if let bufferCheck = callJSMethod("checkBufferIntegrity", withArgs: []) {
            Logger.info("Buffer integrity check: \(bufferCheck)")
        }
    }
    
    /// Register Swift functions to be called from JavaScript
    private func registerSwiftFunctions() {
        // Log function
        let logFunction: @convention(block) (String) -> Void = { message in
            Logger.info("JS: \(message)")
        }
        jsContext?.setObject(logFunction, forKeyedSubscript: "swiftLog" as NSString)
        
        // Register other bridge functions as needed
    }
    
    /// Call a JavaScript method in the AMF implementation
    /// - Parameters:
    ///   - method: The method name to call
    ///   - args: Arguments to pass to the method
    /// - Returns: The result as a string
    private func callJSMethod(_ method: String, withArgs args: [Any]) -> String? {
        guard let context = jsContext else {
            Logger.error("JavaScript context not initialized")
            return nil
        }
        
        // Create the function call
        var jsArgs = ""
        for (i, arg) in args.enumerated() {
            if i > 0 {
                jsArgs += ", "
            }
            
            if let stringArg = arg as? String {
                jsArgs += "\"\(stringArg.replacingOccurrences(of: "\"", with: "\\\""))\""
            } else {
                jsArgs += "\(arg)"
            }
        }
        
        let jsCall = "AMF.\(method)(\(jsArgs))"
        
        // Call the function
        guard let result = context.evaluateScript(jsCall) else {
            Logger.error("Failed to call JS method: \(method)")
            return nil
        }
        
        return result.toString()
    }
}

// MARK: - Supporting Types

/// Represents the quantum state of the system
struct QuantumState {
    var pure: Bool
    var fog: Bool
    var breathing: Bool
    var jumps: JumpConfiguration
}

/// Configuration for quantum jumps
struct JumpConfiguration {
    var power: String
    var active: Bool
}

/// Cognitive alignment configuration
struct CognitiveAlignment {
    var aiCognitive: Double
    var booleanMindQs: Double
    var buffer: Double
    var formula: String
} 