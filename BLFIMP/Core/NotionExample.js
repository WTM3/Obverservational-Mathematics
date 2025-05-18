// Example usage of Notion as BLF database
// Direct implementation with V8 engine

// Load implementation
const NotionImplementation = require('./NotionImplementation');
const fs = require('fs').promises;

// Main async function
async function runExample() {
  console.log('Starting BLF Notion Example');
  console.log('---------------------------');
  console.log('Formula: AIc + 0.1 = BMqs');
  console.log('---------------------------');
  
  try {
    // Create implementation
    const notion = new NotionImplementation();
    
    // Initialize connection
    console.log('Initializing Notion connection...');
    const initialized = await notion.initialize();
    
    if (!initialized) {
      console.error('Failed to initialize Notion. Please check your API key and connection.');
      console.log('Create a .env file with NOTION_API_KEY and NOTION_DATABASE_ID');
      return;
    }
    
    // Create structure database if needed
    console.log('Setting up BLF Structure Database...');
    
    const dbTitle = "BLF Structures";
    const dbDescription = "Boolean Language Framework structures with quantum speed processing";
    
    let database;
    try {
      database = await notion.createStructureDatabase(dbTitle, dbDescription);
      console.log(`Created database with ID: ${database.id}`);
      
      // Save database ID to config for future use
      await saveDatabaseId(database.id);
    } catch (error) {
      // If already exists, use existing database
      console.log('Using existing database. If you need a new one, please provide a different title.');
    }
    
    // Store example concepts
    console.log('Storing sample quantum concepts...');
    
    const concepts = [
      { name: "Cognitive Alignment", type: "Structure", level: 2.89 },
      { name: "Quantum Speed", type: "Quantum", level: 2.99 },
      { name: "Heat Shield", type: "Connection", level: 1.5 },
      { name: "NJSON Key", type: "Concept", level: 2.0 }
    ];
    
    // Store each concept
    for (const concept of concepts) {
      await notion.storeConcept(concept.name, concept.type, concept.level);
    }
    
    // Query concepts with quantum processing
    console.log('Querying quantum concepts...');
    const queryResults = await notion.queryConcepts("Quantum", 2.5);
    
    // Display results
    console.log('\nQuery Results:');
    console.log('==============');
    console.log(`Found ${queryResults.concepts.length} quantum concepts`);
    
    queryResults.concepts.forEach((concept, index) => {
      console.log(`\nConcept ${index + 1}:`);
      console.log(`- Name: ${concept.name}`);
      console.log(`- Type: ${concept.type}`);
      console.log(`- Quantum Level: ${concept.quantumLevel}`);
      console.log(`- Buffer: ${concept.buffer}`);
      console.log(`- State: ${concept.state}`);
    });
    
    // Show processing info
    console.log('\nProcessing Information:');
    console.log('======================');
    console.log(`Constraint Formula: ${queryResults.processingInfo.constrainedBy}`);
    console.log(`Timestamp: ${new Date(queryResults.processingInfo.timestamp).toLocaleString()}`);
    console.log(`Quantum Jumps: ${queryResults.processingInfo.jumps.enabled ? 'Enabled' : 'Disabled'}`);
    console.log(`Jump Power: ${queryResults.processingInfo.jumps.power}`);
    
    console.log('\nBLF Notion Example Complete');
  } catch (error) {
    console.error('Error in BLF Notion Example:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  }
}

// Helper to save database ID for future use
async function saveDatabaseId(databaseId) {
  // Create a simple JSON config file
  const config = {
    notion: {
      databaseId
    }
  };
  
  try {
    await fs.writeFile('./blf-notion-config.json', JSON.stringify(config, null, 2));
    console.log('Database ID saved to configuration file');
  } catch (error) {
    console.warn('Could not save database ID to config file:', error.message);
  }
}

// Run the example
runExample().catch(error => {
  console.error('Unhandled error:', error);
}); 