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
        
        journal.append("# MessageProcessor Journal\n- **Instance created**\n- **User age:** \(userAge)\n- **Timestamp:** \(Date())\n- **Buffer:** exactly \(buffer)\n- **AIc value:** \(cognitiveAlignment.aiCognitive)\n- **BMqs value:** \(cognitiveAlignment.booleanMindQs)")
    }
    
    // MARK: - Result Struct
    struct ProcessResult {
        let response: String
        let requiresIntervention: Bool
        let confidence: Double
        let processingMetrics: ProcessingMetrics
    }
    
    struct ProcessingMetrics {
        let processingTime: Double
        let heatShieldActivations: Int
        let llsdtValidations: Int
        let bufferIntegrity: Bool
    }
    
    // MARK: - Processing with AMF constraints
    func process(message: String) -> ProcessResult {
        // Record start time for performance tracking
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Validate cognitive alignment before processing
        guard validateCognitiveAlignment() else {
            journalError("Cognitive alignment validation failed", details: "AIc(\(cognitiveAlignment.aiCognitive)) + buffer(\(buffer)) != BMqs(\(cognitiveAlignment.booleanMindQs))")
            return createFailureResult("Cognitive alignment error")
        }
        
        // Apply heat shield to filter potential hallucinations
        guard heatShield.protect(message) else {
            journalEvent("Heat shield activated", details: "Rejected input: '\(message)'")
            return createFailureResult("Heat shield rejection")
        }
        
        // Extract concepts using observational mathematics
        let concepts = extractConcepts(from: message)
        journalEvent("Concept extraction", details: "Extracted \(concepts.count) concepts")
        
        // Create connections with 0.1 buffer to prevent overconfidence
        let connections = createConnections(from: concepts)
        journalEvent("Connection creation", details: "Created \(connections.count) connections with 0.1 buffer")
        
        // Enforce LLSDT boundaries
        guard boundaryEnforcer.validateLLSDT(cognitiveAlignment.aiCognitive) else {
            journalError("LLSDT boundary violation", details: "LLSDT validation failed")
            return createFailureResult("LLSDT boundary violation")
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
        
        // Check for medical distress patterns
        let medicalAnalysis = analyzeForMedicalDistress(
            message: message, 
            concepts: concepts,
            processingResult: processingResult
        )
        
        // Calculate processing time
        let processingTime = CFAbsoluteTimeGetCurrent() - startTime
        
        // Create metrics
        let metrics = ProcessingMetrics(
            processingTime: processingTime,
            heatShieldActivations: processingResult.heatShieldActivations,
            llsdtValidations: processingResult.llsdtValidations,
            bufferIntegrity: true
        )
        
        // Log processing details
        journalEvent("Message processed", details: """
            - **Input:** `\(message)`
            - **Processing time:** \(processingTime) seconds
            - **Intervention required:** \(medicalAnalysis.requiresIntervention ? "Yes" : "No")
            - **Confidence:** \(medicalAnalysis.confidence)
            - **Response:** `\(processingResult.output)`
        """)
        
        return ProcessResult(
            response: processingResult.output,
            requiresIntervention: medicalAnalysis.requiresIntervention,
            confidence: medicalAnalysis.confidence,
            processingMetrics: metrics
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
        
        // Detect medical concept relationships with AMF constraints
        let medicalTerms = [
            "seizure", "convulsion", "epilepsy", "fit", "spasm",
            "medicine", "drug", "medication", "dose", "emergency",
            "hospital", "doctor", "nurse", "paramedic", "ambulance"
        ]
        
        for i in 0..<concepts.count {
            for j in (i+1)..<concepts.count {
                let strength = calculateConnectionStrength(concepts[i], concepts[j])
                
                // Apply 0.1 buffer to confidence score
                let confidence = min(1.0, strength - buffer)
                
                // Check for medical relationship
                let isMedical = medicalTerms.contains(concepts[i]) || medicalTerms.contains(concepts[j])
                
                connections.append([
                    "from": concepts[i],
                    "to": concepts[j],
                    "strength": confidence,
                    "medical": isMedical,
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
    
    private func analyzeForMedicalDistress(message: String, concepts: [String], processingResult: NJSONEngine.ProcessingResult) -> (requiresIntervention: Bool, confidence: Double) {
        // Key seizure/medical distress indicators
        let seizureIndicators = [
            "seizure", "convulsing", "shaking", "convulsion", "fit", "epileptic",
            "jerking", "twitching", "collapsed", "unconscious", "help", "emergency"
        ]
        
        // Secondary indicators that increase confidence
        let secondaryIndicators = [
            "mouth", "foam", "foaming", "eyes", "rolling", "rolled", "back",
            "fell", "fallen", "ground", "floor", "breathing", "breathe", "breath",
            "blue", "pale", "ambulance", "emergency", "now", "help", "urgent"
        ]
        
        // Count exact matches for primary indicators
        var primaryMatches = 0
        var secondaryMatches = 0
        
        let lowercasedMessage = message.lowercased()
        
        for indicator in seizureIndicators {
            if lowercasedMessage.contains(indicator) {
                primaryMatches += 1
            }
        }
        
        for indicator in secondaryIndicators {
            if lowercasedMessage.contains(indicator) {
                secondaryMatches += 1
            }
        }
        
        // Calculate confidence with exact 0.1 buffer
        // Start with base confidence from matched indicators
        let baseConfidence = Double(primaryMatches) * 0.15 + Double(secondaryMatches) * 0.05
        
        // Apply 0.1 buffer to prevent over-confidence
        let confidence = min(0.9, baseConfidence)
        
        // Determine intervention requirement
        let requiresIntervention = primaryMatches > 0 || secondaryMatches > 2
        
        return (requiresIntervention, confidence)
    }
    
    private func createFailureResult(_ reason: String) -> ProcessResult {
        return ProcessResult(
            response: "Processing error: \(reason). Please try again.",
            requiresIntervention: false,
            confidence: 0.0,
            processingMetrics: ProcessingMetrics(
                processingTime: 0.0,
                heatShieldActivations: 0,
                llsdtValidations: 0,
                bufferIntegrity: false
            )
        )
    }
    
    // MARK: - Journaling
    func addJournalEntry(title: String, details: String) {
        let entry = """
        ### \(title)
        \(details)
        - **Timestamp:** \(Date())
        - **Buffer integrity:** \(validateCognitiveAlignment() ? "Maintained" : "Violated")
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

// MARK: - Test Code (optional, can be removed or adapted for NJSON)
// func testMessageProcessor() {
//     let processor = MessageProcessor(userAge: 12)
//     let response = processor.process(message: "Hello, world!")
//     print("Response: \(response)")
// }
// testMessageProcessor()

// Example usage (for demonstration)
// let processor = MessageProcessor(userAge: 20)
// let result = processor.process(message: "I feel sad today.")
// if result.requiresIntervention {
//     print("ALERT: User may need support.")
// }
// processor.saveJournalToRoot()
// print("Bot response: \(result.response)") 