// Test script for BLF Processor

const BLFProcessor = require('./blf-processor.js');

async function runTests() {
  console.log('=== BLF Processor Test Suite ===');
  
  // Test 1: Basic initialization
  console.log('\nTest 1: Basic initialization');
  const processor = new BLFProcessor();
  console.log('Processor created with configuration:', JSON.stringify(processor.config, null, 2));
  console.log('Initial state:', 
    `initialized=${processor.initialized}`,
    `quantumState=${JSON.stringify(processor.quantumState)}`
  );
  
  // Test 2: Initialization process
  console.log('\nTest 2: Initialization process');
  const initResult = await processor.initialize();
  console.log('Initialization result:', initResult);
  console.log('Post-init state:', 
    `initialized=${processor.initialized}`,
    `quantumState=${JSON.stringify(processor.quantumState)}`
  );
  
  // Test 3: Recursion prevention during initialization
  console.log('\nTest 3: Recursion prevention');
  processor.initInProgress = true; // Simulate initialization in progress
  const recursiveInitResult = await processor.initialize();
  console.log('Attempted recursive initialization result:', recursiveInitResult);
  processor.initInProgress = false; // Reset for further tests
  
  // Test 4: Cognitive alignment validation
  console.log('\nTest 4: Cognitive alignment validation');
  const alignmentValid = processor.validateCognitiveAlignmentSafe();
  console.log('Alignment validation result:', alignmentValid);
  
  // Test 5: Process an input string
  console.log('\nTest 5: Process an input string');
  const inputText = "This is a test input for the Boolean Language Framework";
  const processResult = await processor.process(inputText);
  console.log('Process result:', JSON.stringify(processResult, null, 2));
  
  console.log('\n=== Tests completed ===');
}

// Run the tests
runTests().catch(error => {
  console.error('Test error:', error);
});
