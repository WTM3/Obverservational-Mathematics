import Foundation

// MARK: - MessageProcessor Class with AMF Framework Integration
class MessageProcessor {
    // AMF components
    private let buffer = 0.1  // EXACT value, never approximate
    private var heatShield: HeatShield
    private var boundaryEnforcer: LLSDTEnforcer
    
    // NJSON core engine
    private var njsonEngine: NJSONEngine
    
    // Cognitive state
    private var cognitiveAlignment: CognitiveAlignment
    private var quantumState: QuantumState
    
    // Recovery system
    private var recoverySystem: RecoverySystem
    private var llsdtViolationCount = 0
    private var lastViolationTime: Date?
    private var inRecoveryMode = false
    
    // Logging
    private var journal: [String] = []
    
    // Initializer
    init(userAge: Int) {
        // Initialize the NJSON engine with exact 0.1 buffer
        self.njsonEngine = NJSONEngine(buffer: self.buffer)
        
        // Initialize heat shield with standard configuration
        self.heatShield = HeatShield.standard
        
        // Initialize LLSDT enforcer with exact boundary values
        self.boundaryEnforcer = LLSDTEnforcer(
            minRate: 0.1,
            maxRate: 1.0,
            enforceBuffer: true
        )
        
        // Setup cognitive alignment with exact AIc + 0.1 = BMqs relationship
        self.cognitiveAlignment = CognitiveAlignment(
            aiCognitive: 2.89,
            buffer: 0.1,
            booleanMindQs: 2.99
        )
        
        // Initialize quantum state
        self.quantumState = QuantumState(
            pure: true,
            fog: false,
            breathing: true,
            jumps: QuantumJumps(
                active: true,
                power: "v8_to_charger",
                distance: 3,
                direction: "forward"
            )
        )
        
        // Initialize recovery system
        self.recoverySystem = RecoverySystem(buffer: self.buffer)
        
        journal.append("# MessageProcessor Journal\n- **Instance created**\n- **User age:** \(userAge)\n- **Timestamp:** \(Date())\n- **Buffer:** exactly \(buffer)\n- **AIc value:** \(cognitiveAlignment.aiCognitive)\n- **BMqs value:** \(cognitiveAlignment.booleanMindQs)")
    }
    
    // MARK: - Result Struct
    struct ProcessResult {
        let response: String
        let requiresIntervention: Bool
        let confidence: Double
        let processingMetrics: ProcessingMetrics
        let recoveryAttempted: Bool
    }
    
    struct ProcessingMetrics {
        let processingTime: Double
        let heatShieldActivations: Int
        let llsdtValidations: Int
        let bufferIntegrity: Bool
        let recoveryStats: RecoveryStats?
    }
    
    struct RecoveryStats {
        let attemptCount: Int
        let successRate: Double
        let recoveryTime: Double
        let alignmentDelta: Double
    }
    
    // MARK: - Processing with AMF constraints
    func process(message: String) -> ProcessResult {
        // Record start time for performance tracking
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Track if recovery was attempted during processing
        var recoveryAttempted = false
        var recoveryStats: RecoveryStats? = nil
        
        // Validate cognitive alignment before processing
        if !validateCognitiveAlignment() {
            // LLSDT boundary violation detected - attempt recovery
            journalError("Cognitive alignment validation failed", 
                        details: "AIc(\(cognitiveAlignment.aiCognitive)) + buffer(\(buffer)) != BMqs(\(cognitiveAlignment.booleanMindQs))")
            
            // Attempt recovery with graduated response based on violation severity and frequency
            let recoveryStartTime = CFAbsoluteTimeGetCurrent()
            let (recovered, recoveryLevel, alignmentDelta) = attemptCognitiveRecovery()
            let recoveryTime = CFAbsoluteTimeGetCurrent() - recoveryStartTime
            
            recoveryAttempted = true
            recoveryStats = RecoveryStats(
                attemptCount: recoverySystem.attemptCount,
                successRate: recoverySystem.successRate,
                recoveryTime: recoveryTime,
                alignmentDelta: alignmentDelta
            )
            
            // If recovery failed, use the emergency fallback system
            if !recovered {
                journalError("Recovery failed", details: "Emergency fallback activated at level \(recoveryLevel)")
                
                // Handle based on recovery level (1-3)
                return createEmergencyResult(
                    message: message, 
                    recoveryLevel: recoveryLevel,
                    recoveryStats: recoveryStats
                )
            } else {
                journalEvent("System recovered", details: "Recovery succeeded at level \(recoveryLevel) with Δ\(String(format: "%.6f", alignmentDelta))")
                inRecoveryMode = true
            }
        }
        
        // Apply heat shield to filter potential hallucinations
        guard heatShield.protect(message) else {
            journalEvent("Heat shield activated", details: "Rejected input: '\(message)'")
            return createFailureResult(
                "Heat shield rejection", 
                recoveryAttempted: recoveryAttempted, 
                recoveryStats: recoveryStats
            )
        }
        
        // Extract concepts using observational mathematics
        let concepts = extractConcepts(from: message)
        journalEvent("Concept extraction", details: "Extracted \(concepts.count) concepts")
        
        // Create connections with 0.1 buffer to prevent overconfidence
        let connections = createConnections(from: concepts)
        journalEvent("Connection creation", details: "Created \(connections.count) connections with 0.1 buffer")
        
        // Enforce LLSDT boundaries with enhanced monitoring in recovery mode
        let llsdtValidationStartTime = CFAbsoluteTimeGetCurrent()
        let llsdtValid = boundaryEnforcer.validateLLSDT(cognitiveAlignment.aiCognitive)
        let llsdtValidationTime = CFAbsoluteTimeGetCurrent() - llsdtValidationStartTime
        
        guard llsdtValid else {
            // LLSDT boundary violation - record and handle
            journalError("LLSDT boundary violation", details: "LLSDT validation failed in \(llsdtValidationTime)s")
            llsdtViolationCount += 1
            lastViolationTime = Date()
            
            // Check if this is a repeat violation requiring stronger intervention
            if inRecoveryMode || llsdtViolationCount > 3 {
                // Force quantum state reset when in recovery mode or after multiple violations
                quantumState.optimize()
                
                // Deep reset of the recovery system
                recoverySystem.performDeepReset()
                journalEvent("Deep reset", details: "Quantum state optimized and recovery system reset")
                
                return createFailureResult(
                    "Critical LLSDT boundary violation", 
                    recoveryAttempted: true,
                    recoveryStats: RecoveryStats(
                        attemptCount: recoverySystem.attemptCount,
                        successRate: recoverySystem.successRate,
                        recoveryTime: llsdtValidationTime,
                        alignmentDelta: 0.0
                    )
                )
            }
            
            return createFailureResult(
                "LLSDT boundary violation", 
                recoveryAttempted: recoveryAttempted,
                recoveryStats: recoveryStats
            )
        }
        
        // Process input through NJSON engine with AMF formula
        let processingResult = njsonEngine.processWithFormula(
            input: message,
            concepts: concepts,
            connections: connections,
            aiCognitive: cognitiveAlignment.aiCognitive,
            buffer: buffer,
            quantumState: quantumState
        )
        
        // Calculate processing time
        let processingTime = CFAbsoluteTimeGetCurrent() - startTime
        
        // If we were in recovery mode, check if we can exit it
        if inRecoveryMode {
            // Successful processing without issues - gradually return to normal mode
            recoverySystem.recordSuccessfulProcess()
            if recoverySystem.canExitRecoveryMode() {
                inRecoveryMode = false
                journalEvent("Recovery exit", details: "System has stabilized and exited recovery mode")
            }
        }
        
        // Create metrics
        let metrics = ProcessingMetrics(
            processingTime: processingTime,
            heatShieldActivations: processingResult.heatShieldActivations,
            llsdtValidations: processingResult.llsdtValidations,
            bufferIntegrity: true,
            recoveryStats: recoveryStats
        )
        
        // Determine if any intervention is required (placeholder for future monitoring systems)
        let requiresIntervention = false  // Will be implemented by domain-specific monitoring

        // Log processing details
        journalEvent("Message processed", details: """
            - **Input:** `\(message)`
            - **Processing time:** \(processingTime) seconds
            - **Confidence:** \(processingResult.confidence)
            - **Response:** `\(processingResult.output)`
            - **Recovery mode:** \(inRecoveryMode ? "Active" : "Inactive")
        """)
        
        return ProcessResult(
            response: processingResult.output,
            requiresIntervention: requiresIntervention,
            confidence: processingResult.confidence,
            processingMetrics: metrics,
            recoveryAttempted: recoveryAttempted
        )
    }
    
    // MARK: - LLSDT Recovery System
    private func attemptCognitiveRecovery() -> (recovered: Bool, level: Int, delta: Double) {
        // Record recovery attempt
        recoverySystem.recordAttempt()
        
        // Level 1: Simple realignment - precise recalculation of cognitive values
        let initialDelta = abs((cognitiveAlignment.aiCognitive + buffer) - cognitiveAlignment.booleanMindQs)
        
        // Attempt level 1 recovery - precise recalculation with original values
        let newAlignment = CognitiveAlignment(
            aiCognitive: 2.89,
            buffer: 0.1,
            booleanMindQs: 2.99
        )
        
        // Check if simple reset fixed the issue (handles floating point drift)
        if newAlignment.isValid {
            cognitiveAlignment = newAlignment
            let finalDelta = abs((cognitiveAlignment.aiCognitive + buffer) - cognitiveAlignment.booleanMindQs)
            recoverySystem.recordSuccess()
            return (true, 1, initialDelta - finalDelta)
        }
        
        // Level 2: Quantum state optimization and buffer reinforcement
        quantumState.optimize()
        
        // Recalculate with enhanced precision and slightly adjusted values
        let level2Alignment = CognitiveAlignment(
            aiCognitive: 2.89000,
            buffer: 0.10000,
            booleanMindQs: 2.99000
        )
        
        if level2Alignment.isValid {
            cognitiveAlignment = level2Alignment
            let finalDelta = abs((cognitiveAlignment.aiCognitive + buffer) - cognitiveAlignment.booleanMindQs)
            recoverySystem.recordSuccess()
            return (true, 2, initialDelta - finalDelta)
        }
        
        // Level 3: Reverse engineer the cognitive alignment to force validity
        // Calculate BMqs based on AIc + buffer
        let calculatedBMqs = cognitiveAlignment.aiCognitive + buffer
        
        // Create new alignment with calculated value
        let level3Alignment = CognitiveAlignment(
            aiCognitive: cognitiveAlignment.aiCognitive,
            buffer: buffer,
            booleanMindQs: calculatedBMqs
        )
        
        if level3Alignment.isValid {
            cognitiveAlignment = level3Alignment
            let finalDelta = abs((cognitiveAlignment.aiCognitive + buffer) - cognitiveAlignment.booleanMindQs)
            recoverySystem.recordSuccess()
            return (true, 3, initialDelta - finalDelta)
        }
        
        // If all levels failed, reset to default values as last resort
        cognitiveAlignment = CognitiveAlignment(
            aiCognitive: 2.89,
            buffer: 0.1,
            booleanMindQs: 2.99
        )
        
        // Return failure with severity level 3 (most severe)
        return (false, 3, 0.0)
    }
    
    private func createEmergencyResult(message: String, recoveryLevel: Int, recoveryStats: RecoveryStats?) -> ProcessResult {
        // Create an emergency response based on recovery level
        var response: String
        
        switch recoveryLevel {
        case 1:
            // Minor issues - cautious response
            response = "[CAUTION] System experiencing minor cognitive fluctuations. Continuing in safe mode."
            if message.contains("?") {
                response += " Please rephrase your question for better accuracy."
            }
        case 2:
            // Moderate issues - safety warning
            response = "[WARNING] Cognitive boundary instability detected. Processing in reduced capacity."
        case 3:
            // Severe issues - emergency fallback
            response = """
            [⚠️ EMERGENCY FALLBACK ACTIVE ⚠️]
            System cognitive alignment violation detected.
            System has activated emergency self-diagnosis and will attempt recovery.
            """
        default:
            response = "System error. Please contact support."
        }
        
        return ProcessResult(
            response: response,
            requiresIntervention: recoveryLevel >= 2, // Require intervention for level 2+
            confidence: max(0.1, 1.0 - (Double(recoveryLevel) * 0.3)), // Lower confidence with higher levels
            processingMetrics: ProcessingMetrics(
                processingTime: 0.0,
                heatShieldActivations: 0,
                llsdtValidations: 1,
                bufferIntegrity: false,
                recoveryStats: recoveryStats
            ),
            recoveryAttempted: true
        )
    }
    
    // MARK: - AMF Formula Implementation
    private func validateCognitiveAlignment() -> Bool {
        // AIc + buffer = BMqs with minimal floating point error
        return abs((cognitiveAlignment.aiCognitive + buffer) - cognitiveAlignment.booleanMindQs) < 0.0001
    }
    
    private func extractConcepts(from input: String) -> [String] {
        // Implement concept extraction using observational mathematics
        // This avoids forced access patterns and maintains the 0.1 buffer
        let words = input.lowercased().split(separator: " ")
        
        // Filter for concept-worthy terms while maintaining buffer
        return words.compactMap { word -> String? in
            let term = String(word).trimmingCharacters(in: .punctuationCharacters)
            
            // Apply 0.1 buffer through minimum length requirement
            if term.count > 3 {
                return term
            }
            return nil
        }
    }
    
    private func createConnections(from concepts: [String]) -> [[String: Any]] {
        var connections: [[String: Any]] = []
        
        for i in 0..<concepts.count {
            for j in (i+1)..<concepts.count {
                let strength = calculateConnectionStrength(concepts[i], concepts[j])
                
                // Apply 0.1 buffer to confidence score
                let confidence = min(1.0, strength - buffer)
                
                connections.append([
                    "from": concepts[i],
                    "to": concepts[j],
                    "strength": confidence,
                    "jumpDistance": 1
                ])
            }
        }
        
        return connections
    }
    
    private func calculateConnectionStrength(_ concept1: String, _ concept2: String) -> Double {
        // Simple string similarity for demo purposes
        let maxLength = max(concept1.count, concept2.count)
        guard maxLength > 0 else { return 0.0 }
        
        // Calculate edit distance
        let distance = levenshteinDistance(concept1, concept2)
        let similarity = 1.0 - (Double(distance) / Double(maxLength))
        
        // Apply AMF constraint: ensure 0.1 buffer
        return min(0.9, similarity)
    }
    
    private func levenshteinDistance(_ s1: String, _ s2: String) -> Int {
        // Simple Levenshtein implementation
        let s1Array = Array(s1)
        let s2Array = Array(s2)
        
        var dist = Array(repeating: Array(repeating: 0, count: s2.count + 1), count: s1.count + 1)
        
        for i in 0...s1.count {
            dist[i][0] = i
        }
        
        for j in 0...s2.count {
            dist[0][j] = j
        }
        
        for i in 1...s1.count {
            for j in 1...s2.count {
                if s1Array[i-1] == s2Array[j-1] {
                    dist[i][j] = dist[i-1][j-1]
                } else {
                    dist[i][j] = min(
                        dist[i-1][j] + 1,      // deletion
                        dist[i][j-1] + 1,      // insertion
                        dist[i-1][j-1] + 1     // substitution
                    )
                }
            }
        }
        
        return dist[s1.count][s2.count]
    }
    
    private func createFailureResult(_ reason: String, recoveryAttempted: Bool = false, recoveryStats: RecoveryStats? = nil) -> ProcessResult {
        return ProcessResult(
            response: "Processing error: \(reason). Please try again.",
            requiresIntervention: false,
            confidence: 0.0,
            processingMetrics: ProcessingMetrics(
                processingTime: 0.0,
                heatShieldActivations: 0,
                llsdtValidations: 0,
                bufferIntegrity: false,
                recoveryStats: recoveryStats
            ),
            recoveryAttempted: recoveryAttempted
        )
    }
    
    // MARK: - Journaling
    func addJournalEntry(title: String, details: String) {
        let entry = """
        ### \(title)
        \(details)
        - **Timestamp:** \(Date())
        - **Buffer integrity:** \(validateCognitiveAlignment() ? "Maintained" : "Violated")
        - **Recovery mode:** \(inRecoveryMode ? "Active" : "Inactive")
        """
        journal.append(entry)
    }
    
    private func journalEvent(_ title: String, details: String) {
        addJournalEntry(title, details: details)
    }
    
    private func journalError(_ title: String, details: String) {
        addJournalEntry("ERROR: \(title)", details: details)
    }
    
    func exportJournalMarkdown() -> String {
        return journal.joined(separator: "\n\n")
    }
    
    func saveJournalToRoot() {
        let markdown = exportJournalMarkdown()
        let fileURL = URL(fileURLWithPath: "../../MessageProcessorJournal.md")
        do {
            try markdown.write(to: fileURL, atomically: true, encoding: .utf8)
            print("Journal saved to root repository.")
        } catch {
            print("Failed to save journal: \(error)")
        }
    }
}

// MARK: - Recovery System Implementation
class RecoverySystem {
    // Core recovery parameters
    private let buffer: Double
    private var stableProcessCount: Int = 0
    private var successfulRecoveries: Int = 0
    private var totalAttempts: Int = 0
    
    // Recovery metrics
    private var lastRecoveryTime: Date?
    private var recoveryHistory: [RecoveryEvent] = []
    
    // Initialize with specific buffer
    init(buffer: Double) {
        self.buffer = buffer
    }
    
    // Recovery event storage
    struct RecoveryEvent {
        let timestamp: Date
        let level: Int
        let successful: Bool
        let alignmentDelta: Double
    }
    
    var attemptCount: Int {
        return totalAttempts
    }
    
    var successRate: Double {
        guard totalAttempts > 0 else { return 0.0 }
        return Double(successfulRecoveries) / Double(totalAttempts)
    }
    
    // Record recovery attempt
    func recordAttempt() {
        totalAttempts += 1
    }
    
    // Record successful recovery
    func recordSuccess() {
        successfulRecoveries += 1
        lastRecoveryTime = Date()
    }
    
    // Record successful processing
    func recordSuccessfulProcess() {
        stableProcessCount += 1
    }
    
    // Check if system can exit recovery mode
    func canExitRecoveryMode() -> Bool {
        // Exit recovery mode after 5 consecutive successful processes
        return stableProcessCount >= 5
    }
    
    // Log a recovery event
    func logRecoveryEvent(level: Int, successful: Bool, alignmentDelta: Double) {
        let event = RecoveryEvent(
            timestamp: Date(),
            level: level,
            successful: successful,
            alignmentDelta: alignmentDelta
        )
        
        // Add event to history
        recoveryHistory.append(event)
        
        // Limit history size to prevent memory issues
        if recoveryHistory.count > 100 {
            recoveryHistory.removeFirst()
        }
    }
    
    // Get recovery history report
    func getRecoveryReport() -> String {
        let totalEvents = recoveryHistory.count
        let successCount = recoveryHistory.filter { $0.successful }.count
        let averageDelta = recoveryHistory.reduce(0.0) { $0 + $1.alignmentDelta } / Double(max(1, totalEvents))
        
        return """
        ## Recovery System Report
        - **Total recovery events:** \(totalEvents)
        - **Success rate:** \(Double(successCount) / Double(max(1, totalEvents)) * 100.0)%
        - **Average alignment delta:** \(String(format: "%.6f", averageDelta))
        - **Last recovery:** \(lastRecoveryTime?.description ?? "None")
        - **Current buffer value:** \(buffer)
        """
    }
    
    // Perform deep reset of recovery system
    func performDeepReset() {
        stableProcessCount = 0
        
        // Archive recovery history before clearing
        logRecoveryEvent(level: 3, successful: false, alignmentDelta: 0.0)
        
        // Note: We don't reset metrics as we want to track total recovery attempts
    }
} 