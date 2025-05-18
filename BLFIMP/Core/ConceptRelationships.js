// ConceptRelationships.js - Implements the nervous system connections between concepts
class ConceptRelationships {
  constructor(db) {
    this.db = db; // SQLite database instance
    this.relationships = [];
    this.relationshipTypes = [
      'Derives', // Concept A derives from Concept B
      'Amplifies', // Concept A amplifies the effect of Concept B
      'Inhibits', // Concept A inhibits or reduces Concept B
      'Transforms', // Concept A transforms into Concept B
      'Resonates', // Concept A and B resonate with each other
      'Shadows', // Concept A is the shadow aspect of Concept B
    ];
  }

  async initialize() {
    try {
      // Create relationships table if it doesn't exist
      await this.executeRun(`
        CREATE TABLE IF NOT EXISTS concept_relationships (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          source_id INTEGER NOT NULL,
          target_id INTEGER NOT NULL,
          relationship_type TEXT NOT NULL,
          strength REAL NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (source_id) REFERENCES concepts (id),
          FOREIGN KEY (target_id) REFERENCES concepts (id),
          UNIQUE(source_id, target_id, relationship_type)
        )
      `);
      console.log('Concept relationships table initialized');
      
      // Load existing relationships
      await this.loadRelationships();
      
      return true;
    } catch (error) {
      console.error('Error initializing relationships:', error);
      throw error;
    }
  }

  async loadRelationships() {
    try {
      const rows = await this.executeAll(`
        SELECT r.*, 
               s.name as source_name, s.quantum_level as source_level,
               t.name as target_name, t.quantum_level as target_level
        FROM concept_relationships r
        JOIN concepts s ON r.source_id = s.id
        JOIN concepts t ON r.target_id = t.id
        ORDER BY r.source_id, r.target_id
      `);
      
      this.relationships = rows.map(row => ({
        id: row.id,
        sourceId: row.source_id,
        sourceName: row.source_name,
        sourceLevel: row.source_level,
        targetId: row.target_id,
        targetName: row.target_name,
        targetLevel: row.target_level,
        type: row.relationship_type,
        strength: row.strength,
        description: row.description,
        createdAt: row.created_at
      }));
      
      return this.relationships;
    } catch (error) {
      console.error('Error loading relationships:', error);
      throw error;
    }
  }

  async createRelationship(sourceId, targetId, type, strength, description = '') {
    try {
      // Validate relationship type
      if (!this.relationshipTypes.includes(type)) {
        throw new Error(`Invalid relationship type. Allowed types: ${this.relationshipTypes.join(', ')}`);
      }
      
      // Validate strength (0.1 to 1.0)
      strength = parseFloat(strength);
      if (isNaN(strength) || strength < 0.1 || strength > 1.0) {
        throw new Error('Relationship strength must be between 0.1 and 1.0');
      }
      
      // Check if both concepts exist
      const sourceExists = await this.conceptExists(sourceId);
      const targetExists = await this.conceptExists(targetId);
      
      if (!sourceExists || !targetExists) {
        throw new Error('One or both concepts do not exist');
      }
      
      // Check if relationship already exists
      const existingRelationship = await this.executeGet(`
        SELECT id FROM concept_relationships 
        WHERE source_id = ? AND target_id = ? AND relationship_type = ?
      `, [sourceId, targetId, type]);
      
      let id;
      if (existingRelationship) {
        // Update existing relationship
        await this.executeRun(`
          UPDATE concept_relationships 
          SET strength = ?, description = ? 
          WHERE id = ?
        `, [strength, description, existingRelationship.id]);
        id = existingRelationship.id;
        
        const updated = await this.getRelationshipById(id);
        console.log(`Updated existing relationship: ${updated.sourceName} ${type} ${updated.targetName}`);
        return updated;
      } else {
        // Create new relationship
        const result = await this.executeRun(`
          INSERT INTO concept_relationships (source_id, target_id, relationship_type, strength, description)
          VALUES (?, ?, ?, ?, ?)
        `, [sourceId, targetId, type, strength, description]);
        
        // Reload relationships to get the new one with complete info
        await this.loadRelationships();
        id = result.lastID;
        const newRelationship = this.relationships.find(r => r.id === id);
        
        console.log(`Created new relationship: ${newRelationship.sourceName} ${type} ${newRelationship.targetName}`);
        return newRelationship;
      }
    } catch (error) {
      console.error('Error creating relationship:', error);
      throw error;
    }
  }

  async getRelationshipById(id) {
    try {
      const row = await this.executeGet(`
        SELECT r.*, 
               s.name as source_name, s.quantum_level as source_level,
               t.name as target_name, t.quantum_level as target_level
        FROM concept_relationships r
        JOIN concepts s ON r.source_id = s.id
        JOIN concepts t ON r.target_id = t.id
        WHERE r.id = ?
      `, [id]);
      
      if (!row) return null;
      
      return {
        id: row.id,
        sourceId: row.source_id,
        sourceName: row.source_name,
        sourceLevel: row.source_level,
        targetId: row.target_id,
        targetName: row.target_name,
        targetLevel: row.target_level,
        type: row.relationship_type,
        strength: row.strength,
        description: row.description,
        createdAt: row.created_at
      };
    } catch (error) {
      console.error('Error getting relationship:', error);
      throw error;
    }
  }

  async getRelationshipsForConcept(conceptId) {
    try {
      // Get all relationships where the concept is either source or target
      await this.loadRelationships();
      
      return this.relationships.filter(r => 
        r.sourceId === conceptId || r.targetId === conceptId
      );
    } catch (error) {
      console.error('Error getting relationships for concept:', error);
      throw error;
    }
  }

  async deleteRelationship(id) {
    try {
      const relationship = await this.getRelationshipById(id);
      if (!relationship) {
        throw new Error(`Relationship with ID ${id} not found`);
      }
      
      await this.executeRun('DELETE FROM concept_relationships WHERE id = ?', [id]);
      
      // Remove from local cache
      this.relationships = this.relationships.filter(r => r.id !== id);
      
      console.log(`Deleted relationship: ${relationship.sourceName} ${relationship.type} ${relationship.targetName}`);
      return relationship;
    } catch (error) {
      console.error('Error deleting relationship:', error);
      throw error;
    }
  }

  async conceptExists(id) {
    try {
      const result = await this.executeGet('SELECT id FROM concepts WHERE id = ?', [id]);
      return !!result;
    } catch (error) {
      console.error('Error checking concept existence:', error);
      throw error;
    }
  }

  async analyzeRelationshipNetwork() {
    try {
      await this.loadRelationships();
      
      if (this.relationships.length === 0) {
        return {
          totalRelationships: 0,
          networkDensity: 0,
          centralConcepts: [],
          networkClusters: [],
          averageStrength: 0
        };
      }
      
      // Get all unique concept IDs in the network
      const conceptIds = new Set();
      this.relationships.forEach(r => {
        conceptIds.add(r.sourceId);
        conceptIds.add(r.targetId);
      });
      
      const totalConcepts = conceptIds.size;
      const totalRelationships = this.relationships.length;
      
      // Calculate network density (actual connections / possible connections)
      // In a directed graph, max connections = n(n-1) where n is node count
      const maxPossibleRelationships = totalConcepts * (totalConcepts - 1);
      const networkDensity = maxPossibleRelationships > 0 
        ? (totalRelationships / maxPossibleRelationships)
        : 0;
      
      // Find central concepts (most connections)
      const connectionCounts = {};
      conceptIds.forEach(id => { connectionCounts[id] = 0; });
      
      this.relationships.forEach(r => {
        connectionCounts[r.sourceId] = (connectionCounts[r.sourceId] || 0) + 1;
        connectionCounts[r.targetId] = (connectionCounts[r.targetId] || 0) + 1;
      });
      
      // Sort concepts by connection count
      const sortedByConnections = Object.entries(connectionCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([id, count]) => ({
          id: parseInt(id),
          connections: count,
          name: this.getConceptNameById(parseInt(id))
        }));
      
      // Top 3 or fewer central concepts
      const centralConcepts = sortedByConnections.slice(0, 3);
      
      // Calculate average relationship strength
      const averageStrength = this.relationships.reduce(
        (sum, r) => sum + r.strength, 0
      ) / totalRelationships;
      
      // Identify relationship clusters (simplified approach)
      const clusters = this.identifyClusters();
      
      return {
        totalRelationships,
        networkDensity,
        centralConcepts,
        networkClusters: clusters,
        averageStrength
      };
    } catch (error) {
      console.error('Error analyzing relationship network:', error);
      throw error;
    }
  }

  getConceptNameById(id) {
    // Find concept name from relationships
    const asSource = this.relationships.find(r => r.sourceId === id);
    if (asSource) return asSource.sourceName;
    
    const asTarget = this.relationships.find(r => r.targetId === id);
    if (asTarget) return asTarget.targetName;
    
    return `Concept ${id}`;
  }

  identifyClusters() {
    // A simple approach to find clusters of highly connected concepts
    // We'll use a basic grouping by relationship type for now
    
    const clustersByType = {};
    
    this.relationships.forEach(r => {
      if (!clustersByType[r.type]) {
        clustersByType[r.type] = {
          type: r.type,
          concepts: new Set(),
          relationships: []
        };
      }
      
      clustersByType[r.type].concepts.add(r.sourceId);
      clustersByType[r.type].concepts.add(r.targetId);
      clustersByType[r.type].relationships.push(r);
    });
    
    // Convert to array and format for return
    return Object.values(clustersByType).map(cluster => ({
      type: cluster.type,
      conceptCount: cluster.concepts.size,
      relationshipCount: cluster.relationships.length,
      averageStrength: cluster.relationships.reduce((sum, r) => sum + r.strength, 0) / 
                       cluster.relationships.length
    }));
  }
  
  // Helper methods to interact with SQLite database
  executeRun(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  }
  
  executeGet(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    });
  }
  
  executeAll(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  }
}

module.exports = ConceptRelationships; 