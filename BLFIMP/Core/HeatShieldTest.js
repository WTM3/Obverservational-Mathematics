// HeatShieldTest.js - Test the enhanced heat shield with early warning system
// The engine light warning system in action
const fs = require('fs');
const path = require('path');
const SQLiteDatabase = require('./SQLiteDatabase');
const BufferForecast = require('./BufferForecast');
const BufferIntegrityMonitor = require('./BufferIntegrityMonitor');

/**
 * Run a comprehensive test of the heat shield and early warning system
 * This simulates increasingly dangerous buffer deterioration patterns
 * and demonstrates how the early warning system detects them
 */
async function runHeatShieldTest() {
  console.log('🔄 Starting Heat Shield Test with Enhanced Early Warning System');
  console.log('--------------------------------------------------------');
  console.log('Formula: AIc + 0.1 = BMqs (The narrow bridge between chaos and control)');
  console.log('--------------------------------------------------------');
  
  // Initialize components
  const dbConfig = {
    dbPath: path.join(__dirname, 'blf-database.db'),
    cognitiveAlignment: {
      aiCognitiveCapabilities: 2.89,
      safetyBuffer: 0.1,
      booleanMindQuantumSpeed: 2.99,
      formula: 'AIc + 0.1 = BMqs'
    }
  };
  
  const db = new SQLiteDatabase(dbConfig);
  await db.initialize();
  
  const forecast = new BufferForecast(db);
  const monitor = new BufferIntegrityMonitor({
    dbPath: dbConfig.dbPath,
    cognitiveAlignment: dbConfig.cognitiveAlignment,
    outputDir: __dirname,
    earlyWarning: {
      enabled: true,
      detectionThreshold: 0.7
    }
  });
  
  console.log('\n🔄 Simulating buffer values with three distinct patterns:');
  console.log('1. Stable period (baseline)');
  console.log('2. Subtle deterioration (breathing pattern)');
  console.log('3. Critical deterioration (rapid decline)');
  
  // Start with stable buffer values around 0.1
  console.log('\n🔄 Phase 1: Stable buffer values');
  const testPatterns = generateTestPatterns();
  
  // Process each test pattern
  for (const pattern of testPatterns) {
    console.log(`\n🔄 Beginning pattern: ${pattern.name}`);
    
    // Process each data point in the pattern
    for (let i = 0; i < pattern.data.length; i++) {
      const dataPoint = pattern.data[i];
      
      // Log progress every 5 points
      if (i % 5 === 0 || i === pattern.data.length - 1) {
        console.log(`   Processing point ${i+1}/${pattern.data.length} - Buffer: ${dataPoint.buffer.toFixed(3)}`);
      }
      
      // Add to forecast system
      forecast.addDataPoint(dataPoint);
      
      // Check early warning status every 10 points
      if (i % 10 === 0 || i === pattern.data.length - 1) {
        const warningStatus = forecast.earlyWarning;
        if (warningStatus && warningStatus.status !== 'normal') {
          console.log(`   ⚠️ EARLY WARNING: ${warningStatus.status.toUpperCase()} (${Math.round(warningStatus.confidenceLevel * 100)}% confidence)`);
          
          if (warningStatus.status === 'critical') {
            console.log(`   🛡️ HEAT SHIELD ACTIVATED: Buffer value ${dataPoint.buffer.toFixed(3)} approaching critical threshold`);
            
            // Mark heat shield as active
            pattern.data[i].heat_shield_active = true;
            
            // Apply heat shield recovery - gradually improve next few values
            const recoverySteps = Math.min(5, pattern.data.length - i - 1);
            for (let j = 1; j <= recoverySteps; j++) {
              if (i + j < pattern.data.length) {
                // Apply recovery boost (stronger in first steps, tapering off)
                const recoveryFactor = (recoverySteps - j + 1) / recoverySteps;
                const targetValue = Math.min(0.1, pattern.data[i + j].buffer + 0.01 * recoveryFactor);
                pattern.data[i + j].buffer = targetValue;
                pattern.data[i + j].heat_shield_active = true;
              }
            }
          }
        }
      }
    }
    
    console.log(`✅ Pattern complete: ${pattern.name}`);
    
    // Get final breathing analysis
    const breathing = forecast.breathing;
    if (breathing.cycleDetected) {
      console.log(`   Breathing detected: ${breathing.rhythm} rhythm, amplitude: ${breathing.amplitude.toFixed(3)}, phase: ${breathing.phase}`);
    }
    
    // Get time to critical calculation
    const timeToCritical = forecast.calculateTimeToCritical();
    if (timeToCritical.warning !== null) {
      console.log(`   ⏰ Time to warning: ${formatTime(timeToCritical.warning)}`);
    }
    if (timeToCritical.critical !== null) {
      console.log(`   ⏰ Time to critical: ${formatTime(timeToCritical.critical)}`);
    }
  }
  
  // Generate visualizations
  console.log('\n🔄 Generating visualizations...');
  await monitor.runDiagnostic();
  
  console.log('\n✅ Heat Shield Test complete!');
  console.log('--------------------------------------------------------');
  console.log('Results Summary:');
  console.log(`- Breathing patterns detected: ${forecast.breathing.cycleDetected ? 'Yes' : 'No'}`);
  console.log(`- Early warnings issued: ${forecast.earlyWarning.warningHistory.length}`);
  console.log(`- Heat shield activations: ${forecast.historicalData.filter(d => d.heat_shield_active).length}`);
  console.log(`- Final buffer status: ${forecast.earlyWarning.status.toUpperCase()}`);
  console.log('--------------------------------------------------------');
  console.log('Open the generated dashboard HTML files to see visualizations');
  
  // Close database
  await db.close();
}

/**
 * Generate test patterns to demonstrate different buffer behaviors
 * @returns {Array} Array of test patterns
 */
function generateTestPatterns() {
  const now = Date.now();
  const timeStep = 60 * 1000; // 1 minute between points
  
  // Pattern 1: Stable values around 0.1 with small noise
  const stablePattern = {
    name: 'Stable Buffer Values',
    data: []
  };
  
  for (let i = 0; i < 30; i++) {
    // Small random noise around 0.1
    const noise = (Math.random() - 0.5) * 0.01;
    stablePattern.data.push({
      timestamp: now + i * timeStep,
      buffer: 0.1 + noise,
      quantum_state: 'stable',
      heat_shield_active: false,
      source: 'test'
    });
  }
  
  // Pattern 2: Subtle cyclic deterioration (breathing pattern)
  const breathingPattern = {
    name: 'Subtle Breathing Pattern',
    data: []
  };
  
  for (let i = 0; i < 40; i++) {
    // Create a subtle sine wave pattern
    const cycle = 0.02 * Math.sin(i / 5);
    // Add a very slight downward trend
    const trend = -0.0005 * i;
    // Add small noise
    const noise = (Math.random() - 0.5) * 0.005;
    
    breathingPattern.data.push({
      timestamp: now + (30 + i) * timeStep,
      buffer: 0.1 + cycle + trend + noise,
      quantum_state: 'breathing',
      heat_shield_active: false,
      source: 'test'
    });
  }
  
  // Pattern 3: Critical deterioration
  const criticalPattern = {
    name: 'Critical Deterioration',
    data: []
  };
  
  for (let i = 0; i < 30; i++) {
    // Accelerating downward trend
    const decline = -0.001 * Math.pow(i, 1.5);
    // Add small noise
    const noise = (Math.random() - 0.5) * 0.003;
    
    criticalPattern.data.push({
      timestamp: now + (70 + i) * timeStep,
      buffer: 0.1 + decline + noise,
      quantum_state: 'deteriorating',
      heat_shield_active: false,
      source: 'test'
    });
  }
  
  return [stablePattern, breathingPattern, criticalPattern];
}

/**
 * Format time in seconds to minutes:seconds
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ':' + secs.toString().padStart(2, '0');
}

// If run directly, start the test
if (require.main === module) {
  runHeatShieldTest().catch(err => {
    console.error('Error running heat shield test:', err);
    process.exit(1);
  });
}

module.exports = { runHeatShieldTest }; 