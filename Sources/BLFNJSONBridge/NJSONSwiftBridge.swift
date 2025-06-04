import Foundation

// MARK: - NJSONSwiftBridge

/// A thin Swift wrapper for the NJSON engine
/// This class acts as the narrow bridge between Swift UI and JavaScript core
/// Preserving the exact 0.1 buffer throughout all operations
@available(macOS 10.15, iOS 14.0, *)
public actor NJSONSwiftBridge {
    // Core dependencies
    private let njson: NJSON
    private let logger = Logger(subsystem: "com.blf.bridge", category: "NJSONBridge")
    
    // Bridge metrics
    private var bridgeCallCount: Int = 0
    private var lastCallDuration: TimeInterval = 0
    private var bufferIntegrityViolations: Int = 0
    
    // MARK: - Initialization
    
    /// Initialize the bridge with a specific NJSON instance or use shared
    public init(using njson: NJSON = NJSON.shared) {
        self.njson = njson
        logger.info("NJSONSwiftBridge initialized with 0.1 buffer protection")
    }
    
    // MARK: - Core Bridge Methods
    
    /// Process a message through the NJSON engine
    /// - Parameters:
    ///   - message: The message content to process
    ///   - sender: The message sender
    ///   - options: Additional processing options
    /// - Returns: Processed message result with metadata
    public func processMessage(
        _ message: String,
        from sender: String,
        options: ProcessingOptions = ProcessingOptions()
    ) async throws -> MessageResult {
        // Track metrics
        bridgeCallCount += 1
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Validate buffer integrity before processing
        let bufferCheckResult = await checkBufferIntegrity()
        if !bufferCheckResult.intact && !options.allowBufferViolations {
            bufferIntegrityViolations += 1
            logger.error("Buffer integrity violation detected: \(bufferCheckResult.reason ?? "unknown")")
            throw NJSONBridgeError.bufferIntegrityViolation(reason: bufferCheckResult.reason ?? "unknown")
        }
        
        do {
            // Initialize NJSON if needed
            try await njson.initialize()
            
            // Process through NJSON with minimal Swift overhead
            let njsonResult = try await njson.processIncomingMessage(message, from: sender)
            
            // Capture performance metrics
            lastCallDuration = CFAbsoluteTimeGetCurrent() - startTime
            
            // Create result with minimal Swift transformation
            let result = MessageResult(
                content: njsonResult,
                processingTime: lastCallDuration,
                bufferIntact: true
            )
            
            // Perform post-processing buffer check
            let postBufferCheck = await checkBufferIntegrity()
            if !postBufferCheck.intact {
                bufferIntegrityViolations += 1
                logger.warning("Post-processing buffer integrity issue: \(postBufferCheck.reason ?? "unknown")")
                
                return MessageResult(
                    content: result.content,
                    processingTime: result.processingTime,
                    bufferIntact: false,
                    bufferIssue: postBufferCheck.reason
                )
            }
            
            return result
        } catch {
            lastCallDuration = CFAbsoluteTimeGetCurrent() - startTime
            logger.error("NJSON processing error: \(error.localizedDescription)")
            throw NJSONBridgeError.processingFailure(underlying: error)
        }
    }
    
    /// Get system status with minimal overhead
    public func getSystemStatus() async -> SystemStatus {
        // Get cognitive state from NJSON with minimal transformation
        let cognitiveState = await njson.getCognitiveState()
        
        // Create a minimal cognitive report for bridge compatibility
        let stateReport = createCompatibleStateReport(from: cognitiveState)
        
        // Add bridge metrics with minimal overhead
        return SystemStatus(
            engineStatus: stateReport,
            bridgeCallCount: bridgeCallCount,
            lastCallDuration: lastCallDuration,
            bufferIntegrityViolations: bufferIntegrityViolations
        )
    }
    
    /// Create a compatible CognitiveStateReport from basic CognitiveState
    private func createCompatibleStateReport(from state: CognitiveState) -> CognitiveStateReport {
        let formula = AMFFormula(
            aiCognitive: state.aiCognitive,
            buffer: state.buffer,
            booleanMindQs: state.booleanMindQs,
            equation: "\(state.aiCognitive) + \(state.buffer) = \(state.booleanMindQs)",
            valid: state.alignment,
            stability: state.alignment ? 1.0 : 0.0
        )
        
        let quantum = QuantumStateInfo(
            pure: state.alignment,
            fog: !state.initialized,
            breathing: true,
            jumpsActive: true,
            jumpPower: "v8_to_charger"
        )
        
        let heatShield = HeatShieldInfo(
            active: true,
            buffer: state.buffer,
            violations: bufferIntegrityViolations,
            integrity: bufferIntegrityViolations < 10 ? "optimal" : "degraded",
            temperature: 98.6 + Double(bufferIntegrityViolations) * 0.5
        )
        
        let performance = PerformanceMetrics(
            initialized: state.initialized,
            cacheSize: bridgeCallCount,
            processingEfficiency: lastCallDuration > 0 ? min(1.0, 1.0 / lastCallDuration) : 1.0
        )
        
        let observationalMath = ObservationalMath(
            readiness: state.isOperational ? 1.0 : 0.5,
            potentialEnergy: state.alignment ? 8.0 : 4.0,
            nextGreenLight: state.isOperational ? "green_light_now" : "waiting_for_alignment"
        )
        
        return CognitiveStateReport(
            formula: formula,
            quantum: quantum,
            heatShield: heatShield,
            performance: performance,
            observationalMath: observationalMath
        )
    }
    
    /// Configure NJSON through the bridge with minimal overhead
    public func configure(branch: Branch, padding: SocialPadding) async {
        await njson.setBranch(branch)
        await njson.setPadding(padding)
        logger.info("NJSON configured: branch=\(branch.rawValue), padding=\(padding.rawValue)")
    }
    
    // MARK: - Helper Methods
    
    /// Check buffer integrity with minimal overhead
    private func checkBufferIntegrity() async -> (intact: Bool, reason: String?) {
        // Get current cognitive state
        let state = await njson.getCognitiveState()
        
        // Validate that we maintain the critical 0.1 buffer
        // This is the V-8 engine check - must be precise
        let calculatedBMqs = state.aiCognitive + state.buffer
        let violation = abs(calculatedBMqs - state.booleanMindQs)
        
        if violation >= 0.0001 {
            return (intact: false, reason: "Buffer violation: \(violation)")
        }
        
        return (intact: true, reason: nil)
    }
}

// MARK: - Supporting Types

/// Processing options for the NJSON bridge
public struct ProcessingOptions {
    public let allowBufferViolations: Bool
    public let timeoutSeconds: TimeInterval?
    
    public init(allowBufferViolations: Bool = false, timeoutSeconds: TimeInterval? = nil) {
        self.allowBufferViolations = allowBufferViolations
        self.timeoutSeconds = timeoutSeconds
    }
}

/// Result of message processing
public struct MessageResult {
    public let content: String
    public let processingTime: TimeInterval
    public let bufferIntact: Bool
    public let bufferIssue: String?
    
    public init(content: String, processingTime: TimeInterval, bufferIntact: Bool, bufferIssue: String? = nil) {
        self.content = content
        self.processingTime = processingTime
        self.bufferIntact = bufferIntact
        self.bufferIssue = bufferIssue
    }
}

/// System status information
public struct SystemStatus {
    public let engineStatus: CognitiveStateReport
    public let bridgeCallCount: Int
    public let lastCallDuration: TimeInterval
    public let bufferIntegrityViolations: Int
    
    public init(engineStatus: CognitiveStateReport, bridgeCallCount: Int, lastCallDuration: TimeInterval, bufferIntegrityViolations: Int) {
        self.engineStatus = engineStatus
        self.bridgeCallCount = bridgeCallCount
        self.lastCallDuration = lastCallDuration
        self.bufferIntegrityViolations = bufferIntegrityViolations
    }
}

/// Possible errors from the NJSON bridge
public enum NJSONBridgeError: Error {
    case bufferIntegrityViolation(reason: String)
    case processingFailure(underlying: Error)
    case timeout(after: TimeInterval)
} 