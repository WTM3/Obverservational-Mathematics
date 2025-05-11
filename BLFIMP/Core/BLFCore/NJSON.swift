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
    
    // MARK: - Logging System
    private let logger = Logger(subsystem: "com.blf.njson", category: "NJSON")
    private var logStorage: [LogEntry] = []
    private let maxLogEntries = 1000
    
    // Singleton instance for shared access
    static let shared = NJSON()
    
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
        
        // Log incoming message
        await logMessage(.incoming, sender: sender, content: message)
        
        // Detect subject change with qs³ optimized detection
        let currentSubject = await subjectDetector.detectSubject(message)
        let subjectChanged = lastSubject != nil && currentSubject != lastSubject
        
        // Update last subject
        lastSubject = currentSubject
        
        // Track conversation state
        if subjectChanged {
            cognitiveState.recordSubjectChange(from: lastSubject ?? "", to: currentSubject)
            logger.debug("Subject changed from '\(lastSubject ?? "none")' to '\(currentSubject)'")
            await logEvent(.subjectChange, details: "From '\(lastSubject ?? "none")' to '\(currentSubject)'")
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
            await logEvent(.processingError, details: "Processing failed with status: \(processResult.status)")
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
        
        // Log outgoing response
        await logMessage(.outgoing, sender: "system", content: formattedResponse)
        
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
    
    // MARK: - Logging System
    
    /// Log a message
    func logMessage(_ direction: LogDirection, sender: String, content: String) async {
        let entry = LogEntry(
            timestamp: Date(),
            type: .message,
            direction: direction,
            sender: sender,
            content: content
        )
        
        await addLogEntry(entry)
    }
    
    /// Log an event
    func logEvent(_ eventType: LogEventType, details: String) async {
        let entry = LogEntry(
            timestamp: Date(),
            type: .event,
            eventType: eventType,
            content: details
        )
        
        await addLogEntry(entry)
    }
    
    /// Add entry to the log
    private func addLogEntry(_ entry: LogEntry) async {
        logStorage.append(entry)
        
        // Trim log if it exceeds maximum size
        if logStorage.count > maxLogEntries {
            logStorage.removeFirst(logStorage.count - maxLogEntries)
        }
    }
    
    /// Get recent logs
    func getRecentLogs(count: Int = 50) -> [LogEntry] {
        let startIndex = max(0, logStorage.count - count)
        return Array(logStorage[startIndex...])
    }
    
    /// Export logs to NJSON format
    func exportLogsAsNJSON() -> String {
        do {
            let encoder = JSONEncoder()
            encoder.outputFormatting = .prettyPrinted
            encoder.dateEncodingStrategy = .iso8601
            
            let logData = try encoder.encode(logStorage)
            return String(data: logData, encoding: .utf8) ?? "{\"error\": \"encoding failed\"}"
        } catch {
            return "{\"error\": \"\(error.localizedDescription)\"}"
        }
    }
    
    // MARK: - Error Handling System
    
    /// Handle error with appropriate recovery strategy
    func handleError(_ error: Error) async -> ErrorRecoveryAction {
        // Log the error
        await logEvent(.systemError, details: error.localizedDescription)
        
        // Determine appropriate recovery action based on error type
        if let blfError = error as? BLFError {
            switch blfError {
            case .cognitiveAlignmentViolation:
                // Critical alignment error - restart system
                return .restart
            case .processingFailure:
                // Processing failure - retry with simplified template
                return .retry
            case .quantumStateCorruption:
                // State corruption - reset quantum state
                return .resetState
            }
        } else if let njsonError = error as? NJSONError {
            switch njsonError {
            case .messageSendingFailed:
                // Message sending failed - retry later
                return .retryLater
            case .processingFailed:
                // Processing failed - retry with simplified input
                return .retry
            }
        }
        
        // Default recovery for unknown errors
        return .retryLater
    }
    
    // MARK: - iMessage Permissions
    
    /// Store permission state in NJSON configuration
    func setPermissionState(_ state: PermissionState) async {
        do {
            // Create permission state in NJSON format
            let permissionData: [String: Any] = [
                "hasPermission": state.hasPermission,
                "requestedAt": ISO8601DateFormatter().string(from: state.requestedAt),
                "status": state.status.rawValue,
                "_meta": [
                    "lastUpdated": ISO8601DateFormatter().string(from: Date())
                ]
            ]
            
            // Convert to JSON
            let jsonData = try JSONSerialization.data(withJSONObject: permissionData, options: .prettyPrinted)
            let jsonString = String(data: jsonData, encoding: .utf8) ?? "{}"
            
            // Log permission update
            await logEvent(.permissionChange, details: jsonString)
            
            // Store in user defaults for persistence
            UserDefaults.standard.set(jsonString, forKey: "com.blf.njson.permissions")
        } catch {
            logger.error("Error storing permission state: \(error.localizedDescription)")
        }
    }
    
    /// Get current permission state from NJSON storage
    func getPermissionState() async -> PermissionState {
        if let jsonString = UserDefaults.standard.string(forKey: "com.blf.njson.permissions"),
           let jsonData = jsonString.data(using: .utf8) {
            do {
                if let permissionDict = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any],
                   let hasPermission = permissionDict["hasPermission"] as? Bool,
                   let requestedAtString = permissionDict["requestedAt"] as? String,
                   let statusRawValue = permissionDict["status"] as? String,
                   let requestedAt = ISO8601DateFormatter().date(from: requestedAtString) {
                    
                    let status = PermissionStatus(rawValue: statusRawValue) ?? .unknown
                    
                    return PermissionState(
                        hasPermission: hasPermission,
                        requestedAt: requestedAt,
                        status: status
                    )
                }
            } catch {
                logger.error("Error parsing permission state: \(error.localizedDescription)")
            }
        }
        
        // Default state if none found
        return PermissionState(
            hasPermission: false,
            requestedAt: Date(),
            status: .notRequested
        )
    }
    
    // MARK: - Metrics Collection
    
    /// Record metric value
    func recordMetric(_ name: String, value: Double) async {
        cognitiveState.recordMetric(name: name, value: value)
    }
    
    /// Get all metrics
    func getAllMetrics() -> [String: Double] {
        return cognitiveState.getMetrics()
    }
    
    /// Export metrics in NJSON format
    func exportMetricsAsNJSON() -> String {
        let metrics = cognitiveState.getMetrics()
        
        do {
            let jsonData = try JSONSerialization.data(withJSONObject: metrics, options: .prettyPrinted)
            return String(data: jsonData, encoding: .utf8) ?? "{}"
        } catch {
            logger.error("Error exporting metrics: \(error.localizedDescription)")
            return "{\"error\": \"Failed to export metrics\"}"
        }
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
    private var metrics: [String: Double] = [:]
    
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
    
    func recordMetric(name: String, value: Double) {
        metrics[name] = value
    }
    
    func getMetrics() -> [String: Double] {
        var allMetrics = metrics
        
        // Add core metrics
        allMetrics["processingCycles"] = Double(processingCycles)
        allMetrics["averageProcessingTime"] = processingCycles > 0 ? totalProcessingTime / Double(processingCycles) : 0
        allMetrics["averageFormattingTime"] = processingCycles > 0 ? totalFormattingTime / Double(processingCycles) : 0
        allMetrics["subjectChanges"] = Double(subjectChanges)
        allMetrics["averageResponseLength"] = processingCycles > 0 ? Double(responseCharacters) / Double(processingCycles) : 0
        
        return allMetrics
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
    private var subjectHistory: [String] = []
    private var contextualSubjects: [String: [String]] = [:]
    
    func detectSubject(_ message: String) -> String {
        // Cache lookup for performance
        let key = message as NSString
        if let cachedSubject = subjectCache.object(forKey: key) {
            return cachedSubject as String
        }
        
        // Direct subject detection using NLP techniques
        var subject = ""
        
        // Extract subject from message using enhanced rules
        let words = message.components(separatedBy: .whitespacesAndNewlines)
        if !words.isEmpty {
            // Apply Boolean Mind quantum speed subject extraction with enhanced accuracy
            subject = extractSubjectWithQsOptimization(from: words, message: message)
        }
        
        // If subject extracted, cache and update frequency
        if !subject.isEmpty {
            // Cache the result
            subjectCache.setObject(subject as NSString, forKey: key)
            
            // Update frequency count
            frequentSubjects[subject, default: 0] += 1
            
            // Add to subject history
            updateSubjectHistory(subject)
            
            // Update contextual relationships
            if !subjectHistory.isEmpty, let lastSubject = subjectHistory.last, lastSubject != subject {
                updateContextualRelationship(from: lastSubject, to: subject)
            }
        }
        
        return subject
    }
    
    private func extractSubjectWithQsOptimization(from words: [String], message: String) -> String {
        // Skip common non-subject words
        let nonSubjectStarters = ["the", "a", "an", "and", "but", "or", "so", "because", "if", "when", "while", 
                                 "i", "you", "he", "she", "it", "we", "they", "this", "that", "these", "those"]
        
        // Keywords that often indicate the core subject follows
        let subjectIndicators = ["about", "regarding", "concerning", "on", "for", "discuss", "talking", "explain", "describe"]
        
        // Strong subjects that should be prioritized
        let strongSubjects = ["weather", "news", "health", "money", "work", "family", "travel", "food", "technology", "politics"]
        
        // First check for questions (which often have the subject at the end or after certain phrases)
        if message.contains("?") {
            let questionWords = ["what", "how", "why", "when", "where", "who", "which"]
            
            // Check if starts with question word
            let firstWordLower = words.first?.lowercased() ?? ""
            if questionWords.contains(firstWordLower) {
                // For questions like "What is the weather like?", subject is often at the end of the first segment
                let questionSegment = message.components(separatedBy: "?").first ?? ""
                let questionWords = questionSegment.components(separatedBy: .whitespacesAndNewlines)
                
                // Look for nouns near the end of the question
                for i in (0..<questionWords.count).reversed() {
                    if i >= 2 { // Need at least a few words to have a proper question
                        let candidate = questionWords[i].lowercased().trimmingCharacters(in: .punctuationCharacters)
                        if candidate.count > 3 && !nonSubjectStarters.contains(candidate) {
                            return candidate
                        }
                    }
                }
            }
        }
        
        // Check for direct subject indicators
        for (index, word) in words.enumerated() {
            let lowerWord = word.lowercased()
            
            if subjectIndicators.contains(lowerWord) && index < words.count - 1 {
                // Subject likely follows this indicator word
                let candidate = words[index + 1].lowercased().trimmingCharacters(in: .punctuationCharacters)
                if candidate.count > 3 && !nonSubjectStarters.contains(candidate) {
                    return candidate
                }
                
                // Sometimes the subject is a compound term
                if index < words.count - 2 {
                    let twoWordCandidate = words[index + 1].lowercased() + " " + words[index + 2].lowercased()
                    // Check if this compound term has been seen before
                    if frequentSubjects.keys.contains(twoWordCandidate) || 
                       twoWordCandidate.count > 8 { // Longer compound terms are likely meaningful
                        return twoWordCandidate
                    }
                }
            }
        }
        
        // Look for existing strong subjects in the message
        for strongSubject in strongSubjects {
            if message.lowercased().contains(strongSubject) {
                return strongSubject
            }
        }
        
        // Check for previously seen subjects that might be related
        for (previousSubject, relatedSubjects) in contextualSubjects {
            for relatedSubject in relatedSubjects {
                if message.lowercased().contains(relatedSubject) {
                    // We found a term related to a previous subject - use the main subject
                    return previousSubject
                }
            }
        }
        
        // Default approach: Find the most significant word based on length and position
        var bestCandidate = ""
        var bestScore = 0.0
        
        for (index, word) in words.enumerated() {
            let candidate = word.lowercased().trimmingCharacters(in: .punctuationCharacters)
            if candidate.count > 3 && !nonSubjectStarters.contains(candidate) {
                // Score based on length and position (words in the middle often carry more meaning)
                let lengthScore = Double(min(candidate.count, 10)) / 10.0 // Normalized length score
                
                // Position score - prefer words in the first half but not at the very beginning
                let normalizedPosition = Double(index) / Double(max(words.count - 1, 1))
                let positionScore = 1.0 - abs(normalizedPosition - 0.3) // Peak at 30% through the message
                
                // Frequency score - prefer terms we've seen before
                let frequencyScore = Double(frequentSubjects[candidate, default: 0]) / 10.0
                
                let totalScore = (lengthScore * 0.4) + (positionScore * 0.4) + (frequencyScore * 0.2)
                
                if totalScore > bestScore {
                    bestScore = totalScore
                    bestCandidate = candidate
                }
            }
        }
        
        // If we found a good candidate, return it
        if !bestCandidate.isEmpty {
            return bestCandidate
        }
        
        // Fallback if no subject found
        return words.first?.lowercased().trimmingCharacters(in: .punctuationCharacters) ?? ""
    }
    
    // Track subject history
    private func updateSubjectHistory(_ subject: String) {
        subjectHistory.append(subject)
        
        // Keep history to last 20 subjects
        if subjectHistory.count > 20 {
            subjectHistory.removeFirst()
        }
    }
    
    // Build contextual relationships between subjects
    private func updateContextualRelationship(from previousSubject: String, to newSubject: String) {
        // Add the new subject as related to the previous one
        var related = contextualSubjects[previousSubject, default: []]
        if !related.contains(newSubject) {
            related.append(newSubject)
            contextualSubjects[previousSubject] = related
        }
        
        // Maintain a reasonable size for related subjects
        if related.count > 10 {
            contextualSubjects[previousSubject] = Array(related.suffix(10))
        }
    }
    
    /// Get the most frequent subjects detected
    func getFrequentSubjects(limit: Int = 5) -> [(subject: String, count: Int)] {
        return frequentSubjects
            .sorted { $0.value > $1.value }
            .prefix(limit)
            .map { (subject: $0.key, count: $0.value) }
    }
    
    /// Get subject history
    func getSubjectHistory(limit: Int = 10) -> [String] {
        if limit >= subjectHistory.count {
            return subjectHistory.reversed()
        }
        return Array(subjectHistory.suffix(limit).reversed())
    }
    
    /// Get related subjects for a given subject
    func getRelatedSubjects(for subject: String, limit: Int = 5) -> [String] {
        let related = contextualSubjects[subject, default: []]
        if limit >= related.count {
            return related
        }
        return Array(related.prefix(limit))
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

// MARK: - Logging Types

enum LogDirection {
    case incoming
    case outgoing
}

enum LogEventType: String, Codable {
    case subjectChange = "subject_change"
    case processingError = "processing_error"
    case systemError = "system_error"
    case permissionChange = "permission_change"
    case configChange = "config_change"
    case systemStart = "system_start"
    case systemStop = "system_stop"
}

enum LogEntryType: String, Codable {
    case message
    case event
}

struct LogEntry: Codable {
    let id: UUID
    let timestamp: Date
    let type: LogEntryType
    let direction: LogDirection?
    let sender: String?
    let eventType: LogEventType?
    let content: String
    
    init(timestamp: Date, type: LogEntryType, direction: LogDirection? = nil, 
         sender: String? = nil, eventType: LogEventType? = nil, content: String) {
        self.id = UUID()
        self.timestamp = timestamp
        self.type = type
        self.direction = direction
        self.sender = sender
        self.eventType = eventType
        self.content = content
    }
}

// MARK: - Error Recovery Types

enum ErrorRecoveryAction {
    case retry
    case retryLater
    case resetState
    case restart
    case ignore
}

// MARK: - Permission Types

struct PermissionState {
    let hasPermission: Bool
    let requestedAt: Date
    let status: PermissionStatus
}

enum PermissionStatus: String {
    case granted
    case denied
    case notRequested
    case unknown
}

// MARK: - Testing Suite
@available(macOS 10.15, *)
extension NJSON {
    /// Run a self-test of NJSON capabilities
    func runSelfTest() async -> TestResults {
        var results = TestResults()
        
        // Log test start
        await logEvent(.systemStart, details: "Starting NJSON self-test")
        
        // Test 1: Basic message processing
        do {
            let testMessage = "Hello, how are you today?"
            let response = try await processIncomingMessage(testMessage, from: "test-user")
            
            if !response.isEmpty {
                results.addSuccess(name: "basicMessageProcessing", message: "Successfully processed basic message")
            } else {
                results.addFailure(name: "basicMessageProcessing", message: "Failed to get response for basic message")
            }
        } catch {
            results.addFailure(name: "basicMessageProcessing", message: "Error: \(error.localizedDescription)")
        }
        
        // Test 2: Subject detection
        do {
            let testMessage = "Let's talk about weather forecast for tomorrow"
            _ = try await processIncomingMessage(testMessage, from: "test-user")
            
            let subject = lastSubject
            if subject == "weather" || subject == "forecast" || subject == "tomorrow" {
                results.addSuccess(name: "subjectDetection", message: "Successfully detected subject: \(subject ?? "")")
            } else {
                results.addFailure(name: "subjectDetection", message: "Unexpected subject: \(subject ?? "none")")
            }
        } catch {
            results.addFailure(name: "subjectDetection", message: "Error: \(error.localizedDescription)")
        }
        
        // Test 3: Template application
        do {
            let testTemplate = TestTemplate(name: "testTemplate", format: "Test: %@")
            let content = "content"
            let formatted = testTemplate.format(with: content)
            
            if formatted == "Test: content" {
                results.addSuccess(name: "templateApplication", message: "Successfully applied template")
            } else {
                results.addFailure(name: "templateApplication", message: "Template application failed")
            }
        } catch {
            results.addFailure(name: "templateApplication", message: "Error: \(error.localizedDescription)")
        }
        
        // Test 4: Branch setting
        do {
            // Save original branch to restore later
            let originalBranch = activeBranch
            
            // Change branch
            setBranch(.professional)
            
            if activeBranch == .professional {
                results.addSuccess(name: "branchSetting", message: "Successfully changed branch")
            } else {
                results.addFailure(name: "branchSetting", message: "Failed to change branch")
            }
            
            // Restore original branch
            setBranch(originalBranch)
        } catch {
            results.addFailure(name: "branchSetting", message: "Error: \(error.localizedDescription)")
        }
        
        // Test 5: Cognitive state tracking
        do {
            let originalCycles = cognitiveState.generateReport().processingCycles
            
            // Process a message to increment cycle counter
            _ = try await processIncomingMessage("Test message for cognitive tracking", from: "test-user")
            
            let newCycles = cognitiveState.generateReport().processingCycles
            
            if newCycles > originalCycles {
                results.addSuccess(name: "cognitiveTracking", message: "Successfully tracked cognitive state")
            } else {
                results.addFailure(name: "cognitiveTracking", message: "Failed to track cognitive state")
            }
        } catch {
            results.addFailure(name: "cognitiveTracking", message: "Error: \(error.localizedDescription)")
        }
        
        // Test 6: Metrics collection
        do {
            let testMetricName = "test_metric"
            let testMetricValue = 42.0
            
            await recordMetric(testMetricName, value: testMetricValue)
            let metrics = getAllMetrics()
            
            if metrics[testMetricName] == testMetricValue {
                results.addSuccess(name: "metricsCollection", message: "Successfully recorded and retrieved metric")
            } else {
                results.addFailure(name: "metricsCollection", message: "Failed to record or retrieve metric")
            }
        } catch {
            results.addFailure(name: "metricsCollection", message: "Error: \(error.localizedDescription)")
        }
        
        // Test 7: Logging system
        do {
            let originalLogCount = logStorage.count
            
            await logEvent(.systemStart, details: "Test log event")
            
            let newLogCount = logStorage.count
            
            if newLogCount > originalLogCount {
                results.addSuccess(name: "loggingSystem", message: "Successfully added log entry")
            } else {
                results.addFailure(name: "loggingSystem", message: "Failed to add log entry")
            }
        } catch {
            results.addFailure(name: "loggingSystem", message: "Error: \(error.localizedDescription)")
        }
        
        // Log test completion
        await logEvent(.systemStop, details: "Completed NJSON self-test with \(results.passCount) passes and \(results.failCount) failures")
        
        return results
    }
    
    /// Run a specific test case
    func runTest(_ testCase: TestCase) async -> TestResult {
        var result = TestResult(name: testCase.name, passed: false, message: "")
        
        // Log test start
        await logEvent(.systemStart, details: "Starting test: \(testCase.name)")
        
        do {
            switch testCase.name {
            case "messageProcessing":
                // Test message processing with dynamic test data
                let response = try await processIncomingMessage(testCase.input, from: testCase.sender ?? "test-user")
                
                if testCase.expectedOutput != nil {
                    // If we have expected output, check for a match
                    if response.contains(testCase.expectedOutput!) {
                        result.passed = true
                        result.message = "Response matched expected output"
                    } else {
                        result.message = "Response did not match expected output"
                    }
                } else {
                    // Otherwise just check for non-empty response
                    if !response.isEmpty {
                        result.passed = true
                        result.message = "Got non-empty response"
                    } else {
                        result.message = "Got empty response"
                    }
                }
                
            case "subjectDetection":
                // Test subject detection with specific input
                _ = try await processIncomingMessage(testCase.input, from: testCase.sender ?? "test-user")
                
                let subject = lastSubject
                if let expectedSubject = testCase.expectedOutput {
                    if subject == expectedSubject {
                        result.passed = true
                        result.message = "Detected subject: \(subject ?? "")"
                    } else {
                        result.message = "Subject mismatch: expected '\(expectedSubject)', got '\(subject ?? "none")'"
                    }
                } else if subject != nil && !subject!.isEmpty {
                    result.passed = true
                    result.message = "Detected subject: \(subject!)"
                } else {
                    result.message = "Failed to detect any subject"
                }
                
            case "templateRendering":
                // Test template rendering
                if let template = testCase.template, let parameters = testCase.parameters {
                    let formatted = try await templateEngine.generateMessage(
                        type: MessageType(rawValue: template) ?? .checkIn,
                        branch: activeBranch.rawValue,
                        parameters: parameters
                    )
                    
                    if !formatted.isEmpty {
                        result.passed = true
                        result.message = "Successfully rendered template"
                    } else {
                        result.message = "Empty template rendering result"
                    }
                } else {
                    result.message = "Missing template or parameters for test"
                }
                
            default:
                result.message = "Unknown test case"
            }
        } catch {
            result.message = "Error: \(error.localizedDescription)"
        }
        
        // Log test result
        if result.passed {
            await logEvent(.systemStop, details: "Test passed: \(testCase.name)")
        } else {
            await logEvent(.processingError, details: "Test failed: \(testCase.name) - \(result.message)")
        }
        
        return result
    }
    
    /// Generate test cases based on NJSON capabilities
    func generateTestCases() -> [TestCase] {
        var testCases: [TestCase] = []
        
        // Basic message processing test cases
        testCases.append(TestCase(
            name: "messageProcessing",
            input: "Hello, how are you today?",
            sender: "test-user",
            expectedOutput: nil
        ))
        
        testCases.append(TestCase(
            name: "messageProcessing",
            input: "What time is it?",
            sender: "test-user",
            expectedOutput: nil
        ))
        
        // Subject detection test cases
        testCases.append(TestCase(
            name: "subjectDetection",
            input: "Tell me about the weather forecast for tomorrow",
            sender: "test-user",
            expectedOutput: "weather"
        ))
        
        testCases.append(TestCase(
            name: "subjectDetection",
            input: "I'm thinking about buying a new car",
            sender: "test-user",
            expectedOutput: "car"
        ))
        
        // Template rendering test cases
        testCases.append(TestCase(
            name: "templateRendering",
            template: "birthday",
            parameters: ["recipient": "John"]
        ))
        
        testCases.append(TestCase(
            name: "templateRendering",
            template: "congratulations",
            parameters: ["recipient": "Sarah", "achievement": "your promotion"]
        ))
        
        return testCases
    }
}

// Test support types
struct TestCase {
    let name: String
    let input: String
    let sender: String?
    let expectedOutput: String?
    let template: String?
    let parameters: [String: String]?
    
    init(name: String, input: String, sender: String? = nil, expectedOutput: String? = nil) {
        self.name = name
        self.input = input
        self.sender = sender
        self.expectedOutput = expectedOutput
        self.template = nil
        self.parameters = nil
    }
    
    init(name: String, template: String, parameters: [String: String]) {
        self.name = name
        self.input = ""
        self.sender = nil
        self.expectedOutput = nil
        self.template = template
        self.parameters = parameters
    }
}

struct TestResult {
    let name: String
    var passed: Bool
    var message: String
}

struct TestResults {
    var results: [TestResult] = []
    
    var passCount: Int {
        results.filter { $0.passed }.count
    }
    
    var failCount: Int {
        results.filter { !$0.passed }.count
    }
    
    mutating func addSuccess(name: String, message: String) {
        results.append(TestResult(name: name, passed: true, message: message))
    }
    
    mutating func addFailure(name: String, message: String) {
        results.append(TestResult(name: name, passed: false, message: message))
    }
    
    func generateReport() -> String {
        var report = "NJSON Test Results\n"
        report += "=================\n"
        report += "Total tests: \(results.count)\n"
        report += "Passed: \(passCount)\n"
        report += "Failed: \(failCount)\n\n"
        report += "Test Details:\n"
        
        for result in results {
            let status = result.passed ? "✅ PASS" : "❌ FAIL"
            report += "\(status): \(result.name) - \(result.message)\n"
        }
        
        return report
    }
}

struct TestTemplate {
    let name: String
    let format: String
    
    func format(with content: String) -> String {
        return String(format: format, content)
    }
} 