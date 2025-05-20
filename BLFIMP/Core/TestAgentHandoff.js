#!/usr/bin/env node
// TestAgentHandoff.js - Tests the agent handoff system and database enhancements

const SQLiteDatabase = require('./SQLiteDatabase');
const AgentHandoff = require('./AgentHandoff');
const path = require('path');

// Configuration
const config = {
  dbPath: path.join(__dirname, 'blf-database.db'),
  cognitiveAlignment: {
    aiCognitiveCapabilities: 2.89,
    safetyBuffer: 0.1,
    booleanMindQuantumSpeed: 2.99,
    formula: 'AIc + 0.1 = BMqs'
  },
  heatShield: {
    wordPatterns: ['maybe', 'perhaps', 'might', 'could be', 'possibly'],
    strength: 0.95
  },
  recoverySystem: {
    enabled: true,
    threshold: 0.05,
    maxAttempts: 3
  },
  adaptiveSettings: {
    disabilityAwareness: 1.0
  }
};

// Create test agents
function createSourceAgent(id) {
  return {
    id,
    cognitiveAlignment: {
      aiCognitiveCapabilities: 2.89,
      safetyBuffer: 0.1,
      booleanMindQuantumSpeed: 2.99
    },
    quantumState: {
      pure: true,
      fog: false,
      breathing: true,
      jumps: {
        active: true,
        power: "v8_to_charger"
      }
    },
    heatShield: {
      activations: 5,
      lastActivation: Date.now() - 3600000, // 1 hour ago
      detections: [
        { pattern: 'maybe', timestamp: Date.now() - 7200000 },
        { pattern: 'possibly', timestamp: Date.now() - 3600000 }
      ],
      shieldStrength: 0.95
    },
    accessibility: {
      disabilityAwareness: 1.0,
      communicationStyle: "balanced",
      adaptiveTiming: true
    }
  };
}

function createTargetAgent(id) {
  return {
    id,
    cognitiveAlignment: {
      aiCognitiveCapabilities: 0, // Will be set during handoff
      safetyBuffer: 0, // Will be set during handoff
      booleanMindQuantumSpeed: 0 // Will be set during handoff
    },
    quantumState: {
      pure: false, // Will be set during handoff
      fog: true, // Will be set during handoff
      breathing: false, // Will be set during handoff
      jumps: {
        active: false,
        power: ""
      }
    },
    heatShield: null, // Will be set during handoff
    accessibility: null // Will be set during handoff
  };
}

// Test the buffer recovery system
async function testBufferRecovery(db) {
  console.log('\n🧪 Testing Buffer Recovery System...');
  
  // Deliberately violate the buffer
  const alignment = db.config.cognitiveAlignment;
  console.log(`Current alignment: AIc(${alignment.aiCognitiveCapabilities}) + ${alignment.safetyBuffer} = BMqs(${alignment.booleanMindQuantumSpeed})`);
  
  // Create a violation
  alignment.booleanMindQuantumSpeed = alignment.aiCognitiveCapabilities + 0.15; // Not 0.1!
  console.log(`Induced violation: AIc(${alignment.aiCognitiveCapabilities}) + 0.1 ≠ BMqs(${alignment.booleanMindQuantumSpeed})`);
  
  // Try to recover
  const recoveryResult = await db.checkAlignmentAndRecover();
  
  // Check results
  console.log(`Recovery successful: ${recoveryResult}`);
  console.log(`Restored alignment: AIc(${alignment.aiCognitiveCapabilities}) + ${alignment.safetyBuffer} = BMqs(${alignment.booleanMindQuantumSpeed})`);
}

// Test the heat shield
async function testHeatShield(db) {
  console.log('\n🧪 Testing Heat Shield...');
  
  // Create some data with uncertainty markers
  const uncertainData = "This might be a hallucination or perhaps it's something else.";
  console.log(`Original data: "${uncertainData}"`);
  
  // Apply heat shield
  const shieldedData = db.applyHeatShield(uncertainData);
  console.log(`Shielded data: "${shieldedData}"`);
  
  // Query heat shield logs
  if (db.initialized) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.db.all('SELECT * FROM heat_shield_logs ORDER BY timestamp DESC LIMIT 1', (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      
      console.log(`Heat shield log entry: ${JSON.stringify(result[0], null, 2)}`);
    } catch (error) {
      console.error('Error querying heat shield logs:', error.message);
    }
  }
}

// Test the handoff process
async function testAgentHandoff(db) {
  console.log('\n🧪 Testing Agent Handoff...');
  
  // Create source and target agents
  const sourceAgent = createSourceAgent('source-agent-1');
  const targetAgent = createTargetAgent('target-agent-1');
  
  console.log('Source agent state:');
  console.log(`  AIc: ${sourceAgent.cognitiveAlignment.aiCognitiveCapabilities}`);
  console.log(`  Buffer: ${sourceAgent.cognitiveAlignment.safetyBuffer}`);
  console.log(`  BMqs: ${sourceAgent.cognitiveAlignment.booleanMindQuantumSpeed}`);
  console.log(`  Pure: ${sourceAgent.quantumState.pure}`);
  
  console.log('\nTarget agent state (before):');
  console.log(`  AIc: ${targetAgent.cognitiveAlignment.aiCognitiveCapabilities}`);
  console.log(`  Buffer: ${targetAgent.cognitiveAlignment.safetyBuffer}`);
  console.log(`  BMqs: ${targetAgent.cognitiveAlignment.booleanMindQuantumSpeed}`);
  console.log(`  Pure: ${targetAgent.quantumState.pure}`);
  
  // Create handoff system
  const handoffSystem = new AgentHandoff(db);
  
  try {
    // Perform the handoff
    const result = await handoffSystem.performHandoff(sourceAgent, targetAgent);
    
    console.log('\nHandoff result:', result);
    
    console.log('\nTarget agent state (after):');
    console.log(`  AIc: ${targetAgent.cognitiveAlignment.aiCognitiveCapabilities}`);
    console.log(`  Buffer: ${targetAgent.cognitiveAlignment.safetyBuffer}`);
    console.log(`  BMqs: ${targetAgent.cognitiveAlignment.booleanMindQuantumSpeed}`);
    console.log(`  Pure: ${targetAgent.quantumState.pure}`);
    
    // Verify the handoff maintained the buffer relationship
    const expectedBMqs = targetAgent.cognitiveAlignment.aiCognitiveCapabilities + 0.1;
    const actualBMqs = targetAgent.cognitiveAlignment.booleanMindQuantumSpeed;
    const drift = Math.abs(expectedBMqs - actualBMqs);
    
    console.log(`\nBuffer drift: ${drift}`);
    console.log(`Buffer integrity maintained: ${drift < 0.00001 ? '✅ YES' : '❌ NO'}`);
    
  } catch (error) {
    console.error('Handoff failed:', error.message);
  }
}

// Test accessibility settings
async function testAccessibilitySettings(db) {
  console.log('\n🧪 Testing Accessibility Settings...');
  
  // Test user settings
  const userId = 'user-123';
  const settings = {
    disabilityType: 'visual',
    adaptationLevel: 1.5,
    communicationStyle: 'detailed',
    timingPreference: 'slower',
    sensoryAccommodation: 'high-contrast'
  };
  
  // Store settings
  await db.storeAccessibilitySettings(userId, settings);
  console.log('Stored accessibility settings');
  
  // Retrieve settings
  const savedSettings = await db.getAccessibilitySettings(userId);
  console.log('Retrieved settings:', savedSettings);
  
  // Update settings
  const updateResult = await db.updateAccessibilitySettings(userId, {
    adaptationLevel: 2.0,
    communicationStyle: 'concise'
  });
  console.log('Updated settings:', updateResult);
  
  // Retrieve updated settings
  const updatedSettings = await db.getAccessibilitySettings(userId);
  console.log('Final settings:', updatedSettings);
}

// Main test function
async function runTests() {
  console.log('🧪 Starting BLF Agent Handoff and Database Tests');
  console.log('=============================================');
  
  // Initialize database
  const db = new SQLiteDatabase(config);
  try {
    await db.initialize();
    console.log('Database initialized successfully');
    
    // Run test cases
    await testBufferRecovery(db);
    await testHeatShield(db);
    await testAccessibilitySettings(db);
    await testAgentHandoff(db);
    
    console.log('\n✅ All tests completed');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    // Close database connection
    if (db.initialized) {
      await db.close();
      console.log('Database connection closed');
    }
  }
}

// Run the tests
runTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
}); 