import Foundation
import JavaScriptCore

// MARK: - Core NJSON Types

/// Branch configuration for communication style
enum Branch: String, CaseIterable {
    case familyFriends = "familyFriends"
    case professional = "professional"
}

/// Social padding level
enum SocialPadding: String, CaseIterable {
    case none = "none"
    case minimal = "minimal" 
    case medium = "medium"
    case more = "more"
}

/// Cognitive state report from the NJSON engine
struct CognitiveStateReport {
    let aiCognitive: Double
    let buffer: Double
    let booleanMindQs: Double
    let processingCycles: Int
    let quantumState: QuantumStateInfo
    let lastProcessingTime: TimeInterval
}

/// Quantum state information
struct QuantumStateInfo {
    let pure: Bool
    let fog: Bool
    let breathing: Bool
    let jumpsActive: Bool
    let jumpPower: String
}

// MARK: - Core NJSON Class

/// Core NJSON Swift interface to the JavaScript engine
/// Maintains the exact 0.1 buffer: AIc + 0.1 = BMqs
/// Acts as the thin Swift wrapper around the V-8 JavaScript core
@available(macOS 10.15, iOS 14.0, *)
actor NJSON {
    // Shared instance for application-wide use
    static let shared = NJSON()
    
    // Core components
    private let jsContext: JSContext
    private let logger = Logger(subsystem: "com.blf.njson", category: "NJSON")
    private var isInitialized: Bool = false
    
    // Configuration
    private var currentBranch: Branch = .professional
    private var currentPadding: SocialPadding = .medium
    
    // Metrics
    private var messageCount: Int = 0
    private var lastProcessingTime: TimeInterval = 0
    
    // MARK: - Initialization
    
    init() {
        // Create JavaScript context for NJSON engine
        jsContext = JSContext()!
        
        // Set up exception handling
        jsContext.exceptionHandler = { context, exception in
            if let error = exception {
                print("⚠️ JavaScript Error: \(error)")
            }
        }
        
        logger.info("NJSON Swift interface initialized")
    }
    
    /// Initialize the NJSON engine with JavaScript core
    func initialize() async throws {
        guard !isInitialized else {
            logger.info("NJSON already initialized")
            return
        }
        
        // Load the NJSON JavaScript engine
        try await loadNJSONEngine()
        
        // Verify buffer integrity
        try await verifyBufferIntegrity()
        
        isInitialized = true
        logger.info("NJSON engine initialized with 0.1 buffer protection")
    }
    
    // MARK: - Core Processing
    
    /// Process an incoming message through the NJSON engine
    func processIncomingMessage(_ message: String, from sender: String) async throws -> String {
        guard isInitialized else {
            throw NJSONError.notInitialized
        }
        
        let startTime = CFAbsoluteTimeGetCurrent()
        messageCount += 1
        
        // Sanitize input for JavaScript context
        let sanitizedMessage = sanitizeForJS(message)
        let sanitizedSender = sanitizeForJS(sender)
        
        // Call JavaScript NJSON processor
        let jsFunction = """
            (function() {
                try {
                    // Use the NJSON Boolean processor
                    const result = window.njsonProcessor.processMessage('\(sanitizedMessage)', {
                        sender: '\(sanitizedSender)',
                        branch: '\(currentBranch.rawValue)',
                        padding: '\(currentPadding.rawValue)'
                    });
                    return result;
                } catch (error) {
                    return { error: error.message, fallback: '\(sanitizedMessage)' };
                }
            })()
        """
        
        guard let result = jsContext.evaluateScript(jsFunction) else {
            throw NJSONError.processingFailure("JavaScript evaluation failed")
        }
        
        // Process the result
        let processedResult = try processJSResult(result)
        
        // Track timing
        lastProcessingTime = CFAbsoluteTimeGetCurrent() - startTime
        
        logger.debug("Processed message in \(String(format: "%.4f", lastProcessingTime))s")
        
        return processedResult
    }
    
    /// Get current cognitive state from the engine
    func getCognitiveState() async -> CognitiveStateReport {
        guard isInitialized else {
            return createDefaultCognitiveState()
        }
        
        // Get state from JavaScript engine
        let jsFunction = """
            (function() {
                try {
                    return {
                        aiCognitive: window.njsonProcessor.getAIC(),
                        buffer: window.njsonProcessor.getBuffer(),
                        booleanMindQs: window.njsonProcessor.getBMQS(),
                        processingCycles: window.njsonProcessor.getProcessingCycles(),
                        quantumState: window.njsonProcessor.getQuantumState()
                    };
                } catch (error) {
                    return {
                        aiCognitive: 2.89,
                        buffer: 0.1,
                        booleanMindQs: 2.99,
                        processingCycles: 0,
                        quantumState: { pure: true, fog: false, breathing: true, jumpsActive: true, jumpPower: 'v8_to_charger' }
                    };
                }
            })()
        """
        
        guard let result = jsContext.evaluateScript(jsFunction),
              let stateDict = result.toDictionary() else {
            return createDefaultCognitiveState()
        }
        
        return CognitiveStateReport(
            aiCognitive: stateDict["aiCognitive"] as? Double ?? 2.89,
            buffer: stateDict["buffer"] as? Double ?? 0.1,
            booleanMindQs: stateDict["booleanMindQs"] as? Double ?? 2.99,
            processingCycles: stateDict["processingCycles"] as? Int ?? messageCount,
            quantumState: extractQuantumState(from: stateDict["quantumState"]),
            lastProcessingTime: lastProcessingTime
        )
    }
    
    /// Set the communication branch
    func setBranch(_ branch: Branch) async {
        currentBranch = branch
        logger.info("Branch set to: \(branch.rawValue)")
        
        // Update JavaScript engine if initialized
        if isInitialized {
            let jsFunction = """
                window.njsonProcessor && window.njsonProcessor.setBranch('\(branch.rawValue)');
            """
            jsContext.evaluateScript(jsFunction)
        }
    }
    
    /// Set the social padding level
    func setPadding(_ padding: SocialPadding) async {
        currentPadding = padding
        logger.info("Social padding set to: \(padding.rawValue)")
        
        // Update JavaScript engine if initialized
        if isInitialized {
            let jsFunction = """
                window.njsonProcessor && window.njsonProcessor.setPadding('\(padding.rawValue)');
            """
            jsContext.evaluateScript(jsFunction)
        }
    }
    
    // MARK: - Private Methods
    
    /// Load the NJSON JavaScript engine
    private func loadNJSONEngine() async throws {
        // Path to the NJSON Boolean processor
        let njsonPath = Bundle.main.path(forResource: "njson-boolean-processor", ofType: "js") ??
                       "BLFIMP/Core/The NJSON Key/njson-boolean-processor.js"
        
        // Load JavaScript file
        guard let njsonJS = try? String(contentsOfFile: njsonPath) else {
            throw NJSONError.engineLoadFailure("Could not load NJSON JavaScript engine from: \(njsonPath)")
        }
        
        // Evaluate the NJSON engine in JavaScript context
        jsContext.evaluateScript(njsonJS)
        
        // Initialize the processor
        let initScript = """
            window.njsonProcessor = new NJSONBooleanProcessor({
                cognitiveProtocol: {
                    alignment: {
                        aiCognitive: 2.89,
                        buffer: 0.1,
                        booleanMindQs: 2.99
                    },
                    safety: {
                        heatShield: true,
                        llsdtRate: 0.1
                    }
                },
                responseProtocols: {
                    prioritize: 'clarity_over_comprehensiveness',
                    eliminate: 'unnecessary_social_padding',
                    format: 'direct_answers_first_details_after'
                }
            });
        """
        
        jsContext.evaluateScript(initScript)
        
        // Verify initialization
        guard let checkResult = jsContext.evaluateScript("window.njsonProcessor ? true : false"),
              checkResult.toBool() else {
            throw NJSONError.engineLoadFailure("NJSON processor initialization failed")
        }
        
        logger.info("NJSON JavaScript engine loaded successfully")
    }
    
    /// Verify that the 0.1 buffer is intact
    private func verifyBufferIntegrity() async throws {
        let jsFunction = """
            (function() {
                try {
                    const aic = window.njsonProcessor.getAIC();
                    const buffer = window.njsonProcessor.getBuffer();
                    const bmqs = window.njsonProcessor.getBMQS();
                    const calculated = aic + buffer;
                    const violation = Math.abs(calculated - bmqs);
                    return {
                        intact: violation < 0.0001,
                        aic: aic,
                        buffer: buffer,
                        bmqs: bmqs,
                        violation: violation
                    };
                } catch (error) {
                    return { intact: false, error: error.message };
                }
            })()
        """
        
        guard let result = jsContext.evaluateScript(jsFunction),
              let integrityDict = result.toDictionary(),
              let intact = integrityDict["intact"] as? Bool else {
            throw NJSONError.bufferIntegrityFailure("Could not verify buffer integrity")
        }
        
        if !intact {
            let violation = integrityDict["violation"] as? Double ?? 999.0
            throw NJSONError.bufferIntegrityFailure("Buffer integrity violation: \(violation)")
        }
        
        logger.info("Buffer integrity verified: AIc + 0.1 = BMqs")
    }
    
    /// Process JavaScript result and extract meaningful content
    private func processJSResult(_ jsValue: JSValue) throws -> String {
        // Handle different result types
        if jsValue.isString {
            return jsValue.toString()
        }
        
        if jsValue.isObject, let resultDict = jsValue.toDictionary() {
            // Check for error
            if let error = resultDict["error"] as? String {
                if let fallback = resultDict["fallback"] as? String {
                    logger.warning("NJSON processing error: \(error), using fallback")
                    return fallback
                } else {
                    throw NJSONError.processingFailure("NJSON error: \(error)")
                }
            }
            
            // Extract result content
            if let result = resultDict["result"] as? String {
                return result
            }
            
            // Return string representation if no specific result field
            return String(describing: resultDict)
        }
        
        // Fallback to string conversion
        return jsValue.toString()
    }
    
    /// Sanitize string for safe JavaScript evaluation
    private func sanitizeForJS(_ input: String) -> String {
        return input
            .replacingOccurrences(of: "'", with: "\\'")
            .replacingOccurrences(of: "\"", with: "\\\"")
            .replacingOccurrences(of: "\n", with: "\\n")
            .replacingOccurrences(of: "\r", with: "\\r")
            .replacingOccurrences(of: "\t", with: "\\t")
    }
    
    /// Extract quantum state from JavaScript result
    private func extractQuantumState(from jsValue: Any?) -> QuantumStateInfo {
        guard let stateDict = jsValue as? [String: Any] else {
            return QuantumStateInfo(
                pure: true,
                fog: false,
                breathing: true,
                jumpsActive: true,
                jumpPower: "v8_to_charger"
            )
        }
        
        return QuantumStateInfo(
            pure: stateDict["pure"] as? Bool ?? true,
            fog: stateDict["fog"] as? Bool ?? false,
            breathing: stateDict["breathing"] as? Bool ?? true,
            jumpsActive: stateDict["jumpsActive"] as? Bool ?? true,
            jumpPower: stateDict["jumpPower"] as? String ?? "v8_to_charger"
        )
    }
    
    /// Create default cognitive state for fallback
    private func createDefaultCognitiveState() -> CognitiveStateReport {
        return CognitiveStateReport(
            aiCognitive: 2.89,
            buffer: 0.1,
            booleanMindQs: 2.99,
            processingCycles: messageCount,
            quantumState: QuantumStateInfo(
                pure: true,
                fog: false,
                breathing: true,
                jumpsActive: true,
                jumpPower: "v8_to_charger"
            ),
            lastProcessingTime: lastProcessingTime
        )
    }
}

// MARK: - NJSON Errors

enum NJSONError: Error {
    case notInitialized
    case engineLoadFailure(String)
    case processingFailure(String)
    case bufferIntegrityFailure(String)
}

// MARK: - Logger Extension

struct Logger {
    let subsystem: String
    let category: String
    
    func info(_ message: String) {
        print("ℹ️ [\(subsystem):\(category)] \(message)")
    }
    
    func debug(_ message: String) {
        print("🔍 [\(subsystem):\(category)] \(message)")
    }
    
    func warning(_ message: String) {
        print("⚠️ [\(subsystem):\(category)] \(message)")
    }
    
    func error(_ message: String) {
        print("❌ [\(subsystem):\(category)] \(message)")
    }
} 