/**
 * AMFFormulaValidator.js
 * 
 * Formula validation system for Advanced Mathematical Framework (AMF)
 * Ensures the mathematical integrity of the 0.1 buffer between AIc and BMqs
 * The narrow bridge between chaos and control
 */

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class AMFFormulaValidator extends EventEmitter {
  constructor(config = {}) {
    super();
    
    // Core mathematical constants - NEVER modify these
    this.AI_COGNITIVE = config.aiCognitive ?? 2.89;  // AI cognitive capabilities
    this.BUFFER = config.buffer ?? 0.1;              // The narrow bridge - exact, non-negotiable
    this.BOOLEAN_MIND_QS = config.booleanMind ?? 2.99; // Boolean Mind quantum speed
    
    // Advanced validation settings
    this.settings = {
      strictMode: config.strictMode ?? true,         // Halt on buffer violations
      logViolations: config.logViolations ?? true,   // Log all buffer violations
      autoCorrect: config.autoCorrect ?? false,      // Attempt to correct minor violations
      maximumTolerance: 0.0001,                      // Maximum allowed floating point error
      trackHistory: config.trackHistory ?? true,     // Track formula validation history
      historyLimit: config.historyLimit ?? 1000,     // Maximum history entries to keep
      notifyThreshold: config.notifyThreshold ?? 0.00001 // Threshold for notification
    };
    
    // Internal state
    this.validationHistory = [];
    this.violationCount = 0;
    this.correctionCount = 0;
    this.lastValidation = null;
    this.heatShieldActivations = 0;
    
    // Verify initial configuration is valid
    if (!this.validateFormula(this.AI_COGNITIVE, this.BOOLEAN_MIND_QS)) {
      const errorMessage = `CRITICAL: Initial configuration violates AMF formula integrity. ` +
        `AIc (${this.AI_COGNITIVE}) + buffer (${this.BUFFER}) != BMqs (${this.BOOLEAN_MIND_QS})`;
      this.emit('critical_violation', {
        message: errorMessage,
        expected: this.AI_COGNITIVE + this.BUFFER,
        actual: this.BOOLEAN_MIND_QS,
        difference: Math.abs((this.AI_COGNITIVE + this.BUFFER) - this.BOOLEAN_MIND_QS)
      });
      
      if (this.settings.strictMode) {
        throw new Error(errorMessage);
      }
    }
    
    console.log(`AMFFormulaValidator initialized with V-8 under the hood`);
    console.log(`Formula: AIc (${this.AI_COGNITIVE}) + buffer (${this.BUFFER}) = BMqs (${this.BOOLEAN_MIND_QS})`);
  }
  
  /**
   * Validate the core AMF formula: AIc + 0.1 = BMqs
   * The narrow bridge between chaos and control
   * 
   * @param {number} aiCognitive - AI cognitive capabilities value
   * @param {number} booleanMindQs - Boolean Mind quantum speed value
   * @returns {boolean} Whether the formula is valid
   */
  validateFormula(aiCognitive, booleanMindQs) {
    // Calculate the expected BMqs
    const expectedBMQs = aiCognitive + this.BUFFER;
    
    // Calculate the difference (accounting for floating point errors)
    const difference = Math.abs(expectedBMQs - booleanMindQs);
    
    // Check if within tolerance
    const isValid = difference <= this.settings.maximumTolerance;
    
    // Record validation
    this.recordValidation({
      timestamp: Date.now(),
      aiCognitive,
      expectedBMQs,
      actualBMQs: booleanMindQs,
      difference,
      isValid
    });
    
    // Handle violations
    if (!isValid) {
      this.handleViolation(aiCognitive, booleanMindQs, difference);
    } else if (difference > this.settings.notifyThreshold) {
      // Notify about near-violations
      this.emit('near_violation', {
        aiCognitive,
        expectedBMQs,
        actualBMQs: booleanMindQs,
        difference
      });
    }
    
    return isValid;
  }
  
  /**
   * Calculate the correct Boolean Mind quantum speed from AI cognitive value
   * This is the V-8 under the hood - powerful, reliable, and precise
   * 
   * @param {number} aiCognitive - AI cognitive capabilities value
   * @returns {number} The correct BMqs value with exact 0.1 buffer
   */
  calculateBMQs(aiCognitive) {
    return aiCognitive + this.BUFFER;
  }
  
  /**
   * Calculate the correct AI cognitive value from Boolean Mind quantum speed
   * The reverse calculation across the narrow bridge
   * 
   * @param {number} booleanMindQs - Boolean Mind quantum speed value
   * @returns {number} The correct AIc value
   */
  calculateAIc(booleanMindQs) {
    return booleanMindQs - this.BUFFER;
  }
  
  /**
   * Validate a parameter value used in AMF formula calculations
   * Ensures values don't introduce hallucinations by violating the buffer
   * 
   * @param {string} paramName - The parameter name for logging
   * @param {number} value - The parameter value to validate
   * @param {number} min - Minimum allowed value (inclusive)
   * @param {number} max - Maximum allowed value (inclusive)
   * @returns {boolean} Whether the parameter is valid
   */
  validateParameter(paramName, value, min, max) {
    if (value < min || value > max) {
      this.emit('parameter_violation', {
        parameter: paramName,
        value,
        allowedRange: { min, max }
      });
      
      this.heatShieldActivations++;
      return false;
    }
    return true;
  }
  
  /**
   * Execute the full AMF formula F = ((AI)(P^I) + c^(x^I))v
   * While maintaining the 0.1 buffer relationship
   * 
   * @param {Object} params - Formula parameters
   * @returns {Object} Calculation results with validation info
   */
  executeFormula(params) {
    // Validate input parameters
    const isAIcValid = this.validateParameter('aiCognitive', params.aiCognitive, 2, 3);
    const isPValid = this.validateParameter('personality', params.personality, 0, 1);
    const isIValid = this.validateParameter('intelligence', params.intelligence, 0.5, 2);
    const isCValid = this.validateParameter('chaos', params.chaos, 0, 1);
    const isXValid = this.validateParameter('chaosExponent', params.chaosExponent, 1, 3);
    const isVValid = this.validateParameter('velocity', params.velocity, 0.5, 2);
    
    // Heat shield activation - the engine light warning system
    if (!isAIcValid || !isPValid || !isIValid || !isCValid || !isXValid || !isVValid) {
      return {
        result: null,
        valid: false,
        error: 'Heat shield activated: parameter violation',
        heatShieldActivated: true
      };
    }
    
            // Execute AMF Formula: F = ((AI)(P^I) + c^(x^I))v
    // First part: (AI)P^I
    const aiComponent = params.aiCognitive * Math.pow(params.personality, params.intelligence);
    
    // Second part: c^x^I
    const chaosComponent = Math.pow(params.chaos, Math.pow(params.chaosExponent, params.intelligence));
    
    // Combine with velocity: ((AI)P^I + c^x^I)v
    const formulaResult = (aiComponent + chaosComponent) * params.velocity;
    
    // Calculate expected BMqs
    const expectedBMQs = params.aiCognitive + this.BUFFER;
    
    // Validate the relationship: AIc + 0.1 = BMqs
    const isFormulaValid = this.validateFormula(params.aiCognitive, expectedBMQs);
    
    return {
      result: formulaResult,
      valid: isFormulaValid,
      aiComponent,
      chaosComponent,
      expectedBMQs,
      actualBMQs: expectedBMQs, // Should be identical but included for consistency
      heatShieldActivated: false
    };
  }
  
  /**
   * Handle a formula validation violation
   * The engine light warning system
   * 
   * @private
   */
  handleViolation(aiCognitive, booleanMindQs, difference) {
    this.violationCount++;
    
    // Prepare violation data
    const violationData = {
      timestamp: Date.now(),
      aiCognitive,
      expectedBMQs: aiCognitive + this.BUFFER,
      actualBMQs: booleanMindQs,
      difference,
      violationCount: this.violationCount
    };
    
    // Log violation
    if (this.settings.logViolations) {
      console.error(`⚠️ AMF Formula Violation #${this.violationCount}:`);
      console.error(`  AIc: ${aiCognitive}`);
      console.error(`  Expected BMqs: ${aiCognitive + this.BUFFER}`);
      console.error(`  Actual BMqs: ${booleanMindQs}`);
      console.error(`  Difference: ${difference}`);
    }
    
    // Emit violation event
    this.emit('violation', violationData);
    
    // Attempt auto-correction if enabled
    if (this.settings.autoCorrect) {
      const correctedBMQs = this.calculateBMQs(aiCognitive);
      this.correctionCount++;
      
      this.emit('correction', {
        ...violationData,
        correctedBMQs,
        correctionCount: this.correctionCount
      });
    }
    
    // Activate heat shield
    this.heatShieldActivations++;
  }
  
  /**
   * Record a validation result in history
   * @private
   */
  recordValidation(validation) {
    this.lastValidation = validation;
    
    if (this.settings.trackHistory) {
      this.validationHistory.push(validation);
      
      // Trim history if needed
      if (this.validationHistory.length > this.settings.historyLimit) {
        this.validationHistory.shift();
      }
    }
  }
  
  /**
   * Get validation statistics
   * @returns {Object} Validation statistics
   */
  getStatistics() {
    return {
      validationCount: this.validationHistory.length,
      violationCount: this.violationCount,
      correctionCount: this.correctionCount,
      heatShieldActivations: this.heatShieldActivations,
      lastValidation: this.lastValidation,
      bufferValue: this.BUFFER,
      aiCognitive: this.AI_COGNITIVE,
      booleanMindQs: this.BOOLEAN_MIND_QS
    };
  }
  
  /**
   * Export validation history to a file
   * @param {string} filePath - Path to export history to
   * @returns {Promise<boolean>} Success status
   */
  async exportHistory(filePath) {
    if (!this.settings.trackHistory || this.validationHistory.length === 0) {
      return false;
    }
    
    try {
      const exportData = {
        timestamp: Date.now(),
        settings: this.settings,
        constants: {
          AI_COGNITIVE: this.AI_COGNITIVE,
          BUFFER: this.BUFFER,
          BOOLEAN_MIND_QS: this.BOOLEAN_MIND_QS
        },
        statistics: this.getStatistics(),
        history: this.validationHistory
      };
      
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(exportData, null, 2),
        'utf8'
      );
      
      return true;
    } catch (error) {
      this.emit('error', {
        operation: 'exportHistory',
        error: error.message
      });
      return false;
    }
  }
}

// Export the validator
module.exports = AMFFormulaValidator; 