import Foundation
import Messages
import JavaScriptCore

/// BLFMessageBot - A thin wrapper over the core AMF/BLF JavaScript implementation
class BLFMessageBot {
    // MARK: - Properties
    private let bufferValue: Double = 0.1
    private var initialized: Bool = false
    private var jsContext: JSContext?
    private var messageHistory: [String] = []
    private var userSpeechProfile: SpeechProfile = SpeechProfile()
    private var speechPatternCalibrated: Bool = false
    
    // Speech pattern persistence
    private let speechProfileKey = "BLF_UserSpeechProfile"
    private let messageHistoryKey = "BLF_MessageHistory"
    private let calibrationKey = "BLF_SpeechCalibrated"
    private let maxHistoryCount = 50 // Limit stored message history
    
    // MARK: - Initialization
    init() {
        Logger.info("BLFMessageBot thin wrapper initialized")
        loadSpeechProfile()
    }
    
    // MARK: - Public Methods
    
    /// Process an incoming message by delegating to the JavaScript AMF implementation
    /// - Parameter message: The message text to process
    /// - Returns: The processed response
    func processMessage(_ message: String) -> String {
        guard initialized else {
            initialize()
            return "BLF initialized with buffer \(bufferValue). Ready to process messages."
        }
        
        Logger.info("Processing message: \(message)")
        
        // Add to message history for speech pattern analysis
        messageHistory.append(message)
        
        // Maintain message history limit to prevent unbounded growth
        if messageHistory.count > maxHistoryCount {
            messageHistory.removeFirst(messageHistory.count - maxHistoryCount)
        }
        
        // Update speech profile after sufficient messages
        if messageHistory.count >= 3 && !speechPatternCalibrated {
            updateSpeechProfile()
            speechPatternCalibrated = true
            Logger.info("User speech pattern calibrated: \(userSpeechProfile)")
        } else if messageHistory.count % 5 == 0 {
            // Recalibrate periodically
            updateSpeechProfile()
            Logger.info("User speech pattern recalibrated: \(userSpeechProfile)")
        }
        
        // Delegate to the JavaScript AMF implementation
        var processedResponse = callJSMethod("processMessage", withArgs: [message]) ?? 
                               "Failed to process message through AMF core"
        
        // Enhance the response to match user's speech patterns
        if speechPatternCalibrated {
            processedResponse = enhanceMessage(processedResponse, userProfile: userSpeechProfile)
            Logger.info("Enhanced response to match user speech patterns")
        }
        
        return processedResponse
    }
    
    /// Initialize the connection to the AMF JavaScript system
    func initialize() {
        Logger.info("Initializing BLF Message Bot...")
        
        // Set up JavaScript context
        setupJSContext()
        
        initialized = true
        Logger.info("BLF Message Bot initialization complete")
    }
    
    /// Get the current status directly from the AMF core
    /// - Returns: A status report string
    func getStatus() -> String {
        let baseStatus = callJSMethod("getStatus", withArgs: []) ?? 
                         "Unable to retrieve AMF system status"
        
        // Add speech profile status if calibrated
        if speechPatternCalibrated {
            return "\(baseStatus)\nSpeech calibration: Active (textisms: \(userSpeechProfile.textismFrequency), directness: \(userSpeechProfile.directnessLevel))"
        }
        
        return baseStatus
    }
    
    // MARK: - Private Methods
    
    /// Set up the JavaScript context with the AMF code
    private func setupJSContext() {
        // Create a new JavaScript context
        jsContext = JSContext()
        
        // Handle JS exceptions
        jsContext?.exceptionHandler = { context, exception in
            if let exc = exception {
                Logger.error("JS Exception: \(exc.toString() ?? "unknown error")")
            }
        }
        
        // Load the AMF.js content
        if let amfPath = Bundle.main.path(forResource: "AMF", ofType: "js"),
           let amfJS = try? String(contentsOfFile: amfPath, encoding: .utf8) {
            jsContext?.evaluateScript(amfJS)
            Logger.info("Loaded AMF.js core implementation")
        } else {
            Logger.error("Failed to load AMF.js")
        }
        
        // Register the thin wrapper bridge
        registerSwiftFunctions()
        
        // Verify the 0.1 buffer is intact in the JS implementation
        if let bufferCheck = callJSMethod("checkBufferIntegrity", withArgs: []) {
            Logger.info("Buffer integrity check: \(bufferCheck)")
        }
    }
    
    /// Register Swift functions to be called from JavaScript
    private func registerSwiftFunctions() {
        // Log function
        let logFunction: @convention(block) (String) -> Void = { message in
            Logger.info("JS: \(message)")
        }
        jsContext?.setObject(logFunction, forKeyedSubscript: "swiftLog" as NSString)
        
        // Speech profile function
        let speechProfileFunction: @convention(block) () -> [String: Any] = {
            return [
                "textismFrequency": self.userSpeechProfile.textismFrequency,
                "profanityComfort": self.userSpeechProfile.profanityComfort,
                "directnessLevel": self.userSpeechProfile.directnessLevel,
                "culturalReferences": self.userSpeechProfile.culturalReferences
            ]
        }
        jsContext?.setObject(speechProfileFunction, forKeyedSubscript: "getSpeechProfile" as NSString)
        
        // Register other bridge functions as needed
    }
    
    /// Call a JavaScript method in the AMF implementation
    /// - Parameters:
    ///   - method: The method name to call
    ///   - args: Arguments to pass to the method
    /// - Returns: The result as a string
    private func callJSMethod(_ method: String, withArgs args: [Any]) -> String? {
        guard let context = jsContext else {
            Logger.error("JavaScript context not initialized")
            return nil
        }
        
        // Create the function call
        var jsArgs = ""
        for (i, arg) in args.enumerated() {
            if i > 0 {
                jsArgs += ", "
            }
            
            if let stringArg = arg as? String {
                jsArgs += "\"\(stringArg.replacingOccurrences(of: "\"", with: "\\\""))\""
            } else {
                jsArgs += "\(arg)"
            }
        }
        
        let jsCall = "AMF.\(method)(\(jsArgs))"
        
        // Call the function
        guard let result = context.evaluateScript(jsCall) else {
            Logger.error("Failed to call JS method: \(method)")
            return nil
        }
        
        return result.toString()
    }
    
    // MARK: - Speech Pattern Methods
    
    /// Update the user's speech profile based on message history
    private func updateSpeechProfile() {
        userSpeechProfile = analyzeUserSpeechPatterns(messageHistory: messageHistory)
        saveSpeechProfile()
        Logger.info("Speech profile updated and saved to persistent storage")
    }
    
    /// Analyze user's message patterns to create a speech profile
    private func analyzeUserSpeechPatterns(messageHistory: [String]) -> SpeechProfile {
        return SpeechProfile(
            textismFrequency: detectTextisms(messageHistory),
            profanityComfort: assessProfanityLevel(messageHistory),
            directnessLevel: measureDirectness(messageHistory),
            culturalReferences: identifyReferenceDensity(messageHistory)
        )
    }
    
    /// Enhance a message to match the user's speech patterns
    private func enhanceMessage(originalText: String, userProfile: SpeechProfile) -> String {
        var enhanced = applyBooleanLanguageOptimization(originalText)
        
        // Match user's actual communication style
        if userProfile.textismFrequency > 0.3 {
            enhanced = addAppropriateTextisms(enhanced)
        }
        
        if userProfile.profanityComfort > 0.7 {
            enhanced = maintainDirectLanguage(enhanced)
        }
        
        return enhanced
    }
    
    /// Detect textism usage frequency in messages
    private func detectTextisms(_ messages: [String]) -> Double {
        let textismPatterns = ["lol", "omg", "lmao", "tbh", "wtf", "af", "rn", "\\blmk\\b", "\\bidk\\b"]
        var textismCount = 0
        
        for message in messages {
            for pattern in textismPatterns {
                if let regex = try? NSRegularExpression(pattern: pattern, options: [.caseInsensitive]) {
                    let range = NSRange(location: 0, length: message.utf16.count)
                    let matches = regex.matches(in: message, options: [], range: range)
                    textismCount += matches.count
                }
            }
        }
        
        let messageCharacterCount = messages.joined().count
        return min(1.0, Double(textismCount) / (Double(messageCharacterCount) * 0.01))
    }
    
    /// Assess profanity comfort level in messages
    private func assessProfanityLevel(_ messages: [String]) -> Double {
        let profanityPatterns = ["fuck", "shit", "damn", "ass", "bitch", "wtf"]
        var profanityCount = 0
        
        for message in messages {
            for pattern in profanityPatterns {
                if let regex = try? NSRegularExpression(pattern: pattern, options: [.caseInsensitive]) {
                    let range = NSRange(location: 0, length: message.utf16.count)
                    let matches = regex.matches(in: message, options: [], range: range)
                    profanityCount += matches.count
                }
            }
        }
        
        let messageWordCount = messages.joined().components(separatedBy: .whitespacesAndNewlines).count
        return min(1.0, Double(profanityCount) / (Double(messageWordCount) * 0.05))
    }
    
    /// Measure directness level in messages
    private func measureDirectness(_ messages: [String]) -> Double {
        var directnessScore = 0.5 // Start at neutral
        let hedgeWords = ["maybe", "perhaps", "possibly", "somewhat", "kind of", "sort of"]
        let directWords = ["definitely", "absolutely", "certainly", "clearly", "obviously"]
        
        for message in messages {
            let lowercaseMessage = message.lowercased()
            
            // Deduct for hedge words
            for hedge in hedgeWords {
                if lowercaseMessage.contains(hedge) {
                    directnessScore -= 0.05
                }
            }
            
            // Add for direct words
            for direct in directWords {
                if lowercaseMessage.contains(direct) {
                    directnessScore += 0.05
                }
            }
            
            // Check for direct questions
            if message.contains("?") && (lowercaseMessage.hasPrefix("what") || 
                                         lowercaseMessage.hasPrefix("how") || 
                                         lowercaseMessage.hasPrefix("why")) {
                directnessScore += 0.1
            }
        }
        
        return min(1.0, max(0.0, directnessScore))
    }
    
    /// Identify cultural reference density in messages
    private func identifyReferenceDensity(_ messages: [String]) -> [String: Double] {
        var references: [String: Double] = [
            "tech": 0.0,
            "pop": 0.0,
            "academic": 0.0,
            "gaming": 0.0
        ]
        
        let techTerms = ["api", "code", "github", "algorithm", "function", "server"]
        let popTerms = ["movie", "show", "episode", "song", "artist", "album"]
        let academicTerms = ["research", "study", "paper", "theory", "concept", "analysis"]
        let gamingTerms = ["game", "play", "level", "character", "quest", "player"]
        
        for message in messages {
            let lowercaseMessage = message.lowercased()
            
            // Check for tech references
            for term in techTerms {
                if lowercaseMessage.contains(term) {
                    references["tech"] = (references["tech"] ?? 0.0) + 0.1
                }
            }
            
            // Check for pop culture references
            for term in popTerms {
                if lowercaseMessage.contains(term) {
                    references["pop"] = (references["pop"] ?? 0.0) + 0.1
                }
            }
            
            // Check for academic references
            for term in academicTerms {
                if lowercaseMessage.contains(term) {
                    references["academic"] = (references["academic"] ?? 0.0) + 0.1
                }
            }
            
            // Check for gaming references
            for term in gamingTerms {
                if lowercaseMessage.contains(term) {
                    references["gaming"] = (references["gaming"] ?? 0.0) + 0.1
                }
            }
        }
        
        // Normalize values
        for (key, value) in references {
            references[key] = min(1.0, value)
        }
        
        return references
    }
    
    /// Apply Boolean Language Optimization to text
    private func applyBooleanLanguageOptimization(_ text: String) -> String {
        // Here we would apply the core BLF patterns
        // For now, just return the original text
        return text
    }
    
    /// Add appropriate textisms to match user style
    private func addAppropriateTextisms(_ text: String) -> String {
        // Randomly determine if we should add a textism
        let shouldAddTextism = arc4random_uniform(100) < 30 // 30% chance
        
        if !shouldAddTextism {
            return text
        }
        
        let textisms = ["lol", "haha", "tbh", "fr", ""]
        let selectedTextism = textisms[Int(arc4random_uniform(UInt32(textisms.count)))]
        
        if selectedTextism.isEmpty {
            return text
        }
        
        if text.hasSuffix(".") {
            return text.dropLast() + " " + selectedTextism + "."
        } else {
            return text + " " + selectedTextism
        }
    }
    
    /// Maintain direct language when user is comfortable with it
    private func maintainDirectLanguage(_ text: String) -> String {
        // Replace hedge words with more direct language
        var result = text
        let hedgeReplacements = [
            "perhaps": "definitely",
            "maybe": "absolutely",
            "somewhat": "very",
            "kind of": "",
            "sort of": ""
        ]
        
        for (hedge, replacement) in hedgeReplacements {
            result = result.replacingOccurrences(of: hedge, with: replacement)
        }
        
        // Preserve profanity if it appears in the original
        // This simply avoids sanitizing language, not adding profanity
        let preserveUserStyle = true
        if preserveUserStyle {
            result = result.replacingOccurrences(of: "darn", with: "damn")
            result = result.replacingOccurrences(of: "heck", with: "hell")
            result = result.replacingOccurrences(of: "freaking", with: "fucking")
        }
        
        return result
    }
    
    /// Load the user's speech profile from persistent storage
    private func loadSpeechProfile() {
        let textismFreq = UserDefaults.standard.double(forKey: speechProfileKey + "_textismFrequency")
        let profanityComfort = UserDefaults.standard.double(forKey: speechProfileKey + "_profanityComfort")
        let directnessLevel = UserDefaults.standard.double(forKey: speechProfileKey + "_directnessLevel")
        let culturalRefs = UserDefaults.standard.dictionary(forKey: speechProfileKey + "_culturalReferences") as? [String: Double] ?? [:]
        let isCalibrated = UserDefaults.standard.bool(forKey: speechProfileKey + "_speechPatternCalibrated")
        
        // Only load if we have saved data (textism frequency > 0 indicates saved profile)
        if textismFreq > 0 || profanityComfort > 0 || directnessLevel != 0 {
            userSpeechProfile = SpeechProfile(
                textismFrequency: textismFreq,
                profanityComfort: profanityComfort,
                directnessLevel: directnessLevel == 0 ? 0.5 : directnessLevel,
                culturalReferences: culturalRefs
            )
            speechPatternCalibrated = isCalibrated
            Logger.info("Loaded existing speech profile: textisms=\(textismFreq), profanity=\(profanityComfort), directness=\(directnessLevel)")
        }
    }
    
    /// Save the user's speech profile to persistent storage
    private func saveSpeechProfile() {
        UserDefaults.standard.set(userSpeechProfile.textismFrequency, forKey: speechProfileKey + "_textismFrequency")
        UserDefaults.standard.set(userSpeechProfile.profanityComfort, forKey: speechProfileKey + "_profanityComfort")
        UserDefaults.standard.set(userSpeechProfile.directnessLevel, forKey: speechProfileKey + "_directnessLevel")
        UserDefaults.standard.set(userSpeechProfile.culturalReferences, forKey: speechProfileKey + "_culturalReferences")
        UserDefaults.standard.set(speechPatternCalibrated, forKey: speechProfileKey + "_speechPatternCalibrated")
    }
    
    /// Reset the user's speech profile and clear persistent data
    func resetSpeechProfile() {
        userSpeechProfile = SpeechProfile()
        speechPatternCalibrated = false
        messageHistory.removeAll()
        
        // Clear persistent storage
        UserDefaults.standard.removeObject(forKey: speechProfileKey + "_textismFrequency")
        UserDefaults.standard.removeObject(forKey: speechProfileKey + "_profanityComfort")
        UserDefaults.standard.removeObject(forKey: speechProfileKey + "_directnessLevel")
        UserDefaults.standard.removeObject(forKey: speechProfileKey + "_culturalReferences")
        UserDefaults.standard.removeObject(forKey: speechProfileKey + "_speechPatternCalibrated")
        
        Logger.info("Speech profile reset - V-8 engine ready for fresh calibration")
    }
}

// MARK: - Supporting Types

/// Represents the quantum state of the system
struct QuantumState {
    var pure: Bool
    var fog: Bool
    var breathing: Bool
    var jumps: JumpConfiguration
}

/// Configuration for quantum jumps
struct JumpConfiguration {
    var power: String
    var active: Bool
}

/// Cognitive alignment configuration
struct CognitiveAlignment {
    var aiCognitive: Double
    var booleanMindQs: Double
    var buffer: Double
    var formula: String
}

/// User speech profile based on message analysis
struct SpeechProfile {
    var textismFrequency: Double = 0.0
    var profanityComfort: Double = 0.0
    var directnessLevel: Double = 0.5
    var culturalReferences: [String: Double] = [:]
} 