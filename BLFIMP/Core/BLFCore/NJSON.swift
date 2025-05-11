import Foundation

// MARK: - NJSON Core Structure

/// The core implementation of the Boolean Language Framework for iMessage
/// Optimized for Boolean Mind qs³ processing capabilities
@available(macOS 10.15, *)
actor NJSON {
    // MARK: - Core Components
    private let blfKey: BLFKey
    private var activeBranch: Branch
    private var lastSubject: String?
    private var subjectCache: [String: String] = [:]
    private var subjectDetector: SubjectDetector
    private var templateEngine: TemplateEngine
    private var cognitiveState: CognitiveState
    
    // MARK: - Configuration
    private let logger = Logger(subsystem: "com.blf.njson", category: "NJSON")
    
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
        
        // Initialize cognitive state
        self.cognitiveState = CognitiveState()
        
        logger.info("NJSON initialized with qs³ optimization and 0.1 hallucination buffer")
    }
    
    // MARK: - Core Processing
    func processIncomingMessage(_ message: String, from sender: String) async throws -> String {
        // Update cognitive state for this processing cycle
        cognitiveState.updateCycle()
        
        // Detect subject change with qs³ optimized detection
        let currentSubject = await subjectDetector.detectSubject(message)
        let subjectChanged = lastSubject != nil && currentSubject != lastSubject
        
        // Update last subject
        lastSubject = currentSubject
        
        // Track conversation state
        if subjectChanged {
            cognitiveState.recordSubjectChange(from: lastSubject ?? "", to: currentSubject)
            logger.debug("Subject changed from '\(lastSubject ?? "none")' to '\(currentSubject)'")
        }
        
        // First process with the BLF Key (the core V8 engine)
        let processStartTime = CFAbsoluteTimeGetCurrent()
        let processResult = try await blfKey.process(message)
        let processingTime = CFAbsoluteTimeGetCurrent() - processStartTime
        
        // Track processing performance
        cognitiveState.recordProcessingTime(processingTime)
        
        // If processing failed or was rejected, return early with appropriate error handling
        guard processResult.status == .completed else {
            logger.warning("Message processing failed with status: \(processResult.status)")
            return processResult.result
        }
        
        // Determine optimal response format based on message characteristics
        let responseFormat = determineOptimalResponseFormat(
            message: message,
            processedContent: processResult.result,
            subjectChanged: subjectChanged
        )
        
        // Format with branch-specific templates and subject awareness
        let formatStartTime = CFAbsoluteTimeGetCurrent()
        let formattedResponse = await formatResponse(
            processResult.result,
            subjectChanged: subjectChanged,
            format: responseFormat
        )
        let formattingTime = CFAbsoluteTimeGetCurrent() - formatStartTime
        
        // Track formatting performance
        cognitiveState.recordFormattingTime(formattingTime)
        
        return formattedResponse
    }
    
    private func determineOptimalResponseFormat(
        message: String,
        processedContent: String,
        subjectChanged: Bool
    ) -> ResponseFormat {
        // Determine optimal response format based on message content and context
        
        // Check for questions
        if message.hasSuffix("?") || 
           message.lowercased().hasPrefix("what") ||
           message.lowercased().hasPrefix("how") ||
           message.lowercased().hasPrefix("why") {
            return .direct
        }
        
        // Check for short messages
        if message.count < 20 {
            return subjectChanged ? .topicChange : .casual
        }
        
        // Check for formal language
        let formalIndicators = ["please", "thank you", "regards", "sincerely", "request"]
        for indicator in formalIndicators {
            if message.lowercased().contains(indicator) {
                return .formal
            }
        }
        
        // Default response format based on branch
        switch activeBranch {
        case .familyFriends:
            return subjectChanged ? .topicChange : .casual
        case .professional:
            return subjectChanged ? .professionalTopicChange : .formal
        }
    }
    
    private func formatResponse(
        _ processedMessage: String,
        subjectChanged: Bool,
        format: ResponseFormat
    ) async -> String {
        // Format based on branch, subject change, and optimal format
        let branchKey = activeBranch.rawValue
        let paddingLevel = activeBranch.padding.rawValue
        
        // Get the appropriate template
        let response = await templateEngine.applyTemplate(
            format: format,
            branchKey: branchKey,
            content: processedMessage,
            paddingLevel: paddingLevel
        )
        
        // Update cognitive state with response data
        cognitiveState.recordResponseLength(response.count)
        
        return response
    }
    
    // MARK: - Branch Management
    func setBranch(_ branch: Branch) {
        self.activeBranch = branch
        logger.debug("Branch set to \(branch.rawValue)")
    }
    
    func setPadding(_ padding: SocialPadding) {
        self.activeBranch.padding = padding
        logger.debug("Padding set to \(padding.rawValue)")
    }

    // MARK: - Template Management
    
    /// Generate branch-specific message using template engine
    func generateMessage(type: MessageType, recipient: String, parameters: [String: String] = [:]) async throws -> String {
        var params = parameters
        params["recipient"] = recipient
        params["branch"] = activeBranch.rawValue
        
        // Track template usage
        cognitiveState.recordTemplateUsage(type: type.rawValue)
        
        return try await templateEngine.generateMessage(
            type: type,
            branch: activeBranch.rawValue,
            parameters: params
        )
    }
    
    // MARK: - Cognitive State Reporting
    
    /// Get current cognitive state metrics
    func getCognitiveState() -> CognitiveStateReport {
        return cognitiveState.generateReport()
    }
}

// MARK: - Supporting Types

/// Cognitive state tracking for NJSON processing
@available(macOS 10.15, *)
class CognitiveState {
    private var processingCycles: Int = 0
    private var totalProcessingTime: Double = 0
    private var totalFormattingTime: Double = 0
    private var subjectChanges: Int = 0
    private var responseCharacters: Int = 0
    private var templateUsage: [String: Int] = [:]
    private var subjectHistory: [String] = []
    
    func updateCycle() {
        processingCycles += 1
    }
    
    func recordProcessingTime(_ time: Double) {
        totalProcessingTime += time
    }
    
    func recordFormattingTime(_ time: Double) {
        totalFormattingTime += time
    }
    
    func recordSubjectChange(from oldSubject: String, to newSubject: String) {
        subjectChanges += 1
        if !newSubject.isEmpty {
            subjectHistory.append(newSubject)
            
            // Keep history to last 10 subjects
            if subjectHistory.count > 10 {
                subjectHistory.removeFirst()
            }
        }
    }
    
    func recordResponseLength(_ characters: Int) {
        responseCharacters += characters
    }
    
    func recordTemplateUsage(type: String) {
        templateUsage[type, default: 0] += 1
    }
    
    func generateReport() -> CognitiveStateReport {
        let averageProcessingTime = processingCycles > 0 ? totalProcessingTime / Double(processingCycles) : 0
        let averageFormattingTime = processingCycles > 0 ? totalFormattingTime / Double(processingCycles) : 0
        let averageResponseLength = processingCycles > 0 ? Double(responseCharacters) / Double(processingCycles) : 0
        
        return CognitiveStateReport(
            processingCycles: processingCycles,
            averageProcessingTime: averageProcessingTime,
            averageFormattingTime: averageFormattingTime,
            subjectChanges: subjectChanges,
            averageResponseLength: Int(averageResponseLength),
            recentSubjects: subjectHistory,
            templateUsage: templateUsage
        )
    }
}

struct CognitiveStateReport {
    let processingCycles: Int
    let averageProcessingTime: Double
    let averageFormattingTime: Double
    let subjectChanges: Int
    let averageResponseLength: Int
    let recentSubjects: [String]
    let templateUsage: [String: Int]
}

@available(macOS 10.15, *)
actor SubjectDetector {
    private var subjectCache = NSCache<NSString, NSString>()
    private var frequentSubjects: [String: Int] = [:]
    
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
            // Apply Boolean Mind quantum speed subject extraction
            subject = extractSubjectWithQsOptimization(from: words)
        }
        
        // If subject extracted, cache and update frequency
        if !subject.isEmpty {
            // Cache the result
            subjectCache.setObject(subject as NSString, forKey: key)
            
            // Update frequency count
            frequentSubjects[subject, default: 0] += 1
        }
        
        return subject
    }
    
    private func extractSubjectWithQsOptimization(from words: [String]) -> String {
        // Skip common non-subject words
        let nonSubjectStarters = ["the", "a", "an", "and", "but", "or", "so", "because", "if", "when", "while"]
        
        // Keywords that often indicate the core subject follows
        let subjectIndicators = ["about", "regarding", "concerning", "on", "for"]
        
        // Find potential subjects using indicator words
        for (index, word) in words.enumerated() {
            let lowerWord = word.lowercased()
            
            if subjectIndicators.contains(lowerWord) && index < words.count - 1 {
                // Subject likely follows this indicator word
                let candidate = words[index + 1].lowercased()
                if candidate.count > 3 && !nonSubjectStarters.contains(candidate) {
                    return candidate
                }
            }
        }
        
        // Default approach: first significant word as subject
        for word in words {
            let candidate = word.lowercased()
            if candidate.count > 3 && !nonSubjectStarters.contains(candidate) {
                return candidate
            }
        }
        
        // Fallback if no subject found
        return words.first?.lowercased() ?? ""
    }
    
    /// Get the most frequent subjects detected
    func getFrequentSubjects(limit: Int = 5) -> [(subject: String, count: Int)] {
        return frequentSubjects
            .sorted { $0.value > $1.value }
            .prefix(limit)
            .map { (subject: $0.key, count: $0.value) }
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
        // Load Boolean Mind optimized templates
        
        // Casual templates (standard conversation)
        templateCache["casual:familyFriends:more"] = Template(format: "Hey! %@")
        templateCache["casual:familyFriends:medium"] = Template(format: "%@")
        templateCache["casual:familyFriends:none"] = Template(format: "%@")
        
        // Topic change templates
        templateCache["topicChange:familyFriends:more"] = Template(format: "Speaking of something else: %@")
        templateCache["topicChange:familyFriends:medium"] = Template(format: "New topic: %@")
        templateCache["topicChange:familyFriends:none"] = Template(format: "%@")
        
        // Direct answer templates (for questions)
        templateCache["direct:familyFriends:more"] = Template(format: "%@")
        templateCache["direct:familyFriends:medium"] = Template(format: "%@")
        templateCache["direct:familyFriends:none"] = Template(format: "%@")
        
        // Formal templates
        templateCache["formal:professional:more"] = Template(format: "Hello, %@")
        templateCache["formal:professional:medium"] = Template(format: "%@")
        templateCache["formal:professional:none"] = Template(format: "%@")
        
        // Professional topic change
        templateCache["professionalTopicChange:professional:more"] = Template(format: "Regarding a different matter: %@")
        templateCache["professionalTopicChange:professional:medium"] = Template(format: "On another note: %@")
        templateCache["professionalTopicChange:professional:none"] = Template(format: "%@")
    }
    
    func applyTemplate(
        format: ResponseFormat,
        branchKey: String,
        content: String,
        paddingLevel: String
    ) -> String {
        let key = "\(format.rawValue):\(branchKey):\(paddingLevel)"
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
            return "Hey! \(message)"
        case (.familyFriends, .medium):
            return message
        case (.familyFriends, .none):
            return message
        case (.professional, _):
            return message
        }
    }
}

enum ResponseFormat: String {
    case casual = "casual"              // General conversation
    case topicChange = "topicChange"    // Subject has changed
    case direct = "direct"              // Direct answer to a question
    case formal = "formal"              // Formal/professional response
    case professionalTopicChange = "professionalTopicChange" // Professional context topic change
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
@available(macOS 10.15, *)
actor NJSONMessageHandler {
    private let njson: NJSON
    private let logger = Logger(subsystem: "com.blf.njson", category: "MessageHandler")
    
    init(njson: NJSON) {
        self.njson = njson
    }
    
    /// Handle incoming message
    func handleIncomingMessage(_ message: String, from sender: String) async {
        do {
            let response = try await njson.processIncomingMessage(message, from: sender)
            try await sendMessage(response, to: sender)
            logger.debug("Message processed and response sent to \(sender)")
        } catch {
            logger.error("Error handling message: \(error.localizedDescription)")
        }
    }
    
    /// Send message using AppleScript
    private func sendMessage(_ text: String, to recipient: String) async throws {
        let script = """
        tell application "Messages"
            set targetService to 1st service whose service type = iMessage
            set targetBuddy to buddy "\(recipient)" of targetService
            send "\(text)" to targetBuddy
        end tell
        """
        
        // Execute AppleScript with proper error handling
        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/usr/bin/osascript")
        process.arguments = ["-e", script]
        
        let outputPipe = Pipe()
        let errorPipe = Pipe()
        
        process.standardOutput = outputPipe
        process.standardError = errorPipe
        
        do {
            try process.run()
            process.waitUntilExit()
            
            if process.terminationStatus != 0 {
                let errorData = errorPipe.fileHandleForReading.readDataToEndOfFile()
                let errorMessage = String(data: errorData, encoding: .utf8) ?? "Unknown error"
                throw NJSONError.messageSendingFailed(errorMessage)
            }
        } catch {
            throw NJSONError.messageSendingFailed(error.localizedDescription)
        }
    }
}

// MARK: - Error Types
enum NJSONError: Error {
    case messageSendingFailed(String)
    case processingFailed(String)
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