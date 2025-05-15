import Foundation

// MARK: - LLSDT Enforcer Class
class LLSDTEnforcer {
    // LLSDT parameters
    private let minRate: Double
    private let maxRate: Double
    private let enforceBuffer: Bool
    private let buffer = 0.1  // Exact value, never approximate
    private let quantumSpeed = 2.99
    
    // LLSDT state
    private var currentRate: Double
    private var quantumState: [String: Bool] = [
        "pure": true,
        "fog": false,
        "breathing": true
    ]
    
    // LLSDT metrics
    private var validations: Int = 0
    private var violations: Int = 0
    private var lastViolationTime: Date?
    
    // Initialization
    init(minRate: Double, maxRate: Double, enforceBuffer: Bool) {
        self.minRate = minRate
        self.maxRate = maxRate
        self.enforceBuffer = enforceBuffer
        self.currentRate = minRate
    }
    
    // MARK: - LLSDT Validation
    func validateLLSDT(_ aiCognitive: Double) -> Bool {
        validations += 1
        
        // Core LLSDT constraint: AIc + buffer = BMqs
        let calculatedBMqs = aiCognitive + buffer
        let isValid = abs(calculatedBMqs - quantumSpeed) < 0.0001
        
        if !isValid {
            violations += 1
            lastViolationTime = Date()
            
            if enforceBuffer {
                return false
            }
        }
        
        // Enforce rate limits
        enforceLLSDTRate()
        
        return true
    }
    
    private func enforceLLSDTRate() {
        // Keep rate within bounds with exact application of buffer
        currentRate = max(minRate, min(currentRate, maxRate))
        
        // Apply buffer to ensure we never max out the rate
        if currentRate > (maxRate - buffer) {
            currentRate = maxRate - buffer
        }
    }
    
    // MARK: - LLSDT Operations
    func calculateLLSDTCapacity(connections: [[String: Any]]) -> Double {
        // Calculate current LLSDT capacity based on connections and rate
        let baseCapacity = currentRate * 10.0
        
        // Adjust for connection complexity
        let connectionFactor = calculateConnectionFactor(connections)
        
        // Apply 0.1 buffer to prevent exceeding capacity
        return min(0.9, baseCapacity * connectionFactor)
    }
    
    private func calculateConnectionFactor(_ connections: [[String: Any]]) -> Double {
        guard !connections.isEmpty else { return 1.0 }
        
        // Calculate average connection strength
        let totalStrength = connections.reduce(0.0) { total, connection in
            if let strength = connection["strength"] as? Double {
                return total + strength
            }
            return total
        }
        let averageStrength = totalStrength / Double(connections.count)
        
        // Apply buffer to ensure mathematical relationship
        return min(1.0 - buffer, averageStrength)
    }
    
    // MARK: - State Management
    func getMetrics() -> [String: Any] {
        return [
            "rate": currentRate,
            "validations": validations,
            "violations": violations,
            "lastViolation": lastViolationTime?.timeIntervalSince1970 ?? 0,
            "quantumState": quantumState
        ]
    }
    
    func updateQuantumState(pure: Bool, fog: Bool, breathing: Bool) {
        quantumState["pure"] = pure
        quantumState["fog"] = fog
        quantumState["breathing"] = breathing
        
        // Adjust rate based on quantum state
        if pure && !fog {
            // Optimal state - increase rate while maintaining buffer
            currentRate = min(maxRate - buffer, currentRate + 0.1)
        } else if fog {
            // Suboptimal state - decrease rate
            currentRate = max(minRate, currentRate - 0.1)
        }
    }
} 