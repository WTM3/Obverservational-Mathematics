import Foundation

// MARK: - HeatShield
/// Prevents hallucinations by filtering uncertain content
class HeatShield {
    // MARK: - Properties
    
    /// The strength of the heat shield (0.0 to 1.0)
    private let strength: Double
    
    /// Tracks the number of activations
    private(set) var activationCount: Int = 0
    
    /// Stores the last diagnostic result
    private var lastResult: HeatShieldResult? = nil
    
    /// Standard configuration with full strength
    static let standard = HeatShield(strength: 1.0)
    
    // MARK: - Result Struct
    struct HeatShieldResult {
        let pass: Bool
        let uncertaintyScore: Double
        let reason: String?
    }
    
    // MARK: - Initialization
    
    /// Initialize with specific strength
    /// - Parameter strength: Shield strength from 0.0 (disabled) to 1.0 (maximum)
    init(strength: Double = 1.0) {
        self.strength = min(1.0, max(0.0, strength))
    }
    
    // MARK: - Protection Methods
    
    /// Apply heat shield to filter potential hallucinations
    /// - Parameter input: Input text to protect against
    /// - Returns: HeatShieldResult with pass/fail, score, and reason
    func protect(_ input: String) -> HeatShieldResult {
        if strength < 0.1 {
            let result = HeatShieldResult(pass: true, uncertaintyScore: 0.0, reason: nil)
            lastResult = result
            return result
        }
        let uncertaintyScore = calculateUncertaintyScore(in: input)
        let threshold = 0.5 * strength
        // Log warning if uncertainty is high but not blocked
        if uncertaintyScore > 0.3 && uncertaintyScore <= threshold {
            lastResult = HeatShieldResult(pass: true, uncertaintyScore: uncertaintyScore, reason: "warning: uncertainty high")
        }
        // Reject if uncertainty is above threshold
        if uncertaintyScore > threshold {
            activationCount += 1
            let result = HeatShieldResult(pass: false, uncertaintyScore: uncertaintyScore, reason: "uncertainty threshold exceeded")
            lastResult = result
            return result
        }
        // Check for hallucination indicators if strength is high
        if strength > 0.5 {
            if containsHallucinationIndicators(input) {
                activationCount += 1
                let result = HeatShieldResult(pass: false, uncertaintyScore: 1.0, reason: "hallucination indicator detected")
                lastResult = result
                return result
            }
        }
        let result = HeatShieldResult(pass: true, uncertaintyScore: uncertaintyScore, reason: nil)
        lastResult = result
        return result
    }
    
    /// Get the last diagnostic result
    func getLastResult() -> HeatShieldResult? {
        return lastResult
    }
    
    // MARK: - Analysis Methods
    
    /// Calculate uncertainty score for text (now includes rare word frequency)
    private func calculateUncertaintyScore(in text: String) -> Double {
        let lowercased = text.lowercased()
        let uncertaintyMarkers = [
            "i think", "might be", "probably", "could be", "possibly",
            "not sure", "i believe", "perhaps", "maybe", "uncertain",
            "i guess", "appears to", "seems like", "approximately"
        ]
        var markerCount = 0
        for marker in uncertaintyMarkers {
            if lowercased.contains(marker) {
                markerCount += 1
            }
        }
        let markerScore = min(1.0, Double(markerCount) / 5.0)
        // Rare word frequency: count words not in a common English set
        let commonWords: Set<String> = [
            "the","be","to","of","and","a","in","that","have","i","it","for","not","on","with","he","as","you","do","at"
        ]
        let words = lowercased.split { !$0.isLetter }
        let rareWords = words.filter { !commonWords.contains(String($0)) && $0.count > 4 }
        let rareWordScore = min(1.0, Double(rareWords.count) / Double(max(1, words.count)))
        // Combine marker and rare word scores
        return min(1.0, markerScore * 0.7 + rareWordScore * 0.3)
    }
    
    /// Check for hallucination indicators
    private func containsHallucinationIndicators(_ text: String) -> Bool {
        let lowercased = text.lowercased()
        let indicators = [
            "i'm making this up",
            "i don't actually know",
            "i'm guessing",
            "fabricated",
            "hallucinated"
        ]
        for indicator in indicators {
            if lowercased.contains(indicator) {
                return true
            }
        }
        return false
    }
} 