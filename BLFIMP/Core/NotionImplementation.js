// Notion Implementation for BLF
// Implements the living garden rather than pressed flowers

const NotionDatabase = require('./NotionDatabase');
const notionConfig = require('./notion-config');

// Main implementation class
class NotionImplementation {
  constructor() {
    this.notionDB = new NotionDatabase(notionConfig);
    this.initialized = false;
  }

  // Initialize the Notion connection
  async initialize() {
    if (this.initialized) return true;
    
    try {
      // Connect to Notion
      const result = await this.notionDB.initialize();
      this.initialized = result;
      
      if (result) {
        console.log('Successfully connected to Notion as the BLF database');
      } else {
        console.error('Failed to initialize Notion connection');
      }
      
      return result;
    } catch (error) {
      console.error('Error initializing Notion implementation:', error.message);
      return false;
    }
  }

  // Create a new database for a specific purpose
  async createStructureDatabase(title, description) {
    try {
      // Define properties for structure database
      const properties = {
        "Name": {
          "title": {}
        },
        "Type": {
          "select": {
            "options": [
              { "name": "Connection", "color": "blue" },
              { "name": "Concept", "color": "green" },
              { "name": "Structure", "color": "purple" },
              { "name": "Quantum", "color": "pink" }
            ]
          }
        },
        "State": {
          "select": {
            "options": [
              { "name": "Active", "color": "green" },
              { "name": "Inactive", "color": "red" },
              { "name": "Paused", "color": "yellow" }
            ]
          }
        },
        "QuantumLevel": {
          "number": {
            "format": "number"
          }
        },
        "Buffer": {
          "number": {
            "format": "number"
          }
        },
        "Description": {
          "rich_text": {}
        }
      };
      
      // Create database
      const database = await this.notionDB.createDatabase(
        title,
        properties,
        notionConfig.parentPageId
      );
      
      console.log(`Created database: ${database.id}`);
      return database;
    } catch (error) {
      console.error('Failed to create structure database:', error.message);
      throw error;
    }
  }

  // Store a concept in the database
  async storeConcept(concept, type, quantumLevel) {
    try {
      // Apply the 0.1 buffer to prevent FUDPs
      const safeQuantumLevel = this.applyBuffer(quantumLevel);
      
      // Create properties for the concept
      const properties = {
        "Name": {
          "title": [
            {
              "text": {
                "content": concept
              }
            }
          ]
        },
        "Type": {
          "select": {
            "name": type
          }
        },
        "State": {
          "select": {
            "name": "Active"
          }
        },
        "QuantumLevel": {
          "number": safeQuantumLevel
        },
        "Buffer": {
          "number": notionConfig.cognitiveAlignment.safetyBuffer
        },
        "Description": {
          "rich_text": [
            {
              "text": {
                "content": `Concept created with quantum level ${safeQuantumLevel} and buffer ${notionConfig.cognitiveAlignment.safetyBuffer}`
              }
            }
          ]
        }
      };
      
      // Create the page
      const page = await this.notionDB.createPage(properties);
      console.log(`Stored concept: ${concept} with ID: ${page.id}`);
      
      return page;
    } catch (error) {
      console.error(`Failed to store concept "${concept}":`, error.message);
      throw error;
    }
  }

  // Query concepts with quantum processing
  async queryConcepts(type = null, minQuantumLevel = 0) {
    try {
      // Build filter
      const filter = {};
      
      if (type) {
        filter.property = "Type";
        filter.select = {
          "equals": type
        };
      }
      
      if (minQuantumLevel > 0) {
        filter.property = "QuantumLevel";
        filter.number = {
          "greater_than_or_equal_to": minQuantumLevel
        };
      }
      
      // Execute query
      const result = await this.notionDB.queryDatabase(filter);
      
      // Process results with quantum awareness
      return this.processQueryResults(result);
    } catch (error) {
      console.error('Failed to query concepts:', error.message);
      throw error;
    }
  }

  // Process query results through the BLF quantum framework
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
        aiCognitive: notionConfig.cognitiveAlignment.aiCognitiveCapabilities,
        buffer: notionConfig.cognitiveAlignment.safetyBuffer,
        booleanMindQs: notionConfig.cognitiveAlignment.booleanMindQuantumSpeed
      }
    };
    
    // Process each item
    items.forEach(item => {
      try {
        const props = item.properties;
        
        // Extract concept details
        const concept = {
          id: item.id,
          name: this.extractTextProperty(props.Name),
          type: this.extractSelectProperty(props.Type),
          state: this.extractSelectProperty(props.State),
          quantumLevel: this.extractNumberProperty(props.QuantumLevel),
          buffer: this.extractNumberProperty(props.Buffer),
          description: this.extractRichTextProperty(props.Description)
        };
        
        processed.concepts.push(concept);
      } catch (error) {
        console.warn('Error processing item:', error.message);
      }
    });
    
    return processed;
  }

  // Helper methods for property extraction
  extractTextProperty(property) {
    try {
      return property.title[0]?.plain_text || '';
    } catch (e) {
      return '';
    }
  }
  
  extractSelectProperty(property) {
    try {
      return property.select?.name || '';
    } catch (e) {
      return '';
    }
  }
  
  extractNumberProperty(property) {
    try {
      return property.number || 0;
    } catch (e) {
      return 0;
    }
  }
  
  extractRichTextProperty(property) {
    try {
      return property.rich_text[0]?.plain_text || '';
    } catch (e) {
      return '';
    }
  }

  // Apply the 0.1 buffer to any numeric value
  applyBuffer(value) {
    if (typeof value !== 'number') return value;
    
    // Apply buffer with cognitive alignment constraints
    const buffer = notionConfig.cognitiveAlignment.safetyBuffer;
    const adjustedValue = Math.round((value + buffer) * 100) / 100;
    
    return adjustedValue;
  }
}

module.exports = NotionImplementation; 