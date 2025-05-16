import Foundation

// MARK: - HeatShield
/// Prevents hallucinations by filtering uncertain content
class HeatShield {
    // MARK: - Properties
    
    /// The strength of the heat shield (0.0 to 1.0)
    private let strength: Double
    
    /// Tracks the number of activations
    private(set) var activationCount: Int = 0
    
    /// Standard configuration with full strength
    static let standard = HeatShield(strength: 1.0)
    
    // MARK: - Initialization
    
    /// Initialize with specific strength
    /// - Parameter strength: Shield strength from 0.0 (disabled) to 1.0 (maximum)
    init(strength: Double = 1.0) {
        self.strength = min(1.0, max(0.0, strength))
    }
    
    // MARK: - Protection Methods
    
    /// Apply heat shield to filter potential hallucinations
    /// - Parameter input: Input text to protect against
    /// - Returns: True if the content passes, false if rejected
    func protect(_ input: String) -> Bool {
        // Base case - no protection in free tier with minimal strength
        if strength < 0.1 {
            return true
        }
        
        // Check for uncertainty markers with strength-based sensitivity
        let uncertaintyScore = calculateUncertaintyScore(in: input)
        let threshold = 0.5 * strength
        
        // Reject if uncertainty is above threshold
        if uncertaintyScore > threshold {
            activationCount += 1
            return false
        }
        
        // Check for hallucination indicators if strength is high
        if strength > 0.5 {
            if containsHallucinationIndicators(input) {
                activationCount += 1
                return false
            }
        }
        
        return true
    }
    
    // MARK: - Analysis Methods
    
    /// Calculate uncertainty score for text
    private func calculateUncertaintyScore(in text: String) -> Double {
        // Lower case for comparison
        let lowercased = text.lowercased()
        
        // Uncertainty markers
        let uncertaintyMarkers = [
            "i think", "might be", "probably", "could be", "possibly",
            "not sure", "i believe", "perhaps", "maybe", "uncertain",
            "i guess", "appears to", "seems like", "approximately"
        ]
        
        // Count occurrences
        var markerCount = 0
        for marker in uncertaintyMarkers {
            if lowercased.contains(marker) {
                markerCount += 1
            }
        }
        
        // Calculate normalized score
        return min(1.0, Double(markerCount) / 5.0)
    }
    
    /// Check for hallucination indicators
    private func containsHallucinationIndicators(_ text: String) -> Bool {
        // Lower case for comparison
        let lowercased = text.lowercased()
        
        // Strong hallucination indicators
        let indicators = [
            "i'm making this up",
            "i don't actually know",
            "i'm guessing",
            "fabricated",
            "hallucinated"
        ]
        
        // Check for any indicator
        for indicator in indicators {
            if lowercased.contains(indicator) {
                return true
            }
        }
        
        return false
    }
} 