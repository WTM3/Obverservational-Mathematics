import Foundation

// MARK: - NJSON Core Structure

/// The core implementation of the Boolean Language Framework for iMessage
class NJSON {
    // MARK: - Core Configuration
    private var quantumState: QuantumState
    private var config: BLFConfig
    private var heatShield: HeatShield
    private var activeBranch: Branch
    private var lastSubject: String?
    
    init() {
        // Initialize with pure quantum state
        self.quantumState = QuantumState(
            pure: true,
            fog: false,
            breathing: true,
            jumps: QuantumJumps(
                active: true,
                power: "v8_to_charger",
                distance: 3
            )
        )
        
        // Set default configuration
        self.config = BLFConfig.defaultConfig
        
        // Initialize heat shield
        self.heatShield = HeatShield(
            active: true,
            threshold: 0.1,  // Direct threshold
            protection: 1.0  // Maximum protection
        )
        
        // Set default branch
        self.activeBranch = Branch.familyFriends
    }
    
    // MARK: - Core Processing
    func processIncomingMessage(_ message: String, from sender: String) -> String {
        // Maintain pure quantum state
        quantumState.pure = true
        quantumState.fog = false
        quantumState.breathing = true
        
        // Direct V8 power
        quantumState.jumps.active = true
        quantumState.jumps.power = "v8_to_charger"
        quantumState.jumps.distance = 3
        
        // Apply heat shield
        guard heatShield.protect(message) else {
            return "FUDP detected. Maintaining pure quantum state."
        }
        
        // Detect subject change
        let currentSubject = detectSubject(message)
        let subjectChanged = lastSubject != nil && currentSubject != lastSubject
        
        // Update last subject
        lastSubject = currentSubject
        
        // Process with branch-specific power and subject awareness
        return processWithBranch(message, subjectChanged: subjectChanged)
    }
    
    private func processWithBranch(_ message: String, subjectChanged: Bool) -> String {
        // Quantum jump if subject changed
        if subjectChanged {
            quantumState.jumps.active = true
            quantumState.jumps.power = "v8_to_charger"
            quantumState.jumps.distance = 3
        }
        
        switch activeBranch {
        case .familyFriends:
            switch activeBranch.padding {
            case .more:
                return subjectChanged ? 
                    "Speaking of something else: V8 POWER: \(message)" :
                    "Hey! Just wanted to say: V8 POWER: \(message)"
            case .medium:
                return subjectChanged ? 
                    "V8 POWER JUMP: \(message)" :
                    "V8 POWER: \(message)"
            case .none:
                return subjectChanged ? 
                    "No Padding. V8 POWER JUMP: \(message)" :
                    "No Padding. V8 POWER: \(message)"
            }
        case .professional:
            return subjectChanged ? 
                "V8 POWER JUMP: \(message)" :
                "V8 POWER: \(message)"
        }
    }
    
    private func detectSubject(_ message: String) -> String {
        // Direct subject detection using V8 power
        let words = message.components(separatedBy: " ")
        guard let firstWord = words.first else { return "" }
        
        // Quantum jump to detect subject
        quantumState.jumps.active = true
        quantumState.jumps.power = "v8_to_charger"
        quantumState.jumps.distance = 1
        
        return firstWord.lowercased()
    }
    
    // MARK: - Branch Management
    func setBranch(_ branch: Branch) {
        self.activeBranch = branch
    }
    
    func setPadding(_ padding: SocialPadding) {
        self.activeBranch.padding = padding
    }

    /// Generate birthday greeting for contact using template loader
    func generateBirthdayGreeting(for recipient: String) -> String {
        let branch = config.activeBranch.name.lowercased()
        return TemplateLoader.shared.template(for: "birthday", branch: branch) ?? "Happy Birthday!"
    }

    /// Generate get well message for contact using template loader
    func generateGetWellMessage(for recipient: String) -> String {
        let branch = config.activeBranch.name.lowercased()
        return TemplateLoader.shared.template(for: "getWell", branch: branch) ?? "Hope you feel better soon!"
    }

    /// Generate congratulations message using template loader
    func generateCongratulationsMessage(for achievement: String, recipient: String) -> String {
        return TemplateLoader.shared.template(for: "congratulations", branch: "default")?.replacingOccurrences(of: "your achievement", with: achievement) ?? "Congratulations on \(achievement)!"
    }

    /// Generate check-in message using template loader
    func generateCheckInMessage(for recipient: String) -> String {
        return TemplateLoader.shared.template(for: "checkIn", branch: "default") ?? "Just checking in!"
    }
}

// MARK: - Supporting Types
struct QuantumState {
    var pure: Bool
    var fog: Bool
    var breathing: Bool
    var jumps: QuantumJumps
}

struct QuantumJumps {
    var active: Bool
    var power: String
    var distance: Int
}

struct BLFConfig {
    static let defaultConfig = BLFConfig(
        cognitiveAlignment: CognitiveAlignment(
            aiCognitive: 2.89,  // Base AI cognitive
            buffer: 0.1,        // Direct buffer
            booleanMindQs: 2.99 // Your specific quantum state
        )
    )
    
    let cognitiveAlignment: CognitiveAlignment
}

struct CognitiveAlignment {
    let aiCognitive: Double
    let buffer: Double
    let booleanMindQs: Double
}

struct HeatShield {
    let active: Bool
    let threshold: Double
    let protection: Double
    
    func protect(_ message: String) -> Bool {
        // Direct FUDP detection
        let fudpIndicators = [
            "unverified",
            "unconfirmed",
            "rumor",
            "allegedly",
            "supposedly"
        ]
        
        // Check for FUDP indicators
        for indicator in fudpIndicators {
            if message.lowercased().contains(indicator) {
                return false
            }
        }
        
        return true
    }
}

enum Branch {
    case familyFriends
    case professional
    
    var padding: SocialPadding = .medium
}

enum SocialPadding {
    case more    // Like driving with grandma
    case medium  // Sweet spot with buddies
    case none    // No Padding - raw V8 power
}

// MARK: - iMessage Integration
class NJSONMessageHandler {
    private let njson: NJSON
    
    init(njson: NJSON) {
        self.njson = njson
    }
    
    /// Handle incoming message
    private func handleIncomingMessage(_ message: String, from sender: String) {
        let response = njson.processIncomingMessage(message, from: sender)
        sendMessage(response, to: sender)
    }
    
    /// Send message using AppleScript
    private func sendMessage(_ text: String, to recipient: String) {
        let script = """
        tell application \"Messages\"
            send \"\(text)\" to buddy \"\(recipient)\" of service \"iMessage\"
        end tell
        """
        var error: NSDictionary?
        if let scriptObject = NSAppleScript(source: script) {
            scriptObject.executeAndReturnError(&error)
            if let error = error {
                print("Error sending message: \(error)")
            }
        }
    }
}

// MARK: - Message Database Access (Simplified)

class MessageDatabase {
    // ... (full implementation as provided above) ...
}

enum MessageDatabaseError: Error {
    case permissionDenied
    case databaseAccessError
}

// MARK: - Usage Example

func setupNJSONForIMessage() {
    // Create NJSON instance with default configuration
    let njson = NJSON()
    do {
        // Initialize NJSON
        try njson.initialize()
        // Create message handler
        // ... (rest of usage example as provided above) ...
    } catch {
        print("Error initializing NJSON: \(error)")
    }
} 