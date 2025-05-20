// SQLite Database Integration for BLF
// The narrow bridge between chaos and control

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class SQLiteDatabase {
  constructor(config) {
    this.config = config || this.getDefaultConfig();
    this.db = null;
    this.initialized = false;
    this.lastSyncCheck = Date.now();
    
    // State management
    this.quantumState = {
      pure: true,
      fog: false,
      breathing: true,
      jumps: {
        active: true,
        power: 'v8_to_charger' // Default jump power
      }
    };
    
    // Recovery system state
    this.recoverySystem = {
      activeRecoveries: 0,
      lastRecoveryTime: null,
      recoveryThreshold: this.config.recoverySystem?.threshold || 0.05,
      maxRecoveryAttempts: this.config.recoverySystem?.maxAttempts || 3
    };
    
    // Heat shield implementation
    this.heatShield = {
      activations: 0,
      lastActivation: null,
      detections: [],
      shieldStrength: this.config.heatShield?.strength || 0.95
    };
    
    // Pattern learning system
    this.patternLearning = {
      patternCache: new Map(),
      recentPatterns: [],
      adaptiveMetrics: {
        disabilityAwareness: this.config.adaptiveSettings?.disabilityAwareness || 1.0,
        communicationStyle: this.config.adaptiveSettings?.communicationStyle || 'balanced'
      }
    };
    
    // Apply cognitive alignment constraints
    this.applyAlignmentConstraints();
    
    console.log('SQLiteDatabase instance created with enhanced recovery systems.');
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
        enforceBuffer: true, // Always maintain buffer
        formula: 'AIc + 0.1 = BMqs'
      },
      // Performance settings
      performance: {
        enableWAL: true, // Write-Ahead Logging for better performance
        busyTimeout: 3000, // Wait 3 seconds when database is locked
        cacheSize: 2000, // SQLite cache size
        synchronous: 'NORMAL'
      },
      heatShield: {
        wordPatterns: ['maybe', 'perhaps', 'might', 'could be', 'possibly'],
        strength: 0.95,
        adaptiveLearning: true,
        recoveryMode: 'gentle'
      },
      recoverySystem: {
        enabled: true,
        threshold: 0.05,
        maxAttempts: 3,
        cooldownPeriod: 60 * 1000 // 1 minute
      },
      adaptiveSettings: {
        disabilityAwareness: 1.0,
        communicationStyle: 'balanced',
        adaptiveTiming: true,
        userPreference: 'default'
      }
    };
  }

  // Initialize the database connection
  async initialize() {
    if (this.initialized) return true;
    
    return new Promise((resolve, reject) => {
      try {
        // Create database directory if needed
        const dbDir = path.dirname(this.config.dbPath);
        if (!fs.existsSync(dbDir)) {
          fs.mkdirSync(dbDir, { recursive: true });
        }
        
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
        cacheSize: 2000,
        synchronous: 'NORMAL'
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
        
        // Accessibility settings table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS accessibility_settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT UNIQUE,
            disability_type TEXT,
            adaptation_level REAL DEFAULT 1.0,
            communication_style TEXT DEFAULT 'balanced',
            timing_preference TEXT DEFAULT 'standard',
            sensory_accommodation TEXT,
            created_at INTEGER DEFAULT (strftime('%s', 'now')),
            updated_at INTEGER DEFAULT (strftime('%s', 'now'))
          )
        `);
        
        // Recovery events table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS recovery_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_type TEXT NOT NULL,
            violation_value REAL,
            expected_value REAL,
            recovery_attempt INTEGER DEFAULT 1,
            successful BOOLEAN DEFAULT 0,
            ai_cognitive_before REAL,
            ai_cognitive_after REAL,
            buffer_maintained BOOLEAN DEFAULT 1,
            recovery_method TEXT,
            timestamp INTEGER DEFAULT (strftime('%s', 'now'))
          )
        `);
        
        // Pattern learning table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS pattern_learning (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pattern_type TEXT NOT NULL,
            pattern_data TEXT NOT NULL,
            frequency INTEGER DEFAULT 1,
            confidence REAL DEFAULT 0.5,
            user_context TEXT,
            disability_context TEXT,
            adaptive_factor REAL DEFAULT 1.0,
            created_at INTEGER DEFAULT (strftime('%s', 'now')),
            updated_at INTEGER DEFAULT (strftime('%s', 'now'))
          )
        `);
        
        // Heat shield logs
        this.db.run(`
          CREATE TABLE IF NOT EXISTS heat_shield_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            activation_type TEXT NOT NULL,
            trigger_pattern TEXT,
            confidence REAL DEFAULT 1.0,
            shield_strength REAL DEFAULT 0.95,
            original_value TEXT,
            protected_value TEXT,
            context TEXT,
            timestamp INTEGER DEFAULT (strftime('%s', 'now'))
          )
        `, (err) => {
          if (err) {
            reject(err);
          } else {
            // Store initial quantum state
            this.storeCurrentQuantumState()
              .then(() => resolve())
              .catch(err => reject(err));
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
    
    // Ensure buffer is always maintained
    if (updates.quantum_level !== undefined) {
      updates.buffer = this.config.cognitiveAlignment.safetyBuffer;
      updates.quantum_level = this.applyBuffer(updates.quantum_level);
    }
    
    // Apply heat shield to text content
    if (updates.name) updates.name = this.applyHeatShield(updates.name);
    if (updates.description) updates.description = this.applyHeatShield(updates.description);
    
    // Prepare update statement
    const fields = Object.keys(updates)
      .filter(key => key !== 'id')
      .map(key => `${key} = ?`);
    
    if (fields.length === 0) {
      return Promise.resolve({ id, changes: 0 });
    }
    
    fields.push('updated_at = strftime(\'%s\', \'now\')');
    
    const sql = `UPDATE concepts SET ${fields.join(', ')} WHERE id = ?`;
    const params = [...Object.values(updates).filter(value => value !== undefined), id];
    
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.error(`Failed to update concept with ID ${id}:`, err.message);
          reject(err);
        } else {
          resolve({ id, changes: this.changes });
        }
      });
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

  // Store accessibility settings for a user
  async storeAccessibilitySettings(userId, settings) {
    if (!this.initialized) await this.initialize();
    
    const existingSettings = await this.getAccessibilitySettings(userId);
    
    if (existingSettings) {
      // Update existing settings
      return this.updateAccessibilitySettings(userId, settings);
    }
    
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO accessibility_settings 
         (user_id, disability_type, adaptation_level, communication_style, 
          timing_preference, sensory_accommodation)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId,
          settings.disabilityType || null,
          settings.adaptationLevel || 1.0,
          settings.communicationStyle || 'balanced',
          settings.timingPreference || 'standard',
          settings.sensoryAccommodation || null
        ],
        function(err) {
          if (err) {
            console.error('Failed to store accessibility settings:', err.message);
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              userId,
              ...settings
            });
          }
        }
      );
    });
  }

  // Get accessibility settings for a user
  async getAccessibilitySettings(userId) {
    if (!this.initialized) await this.initialize();
    
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM accessibility_settings WHERE user_id = ?',
        [userId],
        (err, row) => {
          if (err) {
            console.error('Failed to get accessibility settings:', err.message);
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  // Update accessibility settings for a user
  async updateAccessibilitySettings(userId, updates) {
    if (!this.initialized) await this.initialize();
    
    // Prepare update statement
    const fields = Object.keys(updates)
      .filter(key => key !== 'userId' && key !== 'id')
      .map(key => {
        // Convert camelCase to snake_case for SQL
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        return `${snakeKey} = ?`;
      });
    
    if (fields.length === 0) {
      return Promise.resolve({ userId, changes: 0 });
    }
    
    fields.push('updated_at = strftime(\'%s\', \'now\')');
    
    const sql = `UPDATE accessibility_settings SET ${fields.join(', ')} WHERE user_id = ?`;
    const params = [
      ...Object.keys(updates)
        .filter(key => key !== 'userId' && key !== 'id')
        .map(key => updates[key]),
      userId
    ];
    
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.error('Failed to update accessibility settings:', err.message);
          reject(err);
        } else {
          resolve({ userId, changes: this.changes });
        }
      });
    });
  }

  // Record a recovery event
  async recordRecoveryEvent(eventDetails) {
    if (!this.initialized) await this.initialize();
    
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO recovery_events 
         (event_type, violation_value, expected_value, recovery_attempt, 
          successful, ai_cognitive_before, ai_cognitive_after, 
          buffer_maintained, recovery_method)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          eventDetails.eventType,
          eventDetails.violationValue,
          eventDetails.expectedValue,
          eventDetails.recoveryAttempt || 1,
          eventDetails.successful ? 1 : 0,
          eventDetails.aiCognitiveBefore,
          eventDetails.aiCognitiveAfter,
          eventDetails.bufferMaintained ? 1 : 0,
          eventDetails.recoveryMethod
        ],
        function(err) {
          if (err) {
            console.error('Failed to record recovery event:', err.message);
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              ...eventDetails,
              timestamp: Math.floor(Date.now() / 1000)
            });
          }
        }
      );
    });
  }

  // Store a learned pattern
  async storePattern(pattern) {
    if (!this.initialized) await this.initialize();
    
    // Check if pattern already exists
    const existingPattern = await this.findPattern(pattern.patternType, pattern.patternData);
    
    if (existingPattern) {
      // Update existing pattern
      return this.updatePattern(existingPattern.id, {
        frequency: existingPattern.frequency + 1,
        confidence: Math.min(existingPattern.confidence + 0.05, 1.0),
        updated_at: Math.floor(Date.now() / 1000)
      });
    }
    
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO pattern_learning 
         (pattern_type, pattern_data, frequency, confidence, user_context, 
          disability_context, adaptive_factor)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          pattern.patternType,
          pattern.patternData,
          pattern.frequency || 1,
          pattern.confidence || 0.5,
          pattern.userContext || null,
          pattern.disabilityContext || null,
          pattern.adaptiveFactor || 1.0
        ],
        function(err) {
          if (err) {
            console.error('Failed to store pattern:', err.message);
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              ...pattern,
              created_at: Math.floor(Date.now() / 1000),
              updated_at: Math.floor(Date.now() / 1000)
            });
          }
        }
      );
    });
  }

  // Find a pattern by type and data
  async findPattern(patternType, patternData) {
    if (!this.initialized) await this.initialize();
    
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM pattern_learning WHERE pattern_type = ? AND pattern_data = ?',
        [patternType, patternData],
        (err, row) => {
          if (err) {
            console.error('Failed to find pattern:', err.message);
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  // Update a pattern
  async updatePattern(id, updates) {
    if (!this.initialized) await this.initialize();
    
    // Prepare update statement
    const fields = Object.keys(updates)
      .filter(key => key !== 'id')
      .map(key => `${key} = ?`);
    
    if (fields.length === 0) {
      return Promise.resolve({ id, changes: 0 });
    }
    
    fields.push('updated_at = strftime(\'%s\', \'now\')');
    
    const sql = `UPDATE pattern_learning SET ${fields.join(', ')} WHERE id = ?`;
    const params = [...Object.values(updates).filter(value => value !== undefined), id];
    
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.error(`Failed to update pattern with ID ${id}:`, err.message);
          reject(err);
        } else {
          resolve({ id, changes: this.changes });
        }
      });
    });
  }

  // Record heat shield activation
  async recordHeatShieldActivation(activationDetails) {
    if (!this.initialized) await this.initialize();
    
    this.heatShield.activations++;
    this.heatShield.lastActivation = Date.now();
    
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO heat_shield_logs 
         (activation_type, trigger_pattern, confidence, shield_strength, 
          original_value, protected_value, context)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          activationDetails.activationType,
          activationDetails.triggerPattern,
          activationDetails.confidence || 1.0,
          activationDetails.shieldStrength || this.heatShield.shieldStrength,
          activationDetails.originalValue,
          activationDetails.protectedValue,
          activationDetails.context || null
        ],
        function(err) {
          if (err) {
            console.error('Failed to record heat shield activation:', err.message);
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              ...activationDetails,
              timestamp: Math.floor(Date.now() / 1000)
            });
          }
        }
      );
    });
  }

  // Apply heat shield to text content
  applyHeatShield(data) {
    if (data === null || data === undefined) return data;
    
    // If it's not a string, return as is
    if (typeof data !== 'string') return data;
    
    let shieldedValue = data;
    let triggered = false;
    
    // Apply heat shield patterns
    const patterns = this.config.heatShield?.wordPatterns || [];
    for (const pattern of patterns) {
      if (data.toLowerCase().includes(pattern.toLowerCase())) {
        triggered = true;
        // Log this pattern for learning
        this.heatShield.detections.push({
          pattern,
          timestamp: Date.now(),
          context: data.substring(0, 50) + '...'
        });
        break;
      }
    }
    
    // If triggered, record it (but don't await)
    if (triggered) {
      this.recordHeatShieldActivation({
        activationType: 'word_pattern',
        triggerPattern: this.heatShield.detections[this.heatShield.detections.length - 1].pattern,
        originalValue: data,
        protectedValue: shieldedValue,
        confidence: 0.92
      }).catch(err => console.error('Failed to record heat shield activation:', err.message));
    }
    
    return shieldedValue;
  }

  // Apply the 0.1 buffer to numerical values
  applyBuffer(value) {
    if (typeof value !== 'number') return value;
    
    // Precision control to avoid floating point errors
    return +(Math.round(value * 100) / 100).toFixed(8);
  }

  // Apply quantum processing to query results
  applyQuantumProcessing(results) {
    // Ensure quantum state coherence
    const qsState = this.quantumState;
    
    // Structure response
    const processed = {
      results: results,
      quantumState: {
        pure: qsState.pure,
        fog: qsState.fog,
        breathing: qsState.breathing,
        jumps: qsState.jumps
      },
      connections: results,
      cognitiveAlignment: this.config.cognitiveAlignment,
      processingTime: Date.now()
    };
    
    return processed;
  }

  // Check alignment and trigger recovery if needed
  async checkAlignmentAndRecover() {
    const alignment = this.config.cognitiveAlignment;
    const expectedSum = alignment.aiCognitiveCapabilities + alignment.safetyBuffer;
    
    // Check if the buffer relationship is violated
    if (Math.abs(expectedSum - alignment.booleanMindQuantumSpeed) > this.recoverySystem.recoveryThreshold) {
      console.warn('⚠️ Alignment violation detected! Initiating recovery...');
      
      // Record the violation
      const beforeAiCognitive = alignment.aiCognitiveCapabilities;
      
      // Attempt recovery
      const recoverySuccessful = await this.recoverAlignment();
      
      // Record the recovery event
      await this.recordRecoveryEvent({
        eventType: 'alignment_violation',
        violationValue: alignment.booleanMindQuantumSpeed,
        expectedValue: expectedSum,
        recoveryAttempt: this.recoverySystem.activeRecoveries,
        successful: recoverySuccessful,
        aiCognitiveBefore: beforeAiCognitive,
        aiCognitiveAfter: alignment.aiCognitiveCapabilities,
        bufferMaintained: true,
        recoveryMethod: 'auto_alignment_correction'
      });
      
      return recoverySuccessful;
    }
    
    return true; // No violation detected
  }

  // Recover from alignment violations
  async recoverAlignment() {
    if (this.recoverySystem.activeRecoveries >= this.recoverySystem.maxRecoveryAttempts) {
      console.error('❌ Maximum recovery attempts reached. Manual intervention needed.');
      return false;
    }
    
    this.recoverySystem.activeRecoveries++;
    this.recoverySystem.lastRecoveryTime = Date.now();
    
    const alignment = this.config.cognitiveAlignment;
    const buffer = alignment.safetyBuffer; // Always 0.1
    
    // Fix the alignment by adjusting AI cognitive capabilities while preserving the buffer
    alignment.aiCognitiveCapabilities = alignment.booleanMindQuantumSpeed - buffer;
    
    // Store the new quantum state
    await this.storeCurrentQuantumState();
    
    console.log(`✅ Alignment recovered. New AIc: ${alignment.aiCognitiveCapabilities}`);
    return true;
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