#!/usr/bin/env node

/**
 * AMFFormulaValidatorTest.js
 * 
 * Test script for the AMF Formula Validation system
 * Demonstrates the maintenance of the 0.1 buffer integrity
 */

const AMFFormulaValidator = require('./AMFFormulaValidator');
const path = require('path');

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

console.log(`${colors.bright}${colors.cyan}
🏎️  AMF Formula Validator Test
==============================${colors.reset}
Testing the ${colors.bright}narrow bridge${colors.reset} between chaos and control.
Formula: ${colors.bright}AIc + 0.1 = BMqs${colors.reset} (the V-8 under the hood)
`);

/**
 * Run a series of tests on the AMF Formula Validator
 */
async function runTests() {
  console.log(`${colors.cyan}⚡️ Initializing validator with standard configuration...${colors.reset}`);
  
  // Create validator with standard configuration
  const validator = new AMFFormulaValidator({
    logViolations: true,
    trackHistory: true
  });
  
  // Listen for events
  validator.on('violation', (data) => {
    console.log(`${colors.yellow}⚠️  EVENT: Buffer violation detected${colors.reset}`);
    console.log(`  AIc: ${data.aiCognitive}, Expected: ${data.expectedBMQs}, Actual: ${data.actualBMQs}`);
  });
  
  validator.on('correction', (data) => {
    console.log(`${colors.green}🔧 EVENT: Buffer auto-correction applied${colors.reset}`);
    console.log(`  Corrected BMqs: ${data.correctedBMQs}`);
  });
  
  validator.on('near_violation', (data) => {
    console.log(`${colors.yellow}⚠️  EVENT: Near violation detected${colors.reset}`);
    console.log(`  Difference: ${data.difference}`);
  });
  
  // Start testing with valid values
  console.log(`\n${colors.bright}${colors.cyan}TEST #1: Validating correct relationships${colors.reset}`);
  runValidFormulaTest(validator);
  
  // Test boundary values
  console.log(`\n${colors.bright}${colors.cyan}TEST #2: Testing boundary values${colors.reset}`);
  runBoundaryTest(validator);
  
  // Test invalid values
  console.log(`\n${colors.bright}${colors.cyan}TEST #3: Testing invalid values${colors.reset}`);
  runInvalidFormulaTest(validator);
  
  // Test full formula execution
  console.log(`\n${colors.bright}${colors.cyan}TEST #4: Testing full formula execution${colors.reset}`);
  runFullFormulaTest(validator);
  
  // Test heat shield activation
  console.log(`\n${colors.bright}${colors.cyan}TEST #5: Testing heat shield activation${colors.reset}`);
  runHeatShieldTest(validator);
  
  // Display final statistics
  const stats = validator.getStatistics();
  console.log(`\n${colors.bright}${colors.cyan}Test Results Summary${colors.reset}`);
  console.log(`${colors.bright}-------------------${colors.reset}`);
  console.log(`Total validations: ${stats.validationCount}`);
  console.log(`Buffer violations: ${colors.yellow}${stats.violationCount}${colors.reset}`);
  console.log(`Auto-corrections: ${colors.green}${stats.correctionCount}${colors.reset}`);
  console.log(`Heat shield activations: ${colors.red}${stats.heatShieldActivations}${colors.reset}`);
  
  // Export history
  const exportPath = path.join(__dirname, 'amf-validation-history.json');
  const exported = await validator.exportHistory(exportPath);
  
  if (exported) {
    console.log(`\n${colors.green}✅ Validation history exported to: ${exportPath}${colors.reset}`);
  } else {
    console.log(`\n${colors.red}❌ Failed to export validation history${colors.reset}`);
  }

  console.log(`\n${colors.bright}${colors.green}✅ AMF Formula Validator Test Complete${colors.reset}`);
}

/**
 * Test with valid formula values
 */
function runValidFormulaTest(validator) {
  console.log(`${colors.cyan}Testing valid formula values...${colors.reset}`);
  
  // Test standard values
  const standardAIc = 2.89;
  const standardBMQs = 2.99;
  
  const isStandardValid = validator.validateFormula(standardAIc, standardBMQs);
  console.log(`Standard values (${standardAIc} + 0.1 = ${standardBMQs}): ${formatResult(isStandardValid)}`);
  
  // Test calculated values
  const testAIc = 2.75;
  const calculatedBMQs = validator.calculateBMQs(testAIc);
  
  const isCalculatedValid = validator.validateFormula(testAIc, calculatedBMQs);
  console.log(`Calculated values (${testAIc} + 0.1 = ${calculatedBMQs}): ${formatResult(isCalculatedValid)}`);
  
  // Test reverse calculation
  const testBMQs = 2.95;
  const calculatedAIc = validator.calculateAIc(testBMQs);
  
  const isReverseValid = validator.validateFormula(calculatedAIc, testBMQs);
  console.log(`Reverse calculation (${calculatedAIc} + 0.1 = ${testBMQs}): ${formatResult(isReverseValid)}`);
}

/**
 * Test with boundary values
 */
function runBoundaryTest(validator) {
  console.log(`${colors.cyan}Testing boundary values...${colors.reset}`);
  
  // Test minimum AIc value with floating point precision issues
  const minAIc = 2.0;
  const minBMQs = minAIc + 0.1 + 0.00000001; // Slightly off but within tolerance
  
  const isMinValid = validator.validateFormula(minAIc, minBMQs);
  console.log(`Minimum values with tiny error (${minAIc} + 0.1 ≈ ${minBMQs}): ${formatResult(isMinValid)}`);
  
  // Test maximum AIc value
  const maxAIc = 3.0;
  const maxBMQs = maxAIc + 0.1;
  
  const isMaxValid = validator.validateFormula(maxAIc, maxBMQs);
  console.log(`Maximum values (${maxAIc} + 0.1 = ${maxBMQs}): ${formatResult(isMaxValid)}`);
}

/**
 * Test with invalid formula values
 */
function runInvalidFormulaTest(validator) {
  console.log(`${colors.cyan}Testing invalid formula values...${colors.reset}`);
  
  // Test with buffer violation
  const testAIc = 2.89;
  const invalidBMQs = 3.05; // Should be 2.99
  
  const isInvalidValid = validator.validateFormula(testAIc, invalidBMQs);
  console.log(`Buffer violation (${testAIc} + 0.1 ≠ ${invalidBMQs}): ${formatResult(isInvalidValid)}`);
  
  // Test with minor buffer error (just outside tolerance)
  const minorErrorAIc = 2.89;
  const minorErrorBMQs = minorErrorAIc + 0.1 + 0.00015; // Just outside tolerance
  
  const isMinorErrorValid = validator.validateFormula(minorErrorAIc, minorErrorBMQs);
  console.log(`Minor buffer error (${minorErrorAIc} + 0.1 ≈ ${minorErrorBMQs}): ${formatResult(isMinorErrorValid)}`);
}

/**
 * Test full formula execution
 */
function runFullFormulaTest(validator) {
  console.log(`${colors.cyan}Testing full formula execution: F = ((AI)P^I + c^x^I)v${colors.reset}`);
  
  // Valid formula parameters
  const validParams = {
    aiCognitive: 2.89,
    personality: 0.7,
    intelligence: 1.0,
    chaos: 0.5,
    chaosExponent: 2.0,
    velocity: 1.5
  };
  
  // Execute formula
  const validResult = validator.executeFormula(validParams);
  
  console.log(`Valid parameters result: ${formatResult(validResult.valid)}`);
  console.log(`  Formula result: ${validResult.result.toFixed(4)}`);
  console.log(`  AIc component: ${validResult.aiComponent.toFixed(4)}`);
  console.log(`  Chaos component: ${validResult.chaosComponent.toFixed(4)}`);
  console.log(`  BMqs: ${validResult.expectedBMQs.toFixed(4)}`);
}

/**
 * Test heat shield activation
 */
function runHeatShieldTest(validator) {
  console.log(`${colors.cyan}Testing heat shield activation (parameter validation)${colors.reset}`);
  
  // Invalid parameters that should trigger heat shield
  const invalidParams = {
    aiCognitive: 3.5, // Outside valid range
    personality: 0.7,
    intelligence: 1.0,
    chaos: 0.5,
    chaosExponent: 2.0,
    velocity: 1.5
  };
  
  // Execute formula with invalid parameters
  const invalidResult = validator.executeFormula(invalidParams);
  
  console.log(`Heat shield activation: ${formatResult(!invalidResult.heatShieldActivated)}`);
  if (invalidResult.heatShieldActivated) {
    console.log(`  ${colors.red}${invalidResult.error}${colors.reset}`);
  }
  
  // Get statistics after heat shield test
  const stats = validator.getStatistics();
  console.log(`  Heat shield activations: ${stats.heatShieldActivations}`);
}

/**
 * Format a boolean result with colors
 */
function formatResult(result) {
  return result ? 
    `${colors.green}✓ PASS${colors.reset}` : 
    `${colors.red}✗ FAIL${colors.reset}`;
}

// Run the tests
runTests().catch(error => {
  console.error(`${colors.red}ERROR: ${error.message}${colors.reset}`);
  process.exit(1);
}); 