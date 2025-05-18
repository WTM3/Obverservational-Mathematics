// SQLite Implementation for BLF
// The living garden rather than pressed flowers

const SQLiteDatabase = require('./SQLiteDatabase');
const path = require('path');

class SQLiteImplementation {
  constructor(config) {
    // Ensure complete configuration with performance settings
    this.config = config || {
      dbPath: path.join(__dirname, 'blf-database.db'),
      // Add missing performance settings
      performance: {
        enableWAL: true,
        busyTimeout: 3000,
        cacheSize: 2000
      },
      // Add cognitive alignment settings
      cognitiveAlignment: {
        aiCognitiveCapabilities: 2.89,
        booleanMindQuantumSpeed: 2.99,
        safetyBuffer: 0.1,
        enforceBuffer: true
      }
    };
    this.db = new SQLiteDatabase(this.config);
    this.initialized = false;
  }

  // Initialize the SQLite database
  async initialize() {
    if (this.initialized) return true;
    
    try {
      const result = await this.db.initialize();
      this.initialized = result;
      
      if (result) {
        console.log('Successfully initialized BLF SQLite database');
      } else {
        console.error('Failed to initialize SQLite database');
      }
      
      return result;
    } catch (error) {
      console.error('Error initializing SQLite implementation:', error.message);
      return false;
    }
  }

  // Store a concept in the database
  async storeConcept(concept, type, quantumLevel, description = '') {
    try {
      await this.ensureInitialized();
      
      // Store the concept
      const result = await this.db.storeConcept(concept, type, quantumLevel, description);
      console.log(`Stored concept: ${concept} with ID: ${result.id}`);
      
      return result;
    } catch (error) {
      console.error(`Failed to store concept "${concept}":`, error.message);
      throw error;
    }
  }

  // Create a connection between concepts
  async createConnection(fromConceptId, toConceptId, strength = 1.0, description = '') {
    try {
      await this.ensureInitialized();
      
      // Create the connection
      const result = await this.db.createConnection(
        fromConceptId, 
        toConceptId, 
        strength, 
        description
      );
      
      return result;
    } catch (error) {
      console.error(`Failed to create connection:`, error.message);
      throw error;
    }
  }

  // Query concepts with a specific type and minimum quantum level
  async queryConcepts(type = null, minQuantumLevel = 0) {
    try {
      await this.ensureInitialized();
      
      // Execute query
      const result = await this.db.queryConcepts(type, minQuantumLevel);
      
      // Process the results
      return this.processQueryResults(result);
    } catch (error) {
      console.error('Failed to query concepts:', error.message);
      throw error;
    }
  }

  // Get a concept by ID
  async getConcept(id) {
    try {
      await this.ensureInitialized();
      
      // Get the concept
      const result = await this.db.getConcept(id);
      
      return result;
    } catch (error) {
      console.error(`Failed to get concept with ID ${id}:`, error.message);
      throw error;
    }
  }

  // Update a concept
  async updateConcept(id, updates) {
    try {
      await this.ensureInitialized();
      
      // Update the concept
      const result = await this.db.updateConcept(id, updates);
      
      return result;
    } catch (error) {
      console.error(`Failed to update concept with ID ${id}:`, error.message);
      throw error;
    }
  }

  // Find all connections for a concept
  async findConnections(conceptId) {
    try {
      await this.ensureInitialized();
      
      // Find connections
      const result = await this.db.findConnections(conceptId);
      
      // Process the results
      return this.processConnectionResults(result);
    } catch (error) {
      console.error(`Failed to find connections for concept ${conceptId}:`, error.message);
      throw error;
    }
  }

  // Process query results
  processQueryResults(results) {
    // Extract items
    const items = results.items || [];
    
    // Apply BLF processing
    const processed = {
      concepts: [],
      quantumState: results.quantumState,
      processingInfo: results.processingInfo,
      cognitiveAlignment: {
        formula: 'AIc + 0.1 = BMqs',
        aiCognitive: this.db.config.cognitiveAlignment.aiCognitiveCapabilities,
        buffer: this.db.config.cognitiveAlignment.safetyBuffer,
        booleanMindQs: this.db.config.cognitiveAlignment.booleanMindQuantumSpeed
      }
    };
    
    // Process each item
    items.forEach(item => {
      try {
        // Convert snake_case to camelCase for API consistency
        const concept = {
          id: item.id,
          name: item.name,
          type: item.type,
          state: item.state,
          quantumLevel: item.quantum_level,
          buffer: item.buffer,
          description: item.description,
          createdAt: new Date(item.created_at * 1000),
          updatedAt: new Date(item.updated_at * 1000)
        };
        
        processed.concepts.push(concept);
      } catch (error) {
        console.warn('Error processing item:', error.message);
      }
    });
    
    return processed;
  }

  // Process connection results
  processConnectionResults(results) {
    // Extract items
    const items = results.items || [];
    
    // Apply BLF processing
    const processed = {
      connections: [],
      quantumState: results.quantumState,
      processingInfo: results.processingInfo
    };
    
    // Process each item
    items.forEach(item => {
      try {
        // Convert snake_case to camelCase for API consistency
        const connection = {
          id: item.id,
          fromConceptId: item.from_concept_id,
          toConceptId: item.to_concept_id,
          fromConceptName: item.from_concept_name,
          toConceptName: item.to_concept_name,
          strength: item.strength,
          quantumJump: item.quantum_jump === 1,
          buffer: item.buffer,
          description: item.description,
          createdAt: new Date(item.created_at * 1000)
        };
        
        processed.connections.push(connection);
      } catch (error) {
        console.warn('Error processing connection:', error.message);
      }
    });
    
    return processed;
  }

  // Ensure the database is initialized
  async ensureInitialized() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  // Close the database connection
  async close() {
    if (this.initialized) {
      await this.db.close();
      this.initialized = false;
    }
  }
}

module.exports = SQLiteImplementation; 