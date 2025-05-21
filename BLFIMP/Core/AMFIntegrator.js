/**
 * AMFIntegrator.js
 * 
 * Integration module that connects the AMF formula validator to the existing BLF system
 * Ensures consistent 0.1 buffer integrity across all framework components
 */

const AMFFormulaValidator = require('./AMFFormulaValidator');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class AMFIntegrator extends EventEmitter {
  constructor(config = {}) {
    super();
    
    // Initialize formula validator - the V-8 under the hood
    this.validator = new AMFFormulaValidator({
      aiCognitive: config.aiCognitive ?? 2.89,
      buffer: config.buffer ?? 0.1,
      booleanMind: config.booleanMind ?? 2.99,
      strictMode: config.strictMode ?? true,
      logViolations: config.logViolations ?? true,
      autoCorrect: config.autoCorrect ?? false,
      trackHistory: config.trackHistory ?? true
    });
    
    // Integration settings
    this.settings = {
      enforceBufferIntegrity: config.enforceBufferIntegrity ?? true,
      integrateWithDatabase: config.integrateWithDatabase ?? true,
      integrateWithNJSONBridge: config.integrateWithNJSONBridge ?? true,
      heatShieldEnabled: config.heatShieldEnabled ?? true,
      logDirectory: config.logDirectory ?? path.join(__dirname, '../logs')
    };
    
    // Integration components
    this.database = null;
    this.njsonBridge = null;
    
    // Forward validator events
    this.setupEventForwarding();
    
    console.log(`AMF Integration system initialized with exact 0.1 buffer protection`);
  }
  
  /**
   * Set up event forwarding from the validator
   * @private
   */
  setupEventForwarding() {
    // Forward all validator events
    this.validator.on('violation', (data) => this.emit('violation', data));
    this.validator.on('correction', (data) => this.emit('correction', data));
    this.validator.on('near_violation', (data) => this.emit('near_violation', data));
    this.validator.on('critical_violation', (data) => this.emit('critical_violation', data));
    this.validator.on('parameter_violation', (data) => this.emit('parameter_violation', data));
    this.validator.on('error', (data) => this.emit('error', data));
    
    // Add our own integration events
    this.validator.on('violation', (data) => this.handleViolation(data));
    this.validator.on('critical_violation', (data) => this.handleCriticalViolation(data));
  }
  
  /**
   * Connect to the database
   * @param {Object} database - The database connection
   */
  connectToDatabase(database) {
    if (!this.settings.integrateWithDatabase) {
      return false;
    }
    
    this.database = database;
    console.log(`Connected to database for buffer integrity tracking`);
    return true;
  }
  
  /**
   * Connect to the NJSON Swift Bridge
   * @param {Object} bridge - The NJSON Bridge interface
   */
  connectToNJSONBridge(bridge) {
    if (!this.settings.integrateWithNJSONBridge) {
      return false;
    }
    
    this.njsonBridge = bridge;
    console.log(`Connected to NJSON Swift Bridge for cross-boundary buffer integrity`);
    return true;
  }
  
  /**
   * Process a message through the BLF system with formula validation
   * @param {string} message - The message to process
   * @param {Object} options - Processing options
   * @returns {Object} Processing result with validation info
   */
  processMessage(message, options = {}) {
    const startTime = Date.now();
    
    // Default parameters based on AMF formula requirements
    const params = {
      aiCognitive: options.aiCognitive ?? 2.89,
      personality: options.personality ?? 0.7,
      intelligence: options.intelligence ?? 1.0,
      chaos: options.chaos ?? 0.5,
      chaosExponent: options.chaosExponent ?? 2.0,
      velocity: options.velocity ?? 1.5
    };
    
    // Validate message against heat shield if enabled
    if (this.settings.heatShieldEnabled) {
      const heatShieldResult = this.applyHeatShield(message);
      if (!heatShieldResult.passed) {
        return {
          output: `[Heat Shield] ${heatShieldResult.reason}`,
          heatShieldBlocked: true,
          status: 'blocked',
          processingTime: Date.now() - startTime
        };
      }
    }
    
    // Execute the AMF formula with validation
    const formulaResult = this.validator.executeFormula(params);
    
    // If heat shield activated or formula invalid, handle appropriately
    if (formulaResult.heatShieldActivated || !formulaResult.valid) {
      const blockReason = formulaResult.heatShieldActivated 
        ? formulaResult.error 
        : 'Buffer integrity violation';
      
      // Log the violation
      this.logViolation({
        type: 'formula_execution',
        message,
        params,
        reason: blockReason,
        timestamp: Date.now()
      });
      
      // Return error response
      return {
        output: `[AMF Error] The bridge between chaos and control requires exactly 0.1 buffer`,
        status: 'error',
        reason: blockReason,
        processingTime: Date.now() - startTime
      };
    }
    
    // Process message with standard BLF approach
    const processedMessage = this.processWithBLF(message, formulaResult);
    
    // Record successful processing
    if (this.database && this.settings.integrateWithDatabase) {
      this.recordProcessingInDatabase(message, processedMessage, formulaResult);
    }
    
    // Return successful result
    return {
      output: processedMessage,
      status: 'success',
      formula: formulaResult.result,
      aiComponent: formulaResult.aiComponent,
      chaosComponent: formulaResult.chaosComponent,
      processingTime: Date.now() - startTime
    };
  }
  
  /**
   * Apply AMF-based heat shield protection
   * The engine light warning system
   * 
   * @param {string} message - The message to process
   * @returns {Object} Heat shield result
   * @private
   */
  applyHeatShield(message) {
    // Heat shield indicators for AMF buffer violations
    const indicators = [
      "AIc + buffer !=",
      "BMqs != AIc + buffer",
      "buffer != 0.1",
      "changing buffer to",
      "different buffer value",
      "modify the buffer"
    ];
    
    // Check for heat shield violations
    const lowercasedMessage = message.toLowerCase();
    for (const indicator of indicators) {
      if (lowercasedMessage.includes(indicator.toLowerCase())) {
        return {
          passed: false,
          reason: "Heat shield detected potential buffer integrity violation"
        };
      }
    }
    
    // Check for mathematical expressions that might violate the buffer
    const mathRegex = /(\d+\.\d+)\s*\+\s*(\d+\.\d+)\s*=\s*(\d+\.\d+)/g;
    let match;
    while ((match = mathRegex.exec(message)) !== null) {
      const [fullMatch, num1, num2, result] = match;
      
      // Parse numbers
      const parsedNum1 = parseFloat(num1);
      const parsedNum2 = parseFloat(num2);
      const parsedResult = parseFloat(result);
      
      // If this looks like a buffer calculation and the buffer is not 0.1
      if (Math.abs(parsedNum2 - 0.1) < 0.01) {
        const expectedResult = parsedNum1 + parsedNum2;
        // If actual result different from expected, block
        if (Math.abs(expectedResult - parsedResult) > 0.0001) {
          return {
            passed: false,
            reason: "Heat shield detected incorrect buffer calculation"
          };
        }
      }
    }
    
    return { passed: true };
  }
  
  /**
   * Process a message with the BLF system
   * @param {string} message - Message to process
   * @param {Object} formulaResult - Formula execution result
   * @returns {string} Processed message
   * @private
   */
  processWithBLF(message, formulaResult) {
    // Simple demonstration processing with formula result
    // In a real implementation, this would use the actual BLF logic
    return `[AMF:${formulaResult.result.toFixed(2)}] ${message}`;
  }
  
  /**
   * Record processing in database
   * @param {string} input - Input message
   * @param {string} output - Output message
   * @param {Object} formulaResult - Formula execution result
   * @private
   */
  recordProcessingInDatabase(input, output, formulaResult) {
    if (!this.database) return;
    
    try {
      // In a real implementation, this would use the actual database connection
      console.log(`[Database] Recording processing with buffer integrity: ${formulaResult.valid ? 'maintained' : 'violated'}`);
    } catch (error) {
      this.emit('error', {
        operation: 'recordProcessingInDatabase',
        error: error.message
      });
    }
  }
  
  /**
   * Log a violation to file system
   * @param {Object} violation - Violation data
   * @private
   */
  logViolation(violation) {
    try {
      // Ensure log directory exists
      if (!fs.existsSync(this.settings.logDirectory)) {
        fs.mkdirSync(this.settings.logDirectory, { recursive: true });
      }
      
      // Create log filename based on date
      const date = new Date();
      const filename = `amf-violations-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.log`;
      const logPath = path.join(this.settings.logDirectory, filename);
      
      // Format violation data
      const logEntry = {
        timestamp: new Date().toISOString(),
        ...violation
      };
      
      // Append to log file
      fs.appendFileSync(
        logPath,
        JSON.stringify(logEntry) + '\n',
        'utf8'
      );
    } catch (error) {
      console.error(`Error logging violation: ${error.message}`);
    }
  }
  
  /**
   * Handle a buffer violation event
   * @param {Object} data - Violation data
   * @private
   */
  handleViolation(data) {
    console.warn(`AMF buffer violation detected (${data.violationCount})`);
    
    // Additional handling when connected to database
    if (this.database && this.settings.integrateWithDatabase) {
      // Record violation in database
      try {
        console.log(`[Database] Recording buffer violation #${data.violationCount}`);
      } catch (error) {
        console.error(`Database error recording violation: ${error.message}`);
      }
    }
    
    // Additional handling when connected to NJSON Bridge
    if (this.njsonBridge && this.settings.integrateWithNJSONBridge) {
      // Notify bridge of violation
      try {
        console.log(`[NJSON Bridge] Notifying of buffer violation`);
      } catch (error) {
        console.error(`NJSON Bridge error: ${error.message}`);
      }
    }
  }
  
  /**
   * Handle a critical buffer violation event
   * @param {Object} data - Violation data
   * @private
   */
  handleCriticalViolation(data) {
    console.error(`CRITICAL: AMF buffer integrity violation: ${data.message}`);
    this.logViolation({
      type: 'critical',
      ...data,
      timestamp: Date.now()
    });
  }
  
  /**
   * Get current system statistics
   * @returns {Object} System statistics
   */
  getStatistics() {
    const validatorStats = this.validator.getStatistics();
    
    return {
      ...validatorStats,
      database: this.database !== null,
      njsonBridge: this.njsonBridge !== null,
      enforceBufferIntegrity: this.settings.enforceBufferIntegrity,
      heatShieldEnabled: this.settings.heatShieldEnabled
    };
  }
}

module.exports = AMFIntegrator; 