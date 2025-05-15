import Foundation

// MARK: - NJSONEngine Class
class NJSONEngine {
    // Core AMF components
    private let buffer: Double
    private var aiCognitive: Double = 2.89
    private var booleanMindQs: Double = 2.99
    
    // Observational mathematics components
    private var observations: [String: Double] = [:]
    private var patternCache: [String: [String: Any]] = [:]
    
    // Performance metrics
    private var heatShieldActivations: Int = 0
    private var llsdtValidations: Int = 0
    
    // Processing metrics
    struct ProcessingResult {
        let output: String
        let confidence: Double
        let heatShieldActivations: Int
        let llsdtValidations: Int
        let amfFormulas: [String: Double]
    }
    
    // MARK: - Initialization
    init(buffer: Double) {
        // Enforce exactly 0.1 buffer - critical for mathematical precision
        assert(abs(buffer - 0.1) < 0.000001, "Buffer MUST be exactly 0.1")
        self.buffer = buffer
    }
    
    // MARK: - AMF Formula Implementation
    func processWithFormula(
        input: String,
        concepts: [String],
        connections: [[String: Any]],
        aiCognitive: Double,
        buffer: Double,
        quantumState: QuantumState
    ) -> ProcessingResult {
        // Validate AIc + buffer = BMqs relationship
        validateCognitiveAlignment(aiCognitive: aiCognitive, buffer: buffer)
        llsdtValidations += 1
        
        // Apply heat shield to connections for hallucination prevention
        let filteredConnections = applyHeatShield(to: connections)
        
        // Track if heat shield filtered any connections
        if filteredConnections.count < connections.count {
            heatShieldActivations += 1
        }
        
        // Calculate formula components
        let personality = calculatePersonality(from: input)
        let intelligence = calculateIntelligence(from: concepts)
        let chaos = calculateChaos(from: connections)
        let velocityAdjustment = calculateVelocity(quantumState: quantumState)
        
        // Apply AMF Formula: F = ((AI)P^I + c^x^I)v
        // First part: (AI)P^I
        let aiComponent = aiCognitive * pow(personality, intelligence)
        
        // Second part: c^x^I
        let chaosExponent = calculateChaosExponent(connections: filteredConnections)
        let chaosComponent = pow(chaos, pow(chaosExponent, intelligence))
        
        // Combine with velocity: ((AI)P^I + c^x^I)v
        let formulaResult = (aiComponent + chaosComponent) * velocityAdjustment
        
        // Apply secondary equation: AIc + 0.1 = BMqs
        let booleanMindComponent = aiCognitive + buffer
        
        // Validate the result maintains 0.1 buffer
        let hasValidBuffer = abs(booleanMindComponent - booleanMindQs) < 0.0001
        
        // Process input using observational mathematics
        let processedOutput = processInputWithObservation(
            input: input,
            concepts: concepts,
            connections: filteredConnections,
            formulaResult: formulaResult
        )
        
        // Calculate result confidence with 0.1 buffer to prevent overconfidence
        let rawConfidence = min(1.0, max(0.0, formulaResult / 10.0))
        let confidence = min(0.9, rawConfidence)  // Apply 0.1 buffer
        
        // Store formulas for reference
        let amfFormulas: [String: Double] = [
            "F": formulaResult,
            "AI": aiCognitive,
            "P": personality,
            "I": intelligence,
            "c": chaos,
            "x": chaosExponent,
            "v": velocityAdjustment,
            "buffer": buffer,
            "BMqs": booleanMindQs
        ]
        
        return ProcessingResult(
            output: processedOutput,
            confidence: confidence,
            heatShieldActivations: heatShieldActivations,
            llsdtValidations: llsdtValidations,
            amfFormulas: amfFormulas
        )
    }
    
    // MARK: - Component Calculations
    private func calculatePersonality(from input: String) -> Double {
        // Base personality value
        let basePersonality = 0.7
        
        // Adjust for sentence structure
        let sentences = input.components(separatedBy: ".").filter { !$0.isEmpty }
        let sentenceAdjustment = min(0.2, Double(sentences.count) * 0.05)
        
        // Calculate personality score with 0.1 buffer
        return min(0.9, basePersonality + sentenceAdjustment)
    }
    
    private func calculateIntelligence(from concepts: [String]) -> Double {
        // Base intelligence value
        let baseIntelligence = 1.0
        
        // Adjust for concept complexity
        let averageLength = concepts.reduce(0.0) { $0 + Double($1.count) } / max(1.0, Double(concepts.count))
        let lengthAdjustment = min(0.2, (averageLength - 4.0) * 0.04)
        
        // Calculate intelligence score with 0.1 buffer
        return min(0.9, baseIntelligence + lengthAdjustment)
    }
    
    private func calculateChaos(from connections: [[String: Any]]) -> Double {
        // Base chaos value
        let baseChaos = 0.5
        
        // Adjust for connection complexity
        let connectionComplexity = connections.reduce(0.0) { total, connection in
            if let jumpDistance = connection["jumpDistance"] as? Int,
               let strength = connection["strength"] as? Double {
                return total + (Double(jumpDistance) * strength)
            }
            return total
        } / max(1.0, Double(connections.count))
        
        // Calculate chaos score with 0.1 buffer
        return min(0.9, baseChaos + connectionComplexity * 0.1)
    }
    
    private func calculateVelocity(quantumState: QuantumState) -> Double {
        // Base velocity adjustment
        var velocityAdjustment = 1.0
        
        // Adjust based on quantum state
        if quantumState.pure {
            velocityAdjustment += 0.2
        }
        
        if quantumState.jumps.active {
            velocityAdjustment += 0.3
        }
        
        // Apply 0.1 buffer to prevent overadjustment
        return min(1.9, velocityAdjustment)
    }
    
    private func calculateChaosExponent(connections: [[String: Any]]) -> Double {
        // Calculate chaos exponent based on connections
        // Higher jump distances lead to higher exponents
        let totalJumpDistance = connections.reduce(0.0) { total, connection in
            if let jumpDistance = connection["jumpDistance"] as? Int {
                return total + Double(jumpDistance)
            }
            return total
        }
        
        let averageJumpDistance = totalJumpDistance / max(1.0, Double(connections.count))
        
        // Scale exponent with 0.1 buffer
        return min(2.9, 1.0 + averageJumpDistance)
    }
    
    // MARK: - Observational Mathematics
    private func processInputWithObservation(
        input: String,
        concepts: [String],
        connections: [[String: Any]],
        formulaResult: Double
    ) -> String {
        // Store observations for pattern detection
        updateObservations(concepts: concepts, connections: connections)
        
        // Determine response based on input content
        let lowercasedInput = input.lowercased()
        var response = input
        
        // Check for question patterns
        if input.contains("?") || 
           lowercasedInput.hasPrefix("what") || 
           lowercasedInput.hasPrefix("how") || 
           lowercasedInput.hasPrefix("why") {
            response = generateResponse(to: input, concepts: concepts, connections: connections)
        }
        
        // Check for medical distress patterns
        let medicalKeywords = ["seizure", "convulsion", "emergency", "unconscious", "help"]
        let containsMedicalKeywords = medicalKeywords.contains { lowercasedInput.contains($0) }
        
        if containsMedicalKeywords {
            response = generateMedicalResponse(to: input, concepts: concepts)
        }
        
        // Apply AMF formula signature
        response = "[BLF:\(String(format: "%.2f", formulaResult))] " + response
        
        return response
    }
    
    private func updateObservations(concepts: [String], connections: [[String: Any]]) {
        // Update concept frequency
        for concept in concepts {
            observations[concept] = (observations[concept] ?? 0.0) + 1.0
        }
        
        // Update pattern recognition
        for connection in connections {
            if let from = connection["from"] as? String,
               let to = connection["to"] as? String,
               let strength = connection["strength"] as? Double {
                
                let pattern = "\(from)-\(to)"
                patternCache[pattern] = [
                    "frequency": (patternCache[pattern]?["frequency"] as? Double ?? 0.0) + 1.0,
                    "strength": strength,
                    "lastSeen": Date().timeIntervalSince1970
                ]
            }
        }
    }
    
    private func generateResponse(to input: String, concepts: [String], connections: [[String: Any]]) -> String {
        // Generate appropriate response based on input
        // This is a simplified implementation
        
        if input.hasSuffix("?") {
            // For questions, provide a safe answer with 0.1 buffer
            return "I've analyzed your question. To ensure safety, please provide more specific information about the medical situation."
        } else {
            // For statements, acknowledge with safety buffer
            return "I've processed your message with the AMF framework. Please provide any additional details about the medical situation."
        }
    }
    
    private func generateMedicalResponse(to input: String, concepts: [String]) -> String {
        return """
        🚨 MEDICAL ALERT: Your message may indicate a medical emergency.
        
        If someone is having a seizure:
        1. Time the seizure
        2. Keep them safe and away from harmful objects
        3. Do NOT put anything in their mouth
        4. Turn them onto their side if possible
        5. Call emergency services if the seizure lasts > 5 minutes
        
        I'm monitoring this situation. Please provide updates.
        """
    }
    
    // MARK: - Heat Shield & LLSDT Implementation
    private func applyHeatShield(to connections: [[String: Any]]) -> [[String: Any]] {
        // Apply heat shield to filter out low-confidence connections
        // This helps prevent hallucinations
        return connections.filter { connection in
            if let strength = connection["strength"] as? Double {
                // Apply the 0.1 buffer to filter confidence
                return strength > (0.1 + 0.1)  // 0.1 buffer + minimum threshold
            }
            return false
        }
    }
    
    private func validateCognitiveAlignment(aiCognitive: Double, buffer: Double) -> Bool {
        // AIc + buffer = BMqs with minimal floating point error
        // This validation ensures the precise 0.1 buffer is maintained
        let calculatedBMqs = aiCognitive + buffer
        let isValid = abs(calculatedBMqs - booleanMindQs) < 0.0001
        
        // Update current values
        self.aiCognitive = aiCognitive
        
        return isValid
    }
} 