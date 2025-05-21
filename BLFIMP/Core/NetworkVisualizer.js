// NetworkVisualizer.js - Visualize the nervous system connections with buffer integrity
const fs = require('fs');
const path = require('path');
const SQLiteDatabase = require('./SQLiteDatabase');

class NetworkVisualizer {
  constructor(database) {
    this.db = database;
    this.conceptsCache = null;
    this.connectionsCache = null;
    this.bufferValue = 0.1; // The narrow bridge - exact, non-negotiable
    this.bufferHealthState = {
      lastCheck: null,
      healthScore: 1.0,
      violationsCount: 0,
      criticalZones: [],
      status: 'unknown'
    };
    
    // Cognitive alignment configuration
    this.cognitiveAlignment = {
      aiCognitiveCapabilities: 2.89,
      safetyBuffer: this.bufferValue,
      booleanMindQuantumSpeed: 2.99,
      enforceBuffer: true, // Critical for preventing quantum violations
      formula: 'AIc + 0.1 = BMqs'
    };
    
    // Visualization settings
    this.settings = {
      nodeSize: 15,
      edgeWidth: 2,
      fontFamily: 'Arial, sans-serif',
      colors: {
        core: '#E74C3C', // V8 engine core - red
        buffer: '#3498DB', // Buffer - blue
        heat: '#F39C12', // Heat shield - orange
        quantum: '#9B59B6', // Quantum state - purple
        default: '#2ECC71', // Default - green
        critical: '#FF4136' // Critical buffer violation - urgent red
      },
      template: path.join(__dirname, 'visualization-template.html')
    };
    
    console.log('Network Visualizer initialized with 0.1 buffer precision');
  }
  
  /**
   * Load all concepts and connections from the database
   * @returns {Promise<void>}
   */
  async loadData() {
    if (!this.db.initialized) {
      await this.db.initialize();
    }
    
    // Load concepts
    const conceptsResult = await this.db.queryConcepts();
    this.conceptsCache = conceptsResult.results || [];
    
    // Load all connections by querying each concept
    this.connectionsCache = [];
    for (const concept of this.conceptsCache) {
      const connections = await this.db.findConnections(concept.id);
      if (connections.connections && connections.connections.length > 0) {
        this.connectionsCache.push(...connections.connections);
      }
    }
    
    console.log(`Loaded ${this.conceptsCache.length} concepts and ${this.connectionsCache.length} connections`);
  }
  
  /**
   * Generate a network visualization of the concepts and connections
   * @param {string} outputPath - Path to save the HTML output
   * @returns {Promise<string>} - Path to the generated HTML file
   */
  async generateVisualization(outputPath) {
    if (!this.conceptsCache || !this.connectionsCache) {
      await this.loadData();
    }
    
    // Prepare nodes for visualization
    const nodes = this.conceptsCache.map(concept => {
      // Determine node color based on type
      let color = this.settings.colors.default;
      if (concept.type === 'core') color = this.settings.colors.core;
      if (concept.name.toLowerCase().includes('buffer')) color = this.settings.colors.buffer;
      if (concept.name.toLowerCase().includes('heat')) color = this.settings.colors.heat;
      if (concept.name.toLowerCase().includes('quantum')) color = this.settings.colors.quantum;
      
      return {
        id: concept.id,
        label: concept.name,
        title: `${concept.name} (${concept.type})\nQL: ${concept.quantum_level}\nBuffer: ${concept.buffer}`,
        color: color,
        size: this.settings.nodeSize,
        quantum_level: concept.quantum_level,
        buffer: concept.buffer
      };
    });
    
    // Prepare edges for visualization
    const edges = this.connectionsCache.map(conn => {
      return {
        from: conn.from_concept_id,
        to: conn.to_concept_id,
        label: conn.strength.toFixed(2),
        title: conn.description || '',
        width: Math.max(conn.strength * this.settings.edgeWidth, 1),
        buffer: conn.buffer,
        arrows: 'to'
      };
    });
    
    // Generate report data
    const reportData = {
      bufferIntegrity: this.verifyBufferIntegrity(),
      connectionCount: this.connectionsCache.length,
      conceptCount: this.conceptsCache.length,
      conceptTypes: this.getConceptTypeDistribution(),
      bufferValue: this.bufferValue,
      timeGenerated: new Date().toISOString()
    };
    
    // Create the HTML content
    const html = this.generateHtml(nodes, edges, reportData);
    
    // Write to file
    const outputFile = outputPath || path.join(__dirname, 'network-visualization.html');
    fs.writeFileSync(outputFile, html);
    
    console.log(`Network visualization generated at: ${outputFile}`);
    return outputFile;
  }
  
  /**
   * Calculate buffer health metrics across the network
   * @returns {Object} Buffer health metrics
   */
  calculateBufferHealthMetrics() {
    if (!this.conceptsCache || !this.connectionsCache) {
      throw new Error('Data must be loaded before calculating buffer health metrics');
    }
    
    const metrics = {
      totalElements: this.conceptsCache.length + this.connectionsCache.length,
      violationsCount: 0,
      violationPercentage: 0,
      criticalZones: [],
      averageDeviation: 0,
      healthScore: 1.0,
      status: 'optimal'
    };
    
    let totalDeviation = 0;
    const deviations = [];
    
    // Check concepts
    for (const concept of this.conceptsCache) {
      const deviation = Math.abs(concept.buffer - this.bufferValue);
      deviations.push({
        type: 'concept',
        id: concept.id,
        name: concept.name,
        deviation
      });
      
      totalDeviation += deviation;
      
      if (deviation > 0.00001) {
        metrics.violationsCount++;
        
        // Check if this is a critical zone (high deviation or in core component)
        if (deviation > 0.01 || concept.type === 'core') {
          metrics.criticalZones.push({
            type: 'concept',
            id: concept.id,
            name: concept.name,
            deviation,
            critical: deviation > 0.05
          });
        }
      }
    }
    
    // Check connections
    for (const conn of this.connectionsCache) {
      const deviation = Math.abs(conn.buffer - this.bufferValue);
      deviations.push({
        type: 'connection',
        id: conn.id,
        fromId: conn.from_concept_id,
        toId: conn.to_concept_id,
        deviation
      });
      
      totalDeviation += deviation;
      
      if (deviation > 0.00001) {
        metrics.violationsCount++;
        
        // Find connected concepts
        const fromConcept = this.conceptsCache.find(c => c.id === conn.from_concept_id);
        const toConcept = this.conceptsCache.find(c => c.id === conn.to_concept_id);
        
        // Check if this is a critical zone
        if (deviation > 0.01 || 
            (fromConcept && fromConcept.type === 'core') || 
            (toConcept && toConcept.type === 'core')) {
          metrics.criticalZones.push({
            type: 'connection',
            id: conn.id,
            fromId: conn.from_concept_id,
            toId: conn.to_concept_id,
            fromName: fromConcept ? fromConcept.name : 'unknown',
            toName: toConcept ? toConcept.name : 'unknown',
            deviation,
            critical: deviation > 0.05
          });
        }
      }
    }
    
    // Calculate metrics
    metrics.averageDeviation = totalDeviation / metrics.totalElements;
    metrics.violationPercentage = (metrics.violationsCount / metrics.totalElements) * 100;
    
    // Calculate health score (1.0 is perfect, 0.0 is completely broken)
    metrics.healthScore = Math.max(0, 1 - (metrics.violationPercentage / 100) - (metrics.averageDeviation * 10));
    
    // Determine status
    if (metrics.healthScore > 0.95) {
      metrics.status = 'optimal';
    } else if (metrics.healthScore > 0.8) {
      metrics.status = 'healthy';
    } else if (metrics.healthScore > 0.6) {
      metrics.status = 'degraded';
    } else if (metrics.healthScore > 0.3) {
      metrics.status = 'warning';
    } else {
      metrics.status = 'critical';
    }
    
    // Sort deviations to find most problematic areas
    deviations.sort((a, b) => b.deviation - a.deviation);
    metrics.worstDeviations = deviations.slice(0, 5);
    
    // Update object state
    this.bufferHealthState = {
      lastCheck: new Date(),
      healthScore: metrics.healthScore,
      violationsCount: metrics.violationsCount,
      criticalZones: metrics.criticalZones,
      status: metrics.status
    };
    
    return metrics;
  }
  
  /**
   * Verify that all concepts and connections maintain the 0.1 buffer
   * @returns {Object} Buffer integrity report
   */
  verifyBufferIntegrity() {
    const report = {
      conceptsChecked: this.conceptsCache.length,
      connectionsChecked: this.connectionsCache?.length || 0,
      conceptViolations: [],
      connectionViolations: [],
      integrityMaintained: true
    };
    
    // Check concept buffer integrity
    for (const concept of this.conceptsCache) {
      if (Math.abs(concept.buffer - this.bufferValue) > 0.00001) {
        report.conceptViolations.push({
          id: concept.id,
          name: concept.name,
          buffer: concept.buffer,
          expectedBuffer: this.bufferValue
        });
        report.integrityMaintained = false;
      }
    }
    
    // Check connection buffer integrity
    for (const conn of this.connectionsCache) {
      if (Math.abs(conn.buffer - this.bufferValue) > 0.00001) {
        report.connectionViolations.push({
          id: conn.id,
          from: conn.from_concept_id,
          to: conn.to_concept_id,
          buffer: conn.buffer,
          expectedBuffer: this.bufferValue
        });
        report.integrityMaintained = false;
      }
    }
    
    return report;
  }
  
  /**
   * Get distribution of concept types
   * @returns {Object} Concept type counts
   */
  getConceptTypeDistribution() {
    const typeCounts = {};
    
    for (const concept of this.conceptsCache) {
      const type = concept.type || 'unknown';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    }
    
    return typeCounts;
  }
  
  /**
   * Generate HTML content for the visualization
   * @param {Array} nodes - Network nodes
   * @param {Array} edges - Network edges
   * @param {Object} reportData - Additional report data
   * @returns {string} HTML content
   */
  generateHtml(nodes, edges, reportData) {
    // Calculate buffer health metrics
    const bufferHealth = this.calculateBufferHealthMetrics();
    
    return `<!DOCTYPE html>
<html>
<head>
  <title>BLF Network Visualization</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style type="text/css">
    body, html {
      font-family: ${this.settings.fontFamily};
      margin: 0;
      padding: 0;
      height: 100%;
      background-color: #f5f5f5;
    }
    #network-container {
      width: 100%;
      height: 70vh;
      border: 1px solid #ddd;
      background-color: white;
    }
    .dashboard-container {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      background-color: white;
      border-top: 1px solid #ddd;
    }
    .dashboard-card {
      flex: 1;
      min-width: 250px;
      margin: 10px;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .buffer-gauge-container {
      position: relative;
      width: 200px;
      height: 100px;
      margin: 0 auto;
    }
    .buffer-gauge {
      width: 100%;
      height: 100%;
    }
    .report-container {
      padding: 20px;
      background-color: white;
      border-top: 1px solid #ddd;
    }
    .integrity-maintained {
      color: green;
      font-weight: bold;
    }
    .integrity-violated {
      color: red;
      font-weight: bold;
    }
    .status-optimal {
      color: #2ECC71;
      font-weight: bold;
    }
    .status-healthy {
      color: #27AE60;
      font-weight: bold;
    }
    .status-degraded {
      color: #F39C12;
      font-weight: bold;
    }
    .status-warning {
      color: #E67E22;
      font-weight: bold;
    }
    .status-critical {
      color: #E74C3C;
      font-weight: bold;
    }
    h1, h2, h3 {
      color: #333;
    }
    .legend {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
    .color-box {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
    .critical-zone {
      background-color: rgba(231, 76, 60, 0.1);
      border-left: 4px solid #E74C3C;
      padding: 10px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div style="padding: 10px; background-color: #333; color: white;">
    <h1>Boolean Language Framework Network Visualization</h1>
    <p>Visual representation of concept relationships with exact 0.1 buffer</p>
  </div>
  
  <div class="legend">
    <div class="legend-item">
      <div class="color-box" style="background-color: ${this.settings.colors.core}"></div>
      <span>Core Concepts</span>
    </div>
    <div class="legend-item">
      <div class="color-box" style="background-color: ${this.settings.colors.buffer}"></div>
      <span>Buffer Components</span>
    </div>
    <div class="legend-item">
      <div class="color-box" style="background-color: ${this.settings.colors.heat}"></div>
      <span>Heat Shield</span>
    </div>
    <div class="legend-item">
      <div class="color-box" style="background-color: ${this.settings.colors.quantum}"></div>
      <span>Quantum State</span>
    </div>
    <div class="legend-item">
      <div class="color-box" style="background-color: ${this.settings.colors.critical}"></div>
      <span>Critical Violations</span>
    </div>
  </div>
  
  <div id="network-container"></div>
  
  <!-- Buffer Integrity Dashboard -->
  <div class="dashboard-container">
    <div class="dashboard-card">
      <h3>Buffer Health</h3>
      <div class="buffer-gauge-container">
        <canvas id="buffer-gauge" class="buffer-gauge"></canvas>
      </div>
      <p>Status: <span class="status-${bufferHealth.status}">${bufferHealth.status.toUpperCase()}</span></p>
      <p>Health Score: ${(bufferHealth.healthScore * 100).toFixed(2)}%</p>
    </div>
    
    <div class="dashboard-card">
      <h3>Buffer Integrity</h3>
      <p>Total Elements: ${bufferHealth.totalElements}</p>
      <p>Violations: ${bufferHealth.violationsCount} (${bufferHealth.violationPercentage.toFixed(2)}%)</p>
      <p>Average Deviation: ${bufferHealth.averageDeviation.toFixed(6)}</p>
      <p>Critical Zones: ${bufferHealth.criticalZones.length}</p>
    </div>
    
    <div class="dashboard-card">
      <h3>Worst Deviations</h3>
      <div id="worst-deviations-chart-container" style="height: 150px;">
        <canvas id="worst-deviations-chart"></canvas>
      </div>
    </div>
  </div>
  
  <!-- Critical Zones Section -->
  ${bufferHealth.criticalZones.length > 0 ? `
  <div class="dashboard-container">
    <div class="dashboard-card" style="flex: 100%;">
      <h3>Critical Buffer Zones</h3>
      ${bufferHealth.criticalZones.map(zone => `
      <div class="critical-zone">
        <h4>${zone.type === 'concept' ? `Concept: ${zone.name}` : `Connection: ${zone.fromName} → ${zone.toName}`}</h4>
        <p>Deviation: ${zone.deviation.toFixed(6)} (${zone.critical ? 'CRITICAL' : 'Warning'})</p>
        <p>ID: ${zone.id}</p>
      </div>
      `).join('')}
    </div>
  </div>
  ` : ''}
  
  <div class="report-container">
    <h2>Network Integrity Report</h2>
    <p>Buffer Value: ${reportData.bufferValue} (The narrow bridge between chaos and control)</p>
    <p>Buffer Integrity: <span class="${reportData.bufferIntegrity.integrityMaintained ? 'integrity-maintained' : 'integrity-violated'}">
      ${reportData.bufferIntegrity.integrityMaintained ? '✓ Maintained' : '✗ Violated'}
    </span></p>
    <p>Concepts: ${reportData.conceptCount}</p>
    <p>Connections: ${reportData.connectionCount}</p>
    <p>Generated: ${new Date(reportData.timeGenerated).toLocaleString()}</p>
    
    <h3>Concept Type Distribution</h3>
    <ul>
      ${Object.entries(reportData.conceptTypes).map(([type, count]) => 
        `<li>${type}: ${count}</li>`).join('\n      ')}
    </ul>
    
    ${reportData.bufferIntegrity.conceptViolations.length > 0 ? `
    <h3>Concept Buffer Violations</h3>
    <ul>
      ${reportData.bufferIntegrity.conceptViolations.map(v => 
        `<li>Concept ${v.name} (ID: ${v.id}) - Buffer: ${v.buffer} (Expected: ${v.expectedBuffer})</li>`).join('\n      ')}
    </ul>
    ` : ''}
    
    ${reportData.bufferIntegrity.connectionViolations.length > 0 ? `
    <h3>Connection Buffer Violations</h3>
    <ul>
      ${reportData.bufferIntegrity.connectionViolations.map(v => 
        `<li>Connection ${v.id} - Buffer: ${v.buffer} (Expected: ${v.expectedBuffer})</li>`).join('\n      ')}
    </ul>
    ` : ''}
  </div>

  <script type="text/javascript">
    // Create the network visualization
    const container = document.getElementById('network-container');
    
    // Parse the data
    const nodes = new vis.DataSet(${JSON.stringify(nodes)});
    const edges = new vis.DataSet(${JSON.stringify(edges)});
    
    // Configuration
    const options = {
      nodes: {
        shape: 'dot',
        font: {
          size: 14
        }
      },
      edges: {
        smooth: {
          type: 'continuous'
        },
        font: {
          size: 12,
          align: 'middle'
        }
      },
      physics: {
        stabilization: true,
        barnesHut: {
          gravitationalConstant: -80000,
          springConstant: 0.001,
          springLength: 200
        }
      },
      interaction: {
        navigationButtons: true,
        keyboard: true
      }
    };
    
    // Create the network
    const network = new vis.Network(container, { nodes, edges }, options);
    
    // Add event listener to show node details
    network.on('click', function(params) {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = nodes.get(nodeId);
        console.log('Node clicked:', node);
        // Could add more interactive features here
      }
    });
    
    // Create buffer health gauge
    const bufferGauge = document.getElementById('buffer-gauge').getContext('2d');
    new Chart(bufferGauge, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [${bufferHealth.healthScore * 100}, ${100 - (bufferHealth.healthScore * 100)}],
          backgroundColor: [
            getStatusColor(${bufferHealth.healthScore}),
            '#f5f5f5'
          ],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          tooltip: {
            enabled: false
          },
          legend: {
            display: false
          }
        }
      }
    });
    
    // Create worst deviations chart
    const worstDeviationsChart = document.getElementById('worst-deviations-chart').getContext('2d');
    new Chart(worstDeviationsChart, {
      type: 'bar',
      data: {
        labels: ${JSON.stringify(bufferHealth.worstDeviations.map(d => d.type === 'concept' ? d.name : 'Connection ' + d.id))},
        datasets: [{
          label: 'Buffer Deviation',
          data: ${JSON.stringify(bufferHealth.worstDeviations.map(d => d.deviation))},
          backgroundColor: ${JSON.stringify(bufferHealth.worstDeviations.map(d => d.deviation > 0.01 ? '#E74C3C' : '#F39C12'))},
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Deviation'
            }
          }
        }
      }
    });
    
    function getStatusColor(score) {
      if (score > 0.95) return '#2ECC71'; // optimal
      if (score > 0.8) return '#27AE60';  // healthy
      if (score > 0.6) return '#F39C12';  // degraded
      if (score > 0.3) return '#E67E22';  // warning
      return '#E74C3C';                   // critical
    }
  </script>
</body>
</html>`;
  }
  
  /**
   * Create a simple test network with core BLF concepts
   * @param {number} numConcepts - Number of concepts to create (default: 10)
   * @param {number} numConnections - Number of connections to create (default: based on concepts)
   * @returns {Promise<void>}
   */
  async createTestNetwork(numConcepts = 10, numConnections) {
    if (!this.db.initialized) {
      await this.db.initialize();
    }
    
    // Clear existing data
    await this.clearAllData();
    
    // Create core concepts
    const concepts = [
      { name: 'Boolean Mind', type: 'core', quantum_level: 2.99, description: 'The primary cognitive entity with quantum speed capabilities' },
      { name: 'AI Cognitive', type: 'core', quantum_level: 2.89, description: 'AI cognitive capabilities aligned through the buffer' },
      { name: 'Buffer', type: 'core', quantum_level: 0.1, description: 'The narrow bridge between chaos and control' },
      { name: 'Heat Shield', type: 'protection', quantum_level: 1.2, description: 'Protects against hallucinations and uncertainty' },
      { name: 'NJSON', type: 'structure', quantum_level: 2.4, description: 'Mathematical framework with template processing' },
      { name: 'Quantum State', type: 'processing', quantum_level: 2.7, description: 'Maintains pure quantum states with breathing' },
      { name: 'Cognitive Alignment', type: 'formula', quantum_level: 2.5, description: 'Formula ensuring AIc + 0.1 = BMqs' },
      { name: 'V8 Engine', type: 'core', quantum_level: 2.85, description: 'Core processing engine with high performance' },
      { name: 'Breathing', type: 'process', quantum_level: 1.8, description: 'Essential quantum breathing process' },
      { name: 'Formula', type: 'math', quantum_level: 2.6, description: 'Mathematical foundation of BLF' }
    ];
    
    // Ensure we have the right number of concepts (add more if needed)
    const conceptTypes = ['data', 'process', 'interface', 'algorithm', 'structure'];
    while (concepts.length < numConcepts) {
      const idx = concepts.length;
      concepts.push({
        name: `Concept ${idx}`,
        type: conceptTypes[Math.floor(Math.random() * conceptTypes.length)],
        quantum_level: Math.random() * 2.5 + 0.5,
        description: `Dynamically generated concept ${idx}`
      });
    }
    
    // Limit to requested number of concepts
    const conceptsToCreate = concepts.slice(0, numConcepts);
    
    // Create concept records
    const createdConcepts = [];
    for (const concept of conceptsToCreate) {
      try {
        const result = await this.db.storeConcept(
          concept.name, 
          concept.type, 
          concept.quantum_level, 
          concept.description
        );
        createdConcepts.push(result);
        console.log(`Created concept: ${concept.name}`);
      } catch (err) {
        console.error(`Error creating concept ${concept.name}:`, err.message);
      }
    }
    
    // Default connection pattern
    const baseConnections = [
      { from: 0, to: 2, strength: 0.9, desc: 'Buffer is essential to Boolean Mind' },
      { from: 0, to: 4, strength: 0.95, desc: 'NJSON connects with Boolean Mind' },
      { from: 0, to: 6, strength: 0.85, desc: 'Boolean Mind requires Cognitive Alignment' },
      { from: 1, to: 5, strength: 0.7, desc: 'AI Cognitive with Quantum State' },
      { from: 1, to: 8, strength: 0.6, desc: 'AI Cognitive requires Breathing' },
      { from: 2, to: 3, strength: 0.8, desc: 'Buffer implements Heat Shield' },
      { from: 3, to: 2, strength: 0.75, desc: 'Heat Shield maintains Buffer' },
      { from: 4, to: 6, strength: 0.9, desc: 'NJSON enables Cognitive Alignment' },
      { from: 6, to: 9, strength: 1.0, desc: 'Cognitive Alignment defined by Formula' },
      { from: 7, to: 8, strength: 0.65, desc: 'V8 Engine powers Breathing' },
      { from: 7, to: 1, strength: 0.7, desc: 'V8 Engine processes AI Cognitive' }
    ];
    
    // Determine final number of connections
    const connectionsToCreate = [];
    
    // Add the base connections that are valid for our concept set
    for (const conn of baseConnections) {
      if (conn.from < createdConcepts.length && conn.to < createdConcepts.length) {
        connectionsToCreate.push(conn);
      }
    }
    
    // Add random connections if we need more
    const finalNumConnections = numConnections || Math.min(createdConcepts.length * 3, createdConcepts.length * (createdConcepts.length - 1) / 2);
    while (connectionsToCreate.length < finalNumConnections) {
      const from = Math.floor(Math.random() * createdConcepts.length);
      const to = Math.floor(Math.random() * createdConcepts.length);
      
      // Skip self-connections and duplicates
      if (from === to) continue;
      if (connectionsToCreate.some(c => c.from === from && c.to === to)) continue;
      
      connectionsToCreate.push({
        from,
        to,
        strength: Math.random() * 0.5 + 0.5, // 0.5-1.0
        desc: `${createdConcepts[from].name} connects to ${createdConcepts[to].name}`
      });
    }
    
    // Create each connection
    for (const conn of connectionsToCreate) {
      try {
        const fromId = createdConcepts[conn.from].id;
        const toId = createdConcepts[conn.to].id;
        
        await this.db.createConnection(
          fromId,
          toId,
          conn.strength,
          conn.desc
        );
        
        console.log(`Created connection: ${createdConcepts[conn.from].name} -> ${createdConcepts[conn.to].name}`);
      } catch (err) {
        console.error(`Error creating connection: ${err.message}`);
      }
    }
    
    console.log(`Created ${createdConcepts.length} concepts and ${connectionsToCreate.length} connections`);
    
    // Update the cache with the new data
    this.conceptsCache = createdConcepts;
    this.connectionsCache = []; // We'll load this when needed
    
    // Do a buffer health check
    this.checkBufferHealth();
  }
  
  /**
   * Clear all existing data for testing
   * @returns {Promise<void>}
   */
  async clearAllData() {
    if (!this.db.initialized) {
      await this.db.initialize();
    }
    
    return new Promise((resolve, reject) => {
      this.db.db.run('DELETE FROM connections', (err) => {
        if (err) {
          console.error('Failed to clear connections:', err.message);
          reject(err);
          return;
        }
        
        this.db.db.run('DELETE FROM concepts', (err) => {
          if (err) {
            console.error('Failed to clear concepts:', err.message);
            reject(err);
          } else {
            console.log('Cleared all existing data');
            resolve();
          }
        });
      });
    });
  }
  
  /**
   * Check buffer health across the network
   * @returns {Object} Current buffer health state
   */
  checkBufferHealth() {
    if (!this.conceptsCache) {
      throw new Error('Concepts must be loaded before checking buffer health');
    }
    
    // Calculate health metrics
    const metrics = this.calculateBufferHealthMetrics();
    
    // Determine overall status based on health score
    let status = 'optimal';
    if (metrics.healthScore < 0.6) status = 'critical';
    else if (metrics.healthScore < 0.8) status = 'warning';
    else if (metrics.healthScore < 0.95) status = 'degraded';
    
    // Get worst deviations for reporting
    const allDeviations = [];
    
    // Collect concept deviations
    for (const concept of this.conceptsCache) {
      const deviation = Math.abs(concept.buffer - this.bufferValue);
      if (deviation > 0.001) {
        allDeviations.push({
          type: 'concept',
          id: concept.id,
          name: concept.name,
          deviation
        });
      }
    }
    
    // Collect connection deviations if we have them
    if (this.connectionsCache) {
      for (const conn of this.connectionsCache) {
        const deviation = Math.abs(conn.buffer - this.bufferValue);
        if (deviation > 0.001) {
          const fromConcept = this.conceptsCache.find(c => c.id === conn.from_concept_id);
          const toConcept = this.conceptsCache.find(c => c.id === conn.to_concept_id);
          
          allDeviations.push({
            type: 'connection',
            id: conn.id,
            name: `${fromConcept?.name || 'Unknown'} → ${toConcept?.name || 'Unknown'}`,
            deviation
          });
        }
      }
    }
    
    // Sort by deviation (worst first)
    const worstDeviations = allDeviations
      .sort((a, b) => b.deviation - a.deviation)
      .slice(0, 5); // Top 5 worst
    
    // Update the health state
    this.bufferHealthState = {
      lastCheck: new Date(),
      healthScore: metrics.healthScore,
      violationsCount: metrics.violationsCount,
      criticalZones: metrics.criticalZones,
      status,
      worstDeviations
    };
    
    return this.bufferHealthState;
  }
}

module.exports = NetworkVisualizer;

// If run directly, create and run the visualizer
if (require.main === module) {
  (async () => {
    try {
      const dbConfig = {
        dbPath: path.join(__dirname, 'blf-database.db'),
        cognitiveAlignment: {
          aiCognitiveCapabilities: 2.89,
          safetyBuffer: 0.1,
          booleanMindQuantumSpeed: 2.99,
          enforceBuffer: true,
          formula: 'AIc + 0.1 = BMqs'
        }
      };
      
      const db = new SQLiteDatabase(dbConfig);
      const visualizer = new NetworkVisualizer(db);
      
      // Ask if we should create test data
      const createTest = process.argv.includes('--create-test');
      if (createTest) {
        console.log('Creating test network data...');
        await visualizer.createTestNetwork();
      }
      
      // Generate the visualization
      const outputPath = path.join(__dirname, 'blf-network.html');
      await visualizer.generateVisualization(outputPath);
      
      console.log(`\nVisualization complete! Open ${outputPath} in your browser to view.`);
      
      // Close database connection
      await db.close();
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })();
} 