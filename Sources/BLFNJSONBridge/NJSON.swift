import Foundation
import JavaScriptCore

// MARK: - Core NJSON Types

/// Branch configuration for communication style
public enum Branch: String, CaseIterable {
    case familyFriends = "family_friends"
    case professional = "professional"
}

/// Social padding level
public enum SocialPadding: String, CaseIterable {
    case none = "none"
    case medium = "medium"
    case more = "more"
}

/// Cognitive state report from the NJSON engine
public struct CognitiveStateReport {
    public let aiCognitive: Double
    public let buffer: Double
    public let booleanMindQs: Double
    public let processingCycles: Int
    public let quantumState: QuantumStateInfo
    public let lastProcessingTime: TimeInterval
    
    public init(aiCognitive: Double, buffer: Double, booleanMindQs: Double, 
                processingCycles: Int, quantumState: QuantumStateInfo, lastProcessingTime: TimeInterval) {
        self.aiCognitive = aiCognitive
        self.buffer = buffer
        self.booleanMindQs = booleanMindQs
        self.processingCycles = processingCycles
        self.quantumState = quantumState
        self.lastProcessingTime = lastProcessingTime
    }
    
    public init(from state: CognitiveState, processingCycles: Int = 0, lastProcessingTime: TimeInterval = 0) {
        self.aiCognitive = state.aiCognitive
        self.buffer = state.buffer
        self.booleanMindQs = state.booleanMindQs
        self.processingCycles = processingCycles
        self.lastProcessingTime = lastProcessingTime
        self.quantumState = QuantumStateInfo(
            pure: state.alignment,
            fog: !state.initialized,
            breathing: true,
            jumpsActive: true,
            jumpPower: "v8_to_charger"
        )
    }
}

/// Quantum state information
public struct QuantumStateInfo {
    public let pure: Bool
    public let fog: Bool
    public let breathing: Bool
    public let jumpsActive: Bool
    public let jumpPower: String
    
    public init(pure: Bool, fog: Bool, breathing: Bool, jumpsActive: Bool, jumpPower: String) {
        self.pure = pure
        self.fog = fog
        self.breathing = breathing
        self.jumpsActive = jumpsActive
        self.jumpPower = jumpPower
    }
}

// MARK: - Core NJSON Class

/// NJSON - Main interface to the JavaScript-based NJSON Boolean processor
/// Acts as the narrow bridge between chaos and control in Swift apps
public actor NJSON {
    /// Shared instance for application-wide use
    public static let shared: NJSON = {
        do {
            return try NJSON()
        } catch {
            fatalError("Failed to initialize shared NJSON instance: \(error)")
        }
    }()
    
    private let jsContext: JSContext
    private var processor: JSValue?
    private var isInitialized = false
    
    // AMF Formula Components - maintaining the 0.1 buffer
    private let aiCognitive: Double = 2.89
    private let buffer: Double = 0.1
    private let booleanMindQs: Double = 2.99
    
    public init() throws {
        // Create JavaScript context
        guard let context = JSContext() else {
            throw NJSONError.initializationFailed("Could not create JSContext")
        }
        
        self.jsContext = context
        
        // Set up error handling
        context.exceptionHandler = { context, exception in
            print("JavaScript error: \(exception?.toString() ?? "Unknown error")")
        }
        
        // Load the JavaScriptCore-compatible NJSON processor
        Task {
            try await loadJavaScriptEngine()
        }
    }
    
    private func loadJavaScriptEngine() async throws {
        // Load the JavaScriptCore-compatible NJSON processor
        let bundle = Bundle.module
        guard let jsPath = bundle.path(forResource: "njson-javascriptcore", ofType: "js"),
              let jsCode = try? String(contentsOfFile: jsPath) else {
            throw NJSONError.initializationFailed("Could not load njson-javascriptcore.js")
        }
        
        // Evaluate the JavaScript code
        jsContext.evaluateScript(jsCode)
        
        // Check for JavaScript errors
        if let exception = jsContext.exception {
            throw NJSONError.initializationFailed("JavaScript evaluation error: \(exception)")
        }
        
        print("✅ JavaScriptCore NJSON engine loaded successfully")
    }
    
    public func initialize() async throws {
        guard !isInitialized else { return }
        
        // Ensure JavaScript engine is loaded
        try await loadJavaScriptEngine()
        
        // Create processor instance
        guard let processorClass = jsContext.objectForKeyedSubscript("NJSONBooleanProcessor"),
              let processor = processorClass.construct(withArguments: []) else {
            throw NJSONError.initializationFailed("Could not create NJSONBooleanProcessor instance")
        }
        
        // Debug the created instance
        print("🔍 Processor instance created")
        print("🔍 Processor type: \(processor)")
        print("🔍 Has initialize method: \(processor.hasProperty("initialize"))")
        print("🔍 Has process method: \(processor.hasProperty("process"))")
        print("🔍 Has applyHeatShield method: \(processor.hasProperty("applyHeatShield"))")
        
        self.processor = processor
        
        // Initialize the processor
        guard let initMethod = processor.objectForKeyedSubscript("initialize"),
              let initResult = initMethod.call(withArguments: []),
              initResult.toBool() else {
            throw NJSONError.initializationFailed("Processor initialization failed")
        }
        
        // Validate AMF formula alignment
        let alignment = validateCognitiveAlignment()
        guard alignment else {
            throw NJSONError.cognitiveAlignmentFailure
        }
        
        isInitialized = true
        print("✅ NJSON processor initialized with cognitive alignment verified")
    }
    
    /// Process text through the NJSON Boolean framework
    public func processText(_ input: String, bmId: String? = nil) async throws -> NJSONResult {
        if !isInitialized {
            try await initialize()
        }
        
        guard let processor = self.processor,
              let processMethod = processor.objectForKeyedSubscript("process") else {
            throw NJSONError.processingFailed("Processor not available")
        }
        
        // Call the JavaScript process method
        let arguments = bmId != nil ? [input, bmId!] : [input]
        guard let result = processMethod.call(withArguments: arguments) else {
            throw NJSONError.processingFailed("Process method call failed")
        }
        
        // Convert JavaScript result to Swift
        return try parseProcessingResult(result)
    }
    
    /// Legacy method for compatibility with NJSONSwiftBridge
    public func processIncomingMessage(_ message: String, from sender: String) async throws -> String {
        let result = try await processText(message, bmId: sender)
        return result.text
    }
    
    /// Set communication branch (compatibility method)
    public func setBranch(_ branch: Branch) async {
        // For now, this is a no-op since the JavaScript engine handles this internally
        print("Branch set to: \(branch.rawValue)")
    }
    
    /// Set social padding (compatibility method)
    public func setPadding(_ padding: SocialPadding) async {
        // For now, this is a no-op since the JavaScript engine handles this internally
        print("Social padding set to: \(padding.rawValue)")
    }
    
    private func parseProcessingResult(_ jsResult: JSValue) throws -> NJSONResult {
        guard let resultDict = jsResult.toDictionary() else {
            throw NJSONError.processingFailed("Could not parse JavaScript result")
        }
        
        // Extract result data - the text is in the "result" object
        let resultData = resultDict["result"] as? [String: Any] ?? [:]
        let text = (resultData["text"] as? String) ?? ""
        let timestamp = resultDict["timestamp"] as? Double ?? Date().timeIntervalSince1970 * 1000
        let processingTime = resultDict["processingTime"] as? Double ?? 0
        let cognitiveAlignment = resultDict["cognitiveAlignment"] as? Bool ?? false
        let quantumState = resultDict["quantumState"] as? Bool ?? false
        let heatShieldActive = resultDict["heatShieldActive"] as? Bool ?? false
        let error = resultDict["error"] as? String
        
        // Debug logging to see the actual structure
        print("🔍 JavaScript result structure:")
        print("   Full result: \(resultDict)")
        print("   Result data: \(resultData)")
        print("   Extracted text: '\(text)'")
        
        return NJSONResult(
            text: text,
            timestamp: Date(timeIntervalSince1970: timestamp / 1000),
            processingTime: processingTime,
            cognitiveAlignment: cognitiveAlignment,
            quantumState: quantumState,
            heatShieldActive: heatShieldActive,
            error: error
        )
    }
    
    /// Validate the core AMF formula: AIc + 0.1 = BMqs
    private func validateCognitiveAlignment() -> Bool {
        let calculatedBMqs = aiCognitive + buffer
        let alignmentValid = abs(calculatedBMqs - booleanMindQs) < 0.0001
        
        if !alignmentValid {
            print("⚠️ Cognitive alignment violation: \(aiCognitive) + \(buffer) ≠ \(booleanMindQs)")
        }
        
        return alignmentValid
    }
    
    /// Get current cognitive state
    public func getCognitiveState() async -> CognitiveState {
        return CognitiveState(
            aiCognitive: aiCognitive,
            buffer: buffer,
            booleanMindQs: booleanMindQs,
            alignment: validateCognitiveAlignment(),
            initialized: isInitialized
        )
    }
    
    /// Apply heat shield to filter input
    public func applyHeatShield(_ input: String) async throws -> String {
        guard let processor = self.processor,
              let heatShieldMethod = processor.objectForKeyedSubscript("applyHeatShield"),
              let result = heatShieldMethod.call(withArguments: [input]) else {
            throw NJSONError.processingFailed("Heat shield method not available")
        }
        
        return result.toString() ?? input
    }
}

// MARK: - Supporting Types

public struct NJSONResult {
    public let text: String
    public let timestamp: Date
    public let processingTime: Double
    public let cognitiveAlignment: Bool
    public let quantumState: Bool
    public let heatShieldActive: Bool
    public let error: String?
    
    public var isValid: Bool {
        return error == nil && cognitiveAlignment
    }
}

public struct CognitiveState {
    public let aiCognitive: Double
    public let buffer: Double
    public let booleanMindQs: Double
    public let alignment: Bool
    public let initialized: Bool
    
    public var isOperational: Bool {
        return alignment && initialized
    }
    
    public var formula: String {
        return "\(aiCognitive) + \(buffer) = \(booleanMindQs)"
    }
}

public enum NJSONError: LocalizedError {
    case initializationFailed(String)
    case processingFailed(String)
    case cognitiveAlignmentFailure
    case heatShieldFailure
    
    public var errorDescription: String? {
        switch self {
        case .initializationFailed(let message):
            return "NJSON initialization failed: \(message)"
        case .processingFailed(let message):
            return "NJSON processing failed: \(message)"
        case .cognitiveAlignmentFailure:
            return "Cognitive alignment violation: AIc + 0.1 ≠ BMqs"
        case .heatShieldFailure:
            return "Heat shield protection failure"
        }
    }
}

// MARK: - Logger Extension

public struct Logger {
    let subsystem: String
    let category: String
    
    public init(subsystem: String, category: String) {
        self.subsystem = subsystem
        self.category = category
    }
    
    public func info(_ message: String) {
        print("ℹ️ [\(subsystem):\(category)] \(message)")
    }
    
    public func debug(_ message: String) {
        print("🔍 [\(subsystem):\(category)] \(message)")
    }
    
    public func warning(_ message: String) {
        print("⚠️ [\(subsystem):\(category)] \(message)")
    }
    
    public func error(_ message: String) {
        print("❌ [\(subsystem):\(category)] \(message)")
    }
} 