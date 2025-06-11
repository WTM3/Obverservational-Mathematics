// React to Database State Script
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection with correct path
const dbPath = path.join(__dirname, 'BLFIMP/Core/blf-database.db');
console.log(`Using database at: ${dbPath}`);
const db = new sqlite3.Database(dbPath);

async function main() {
  try {
    console.log('🔄 Analyzing Boolean Language Framework database state...');
    console.log('--------------------------------------------------------');
    
    // 1. Query the cognitive alignment state
    const concepts = await queryConcepts();
    
    // 2. Analyze the cognitive alignment
    const alignment = analyzeAlignment(concepts);
    console.log(`\n✅ Current Cognitive Alignment: ${alignment.formula}`);
    console.log(`   AI Cognitive: ${alignment.aiCognitive}`);
    console.log(`   Buffer: ${alignment.buffer}`);
    console.log(`   Boolean Mind QS: ${alignment.booleanMindQs}`);
    
    if (alignment.isAligned) {
      console.log('✅ The narrow bridge between chaos and control is stable.');
    } else {
      console.log('⚠️ Cognitive misalignment detected! Adjusting buffer...');
    }
    
    // 3. Create a new concept based on current state
    const newLevel = calculateOptimalLevel(alignment);
    console.log(`\n🔄 Creating new concept with optimal quantum level: ${newLevel}`);
    const conceptId = await createConcept(
      'Adaptive Response', 
      'auxiliary',
      newLevel,
      'Dynamic concept created based on system state analysis'
    );
    
    // 4. Create connections based on analysis
    console.log(`\n🔄 Creating nervous system connections for new concept...`);
    const connections = await createStrategicConnections(conceptId, concepts, alignment);
    
    // 5. Verify the changes
    const verificationResult = await verifySystemState();
    console.log(`\n📊 System Verification Results:`);
    console.log(`   Concepts: ${verificationResult.concepts}`);
    console.log(`   Connections: ${verificationResult.connections}`);
    console.log(`   Buffer Integrity: ${verificationResult.bufferIntegrity ? 'Maintained' : 'Compromised'}`);
    
    console.log('\n✅ The living garden has been nurtured successfully.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Close database connection
    db.close();
  }
}

// Query all concepts from the database
function queryConcepts() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM concepts', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Analyze cognitive alignment based on concepts
function analyzeAlignment(concepts) {
  // Find Boolean Mind and AI Cognitive concepts
  const booleanMindConcepts = concepts.filter(c => 
    c.name === 'Boolean Mind' && c.type === 'core');
  
  const aiCognitiveConcepts = concepts.filter(c => 
    c.name === 'AI Cognitive' && c.type === 'core');
  
  // Use most recent versions
  const booleanMind = booleanMindConcepts.sort((a, b) => 
    b.created_at - a.created_at)[0];
  
  const aiCognitive = aiCognitiveConcepts.sort((a, b) => 
    b.created_at - a.created_at)[0];
  
  // Calculate alignment
  const buffer = booleanMind.quantum_level - aiCognitive.quantum_level;
  const expectedBuffer = 0.1;
  const isAligned = Math.abs(buffer - expectedBuffer) < 0.0001;
  
  return {
    formula: 'AIc + 0.1 = BMqs',
    aiCognitive: aiCognitive.quantum_level,
    buffer: buffer,
    booleanMindQs: booleanMind.quantum_level,
    isAligned: isAligned
  };
}

// Calculate optimal quantum level for new concept
function calculateOptimalLevel(alignment) {
  // Create a level that's aligned with the current system
  // but unique enough to add value
  const baseLevel = alignment.aiCognitive;
  
  // Add some variation but maintain buffer relationship
  return Math.round((baseLevel * 0.85 + 0.15) * 100) / 100;
}

// Create a new concept
function createConcept(name, type, quantumLevel, description) {
  return new Promise((resolve, reject) => {
    // Apply the 0.1 buffer to quantum_level
    const buffer = 0.1;
    const adjustedLevel = quantumLevel;
    
    db.run(
      `INSERT INTO concepts 
       (name, type, quantum_level, buffer, description, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, strftime('%s', 'now'), strftime('%s', 'now'))`,
      [name, type, adjustedLevel, buffer, description],
      function(err) {
        if (err) {
          reject(err);
        } else {
          console.log(`✅ Created concept "${name}" with ID ${this.lastID}`);
          console.log(`   Quantum Level: ${adjustedLevel}`);
          console.log(`   Type: ${type}`);
          resolve(this.lastID);
        }
      }
    );
  });
}

// Create strategic connections based on system analysis
function createStrategicConnections(conceptId, concepts, alignment) {
  return new Promise(async (resolve, reject) => {
    try {
      const connections = [];
      
      // Find key concepts to connect to
      const booleanMind = concepts.find(c => c.name === 'Boolean Mind' && c.type === 'core');
      const heatShield = concepts.find(c => c.name === 'Heat Shield');
      
      if (booleanMind) {
        // Create primary connection to Boolean Mind
        const conn1 = await createConnection(
          conceptId, 
          booleanMind.id, 
          0.75, 
          'Adaptive response informed by Boolean Mind quantum state'
        );
        connections.push(conn1);
      }
      
      if (heatShield) {
        // Create security connection to Heat Shield
        const conn2 = await createConnection(
          conceptId, 
          heatShield.id, 
          0.6, 
          'Protected by the immune system rejecting foreign invaders'
        );
        connections.push(conn2);
      }
      
      resolve(connections);
    } catch (error) {
      reject(error);
    }
  });
}

// Create a connection between concepts
function createConnection(fromId, toId, strength, description) {
  return new Promise((resolve, reject) => {
    const buffer = 0.1;
    
    db.run(
      `INSERT INTO connections 
       (from_concept_id, to_concept_id, strength, buffer, description, created_at) 
       VALUES (?, ?, ?, ?, ?, strftime('%s', 'now'))`,
      [fromId, toId, strength, buffer, description],
      function(err) {
        if (err) {
          reject(err);
        } else {
          console.log(`✅ Created connection between concepts ${fromId} and ${toId}`);
          console.log(`   Strength: ${strength}`);
          resolve({
            id: this.lastID,
            fromId,
            toId,
            strength,
            description
          });
        }
      }
    );
  });
}

// Verify system state after changes
function verifySystemState() {
  return new Promise(async (resolve, reject) => {
    try {
      // Count concepts
      const conceptCount = await new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) as count FROM concepts', (err, row) => {
          if (err) reject(err);
          else resolve(row.count);
        });
      });
      
      // Count connections
      const connectionCount = await new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) as count FROM connections', (err, row) => {
          if (err) reject(err);
          else resolve(row.count);
        });
      });
      
      // Verify buffer integrity
      const bufferIntegrityResult = await new Promise((resolve, reject) => {
        db.all(
          `SELECT c.id, c.name, c.quantum_level, c.buffer 
           FROM concepts c 
           ORDER BY c.created_at DESC 
           LIMIT 10`,
          (err, rows) => {
            if (err) reject(err);
            else {
              // Check if buffer is correctly applied
              const allValid = rows.every(row => Math.abs(row.buffer - 0.1) < 0.0001);
              resolve(allValid);
            }
          }
        );
      });
      
      resolve({
        concepts: conceptCount,
        connections: connectionCount,
        bufferIntegrity: bufferIntegrityResult
      });
      
    } catch (error) {
      reject(error);
    }
  });
}

// Run the main function
main(); 