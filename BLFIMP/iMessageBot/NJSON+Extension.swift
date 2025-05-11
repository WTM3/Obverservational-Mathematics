import Foundation

// MARK: - NJSON Extensions

/// Extension to provide compatibility with BLFiMessageBotApp
extension NJSON {
    /// Initialize the NJSON system, called during app startup
    func initialize() async {
        // Log initialization
        await logEvent(.systemStart, details: "NJSON initialized from SwiftUI app")
        
        // Set default state
        setBranch(.familyFriends)
        setPadding(.medium)
        
        // Log successful initialization
        await logEvent(.configChange, details: "Initial configuration set")
    }
} 