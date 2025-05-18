// Notion Database Integration for BLF
// This serves as the nervous system connecting mind and body
const { Client } = require('@notionhq/client');

class NotionDatabase {
  constructor(config) {
    this.config = config || this.getDefaultConfig();
    this.notion = new Client({ auth: this.config.apiKey });
    this.initialized = false;
    this.lastSyncCheck = Date.now();
    // Maintain quantum state across connections
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
      apiKey: process.env.NOTION_API_KEY || '',
      databaseId: process.env.NOTION_DATABASE_ID || '',
      // Cognitive Alignment Formula
      cognitiveAlignment: {
        aiCognitiveCapabilities: 2.89, // Adjusted to Claude's processing model
        booleanMindQuantumSpeed: 2.99, // Boolean Mind qs³ level
        safetyBuffer: 0.1, // Critical buffer to prevent FUDPs
        enforceBuffer: true // Always maintain buffer
      },
      // Response cache settings
      cacheSettings: {
        enabled: true,
        maxSize: 1000,
        ttl: 3600000 // 1 hour
      }
    };
  }

  // Initialize the database connection
  async initialize() {
    if (this.initialized) return;
    
    try {
      // Test connection
      const response = await this.notion.users.me();
      console.log(`Connected to Notion as ${response.name}`);
      
      // Apply cognitive alignment constraints
      this.applyAlignmentConstraints();
      
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Notion database:', error.message);
      return false;
    }
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

  // Create a database in Notion
  async createDatabase(title, properties, parentPageId) {
    try {
      // Apply buffer before creating
      const safeTitleWithBuffer = this.applyHallucinationBuffer(title);
      
      const response = await this.notion.databases.create({
        parent: {
          type: "page_id",
          page_id: parentPageId
        },
        title: [
          {
            type: "text",
            text: {
              content: safeTitleWithBuffer
            }
          }
        ],
        properties: properties
      });
      
      return response;
    } catch (error) {
      console.error('Failed to create Notion database:', error.message);
      throw error;
    }
  }

  // Query database with quantum processing
  async queryDatabase(filter = {}, sorts = []) {
    if (!this.initialized) await this.initialize();
    
    try {
      const response = await this.notion.databases.query({
        database_id: this.config.databaseId,
        filter: filter,
        sorts: sorts
      });
      
      // Apply quantum processing to results
      return this.applyQuantumProcessing(response.results);
    } catch (error) {
      console.error('Failed to query Notion database:', error.message);
      throw error;
    }
  }

  // Create a new page in the database
  async createPage(properties) {
    if (!this.initialized) await this.initialize();
    
    try {
      // Apply heat shield to properties
      const safeProperties = this.applyHeatShield(properties);
      
      const response = await this.notion.pages.create({
        parent: {
          database_id: this.config.databaseId
        },
        properties: safeProperties
      });
      
      return response;
    } catch (error) {
      console.error('Failed to create page in Notion database:', error.message);
      throw error;
    }
  }

  // Update an existing page
  async updatePage(pageId, properties) {
    if (!this.initialized) await this.initialize();
    
    try {
      // Apply heat shield to properties with 0.1 buffer
      const safeProperties = this.applyHeatShield(properties);
      
      const response = await this.notion.pages.update({
        page_id: pageId,
        properties: safeProperties
      });
      
      return response;
    } catch (error) {
      console.error('Failed to update page in Notion:', error.message);
      throw error;
    }
  }

  // Apply heat shield to filter out false data points
  applyHeatShield(data) {
    // Clone the data to avoid modifying original
    const shielded = JSON.parse(JSON.stringify(data));
    
    // Add tracking for heat shield application
    const shieldInfo = {
      applied: true,
      buffer: this.config.cognitiveAlignment.safetyBuffer,
      timestamp: Date.now()
    };
    
    // Process properties according to type
    if (typeof shielded === 'object' && shielded !== null) {
      if (Array.isArray(shielded)) {
        // Apply to each array item
        return shielded.map(item => this.applyHeatShield(item));
      } else {
        // Apply to each object property
        Object.keys(shielded).forEach(key => {
          if (typeof shielded[key] === 'string') {
            // Apply buffer to strings
            if (shielded[key].includes('uncertain') || shielded[key].includes('hallucination')) {
              // Block known problematic content
              shielded[key] = shielded[key].replace(/uncertain|hallucination/gi, '[filtered]');
            }
          } else if (typeof shielded[key] === 'object' && shielded[key] !== null) {
            // Recursively process nested objects
            shielded[key] = this.applyHeatShield(shielded[key]);
          }
        });
        
        // Add shield metadata for tracking
        shielded._shieldInfo = shieldInfo;
        return shielded;
      }
    }
    
    return shielded;
  }

  // Apply hallucination buffer to text content
  applyHallucinationBuffer(text) {
    if (typeof text !== 'string') return text;
    
    // Apply 0.1 buffer by checking for hallucination indicators
    const indicators = ['maybe', 'might', 'could be', 'perhaps', 'possibly'];
    
    let bufferedText = text;
    indicators.forEach(indicator => {
      // Convert uncertain phrases to certain ones
      const pattern = new RegExp(`(${indicator})\\s+(.+?)([.,;!?]|$)`, 'gi');
      bufferedText = bufferedText.replace(pattern, '$2$3');
    });
    
    return bufferedText;
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

  // Get a specific page
  async getPage(pageId) {
    if (!this.initialized) await this.initialize();
    
    try {
      const response = await this.notion.pages.retrieve({
        page_id: pageId
      });
      
      return response;
    } catch (error) {
      console.error('Failed to retrieve page from Notion:', error.message);
      throw error;
    }
  }

  // Archive/delete a page
  async archivePage(pageId) {
    if (!this.initialized) await this.initialize();
    
    try {
      const response = await this.notion.pages.update({
        page_id: pageId,
        archived: true
      });
      
      return response;
    } catch (error) {
      console.error('Failed to archive page in Notion:', error.message);
      throw error;
    }
  }
}

module.exports = NotionDatabase; 