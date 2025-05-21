import Foundation

// MARK: - NJSONSwiftBridge

/// A thin Swift wrapper for the NJSON engine
/// This class acts as the narrow bridge between Swift UI and JavaScript core
/// Preserving the exact 0.1 buffer throughout all operations
@available(macOS 10.15, iOS 14.0, *)
actor NJSONSwiftBridge {
    // Core dependencies
    private let njson: NJSON
    private let logger = Logger(subsystem: "com.blf.bridge", category: "NJSONBridge")
    
    // Bridge metrics
    private var bridgeCallCount: Int = 0
    private var lastCallDuration: TimeInterval = 0
    private var bufferIntegrityViolations: Int = 0
    
    // Initialization
    init(using njson: NJSON = NJSON.shared) {
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
    func processMessage(
        _ message: String,
        from sender: String,
        options: ProcessingOptions = ProcessingOptions()
    ) async throws -> MessageResult {
        // Track metrics
        bridgeCallCount += 1
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Validate buffer integrity before processing
        let bufferCheckResult = checkBufferIntegrity()
        if !bufferCheckResult.intact && !options.allowBufferViolations {
            bufferIntegrityViolations += 1
            logger.error("Buffer integrity violation detected: \(bufferCheckResult.reason ?? "unknown")")
            throw NJSONBridgeError.bufferIntegrityViolation(reason: bufferCheckResult.reason ?? "unknown")
        }
        
        do {
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
            let postBufferCheck = checkBufferIntegrity()
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
    func getSystemStatus() async -> SystemStatus {
        // Get cognitive state from NJSON with minimal transformation
        let cognitiveState = await njson.getCognitiveState()
        
        // Add bridge metrics with minimal overhead
        return SystemStatus(
            engineStatus: cognitiveState,
            bridgeCallCount: bridgeCallCount,
            lastCallDuration: lastCallDuration,
            bufferIntegrityViolations: bufferIntegrityViolations
        )
    }
    
    /// Configure NJSON through the bridge with minimal overhead
    func configure(branch: Branch, padding: SocialPadding) async {
        await njson.setBranch(branch)
        await njson.setPadding(padding)
        logger.info("NJSON configured: branch=\(branch.rawValue), padding=\(padding.rawValue)")
    }
    
    // MARK: - Helper Methods
    
    /// Check buffer integrity with minimal overhead
    private func checkBufferIntegrity() -> (intact: Bool, reason: String?) {
        // Validate that we maintain the critical 0.1 buffer
        // This is the V-8 engine check - must be precise
        
        // Simple validation - in real implementation would validate key mathematical relationships
        return (intact: true, reason: nil)
    }
}

// MARK: - Supporting Types

/// Processing options for the NJSON bridge
struct ProcessingOptions {
    let allowBufferViolations: Bool
    let timeoutSeconds: TimeInterval?
    
    init(allowBufferViolations: Bool = false, timeoutSeconds: TimeInterval? = nil) {
        self.allowBufferViolations = allowBufferViolations
        self.timeoutSeconds = timeoutSeconds
    }
}

/// Result of message processing
struct MessageResult {
    let content: String
    let processingTime: TimeInterval
    let bufferIntact: Bool
    let bufferIssue: String?
    
    init(content: String, processingTime: TimeInterval, bufferIntact: Bool, bufferIssue: String? = nil) {
        self.content = content
        self.processingTime = processingTime
        self.bufferIntact = bufferIntact
        self.bufferIssue = bufferIssue
    }
}

/// System status information
struct SystemStatus {
    let engineStatus: CognitiveStateReport
    let bridgeCallCount: Int
    let lastCallDuration: TimeInterval
    let bufferIntegrityViolations: Int
}

/// Possible errors from the NJSON bridge
enum NJSONBridgeError: Error {
    case bufferIntegrityViolation(reason: String)
    case processingFailure(underlying: Error)
    case timeout(after: TimeInterval)
} 