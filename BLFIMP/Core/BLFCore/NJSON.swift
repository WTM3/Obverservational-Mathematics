import Foundation

// MARK: - NJSON Core Structure

/// The core implementation of the Boolean Language Framework for iMessage
@available(macOS 10.15, *)
actor NJSON {
    // MARK: - Core Components
    private let blfKey: BLFKey
    private var activeBranch: Branch
    private var lastSubject: String?
    private var subjectDetector: SubjectDetector
    private var templateEngine: TemplateEngine
    
    init() {
        // Initialize with optimized BLF Key (the engine)
        let config = BLFConfig.defaultConfig
        self.blfKey = BLFKey(config: config)
        
        // Set default branch
        self.activeBranch = Branch.familyFriends
        
        // Initialize subject detector
        self.subjectDetector = SubjectDetector()
        
        // Initialize template engine
        self.templateEngine = TemplateEngine()
    }
    
    // MARK: - Core Processing
    func processIncomingMessage(_ message: String, from sender: String) async throws -> String {
        // Detect subject change
        let currentSubject = subjectDetector.detectSubject(message)
        let subjectChanged = lastSubject != nil && currentSubject != lastSubject
        
        // Update last subject
        lastSubject = currentSubject
        
        // First process with the BLF Key (the core engine)
        let processResult = try await blfKey.process(message)
        
        // If processing failed or was rejected, return early
        guard processResult.status == .completed else {
            return processResult.result
        }
        
        // Format with branch-specific templates and subject awareness
        return await formatResponse(processResult.result, subjectChanged: subjectChanged)
    }
    
    private func formatResponse(_ processedMessage: String, subjectChanged: Bool) async -> String {
        // Format based on branch and subject change
        let templateKey = subjectChanged ? "subjectChange" : "standard"
        let branchKey = activeBranch.rawValue
        
        // Get the appropriate template
        return await templateEngine.applyTemplate(
            templateKey: templateKey,
            branchKey: branchKey,
            content: processedMessage,
            paddingLevel: activeBranch.padding.rawValue
        )
    }
    
    // MARK: - Branch Management
    func setBranch(_ branch: Branch) {
        self.activeBranch = branch
    }
    
    func setPadding(_ padding: SocialPadding) {
        self.activeBranch.padding = padding
    }

    // MARK: - Template Management
    
    /// Generate branch-specific message using template engine
    func generateMessage(type: MessageType, recipient: String, parameters: [String: String] = [:]) async throws -> String {
        var params = parameters
        params["recipient"] = recipient
        params["branch"] = activeBranch.rawValue
        
        return try await templateEngine.generateMessage(
            type: type,
            branch: activeBranch.rawValue,
            parameters: params
        )
    }
}

// MARK: - Supporting Types

@available(macOS 10.15, *)
actor SubjectDetector {
    private var subjectCache = NSCache<NSString, NSString>()
    
    func detectSubject(_ message: String) -> String {
        // Cache lookup for performance
        let key = message as NSString
        if let cachedSubject = subjectCache.object(forKey: key) {
            return cachedSubject as String
        }
        
        // Direct subject detection using NLP techniques
        var subject = ""
        
        // Extract subject from message using rules
        let words = message.components(separatedBy: .whitespacesAndNewlines)
        if !words.isEmpty {
            // Simple algorithm: use first significant word as subject
            // In a real implementation, use NLP to extract true subject
            for word in words where word.count > 3 {
                subject = word.lowercased()
                break
            }
        }
        
        // Cache the result
        subjectCache.setObject(subject as NSString, forKey: key)
        
        return subject
    }
}

@available(macOS 10.15, *)
actor TemplateEngine {
    private var templateCache = [String: Template]()
    private var formatter = MessageFormatter()
    
    init() {
        loadTemplates()
    }
    
    private func loadTemplates() {
        // In a real implementation, load from JSON or other source
        // For now, we'll use hardcoded templates
        
        // Standard templates
        templateCache["standard:familyFriends:more"] = Template(format: "Hey! Just wanted to say: %@")
        templateCache["standard:familyFriends:medium"] = Template(format: "%@")
        templateCache["standard:familyFriends:none"] = Template(format: "No Padding. %@")
        templateCache["standard:professional:more"] = Template(format: "Hello, I wanted to share: %@")
        templateCache["standard:professional:medium"] = Template(format: "%@")
        templateCache["standard:professional:none"] = Template(format: "%@")
        
        // Subject change templates
        templateCache["subjectChange:familyFriends:more"] = Template(format: "Speaking of something else: %@")
        templateCache["subjectChange:familyFriends:medium"] = Template(format: "New topic: %@")
        templateCache["subjectChange:familyFriends:none"] = Template(format: "Topic shift. %@")
        templateCache["subjectChange:professional:more"] = Template(format: "Regarding a different matter: %@")
        templateCache["subjectChange:professional:medium"] = Template(format: "On another note: %@")
        templateCache["subjectChange:professional:none"] = Template(format: "New subject: %@")
    }
    
    func applyTemplate(templateKey: String, branchKey: String, content: String, paddingLevel: String) -> String {
        let key = "\(templateKey):\(branchKey):\(paddingLevel)"
        guard let template = templateCache[key] else {
            return content
        }
        
        return template.format(with: content)
    }
    
    func generateMessage(type: MessageType, branch: String, parameters: [String: String]) throws -> String {
        switch type {
        case .birthday:
            return "Happy Birthday, \(parameters["recipient"] ?? "friend")!"
        case .getWell:
            return "Hope you feel better soon, \(parameters["recipient"] ?? "friend")!"
        case .congratulations:
            let achievement = parameters["achievement"] ?? "your achievement"
            return "Congratulations on \(achievement), \(parameters["recipient"] ?? "friend")!"
        case .checkIn:
            return "Just checking in on you, \(parameters["recipient"] ?? "friend")! How are things?"
        }
    }
}

struct Template {
    let format: String
    
    func format(with content: String) -> String {
        return String(format: format, content)
    }
}

@available(macOS 10.15, *)
actor MessageFormatter {
    func format(_ message: String, for branch: Branch, with padding: SocialPadding) -> String {
        switch (branch, padding) {
        case (.familyFriends, .more):
            return "Hey! Just wanted to say: \(message)"
        case (.familyFriends, .medium):
            return message
        case (.familyFriends, .none):
            return "No Padding. \(message)"
        case (.professional, _):
            return message
        }
    }
}

enum Branch: String {
    case familyFriends = "familyFriends"
    case professional = "professional"
    
    var padding: SocialPadding = .medium
}

enum SocialPadding: String {
    case more = "more"      // Like driving with grandma
    case medium = "medium"  // Sweet spot with buddies
    case none = "none"      // No Padding - raw V8 power
}

enum MessageType: String {
    case birthday = "birthday"
    case getWell = "getWell"
    case congratulations = "congratulations"
    case checkIn = "checkIn"
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