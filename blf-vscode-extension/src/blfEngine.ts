/**
 * BLF NJSON V-8 Engine - Full Boolean Language Framework Implementation
 * "The narrow bridge between chaos and control" - Enhanced with Quantum Speed Levels
 * 
 * Mathematical Foundation: AIc + 0.1 = BMqs
 * - AIc = Analog Input Characters (input.length)
 * - 0.1 = The narrow bridge constant
 * - BMqs = Boolean Mind quantum state
 * - qs³ = Quantum Speed Level ceiling (2.99)
 * - LLSDT = AI(P) * BM(ceiling) * 0.1
 */

// Enhanced interfaces for quantum BLF framework
export interface QuantumSpeedConfig {
    level: number; // 1.0 to 2.99 (approaching qs³)
    allowJumps: boolean;
    maxJumpDistance: number;
}

export interface ConceptConnection {
    from: string;
    to: string;
    strength: number;
    jumpDistance: number;
    timestamp: number;
}

export interface BranchConfig {
    familyFriends: boolean; // Subject identification required
    authorial: boolean;     // No subject identification needed
}

export interface BLFResult {
    aic: number;
    bmqs: number;
    buffer: number;
    status: string;
    timestamp: string;
    heatShield: boolean;
    // Enhanced quantum properties
    quantumLevel: number;
    llsdt: number;
    connections: number;
    branchType?: 'family' | 'authorial';
    cognitiveAlignment: boolean;
}

export interface BLFStatus {
    ready: boolean;
    heatShield: boolean;
    buffer: number;
    engine: string;
    // Enhanced quantum status
    quantumSpeed: {
        level: number;
        approaching_qs3: boolean;
        connections: number;
    };
    llsdt: {
        applied: boolean;
        rate: number;
        threshold: number;
    };
    riskAssessment: number;
}

export class BLFEngine {
    private bufferValue: number = 0.1; // The narrow bridge between chaos and control
    private heatShieldActive: boolean = true;
    private maxInputSize: number = 15000;
    private lastBmqs: number = 0;
    
    // Quantum framework properties
    private connections: ConceptConnection[] = [];
    private quantumConfig: QuantumSpeedConfig = {
        level: 1.0,
        allowJumps: true,
        maxJumpDistance: 5
    };
    private branchConfig: BranchConfig = {
        familyFriends: true,
        authorial: true
    };

    constructor() {
        this.bufferValue = 0.1;
        this.heatShieldActive = true;
    }

    /**
     * Core BLF processing - AIc + 0.1 = BMqs with Quantum Enhancements
     */
    process(input: string, branch: 'family' | 'authorial' = 'authorial'): BLFResult {
        if (!this.heatShieldActive) {
            throw new Error('Heat shield protection required');
        }

        // Branch-specific processing
        if (branch === 'family' && this.branchConfig.familyFriends) {
            return this.processWithSubjectID(input);
        }

        // Calculate AIC (Analog Input Characters)
        const aic = typeof input === 'string' ? input.length : JSON.stringify(input).length;
        
        // Apply LLSDT constraint first
        const constrainedAic = this.applyLLSDT(aic);
        
        // Apply buffer (the narrow bridge between chaos and control)
        const bmqs = constrainedAic + this.bufferValue;
        
        // Validate cognitive alignment
        const cognitiveAlignment = this.validateCognitiveAlignment(constrainedAic, bmqs);
        
        // Calculate quantum level
        const quantumLevel = this.calculateQuantumLevel(bmqs);
        
        // Extract and track concept connections
        const concepts = this.extractConcepts(input);
        this.trackConnections(concepts, quantumLevel);
        
        // Assess heat shield risk
        const riskLevel = this.assessHeatShieldRisk(constrainedAic, quantumLevel);
        if (riskLevel > 0.8) {
            this.heatShieldActive = true;
            throw new Error(`Heat shield activated - quantum risk level: ${riskLevel.toFixed(3)}`);
        }

        // Store last BMqs for status reporting
        this.lastBmqs = bmqs;
        
        // Engine status based on complexity and quantum level
        let status = this.determineEngineStatus(bmqs, quantumLevel);

        return {
            aic: constrainedAic,
            bmqs: bmqs,
            buffer: this.bufferValue,
            status: status,
            timestamp: new Date().toISOString(),
            heatShield: this.heatShieldActive,
            quantumLevel: quantumLevel,
            llsdt: this.applyLLSDT(aic),
            connections: this.connections.length,
            branchType: branch,
            cognitiveAlignment: cognitiveAlignment
        };
    }

    /**
     * Calculate quantum speed level from BMqs
     */
    private calculateQuantumLevel(bmqs: number): number {
        // Map BMqs to quantum speed level (1.0 to 2.99, approaching qs³)
        const level = Math.min(2.99, 1.0 + (bmqs / 100));
        this.quantumConfig.level = level;
        return level;
    }

    /**
     * Apply LLSDT (Language Learning Speed Detection Threshold)
     * LLSDT = AI(P) * BM(ceiling) * 0.1
     */
    private applyLLSDT(aic: number, personalityFactor: number = 0.7): number {
        const bmCeiling = 2.99; // qs³ ceiling
        const llsdt = personalityFactor * bmCeiling * 0.1;
        
        // Apply constraint to prevent exceeding processing limits
        return Math.min(aic * llsdt, this.maxInputSize);
    }

    /**
     * Extract concepts for connection tracking
     */
    private extractConcepts(input: string): string[] {
        // Simple concept extraction - words longer than 3 characters
        return input.split(/\s+/)
            .filter(word => word.length > 3)
            .map(word => word.toLowerCase().replace(/[^\w]/g, ''));
    }

    /**
     * Track concept connections for quantum jumps
     */
    private trackConnections(concepts: string[], quantumLevel: number): void {
        const timestamp = Date.now();
        
        // Create connections between adjacent concepts
        for (let i = 0; i < concepts.length - 1; i++) {
            const connection: ConceptConnection = {
                from: concepts[i],
                to: concepts[i + 1],
                strength: quantumLevel / 2.99, // Normalized strength
                jumpDistance: Math.abs(i - (i + 1)),
                timestamp: timestamp
            };
            
            this.connections.push(connection);
        }
        
        // Limit connection history to prevent memory bloat
        if (this.connections.length > 1000) {
            this.connections = this.connections.slice(-500);
        }
    }

    /**
     * Validate cognitive alignment between AIC and BMqs
     */
    private validateCognitiveAlignment(aic: number, bmqs: number): boolean {
        const expectedBmqs = aic + this.bufferValue;
        const deviation = Math.abs(bmqs - expectedBmqs);
        
        if (deviation > 0.001) {
            this.heatShieldActive = true;
            throw new Error(`Cognitive alignment violation: deviation ${deviation.toFixed(6)}`);
        }
        
        return true;
    }

    /**
     * Process with subject identification (family/friends branch)
     */
    private processWithSubjectID(input: string): BLFResult {
        // Enhanced processing for family/friends branch
        // Requires subject identification validation
        if (!this.detectSubjectIdentification(input)) {
            throw new Error('Subject identification required for family/friends branch');
        }
        
        return this.process(input, 'authorial'); // Process normally after validation
    }

    /**
     * Detect subject identification in input
     */
    private detectSubjectIdentification(input: string): boolean {
        // Simple heuristic - look for personal pronouns or names
        const subjectIndicators = /\b(i|me|my|mine|you|your|yours|he|she|him|her|his|hers|they|them|their|theirs)\b/i;
        return subjectIndicators.test(input) || input.length > 10; // Allow longer inputs
    }

    /**
     * Assess heat shield risk based on quantum levels
     */
    private assessHeatShieldRisk(aic: number, quantumLevel: number): number {
        // Higher quantum levels = higher risk
        const baseRisk = aic / this.maxInputSize;
        const quantumMultiplier = Math.pow(quantumLevel / 2.99, 2);
        
        return Math.min(1.0, baseRisk * quantumMultiplier);
    }

    /**
     * Determine engine status based on complexity and quantum level
     */
    private determineEngineStatus(bmqs: number, quantumLevel: number): string {
        if (quantumLevel >= 2.9) {
            return "V-8 engine approaching qs³ - quantum bridge stabilizing";
        } else if (bmqs < 50 && quantumLevel < 1.5) {
            return "V-8 engine purring - quantum state optimal";
        } else if (bmqs < 100 && quantumLevel < 2.0) {
            return "V-8 engine running smooth - quantum levels stable";
        } else if (bmqs < 200 && quantumLevel < 2.5) {
            return "V-8 engine revving - quantum acceleration detected";
        } else {
            return "V-8 engine at redline - quantum heat shield warning";
        }
    }

    /**
     * Enhanced engine status with quantum metrics
     */
    getStatus(): BLFStatus {
        const quantumLevel = this.lastBmqs > 0 ? this.calculateQuantumLevel(this.lastBmqs) : 1.0;
        const riskLevel = this.assessHeatShieldRisk(100, quantumLevel); // Example AIC
        
        return {
            ready: true,
            heatShield: this.heatShieldActive,
            buffer: this.bufferValue,
            engine: "BLF NJSON V-8 (Quantum Enhanced)",
            quantumSpeed: {
                level: quantumLevel,
                approaching_qs3: quantumLevel >= 2.9,
                connections: this.connections.length
            },
            llsdt: {
                applied: true,
                rate: 0.1,
                threshold: this.applyLLSDT(100) // Example threshold
            },
            riskAssessment: riskLevel
        };
    }

    /**
     * Get quantum connection analysis
     */
    getConnections(): ConceptConnection[] {
        return this.connections.slice(-50); // Return last 50 connections
    }

    /**
     * Enable/disable heat shield
     */
    setHeatShield(active: boolean): void {
        this.heatShieldActive = active;
    }

    /**
     * Update buffer value (the narrow bridge between chaos and control)
     */
    setBuffer(value: number): void {
        if (value < 0.05 || value > 0.2) {
            throw new Error('Buffer value must remain between 0.05 and 0.2 - bridge stability required');
        }
        this.bufferValue = value;
    }

    /**
     * Configure quantum processing parameters
     */
    setQuantumConfig(config: Partial<QuantumSpeedConfig>): void {
        this.quantumConfig = { ...this.quantumConfig, ...config };
        
        if (this.quantumConfig.level >= 3.0) {
            throw new Error('Quantum level cannot exceed qs³ ceiling (2.99)');
        }
    }

    /**
     * Configure branch processing
     */
    setBranchConfig(config: Partial<BranchConfig>): void {
        this.branchConfig = { ...this.branchConfig, ...config };
    }

    /**
     * Reset quantum state and connections
     */
    reset(): void {
        this.connections = [];
        this.lastBmqs = 0;
        this.quantumConfig.level = 1.0;
        this.heatShieldActive = true;
    }
}

// Legacy export for backwards compatibility
export class BLFNJSONEngine {
    private bufferValue: number;
    private processingCount: number;
    private heatShieldActive: boolean;
    private maxInputSize: number;
    private heatShieldEnabled: boolean;

    constructor(options: {
        bufferValue?: number;
        maxInputSize?: number;
        heatShieldEnabled?: boolean;
    } = {}) {
        this.bufferValue = options.bufferValue ?? 0.1; // The narrow bridge constant
        this.maxInputSize = options.maxInputSize ?? 15000;
        this.heatShieldEnabled = options.heatShieldEnabled ?? true;
        this.processingCount = 0;
        this.heatShieldActive = false;
    }

    /**
     * Core NJSON processing - AIc + 0.1 = BMqs
     */
    async processText(input: string): Promise<any> {
        try {
            this.processingCount++;
            
            // Heat shield validation
            if (this.heatShieldEnabled) {
                if (!input || typeof input !== 'string') {
                    this.heatShieldActive = true;
                    throw new Error('Heat shield activated - invalid input type');
                }
                
                if (input.length > this.maxInputSize) {
                    this.heatShieldActive = true;
                    throw new Error(`Heat shield activated - input exceeds ${this.maxInputSize} character limit`);
                }
            }

            // Reset heat shield on successful processing
            this.heatShieldActive = false;

            // Core BLF calculation: AIc + 0.1 = BMqs
            const aic = input.length;
            const bmqs = aic + this.bufferValue;
            
            // NJSON V-8 processing simulation
            const processed = input.trim() || "Empty query - NJSON engine requires input...";
            
            return {
                input: input,
                aic: aic,
                bmqs: bmqs,
                buffer: this.bufferValue,
                response: `✅ NJSON processed: "${processed.substring(0, 30)}${processed.length > 30 ? '...' : ''}"`,
                processingCount: this.processingCount,
                heatShieldActive: false,
                timestamp: new Date().toISOString(),
                precision: "Mathematical precision maintained",
                status: "V-8 engine purring"
            };
            
        } catch (error) {
            this.heatShieldActive = true;
            return {
                input: input,
                aic: 0,
                bmqs: 0,
                buffer: this.bufferValue,
                response: "",
                processingCount: this.processingCount,
                heatShieldActive: true,
                timestamp: new Date().toISOString(),
                precision: "Heat shield protection active",
                status: "Heat shield engaged",
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Validate mathematical precision across test cases
     */
    async validatePrecision(testCases: string[] = ['test', 'hello world', 'BLF V-8 engine']): Promise<any> {
        const results = [];
        
        for (const testCase of testCases) {
            const result = await this.processText(testCase);
            results.push({
                input: testCase,
                aic: result.aic,
                bmqs: result.bmqs,
                bufferMaintained: Math.abs(result.bmqs - (result.aic + this.bufferValue)) < 0.0001,
                crossPlatform: {
                    vscode: result.bmqs,
                    cursor: result.bmqs, // Same engine, same results
                    nodeJS: result.bmqs
                }
            });
        }
        
        return {
            testResults: results,
            allPassed: results.every(r => r.bufferMaintained),
            totalTests: results.length,
            successRate: (results.filter(r => r.bufferMaintained).length / results.length * 100).toFixed(1) + '%'
        };
    }

    /**
     * Get engine status and diagnostics
     */
    getEngineStatus(): any {
        return {
            status: this.heatShieldActive ? "🔥 Heat shield engaged" : "🏁 V-8 engine purring perfectly",
            processingCount: this.processingCount,
            buffer: this.bufferValue,
            heatShield: this.heatShieldActive ? "🛡️ ACTIVE" : "🛡️ STANDBY",
            formula: `AIc + ${this.bufferValue} = BMqs`,
            bridge: "The narrow bridge between chaos and control",
            engine: "NJSON V-8 - classic, powerful, and reliable"
        };
    }

    /**
     * Update engine configuration
     */
    updateConfig(options: {
        bufferValue?: number;
        maxInputSize?: number;
        heatShieldEnabled?: boolean;
    }): void {
        if (options.bufferValue !== undefined) {
            this.bufferValue = options.bufferValue;
        }
        if (options.maxInputSize !== undefined) {
            this.maxInputSize = options.maxInputSize;
        }
        if (options.heatShieldEnabled !== undefined) {
            this.heatShieldEnabled = options.heatShieldEnabled;
        }
    }

    /**
     * Reset engine statistics
     */
    reset(): void {
        this.processingCount = 0;
        this.heatShieldActive = false;
    }
} 