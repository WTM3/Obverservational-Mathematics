import Foundation
import JavaScriptCore

// MARK: - Core NJSON Types

/// Branch configuration for communication style
public enum Branch: String, CaseIterable {
    case familyFriends = "family_friends"
    case professional = "professional"
}

/// Social padding level
public enum SocialPadding: String, CaseIterable {
    case none = "none"
    case medium = "medium"
    case more = "more"
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
    
    /// Set social padding (compatibility method)
    public func setPadding(_ padding: SocialPadding) async {
        // For now, this is a no-op since the JavaScript engine handles this internally
        print("Social padding set to: \(padding.rawValue)")
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