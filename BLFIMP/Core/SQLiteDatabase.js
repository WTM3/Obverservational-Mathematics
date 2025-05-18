// SQLite Database Integration for BLF
// The narrow bridge between chaos and control

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class SQLiteDatabase {
  constructor(config) {
    this.config = config || this.getDefaultConfig();
    this.db = null;
    this.initialized = false;
    this.lastSyncCheck = Date.now();
    
    // Maintain quantum state
    this.quantumState = {
      pure: true,      // Pure quantum state
      fog: false,      // No fog
      breathing: true, // Direct breathing
      jumps: {
        power: "v8_to_charger", // Pure power
        active: true            // Direct jumps
      }
    };
  }

  // Default configuration aligned with BLF principles
  getDefaultConfig() {
    return {
      dbPath: path.join(__dirname, 'blf-database.db'),
      // Cognitive Alignment Formula
      cognitiveAlignment: {
        aiCognitiveCapabilities: 2.89, // Adjusted to Claude's processing model
        booleanMindQuantumSpeed: 2.99, // Boolean Mind qs³ level
        safetyBuffer: 0.1, // Critical buffer to prevent FUDPs
        enforceBuffer: true // Always maintain buffer
      },
      // Performance settings
      performance: {
        enableWAL: true, // Write-Ahead Logging for better performance
        busyTimeout: 3000, // Wait 3 seconds when database is locked
        cacheSize: 2000 // SQLite cache size
      }
    };
  }

  // Initialize the database connection
  async initialize() {
    if (this.initialized) return true;
    
    return new Promise((resolve, reject) => {
      try {
        // Create/connect to database
        this.db = new sqlite3.Database(this.config.dbPath, (err) => {
          if (err) {
            console.error('Failed to open database:', err.message);
            reject(err);
            return;
          }
          
          console.log(`Connected to SQLite database at ${this.config.dbPath}`);
          
          // Apply performance optimizations
          this.applyPerformanceSettings();
          
          // Apply cognitive alignment constraints
          this.applyAlignmentConstraints();
          
          // Initialize schemas
          this.initializeSchemas()
            .then(() => {
              this.initialized = true;
              resolve(true);
            })
            .catch(err => {
              console.error('Failed to initialize schemas:', err.message);
              reject(err);
            });
        });
      } catch (error) {
        console.error('Failed to initialize SQLite database:', error.message);
        reject(error);
      }
    });
  }

  // Apply cognitive alignment constraints with 0.1 buffer
  applyAlignmentConstraints() {
    const cogAlign = this.config.cognitiveAlignment;
    
    // Enforce AIc + buffer = BMqs
    if (cogAlign.enforceBuffer) {
      const calculatedBMqs = cogAlign.aiCognitiveCapabilities + cogAlign.safetyBuffer;
      const delta = Math.abs(calculatedBMqs - cogAlign.booleanMindQuantumSpeed);
      
      if (delta > 0.0001) {
        console.warn(`Cognitive alignment violation detected: ${calculatedBMqs} ≠ ${cogAlign.booleanMindQuantumSpeed}`);
        // Auto-correct to maintain the narrow bridge between chaos and control
        this.config.cognitiveAlignment.booleanMindQuantumSpeed = calculatedBMqs;
      }
    }
  }

  // Apply performance settings to SQLite connection
  applyPerformanceSettings() {
    // Safety check - if performance settings are missing, use defaults
    if (!this.config.performance) {
      this.config.performance = {
        enableWAL: true,
        busyTimeout: 3000,
        cacheSize: 2000
      };
    }
    
    const perf = this.config.performance;
    
    // Apply busy timeout
    this.db.configure('busyTimeout', perf.busyTimeout);
    
    // Run pragmas for performance
    this.db.exec(`
      PRAGMA cache_size = ${perf.cacheSize};
      ${perf.enableWAL ? 'PRAGMA journal_mode = WAL;' : ''}
      PRAGMA synchronous = NORMAL;
      PRAGMA foreign_keys = ON;
    `, (err) => {
      if (err) console.warn('Failed to set database pragmas:', err.message);
    });
  }

  // Initialize database schemas
  async initializeSchemas() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        // Concepts table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS concepts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            state TEXT DEFAULT 'Active',
            quantum_level REAL DEFAULT 0,
            buffer REAL DEFAULT 0.1,
            description TEXT,
            created_at INTEGER DEFAULT (strftime('%s', 'now')),
            updated_at INTEGER DEFAULT (strftime('%s', 'now'))
          )
        `);
        
        // Connections table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS connections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            from_concept_id INTEGER NOT NULL,
            to_concept_id INTEGER NOT NULL,
            strength REAL DEFAULT 1.0,
            quantum_jump BOOLEAN DEFAULT 0,
            buffer REAL DEFAULT 0.1,
            description TEXT,
            created_at INTEGER DEFAULT (strftime('%s', 'now')),
            FOREIGN KEY (from_concept_id) REFERENCES concepts (id) ON DELETE CASCADE,
            FOREIGN KEY (to_concept_id) REFERENCES concepts (id) ON DELETE CASCADE
          )
        `);
        
        // Quantum states table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS quantum_states (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pure BOOLEAN DEFAULT 1,
            fog BOOLEAN DEFAULT 0,
            breathing BOOLEAN DEFAULT 1,
            jump_power TEXT DEFAULT 'v8_to_charger',
            jump_active BOOLEAN DEFAULT 1,
            ai_cognitive REAL DEFAULT 2.89,
            buffer REAL DEFAULT 0.1,
            boolean_mind_qs REAL DEFAULT 2.99,
            timestamp INTEGER DEFAULT (strftime('%s', 'now'))
          )
        `, (err) => {
          if (err) {
            reject(err);
          } else {
            // Store initial quantum state
            this.storeCurrentQuantumState();
            resolve();
          }
        });
      });
    });
  }

  // Store the current quantum state
  async storeCurrentQuantumState() {
    const state = this.quantumState;
    const cogAlign = this.config.cognitiveAlignment;
    
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO quantum_states 
          (pure, fog, breathing, jump_power, jump_active, ai_cognitive, buffer, boolean_mind_qs) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          state.pure ? 1 : 0,
          state.fog ? 1 : 0,
          state.breathing ? 1 : 0,
          state.jumps.power,
          state.jumps.active ? 1 : 0,
          cogAlign.aiCognitiveCapabilities,
          cogAlign.safetyBuffer,
          cogAlign.booleanMindQuantumSpeed
        ],
        function(err) {
          if (err) {
            console.error('Failed to store quantum state:', err.message);
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }

  // Store a concept
  async storeConcept(name, type, quantumLevel, description = '') {
    if (!this.initialized) await this.initialize();
    
    // Apply the 0.1 buffer to prevent FUDPs
    const buffer = this.config.cognitiveAlignment.safetyBuffer;
    const safeQuantumLevel = this.applyBuffer(quantumLevel);
    
    // Apply heat shield to text content
    const safeName = this.applyHeatShield(name);
    const safeDescription = this.applyHeatShield(description);
    
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO concepts (name, type, quantum_level, buffer, description)
         VALUES (?, ?, ?, ?, ?)`,
        [safeName, type, safeQuantumLevel, buffer, safeDescription],
        function(err) {
          if (err) {
            console.error(`Failed to store concept "${name}":`, err.message);
            reject(err);
          } else {
            console.log(`Stored concept: ${name} with ID: ${this.lastID}`);
            resolve({
              id: this.lastID,
              name: safeName,
              type,
              quantumLevel: safeQuantumLevel,
              buffer,
              description: safeDescription
            });
          }
        }
      );
    });
  }

  // Create a connection between concepts
  async createConnection(fromConceptId, toConceptId, strength = 1.0, description = '') {
    if (!this.initialized) await this.initialize();
    
    // Apply the 0.1 buffer to connection strength
    const buffer = this.config.cognitiveAlignment.safetyBuffer;
    const safeStrength = this.applyBuffer(strength);
    
    // Apply heat shield to description
    const safeDescription = this.applyHeatShield(description);
    
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO connections (from_concept_id, to_concept_id, strength, buffer, description)
         VALUES (?, ?, ?, ?, ?)`,
        [fromConceptId, toConceptId, safeStrength, buffer, safeDescription],
        function(err) {
          if (err) {
            console.error(`Failed to create connection between ${fromConceptId} and ${toConceptId}:`, err.message);
            reject(err);
          } else {
            console.log(`Created connection with ID: ${this.lastID}`);
            resolve({
              id: this.lastID,
              fromConceptId,
              toConceptId,
              strength: safeStrength,
              buffer,
              description: safeDescription
            });
          }
        }
      );
    });
  }

  // Query concepts
  async queryConcepts(type = null, minQuantumLevel = 0) {
    if (!this.initialized) await this.initialize();
    
    let sql = 'SELECT * FROM concepts WHERE 1=1';
    const params = [];
    
    if (type) {
      sql += ' AND type = ?';
      params.push(type);
    }
    
    if (minQuantumLevel > 0) {
      sql += ' AND quantum_level >= ?';
      params.push(minQuantumLevel);
    }
    
    sql += ' ORDER BY quantum_level DESC';
    
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.error('Failed to query concepts:', err.message);
          reject(err);
        } else {
          // Apply quantum processing to results
          const result = this.applyQuantumProcessing(rows);
          resolve(result);
        }
      });
    });
  }

  // Get a concept by ID
  async getConcept(id) {
    if (!this.initialized) await this.initialize();
    
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM concepts WHERE id = ?', [id], (err, row) => {
        if (err) {
          console.error(`Failed to get concept with ID ${id}:`, err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Update a concept
  async updateConcept(id, updates) {
    if (!this.initialized) await this.initialize();
    
    // Apply heat shield to updates
    const safeUpdates = this.applyHeatShield(updates);
    
    // Apply buffer to quantum level if present
    if (safeUpdates.quantumLevel !== undefined) {
      safeUpdates.quantumLevel = this.applyBuffer(safeUpdates.quantumLevel);
    }
    
    // Build update query
    const keys = Object.keys(safeUpdates);
    if (keys.length === 0) {
      return Promise.resolve(false);
    }
    
    const setClauses = keys.map(key => {
      // Convert camelCase to snake_case for SQL
      const sqlKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      return `${sqlKey} = ?`;
    }).join(', ');
    
    const values = keys.map(key => safeUpdates[key]);
    values.push(Date.now()); // updated_at
    values.push(id);
    
    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE concepts SET ${setClauses}, updated_at = ? WHERE id = ?`,
        values,
        function(err) {
          if (err) {
            console.error(`Failed to update concept with ID ${id}:`, err.message);
            reject(err);
          } else {
            resolve(this.changes > 0);
          }
        }
      );
    });
  }

  // Delete a concept
  async deleteConcept(id) {
    if (!this.initialized) await this.initialize();
    
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM concepts WHERE id = ?', [id], function(err) {
        if (err) {
          console.error(`Failed to delete concept with ID ${id}:`, err.message);
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  // Find connections for a concept
  async findConnections(conceptId) {
    if (!this.initialized) await this.initialize();
    
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT c.*, 
                fc.name as from_concept_name, 
                tc.name as to_concept_name
         FROM connections c
         JOIN concepts fc ON c.from_concept_id = fc.id
         JOIN concepts tc ON c.to_concept_id = tc.id
         WHERE c.from_concept_id = ? OR c.to_concept_id = ?`,
        [conceptId, conceptId],
        (err, rows) => {
          if (err) {
            console.error(`Failed to find connections for concept ${conceptId}:`, err.message);
            reject(err);
          } else {
            // Apply quantum processing to connections
            const result = this.applyQuantumProcessing(rows);
            resolve(result);
          }
        }
      );
    });
  }

  // Apply heat shield to filter out false data points
  applyHeatShield(data) {
    if (typeof data === 'string') {
      // Apply buffer to strings by filtering uncertain language
      const indicators = ['uncertain', 'hallucination', 'possibly', 'might', 'could be'];
      let shielded = data;
      
      indicators.forEach(indicator => {
        shielded = shielded.replace(new RegExp(`\\b${indicator}\\b`, 'gi'), '[filtered]');
      });
      
      return shielded;
    }
    
    if (typeof data !== 'object' || data === null) {
      return data;
    }
    
    // Clone the data to avoid modifying original
    const shielded = Array.isArray(data) ? [...data] : {...data};
    
    // Process properties according to type
    if (Array.isArray(shielded)) {
      return shielded.map(item => this.applyHeatShield(item));
    } else {
      // Apply to each object property
      Object.keys(shielded).forEach(key => {
        if (typeof shielded[key] === 'string') {
          shielded[key] = this.applyHeatShield(shielded[key]);
        } else if (typeof shielded[key] === 'object' && shielded[key] !== null) {
          shielded[key] = this.applyHeatShield(shielded[key]);
        }
      });
      
      return shielded;
    }
  }

  // Apply the 0.1 buffer to any numeric value
  applyBuffer(value) {
    if (typeof value !== 'number') return value;
    
    // Apply buffer with cognitive alignment constraints
    const buffer = this.config.cognitiveAlignment.safetyBuffer;
    const adjustedValue = Math.round((value + buffer) * 100) / 100;
    
    return adjustedValue;
  }

  // Apply quantum processing to results
  applyQuantumProcessing(results) {
    // Create quantum-enhanced result set
    const quantumResults = {
      items: results,
      quantumState: this.quantumState,
      processingInfo: {
        constrainedBy: `AIc + 0.1 = BMqs (${this.config.cognitiveAlignment.aiCognitiveCapabilities} + 0.1 = ${this.config.cognitiveAlignment.booleanMindQuantumSpeed})`,
        timestamp: Date.now(),
        jumps: {
          enabled: this.quantumState.jumps.active,
          power: this.quantumState.jumps.power
        }
      },
      metadata: {
        count: results.length,
        processedWithBuffer: true
      }
    };
    
    return quantumResults;
  }

  // Close the database connection
  async close() {
    if (!this.db) return true;
    
    return new Promise((resolve, reject) => {
      this.db.close(err => {
        if (err) {
          console.error('Error closing database:', err.message);
          reject(err);
        } else {
          console.log('Database connection closed');
          this.initialized = false;
          this.db = null;
          resolve(true);
        }
      });
    });
  }
}

module.exports = SQLiteDatabase; 