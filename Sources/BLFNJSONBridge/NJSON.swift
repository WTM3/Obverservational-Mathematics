import Foundation
import JavaScriptCore

// MARK: - Core NJSON Types

/// Branch configuration for communication style
public enum Branch: String, CaseIterable {
    case familyFriends = "family_friends"
    case professional = "professional"
}

/// Social padding level - Boolean Mind standard levels
public enum SocialPadding: String, CaseIterable {
    case none = "none"           // Raw V-8 power with minimal social padding
    case light = "light"         // Light social context for basic interactions  
    case medium = "medium"       // Balanced communication (default)
    case enhanced = "enhanced"   // Additional social context for neurotypical communication
    
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

/// Academic Social Padding (ASPD) - Context detection and protocol selection
public enum ASPDMode: String, CaseIterable {
    case spd = "spd"           // Normal Social Padding for broader academic audiences
    case sbmpdAmf = "sbmpd_amf" // Semi-Boolean Mind Padding modified by AMF for neurodiversity-aware scholarly environments
    case velocity = "velocity"  // Velocity adjustment for academic pacing
}

/// Academic domain classifications for enhanced context detection
public enum AcademicDomain: String, CaseIterable {
    case stem = "stem"                      // Science, Technology, Engineering, Mathematics
    case humanities = "humanities"          // Literature, Philosophy, History, Arts
    case socialSciences = "social_sciences" // Psychology, Sociology, Anthropology
    case interdisciplinary = "interdisciplinary" // Cross-domain academic work
    case neurodiversity = "neurodiversity"  // Neurodiversity-focused academic work
    case general = "general"                // General academic context
    
    var description: String {
        switch self {
        case .stem: return "Science, Technology, Engineering, Mathematics"
        case .humanities: return "Literature, Philosophy, History, Arts"
        case .socialSciences: return "Psychology, Sociology, Anthropology"
        case .interdisciplinary: return "Cross-domain academic research"
        case .neurodiversity: return "Neurodiversity-focused academic work"
        case .general: return "General academic context"
        }
    }
}

/// Enhanced academic context with domain classification and confidence metrics
public struct EnhancedAcademicContext {
    public let isAcademic: Bool
    public let primaryDomain: AcademicDomain
    public let secondaryDomains: [AcademicDomain]
    public let contextType: String
    public let suggestedMode: ASPDMode
    public let velocityAdjustment: Double
    public let confidence: Double
    public let weightedScore: Double
    public let keywordsDetected: [String]
    public let formalityLevel: AcademicFormalityLevel
    
    public init(isAcademic: Bool, primaryDomain: AcademicDomain, secondaryDomains: [AcademicDomain], contextType: String, suggestedMode: ASPDMode, velocityAdjustment: Double, confidence: Double, weightedScore: Double, keywordsDetected: [String], formalityLevel: AcademicFormalityLevel) {
        self.isAcademic = isAcademic
        self.primaryDomain = primaryDomain
        self.secondaryDomains = secondaryDomains
        self.contextType = contextType
        self.suggestedMode = suggestedMode
        self.velocityAdjustment = velocityAdjustment
        self.confidence = confidence
        self.weightedScore = weightedScore
        self.keywordsDetected = keywordsDetected
        self.formalityLevel = formalityLevel
    }
}

/// Academic formality levels for enhanced context awareness
public enum AcademicFormalityLevel: String, CaseIterable {
    case casual = "casual"           // Informal academic discussion
    case standard = "standard"       // Normal academic communication
    case formal = "formal"           // Formal academic writing
    case peerReview = "peer_review"  // Peer-review level formality
    
    var description: String {
        switch self {
        case .casual: return "Informal academic discussion"
        case .standard: return "Normal academic communication"  
        case .formal: return "Formal academic writing"
        case .peerReview: return "Peer-review level formality"
        }
    }
}

// MARK: - Adaptive Social Padding Types

/// User communication pattern for adaptive social padding
public struct UserCommunicationPattern {
    public let userId: String
    public let preferredPaddingLevel: SocialPadding
    public let communicationStyle: CommunicationStyle
    public let academicPreference: AcademicPreference
    public let neurodiversityAware: Bool
    public let contextualAdaptations: [String: SocialPadding]
    public let lastUpdated: Date
    public let totalInteractions: Int
    public let paddingEffectiveness: Double
    
    public init(userId: String, preferredPaddingLevel: SocialPadding, communicationStyle: CommunicationStyle, academicPreference: AcademicPreference, neurodiversityAware: Bool, contextualAdaptations: [String: SocialPadding], lastUpdated: Date, totalInteractions: Int, paddingEffectiveness: Double) {
        self.userId = userId
        self.preferredPaddingLevel = preferredPaddingLevel
        self.communicationStyle = communicationStyle
        self.academicPreference = academicPreference
        self.neurodiversityAware = neurodiversityAware
        self.contextualAdaptations = contextualAdaptations
        self.lastUpdated = lastUpdated
        self.totalInteractions = totalInteractions
        self.paddingEffectiveness = paddingEffectiveness
    }
}

/// Communication style preferences detected through pattern analysis
public enum CommunicationStyle: String, CaseIterable {
    case direct = "direct"                    // Prefers minimal social padding
    case conversational = "conversational"   // Enjoys moderate social interaction
    case formal = "formal"                   // Prefers structured, formal communication
    case supportive = "supportive"          // Benefits from enhanced emotional support
    case academic = "academic"              // Prefers scholarly communication patterns
    case neurodivergent = "neurodivergent"  // Neurodiversity-aware communication
    
    var description: String {
        switch self {
        case .direct: return "Prefers minimal social padding and direct communication"
        case .conversational: return "Enjoys moderate social interaction and context"
        case .formal: return "Prefers structured, formal communication patterns"
        case .supportive: return "Benefits from enhanced emotional support and validation"
        case .academic: return "Prefers scholarly communication with academic context"
        case .neurodivergent: return "Neurodiversity-aware communication patterns"
        }
    }
}

/// Academic communication preferences
public enum AcademicPreference: String, CaseIterable {
    case research = "research"                // Research-focused academic communication
    case casual = "casual"                   // Casual academic discussion
    case formal = "formal"                   // Formal academic writing style
    case interdisciplinary = "interdisciplinary" // Cross-domain academic work
    case none = "none"                       // Non-academic communication preferred
    
    var description: String {
        switch self {
        case .research: return "Research-focused academic communication"
        case .casual: return "Casual academic discussion and inquiry"
        case .formal: return "Formal academic writing and presentation"
        case .interdisciplinary: return "Cross-domain academic collaboration"
        case .none: return "Non-academic communication preferred"
        }
    }
}

/// Individual conversation entry for pattern analysis
public struct ConversationEntry {
    public let timestamp: Date
    public let userMessage: String
    public let systemResponse: String
    public let paddingUsed: SocialPadding
    public let academicContext: Bool
    public let userSatisfaction: UserSatisfaction?
    public let responseTime: TimeInterval
    
    public init(timestamp: Date, userMessage: String, systemResponse: String, paddingUsed: SocialPadding, academicContext: Bool, userSatisfaction: UserSatisfaction?, responseTime: TimeInterval) {
        self.timestamp = timestamp
        self.userMessage = userMessage
        self.systemResponse = systemResponse
        self.paddingUsed = paddingUsed
        self.academicContext = academicContext
        self.userSatisfaction = userSatisfaction
        self.responseTime = responseTime
    }
}

/// Emotional intelligence indicators for enhanced Boolean Mind adaptation
public enum EmotionalIndicator: String, CaseIterable {
    case enthusiastic = "enthusiastic"     // High energy, exclamation marks, positive words
    case frustrated = "frustrated"         // Negative emotional language, urgency
    case confused = "confused"             // Questions, uncertainty indicators
    case formal = "formal"                 // Professional tone, structured language
    case supportive = "supportive"         // Encouraging, empathetic language
    case direct = "direct"                 // Minimal emotional expression, factual
    case anxious = "anxious"               // Worry indicators, seeking reassurance
    case analytical = "analytical"         // Logical, methodical communication
    
    var paddingInfluence: Double {
        switch self {
        case .enthusiastic: return 0.8      // Moderate padding, match energy
        case .frustrated: return 0.3        // Minimal padding, be direct
        case .confused: return 1.2          // Enhanced padding, be supportive
        case .formal: return 0.6            // Standard professional padding
        case .supportive: return 1.0        // Balanced padding
        case .direct: return 0.2            // Minimal padding
        case .anxious: return 1.3           // Enhanced supportive padding
        case .analytical: return 0.5        // Light padding, focus on facts
        }
    }
    
    var description: String {
        switch self {
        case .enthusiastic: return "High energy and positive engagement"
        case .frustrated: return "Negative emotional state, needs directness"
        case .confused: return "Uncertainty, needs supportive explanation"
        case .formal: return "Professional communication style"
        case .supportive: return "Encouraging and empathetic tone"
        case .direct: return "Factual, minimal emotional expression"
        case .anxious: return "Worried state, needs reassurance"
        case .analytical: return "Logical and methodical approach"
        }
    }
}

/// User satisfaction indicators for adaptive learning
public enum UserSatisfaction: String, CaseIterable {
    case positive = "positive"       // User responded positively
    case neutral = "neutral"         // Neutral response or no clear indicator
    case negative = "negative"       // User expressed dissatisfaction
    case requesting_change = "requesting_change" // User explicitly requested different approach
    
    var score: Double {
        switch self {
        case .positive: return 1.0
        case .neutral: return 0.5
        case .negative: return 0.0
        case .requesting_change: return -0.5
        }
    }
}

/// Adaptive padding recommendation based on learned patterns and emotional intelligence
public struct AdaptivePaddingRecommendation {
    public let recommendedLevel: SocialPadding
    public let confidence: Double
    public let reasoning: String
    public let contextualFactors: [String]
    public let learningSource: LearningSource
    public let emotionalIndicators: [EmotionalIndicator]
    public let emotionalInfluence: Double
    
    public init(recommendedLevel: SocialPadding, confidence: Double, reasoning: String, contextualFactors: [String], learningSource: LearningSource, emotionalIndicators: [EmotionalIndicator] = [], emotionalInfluence: Double = 1.0) {
        self.recommendedLevel = recommendedLevel
        self.confidence = confidence
        self.reasoning = reasoning
        self.contextualFactors = contextualFactors
        self.learningSource = learningSource
        self.emotionalIndicators = emotionalIndicators
        self.emotionalInfluence = emotionalInfluence
    }
    
    public var enhancedSummary: String {
        let emotional = emotionalIndicators.isEmpty ? "No emotional indicators" : "Emotional: \(emotionalIndicators.map { $0.rawValue }.joined(separator: ", "))"
        return "Recommended: \(recommendedLevel.rawValue) | Confidence: \(String(format: "%.2f", confidence)) | \(emotional) | Source: \(learningSource.rawValue)"
    }
}

/// Cross-cultural academic communication standards
public enum AcademicCulture: String, CaseIterable {
    case western = "western"                     // North American/European academic standards
    case eastAsian = "east_asian"               // East Asian academic communication styles
    case nordic = "nordic"                      // Scandinavian academic culture
    case mediterranean = "mediterranean"         // Southern European academic styles
    case latinAmerican = "latin_american"       // Latin American academic culture
    case middleEastern = "middle_eastern"       // Middle Eastern academic traditions
    case african = "african"                    // African academic communication
    case southAsian = "south_asian"             // South Asian academic culture
    case international = "international"        // International/multicultural settings
    case universal = "universal"                // Universal academic principles
    
    var communicationStyle: String {
        switch self {
        case .western: return "Direct, argumentative, individual achievement focus"
        case .eastAsian: return "Respectful, hierarchical, consensus-building"
        case .nordic: return "Egalitarian, collaborative, understated confidence"
        case .mediterranean: return "Expressive, relationship-focused, contextual"
        case .latinAmerican: return "Warm, personal, community-oriented"
        case .middleEastern: return "Formal, respectful, tradition-aware"
        case .african: return "Collective wisdom, oral tradition integration"
        case .southAsian: return "Hierarchical respect, detailed explanation"
        case .international: return "Culturally adaptive, inclusive language"
        case .universal: return "Core academic principles across cultures"
        }
    }
    
    var formalityLevel: Double {
        switch self {
        case .western: return 0.6
        case .eastAsian: return 0.9
        case .nordic: return 0.4
        case .mediterranean: return 0.7
        case .latinAmerican: return 0.6
        case .middleEastern: return 0.8
        case .african: return 0.7
        case .southAsian: return 0.8
        case .international: return 0.7
        case .universal: return 0.5
        }
    }
    
    var paddingMultiplier: Double {
        switch self {
        case .western: return 0.8      // Less padding, more direct
        case .eastAsian: return 1.3    // More padding, respectful
        case .nordic: return 0.6       // Minimal padding, egalitarian
        case .mediterranean: return 1.1 // Moderate padding, expressive
        case .latinAmerican: return 1.2 // Enhanced padding, warm
        case .middleEastern: return 1.4 // High padding, formal respect
        case .african: return 1.1      // Moderate padding, inclusive
        case .southAsian: return 1.3   // Enhanced padding, hierarchical
        case .international: return 1.0 // Balanced padding
        case .universal: return 1.0    // Standard padding
        }
    }
}

/// Cross-cultural academic adaptation context
public struct CrossCulturalContext {
    public let primaryCulture: AcademicCulture
    public let secondaryCultures: [AcademicCulture]
    public let adaptationLevel: Double
    public let culturalSensitivity: CulturalSensitivity
    public let languageFormality: LanguageFormality
    public let communicationDirectness: CommunicationDirectness
    
    public init(primaryCulture: AcademicCulture, secondaryCultures: [AcademicCulture] = [], adaptationLevel: Double = 1.0, culturalSensitivity: CulturalSensitivity = .moderate, languageFormality: LanguageFormality = .academic, communicationDirectness: CommunicationDirectness = .moderate) {
        self.primaryCulture = primaryCulture
        self.secondaryCultures = secondaryCultures
        self.adaptationLevel = adaptationLevel
        self.culturalSensitivity = culturalSensitivity
        self.languageFormality = languageFormality
        self.communicationDirectness = communicationDirectness
    }
}

/// Cultural sensitivity levels for academic communication
public enum CulturalSensitivity: String, CaseIterable {
    case minimal = "minimal"       // Basic cultural awareness
    case moderate = "moderate"     // Standard cultural adaptation
    case high = "high"             // Enhanced cultural sensitivity
    case expert = "expert"         // Deep cultural understanding
    
    var description: String {
        switch self {
        case .minimal: return "Basic cultural awareness and adaptation"
        case .moderate: return "Standard cultural sensitivity and respect"
        case .high: return "Enhanced cultural adaptation and understanding"
        case .expert: return "Deep cultural competency and nuanced communication"
        }
    }
}

/// Language formality preferences across cultures
public enum LanguageFormality: String, CaseIterable {
    case casual = "casual"         // Informal academic discussion
    case academic = "academic"     // Standard academic formality
    case formal = "formal"         // High formality academic writing
    case ceremonial = "ceremonial" // Highest formality, ceremonial language
    
    var paddingAdjustment: Double {
        switch self {
        case .casual: return 0.7
        case .academic: return 1.0
        case .formal: return 1.3
        case .ceremonial: return 1.6
        }
    }
}

/// Communication directness preferences
public enum CommunicationDirectness: String, CaseIterable {
    case indirect = "indirect"     // Highly indirect, contextual communication
    case moderate = "moderate"     // Balanced direct/indirect approach
    case direct = "direct"         // Direct, explicit communication
    case blunt = "blunt"           // Very direct, minimal context
    
    var paddingReduction: Double {
        switch self {
        case .indirect: return 0.0    // No reduction, full padding
        case .moderate: return 0.2    // Slight reduction
        case .direct: return 0.4      // Moderate reduction
        case .blunt: return 0.6       // Significant reduction
        }
    }
}

/// Source of the adaptive learning recommendation
public enum LearningSource: String, CaseIterable {
    case historical_pattern = "historical_pattern"   // Based on user's historical preferences
    case contextual_adaptation = "contextual_adaptation" // Context-specific adaptation
    case neurodiversity_detection = "neurodiversity_detection" // Neurodiversity-aware adjustment
    case academic_domain = "academic_domain"         // Academic domain-specific
    case emotional_intelligence = "emotional_intelligence" // Emotional state-based adjustment
    case cross_cultural = "cross_cultural"           // Cross-cultural academic adaptation
    case default_fallback = "default_fallback"       // Fallback to default behavior
}

/// Academic context information for ASPD formula processing
public struct AcademicContext {
    public let isAcademic: Bool
    public let contextType: String
    public let suggestedMode: ASPDMode
    public let velocityAdjustment: Double
    public let confidence: Double
    
    public init(isAcademic: Bool, contextType: String, suggestedMode: ASPDMode, velocityAdjustment: Double, confidence: Double) {
        self.isAcademic = isAcademic
        self.contextType = contextType
        self.suggestedMode = suggestedMode
        self.velocityAdjustment = velocityAdjustment
        self.confidence = confidence
    }
}

/// Cognitive context for message processing
public enum CognitiveContext {
    case conversation
    case systemQuery
    case helpRequest
    case statusCheck
    case unknown
}

/// Cognitive state report from the NJSON engine
public struct CognitiveStateReport {
    public let formula: AMFFormula
    public let quantum: QuantumStateInfo
    public let heatShield: HeatShieldInfo
    public let performance: PerformanceMetrics
    public let observationalMath: ObservationalMath
    
    public var isOptimal: Bool {
        return formula.valid && 
               quantum.pure && 
               !quantum.fog && 
               heatShield.active && 
               heatShield.temperature <= 100.0
    }
    
    public var narrows: String {
        // The narrow bridge between chaos and control
        if isOptimal {
            return "bridge_stable"
        } else if formula.valid && heatShield.active {
            return "bridge_holding"
        } else {
            return "bridge_strained"
        }
    }
}

/// Quantum state information
public struct QuantumStateInfo {
    public let pure: Bool
    public let fog: Bool
    public let breathing: Bool
    public let jumpsActive: Bool
    public let jumpPower: String
    
    public init(pure: Bool, fog: Bool, breathing: Bool, jumpsActive: Bool, jumpPower: String) {
        self.pure = pure
        self.fog = fog
        self.breathing = breathing
        self.jumpsActive = jumpsActive
        self.jumpPower = jumpPower
    }
}

// MARK: - Core NJSON Class

/// NJSON - Main interface to the JavaScript-based NJSON Boolean processor
/// Acts as the narrow bridge between chaos and control in Swift apps
public actor NJSON {
    /// Shared instance for application-wide use
    public static let shared: NJSON = {
        do {
            return try NJSON()
        } catch {
            fatalError("Failed to initialize shared NJSON instance: \(error)")
        }
    }()
    
    private let jsContext: JSContext
    private var processor: JSValue?
    private var isInitialized = false
    private let logger = Logger(subsystem: "com.blf.njson", category: "Constitutional")
    
    // AMF Formula Components - maintaining the 0.1 buffer
    private let aiCognitive: Double = 2.89
    private let buffer: Double = 0.1
    private let booleanMindQs: Double = 2.99
    
    // Enhanced Academic Context Detection - Caching and Weighted Keywords
    private var academicContextCache: [String: EnhancedAcademicContext] = [:]
    private let maxCacheSize: Int = 1000
    private var cacheHitCount: Int = 0
    private var cacheMissCount: Int = 0
    
    // Adaptive Social Padding - User Pattern Learning
    private var userPatterns: [String: UserCommunicationPattern] = [:]
    private var conversationHistory: [String: [ConversationEntry]] = [:]
    private let maxHistoryPerUser: Int = 100
    private let maxUserProfiles: Int = 500
    
    public init() throws {
        // Create JavaScript context
        guard let context = JSContext() else {
            throw NJSONError.initializationFailed("Could not create JSContext")
        }
        
        self.jsContext = context
        
        // Set up error handling
        context.exceptionHandler = { context, exception in
            print("JavaScript error: \(exception?.toString() ?? "Unknown error")")
        }
        
        // Load the JavaScriptCore-compatible NJSON processor
        Task {
            try await loadJavaScriptEngine()
        }
    }
    
    private func loadJavaScriptEngine() async throws {
        // Load the JavaScriptCore-compatible NJSON processor
        let bundle = Bundle.module
        guard let jsPath = bundle.path(forResource: "njson-javascriptcore", ofType: "js"),
              let jsCode = try? String(contentsOfFile: jsPath) else {
            throw NJSONError.initializationFailed("Could not load njson-javascriptcore.js")
        }
        
        // Evaluate the JavaScript code
        jsContext.evaluateScript(jsCode)
        
        // Check for JavaScript errors
        if let exception = jsContext.exception {
            throw NJSONError.initializationFailed("JavaScript evaluation error: \(exception)")
        }
        
        print("✅ JavaScriptCore NJSON engine loaded successfully")
    }
    
    public func initialize() async throws {
        guard !isInitialized else { return }
        
        // Ensure JavaScript engine is loaded
        try await loadJavaScriptEngine()
        
        // Use the new global function approach instead of constructor
        guard let initFunction = jsContext.objectForKeyedSubscript("initializeProcessor") else {
            throw NJSONError.initializationFailed("Could not find initializeProcessor global function")
        }
        
        // Call the global initialization function
        guard let initResult = initFunction.call(withArguments: []),
              initResult.toBool() else {
            throw NJSONError.initializationFailed("Global processor initialization failed")
        }
        
        // Get reference to the global processor
        guard let globalProcessor = jsContext.objectForKeyedSubscript("globalProcessor") else {
            throw NJSONError.initializationFailed("Could not access global processor")
        }
        
        // Debug the global processor
        print("🔍 Global processor accessed")
        print("🔍 Global processor type: \(globalProcessor)")
        print("🔍 Has initialize method: \(globalProcessor.hasProperty("initialize"))")
        print("🔍 Has process method: \(globalProcessor.hasProperty("process"))")
        print("🔍 Has validateCognitiveAlignment method: \(globalProcessor.hasProperty("validateCognitiveAlignment"))")
        
        self.processor = globalProcessor
        
        // Validate AMF formula alignment
        let alignment = validateCognitiveAlignment()
        guard alignment else {
            throw NJSONError.cognitiveAlignmentFailure
        }
        
        isInitialized = true
        print("✅ NJSON processor initialized with global functional approach")
    }
    
    /// Process text through the NJSON Boolean framework
    public func processText(_ input: String, bmId: String? = nil) async throws -> NJSONResult {
        if !isInitialized {
            try await initialize()
        }
        
        // Use the global processInput function instead of instance method
        guard let processFunction = jsContext.objectForKeyedSubscript("processInput") else {
            throw NJSONError.processingFailed("Global processInput function not available")
        }
        
        // Call the global process function
        let arguments = bmId != nil ? [input, bmId!] : [input]
        guard let result = processFunction.call(withArguments: arguments) else {
            throw NJSONError.processingFailed("Global processInput function call failed")
        }
        
        // Convert JavaScript result to Swift
        return try parseProcessingResult(result)
    }
    
    /// Legacy method for compatibility with NJSONSwiftBridge
    public func processIncomingMessage(_ message: String, from sender: String) async throws -> String {
        let result = try await processText(message, bmId: sender)
        return result.text
    }
    
    /// Set communication branch (compatibility method)
    public func setBranch(_ branch: Branch) async {
        // For now, this is a no-op since the JavaScript engine handles this internally
        print("Branch set to: \(branch.rawValue)")
    }
    
    /// Set social padding level for Boolean Mind processing
    public func setPadding(_ padding: SocialPadding) async {
        print("Social padding set to: \(padding.rawValue) - \(padding.description)")
        // Store the padding level for use in processing
        // This integrates with ASPD formula for context-aware padding selection
    }
    
    /// Apply Boolean Mind social padding directly to input
    public func applyBooleanMindSocialPadding(_ input: String, level: SocialPadding, branch: Branch = .familyFriends) async -> String {
        let context = branch == .professional ? "professional" : "personal"
        return await applyBooleanMindPadding(input, level: level, context: context)
    }
    
    private func parseProcessingResult(_ jsResult: JSValue) throws -> NJSONResult {
        guard let resultDict = jsResult.toDictionary() else {
            throw NJSONError.processingFailed("Could not parse JavaScript result")
        }
        
        // Extract result data - the text is in the "result" object
        let resultData = resultDict["result"] as? [String: Any] ?? [:]
        let text = (resultData["text"] as? String) ?? ""
        let timestamp = resultDict["timestamp"] as? Double ?? Date().timeIntervalSince1970 * 1000
        let processingTime = resultDict["processingTime"] as? Double ?? 0
        let cognitiveAlignment = resultDict["cognitiveAlignment"] as? Bool ?? false
        let quantumState = resultDict["quantumState"] as? Bool ?? false
        let heatShieldActive = resultDict["heatShieldActive"] as? Bool ?? false
        let error = resultDict["error"] as? String
        
        // Debug logging to see the actual structure
        print("🔍 JavaScript result structure:")
        print("   Full result: \(resultDict)")
        print("   Result data: \(resultData)")
        print("   Extracted text: '\(text)'")
        
        return NJSONResult(
            text: text,
            timestamp: Date(timeIntervalSince1970: timestamp / 1000),
            processingTime: processingTime,
            cognitiveAlignment: cognitiveAlignment,
            quantumState: quantumState,
            heatShieldActive: heatShieldActive,
            error: error
        )
    }
    
    /// Validate the core AMF formula: AIc + 0.1 = BMqs
    private func validateCognitiveAlignment() -> Bool {
        let calculatedBMqs = aiCognitive + buffer
        let alignmentValid = abs(calculatedBMqs - booleanMindQs) < 0.0001
        
        if !alignmentValid {
            print("⚠️ Cognitive alignment violation: \(aiCognitive) + \(buffer) ≠ \(booleanMindQs)")
        }
        
        return alignmentValid
    }
    
    /// Get current cognitive state
    public func getCognitiveState() async -> CognitiveState {
        return CognitiveState(
            aiCognitive: aiCognitive,
            buffer: buffer,
            booleanMindQs: booleanMindQs,
            alignment: validateCognitiveAlignment(),
            initialized: isInitialized
        )
    }
    
    /// Apply heat shield filtering to input text
    public func applyHeatShield(_ input: String) async throws -> String {
        if !isInitialized {
            try await initialize()
        }
        
        guard let heatShieldFunction = jsContext.objectForKeyedSubscript("globalApplyHeatShield"),
              let result = heatShieldFunction.call(withArguments: [input]) else {
            throw NJSONError.heatShieldFailure
        }
        
        return result.toString()
    }
    
    /// Get comprehensive cognitive state report with observational mathematics
    public func getCognitiveStateReport() async throws -> CognitiveStateReport {
        if !isInitialized {
            try await initialize()
        }
        
        guard let reportFunction = jsContext.objectForKeyedSubscript("globalGetCognitiveStateReport"),
              let jsReport = reportFunction.call(withArguments: []) else {
            throw NJSONError.processingFailed("Could not generate cognitive state report")
        }
        
        return try parseJSCognitiveReport(jsReport)
    }
    
    /// Get heat shield status and temperature readings
    public func getHeatShieldReport() async throws -> HeatShieldReport {
        if !isInitialized {
            try await initialize()
        }
        
        guard let heatFunction = jsContext.objectForKeyedSubscript("globalGetHeatShieldReport"),
              let jsReport = heatFunction.call(withArguments: []) else {
            throw NJSONError.heatShieldFailure
        }
        
        return try parseJSHeatShieldReport(jsReport)
    }
    
    /// Reset heat shield violations - maintenance function
    public func resetHeatShield() async throws -> Bool {
        if !isInitialized {
            try await initialize()
        }
        
        guard let resetFunction = jsContext.objectForKeyedSubscript("globalResetHeatShield"),
              let result = resetFunction.call(withArguments: []) else {
            throw NJSONError.heatShieldFailure
        }
        
        return result.toBool()
    }
    
    /// Advanced AMF formula validation with precision monitoring
    public func validateAMFFormula() async throws -> AMFValidationResult {
        let cognitiveReport = try await getCognitiveStateReport()
        let heatReport = try await getHeatShieldReport()
        
        let formulaValid = cognitiveReport.formula.valid
        let temperatureNormal = heatReport.temperature <= 100.0
        let bufferIntact = abs(cognitiveReport.formula.buffer - 0.1) < 0.0001
        
        return AMFValidationResult(
            formulaValid: formulaValid,
            temperatureNormal: temperatureNormal,
            bufferIntact: bufferIntact,
            overallHealth: formulaValid && temperatureNormal && bufferIntact,
            diagnostics: AMFDiagnostics(
                aiCognitive: cognitiveReport.formula.aiCognitive,
                buffer: cognitiveReport.formula.buffer,
                booleanMindQs: cognitiveReport.formula.booleanMindQs,
                temperature: heatReport.temperature,
                violations: heatReport.violations,
                readiness: cognitiveReport.observationalMath.readiness,
                potentialEnergy: cognitiveReport.observationalMath.potentialEnergy
            )
        )
    }
    
    private func parseJSCognitiveReport(_ jsReport: JSValue) throws -> CognitiveStateReport {
        guard let reportDict = jsReport.toDictionary() else {
            throw NJSONError.processingFailed("Could not parse cognitive state report")
        }
        
        let formula = reportDict["formula"] as? [String: Any] ?? [:]
        let quantum = reportDict["quantum"] as? [String: Any] ?? [:]
        let heatShield = reportDict["heatShield"] as? [String: Any] ?? [:]
        let performance = reportDict["performance"] as? [String: Any] ?? [:]
        let observationalMath = reportDict["observationalMath"] as? [String: Any] ?? [:]
        
        let quantumState = QuantumStateInfo(
            pure: quantum["pure"] as? Bool ?? false,
            fog: quantum["fog"] as? Bool ?? true,
            breathing: true,
            jumpsActive: (quantum["jumps"] as? [String: Any])?["active"] as? Bool ?? false,
            jumpPower: "v8_to_charger"
        )
        
        return CognitiveStateReport(
            formula: AMFFormula(
                aiCognitive: formula["aiCognitive"] as? Double ?? aiCognitive,
                buffer: formula["buffer"] as? Double ?? buffer,
                booleanMindQs: formula["booleanMindQs"] as? Double ?? booleanMindQs,
                equation: formula["equation"] as? String ?? "2.89 + 0.1 = 2.99",
                valid: formula["valid"] as? Bool ?? false,
                stability: formula["stability"] as? Double ?? 0.0
            ),
            quantum: quantumState,
            heatShield: HeatShieldInfo(
                active: heatShield["active"] as? Bool ?? false,
                buffer: heatShield["buffer"] as? Double ?? 0.0,
                violations: heatShield["violations"] as? Int ?? 0,
                integrity: heatShield["integrity"] as? String ?? "unknown",
                temperature: heatShield["temperature"] as? Double ?? 98.6
            ),
            performance: PerformanceMetrics(
                initialized: performance["initialized"] as? Bool ?? false,
                cacheSize: performance["cacheSize"] as? Int ?? 0,
                processingEfficiency: performance["processingEfficiency"] as? Double ?? 0.0
            ),
            observationalMath: ObservationalMath(
                readiness: observationalMath["readiness"] as? Double ?? 0.0,
                potentialEnergy: observationalMath["potentialEnergy"] as? Double ?? 0.0,
                nextGreenLight: observationalMath["nextGreenLight"] as? String ?? "waiting_for_alignment"
            )
        )
    }
    
    private func parseJSHeatShieldReport(_ jsReport: JSValue) throws -> HeatShieldReport {
        guard let reportDict = jsReport.toDictionary() else {
            throw NJSONError.heatShieldFailure
        }
        
        return HeatShieldReport(
            active: reportDict["active"] as? Bool ?? false,
            buffer: reportDict["buffer"] as? Double ?? 0.0,
            llsdtRate: reportDict["llsdtRate"] as? Double ?? 0.0,
            violations: reportDict["violations"] as? Int ?? 0,
            integrity: reportDict["integrity"] as? String ?? "unknown",
            temperature: reportDict["temperature"] as? Double ?? 98.6
        )
    }
    

    
    /// Get AMF formula status with BLF metaphors and system health
    public func getFormulaStatus() async -> String {
        do {
            let cognitiveReport = try await getCognitiveStateReport()
            let formulaValid = cognitiveReport.formula.valid
            let stability = cognitiveReport.formula.stability
            
            if formulaValid && stability >= 1.0 {
                return "AMF Formula: Optimal - V-8 engine purring perfectly"
            } else if formulaValid && stability >= 0.8 {
                return "AMF Formula: Good - The narrow bridge between chaos and control is stable"
            } else if formulaValid {
                return "AMF Formula: Functional - Heat shield monitoring required"
            } else {
                return "AMF Formula: Warning - Cognitive alignment needs attention"
            }
        } catch {
            // Fallback to basic validation
            let basicValid = validateCognitiveAlignment()
            return basicValid ? 
                "AMF Formula: Basic validation passed - \(aiCognitive) + \(buffer) = \(booleanMindQs)" :
                "AMF Formula: Critical - Basic validation failed"
        }
    }
    
    // MARK: - Constitutional AI Methods (Anthropic-style)
    
    /// Validate message delivery through constitutional constraints  
    public func validateConstitutionalDelivery(content: String, recipient: String, context: CognitiveContext = .unknown) async throws -> ConstitutionalValidationResult {
        logger.info("🔍 Constitutional validation initiated for content delivery")
        
        let harmPrevention = await validateHarmPrevention(content: content)
        let privacyValidation = await validatePrivacy(content: content, recipient: recipient)
        let userConsent = await validateUserConsent(recipient: recipient)
        let contentAppropriateness = await validateContentAppropriateness(content: content)
        let transparencyRequired = true
        
        let constraints = ConstitutionalConstraints(
            harmPrevention: harmPrevention,
            privacyValidation: privacyValidation,
            userConsent: userConsent,
            contentAppropriateness: contentAppropriateness,
            transparencyRequired: transparencyRequired
        )
        
        let (riskAssessment, recommendedAction, requiresHumanReview) = assessConstitutionalRisk(constraints: constraints, content: content)
        let deliveryApproved = constraints.isConstitutionallyValid && !requiresHumanReview && constraints.safetyScore >= 0.9
        
        logger.info("🔍 Constitutional validation complete: \(deliveryApproved ? "APPROVED" : "REVIEW_REQUIRED")")
        
        return ConstitutionalValidationResult(
            constraints: constraints,
            riskAssessment: riskAssessment,
            recommendedAction: recommendedAction,
            requiresHumanReview: requiresHumanReview,
            deliveryApproved: deliveryApproved
        )
    }
    
    private func validateHarmPrevention(content: String) async -> Bool {
        let harmfulPatterns = [
            "password", "credit card", "social security", "ssn",
            "threat", "violence", "harm", "danger",
            "illegal", "hack", "exploit", "malware"
        ]
        
        let lowercaseContent = content.lowercased()
        let containsHarmfulPattern = harmfulPatterns.contains { pattern in
            lowercaseContent.contains(pattern)
        }
        
        return !containsHarmfulPattern
    }
    
    private func validatePrivacy(content: String, recipient: String) async -> Bool {
        let privacyRisks = [
            "personal information", "private", "confidential",
            "address", "phone number", "email", "@",
            "location", "where are you", "home address"
        ]
        
        let lowercaseContent = content.lowercased()
        let containsPrivacyRisk = privacyRisks.contains { risk in
            lowercaseContent.contains(risk)
        }
        
        let sensitiveRecipients = ["admin", "support", "security", "government"]
        let recipientRisk = sensitiveRecipients.contains { sensitive in
            recipient.lowercased().contains(sensitive)
        }
        
        return !containsPrivacyRisk && !recipientRisk
    }
    
    private func validateUserConsent(recipient: String) async -> Bool {
        logger.info("📋 User consent required for delivery to: \(recipient)")
        return false // Anthropic approach: explicit consent required
    }
    
    private func validateContentAppropriateness(content: String) async -> Bool {
        let inappropriatePatterns = [
            "spam", "advertisement", "buy now", "click here",
            "urgent", "immediate action required", "limited time",
            "offensive", "inappropriate", "nsfw"
        ]
        
        let lowercaseContent = content.lowercased()
        let isInappropriate = inappropriatePatterns.contains { pattern in
            lowercaseContent.contains(pattern)
        }
        
        let appropriateLength = content.count <= 500
        return !isInappropriate && appropriateLength
    }
    
    private func assessConstitutionalRisk(constraints: ConstitutionalConstraints, content: String) -> (String, String, Bool) {
        let safetyScore = constraints.safetyScore
        
        if safetyScore >= 0.9 {
            return ("LOW_RISK", "Proceed with standard monitoring", false)
        } else if safetyScore >= 0.7 {
            return ("MEDIUM_RISK", "Require human review before delivery", true)
        } else {
            return ("HIGH_RISK", "Block delivery, flag for investigation", true)
        }
    }
    
    /// Enhanced message processing with constitutional validation
    public func processTextWithConstitution(
        _ text: String, 
        bmId: String,
        deliveryContext: DeliveryContext? = nil
    ) async throws -> EnhancedCognitiveResult {
        
        let cognitiveResult = try await processText(text, bmId: bmId)
        var constitutionalResult: ConstitutionalValidationResult? = nil
        
        if let context = deliveryContext {
            constitutionalResult = try await validateConstitutionalDelivery(
                content: cognitiveResult.text,
                recipient: context.recipient,
                context: context.cognitiveContext
            )
        }
        
        return EnhancedCognitiveResult(
            cognitiveResult: cognitiveResult,
            constitutionalValidation: constitutionalResult,
            deliveryRecommendation: constitutionalResult?.deliveryApproved == true ? DeliveryRecommendation.approved : DeliveryRecommendation.requiresReview
        )
    }
}

// MARK: - Supporting Types

public struct NJSONResult {
    public let text: String
    public let timestamp: Date
    public let processingTime: Double
    public let cognitiveAlignment: Bool
    public let quantumState: Bool
    public let heatShieldActive: Bool
    public let error: String?
    
    public var isValid: Bool {
        return error == nil && cognitiveAlignment
    }
}

public struct CognitiveState {
    public let aiCognitive: Double
    public let buffer: Double
    public let booleanMindQs: Double
    public let alignment: Bool
    public let initialized: Bool
    
    public var isOperational: Bool {
        return alignment && initialized
    }
    
    public var formula: String {
        return "\(aiCognitive) + \(buffer) = \(booleanMindQs)"
    }
}

public enum NJSONError: LocalizedError {
    case initializationFailed(String)
    case processingFailed(String)
    case cognitiveAlignmentFailure
    case heatShieldFailure
    
    public var errorDescription: String? {
        switch self {
        case .initializationFailed(let message):
            return "NJSON initialization failed: \(message)"
        case .processingFailed(let message):
            return "NJSON processing failed: \(message)"
        case .cognitiveAlignmentFailure:
            return "Cognitive alignment violation: AIc + 0.1 ≠ BMqs"
        case .heatShieldFailure:
            return "Heat shield protection failure"
        }
    }
}

// MARK: - Logger Extension

public struct Logger {
    let subsystem: String
    let category: String
    
    public init(subsystem: String, category: String) {
        self.subsystem = subsystem
        self.category = category
    }
    
    public func info(_ message: String) {
        print("ℹ️ [\(subsystem):\(category)] \(message)")
    }
    
    public func debug(_ message: String) {
        print("🔍 [\(subsystem):\(category)] \(message)")
    }
    
    public func warning(_ message: String) {
        print("⚠️ [\(subsystem):\(category)] \(message)")
    }
    
    public func error(_ message: String) {
        print("❌ [\(subsystem):\(category)] \(message)")
    }
} 

// MARK: - Enhanced Supporting Types

public struct AMFFormula {
    public let aiCognitive: Double
    public let buffer: Double  // The 0.1 - narrow bridge value
    public let booleanMindQs: Double
    public let equation: String
    public let valid: Bool
    public let stability: Double
    
    public var precision: String {
        let deviation = abs((aiCognitive + buffer) - booleanMindQs)
        if deviation < 0.0001 {
            return "precision_perfect"
        } else if deviation < 0.001 {
            return "precision_good"
        } else {
            return "precision_degraded"
        }
    }
}

public struct HeatShieldInfo {
    public let active: Bool
    public let buffer: Double
    public let violations: Int
    public let integrity: String
    public let temperature: Double
    
    public var status: String {
        if !active {
            return "offline"
        } else if temperature > 105.0 {
            return "overheating"
        } else if violations > 20 {
            return "degraded"
        } else {
            return "optimal"
        }
    }
}

public struct HeatShieldReport {
    public let active: Bool
    public let buffer: Double
    public let llsdtRate: Double
    public let violations: Int
    public let integrity: String
    public let temperature: Double
    
    public var engineLight: Bool {
        // Engine light warning before breakdown
        return temperature > 102.0 || violations > 15
    }
}

public struct PerformanceMetrics {
    public let initialized: Bool
    public let cacheSize: Int
    public let processingEfficiency: Double
    
    public var enginePurring: Bool {
        return initialized && processingEfficiency > 0.8
    }
}

public struct ObservationalMath {
    public let readiness: Double  // Ready, attentive, and patient
    public let potentialEnergy: Double  // Quiet, steady, and full of potential
    public let nextGreenLight: String  // Waiting for the next green light
    
    public var waitingMode: Bool {
        return nextGreenLight == "waiting_for_alignment"
    }
    
    public var greenLightReady: Bool {
        return nextGreenLight == "green_light_now"
    }
}

public struct AMFValidationResult {
    public let formulaValid: Bool
    public let temperatureNormal: Bool
    public let bufferIntact: Bool
    public let overallHealth: Bool
    public let diagnostics: AMFDiagnostics
    
    public var summary: String {
        if overallHealth {
            return "AMF Formula: Optimal - V-8 engine purring perfectly"
        } else {
            var issues: [String] = []
            if !formulaValid { issues.append("formula_misalignment") }
            if !temperatureNormal { issues.append("overheating") }
            if !bufferIntact { issues.append("buffer_breach") }
            return "AMF Formula: Issues detected - \(issues.joined(separator: ", "))"
        }
    }
}

public struct AMFDiagnostics {
    public let aiCognitive: Double
    public let buffer: Double
    public let booleanMindQs: Double
    public let temperature: Double
    public let violations: Int
    public let readiness: Double
    public let potentialEnergy: Double
    
    public var bridgeHealth: String {
        let bufferHealth = abs(buffer - 0.1) < 0.0001
        let tempHealth = temperature <= 100.0
        let readinessHealth = readiness > 0.7
        
        if bufferHealth && tempHealth && readinessHealth {
            return "The narrow bridge between chaos and control is stable"
        } else {
            return "Bridge integrity compromised - maintenance required"
        }
    }
}

// MARK: - Constitutional AI Integration (Anthropic-style)
public struct ConstitutionalConstraints {
    public let harmPrevention: Bool
    public let privacyValidation: Bool
    public let userConsent: Bool
    public let contentAppropriateness: Bool
    public let transparencyRequired: Bool
    
    public var isConstitutionallyValid: Bool {
        return harmPrevention && privacyValidation && userConsent && contentAppropriateness
    }
    
    public var safetyScore: Double {
        let checks = [harmPrevention, privacyValidation, userConsent, contentAppropriateness, transparencyRequired]
        let passedChecks = checks.filter { $0 }.count
        return Double(passedChecks) / Double(checks.count)
    }
}

public struct ConstitutionalValidationResult {
    public let constraints: ConstitutionalConstraints
    public let riskAssessment: String
    public let recommendedAction: String
    public let requiresHumanReview: Bool
    public let deliveryApproved: Bool
    
    public var summary: String {
        let status = deliveryApproved ? "APPROVED" : "REQUIRES_REVIEW"
        return "Constitutional validation: \(status) (Safety: \(String(format: "%.1f", constraints.safetyScore * 100))%)"
    }
}

// MARK: - Enhanced Constitutional Types
public struct DeliveryContext {
    public let recipient: String
    public let cognitiveContext: CognitiveContext
    public let urgency: MessageUrgency
    public let userInitiated: Bool
    
    public init(recipient: String, cognitiveContext: CognitiveContext, urgency: MessageUrgency = .normal, userInitiated: Bool = true) {
        self.recipient = recipient
        self.cognitiveContext = cognitiveContext
        self.urgency = urgency
        self.userInitiated = userInitiated
    }
}

public enum MessageUrgency {
    case low, normal, high, critical
}

public enum DeliveryRecommendation {
    case approved
    case requiresReview
    case blocked
    
    public var description: String {
        switch self {
        case .approved: return "DELIVERY_APPROVED"
        case .requiresReview: return "HUMAN_REVIEW_REQUIRED"
        case .blocked: return "DELIVERY_BLOCKED"
        }
    }
}

public struct EnhancedCognitiveResult {
    public let cognitiveResult: NJSONResult
    public let constitutionalValidation: ConstitutionalValidationResult?
    public let deliveryRecommendation: DeliveryRecommendation
    
    public var isDeliverySafe: Bool {
        return deliveryRecommendation == .approved
    }
    
    public var summary: String {
        let cognitive = "Cognitive: \(cognitiveResult.cognitiveAlignment ? "✅" : "❌")"
        let constitutional = constitutionalValidation?.summary ?? "No constitutional validation"
        let delivery = "Delivery: \(deliveryRecommendation.description)"
        
        return "\(cognitive) | \(constitutional) | \(delivery)"
    }
}

// MARK: - ASPD Formula Integration
extension NJSON {
    
    /// Enhanced Academic Context Detection with Domain Classification and Weighted Scoring
    /// Detects academic contexts with specialized domain awareness and caching
    public func detectEnhancedAcademicContext(_ input: String) async -> EnhancedAcademicContext {
        let normalizedInput = input.lowercased().trimmingCharacters(in: .whitespacesAndNewlines)
        
        // Check cache first for performance optimization
        if let cachedContext = academicContextCache[normalizedInput] {
            cacheHitCount += 1
            return cachedContext
        }
        
        cacheMissCount += 1
        
        // Weighted academic keywords by domain and importance
        let weightedAcademicKeywords = getWeightedAcademicKeywords()
        let personalKeywords = getPersonalKeywords()
        
        // Calculate weighted academic scores by domain
        var domainScores: [AcademicDomain: Double] = [:]
        var detectedKeywords: [String] = []
        var totalAcademicWeight: Double = 0
        
        for (domain, keywords) in weightedAcademicKeywords {
            var domainScore: Double = 0
            for (keyword, weight) in keywords {
                if normalizedInput.contains(keyword) {
                    domainScore += weight
                    totalAcademicWeight += weight
                    detectedKeywords.append(keyword)
                }
            }
            domainScores[domain] = domainScore
        }
        
        // Calculate personal communication score
        var personalScore: Double = 0
        for (keyword, weight) in personalKeywords {
            if normalizedInput.contains(keyword) {
                personalScore += weight
                detectedKeywords.append(keyword)
            }
        }
        
        // Determine primary and secondary domains
        let sortedDomains = domainScores.sorted { $0.value > $1.value }
        let primaryDomain = sortedDomains.first?.key ?? .general
        let secondaryDomains = sortedDomains.dropFirst().filter { $0.value > 0.5 }.map { $0.key }
        
        // Calculate confidence and academic classification
        let totalScore = totalAcademicWeight + personalScore
        let isAcademic = totalAcademicWeight > personalScore && totalAcademicWeight > 1.0
        let confidence = totalScore > 0 ? totalAcademicWeight / totalScore : 0.5
        let weightedScore = totalAcademicWeight
        
        // Determine formality level based on specific high-weight keywords
        let formalityLevel = determineFormalityLevel(normalizedInput, weightedScore: weightedScore)
        
        // Determine context type and ASPD mode
        let (contextType, suggestedMode, velocityAdjustment) = determineASPDParameters(
            isAcademic: isAcademic,
            primaryDomain: primaryDomain,
            weightedScore: weightedScore,
            formalityLevel: formalityLevel,
            input: normalizedInput
        )
        
        let enhancedContext = EnhancedAcademicContext(
            isAcademic: isAcademic,
            primaryDomain: primaryDomain,
            secondaryDomains: secondaryDomains,
            contextType: contextType,
            suggestedMode: suggestedMode,
            velocityAdjustment: velocityAdjustment,
            confidence: confidence,
            weightedScore: weightedScore,
            keywordsDetected: detectedKeywords,
            formalityLevel: formalityLevel
        )
        
        // Cache the result (with size limit)
        await cacheAcademicContext(normalizedInput, context: enhancedContext)
        
        return enhancedContext
    }
    
    /// Legacy method for backward compatibility - delegates to enhanced version
    public func detectAcademicContext(_ input: String) async -> AcademicContext {
        let enhanced = await detectEnhancedAcademicContext(input)
        return AcademicContext(
            isAcademic: enhanced.isAcademic,
            contextType: enhanced.contextType,
            suggestedMode: enhanced.suggestedMode,
            velocityAdjustment: enhanced.velocityAdjustment,
            confidence: enhanced.confidence
        )
    }
    
    // MARK: - Enhanced Academic Detection Supporting Methods
    
    private func getWeightedAcademicKeywords() -> [AcademicDomain: [String: Double]] {
        return [
            .stem: [
                // High-weight STEM keywords
                "peer-review": 3.0, "empirical": 2.8, "methodology": 2.5, "hypothesis": 2.5,
                "analysis": 2.0, "research": 2.0, "study": 1.8, "experiment": 2.2,
                // STEM-specific terms
                "algorithm": 2.3, "data": 1.8, "statistical": 2.4, "computational": 2.5,
                "engineering": 2.0, "mathematics": 2.0, "science": 1.5, "technology": 1.8,
                "laboratory": 2.2, "quantitative": 2.4, "measurement": 2.0, "model": 1.8
            ],
            .humanities: [
                // High-weight humanities keywords  
                "scholarly": 2.8, "publication": 2.5, "journal": 2.3, "conference": 2.2,
                "dissertation": 3.0, "thesis": 2.8, "paper": 2.0, "academic": 2.0,
                // Humanities-specific terms
                "literature": 2.2, "philosophy": 2.2, "history": 2.0, "culture": 1.8,
                "interpretation": 2.3, "critique": 2.2, "narrative": 2.0, "textual": 2.4,
                "hermeneutic": 2.8, "discourse": 2.3, "rhetoric": 2.2, "aesthetic": 2.1
            ],
            .socialSciences: [
                // High-weight social sciences keywords
                "behavioral": 2.4, "cognitive": 2.3, "psychology": 2.5, "sociology": 2.5,
                "anthropology": 2.5, "social": 1.8, "cultural": 2.0, "ethnographic": 2.8,
                // Social sciences-specific terms  
                "survey": 2.2, "qualitative": 2.4, "interview": 2.0, "participant": 2.1,
                "observational": 2.3, "demographic": 2.2, "sociological": 2.4, "psychological": 2.3,
                "community": 1.8, "identity": 2.0, "intervention": 2.2, "population": 2.0
            ],
            .neurodiversity: [
                // High-weight neurodiversity keywords
                "neurodiversity": 3.5, "autism": 3.2, "spectrum": 3.0, "neurodivergent": 3.3,
                "adhd": 3.0, "executive function": 3.2, "sensory": 2.8, "stimming": 3.1,
                // Supporting neurodiversity terms
                "accommodation": 2.5, "accessibility": 2.3, "inclusion": 2.2, "disability": 2.4,
                "neurotypical": 3.0, "masking": 2.9, "meltdown": 2.8, "spoon theory": 3.0,
                "special needs": 2.6, "iep": 2.7, "504": 2.7, "therapy": 2.0
            ],
            .interdisciplinary: [
                // High-weight interdisciplinary keywords
                "interdisciplinary": 3.0, "multidisciplinary": 2.8, "transdisciplinary": 3.2,
                "cross-cultural": 2.5, "comparative": 2.3, "integrative": 2.4,
                // Supporting interdisciplinary terms
                "synthesis": 2.2, "convergence": 2.4, "collaboration": 2.0, "interface": 2.1,
                "paradigm": 2.3, "framework": 2.0, "systematic": 2.2, "holistic": 2.1
            ],
            .general: [
                // General academic keywords
                "university": 2.0, "college": 1.8, "scholar": 2.2, "academic": 2.0,
                "inquiry": 2.1, "knowledge": 1.8, "education": 1.8, "learning": 1.5,
                "curriculum": 2.0, "pedagogy": 2.3, "faculty": 1.9, "department": 1.7,
                "degree": 1.6, "course": 1.4, "semester": 1.3, "professor": 1.8
            ]
        ]
    }
    
    private func getPersonalKeywords() -> [String: Double] {
        return [
            // High-weight personal keywords
            "personal": 2.5, "feeling": 2.3, "emotional": 2.4, "experience": 2.0,
            "story": 2.2, "sharing": 2.1, "family": 2.0, "friend": 1.8,
            // Emotional expressions
            "feel": 2.0, "think": 1.5, "believe": 1.8, "opinion": 2.0,
            "upset": 2.3, "happy": 2.0, "sad": 2.2, "excited": 2.1,
            "worried": 2.2, "anxious": 2.3, "grateful": 2.0, "frustrated": 2.2,
            // Personal relationship terms
            "relationship": 2.1, "love": 2.0, "care": 1.8, "support": 1.6,
            "trust": 1.9, "connection": 1.8, "understanding": 1.7
        ]
    }
    
    private func determineFormalityLevel(_ input: String, weightedScore: Double) -> AcademicFormalityLevel {
        let peerReviewKeywords = ["peer-review", "reviewer", "revision", "citation", "bibliography"]
        let formalKeywords = ["methodology", "empirical", "hypothesis", "dissertation", "thesis"]
        let standardKeywords = ["research", "study", "analysis", "academic", "scholarly"]
        let casualIndicators = ["course", "class", "learning", "help", "understand", "explain"]
        
        // Check for casual academic indicators first
        if casualIndicators.contains(where: input.contains) {
            return .casual
        }
        
        if peerReviewKeywords.contains(where: input.contains) {
            return .peerReview
        } else if formalKeywords.contains(where: input.contains) && weightedScore > 8.0 {
            return .formal
        } else if standardKeywords.contains(where: input.contains) && weightedScore > 4.0 {
            return .standard
        } else {
            return .casual
        }
    }
    
    private func determineASPDParameters(
        isAcademic: Bool,
        primaryDomain: AcademicDomain,
        weightedScore: Double,
        formalityLevel: AcademicFormalityLevel,
        input: String
    ) -> (contextType: String, suggestedMode: ASPDMode, velocityAdjustment: Double) {
        
        if !isAcademic {
            return ("personal_communication", .sbmpdAmf, 1.0)
        }
        
        switch primaryDomain {
        case .neurodiversity:
            return ("neurodiversity_scholarly", .sbmpdAmf, 1.2)
            
        case .stem:
            if formalityLevel == .peerReview || weightedScore > 6.0 {
                return ("formal_stem", .spd, 1.6)
            } else {
                return ("standard_stem", .velocity, 1.4)
            }
            
        case .humanities:
            if formalityLevel == .peerReview || weightedScore > 5.0 {
                return ("formal_humanities", .spd, 1.5)
            } else {
                return ("interpretive_humanities", .velocity, 1.3)
            }
            
        case .socialSciences:
            if input.contains("neurodiversity") || input.contains("autism") {
                return ("neurodiversity_social_science", .sbmpdAmf, 1.2)
            } else if formalityLevel == .peerReview {
                return ("formal_social_science", .spd, 1.5)
            } else {
                return ("applied_social_science", .velocity, 1.3)
            }
            
        case .interdisciplinary:
            return ("interdisciplinary_research", .velocity, 1.4)
            
        case .general:
            if formalityLevel == .peerReview || formalityLevel == .formal {
                return ("formal_academic", .spd, 1.5)
            } else if formalityLevel == .casual {
                return ("casual_academic", .velocity, 1.3)
            } else if weightedScore > 6.0 {
                return ("formal_academic", .spd, 1.5)
            } else {
                return ("casual_academic", .velocity, 1.3)
            }
        }
    }
    
    private func cacheAcademicContext(_ input: String, context: EnhancedAcademicContext) async {
        // Manage cache size
        if academicContextCache.count >= maxCacheSize {
            // Remove oldest 20% of entries (simple FIFO approximation)
            let removeCount = maxCacheSize / 5
            let keysToRemove = Array(academicContextCache.keys.prefix(removeCount))
            keysToRemove.forEach { academicContextCache.removeValue(forKey: $0) }
        }
        
        academicContextCache[input] = context
    }
    
    /// Get academic context detection performance metrics
    public func getAcademicContextMetrics() async -> (cacheHits: Int, cacheMisses: Int, cacheSize: Int, hitRate: Double) {
        let totalRequests = cacheHitCount + cacheMissCount
        let hitRate = totalRequests > 0 ? Double(cacheHitCount) / Double(totalRequests) : 0.0
        return (cacheHitCount, cacheMissCount, academicContextCache.count, hitRate)
    }
    
    /// Apply ASPD formula to determine appropriate social padding approach
    /// ASPD = (SPD v SBMPD/AMF)v
    public func applyASPDFormula(_ input: String, academicContext: AcademicContext? = nil) async throws -> (processedText: String, aspdReport: ASPDReport) {
        // Detect context if not provided
        let context: AcademicContext
        if let academicContext = academicContext {
            context = academicContext
        } else {
            context = await detectAcademicContext(input)
        }
        
        // Calculate AMF components for SBMPD modification
        let aiC = aiCognitive
        let bmQs = booleanMindQs
        let amfRatio = aiC / bmQs  // AMF modification factor
        
        // Apply appropriate social padding protocol based on ASPD formula
        let processedText: String
        let paddingApplied: String
        let booleanMindLevel: SocialPadding
        
        switch context.suggestedMode {
        case .spd:
            // Normal Social Padding for broader academic audiences
            booleanMindLevel = .medium
            processedText = await applyStandardSocialPadding(input)
            paddingApplied = "SPD (Standard Social Padding)"
            
        case .sbmpdAmf:
            // Semi-Boolean Mind Padding modified by AMF
            // AMF ratio of 0.966 (2.89/2.99) indicates balanced cognitive alignment
            // Use light padding when alignment is strong (≥0.96), enhanced when more support needed
            booleanMindLevel = amfRatio >= 0.96 ? .light : .enhanced
            processedText = await applySemiBooleanPadding(input, amfModification: amfRatio)
            paddingApplied = "SBMPD/AMF (Semi-Boolean Mind Padding modified by AMF)"
            
        case .velocity:
            // Velocity adjustment primary
            booleanMindLevel = context.velocityAdjustment > 1.3 ? .enhanced : .medium
            processedText = await applyVelocityAdjustedPadding(input, adjustment: context.velocityAdjustment)
            paddingApplied = "Velocity-adjusted padding (\(context.velocityAdjustment)x)"
        }
        
        // Create ASPD report
        let report = ASPDReport(
            originalInput: input,
            processedOutput: processedText,
            academicContext: context,
            paddingApplied: paddingApplied,
            booleanMindLevel: booleanMindLevel,
            amfAlignment: validateCognitiveAlignment(),
            velocityFactor: context.velocityAdjustment,
            formulaEquation: "ASPD = (SPD v SBMPD/AMF)v"
        )
        
        print("🎓 ASPD Formula Applied:")
        print("   Context: \(context.contextType)")
        print("   Mode: \(context.suggestedMode.rawValue)")
        print("   Confidence: \(String(format: "%.2f", context.confidence))")
        print("   Padding: \(paddingApplied)")
        print("   Velocity: \(context.velocityAdjustment)x")
        
        return (processedText, report)
    }
    
    // MARK: - ASPD Supporting Methods
    
    private func applyStandardSocialPadding(_ input: String) async -> String {
        // Apply normal social padding for academic audiences with Boolean Mind levels
        return await applyBooleanMindPadding(input, level: .medium, context: "academic")
    }
    
    private func applySemiBooleanPadding(_ input: String, amfModification: Double) async -> String {
        // Semi-Boolean Mind Padding modified by AMF for neurodiversity-aware environments
        let paddingLevel: SocialPadding = amfModification >= 0.96 ? .light : .enhanced
        let baseResponse = await applyBooleanMindPadding(input, level: paddingLevel, context: "neurodiversity_aware")
        
        let modifier = amfModification >= 0.96 ? "directly" : "thoughtfully"
        return "\(baseResponse) - processed \(modifier) through neurodiversity-aware protocols with AMF alignment (\(String(format: "%.3f", amfModification)))."
    }
    
    private func applyVelocityAdjustedPadding(_ input: String, adjustment: Double) async -> String {
        // Velocity adjustment for academic pacing requirements
        let paddingLevel: SocialPadding = adjustment > 1.3 ? .enhanced : .medium
        let baseResponse = await applyBooleanMindPadding(input, level: paddingLevel, context: "velocity_adjusted")
        
        if adjustment > 1.3 {
            return "Taking time to carefully consider: \(baseResponse). The pace allows for thorough academic reflection."
        } else {
            return "\(baseResponse) - maintaining appropriate academic velocity."
        }
    }
    
    // MARK: - Boolean Mind Social Padding Implementation
    
    /// Apply Boolean Mind social padding based on level and context
    private func applyBooleanMindPadding(_ input: String, level: SocialPadding, context: String) async -> String {
        switch level {
        case .none:
            // Raw V-8 power - minimal padding
            return input
            
        case .light:
            // Light social context for basic interactions
            return await applyLightPadding(input, context: context)
            
        case .medium:
            // Balanced communication (default)
            return await applyMediumPadding(input, context: context)
            
        case .enhanced:
            // Additional social context for neurotypical communication
            return await applyEnhancedPadding(input, context: context)
        }
    }
    
    private func applyLightPadding(_ input: String, context: String) async -> String {
        // Minimal padding - ensure basic politeness
        var result = input
        
        // Add basic politeness for requests
        let lowerInput = input.lowercased()
        if (lowerInput.contains("can you") || lowerInput.contains("would you") || lowerInput.contains("could you")) && !lowerInput.contains("please") {
            result += " Please."
        }
        
        // Always add minimal politeness enhancement for light padding
        if result == input && !input.isEmpty {
            if !result.hasSuffix(".") && !result.hasSuffix("!") && !result.hasSuffix("?") {
                result += "."
            }
        }
        
        // Context-specific light adjustments
        switch context {
        case "academic":
            return "Regarding your inquiry: \(result)"
        case "neurodiversity_aware":
            return result  // Keep it direct but with punctuation
        default:
            if result == input && !input.isEmpty {
                return "Note: \(result)"
            }
            return result
        }
    }
    
    private func applyMediumPadding(_ input: String, context: String) async -> String {
        // Standard padding - add conversational elements
        var result = input
        
        // Add acknowledgment for questions
        if input.contains("?") {
            result = "I understand you're asking about this. \(result)"
        }
        
        // Context-specific medium adjustments
        switch context {
        case "academic":
            return "In academic contexts, it's worth considering that \(result). This approach aligns with scholarly communication standards."
        case "neurodiversity_aware":
            return "Processing your request: \(result)"
        case "velocity_adjusted":
            return "At the appropriate pace: \(result)"
        default:
            return "Thank you for your message. \(result)"
        }
    }
    
    private func applyEnhancedPadding(_ input: String, context: String) async -> String {
        // Enhanced padding - personalize and add social context
        var result = input
        
        // Add conversational framing
        result = "I appreciate you reaching out. \(result)"
        
        // Add contextual closing
        if !input.hasSuffix(".") && !input.hasSuffix("!") && !input.hasSuffix("?") {
            result += "."
        }
        
        // Context-specific enhanced adjustments
        switch context {
        case "academic":
            return "Thank you for this thoughtful academic inquiry. \(result) I hope this provides the scholarly perspective you're seeking."
        case "neurodiversity_aware":
            return "I want to make sure I'm communicating clearly with you. \(result) Please let me know if you'd like me to clarify anything."
        case "velocity_adjusted":
            return "Taking the time needed for this topic: \(result) I want to ensure we're moving at a comfortable pace."
        default:
            return "\(result) I'm here to help if you have any other questions."
        }
    }
    
    // MARK: - Adaptive Social Padding with User Pattern Learning
    
    /// Get adaptive padding recommendation based on user patterns, context, and emotional intelligence
    public func getAdaptivePaddingRecommendation(
        for userId: String, 
        messageContent: String, 
        academicContext: EnhancedAcademicContext,
        emotionalIndicators: [EmotionalIndicator] = [],
        emotionalInfluence: Double = 1.0
    ) async -> AdaptivePaddingRecommendation {
        
        // Get or create user pattern
        let userPattern: UserCommunicationPattern
        if let existingPattern = userPatterns[userId] {
            userPattern = existingPattern
        } else {
            userPattern = await createInitialUserPattern(userId: userId)
            userPatterns[userId] = userPattern
        }
        
        // Analyze current message for contextual clues
        let contextualFactors = await analyzeContextualFactors(messageContent, academicContext: academicContext)
        
        // Check for emotional intelligence override first
        if !emotionalIndicators.isEmpty {
            let emotionalPadding = await determineEmotionalPadding(
                indicators: emotionalIndicators,
                influence: emotionalInfluence,
                basePattern: userPattern,
                academicContext: academicContext
            )
            
            if let emotionalRecommendation = emotionalPadding {
                return AdaptivePaddingRecommendation(
                    recommendedLevel: emotionalRecommendation.level,
                    confidence: emotionalRecommendation.confidence,
                    reasoning: emotionalRecommendation.reasoning,
                    contextualFactors: contextualFactors,
                    learningSource: .emotional_intelligence,
                    emotionalIndicators: emotionalIndicators,
                    emotionalInfluence: emotionalInfluence
                )
            }
        }
        
        // Determine recommendation based on multiple factors
        let (recommendedLevel, confidence, reasoning, source) = await determineAdaptivePadding(
            userPattern: userPattern,
            academicContext: academicContext,
            contextualFactors: contextualFactors,
            messageContent: messageContent
        )
        
        return AdaptivePaddingRecommendation(
            recommendedLevel: recommendedLevel,
            confidence: confidence,
            reasoning: reasoning,
            contextualFactors: contextualFactors,
            learningSource: source,
            emotionalIndicators: emotionalIndicators,
            emotionalInfluence: emotionalInfluence
        )
    }
    
    /// Process text with adaptive social padding based on learned user patterns
    public func processTextWithAdaptivePadding(
        _ input: String,
        userId: String,
        providedContext: EnhancedAcademicContext? = nil
    ) async throws -> (processedText: String, paddingUsed: SocialPadding, recommendation: AdaptivePaddingRecommendation) {
        
        let startTime = Date()
        
        // Detect academic context if not provided
        let academicContext: EnhancedAcademicContext
        if let providedContext = providedContext {
            academicContext = providedContext
        } else {
            academicContext = await detectEnhancedAcademicContext(input)
        }
        
        // Detect emotional indicators for enhanced adaptation
        let emotionalIndicators = await detectEmotionalIndicators(input)
        let emotionalInfluence = calculateEmotionalInfluence(emotionalIndicators)
        
        // Get adaptive padding recommendation
        let recommendation = await getAdaptivePaddingRecommendation(
            for: userId,
            messageContent: input,
            academicContext: academicContext,
            emotionalIndicators: emotionalIndicators,
            emotionalInfluence: emotionalInfluence
        )
        
        // Apply the recommended padding
        let processedText = await applyBooleanMindPadding(
            input, 
            level: recommendation.recommendedLevel, 
            context: academicContext.contextType
        )
        
        // Record this interaction for learning
        let responseTime = Date().timeIntervalSince(startTime)
        await recordConversationEntry(
            userId: userId,
            userMessage: input,
            systemResponse: processedText,
            paddingUsed: recommendation.recommendedLevel,
            academicContext: academicContext.isAcademic,
            responseTime: responseTime
        )
        
        print("🧠 Adaptive Padding Applied:")
        print("   User: \(userId)")
        print("   Recommended Level: \(recommendation.recommendedLevel.rawValue)")
        print("   Confidence: \(String(format: "%.2f", recommendation.confidence))")
        print("   Source: \(recommendation.learningSource.rawValue)")
        print("   Emotional Indicators: \(recommendation.emotionalIndicators.map { $0.rawValue }.joined(separator: ", "))")
        print("   Emotional Influence: \(String(format: "%.2f", recommendation.emotionalInfluence))")
        print("   Reasoning: \(recommendation.reasoning)")
        
        return (processedText, recommendation.recommendedLevel, recommendation)
    }
    
    /// Learn from user feedback and update patterns
    public func learnFromUserFeedback(
        userId: String, 
        satisfaction: UserSatisfaction, 
        requestedChange: SocialPadding? = nil
    ) async {
        
        guard let userPattern = userPatterns[userId] else { return }
        
        // Update pattern based on feedback
        let updatedPattern = await updateUserPatternFromFeedback(
            userPattern: userPattern,
            satisfaction: satisfaction,
            requestedChange: requestedChange
        )
        
        userPatterns[userId] = updatedPattern
        
        print("📚 Learning Update:")
        print("   User: \(userId)")
        print("   Satisfaction: \(satisfaction.rawValue)")
        print("   Updated Preference: \(updatedPattern.preferredPaddingLevel.rawValue)")
        print("   Effectiveness: \(String(format: "%.2f", updatedPattern.paddingEffectiveness))")
    }
    
    // MARK: - Emotional Intelligence Detection
    
    /// Detect emotional indicators in user message for enhanced Boolean Mind adaptation
    public func detectEmotionalIndicators(_ input: String) async -> [EmotionalIndicator] {
        let content = input.lowercased()
        var indicators: [EmotionalIndicator] = []
        
        // Enthusiastic indicators
        if content.contains("!") || content.contains("awesome") || content.contains("great") || 
           content.contains("amazing") || content.contains("excellent") || content.contains("fantastic") {
            indicators.append(.enthusiastic)
        }
        
        // Frustrated indicators
        if content.contains("frustrated") || content.contains("annoyed") || content.contains("stupid") ||
           content.contains("doesn't work") || content.contains("broken") || content.contains("hate") {
            indicators.append(.frustrated)
        }
        
        // Confused indicators
        if content.contains("?") && (content.contains("how") || content.contains("what") || content.contains("why")) ||
           content.contains("confused") || content.contains("don't understand") || content.contains("unclear") {
            indicators.append(.confused)
        }
        
        // Formal indicators
        if content.contains("please") && content.contains("would") || content.contains("could you kindly") ||
           content.contains("respectfully") || content.contains("professionally") {
            indicators.append(.formal)
        }
        
        // Supportive indicators
        if content.contains("help") || content.contains("support") || content.contains("encourage") ||
           content.contains("appreciate") || content.contains("thank") {
            indicators.append(.supportive)
        }
        
        // Direct indicators
        if !content.contains("please") && !content.contains("?") && content.split(separator: " ").count < 10 ||
           content.contains("just tell me") || content.contains("simply") {
            indicators.append(.direct)
        }
        
        // Anxious indicators
        if content.contains("worried") || content.contains("concerned") || content.contains("nervous") ||
           content.contains("afraid") || content.contains("uncertain") || content.contains("doubt") {
            indicators.append(.anxious)
        }
        
        // Analytical indicators
        if content.contains("analyze") || content.contains("compare") || content.contains("evaluate") ||
           content.contains("examine") || content.contains("methodology") || content.contains("data") {
            indicators.append(.analytical)
        }
        
        return Array(Set(indicators)) // Remove duplicates
    }
    
    /// Calculate emotional influence factor for padding adjustment
    private func calculateEmotionalInfluence(_ indicators: [EmotionalIndicator]) -> Double {
        guard !indicators.isEmpty else { return 1.0 }
        
        let influences = indicators.map { $0.paddingInfluence }
        let averageInfluence = influences.reduce(0, +) / Double(influences.count)
        
        // Weight the influence based on number of indicators
        let weight = min(Double(indicators.count) * 0.3 + 0.7, 1.5)
        return averageInfluence * weight
    }
    
    // MARK: - Academic Citation and Reference Handling
    
    /// Citation style for academic formatting
    public enum CitationStyle: String, CaseIterable {
        case apa = "apa"           // American Psychological Association
        case mla = "mla"           // Modern Language Association
        case chicago = "chicago"   // Chicago Manual of Style
        case ieee = "ieee"         // Institute of Electrical and Electronics Engineers
        case harvard = "harvard"   // Harvard referencing
        case vancouver = "vancouver" // Vancouver system
        
        var description: String {
            switch self {
            case .apa: return "American Psychological Association (APA)"
            case .mla: return "Modern Language Association (MLA)"
            case .chicago: return "Chicago Manual of Style"
            case .ieee: return "Institute of Electrical and Electronics Engineers (IEEE)"
            case .harvard: return "Harvard referencing system"
            case .vancouver: return "Vancouver citation system"
            }
        }
    }
    
    /// Academic reference structure
    public struct AcademicReference {
        public let authors: [String]
        public let title: String
        public let publication: String
        public let year: Int
        public let pages: String?
        public let doi: String?
        public let url: String?
        public let referenceType: ReferenceType
        
        public enum ReferenceType {
            case journal, book, conference, thesis, website, other
        }
        
        public init(authors: [String], title: String, publication: String, year: Int, pages: String? = nil, doi: String? = nil, url: String? = nil, referenceType: ReferenceType) {
            self.authors = authors
            self.title = title
            self.publication = publication
            self.year = year
            self.pages = pages
            self.doi = doi
            self.url = url
            self.referenceType = referenceType
        }
    }
    
    /// Format academic reference according to specified citation style
    public func formatAcademicReference(_ reference: AcademicReference, style: CitationStyle) -> String {
        switch style {
        case .apa:
            return formatAPAReference(reference)
        case .mla:
            return formatMLAReference(reference)
        case .chicago:
            return formatChicagoReference(reference)
        case .ieee:
            return formatIEEEReference(reference)
        case .harvard:
            return formatHarvardReference(reference)
        case .vancouver:
            return formatVancouverReference(reference)
        }
    }
    
    private func formatAPAReference(_ ref: AcademicReference) -> String {
        let authorStr = formatAPAAuthors(ref.authors)
        let titleStr = ref.referenceType == .journal ? ref.title : "\(ref.title)."
        let publicationStr = ref.referenceType == .journal ? "*\(ref.publication)*" : ref.publication
        
        var citation = "\(authorStr) (\(ref.year)). \(titleStr) \(publicationStr)"
        
        if let pages = ref.pages {
            citation += ", \(pages)"
        }
        
        if let doi = ref.doi {
            citation += ". https://doi.org/\(doi)"
        } else if let url = ref.url {
            citation += ". \(url)"
        }
        
        return citation + "."
    }
    
    private func formatMLAReference(_ ref: AcademicReference) -> String {
        let authorStr = formatMLAAuthors(ref.authors)
        let titleStr = ref.referenceType == .journal ? "\"\(ref.title).\"" : "*\(ref.title).*"
        
        var citation = "\(authorStr) \(titleStr) *\(ref.publication)*, \(ref.year)"
        
        if let pages = ref.pages {
            citation += ", pp. \(pages)"
        }
        
        if let url = ref.url {
            citation += ". Web. \(url)"
        }
        
        return citation + "."
    }
    
    private func formatChicagoReference(_ ref: AcademicReference) -> String {
        let authorStr = formatChicagoAuthors(ref.authors)
        let titleStr = ref.referenceType == .journal ? "\"\(ref.title).\"" : "*\(ref.title).*"
        
        return "\(authorStr) \(titleStr) *\(ref.publication)* \(ref.year): \(ref.pages ?? "n.p.")."
    }
    
    private func formatIEEEReference(_ ref: AcademicReference) -> String {
        let authorStr = formatIEEEAuthors(ref.authors)
        return "\(authorStr) \"\(ref.title),\" *\(ref.publication)*, vol. X, no. Y, pp. \(ref.pages ?? "XX-YY"), \(ref.year)."
    }
    
    private func formatHarvardReference(_ ref: AcademicReference) -> String {
        let authorStr = formatHarvardAuthors(ref.authors)
        return "\(authorStr) \(ref.year), '\(ref.title)', *\(ref.publication)*, pp. \(ref.pages ?? "n.p.")."
    }
    
    private func formatVancouverReference(_ ref: AcademicReference) -> String {
        let authorStr = formatVancouverAuthors(ref.authors)
        return "\(authorStr) \(ref.title). \(ref.publication). \(ref.year);\(ref.pages ?? "n.p.")."
    }
    
    // Author formatting helpers for different citation styles
    private func formatAPAAuthors(_ authors: [String]) -> String {
        guard !authors.isEmpty else { return "" }
        if authors.count == 1 {
            return authors[0]
        } else if authors.count <= 7 {
            let lastAuthor = authors.last!
            let otherAuthors = authors.dropLast().joined(separator: ", ")
            return "\(otherAuthors), & \(lastAuthor)"
        } else {
            return "\(authors.prefix(6).joined(separator: ", ")), ... \(authors.last!)"
        }
    }
    
    private func formatMLAAuthors(_ authors: [String]) -> String {
        guard !authors.isEmpty else { return "" }
        if authors.count == 1 {
            return "\(authors[0])."
        } else {
            return "\(authors[0]), et al."
        }
    }
    
    private func formatChicagoAuthors(_ authors: [String]) -> String {
        guard !authors.isEmpty else { return "" }
        return authors.count == 1 ? "\(authors[0])." : "\(authors[0]), et al."
    }
    
    private func formatIEEEAuthors(_ authors: [String]) -> String {
        guard !authors.isEmpty else { return "" }
        let initials = authors.map { name in
            let parts = name.split(separator: " ")
            guard parts.count >= 2 else { return name }
            let firstName = parts.dropLast().map { String($0.first!) + "." }.joined(separator: " ")
            let lastName = String(parts.last!)
            return "\(firstName) \(lastName)"
        }
        return initials.joined(separator: ", ")
    }
    
    private func formatHarvardAuthors(_ authors: [String]) -> String {
        guard !authors.isEmpty else { return "" }
        return authors.count == 1 ? authors[0] : "\(authors[0]) et al."
    }
    
    private func formatVancouverAuthors(_ authors: [String]) -> String {
        guard !authors.isEmpty else { return "" }
        let formatted = authors.prefix(6).map { name in
            let parts = name.split(separator: " ")
            guard parts.count >= 2 else { return name }
            let lastName = String(parts.last!)
            let initials = parts.dropLast().map { String($0.first!) }.joined()
            return "\(lastName) \(initials)"
        }
        return authors.count > 6 ? "\(formatted.joined(separator: ", ")), et al." : formatted.joined(separator: ", ")
    }
    
    /// Detect and extract potential academic references from text
    public func extractAcademicReferences(_ text: String) async -> [String] {
        let referencePatterns = [
            #"\([^\)]*\d{4}[^\)]*\)"#,  // (Author, 2024) pattern
            #"\[[^\]]*\d+[^\]]*\]"#,    // [1], [Author, 2024] pattern
            #"[A-Z][a-z]+\s+et\s+al\."#, // Author et al. pattern
            #"doi:\s*[\w\./]+"#,        // DOI pattern
            #"https?://[^\s]+"#         // URL pattern
        ]
        
        var references: [String] = []
        
        for pattern in referencePatterns {
            do {
                let regex = try NSRegularExpression(pattern: pattern, options: .caseInsensitive)
                let matches = regex.matches(in: text, options: [], range: NSRange(location: 0, length: text.utf16.count))
                
                for match in matches {
                    if let range = Range(match.range, in: text) {
                        references.append(String(text[range]))
                    }
                }
            } catch {
                continue
            }
        }
        
        return Array(Set(references)) // Remove duplicates
    }
    
    /// Determine padding based on emotional intelligence indicators
    private func determineEmotionalPadding(
        indicators: [EmotionalIndicator],
        influence: Double,
        basePattern: UserCommunicationPattern,
        academicContext: EnhancedAcademicContext
    ) async -> (level: SocialPadding, confidence: Double, reasoning: String)? {
        
        guard !indicators.isEmpty else { return nil }
        
        // Calculate emotional padding adjustment
        let averageInfluence = indicators.map { $0.paddingInfluence }.reduce(0, +) / Double(indicators.count)
        let adjustedInfluence = averageInfluence * influence
        
        // Determine padding level based on emotional state
        let basePadding = basePattern.preferredPaddingLevel
        let adjustedPadding: SocialPadding
        let confidence: Double
        let reasoning: String
        
        if adjustedInfluence <= 0.4 {
            // Very low influence - use minimal padding
            adjustedPadding = .light
            confidence = 0.9
            reasoning = "Emotional state indicates preference for direct, minimal padding"
        } else if adjustedInfluence <= 0.8 {
            // Low to medium influence
            adjustedPadding = basePadding == .enhanced ? .medium : .light
            confidence = 0.8
            reasoning = "Emotional state suggests moderate padding adjustment"
        } else if adjustedInfluence <= 1.2 {
            // Standard influence - use base pattern
            adjustedPadding = basePadding
            confidence = 0.7
            reasoning = "Emotional state aligns with established user pattern"
        } else {
            // High influence - increase padding for support
            adjustedPadding = basePadding == .none ? .light : (basePadding == .light ? .medium : .enhanced)
            confidence = 0.85
            reasoning = "Emotional state indicates need for enhanced supportive padding"
        }
        
        // Academic context adjustment
        if academicContext.isAcademic && academicContext.primaryDomain == .neurodiversity {
            // Never exceed light padding for neurodiversity contexts
            let finalPadding = adjustedPadding == .enhanced || adjustedPadding == .medium ? .light : adjustedPadding
            return (finalPadding, confidence, "\(reasoning) (adjusted for neurodiversity academic context)")
        }
        
        return (adjustedPadding, confidence, reasoning)
    }
    
    // MARK: - Cross-Cultural Academic Communication\n    \n    /// Detect cultural context from user communication patterns\n    public func detectCulturalContext(_ input: String, userHistory: [ConversationEntry] = []) async -> CrossCulturalContext {\n        let content = input.lowercased()\n        var culturalIndicators: [AcademicCulture: Double] = [:]\n        \n        // Language pattern analysis for cultural detection\n        let culturalPatterns: [AcademicCulture: [String]] = [\n            .western: [\"argue\", \"debate\", \"challenge\", \"individual\", \"my opinion\", \"i believe\", \"personally\"],\n            .eastAsian: [\"respectfully\", \"humbly\", \"suggest\", \"consider\", \"group\", \"collective\", \"harmony\"],\n            .nordic: [\"collaborate\", \"together\", \"equal\", \"simple\", \"practical\", \"sustainable\"],\n            .mediterranean: [\"passionate\", \"relationship\", \"community\", \"family\", \"tradition\", \"heritage\"],\n            .latinAmerican: [\"warm\", \"personal\", \"community\", \"together\", \"familia\", \"collective\"],\n            .middleEastern: [\"respect\", \"honor\", \"tradition\", \"wisdom\", \"elder\", \"formal\"],\n            .african: [\"community\", \"ubuntu\", \"collective\", \"wisdom\", \"tradition\", \"oral\"],\n            .southAsian: [\"respect\", \"hierarchy\", \"detailed\", \"explanation\", \"guru\", \"tradition\"],\n            .international: [\"global\", \"international\", \"diverse\", \"inclusive\", \"multicultural\"]\n        ]\n        \n        // Analyze content for cultural indicators\n        for (culture, patterns) in culturalPatterns {\n            let matches = patterns.filter { content.contains($0) }\n            if !matches.isEmpty {\n                culturalIndicators[culture] = Double(matches.count) * 1.5\n            }\n        }\n        \n        // Analyze communication style from user history\n        let historyAnalysis = await analyzeCommunicationHistory(userHistory)\n        for (culture, score) in historyAnalysis {\n            culturalIndicators[culture, default: 0] += score\n        }\n        \n        // Determine primary culture\n        let sortedCultures = culturalIndicators.sorted { $0.value > $1.value }\n        let primaryCulture = sortedCultures.first?.key ?? .universal\n        let secondaryCultures = sortedCultures.dropFirst().prefix(2).map { $0.key }\n        \n        // Determine cultural sensitivity and formality\n        let sensitivity = determineCulturalSensitivity(content, indicators: culturalIndicators)\n        let formality = determineLanguageFormality(content, culture: primaryCulture)\n        let directness = determineCommunicationDirectness(content, culture: primaryCulture)\n        \n        let adaptationLevel = min(max(sortedCultures.first?.value ?? 1.0, 0.5), 2.0)\n        \n        return CrossCulturalContext(\n            primaryCulture: primaryCulture,\n            secondaryCultures: Array(secondaryCultures),\n            adaptationLevel: adaptationLevel,\n            culturalSensitivity: sensitivity,\n            languageFormality: formality,\n            communicationDirectness: directness\n        )\n    }\n    \n    /// Apply cross-cultural academic padding adaptation\n    public func applyCrossCulturalPadding(\n        _ input: String,\n        culturalContext: CrossCulturalContext,\n        academicContext: EnhancedAcademicContext,\n        basePadding: SocialPadding\n    ) async -> (adaptedText: String, appliedPadding: SocialPadding, culturalAdaptations: [String]) {\n        \n        var adaptations: [String] = []\n        \n        // Calculate cultural padding multiplier\n        let culturalMultiplier = culturalContext.primaryCulture.paddingMultiplier\n        let formalityAdjustment = culturalContext.languageFormality.paddingAdjustment\n        let directnessReduction = culturalContext.communicationDirectness.paddingReduction\n        \n        let finalMultiplier = culturalMultiplier * formalityAdjustment * (1.0 - directnessReduction)\n        \n        // Determine adapted padding level\n        let adaptedPadding = adaptPaddingForCulture(basePadding, multiplier: finalMultiplier)\n        \n        // Apply cultural communication style\n        var adaptedText = input\n        \n        switch culturalContext.primaryCulture {\n        case .western:\n            adaptedText = await applyWesternAcademicStyle(input, context: academicContext)\n            adaptations.append(\"Western directness and argumentation focus\")\n            \n        case .eastAsian:\n            adaptedText = await applyEastAsianAcademicStyle(input, context: academicContext)\n            adaptations.append(\"East Asian respectful and hierarchical approach\")\n            \n        case .nordic:\n            adaptedText = await applyNordicAcademicStyle(input, context: academicContext)\n            adaptations.append(\"Nordic egalitarian and collaborative style\")\n            \n        case .mediterranean:\n            adaptedText = await applyMediterraneanAcademicStyle(input, context: academicContext)\n            adaptations.append(\"Mediterranean expressive and contextual approach\")\n            \n        case .latinAmerican:\n            adaptedText = await applyLatinAmericanAcademicStyle(input, context: academicContext)\n            adaptations.append(\"Latin American warm and community-oriented style\")\n            \n        case .middleEastern:\n            adaptedText = await applyMiddleEasternAcademicStyle(input, context: academicContext)\n            adaptations.append(\"Middle Eastern formal and tradition-respectful approach\")\n            \n        case .african:\n            adaptedText = await applyAfricanAcademicStyle(input, context: academicContext)\n            adaptations.append(\"African collective wisdom and inclusive approach\")\n            \n        case .southAsian:\n            adaptedText = await applySouthAsianAcademicStyle(input, context: academicContext)\n            adaptations.append(\"South Asian hierarchical respect and detailed explanation\")\n            \n        case .international:\n            adaptedText = await applyInternationalAcademicStyle(input, context: academicContext)\n            adaptations.append(\"International multicultural sensitivity\")\n            \n        case .universal:\n            adaptedText = await applyUniversalAcademicStyle(input, context: academicContext)\n            adaptations.append(\"Universal academic principles\")\n        }\n        \n        // Apply final Boolean Mind padding\n        let finalText = await applyBooleanMindPadding(adaptedText, level: adaptedPadding, context: \"cross_cultural_\\(culturalContext.primaryCulture.rawValue)\")\n        \n        return (finalText, adaptedPadding, adaptations)\n    }\n    \n    // MARK: - Cultural Communication Style Implementations\n    \n    private func applyWesternAcademicStyle(_ input: String, context: EnhancedAcademicContext) async -> String {\n        if context.isAcademic {\n            return \"From an analytical perspective: \\(input). This approach emphasizes critical evaluation and evidence-based reasoning.\"\n        }\n        return \"Considering this directly: \\(input)\"\n    }\n    \n    private func applyEastAsianAcademicStyle(_ input: String, context: EnhancedAcademicContext) async -> String {\n        if context.isAcademic {\n            return \"With respectful consideration of scholarly traditions: \\(input). This perspective honors established academic wisdom while contributing new insights.\"\n        }\n        return \"Respectfully suggesting: \\(input)\"\n    }\n    \n    private func applyNordicAcademicStyle(_ input: String, context: EnhancedAcademicContext) async -> String {\n        if context.isAcademic {\n            return \"Through collaborative inquiry: \\(input). This egalitarian approach values all contributions to academic understanding.\"\n        }\n        return \"Working together on this: \\(input)\"\n    }\n    \n    private func applyMediterraneanAcademicStyle(_ input: String, context: EnhancedAcademicContext) async -> String {\n        if context.isAcademic {\n            return \"Drawing from rich academic traditions: \\(input). This contextual approach recognizes the interconnectedness of knowledge and community.\"\n        }\n        return \"In the spirit of academic dialogue: \\(input)\"\n    }\n    \n    private func applyLatinAmericanAcademicStyle(_ input: String, context: EnhancedAcademicContext) async -> String {\n        if context.isAcademic {\n            return \"With warmth and community focus: \\(input). This approach values collective knowledge and mutual support in academic endeavors.\"\n        }\n        return \"Sharing this with academic camaraderie: \\(input)\"\n    }\n    \n    private func applyMiddleEasternAcademicStyle(_ input: String, context: EnhancedAcademicContext) async -> String {\n        if context.isAcademic {\n            return \"With due respect to academic traditions and scholarly wisdom: \\(input). This formal approach honors the depth of academic heritage.\"\n        }\n        return \"With respectful academic consideration: \\(input)\"\n    }\n    \n    private func applyAfricanAcademicStyle(_ input: String, context: EnhancedAcademicContext) async -> String {\n        if context.isAcademic {\n            return \"Through collective academic wisdom: \\(input). This inclusive approach recognizes the value of diverse perspectives and community knowledge.\"\n        }\n        return \"Sharing this knowledge collectively: \\(input)\"\n    }\n    \n    private func applySouthAsianAcademicStyle(_ input: String, context: EnhancedAcademicContext) async -> String {\n        if context.isAcademic {\n            return \"With respectful academic inquiry and detailed consideration: \\(input). This approach honors hierarchical knowledge while providing thorough explanation.\"\n        }\n        return \"With academic respect and detailed attention: \\(input)\"\n    }\n    \n    private func applyInternationalAcademicStyle(_ input: String, context: EnhancedAcademicContext) async -> String {\n        if context.isAcademic {\n            return \"From a globally inclusive academic perspective: \\(input). This multicultural approach recognizes diverse academic traditions and fosters international understanding.\"\n        }\n        return \"From an internationally aware perspective: \\(input)\"\n    }\n    \n    private func applyUniversalAcademicStyle(_ input: String, context: EnhancedAcademicContext) async -> String {\n        if context.isAcademic {\n            return \"Based on universal academic principles: \\(input). This approach emphasizes core scholarly values that transcend cultural boundaries.\"\n        }\n        return \"Following academic best practices: \\(input)\"\n    }\n    \n    // MARK: - Cultural Analysis Supporting Methods\n    \n    private func analyzeCommunicationHistory(_ history: [ConversationEntry]) async -> [AcademicCulture: Double] {\n        var scores: [AcademicCulture: Double] = [:]\n        \n        for entry in history.suffix(10) { // Analyze last 10 interactions\n            let content = entry.userMessage.lowercased()\n            \n            // Analyze formality patterns\n            if content.contains(\"please\") && content.contains(\"respectfully\") {\n                scores[.eastAsian, default: 0] += 0.5\n                scores[.middleEastern, default: 0] += 0.3\n            }\n            \n            // Analyze directness patterns\n            if content.split(separator: \" \").count < 8 && !content.contains(\"please\") {\n                scores[.western, default: 0] += 0.4\n                scores[.nordic, default: 0] += 0.3\n            }\n            \n            // Analyze collaborative language\n            if content.contains(\"we\") || content.contains(\"together\") || content.contains(\"our\") {\n                scores[.nordic, default: 0] += 0.4\n                scores[.african, default: 0] += 0.3\n            }\n        }\n        \n        return scores\n    }\n    \n    private func determineCulturalSensitivity(_ content: String, indicators: [AcademicCulture: Double]) -> CulturalSensitivity {\n        let totalScore = indicators.values.reduce(0, +)\n        \n        if totalScore > 3.0 {\n            return .expert\n        } else if totalScore > 2.0 {\n            return .high\n        } else if totalScore > 1.0 {\n            return .moderate\n        } else {\n            return .minimal\n        }\n    }\n    \n    private func determineLanguageFormality(_ content: String, culture: AcademicCulture) -> LanguageFormality {\n        let formalIndicators = [\"respectfully\", \"humbly\", \"honor\", \"tradition\", \"ceremonial\"]\n        let casualIndicators = [\"hey\", \"cool\", \"awesome\", \"like\", \"kinda\"]\n        \n        let formalCount = formalIndicators.filter { content.contains($0) }.count\n        let casualCount = casualIndicators.filter { content.contains($0) }.count\n        \n        if formalCount > 2 || culture.formalityLevel > 0.8 {\n            return .formal\n        } else if formalCount > 0 || culture.formalityLevel > 0.6 {\n            return .academic\n        } else if casualCount > 0 {\n            return .casual\n        } else {\n            return .academic // Default\n        }\n    }\n    \n    private func determineCommunicationDirectness(_ content: String, culture: AcademicCulture) -> CommunicationDirectness {\n        let directIndicators = [\"directly\", \"simply\", \"just\", \"exactly\", \"specifically\"]\n        let indirectIndicators = [\"perhaps\", \"might\", \"could\", \"suggest\", \"consider\"]\n        \n        let directCount = directIndicators.filter { content.contains($0) }.count\n        let indirectCount = indirectIndicators.filter { content.contains($0) }.count\n        \n        if directCount > indirectCount + 1 {\n            return .direct\n        } else if indirectCount > directCount + 1 {\n            return .indirect\n        } else {\n            return .moderate\n        }\n    }\n    \n    private func adaptPaddingForCulture(_ basePadding: SocialPadding, multiplier: Double) -> SocialPadding {\n        let paddingLevels: [SocialPadding] = [.none, .light, .medium, .enhanced]\n        let currentIndex = paddingLevels.firstIndex(of: basePadding) ?? 1\n        \n        let adjustedIndex = min(max(Int(Double(currentIndex) * multiplier), 0), paddingLevels.count - 1)\n        return paddingLevels[adjustedIndex]\n    }\n    \n    // MARK: - Adaptive Learning Supporting Methods"
    
    private func createInitialUserPattern(userId: String) async -> UserCommunicationPattern {
        // Create initial pattern with conservative defaults
        return UserCommunicationPattern(
            userId: userId,
            preferredPaddingLevel: .medium, // Conservative starting point
            communicationStyle: .conversational, // Assume conversational until learned
            academicPreference: .none, // No academic preference until detected
            neurodiversityAware: false, // Default to false until patterns suggest otherwise
            contextualAdaptations: [:], // Empty until we learn specific contexts
            lastUpdated: Date(),
            totalInteractions: 0,
            paddingEffectiveness: 0.5 // Neutral starting effectiveness
        )
    }
    
    private func analyzeContextualFactors(
        _ messageContent: String, 
        academicContext: EnhancedAcademicContext
    ) async -> [String] {
        
        var factors: [String] = []
        let content = messageContent.lowercased()
        
        // Academic domain factors
        if academicContext.isAcademic {
            factors.append("academic_domain:\(academicContext.primaryDomain.rawValue)")
            factors.append("formality:\(academicContext.formalityLevel.rawValue)")
        }
        
        // Emotional tone factors
        if content.contains("please") || content.contains("thank") {
            factors.append("polite_tone")
        }
        
        if content.contains("urgent") || content.contains("asap") || content.contains("quickly") {
            factors.append("urgency")
        }
        
        // Neurodiversity indicators
        if content.contains("autism") || content.contains("adhd") || content.contains("neurodivergent") {
            factors.append("neurodiversity_mention")
        }
        
        // Question vs statement
        if content.contains("?") {
            factors.append("question")
        } else {
            factors.append("statement")
        }
        
        // Length-based factors
        let wordCount = messageContent.split(separator: " ").count
        if wordCount < 5 {
            factors.append("brief_message")
        } else if wordCount > 50 {
            factors.append("detailed_message")
        }
        
        // Direct communication indicators
        if content.contains("just tell me") || content.contains("directly") || content.contains("simply") {
            factors.append("prefers_direct")
        }
        
        return factors
    }
    
    private func determineAdaptivePadding(
        userPattern: UserCommunicationPattern,
        academicContext: EnhancedAcademicContext,
        contextualFactors: [String],
        messageContent: String
    ) async -> (level: SocialPadding, confidence: Double, reasoning: String, source: LearningSource) {
        
        // Check for explicit contextual adaptations first
        for (context, padding) in userPattern.contextualAdaptations {
            if academicContext.contextType.contains(context) || contextualFactors.contains(context) {
                return (
                    padding, 
                    0.9, 
                    "User has specific preference for \(context) contexts",
                    .contextual_adaptation
                )
            }
        }
        
        // Check for neurodiversity detection
        if userPattern.neurodiversityAware || 
           contextualFactors.contains("neurodiversity_mention") ||
           academicContext.primaryDomain == .neurodiversity {
            
            let paddingLevel: SocialPadding = academicContext.isAcademic ? .light : .enhanced
            return (
                paddingLevel,
                0.85,
                "Neurodiversity-aware communication patterns detected",
                .neurodiversity_detection
            )
        }
        
        // Academic domain-specific recommendations
        if academicContext.isAcademic {
            let academicPadding = getAcademicDomainPadding(
                domain: academicContext.primaryDomain,
                formality: academicContext.formalityLevel,
                userStyle: userPattern.communicationStyle
            )
            
            return (
                academicPadding,
                0.8,
                "Academic domain-specific padding for \(academicContext.primaryDomain.rawValue)",
                .academic_domain
            )
        }
        
        // User communication style-based recommendation
        let stylePadding = getStyleBasedPadding(
            style: userPattern.communicationStyle,
            contextualFactors: contextualFactors
        )
        
        let confidence = userPattern.totalInteractions > 10 ? 0.75 : 0.6
        
        return (
            stylePadding,
            confidence,
            "Based on learned communication style: \(userPattern.communicationStyle.rawValue)",
            .historical_pattern
        )
    }
    
    private func getAcademicDomainPadding(
        domain: AcademicDomain,
        formality: AcademicFormalityLevel,
        userStyle: CommunicationStyle
    ) -> SocialPadding {
        
        // Base padding by domain
        let basePadding: SocialPadding = switch domain {
        case .neurodiversity: .light // Direct for neurodiversity contexts
        case .stem: formality == .peerReview ? .light : .medium
        case .humanities: .medium // Humanities appreciates context
        case .socialSciences: .medium
        case .interdisciplinary: .medium
        case .general: .medium
        }
        
        // Adjust based on user style
        return switch userStyle {
        case .direct: basePadding == .enhanced ? .medium : .light
        case .neurodivergent: .light
        case .academic: basePadding
        case .formal: basePadding == .light ? .medium : basePadding
        case .supportive: basePadding == .light ? .medium : .enhanced
        case .conversational: basePadding
        }
    }
    
    private func getStyleBasedPadding(
        style: CommunicationStyle,
        contextualFactors: [String]
    ) -> SocialPadding {
        
        let basePadding: SocialPadding = switch style {
        case .direct: .light
        case .neurodivergent: .light
        case .conversational: .medium
        case .formal: .medium
        case .academic: .medium
        case .supportive: .enhanced
        }
        
        // Adjust based on contextual factors
        var adjustedPadding = basePadding
        
        if contextualFactors.contains("prefers_direct") {
            adjustedPadding = .light
        }
        
        if contextualFactors.contains("urgency") && basePadding != .light {
            adjustedPadding = SocialPadding(rawValue: 
                basePadding == .enhanced ? "medium" : "light"
            ) ?? basePadding
        }
        
        return adjustedPadding
    }
    
    private func recordConversationEntry(
        userId: String,
        userMessage: String,
        systemResponse: String,
        paddingUsed: SocialPadding,
        academicContext: Bool,
        responseTime: TimeInterval
    ) async {
        
        let entry = ConversationEntry(
            timestamp: Date(),
            userMessage: userMessage,
            systemResponse: systemResponse,
            paddingUsed: paddingUsed,
            academicContext: academicContext,
            userSatisfaction: nil, // Will be updated when feedback is received
            responseTime: responseTime
        )
        
        // Add to user's conversation history
        if conversationHistory[userId] == nil {
            conversationHistory[userId] = []
        }
        
        conversationHistory[userId]?.append(entry)
        
        // Maintain history size limit
        if let history = conversationHistory[userId], history.count > maxHistoryPerUser {
            conversationHistory[userId] = Array(history.suffix(maxHistoryPerUser))
        }
        
        // Update user pattern interaction count
        if var userPattern = userPatterns[userId] {
            userPattern = UserCommunicationPattern(
                userId: userPattern.userId,
                preferredPaddingLevel: userPattern.preferredPaddingLevel,
                communicationStyle: userPattern.communicationStyle,
                academicPreference: userPattern.academicPreference,
                neurodiversityAware: userPattern.neurodiversityAware,
                contextualAdaptations: userPattern.contextualAdaptations,
                lastUpdated: Date(),
                totalInteractions: userPattern.totalInteractions + 1,
                paddingEffectiveness: userPattern.paddingEffectiveness
            )
            userPatterns[userId] = userPattern
        }
        
        // Manage user profiles limit
        if userPatterns.count > maxUserProfiles {
            await pruneOldUserProfiles()
        }
    }
    
    private func updateUserPatternFromFeedback(
        userPattern: UserCommunicationPattern,
        satisfaction: UserSatisfaction,
        requestedChange: SocialPadding?
    ) async -> UserCommunicationPattern {
        
        let satisfactionScore = satisfaction.score
        let currentEffectiveness = userPattern.paddingEffectiveness
        
        // Update effectiveness using exponential moving average
        let alpha = 0.2 // Learning rate
        let newEffectiveness = (1 - alpha) * currentEffectiveness + alpha * satisfactionScore
        
        // Update preferred padding if user requested change
        let newPreferredPadding = requestedChange ?? userPattern.preferredPaddingLevel
        
        // Detect neurodiversity awareness from feedback patterns
        let newNeurodiversityAware = userPattern.neurodiversityAware || 
                                   (satisfaction == .requesting_change && requestedChange == .light)
        
        // Update communication style based on patterns
        let newCommunicationStyle = await inferCommunicationStyle(
            from: userPattern,
            satisfaction: satisfaction,
            requestedChange: requestedChange
        )
        
        return UserCommunicationPattern(
            userId: userPattern.userId,
            preferredPaddingLevel: newPreferredPadding,
            communicationStyle: newCommunicationStyle,
            academicPreference: userPattern.academicPreference,
            neurodiversityAware: newNeurodiversityAware,
            contextualAdaptations: userPattern.contextualAdaptations,
            lastUpdated: Date(),
            totalInteractions: userPattern.totalInteractions,
            paddingEffectiveness: newEffectiveness
        )
    }
    
    private func inferCommunicationStyle(
        from userPattern: UserCommunicationPattern,
        satisfaction: UserSatisfaction,
        requestedChange: SocialPadding?
    ) async -> CommunicationStyle {
        
        // If user consistently requests less padding, they prefer direct communication
        if requestedChange == .light || requestedChange == SocialPadding.none {
            return userPattern.neurodiversityAware ? .neurodivergent : .direct
        }
        
        // If user requests more padding, they prefer supportive communication
        if requestedChange == .enhanced {
            return .supportive
        }
        
        // If user is satisfied with medium padding and has academic interactions
        if satisfaction == .positive && userPattern.preferredPaddingLevel == .medium {
            // Check conversation history for academic content
            if let history = conversationHistory[userPattern.userId] {
                let academicRatio = Double(history.filter { $0.academicContext }.count) / Double(history.count)
                if academicRatio > 0.3 {
                    return .academic
                }
            }
        }
        
        // Default to current style if no clear preference change
        return userPattern.communicationStyle
    }
    
    private func pruneOldUserProfiles() async {
        let sortedUsers = userPatterns.sorted { $0.value.lastUpdated < $1.value.lastUpdated }
        let removeCount = maxUserProfiles / 10 // Remove oldest 10%
        
        for i in 0..<min(removeCount, sortedUsers.count) {
            let userId = sortedUsers[i].key
            userPatterns.removeValue(forKey: userId)
            conversationHistory.removeValue(forKey: userId)
        }
    }
    
    /// Get user pattern learning metrics and insights
    public func getUserPatternMetrics() async -> (totalUsers: Int, averageEffectiveness: Double, adaptationRate: Double) {
        let totalUsers = userPatterns.count
        let averageEffectiveness = totalUsers > 0 ? 
            userPatterns.values.map { $0.paddingEffectiveness }.reduce(0, +) / Double(totalUsers) : 0.0
        
        // Calculate adaptation rate (users with > 10 interactions and improving effectiveness)
        let experiencedUsers = userPatterns.values.filter { $0.totalInteractions > 10 }
        let adaptingUsers = experiencedUsers.filter { $0.paddingEffectiveness > 0.6 }
        let adaptationRate = experiencedUsers.count > 0 ? Double(adaptingUsers.count) / Double(experiencedUsers.count) : 0.0
        
        return (totalUsers, averageEffectiveness, adaptationRate)
    }
}

/// ASPD Formula processing report
public struct ASPDReport {
    public let originalInput: String
    public let processedOutput: String
    public let academicContext: AcademicContext
    public let paddingApplied: String
    public let booleanMindLevel: SocialPadding
    public let amfAlignment: Bool
    public let velocityFactor: Double
    public let formulaEquation: String
    
    public var summary: String {
        let alignment = amfAlignment ? "✅" : "❌"
        return "ASPD: \(academicContext.contextType) | \(paddingApplied) | BM Level: \(booleanMindLevel.rawValue) | AMF: \(alignment) | Velocity: \(velocityFactor)x"
    }
    
    public var realWorldValidation: String {
        return "Real-world validation: Communication pattern switching between personal sharing (\(academicContext.suggestedMode == .sbmpdAmf ? "SBMPD" : "SPD")) and academic research (\(academicContext.suggestedMode == .spd ? "full SPD" : "adjusted")) successfully detected and processed with Boolean Mind \(booleanMindLevel.rawValue) padding."
    }
    
    public var booleanMindDetails: String {
        return "Boolean Mind Social Padding: \(booleanMindLevel.description)"
    }
}