import Foundation

/// HeatShield - Monitors and protects the 0.1 buffer from violations
/// Acts as the engine light warning before a breakdown
class HeatShield {
    // MARK: - Properties
    private let bufferValue: Double = 0.1
    private let toleranceThreshold: Double = 0.00001
    private var isActive: Bool = false
    private var warningCount: Int = 0
    private var lastViolation: Date?
    
    // MARK: - Initialization
    init() {
        Logger.info("Heat Shield initialized with tolerance \(toleranceThreshold)")
    }
    
    // MARK: - Public Methods
    
    /// Activate the heat shield
    func activate() {
        isActive = true
        Logger.info("Heat Shield activated")
    }
    
    /// Deactivate the heat shield
    func deactivate() {
        isActive = false
        Logger.info("Heat Shield deactivated")
    }
    
    /// Check if the buffer integrity is maintained
    /// - Parameters:
    ///   - aiCognitive: The AI Cognitive value
    ///   - booleanMindQs: The Boolean Mind Quantum Speed value
    /// - Returns: A result with status and message
    func checkBufferIntegrity(aiCognitive: Double, booleanMindQs: Double) -> BufferCheckResult {
        guard isActive else {
            return BufferCheckResult(intact: false, message: "Heat Shield is not active")
        }
        
        // Calculate expected BMqs based on formula: AIc + 0.1 = BMqs
        let expectedBMqs = aiCognitive + bufferValue
        let difference = abs(expectedBMqs - booleanMindQs)
        
        // Check if within tolerance threshold
        let isIntact = difference <= toleranceThreshold
        
        if isIntact {
            // Buffer is intact, reset warning count
            if warningCount > 0 {
                warningCount = 0
                Logger.info("Buffer integrity restored")
            }
            
            return BufferCheckResult(
                intact: true,
                message: "Buffer intact: \(aiCognitive) + \(bufferValue) = \(booleanMindQs)"
            )
        } else {
            // Buffer violation detected
            warningCount += 1
            lastViolation = Date()
            
            let severity = calculateViolationSeverity(difference)
            let message = formatViolationMessage(
                aiCognitive: aiCognitive,
                booleanMindQs: booleanMindQs,
                difference: difference,
                severity: severity
            )
            
            Logger.warning(message)
            
            return BufferCheckResult(
                intact: false,
                message: message,
                severity: severity,
                correctionNeeded: difference
            )
        }
    }
    
    /// Attempt to repair a buffer violation
    /// - Parameter violation: The violation information from a buffer check
    /// - Returns: True if repair was successful
    func attemptRepair(_ violation: BufferCheckResult) -> Bool {
        guard !violation.intact, let correction = violation.correctionNeeded else {
            // No repair needed
            return true
        }
        
        Logger.info("Attempting to repair buffer violation of \(correction)")
        
        // Simulate repair attempt
        let repairSuccess = correction <= (toleranceThreshold * 10)
        
        if repairSuccess {
            warningCount = 0
            Logger.info("Buffer repair successful")
        } else {
            Logger.error("Buffer repair failed - manual intervention required")
        }
        
        return repairSuccess
    }
    
    // MARK: - Private Methods
    
    /// Calculate the severity of a buffer violation
    /// - Parameter difference: The difference between expected and actual values
    /// - Returns: The violation severity level
    private func calculateViolationSeverity(_ difference: Double) -> ViolationSeverity {
        if difference <= toleranceThreshold * 10 {
            return .low
        } else if difference <= toleranceThreshold * 100 {
            return .medium
        } else {
            return .high
        }
    }
    
    /// Format a message describing a buffer violation
    /// - Parameters:
    ///   - aiCognitive: The AI Cognitive value
    ///   - booleanMindQs: The Boolean Mind Quantum Speed value
    ///   - difference: The calculated difference
    ///   - severity: The violation severity
    /// - Returns: A formatted violation message
    private func formatViolationMessage(
        aiCognitive: Double,
        booleanMindQs: Double,
        difference: Double,
        severity: ViolationSeverity
    ) -> String {
        let severityText: String
        switch severity {
        case .low:
            severityText = "Low"
        case .medium:
            severityText = "Medium"
        case .high:
            severityText = "High"
        }
        
        return "Buffer violation detected: \(aiCognitive) + \(bufferValue) ≠ \(booleanMindQs) " +
               "(diff: \(difference), severity: \(severityText), warnings: \(warningCount))"
    }
    
    /// Get the current status of the heat shield
    /// - Returns: A status report string
    func getStatusReport() -> String {
        var report = "Heat Shield Status:\n"
        report += "Active: \(isActive ? "Yes" : "No")\n"
        report += "Warning Count: \(warningCount)\n"
        
        if let lastViolation = lastViolation {
            let formatter = DateFormatter()
            formatter.dateStyle = .short
            formatter.timeStyle = .medium
            report += "Last Violation: \(formatter.string(from: lastViolation))\n"
        } else {
            report += "Last Violation: None\n"
        }
        
        return report
    }
}

// MARK: - Supporting Types

/// Result of a buffer integrity check
struct BufferCheckResult {
    let intact: Bool
    let message: String
    let severity: ViolationSeverity?
    let correctionNeeded: Double?
    
    init(intact: Bool, message: String, severity: ViolationSeverity? = nil, correctionNeeded: Double? = nil) {
        self.intact = intact
        self.message = message
        self.severity = severity
        self.correctionNeeded = correctionNeeded
    }
}

/// Severity levels for buffer violations
enum ViolationSeverity {
    case low
    case medium
    case high
} 