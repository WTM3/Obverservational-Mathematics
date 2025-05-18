// Example of using the SQLite Visualizer
// Observing the river without disturbing its flow

const SQLiteVisualizer = require('./SQLiteVisualizer');
const path = require('path');

// Main example function
async function runExample() {
  console.log('BLF SQLite Visualizer Example');
  console.log('----------------------------');
  console.log('Formula: AIc + 0.1 = BMqs');
  console.log('----------------------------');
  
  try {
    // Create visualizer
    const visualizer = new SQLiteVisualizer();
    
    // Initialize it
    console.log('Initializing visualizer...');
    await visualizer.initialize();
    
    // First, ensure we have some data to visualize
    // by populating the database with sample data
    await createSampleData(visualizer.db);
    
    // Generate network visualization
    console.log('\nGenerating network visualization...');
    const networkPath = path.join(__dirname, 'blf-network.html');
    await visualizer.generateNetworkVisualization(networkPath);
    
    // Generate quantum state visualization
    console.log('\nGenerating quantum state visualization...');
    const quantumPath = path.join(__dirname, 'blf-quantum.html');
    await visualizer.generateQuantumStateVisualization(quantumPath);
    
    // Generate cognitive alignment visualization
    console.log('\nGenerating cognitive alignment visualization...');
    const alignmentPath = path.join(__dirname, 'blf-alignment.html');
    await visualizer.generateAlignmentVisualization(alignmentPath);
    
    // Close the database connection
    await visualizer.close();
    
    console.log('\nVisualization complete!');
    console.log('Open the following files in your web browser:');
    console.log(`1. ${networkPath}`);
    console.log(`2. ${quantumPath}`);
    console.log(`3. ${alignmentPath}`);
    
  } catch (error) {
    console.error('Error running visualizer example:', error.message);
  }
}

// Create sample data for visualization
async function createSampleData(db) {
  console.log('\nChecking for existing data...');
  
  // Query for existing concepts
  const existingData = await db.queryConcepts();
  
  if (existingData.concepts.length > 0) {
    console.log(`Found ${existingData.concepts.length} existing concepts, using those.`);
    return;
  }
  
  console.log('No existing data found. Creating sample data...');
  
  // Sample concepts with varying quantum levels
  const concepts = [
    { name: 'Boolean Mind', type: 'Core', level: 2.99, desc: 'The central cognitive construct for boolean operations' },
    { name: 'Quantum State', type: 'System', level: 2.8, desc: 'The state of quantum processing in the BLF system' },
    { name: 'NJSON', type: 'Core', level: 2.95, desc: 'Nervous system connecting mind and body' },
    { name: 'Heat Shield', type: 'System', level: 2.9, desc: 'Immune system rejecting foreign invaders' },
    { name: 'Buffer', type: 'Core', level: 2.99, desc: 'The narrow bridge between chaos and control' },
    { name: 'Cognitive Alignment', type: 'Concept', level: 2.75, desc: 'Alignment between AI capability and boolean mind QS' },
    { name: 'Pure State', type: 'State', level: 2.4, desc: 'Uncontaminated quantum state' },
    { name: 'V8 Engine', type: 'Process', level: 2.6, desc: 'Processor for quantum jumps' },
    { name: 'Breathing', type: 'Process', level: 2.3, desc: 'Direct breathing mechanism for quantum states' },
    { name: 'Formula', type: 'Concept', level: 3.0, desc: 'AIc + 0.1 = BMqs - the fundamental formula of BLF' }
  ];
  
  // Create concepts
  const createdConcepts = [];
  
  for (const concept of concepts) {
    const result = await db.storeConcept(
      concept.name,
      concept.type,
      concept.level,
      concept.desc
    );
    
    createdConcepts.push(result);
    console.log(`Created concept: ${result.name}`);
  }
  
  console.log(`\nCreated ${createdConcepts.length} concepts.`);
  
  // Create connections between concepts
  const connections = [
    { from: 0, to: 4, strength: 0.9, desc: 'Buffer is essential to Boolean Mind' },
    { from: 0, to: 2, strength: 0.95, desc: 'NJSON connects with Boolean Mind' },
    { from: 0, to: 5, strength: 0.85, desc: 'Boolean Mind requires Cognitive Alignment' },
    { from: 1, to: 6, strength: 0.7, desc: 'Quantum State can be Pure' },
    { from: 1, to: 8, strength: 0.6, desc: 'Quantum State requires Breathing' },
    { from: 2, to: 3, strength: 0.8, desc: 'NJSON implements Heat Shield' },
    { from: 3, to: 4, strength: 0.75, desc: 'Heat Shield maintains Buffer' },
    { from: 4, to: 5, strength: 0.9, desc: 'Buffer enables Cognitive Alignment' },
    { from: 5, to: 9, strength: 1.0, desc: 'Cognitive Alignment defined by Formula' },
    { from: 7, to: 8, strength: 0.65, desc: 'V8 Engine powers Breathing' },
    { from: 7, to: 1, strength: 0.7, desc: 'V8 Engine processes Quantum State' }
  ];
  
  // Create each connection
  for (const conn of connections) {
    const fromId = createdConcepts[conn.from].id;
    const toId = createdConcepts[conn.to].id;
    
    await db.createConnection(
      fromId,
      toId,
      conn.strength,
      conn.desc
    );
    
    console.log(`Created connection: ${createdConcepts[conn.from].name} -> ${createdConcepts[conn.to].name}`);
  }
  
  console.log(`\nCreated ${connections.length} connections.`);
}

// Run the example
runExample(); 