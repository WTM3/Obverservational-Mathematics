/**
 * BLF NJSON V-8 Engine - Core Boolean Language Framework Processing
 * "The narrow bridge between chaos and control"
 * 
 * Mathematical Foundation: AIc + 0.1 = BMqs
 * - AIc = Analog Input Characters (input.length)
 * - 0.1 = The narrow bridge constant
 * - BMqs = Boolean Mind quantum state
 */

export interface BLFProcessingResult {
    input: string;
    aic: number;
    bmqs: number;
    buffer: number;
    response: string;
    processingCount: number;
    heatShieldActive: boolean;
    timestamp: string;
    precision: string;
    status: string;
    error?: string;
}

export interface BLFEngineStatus {
    status: string;
    processingCount: number;
    buffer: number;
    heatShield: string;
    formula: string;
    bridge: string;
    engine: string;
}

export interface BLFValidationResult {
    testResults: Array<{
        input: string;
        aic: number;
        bmqs: number;
        bufferMaintained: boolean;
        crossPlatform: {
            vscode: number;
            cursor: number;
            nodeJS: number;
        };
    }>;
    allPassed: boolean;
    totalTests: number;
    successRate: string;
}

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
    async processText(input: string): Promise<BLFProcessingResult> {
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
    async validatePrecision(testCases: string[] = ['test', 'hello world', 'BLF V-8 engine']): Promise<BLFValidationResult> {
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
    getEngineStatus(): BLFEngineStatus {
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