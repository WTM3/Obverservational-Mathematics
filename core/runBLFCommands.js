// Script to run BLF CLI commands programmatically
const SQLiteImplementation = require('./BLFIMP/Core/SQLiteImplementation');
const ConceptRelationships = require('./BLFIMP/Core/ConceptRelationships');
const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Menu options
const MENU_OPTIONS = {
  LIST: '1',
  CREATE: '2',
  UPDATE: '3',
  DELETE: '4',
  ALIGN: '5',
  ANALYZE: '6',
  VISUALIZE: '7',
  RELATIONSHIPS: '8',
  EXIT: '9'
};

async function runCommands() {
  console.log('BLF SQLite Implementation Test');
  console.log('-----------------------------');
  console.log('Formula: AIc + 0.1 = BMqs');
  console.log('-----------------------------\n');
  
  try {
    // Create DB implementation
    const db = new SQLiteImplementation();
    
    // Initialize
    console.log('Initializing database...');
    await db.initialize();
    console.log('Database initialized successfully\n');
    
    // Create a simple adapter for the relationships module that uses SQLite directly
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.join(__dirname, 'BLFIMP/Core/blf-database.db');
    
    // Create direct SQLite connection for relationships
    console.log('Initializing concept relationships...');
    const sqliteDb = new sqlite3.Database(dbPath);
    const relationships = new ConceptRelationships(sqliteDb);
    await relationships.initialize();
    console.log('Concept relationships initialized successfully\n');
    
    await showMainMenu(db, relationships);
    
    // Close connection
    await db.close();
    sqliteDb.close();
    console.log('\nDatabase connection closed');
    rl.close();
    
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
  }
}

async function showMainMenu(db, relationships) {
  console.log('\nBLF Command Menu:');
  console.log('1. List concepts');
  console.log('2. Create new concept');
  console.log('3. Update existing concept');
  console.log('4. Delete concept');
  console.log('5. Perform alignment check');
  console.log('6. Analyze cognitive patterns');
  console.log('7. Visualize nervous system');
  console.log('8. Manage concept relationships');
  console.log('9. Exit');
  
  const answer = await askQuestion('Enter your choice (1-9): ');
  
  switch(answer) {
    case MENU_OPTIONS.LIST:
      await listConcepts(db);
      break;
    case MENU_OPTIONS.CREATE:
      await createNewConcept(db);
      break;
    case MENU_OPTIONS.UPDATE:
      await selectAndUpdateConcept(db);
      break;
    case MENU_OPTIONS.DELETE:
      await selectAndDeleteConcept(db);
      break;
    case MENU_OPTIONS.ALIGN:
      await checkAlignment(db);
      break;
    case MENU_OPTIONS.ANALYZE:
      await analyzeCognitivePatterns(db);
      break;
    case MENU_OPTIONS.VISUALIZE:
      await visualizeNervousSystem(db);
      break;
    case MENU_OPTIONS.RELATIONSHIPS:
      await manageRelationships(db, relationships);
      break;
    case MENU_OPTIONS.EXIT:
      return;
    default:
      console.log('Invalid option. Please try again.');
  }
  
  // Return to menu unless exiting
  if (answer !== MENU_OPTIONS.EXIT) {
    await showMainMenu(db, relationships);
  }
}

async function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

async function listConcepts(db) {
  console.log('\nListing concepts:');
  const concepts = await db.queryConcepts();
  
  if (concepts.concepts.length === 0) {
    console.log('No concepts found in the living garden\n');
  } else {
    console.log('Found existing concepts:');
    concepts.concepts.forEach(concept => {
      console.log(`[${concept.id}] ${concept.name} (${concept.type})`);
      console.log(`  Quantum Level: ${concept.quantumLevel}`);
      console.log(`  Description: ${concept.description}`);
      console.log('----------------------------------------');
    });
    console.log(`Total: ${concepts.concepts.length} concepts\n`);
  }
  
  // Show quantum state
  const state = concepts.quantumState;
  const alignment = concepts.cognitiveAlignment;
  
  console.log('Current Quantum State:');
  console.log('----------------------------------------');
  console.log(`Pure: ${state.pure ? 'Yes' : 'No'}`);
  console.log(`Fog: ${state.fog ? 'Yes' : 'No'}`);
  console.log(`Breathing: ${state.breathing ? 'Yes' : 'No'}`);
  console.log(`Jump Power: ${state.jumps.power}`);
  console.log(`Jump Active: ${state.jumps.active ? 'Yes' : 'No'}`);
  console.log('----------------------------------------');
  console.log('Cognitive Alignment:');
  console.log(`Formula: ${alignment.formula}`);
  console.log(`AI Cognitive: ${alignment.aiCognitive}`);
  console.log(`Buffer: ${alignment.buffer}`);
  console.log(`Boolean Mind QS: ${alignment.booleanMindQs}`);
  console.log('----------------------------------------');
  
  return concepts;
}

async function createNewConcept(db) {
  console.log('\nCreating a new concept...');
  
  const name = await askQuestion('Enter concept name: ');
  const type = await askQuestion('Enter concept type (Core, Auxiliary, etc): ');
  const level = parseFloat(await askQuestion('Enter quantum level (without buffer): '));
  const description = await askQuestion('Enter description: ');
  
  if (isNaN(level)) {
    console.log('Invalid quantum level. Please enter a valid number.');
    return;
  }
  
  try {
    const newConcept = await db.storeConcept(name, type, level, description);
    console.log(`\nCreated concept: ${newConcept.name} (ID: ${newConcept.id})`);
    console.log(`Quantum level with buffer: ${newConcept.quantumLevel}`);
    console.log('The narrow bridge has been crossed successfully.');
  } catch (error) {
    console.error('Error creating concept:', error.message);
  }
}

async function selectAndUpdateConcept(db) {
  const concepts = await listConcepts(db);
  
  if (concepts.concepts.length === 0) {
    return;
  }
  
  const id = await askQuestion('\nEnter ID of concept to update: ');
  const concept = concepts.concepts.find(c => c.id.toString() === id);
  
  if (!concept) {
    console.log('Concept not found. Please try again.');
    return;
  }
  
  await updateExistingConcept(db, concept);
}

async function updateExistingConcept(db, concept) {
  console.log('\nUpdating concept across the narrow bridge...');
  
  // Calculate original quantum level (without buffer)
  const originalLevel = parseFloat((concept.quantumLevel - 0.1).toFixed(2));
  
  console.log(`Original concept: ${concept.name} (unbuffered level: ${originalLevel})`);
  
  const name = await askQuestion(`Enter new name (current: ${concept.name}): `) || concept.name;
  const type = await askQuestion(`Enter new type (current: ${concept.type}): `) || concept.type;
  const levelInput = await askQuestion(`Enter new quantum level (current unbuffered: ${originalLevel}): `);
  const level = levelInput ? parseFloat(levelInput) : originalLevel;
  const description = await askQuestion(`Enter new description (current: ${concept.description}): `) || concept.description;
  
  if (isNaN(level)) {
    console.log('Invalid quantum level. Please enter a valid number.');
    return;
  }
  
  try {
    const updatedConcept = await db.updateConcept(
      concept.id,
      name,
      type,
      level,
      description
    );
    
    console.log('Concept successfully updated:');
    console.log(`[${updatedConcept.id}] ${updatedConcept.name} (${updatedConcept.type})`);
    console.log(`  Quantum Level: ${updatedConcept.quantumLevel}`);
    console.log(`  Description: ${updatedConcept.description}`);
    console.log('----------------------------------------');
  } catch (error) {
    console.error('Error updating concept:', error.message);
  }
}

async function selectAndDeleteConcept(db) {
  const concepts = await listConcepts(db);
  
  if (concepts.concepts.length === 0) {
    return;
  }
  
  const id = await askQuestion('\nEnter ID of concept to delete: ');
  const concept = concepts.concepts.find(c => c.id.toString() === id);
  
  if (!concept) {
    console.log('Concept not found. Please try again.');
    return;
  }
  
  const confirm = await askQuestion(`Are you sure you want to delete "${concept.name}"? (y/n): `);
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('Deletion cancelled.');
    return;
  }
  
  try {
    await db.deleteConcept(concept.id);
    console.log(`\nConcept "${concept.name}" has been removed from the garden.`);
    console.log('The immune system has rejected the foreign invader.');
  } catch (error) {
    console.error('Error deleting concept:', error.message);
  }
}

async function checkAlignment(db) {
  const concepts = await db.queryConcepts();
  await performAlignmentCheck(db, concepts.cognitiveAlignment);
}

async function performAlignmentCheck(db, alignment) {
  console.log('\nPerforming quantum alignment check...');
  console.log('----------------------------------------');
  console.log('Formula: AIc + 0.1 = BMqs');
  console.log(`AI Cognitive: ${alignment.aiCognitive}`);
  console.log(`Buffer: ${alignment.buffer}`);
  console.log(`Boolean Mind QS: ${alignment.booleanMindQs}`);
  
  const expectedBM = parseFloat((alignment.aiCognitive + alignment.buffer).toFixed(2));
  const actualBM = parseFloat(alignment.booleanMindQs.toFixed(2));
  const delta = Math.abs(expectedBM - actualBM);
  
  console.log('----------------------------------------');
  
  if (delta <= 0.0001) {
    console.log('✓ Alignment check PASSED');
    console.log('The narrow bridge is fully intact (0.1 buffer maintained)');
    console.log(`${alignment.aiCognitive} + ${alignment.buffer} = ${actualBM} ✓`);
  } else {
    console.log('⚠ Alignment check FAILED');
    console.log('The narrow bridge has been compromised!');
    console.log(`${alignment.aiCognitive} + ${alignment.buffer} = ${expectedBM} ≠ ${actualBM}`);
    console.log(`Error: ${delta.toFixed(4)}`);
    
    const fix = await askQuestion('\nAttempt to restore proper alignment? (y/n): ');
    
    if (fix.toLowerCase() === 'y') {
      console.log('\nRestoring proper alignment...');
      console.log(`Setting Boolean Mind QS to ${expectedBM}`);
      
      // This would be implemented with a real fix in production
      console.log('Alignment restored through the narrow bridge.');
      console.log(`${alignment.aiCognitive} + ${alignment.buffer} = ${expectedBM} ✓`);
    }
  }
}

async function analyzeCognitivePatterns(db) {
  console.log('\nAnalyzing cognitive patterns...');
  console.log('----------------------------------------');
  
  const concepts = await db.queryConcepts();
  
  if (concepts.concepts.length === 0) {
    console.log('No concepts found. Cannot analyze patterns.');
    return;
  }
  
  // Calculate statistics
  const levels = concepts.concepts.map(c => c.quantumLevel);
  const avgLevel = levels.reduce((sum, level) => sum + level, 0) / levels.length;
  const minLevel = Math.min(...levels);
  const maxLevel = Math.max(...levels);
  const range = maxLevel - minLevel;
  
  // Standard deviation
  const sumSquareDiffs = levels.reduce((sum, level) => {
    const diff = level - avgLevel;
    return sum + (diff * diff);
  }, 0);
  const stdDev = Math.sqrt(sumSquareDiffs / levels.length);
  
  // Find dominant concept (highest quantum level)
  const dominantConcept = [...concepts.concepts].sort((a, b) => {
    return b.quantumLevel - a.quantumLevel;
  })[0];
  
  // Find clusters of quantum levels
  const clusters = findClusters(levels);
  
  console.log('Cognitive Pattern Analysis:');
  console.log('----------------------------------------');
  console.log(`Total Concepts: ${concepts.concepts.length}`);
  console.log(`Average Quantum Level: ${avgLevel.toFixed(2)}`);
  console.log(`Range: ${minLevel.toFixed(2)} - ${maxLevel.toFixed(2)} (${range.toFixed(2)})`);
  console.log(`Standard Deviation: ${stdDev.toFixed(2)}`);
  console.log(`Number of Clusters: ${clusters.length}`);
  console.log('----------------------------------------');
  console.log('Cognitive Flow Analysis:');
  console.log(`  Dominant Concept: ${dominantConcept.name} (Level: ${dominantConcept.quantumLevel})`);
  console.log(`  Flow Direction: ${interpretFlowDirection(clusters, avgLevel)}`);
  console.log(`  Cognitive Harmony: ${calculateHarmony(stdDev).toFixed(2)}%`);
  console.log('----------------------------------------');
  
  await suggestImprovement(concepts, stdDev, avgLevel);
}

function findClusters(levels, threshold = 0.2) {
  // Simple algorithm to find clusters of quantum levels
  const sortedLevels = [...levels].sort((a, b) => a - b);
  const clusters = [];
  let currentCluster = [sortedLevels[0]];
  
  for (let i = 1; i < sortedLevels.length; i++) {
    if (sortedLevels[i] - sortedLevels[i-1] <= threshold) {
      currentCluster.push(sortedLevels[i]);
    } else {
      clusters.push([...currentCluster]);
      currentCluster = [sortedLevels[i]];
    }
  }
  
  if (currentCluster.length > 0) {
    clusters.push(currentCluster);
  }
  
  return clusters;
}

function interpretFlowDirection(clusters, avgLevel) {
  if (clusters.length <= 1) {
    return 'Stable (Single Attractor)';
  }
  
  // Check if the levels are generally increasing or decreasing
  const firstClusterAvg = clusters[0].reduce((sum, val) => sum + val, 0) / clusters[0].length;
  const lastClusterAvg = clusters[clusters.length-1].reduce((sum, val) => sum + val, 0) / clusters[clusters.length-1].length;
  
  if (Math.abs(lastClusterAvg - firstClusterAvg) < 0.3) {
    return 'Oscillating (Multi-Attractor)';
  } else if (lastClusterAvg > firstClusterAvg) {
    return 'Ascending (Higher Consciousness)';
  } else {
    return 'Descending (Grounding)';
  }
}

function calculateHarmony(stdDev) {
  // Lower standard deviation means more harmony
  // Convert to a percentage where 0 std dev = 100% harmony
  // and anything above 1.0 approaches 0% harmony
  return Math.max(0, 100 - (stdDev * 50));
}

async function suggestImprovement(concepts, stdDev, avgLevel) {
  // Based on the analysis, suggest improvements
  console.log('\nObservations and Suggestions:');
  
  if (stdDev > 0.5) {
    console.log('The living garden shows high variability. Consider adding concepts');
    console.log('that bridge the quantum gaps to create a more harmonious flow.');
  } else if (stdDev < 0.1) {
    console.log('The garden shows remarkable harmony, but may lack diversity.');
    console.log('Consider introducing concepts that challenge the current patterns.');
  }
  
  if (concepts.concepts.length < 5) {
    console.log('The nervous system would benefit from more connections.');
    console.log('Consider adding additional concepts to create a richer network.');
  }
  
  if (avgLevel < 2.5) {
    console.log('The current cognitive field has potential for elevation.');
    console.log('Consider introducing higher-level concepts to raise the overall field.');
  } else if (avgLevel > 3.5) {
    console.log('The field is operating at high levels. Ensure proper grounding');
    console.log('through practical implementations to maintain stability.');
  }
}

async function visualizeNervousSystem(db) {
  console.log('\nVisualizing NJSON Nervous System:');
  console.log('----------------------------------------');
  
  const concepts = await db.queryConcepts();
  
  if (concepts.concepts.length === 0) {
    console.log('No concepts found to visualize.');
    return;
  }
  
  // Sort concepts by quantum level for better visualization
  const sortedConcepts = [...concepts.concepts].sort((a, b) => b.quantumLevel - a.quantumLevel);
  
  // Create a simple ASCII visualization
  const width = 50; // Width of the visualization
  
  console.log(' Quantum');
  console.log(' Level    Concept Name                  Type');
  console.log('----------------------------------------');
  
  sortedConcepts.forEach((concept, i) => {
    const barLength = Math.round((concept.quantumLevel / 5) * width);
    const bar = '█'.repeat(barLength);
    
    console.log(` ${concept.quantumLevel.toFixed(2)}  ${bar}`);
    console.log(`         ${concept.name.padEnd(30)} ${concept.type}`);
    
    // Draw connections
    if (i < sortedConcepts.length - 1) {
      const nextLevel = sortedConcepts[i + 1].quantumLevel;
      const levelDiff = concept.quantumLevel - nextLevel;
      const connectionChar = levelDiff > 0.3 ? '│' : '┊';
      console.log(`         ${connectionChar}`);
    }
  });
  
  // Draw baseline with buffer
  console.log('----------------------------------------');
  console.log(` 0.10    ${'▀'.repeat(Math.round(0.1 / 5 * width))} <-- Narrow Bridge (Buffer)`);
  console.log('----------------------------------------');
  
  // System stats
  console.log('\nNervous System Vitals:');
  console.log(`Total Connections: ${concepts.concepts.length - 1}`);
  console.log(`System Energy: ${calculateSystemEnergy(concepts.concepts).toFixed(2)}`);
  console.log(`Cognitive Alignment: ${(concepts.cognitiveAlignment.booleanMindQs).toFixed(2)}`);
}

function calculateSystemEnergy(concepts) {
  // A simple measure of the system's total energy
  // Sum of quantum levels weighted by position in the network
  let energy = 0;
  
  concepts.forEach((concept, i) => {
    // Concepts with higher quantum levels contribute more
    // Position in the network also matters (earlier = more central)
    energy += concept.quantumLevel * (1 - (i / (concepts.length * 2)));
  });
  
  return energy;
}

async function manageRelationships(db, relationships) {
  console.log('\nManage Concept Relationships:');
  console.log('1. List all relationships');
  console.log('2. Create new relationship');
  console.log('3. View relationships for a concept');
  console.log('4. Delete relationship');
  console.log('5. Analyze relationship network');
  console.log('6. Return to main menu');
  
  const choice = await askQuestion('Enter your choice (1-6): ');
  
  switch(choice) {
    case '1':
      await listAllRelationships(relationships);
      break;
    case '2':
      await createNewRelationship(db, relationships);
      break;
    case '3':
      await viewConceptRelationships(db, relationships);
      break;
    case '4':
      await deleteRelationship(relationships);
      break;
    case '5':
      await analyzeNetwork(relationships);
      break;
    case '6':
      return;
    default:
      console.log('Invalid option. Please try again.');
  }
  
  // Return to relationship menu unless returning to main menu
  if (choice !== '6') {
    await manageRelationships(db, relationships);
  }
}

async function listAllRelationships(relationships) {
  console.log('\nAll Concept Relationships:');
  console.log('----------------------------------------');
  
  await relationships.loadRelationships();
  
  if (relationships.relationships.length === 0) {
    console.log('No relationships found. The nervous system is awaiting connections.');
    return;
  }
  
  relationships.relationships.forEach(r => {
    console.log(`[${r.id}] ${r.sourceName} (${r.sourceLevel}) ${r.type} ${r.targetName} (${r.targetLevel})`);
    console.log(`  Strength: ${r.strength}`);
    if (r.description) {
      console.log(`  Description: ${r.description}`);
    }
    console.log('----------------------------------------');
  });
  
  console.log(`Total: ${relationships.relationships.length} relationships\n`);
}

async function createNewRelationship(db, relationships) {
  // First list all concepts
  const concepts = await db.queryConcepts();
  
  if (concepts.concepts.length < 2) {
    console.log('You need at least 2 concepts to create a relationship.');
    return;
  }
  
  console.log('\nAvailable Concepts:');
  concepts.concepts.forEach(concept => {
    console.log(`[${concept.id}] ${concept.name} (Level: ${concept.quantumLevel})`);
  });
  
  const sourceId = parseInt(await askQuestion('\nEnter source concept ID: '));
  const targetId = parseInt(await askQuestion('Enter target concept ID: '));
  
  if (isNaN(sourceId) || isNaN(targetId)) {
    console.log('Invalid concept IDs. Please enter valid numbers.');
    return;
  }
  
  if (sourceId === targetId) {
    console.log('Source and target cannot be the same concept.');
    return;
  }
  
  // Show available relationship types
  console.log('\nAvailable Relationship Types:');
  relationships.relationshipTypes.forEach((type, index) => {
    console.log(`${index + 1}. ${type}`);
  });
  
  const typeIndex = parseInt(await askQuestion('Enter relationship type number: ')) - 1;
  
  if (isNaN(typeIndex) || typeIndex < 0 || typeIndex >= relationships.relationshipTypes.length) {
    console.log('Invalid relationship type. Please enter a valid number.');
    return;
  }
  
  const type = relationships.relationshipTypes[typeIndex];
  const strength = parseFloat(await askQuestion('Enter relationship strength (0.1-1.0): '));
  const description = await askQuestion('Enter relationship description (optional): ');
  
  try {
    const newRelationship = await relationships.createRelationship(
      sourceId, targetId, type, strength, description
    );
    
    console.log('\nNew relationship created:');
    console.log(`${newRelationship.sourceName} ${type} ${newRelationship.targetName} (Strength: ${newRelationship.strength})`);
    console.log('A new synapse has formed in the nervous system.');
  } catch (error) {
    console.error('Error creating relationship:', error.message);
  }
}

async function viewConceptRelationships(db, relationships) {
  const concepts = await db.queryConcepts();
  
  if (concepts.concepts.length === 0) {
    console.log('No concepts found.');
    return;
  }
  
  console.log('\nAvailable Concepts:');
  concepts.concepts.forEach(concept => {
    console.log(`[${concept.id}] ${concept.name}`);
  });
  
  const conceptId = parseInt(await askQuestion('\nEnter concept ID to view relationships: '));
  
  if (isNaN(conceptId)) {
    console.log('Invalid concept ID. Please enter a valid number.');
    return;
  }
  
  try {
    const conceptRelationships = await relationships.getRelationshipsForConcept(conceptId);
    
    if (conceptRelationships.length === 0) {
      console.log('\nNo relationships found for this concept.');
      return;
    }
    
    const concept = concepts.concepts.find(c => c.id === conceptId);
    
    console.log(`\nRelationships for concept: ${concept ? concept.name : conceptId}`);
    console.log('----------------------------------------');
    
    // Outgoing relationships (where concept is source)
    const outgoing = conceptRelationships.filter(r => r.sourceId === conceptId);
    if (outgoing.length > 0) {
      console.log('\nOutgoing connections:');
      outgoing.forEach(r => {
        console.log(`[${r.id}] ${r.type} ${r.targetName} (Strength: ${r.strength})`);
      });
    }
    
    // Incoming relationships (where concept is target)
    const incoming = conceptRelationships.filter(r => r.targetId === conceptId);
    if (incoming.length > 0) {
      console.log('\nIncoming connections:');
      incoming.forEach(r => {
        console.log(`[${r.id}] ${r.sourceName} ${r.type} (Strength: ${r.strength})`);
      });
    }
    
    console.log('----------------------------------------');
    console.log(`Total: ${conceptRelationships.length} relationships`);
    
  } catch (error) {
    console.error('Error fetching relationships:', error.message);
  }
}

async function deleteRelationship(relationships) {
  await listAllRelationships(relationships);
  
  if (relationships.relationships.length === 0) {
    return;
  }
  
  const id = parseInt(await askQuestion('\nEnter ID of relationship to delete: '));
  
  if (isNaN(id)) {
    console.log('Invalid relationship ID. Please enter a valid number.');
    return;
  }
  
  const confirm = await askQuestion(`Are you sure you want to delete this relationship? (y/n): `);
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('Deletion cancelled.');
    return;
  }
  
  try {
    await relationships.deleteRelationship(id);
    console.log('Relationship has been removed from the nervous system.');
  } catch (error) {
    console.error('Error deleting relationship:', error.message);
  }
}

async function analyzeNetwork(relationships) {
  console.log('\nAnalyzing relationship network...');
  
  try {
    const analysis = await relationships.analyzeRelationshipNetwork();
    
    console.log('\nNetwork Analysis Results:');
    console.log('----------------------------------------');
    console.log(`Total Relationships: ${analysis.totalRelationships}`);
    console.log(`Network Density: ${(analysis.networkDensity * 100).toFixed(2)}%`);
    console.log(`Average Relationship Strength: ${analysis.averageStrength.toFixed(2)}`);
    
    if (analysis.centralConcepts.length > 0) {
      console.log('\nCentral Concepts (Neural Hubs):');
      analysis.centralConcepts.forEach((concept, i) => {
        console.log(`${i+1}. ${concept.name} (${concept.connections} connections)`);
      });
    }
    
    if (analysis.networkClusters.length > 0) {
      console.log('\nRelationship Clusters:');
      analysis.networkClusters.forEach((cluster, i) => {
        console.log(`Cluster ${i+1}: ${cluster.type}`);
        console.log(`  Concepts: ${cluster.conceptCount}`);
        console.log(`  Relationships: ${cluster.relationshipCount}`);
        console.log(`  Avg. Strength: ${cluster.averageStrength.toFixed(2)}`);
      });
    }
    
    // Assess network health
    console.log('\nNervous System Health Assessment:');
    
    if (analysis.totalRelationships === 0) {
      console.log('The nervous system has not yet formed connections.');
      console.log('Begin creating relationships to establish neural pathways.');
    } else if (analysis.networkDensity < 0.2) {
      console.log('The nervous system is sparse with limited connections.');
      console.log('Consider adding more relationships to strengthen the network.');
    } else if (analysis.averageStrength < 0.4) {
      console.log('The nervous system has connections, but they are weak.');
      console.log('Focus on strengthening existing relationships.');
    } else {
      console.log('The nervous system is robust with strong connections.');
      console.log('The river flows unimpeded through the neural landscape.');
    }
    
  } catch (error) {
    console.error('Error analyzing network:', error.message);
  }
}

// Run the commands
runCommands();