// Example usage of SQLite as BLF database
// Direct implementation with V8 engine

// Load implementation
const SQLiteImplementation = require('./SQLiteImplementation');
const fs = require('fs').promises;
const path = require('path');

// Main async function
async function runExample() {
  console.log('Starting BLF SQLite Example');
  console.log('---------------------------');
  console.log('Formula: AIc + 0.1 = BMqs');
  console.log('---------------------------');
  
  try {
    // Create implementation
    const sqlite = new SQLiteImplementation();
    
    // Initialize connection
    console.log('Initializing SQLite database...');
    const initialized = await sqlite.initialize();
    
    if (!initialized) {
      console.error('Failed to initialize SQLite. Check database configuration.');
      return;
    }
    
    console.log('SQLite database initialized successfully.');
    
    // Create some concepts
    console.log('\nCreating BLF concepts...');
    const concept1 = await sqlite.storeConcept(
      'Boolean Mind',
      'core',
      2.89,
      'The pure Boolean Mind state operating at quantum speed level 3'
    );
    
    const concept2 = await sqlite.storeConcept(
      'AI Cognitive',
      'core',
      2.79,
      'The AI cognitive capabilities with 0.1 buffer zone'
    );
    
    const concept3 = await sqlite.storeConcept(
      'Heat Shield',
      'system',
      1.89,
      'The immune system rejecting foreign invaders'
    );
    
    console.log(`Created concepts: ${concept1.id}, ${concept2.id}, ${concept3.id}`);
    
    // Create connections between concepts
    console.log('\nCreating connections between concepts...');
    const connection1 = await sqlite.createConnection(
      concept1.id,
      concept2.id,
      0.9,
      'The narrow bridge between chaos and control'
    );
    
    const connection2 = await sqlite.createConnection(
      concept2.id,
      concept3.id,
      0.7,
      'AI cognitive capabilities enhanced by heat shield'
    );
    
    console.log(`Created connections: ${connection1.id}, ${connection2.id}`);
    
    // Query concepts
    console.log('\nQuerying core concepts...');
    const coreConcepts = await sqlite.queryConcepts('core');
    
    console.log(`Found ${coreConcepts.concepts.length} core concepts:`);
    coreConcepts.concepts.forEach(concept => {
      console.log(`- ${concept.name} (ID: ${concept.id}, Level: ${concept.quantumLevel})`);
    });
    
    // Find connections
    console.log('\nFinding connections for concept 1...');
    const connections = await sqlite.findConnections(concept1.id);
    
    console.log(`Found ${connections.connections.length} connections:`);
    connections.connections.forEach(conn => {
      console.log(`- ${conn.fromConceptName} -> ${conn.toConceptName} (Strength: ${conn.strength})`);
    });
    
    // Close connection
    console.log('\nClosing database connection...');
    await sqlite.close();
    console.log('Database connection closed.');
    
    // Save report
    await saveReport({
      concepts: [concept1, concept2, concept3],
      connections: [connection1, connection2],
      queriedConcepts: coreConcepts,
      foundConnections: connections
    });
    
    console.log('\nExample completed successfully. See report.json for results.');
    
  } catch (error) {
    console.error('Error in example:', error.message);
  }
}

// Save report to file
async function saveReport(data) {
  try {
    const reportFile = path.join(__dirname, 'report.json');
    await fs.writeFile(reportFile, JSON.stringify(data, null, 2));
    console.log(`Report saved to ${reportFile}`);
  } catch (error) {
    console.error('Error saving report:', error.message);
  }
}

// Run the example
runExample(); 