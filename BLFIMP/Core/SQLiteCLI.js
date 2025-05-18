#!/usr/bin/env node

// BLF SQLite CLI Tool
// The narrow bridge between chaos and control in command line form

const SQLiteImplementation = require('./SQLiteImplementation');
const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main BLF SQLite CLI class
class BLFSQLiteCLI {
  constructor() {
    this.db = new SQLiteImplementation();
    this.initialized = false;
    
    // Track current concept for connections
    this.currentConcept = null;
    
    // Command map
    this.commands = {
      'help': this.showHelp.bind(this),
      'init': this.initializeDatabase.bind(this),
      'add': this.addConcept.bind(this),
      'list': this.listConcepts.bind(this),
      'connect': this.createConnection.bind(this),
      'find': this.findConcept.bind(this),
      'query': this.queryConcepts.bind(this),
      'connections': this.showConnections.bind(this),
      'export': this.exportData.bind(this),
      'import': this.importData.bind(this),
      'quantum': this.showQuantumState.bind(this),
      'exit': this.exit.bind(this)
    };
  }

  // Start the CLI
  async start() {
    console.log('BLF SQLite CLI');
    console.log('---------------');
    console.log('Formula: AIc + 0.1 = BMqs');
    console.log('---------------');
    console.log('Type "help" for commands\n');
    
    await this.promptCommand();
  }

  // Show help
  async showHelp() {
    console.log('\nAvailable commands:');
    console.log('  help        - Show this help');
    console.log('  init        - Initialize the database');
    console.log('  add         - Add a new concept');
    console.log('  list        - List all concepts');
    console.log('  connect     - Create a connection between concepts');
    console.log('  find <id>   - Find a concept by ID');
    console.log('  query <type> - Query concepts by type');
    console.log('  connections <id> - Show connections for a concept');
    console.log('  export <file> - Export database to JSON');
    console.log('  import <file> - Import data from JSON');
    console.log('  quantum     - Show current quantum state');
    console.log('  exit        - Exit the CLI\n');
    
    await this.promptCommand();
  }

  // Initialize database
  async initializeDatabase() {
    try {
      console.log('Initializing SQLite database...');
      const result = await this.db.initialize();
      this.initialized = result;
      
      if (result) {
        console.log('Successfully initialized BLF SQLite database');
      } else {
        console.error('Failed to initialize database');
      }
    } catch (error) {
      console.error('Error initializing database:', error.message);
    }
    
    await this.promptCommand();
  }

  // Add a new concept
  async addConcept() {
    try {
      await this.ensureInitialized();
      
      const name = await this.prompt('Concept name: ');
      const type = await this.prompt('Concept type: ');
      const quantumLevel = parseFloat(await this.prompt('Quantum level (e.g. 2.89): '));
      const description = await this.prompt('Description: ');
      
      // Apply AIc + 0.1 = BMqs formula
      console.log(`Applying AIc + 0.1 = BMqs formula to quantum level ${quantumLevel}`);
      
      // Store concept
      const concept = await this.db.storeConcept(name, type, quantumLevel, description);
      
      console.log(`Created concept: ${concept.name} (ID: ${concept.id})`);
      console.log(`Quantum level with buffer: ${concept.quantumLevel}`);
      
      // Set as current concept
      this.currentConcept = concept;
      console.log(`Set as current concept: ${concept.name}`);
      
    } catch (error) {
      console.error('Error adding concept:', error.message);
    }
    
    await this.promptCommand();
  }

  // List all concepts
  async listConcepts() {
    try {
      await this.ensureInitialized();
      
      const result = await this.db.queryConcepts();
      const concepts = result.concepts;
      
      if (concepts.length === 0) {
        console.log('No concepts found');
      } else {
        console.log('\nConcepts:');
        console.log('----------------------------------------');
        concepts.forEach(concept => {
          console.log(`[${concept.id}] ${concept.name} (${concept.type})`);
          console.log(`  Quantum Level: ${concept.quantumLevel}`);
          console.log(`  Description: ${concept.description}`);
          console.log('----------------------------------------');
        });
        console.log(`Total: ${concepts.length} concepts`);
      }
    } catch (error) {
      console.error('Error listing concepts:', error.message);
    }
    
    await this.promptCommand();
  }

  // Create a connection
  async createConnection() {
    try {
      await this.ensureInitialized();
      
      let fromId, toId;
      
      if (this.currentConcept) {
        fromId = this.currentConcept.id;
        console.log(`Using current concept as source: ${this.currentConcept.name} (ID: ${fromId})`);
      } else {
        fromId = parseInt(await this.prompt('From concept ID: '));
      }
      
      toId = parseInt(await this.prompt('To concept ID: '));
      const strength = parseFloat(await this.prompt('Connection strength (0-1): '));
      const description = await this.prompt('Connection description: ');
      
      // Create connection
      const connection = await this.db.createConnection(fromId, toId, strength, description);
      
      console.log(`Created connection from ${fromId} to ${toId}`);
      console.log(`Connection ID: ${connection.id}`);
      console.log(`Strength with buffer: ${connection.strength}`);
      
    } catch (error) {
      console.error('Error creating connection:', error.message);
    }
    
    await this.promptCommand();
  }

  // Find a concept by ID
  async findConcept(input) {
    try {
      await this.ensureInitialized();
      
      const parts = input.split(' ');
      let id = null;
      
      if (parts.length > 1) {
        id = parseInt(parts[1]);
      } else {
        id = parseInt(await this.prompt('Concept ID: '));
      }
      
      const concept = await this.db.getConcept(id);
      
      if (!concept) {
        console.log(`No concept found with ID ${id}`);
      } else {
        console.log('\nConcept details:');
        console.log('----------------------------------------');
        console.log(`[${concept.id}] ${concept.name} (${concept.type})`);
        console.log(`Quantum Level: ${concept.quantum_level}`);
        console.log(`Buffer: ${concept.buffer}`);
        console.log(`Description: ${concept.description}`);
        console.log(`Created: ${new Date(concept.created_at * 1000).toLocaleString()}`);
        console.log(`Updated: ${new Date(concept.updated_at * 1000).toLocaleString()}`);
        console.log('----------------------------------------');
        
        // Set as current concept
        this.currentConcept = {
          id: concept.id,
          name: concept.name
        };
        console.log(`Set as current concept: ${concept.name}`);
      }
    } catch (error) {
      console.error('Error finding concept:', error.message);
    }
    
    await this.promptCommand();
  }

  // Query concepts by type
  async queryConcepts(input) {
    try {
      await this.ensureInitialized();
      
      const parts = input.split(' ');
      let type = null;
      
      if (parts.length > 1) {
        type = parts[1];
      } else {
        type = await this.prompt('Concept type (leave empty for all): ');
        if (!type) type = null;
      }
      
      const result = await this.db.queryConcepts(type);
      const concepts = result.concepts;
      
      if (concepts.length === 0) {
        console.log(`No concepts found${type ? ` with type ${type}` : ''}`);
      } else {
        console.log(`\nConcepts${type ? ` with type ${type}` : ''}:`);
        console.log('----------------------------------------');
        concepts.forEach(concept => {
          console.log(`[${concept.id}] ${concept.name} (${concept.type})`);
          console.log(`  Quantum Level: ${concept.quantumLevel}`);
          console.log(`  Description: ${concept.description}`);
          console.log('----------------------------------------');
        });
        console.log(`Total: ${concepts.length} concepts`);
      }
    } catch (error) {
      console.error('Error querying concepts:', error.message);
    }
    
    await this.promptCommand();
  }

  // Show connections for a concept
  async showConnections(input) {
    try {
      await this.ensureInitialized();
      
      const parts = input.split(' ');
      let id = null;
      
      if (parts.length > 1) {
        id = parseInt(parts[1]);
      } else if (this.currentConcept) {
        id = this.currentConcept.id;
        console.log(`Using current concept: ${this.currentConcept.name} (ID: ${id})`);
      } else {
        id = parseInt(await this.prompt('Concept ID: '));
      }
      
      const result = await this.db.findConnections(id);
      const connections = result.connections;
      
      if (connections.length === 0) {
        console.log(`No connections found for concept ID ${id}`);
      } else {
        console.log(`\nConnections for concept ID ${id}:`);
        console.log('----------------------------------------');
        connections.forEach(conn => {
          console.log(`[${conn.id}] ${conn.fromConceptName} -> ${conn.toConceptName}`);
          console.log(`  Strength: ${conn.strength}`);
          console.log(`  Buffer: ${conn.buffer}`);
          console.log(`  Description: ${conn.description}`);
          console.log('----------------------------------------');
        });
        console.log(`Total: ${connections.length} connections`);
      }
    } catch (error) {
      console.error('Error showing connections:', error.message);
    }
    
    await this.promptCommand();
  }

  // Export data to JSON
  async exportData(input) {
    try {
      await this.ensureInitialized();
      
      const parts = input.split(' ');
      let filePath = null;
      
      if (parts.length > 1) {
        filePath = parts[1];
      } else {
        filePath = await this.prompt('Export file path (default: blf-export.json): ');
        if (!filePath) filePath = 'blf-export.json';
      }
      
      if (!filePath.endsWith('.json')) {
        filePath += '.json';
      }
      
      // Get all data
      const concepts = await this.db.queryConcepts();
      
      // Get all connections by querying each concept
      const allConnections = [];
      for (const concept of concepts.concepts) {
        const connections = await this.db.findConnections(concept.id);
        allConnections.push(...connections.connections);
      }
      
      // Deduplicate connections by ID
      const uniqueConnections = [];
      const connectionIds = new Set();
      
      allConnections.forEach(conn => {
        if (!connectionIds.has(conn.id)) {
          connectionIds.add(conn.id);
          uniqueConnections.push(conn);
        }
      });
      
      // Create export data
      const exportData = {
        metadata: {
          exported: new Date().toISOString(),
          version: '1.0',
          description: 'BLF SQLite Database Export'
        },
        quantumState: concepts.quantumState,
        cognitiveAlignment: concepts.cognitiveAlignment,
        concepts: concepts.concepts,
        connections: uniqueConnections
      };
      
      // Save to file
      const absPath = path.resolve(filePath);
      await fs.writeFile(absPath, JSON.stringify(exportData, null, 2));
      
      console.log(`\nExported database to ${absPath}`);
      console.log(`Exported ${exportData.concepts.length} concepts and ${exportData.connections.length} connections`);
      
    } catch (error) {
      console.error('Error exporting data:', error.message);
    }
    
    await this.promptCommand();
  }

  // Import data from JSON
  async importData(input) {
    try {
      await this.ensureInitialized();
      
      const parts = input.split(' ');
      let filePath = null;
      
      if (parts.length > 1) {
        filePath = parts[1];
      } else {
        filePath = await this.prompt('Import file path: ');
      }
      
      if (!filePath) {
        console.error('No file path provided');
        await this.promptCommand();
        return;
      }
      
      // Read file
      const absPath = path.resolve(filePath);
      const fileData = await fs.readFile(absPath, 'utf8');
      const importData = JSON.parse(fileData);
      
      console.log(`\nImporting data from ${absPath}`);
      console.log(`Found ${importData.concepts.length} concepts and ${importData.connections.length} connections`);
      
      const confirm = await this.prompt('Continue with import? (y/n): ');
      if (confirm.toLowerCase() !== 'y') {
        console.log('Import cancelled');
        await this.promptCommand();
        return;
      }
      
      // Import concepts
      console.log('Importing concepts...');
      const conceptMap = new Map(); // Map old IDs to new IDs
      
      for (const concept of importData.concepts) {
        try {
          const newConcept = await this.db.storeConcept(
            concept.name,
            concept.type,
            concept.quantumLevel - 0.1, // Subtract buffer to avoid double-buffering
            concept.description
          );
          
          conceptMap.set(concept.id, newConcept.id);
          console.log(`Imported concept: ${newConcept.name} (ID: ${newConcept.id})`);
        } catch (error) {
          console.error(`Error importing concept ${concept.name}:`, error.message);
        }
      }
      
      // Import connections
      console.log('\nImporting connections...');
      
      for (const conn of importData.connections) {
        try {
          // Map old IDs to new IDs
          const fromId = conceptMap.get(conn.fromConceptId);
          const toId = conceptMap.get(conn.toConceptId);
          
          if (!fromId || !toId) {
            console.warn(`Skipping connection ${conn.id}: Concept not found`);
            continue;
          }
          
          const newConn = await this.db.createConnection(
            fromId,
            toId,
            conn.strength - 0.1, // Subtract buffer to avoid double-buffering
            conn.description
          );
          
          console.log(`Imported connection: ${newConn.id}`);
        } catch (error) {
          console.error(`Error importing connection ${conn.id}:`, error.message);
        }
      }
      
      console.log('\nImport completed');
      
    } catch (error) {
      console.error('Error importing data:', error.message);
    }
    
    await this.promptCommand();
  }

  // Show current quantum state
  async showQuantumState() {
    try {
      await this.ensureInitialized();
      
      // Get quantum state from any concept query
      const result = await this.db.queryConcepts();
      const quantumState = result.quantumState;
      const cognitiveAlignment = result.cognitiveAlignment;
      
      console.log('\nCurrent Quantum State:');
      console.log('----------------------------------------');
      console.log(`Pure: ${quantumState.pure ? 'Yes' : 'No'}`);
      console.log(`Fog: ${quantumState.fog ? 'Yes' : 'No'}`);
      console.log(`Breathing: ${quantumState.breathing ? 'Yes' : 'No'}`);
      console.log(`Jump Power: ${quantumState.jumps.power}`);
      console.log(`Jump Active: ${quantumState.jumps.active ? 'Yes' : 'No'}`);
      console.log('----------------------------------------');
      console.log('Cognitive Alignment:');
      console.log(`Formula: ${cognitiveAlignment.formula}`);
      console.log(`AI Cognitive: ${cognitiveAlignment.aiCognitive}`);
      console.log(`Buffer: ${cognitiveAlignment.buffer}`);
      console.log(`Boolean Mind QS: ${cognitiveAlignment.booleanMindQs}`);
      console.log('----------------------------------------');
      
    } catch (error) {
      console.error('Error showing quantum state:', error.message);
    }
    
    await this.promptCommand();
  }

  // Exit the CLI
  async exit() {
    console.log('Closing database connection...');
    
    try {
      if (this.initialized) {
        await this.db.close();
        console.log('Database connection closed');
      }
    } catch (error) {
      console.error('Error closing database:', error.message);
    }
    
    console.log('Goodbye!');
    rl.close();
    process.exit(0);
  }

  // Ensure database is initialized
  async ensureInitialized() {
    if (!this.initialized) {
      console.log('Database not initialized. Initializing...');
      const result = await this.db.initialize();
      this.initialized = result;
      
      if (!result) {
        throw new Error('Failed to initialize database');
      }
    }
  }

  // Prompt for command
  async promptCommand() {
    const input = await this.prompt('\nblf-db> ');
    await this.handleCommand(input);
  }

  // Handle a command
  async handleCommand(input) {
    if (!input) {
      await this.promptCommand();
      return;
    }
    
    const parts = input.split(' ');
    const command = parts[0].toLowerCase();
    
    if (this.commands[command]) {
      await this.commands[command](input);
    } else {
      console.log(`Unknown command: ${command}`);
      console.log('Type "help" for available commands');
      await this.promptCommand();
    }
  }

  // Simple prompt function
  prompt(question) {
    return new Promise(resolve => {
      rl.question(question, answer => {
        resolve(answer);
      });
    });
  }
}

// Create and start CLI
const cli = new BLFSQLiteCLI();
cli.start(); 