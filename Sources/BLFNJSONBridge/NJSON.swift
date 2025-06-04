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
        
        // Create processor instance
        guard let processorClass = jsContext.objectForKeyedSubscript("NJSONBooleanProcessor"),
              let processor = processorClass.construct(withArguments: []) else {
            throw NJSONError.initializationFailed("Could not create NJSONBooleanProcessor instance")
        }
        
        // Debug the created instance
        print("🔍 Processor instance created")
        print("🔍 Processor type: \(processor)")
        print("🔍 Has initialize method: \(processor.hasProperty("initialize"))")
        print("🔍 Has process method: \(processor.hasProperty("process"))")
        print("🔍 Has applyHeatShield method: \(processor.hasProperty("applyHeatShield"))")
        
        self.processor = processor
        
        // Initialize the processor
        guard let initMethod = processor.objectForKeyedSubscript("initialize"),
              let initResult = initMethod.call(withArguments: []),
              initResult.toBool() else {
            throw NJSONError.initializationFailed("Processor initialization failed")
        }
        
        // Validate AMF formula alignment
        let alignment = validateCognitiveAlignment()
        guard alignment else {
            throw NJSONError.cognitiveAlignmentFailure
        }
        
        isInitialized = true
        print("✅ NJSON processor initialized with cognitive alignment verified")
    }
    
    /// Process text through the NJSON Boolean framework
    public func processText(_ input: String, bmId: String? = nil) async throws -> NJSONResult {
        if !isInitialized {
            try await initialize()
        }
        
        guard let processor = self.processor,
              let processMethod = processor.objectForKeyedSubscript("process") else {
            throw NJSONError.processingFailed("Processor not available")
        }
        
        // Call the JavaScript process method
        let arguments = bmId != nil ? [input, bmId!] : [input]
        guard let result = processMethod.call(withArguments: arguments) else {
            throw NJSONError.processingFailed("Process method call failed")
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
    
    /// Get comprehensive cognitive state report with observational mathematics
    public func getCognitiveStateReport() async throws -> CognitiveStateReport {
        if !isInitialized {
            try await initialize()
        }
        
        guard let processor = self.processor,
              let reportMethod = processor.objectForKeyedSubscript("getCognitiveStateReport"),
              let jsReport = reportMethod.call(withArguments: []) else {
            throw NJSONError.processingFailed("Could not generate cognitive state report")
        }
        
        return try parseJSCognitiveReport(jsReport)
    }
    
    /// Get heat shield status and temperature readings
    public func getHeatShieldReport() async throws -> HeatShieldReport {
        if !isInitialized {
            try await initialize()
        }
        
        guard let processor = self.processor,
              let heatMethod = processor.objectForKeyedSubscript("getHeatShieldReport"),
              let jsReport = heatMethod.call(withArguments: []) else {
            throw NJSONError.heatShieldFailure
        }
        
        return try parseJSHeatShieldReport(jsReport)
    }
    
    /// Reset heat shield violations - maintenance function
    public func resetHeatShield() async throws -> Bool {
        guard let processor = self.processor,
              let resetMethod = processor.objectForKeyedSubscript("resetHeatShield"),
              let result = resetMethod.call(withArguments: []) else {
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
    
    /// Apply heat shield to filter input
    public func applyHeatShield(_ input: String) async throws -> String {
        guard let processor = self.processor,
              let heatShieldMethod = processor.objectForKeyedSubscript("applyHeatShield"),
              let result = heatShieldMethod.call(withArguments: [input]) else {
            throw NJSONError.processingFailed("Heat shield method not available")
        }
        
        return result.toString() ?? input
    }
    
    /// Get AMF formula status with BLF metaphors and system health
    public func getFormulaStatus() -> String {
        let alignment = validateCognitiveAlignment()
        
        if alignment {
            return "AMF Formula: Optimal - V-8 engine purring perfectly"
        } else {
            return "AMF Formula: Misalignment detected - Engine needs tuning"
        }
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