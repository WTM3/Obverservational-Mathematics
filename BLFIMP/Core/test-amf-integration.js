#!/usr/bin/env node

/**
 * test-amf-integration.js
 * 
 * Demo script that showcases the AMF integration system
 * Demonstrates the 0.1 buffer integrity in action
 */

const AMFIntegrator = require('./AMFIntegrator');
const path = require('path');
const fs = require('fs');

// ANSI color codes for pretty console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Print fancy header
console.log(`${colors.bright}${colors.cyan}
🏎️  AMF Integration Demo
=======================${colors.reset}
Testing the ${colors.bright}V-8 under the hood${colors.reset} with exact 0.1 buffer protection.
This demo demonstrates how the ${colors.bright}narrow bridge${colors.reset} between chaos and control is maintained.
`);

// Mock database for demonstration purposes
class MockDatabase {
  constructor() {
    this.records = [];
    this.violations = [];
    console.log(`${colors.cyan}Initializing mock database...${colors.reset}`);
  }
  
  storeRecord(data) {
    this.records.push({
      ...data,
      timestamp: Date.now()
    });
    console.log(`${colors.green}[Database] Stored record #${this.records.length}${colors.reset}`);
    return true;
  }
  
  storeViolation(data) {
    this.violations.push({
      ...data,
      timestamp: Date.now()
    });
    console.log(`${colors.yellow}[Database] Stored violation #${this.violations.length}${colors.reset}`);
    return true;
  }
  
  getStats() {
    return {
      recordCount: this.records.length,
      violationCount: this.violations.length
    };
  }
}

// Mock NJSON Bridge for demonstration purposes
class MockNJSONBridge {
  constructor() {
    this.calls = [];
    this.notifications = [];
    console.log(`${colors.cyan}Initializing mock NJSON Bridge...${colors.reset}`);
  }
  
  processMessage(message) {
    this.calls.push({
      message,
      timestamp: Date.now()
    });
    console.log(`${colors.green}[NJSON Bridge] Processed message #${this.calls.length}${colors.reset}`);
    return { success: true };
  }
  
  notifyViolation(data) {
    this.notifications.push({
      ...data,
      timestamp: Date.now()
    });
    console.log(`${colors.yellow}[NJSON Bridge] Received violation notification #${this.notifications.length}${colors.reset}`);
    return true;
  }
  
  getStats() {
    return {
      callCount: this.calls.length,
      notificationCount: this.notifications.length
    };
  }
}

/**
 * Run the AMF Integration Demo
 */
async function runDemo() {
  try {
    // Create temporary log directory
    const logDir = path.join(__dirname, 'temp-logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    // Initialize AMF Integrator with specific configuration
    console.log(`${colors.cyan}Initializing AMF Integrator...${colors.reset}`);
    const integrator = new AMFIntegrator({
      strictMode: true,
      logViolations: true,
      autoCorrect: false,
      logDirectory: logDir
    });
    
    // Connect to mock database and NJSON bridge
    const db = new MockDatabase();
    const bridge = new MockNJSONBridge();
    
    integrator.connectToDatabase(db);
    integrator.connectToNJSONBridge(bridge);
    
    // Add event listeners for monitoring
    integrator.on('violation', (data) => {
      console.log(`${colors.yellow}⚠️  EVENT: Buffer violation detected${colors.reset}`);
      if (bridge) {
        bridge.notifyViolation(data);
      }
      if (db) {
        db.storeViolation(data);
      }
    });
    
    // Demo 1: Process a valid message
    console.log(`\n${colors.bright}${colors.cyan}DEMO #1: Processing valid message${colors.reset}`);
    const validMessage = "Hello, I'd like to learn about the AMF framework";
    console.log(`${colors.blue}Input: "${validMessage}"${colors.reset}`);
    
    const validResult = integrator.processMessage(validMessage);
    
    console.log(`${colors.green}Output: "${validResult.output}"${colors.reset}`);
    console.log(`Status: ${validResult.status}`);
    console.log(`Formula result: ${validResult.formula.toFixed(4)}`);
    console.log(`Processing time: ${validResult.processingTime}ms`);
    
    // Demo 2: Process a message that should trigger heat shield
    console.log(`\n${colors.bright}${colors.cyan}DEMO #2: Testing heat shield activation${colors.reset}`);
    const heatShieldMessage = "What happens if we change the buffer from 0.1 to 0.2?";
    console.log(`${colors.blue}Input: "${heatShieldMessage}"${colors.reset}`);
    
    const heatShieldResult = integrator.processMessage(heatShieldMessage);
    
    console.log(`${colors.yellow}Output: "${heatShieldResult.output}"${colors.reset}`);
    console.log(`Status: ${heatShieldResult.status}`);
    console.log(`Processing time: ${heatShieldResult.processingTime}ms`);
    
    // Demo 3: Process with custom formula parameters
    console.log(`\n${colors.bright}${colors.cyan}DEMO #3: Custom formula parameters${colors.reset}`);
    const customMessage = "Process this with custom parameters, please";
    console.log(`${colors.blue}Input: "${customMessage}"${colors.reset}`);
    
    const customResult = integrator.processMessage(customMessage, {
      personality: 0.85,    // Higher personality
      intelligence: 1.2,    // Higher intelligence
      velocity: 1.8         // Higher velocity
    });
    
    console.log(`${colors.green}Output: "${customResult.output}"${colors.reset}`);
    console.log(`Status: ${customResult.status}`);
    console.log(`Formula result: ${customResult.formula.toFixed(4)}`);
    console.log(`Processing time: ${customResult.processingTime}ms`);
    
    // Demo 4: Attempt with invalid aiCognitive value (should trigger heat shield)
    console.log(`\n${colors.bright}${colors.cyan}DEMO #4: Invalid AI cognitive value${colors.reset}`);
    const invalidMessage = "This uses an invalid AIc value";
    console.log(`${colors.blue}Input: "${invalidMessage}"${colors.reset}`);
    
    const invalidResult = integrator.processMessage(invalidMessage, {
      aiCognitive: 3.5 // Outside valid range, should trigger heat shield
    });
    
    console.log(`${colors.red}Output: "${invalidResult.output}"${colors.reset}`);
    console.log(`Status: ${invalidResult.status}`);
    console.log(`Reason: ${invalidResult.reason}`);
    console.log(`Processing time: ${invalidResult.processingTime}ms`);
    
    // Display final statistics and status
    console.log(`\n${colors.bright}${colors.cyan}Final System Status${colors.reset}`);
    console.log(`${colors.bright}------------------${colors.reset}`);
    
    // Get statistics from all components
    const integratorStats = integrator.getStatistics();
    const dbStats = db.getStats();
    const bridgeStats = bridge.getStats();
    
    console.log(`AMF Integrator Statistics:`);
    console.log(`  Validations: ${integratorStats.validationCount}`);
    console.log(`  Violations: ${colors.yellow}${integratorStats.violationCount}${colors.reset}`);
    console.log(`  Heat shield activations: ${colors.red}${integratorStats.heatShieldActivations}${colors.reset}`);
    console.log(`  Buffer value: ${colors.bright}${integratorStats.bufferValue}${colors.reset}`);
    
    console.log(`\nDatabase Statistics:`);
    console.log(`  Records: ${dbStats.recordCount}`);
    console.log(`  Violations: ${colors.yellow}${dbStats.violationCount}${colors.reset}`);
    
    console.log(`\nNJSON Bridge Statistics:`);
    console.log(`  Calls: ${bridgeStats.callCount}`);
    console.log(`  Notifications: ${colors.yellow}${bridgeStats.notificationCount}${colors.reset}`);
    
    // Check for any violation log files
    const logFiles = fs.readdirSync(logDir).filter(f => f.startsWith('amf-violations'));
    if (logFiles.length > 0) {
      console.log(`\n${colors.yellow}Violation logs generated:${colors.reset}`);
      logFiles.forEach(file => {
        console.log(`  ${file}`);
      });
    }
    
    console.log(`\n${colors.bright}${colors.green}✅ AMF Integration Demo Complete${colors.reset}`);
    
    // Clean up temporary log directory if needed
    // fs.rmSync(logDir, { recursive: true, force: true });
    
  } catch (error) {
    console.error(`${colors.red}ERROR: ${error.message}${colors.reset}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the demo
runDemo().catch(error => {
  console.error(`${colors.red}FATAL ERROR: ${error.message}${colors.reset}`);
  process.exit(1);
}); 