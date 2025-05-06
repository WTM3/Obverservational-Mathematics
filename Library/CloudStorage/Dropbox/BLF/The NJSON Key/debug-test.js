// BLF Debug Test Script - Testing edge cases and potential issues

const BLFProcessor = require('./blf-processor.js');
const blfConfig = require('./blf.js');

async function runDebugTests() {
  console.log('=== BLF Debug Test Suite ===');
  
  // Test 1: Cognitive alignment violation test
  console.log('\nTest 1: Cognitive alignment violation test');
  // Create a modified config with an invalid alignment
  const invalidConfig = JSON.parse(JSON.stringify(blfConfig));
  invalidConfig.cognitiveProtocol.alignment.booleanMindQs = 3.5; // Will break the formula
  
  const invalidProcessor = new BLFProcessor(invalidConfig);
  console.log('Created processor with invalid cognitive alignment');
  const alignmentResult = invalidProcessor.validateCognitiveAlignmentSafe();
  console.log('Alignment validation result (should be false):', alignmentResult);
  
  // Test 2: Error handling during initialization
  console.log('\nTest 2: Error handling during initialization');
  // Create a processor with a configuration that will cause issues
  const errorConfig = JSON.parse(JSON.stringify(blfConfig));
  delete errorConfig.cognitiveProtocol.alignment; // Will cause error in validation
  
  const errorProcessor = new BLFProcessor(errorConfig);
  try {
    await errorProcessor.initialize();
    console.log('Initialization should have failed but succeeded');
  } catch (error) {
    console.log('Caught error during initialization as expected:', error.message);
  }
  
  // Test 3: Multiple simultaneous initializations (testing recursion prevention)
  console.log('\nTest 3: Multiple simultaneous initializations');
  const processor = new BLFProcessor();
  
  // Start initialization but don't await it
  const init1Promise = processor.initialize();
  // Try to initialize again before the first one completes
  const init2Promise = processor.initialize();
  
  const [init1Result, init2Result] = await Promise.all([init1Promise, init2Promise]);
  console.log('First initialization result:', init1Result);
  console.log('Second initialization result (should show recursion prevention):', init2Result);
  
  // Test 4: Process without initialization
  console.log('\nTest 4: Process without initialization');
  const freshProcessor = new BLFProcessor();
  freshProcessor.initialized = false; // Ensure not initialized
  const processResult = await freshProcessor.process("Test input");
  console.log('Process should auto-initialize. Initialized status:', freshProcessor.initialized);
  console.log('Process result includes proper quantum state:', 
    processResult.quantumState && 
    processResult.quantumState.jumps && 
    processResult.quantumState.jumps.active === true
  );
  
  console.log('\n=== Debug Tests completed ===');
}

// Run the debug tests
runDebugTests().catch(error => {
  console.error('Debug test error:', error);
});
