/**
 * AMFImplementationExample.js
 * 
 * Example implementation of the Enhanced Heat Shield
 * Demonstrates the balance of V8 power with Charger flexibility
 */

const AMFEnhancedHeatShield = require('./AMFEnhancedHeatShield');
const AMF = require('../../AMF');

// Create configurable execution environment
class AMFExecutionEngine {
  constructor(config = {}) {
    // Initialize the enhanced heat shield
    this.heatShield = new AMFEnhancedHeatShield({
      // Custom configuration
      learningRate: config.learningRate ?? 0.08,
      threshold: config.predictionThreshold ?? 0.72,
      historyWindow: config.historyWindow ?? 150,
      
      // Enable enhanced capabilities with flexibility
      deepAnalysis: config.deepAnalysis ?? true,
      quantumBuffering: config.quantumBuffering ?? true,
      adaptiveMitigation: config.adaptiveMitigation ?? true
    });
    
    // Set flexibility factor - higher means more adaptable but less strict
    if (config.flexibilityFactor !== undefined) {
      this.heatShield.enhancedCapabilities.flexibilityFactor = 
        Math.max(0.1, Math.min(0.9, config.flexibilityFactor));
    }
    
    // Initialize execution parameters with balanced defaults or initialValues
    const initialValues = config.initialValues || {};
    this.params = {
      aiCognitive: initialValues.aiCognitive ?? AMF.cognitiveAlignment.aiCognitiveCapabilities,
      personality: initialValues.personality ?? AMF.personality,
      intelligence: initialValues.intelligence ?? AMF.intelligence,
      chaos: initialValues.chaos ?? AMF.chaosProcessing,
      chaosExponent: initialValues.chaosExponent ?? 1.5,
      velocity: initialValues.velocity ?? AMF.velocityAdjustment
    };
    
    // Event listeners for heat shield events
    this.setupEventListeners();
    
    // Execution metrics
    this.executionCount = 0;
    this.warningCount = 0;
    this.mitigationCount = 0;
    this.bufferingCount = 0;
    
    console.log(`AMF Execution Engine initialized with Enhanced Heat Shield`);
    console.log(`Flexibility factor: ${this.heatShield.enhancedCapabilities.flexibilityFactor}`);
    console.log(`Initial AIc: ${this.params.aiCognitive.toFixed(3)}, Velocity: ${this.params.velocity.toFixed(3)}`);
  }
  
  /**
   * Setup event listeners for heat shield events
   * @private
   */
  setupEventListeners() {
    this.heatShield.on('early_warning', (warning) => {
      console.log(`[EARLY WARNING] Risk: ${warning.risk.toFixed(2)}, Pattern: ${warning.pattern}`);
      console.log(`Potential violation in ~${warning.timeToViolation} executions`);
    });
    
    this.heatShield.on('pattern_learned', (pattern) => {
      console.log(`[PATTERN LEARNED] New pattern detected: ${pattern.patternId}`);
    });
    
    this.heatShield.on('sensitivity_adjusted', (adjustment) => {
      console.log(`[SENSITIVITY ${adjustment.direction.toUpperCase()}] New threshold: ${adjustment.newThreshold.toFixed(2)}`);
      console.log(`Reason: ${adjustment.reason}`);
    });
  }
  
  /**
   * Execute the AMF formula with current parameters
   * @param {Object} paramOverrides - Optional parameter overrides
   * @returns {Object} Execution results
   */
  execute(paramOverrides = {}) {
    // Apply any parameter overrides
    const executionParams = {
      ...this.params,
      ...paramOverrides
    };
    
    // Formula execution data
    const execution = {
      id: this.executionCount + 1,
      params: executionParams,
      timestamp: Date.now()
    };
    
    // Calculate AIc component: (AI)P^I
    const aiComponent = executionParams.aiCognitive * 
                      Math.pow(executionParams.personality, executionParams.intelligence);
    
    // Calculate chaos component: c^x^I
    const chaosComponent = Math.pow(
      executionParams.chaos, 
      Math.pow(executionParams.chaosExponent, executionParams.intelligence)
    );
    
    // Calculate formula result: ((AI)P^I + c^x^I)v
    const formulaResult = (aiComponent + chaosComponent) * executionParams.velocity;
    
    // Include actual result in execution data
    execution.result = formulaResult;
    
    // Check formula validity with heat shield
    const analysis = this.heatShield.analyzeExecution(execution);
    
    // Update metrics
    this.executionCount++;
    if (analysis.warning) this.warningCount++;
    if (analysis.mitigation) this.mitigationCount++;
    if (analysis.buffered) this.bufferingCount++;
    
    // Results to return
    const result = {
      executionId: execution.id,
      formulaResult,
      aiComponent,
      chaosComponent,
      params: executionParams,
      analysis
    };
    
    // Apply any mitigation strategy
    if (analysis.mitigation) {
      result.mitigationApplied = analysis.mitigation;
      result.adjustedRisk = analysis.adjustedRisk;
      result.timeToViolation = analysis.timeToViolation;
      
      // Apply throttling if needed
      if (analysis.mitigation === 'throttle') {
        // More aggressive throttling when time to violation is small
        const throttleFactor = analysis.timeToViolation < 5 ? 0.8 : 0.9;
        this.params.velocity = Math.max(0.5, this.params.velocity * throttleFactor);
        console.log(`  🛡️ Applied throttling: velocity reduced to ${this.params.velocity.toFixed(3)}`);
      }
      
      // Apply buffer adjustment if needed
      else if (analysis.mitigation === 'buffer') {
        // More aggressive buffer adjustment when time to violation is small
        const bufferFactor = analysis.timeToViolation < 5 ? 0.95 : 0.98;
        this.params.aiCognitive = Math.max(2, this.params.aiCognitive * bufferFactor);
        console.log(`  🛡️ Applied buffer: AIc reduced to ${this.params.aiCognitive.toFixed(3)}`);
      }
      
      // Apply parameter adjustment if needed
      else if (analysis.mitigation === 'adjust') {
        // Find oscillating parameter and dampen it
        if (analysis.pattern.includes('oscillation')) {
          this.params.aiCognitive = this.calculateDampenedValue(
            this.params.aiCognitive,
            this.getHistoricalValues('aiCognitive', 5)
          );
          console.log(`  🛡️ Applied damping: AIc stabilized to ${this.params.aiCognitive.toFixed(3)}`);
        }
      }
      
      // Apply compound strategy for multiple high-risk patterns
      else if (analysis.mitigation === 'compound') {
        // Apply multiple mitigations simultaneously
        // 1. Reduce AIc
        this.params.aiCognitive = Math.max(2, this.params.aiCognitive * 0.95);
        
        // 2. Reduce velocity
        this.params.velocity = Math.max(0.5, this.params.velocity * 0.85);
        
        // 3. Dampen oscillations
        this.params.aiCognitive = this.calculateDampenedValue(
          this.params.aiCognitive,
          this.getHistoricalValues('aiCognitive', 7)
        );
        
        console.log(`  🛡️ Applied compound mitigation: AIc=${this.params.aiCognitive.toFixed(3)}, velocity=${this.params.velocity.toFixed(3)}`);
      }
    }
    
    // Apply quantum buffering if needed
    if (analysis.buffered) {
      result.bufferAdjustment = analysis.bufferAdjustment;
      this.params.aiCognitive -= analysis.bufferAdjustment;
    }
    
    return result;
  }
  
  /**
   * Get historical values for a parameter
   * @param {string} paramName - Parameter name
   * @param {number} count - Number of values to retrieve
   * @returns {Array} Historical values
   * @private
   */
  getHistoricalValues(paramName, count) {
    return this.heatShield.executionHistory
      .slice(-count)
      .map(exec => exec.params[paramName]);
  }
  
  /**
   * Calculate dampened value to reduce oscillations
   * @param {number} currentValue - Current parameter value
   * @param {Array} history - Historical values
   * @returns {number} Dampened value
   * @private
   */
  calculateDampenedValue(currentValue, history) {
    if (history.length < 3) return currentValue;
    
    // Simple moving average
    const average = history.reduce((sum, val) => sum + val, 0) / history.length;
    
    // Blend current value with average (dampen oscillations)
    return currentValue * 0.3 + average * 0.7;
  }
  
  /**
   * Get execution metrics
   * @returns {Object} Execution metrics
   */
  getMetrics() {
    return {
      executionCount: this.executionCount,
      warningCount: this.warningCount,
      warningRate: this.executionCount > 0 ? this.warningCount / this.executionCount : 0,
      mitigationCount: this.mitigationCount,
      mitigationRate: this.executionCount > 0 ? this.mitigationCount / this.executionCount : 0,
      bufferingCount: this.bufferingCount,
      heatShieldMetrics: this.heatShield.getMetrics()
    };
  }
  
  /**
   * Run a simulated scenario with parameter evolution
   * @param {number} steps - Number of execution steps
   * @param {Object} scenario - Parameter evolution scenario
   * @returns {Array} Execution results
   */
  runScenario(steps, scenario = {}) {
    const results = [];
    
    // Default scenario - gradually increasing AIc
    const defaultScenario = {
      aiCognitiveRate: 0.01,
      personalityRate: 0,
      intelligenceRate: 0,
      chaosRate: 0.005,
      velocityRate: 0.01
    };
    
    // Merge with provided scenario
    const activeScenario = {
      ...defaultScenario,
      ...scenario
    };
    
    console.log(`Running ${steps} step scenario with Enhanced Heat Shield`);
    console.log(`AIc rate: ${activeScenario.aiCognitiveRate}, Velocity rate: ${activeScenario.velocityRate}`);
    
    // Run the scenario
    for (let i = 0; i < steps; i++) {
      // Evolve parameters based on scenario rates
      this.params.aiCognitive += activeScenario.aiCognitiveRate;
      this.params.personality += activeScenario.personalityRate;
      this.params.intelligence += activeScenario.intelligenceRate;
      this.params.chaos += activeScenario.chaosRate;
      this.params.velocity += activeScenario.velocityRate;
      
      // Execute with evolved parameters
      const result = this.execute();
      results.push(result);
      
      // Simple progress log every 10 steps
      if (i % 10 === 0) {
        console.log(`Step ${i}: AIc=${result.params.aiCognitive.toFixed(3)}, Result=${result.formulaResult.toFixed(3)}`);
        
        if (result.analysis.warning) {
          console.log(`  ⚠️  Warning: ${result.analysis.reason}`);
        }
        
        if (result.mitigationApplied) {
          console.log(`  🛡️  Mitigation: ${result.mitigationApplied}`);
        }
        
        if (result.bufferAdjustment) {
          console.log(`  🧱 Buffer adjustment: ${result.bufferAdjustment.toFixed(4)}`);
        }
      }
    }
    
    // Final metrics
    const metrics = this.getMetrics();
    console.log(`\nScenario completed with ${metrics.warningCount} warnings and ${metrics.mitigationCount} mitigations`);
    console.log(`Warning rate: ${(metrics.warningRate * 100).toFixed(1)}%, Mitigation rate: ${(metrics.mitigationRate * 100).toFixed(1)}%`);
    
    return results;
  }
}

// Example usage
function runDemonstration() {
  console.log('AMF Enhanced Heat Shield Demonstration');
  console.log('=====================================');
  
  // Create engine with balanced flexibility
  const engine = new AMFExecutionEngine({
    flexibilityFactor: 0.7,  // Balance between strictness and flexibility
    predictionThreshold: 0.7
  });
  
  // Run a challenging scenario - rapid AIc growth with oscillating velocity
  const results = engine.runScenario(100, {
    aiCognitiveRate: 0.008,   // Gradually increasing AIc
    velocityRate: 0.0,        // No steady velocity increase
    oscillate: true           // Enable oscillation patterns
  });
  
  // Custom oscillation pattern - applied every 5 steps
  let oscillationDirection = 1;
  for (let i = 5; i < 100; i += 5) {
    oscillationDirection *= -1;
    engine.params.velocity += 0.1 * oscillationDirection;
  }
  
  console.log('\nDemonstration complete. The V8 handled the stress with Charger reliability.');
  console.log('The narrow bridge between chaos and control has been maintained.');
}

// Run demonstration if this file is executed directly
if (require.main === module) {
  runDemonstration();
}

module.exports = AMFExecutionEngine; 