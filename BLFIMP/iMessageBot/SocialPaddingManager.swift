import Foundation

// MARK: - SocialPaddingManager
/// Manages social padding to adapt communication for diverse users
class SocialPaddingManager {
    // MARK: - Padding Levels
    enum PaddingLevel: Int, CaseIterable {
        case none = 0
        case light = 1
        case medium = 2
        case enhanced = 3
        
        var description: String {
            switch self {
            case .none:
                return "Raw V8 power with minimal social padding"
            case .light:
                return "Light social context for basic interactions"
            case .medium:
                return "Balanced communication (default)"
            case .enhanced:
                return "Additional social context for neurotypical communication"
            }
        }
    }
    
    // MARK: - Branches
    enum Branch: String, CaseIterable {
        case standard = "standard"
        case familyFriends = "familyFriends"
        case professional = "professional"
        
        var description: String {
            switch self {
            case .standard:
                return "Standard communication patterns"
            case .familyFriends:
                return "Optimized for casual communication"
            case .professional:
                return "Formatted for business/formal contexts"
            }
        }
    }
    
    // MARK: - Configuration
    private(set) var currentPaddingLevel: PaddingLevel = .light
    private(set) var currentBranch: Branch = .standard
    private var userPatterns: [String: Double] = [:]
    
    // MARK: - Initialization
    init(paddingLevel: PaddingLevel = .light, branch: Branch = .standard) {
        self.currentPaddingLevel = paddingLevel
        self.currentBranch = branch
    }
    
    // MARK: - Configuration Management
    
    /// Set the social padding configuration
    func setConfiguration(paddingLevel: PaddingLevel, branch: Branch) {
        self.currentPaddingLevel = paddingLevel
        self.currentBranch = branch
    }
    
    // MARK: - Pattern Learning
    
    /// Process and learn from user message patterns
    func learnFromMessage(_ message: String) {
        // Skip learning if in the none padding level
        if currentPaddingLevel == .none {
            return
        }
        
        // Basic pattern extraction and learning
        extractPatterns(from: message).forEach { pattern in
            if let existingWeight = userPatterns[pattern] {
                // Reinforce existing pattern
                userPatterns[pattern] = min(1.0, existingWeight + 0.1)
            } else {
                // Add new pattern
                userPatterns[pattern] = 0.3
            }
        }
        
        // Age out old patterns
        userPatterns = userPatterns.mapValues { $0 * 0.95 }
        
        // Remove weak patterns
        userPatterns = userPatterns.filter { $0.value > 0.1 }
    }
    
    // MARK: - Message Adaptation
    
    /// Apply social padding based on current configuration
    func adaptMessage(_ message: String) -> String {
        // Apply branch-specific formatting
        let branchFormatted = applyBranchFormatting(message)
        
        // Return raw message if padding is disabled
        if currentPaddingLevel == .none {
            return branchFormatted
        }
        
        // Apply padding based on level
        return applyPadding(branchFormatted)
    }
    
    // MARK: - Pattern Analysis
    
    /// Extract communication patterns from a message
    private func extractPatterns(from message: String) -> [String] {
        var patterns: [String] = []
        
        // Extract greeting patterns
        let lowerMessage = message.lowercased()
        if lowerMessage.hasPrefix("hi") || lowerMessage.hasPrefix("hello") || lowerMessage.hasPrefix("hey") {
            patterns.append("formal_greeting")
        }
        
        // Extract punctuation patterns
        if message.contains("!") {
            patterns.append("exclamation")
        }
        
        if message.contains("?") {
            patterns.append("question")
        }
        
        // Extract emoji usage
        let emojiPattern = try? NSRegularExpression(pattern: "[\\p{Emoji}]")
        if let matches = emojiPattern?.matches(in: message, range: NSRange(message.startIndex..., in: message)), !matches.isEmpty {
            patterns.append("emoji_user")
        }
        
        // Extract verbosity pattern
        let wordCount = message.split(separator: " ").count
        if wordCount < 5 {
            patterns.append("concise")
        } else if wordCount > 15 {
            patterns.append("verbose")
        }
        
        return patterns
    }
    
    // MARK: - Formatting Utilities
    
    /// Apply branch-specific formatting
    private func applyBranchFormatting(_ message: String) -> String {
        switch currentBranch {
        case .standard:
            return message
            
        case .familyFriends:
            // More casual, possibly with emoji
            let needsGreeting = !message.lowercased().contains("hi") && 
                               !message.lowercased().contains("hey") &&
                               !message.lowercased().contains("hello")
            
            if needsGreeting {
                return "Hey! " + message
            }
            return message
            
        case .professional:
            // More formal language
            var formatted = message
            
            // Ensure proper capitalization
            if let firstChar = formatted.first, !firstChar.isUppercase {
                formatted = formatted.prefix(1).uppercased() + formatted.dropFirst()
            }
            
            // Ensure proper ending
            if !formatted.hasSuffix(".") && !formatted.hasSuffix("!") && !formatted.hasSuffix("?") {
                formatted += "."
            }
            
            return formatted
        }
    }
    
    /// Apply padding based on level
    private func applyPadding(_ message: String) -> String {
        switch currentPaddingLevel {
        case .none:
            return message
            
        case .light:
            // Minimal padding - just ensure basic politeness
            return ensureBasicPoliteness(message)
            
        case .medium:
            // Standard padding - add conversational elements
            return addConversationalElements(message)
            
        case .enhanced:
            // Enhanced padding - personalize based on learned patterns
            return personalizeBasedOnPatterns(message)
        }
    }
    
    /// Ensure basic politeness in messages
    private func ensureBasicPoliteness(_ message: String) -> String {
        let lowerMessage = message.lowercased()
        
        // Add a please for requests
        if lowerMessage.contains("can you") || lowerMessage.contains("would you") || lowerMessage.contains("could you") {
            if !lowerMessage.contains("please") {
                return message + " Please."
            }
        }
        
        return message
    }
    
    /// Add conversational elements
    private func addConversationalElements(_ message: String) -> String {
        var result = message
        
        // Add acknowledgment for questions
        if message.contains("?") && currentBranch != .professional {
            result = "I understand you're asking about this. " + result
        }
        
        return result
    }
    
    /// Personalize message based on learned patterns
    private func personalizeBasedOnPatterns(_ message: String) -> String {
        var result = message
        
        // Apply user's patterns if they frequently use them
        if userPatterns["exclamation", default: 0] > 0.5 && !result.contains("!") {
            result += "!"
        }
        
        if userPatterns["emoji_user", default: 0] > 0.5 && !containsEmoji(result) {
            result += " 👍"
        }
        
        if userPatterns["verbose", default: 0] > 0.5 {
            // Add more context for verbose users
            result = "To provide more detail on this matter: " + result
        }
        
        if userPatterns["concise", default: 0] > 0.5 {
            // Keep it brief for concise users
            result = result.replacingOccurrences(of: "I understand you're asking about this. ", with: "")
        }
        
        return result
    }
    
    /// Check if a string contains emoji
    private func containsEmoji(_ string: String) -> Bool {
        for scalar in string.unicodeScalars {
            if scalar.properties.isEmoji {
                return true
            }
        }
        return false
    }
} 