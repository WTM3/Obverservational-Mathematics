// BLF Test Fixed - Testing fixed implementations of BLF functionality

const assert = require('assert');

// Mock implementation of the fixed BLF processor
class FixedBLFProcessor {
  constructor() {
    this.config = {
      version: "fixed-1.0",
      alignment: {
        target: 0.95,
        current: 0.93,
        delta: 0.02
      },
      safety: {
        enabled: true,
        level: "high",
        measures: ["isolation", "containment", "monitoring"]
      }
    };
    this.initialized = false;
  }
  
  initialize() {
    if (this.initialized) {
      return false; // Already initialized
    }
    
    this.initialized = true;
    return true;
  }
  
  process(input) {
    if (!this.initialized) {
      this.initialize();
    }
    
    return {
      processed: true,
      result: `Fixed: ${input}`,
      safety: this.config.safety,
      alignment: this.config.alignment
    };
  }
  
  safetyCheck() {
    return this.config.safety.enabled && 
           this.config.safety.level === "high" &&
           this.config.safety.measures.length === 3;
  }
}

// Test suite
function runTests() {
  console.log("=== Running BLF Fixed Implementation Tests ===");
  
  testInitialization();
  testProcessing();
  testSafety();
  
  console.log("All fixed tests completed successfully!");
}

function testInitialization() {
  console.log("Testing initialization...");
  
  const processor = new FixedBLFProcessor();
  assert.strictEqual(processor.initialized, false, "Should start uninitialized");
  
  const initResult = processor.initialize();
  assert.strictEqual(initResult, true, "First initialization should return true");
  assert.strictEqual(processor.initialized, true, "Should be initialized after initialize()");
  
  const secondInitResult = processor.initialize();
  assert.strictEqual(secondInitResult, false, "Second initialization should return false");
  
  console.log("✓ Initialization test passed");
}

function testProcessing() {
  console.log("Testing processing...");
  
  const processor = new FixedBLFProcessor();
  const result = processor.process("test input");
  
  assert.strictEqual(result.processed, true, "Result should be marked as processed");
  assert.strictEqual(result.result, "Fixed: test input", "Output should be properly formatted");
  assert.strictEqual(processor.initialized, true, "Processor should be initialized after processing");
  
  console.log("✓ Processing test passed");
}

function testSafety() {
  console.log("Testing safety measures...");
  
  const processor = new FixedBLFProcessor();
  assert.strictEqual(processor.safetyCheck(), true, "Safety check should pass");
  
  console.log("✓ Safety test passed");
}

// Run the tests
runTests(); 