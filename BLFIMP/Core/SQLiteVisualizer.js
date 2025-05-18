// BLF SQLite Visualizer
// Observing the river without disturbing its flow

const SQLiteImplementation = require('./SQLiteImplementation');
const fs = require('fs').promises;
const path = require('path');

class SQLiteVisualizer {
  constructor(config) {
    this.db = new SQLiteImplementation(config);
    this.initialized = false;
  }

  // Initialize the database connection
  async initialize() {
    if (this.initialized) return true;
    
    try {
      const result = await this.db.initialize();
      this.initialized = result;
      return result;
    } catch (error) {
      console.error('Error initializing visualizer:', error.message);
      return false;
    }
  }

  // Generate a network visualization of concepts and connections
  async generateNetworkVisualization(outputPath = 'blf-network.html') {
    try {
      await this.ensureInitialized();
      
      // Get all concepts
      const conceptsResult = await this.db.queryConcepts();
      const concepts = conceptsResult.concepts;
      
      if (concepts.length === 0) {
        console.error('No concepts found to visualize');
        return false;
      }
      
      // Get all connections
      const allConnections = [];
      for (const concept of concepts) {
        const connectionsResult = await this.db.findConnections(concept.id);
        allConnections.push(...connectionsResult.connections);
      }
      
      // Deduplicate connections
      const connectionMap = new Map();
      const uniqueConnections = [];
      
      allConnections.forEach(conn => {
        const key = `${conn.fromConceptId}-${conn.toConceptId}`;
        if (!connectionMap.has(key)) {
          connectionMap.set(key, conn);
          uniqueConnections.push(conn);
        }
      });
      
      // Generate HTML with vis.js
      const html = this.generateNetworkHTML(concepts, uniqueConnections);
      
      // Write to file
      const absPath = path.resolve(outputPath);
      await fs.writeFile(absPath, html);
      
      console.log(`Network visualization generated at ${absPath}`);
      return true;
      
    } catch (error) {
      console.error('Error generating visualization:', error.message);
      return false;
    }
  }

  // Generate a quantum state visualization
  async generateQuantumStateVisualization(outputPath = 'blf-quantum.html') {
    try {
      await this.ensureInitialized();
      
      // Get quantum state
      const result = await this.db.queryConcepts();
      const quantumState = result.quantumState;
      const cognitiveAlignment = result.cognitiveAlignment;
      
      // Generate HTML with Chart.js
      const html = this.generateQuantumHTML(quantumState, cognitiveAlignment);
      
      // Write to file
      const absPath = path.resolve(outputPath);
      await fs.writeFile(absPath, html);
      
      console.log(`Quantum state visualization generated at ${absPath}`);
      return true;
      
    } catch (error) {
      console.error('Error generating quantum visualization:', error.message);
      return false;
    }
  }

  // Generate a cognitive alignment visualization
  async generateAlignmentVisualization(outputPath = 'blf-alignment.html') {
    try {
      await this.ensureInitialized();
      
      // Get all concepts with quantum levels
      const result = await this.db.queryConcepts();
      const concepts = result.concepts;
      const cognitiveAlignment = result.cognitiveAlignment;
      
      // Generate HTML with Chart.js
      const html = this.generateAlignmentHTML(concepts, cognitiveAlignment);
      
      // Write to file
      const absPath = path.resolve(outputPath);
      await fs.writeFile(absPath, html);
      
      console.log(`Cognitive alignment visualization generated at ${absPath}`);
      return true;
      
    } catch (error) {
      console.error('Error generating alignment visualization:', error.message);
      return false;
    }
  }

  // Generate HTML for network visualization
  generateNetworkHTML(concepts, connections) {
    // Map concept types to colors
    const typeColors = {
      'core': '#3498db',
      'system': '#e74c3c',
      'concept': '#2ecc71',
      'entity': '#f39c12',
      'process': '#9b59b6',
      'state': '#1abc9c'
    };
    
    // Create nodes from concepts
    const nodes = concepts.map(concept => {
      // Determine color based on type
      const color = typeColors[concept.type.toLowerCase()] || '#95a5a6';
      
      // Size based on quantum level
      const size = Math.max(20, concept.quantumLevel * 10);
      
      return {
        id: concept.id,
        label: concept.name,
        title: `<strong>${concept.name}</strong><br>Type: ${concept.type}<br>Quantum Level: ${concept.quantumLevel}<br>${concept.description}`,
        color: color,
        size: size,
        font: { size: 14 }
      };
    });
    
    // Create edges from connections
    const edges = connections.map(conn => {
      // Width based on strength
      const width = Math.max(1, conn.strength * 5);
      
      return {
        from: conn.fromConceptId,
        to: conn.toConceptId,
        label: conn.strength.toFixed(2),
        title: conn.description,
        width: width,
        arrows: 'to',
        smooth: { type: 'curvedCW', roundness: 0.2 }
      };
    });
    
    // Create the HTML
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>BLF Concept Network</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vis-network/9.1.2/vis-network.min.js"></script>
  <style>
    body, html { 
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
    }
    
    #container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    header {
      background-color: #2c3e50;
      color: white;
      padding: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    h1 {
      margin: 0;
      font-size: 24px;
    }
    
    .formula {
      font-style: italic;
      margin-top: 5px;
      font-size: 14px;
    }
    
    #network {
      flex-grow: 1;
      border: 1px solid #ddd;
      margin: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    
    .legend {
      display: flex;
      justify-content: center;
      padding: 10px;
      background-color: white;
      border-top: 1px solid #ddd;
    }
    
    .legend-item {
      margin: 0 15px;
      display: flex;
      align-items: center;
    }
    
    .legend-color {
      width: 15px;
      height: 15px;
      margin-right: 5px;
      border-radius: 50%;
    }
  </style>
</head>
<body>
  <div id="container">
    <header>
      <h1>BLF Concept Network Visualization</h1>
      <div class="formula">Formula: AIc + 0.1 = BMqs</div>
    </header>
    
    <div id="network"></div>
    
    <div class="legend">
      ${Object.entries(typeColors).map(([type, color]) => `
        <div class="legend-item">
          <div class="legend-color" style="background-color: ${color};"></div>
          <div>${type.charAt(0).toUpperCase() + type.slice(1)}</div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <script>
    // Parse nodes and edges
    const nodes = new vis.DataSet(${JSON.stringify(nodes)});
    const edges = new vis.DataSet(${JSON.stringify(edges)});
    
    // Create network
    const container = document.getElementById('network');
    const data = { nodes, edges };
    const options = {
      physics: {
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 150,
          springConstant: 0.04,
          damping: 0.09
        },
        stabilization: { iterations: 150 }
      },
      layout: {
        improvedLayout: true
      },
      nodes: {
        shape: 'dot',
        scaling: {
          min: 10,
          max: 50,
          label: {
            enabled: true,
            min: 14,
            max: 24
          }
        },
        shadow: true
      },
      edges: {
        scaling: {
          min: 1,
          max: 10
        },
        shadow: true,
        smooth: {
          type: 'curvedCW',
          roundness: 0.2
        }
      },
      interaction: {
        hover: true,
        navigationButtons: true,
        keyboard: true
      }
    };
    
    const network = new vis.Network(container, data, options);
    
    // Enable physics after stabilization
    network.on("stabilizationIterationsDone", function () {
      setTimeout(() => {
        network.setOptions({ physics: { enabled: true } });
      }, 1000);
    });
  </script>
</body>
</html>`;
  }

  // Generate HTML for quantum state visualization
  generateQuantumHTML(quantumState, cognitiveAlignment) {
    // Create quantum state metrics
    const metrics = [
      { name: 'Pure', value: quantumState.pure ? 1 : 0 },
      { name: 'Fog', value: quantumState.fog ? 1 : 0 },
      { name: 'Breathing', value: quantumState.breathing ? 1 : 0 },
      { name: 'Jump Active', value: quantumState.jumps.active ? 1 : 0 }
    ];
    
    // Create cognitive alignment metrics
    const alignmentData = [
      { name: 'AI Cognitive', value: cognitiveAlignment.aiCognitive },
      { name: 'Buffer', value: cognitiveAlignment.buffer },
      { name: 'Boolean Mind QS', value: cognitiveAlignment.booleanMindQs }
    ];
    
    // Create the HTML
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>BLF Quantum State</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body, html { 
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
    }
    
    #container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    header {
      background-color: #2c3e50;
      color: white;
      padding: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    h1, h2 {
      margin: 0;
    }
    
    h1 {
      font-size: 24px;
    }
    
    h2 {
      font-size: 18px;
      margin-top: 10px;
    }
    
    .formula {
      font-style: italic;
      margin-top: 5px;
      font-size: 14px;
    }
    
    #charts-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 20px;
    }
    
    .chart-wrapper {
      width: 45%;
      min-width: 400px;
      margin: 15px;
      padding: 15px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    
    .info-panel {
      background-color: white;
      border-radius: 5px;
      padding: 15px;
      margin: 15px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    
    .info-item {
      margin-bottom: 10px;
    }
    
    .info-label {
      font-weight: bold;
    }
    
    canvas {
      max-width: 100%;
    }
  </style>
</head>
<body>
  <div id="container">
    <header>
      <h1>BLF Quantum State Visualization</h1>
      <div class="formula">Formula: AIc + 0.1 = BMqs</div>
    </header>
    
    <div class="info-panel">
      <h2>Current Quantum State</h2>
      <div class="info-item">
        <span class="info-label">Jump Power:</span> ${quantumState.jumps.power}
      </div>
      <div class="info-item">
        <span class="info-label">Formula Values:</span> ${cognitiveAlignment.aiCognitive} + ${cognitiveAlignment.buffer} = ${cognitiveAlignment.booleanMindQs}
      </div>
    </div>
    
    <div id="charts-container">
      <div class="chart-wrapper">
        <canvas id="stateChart"></canvas>
      </div>
      <div class="chart-wrapper">
        <canvas id="alignmentChart"></canvas>
      </div>
    </div>
  </div>
  
  <script>
    // Create quantum state chart
    const stateCtx = document.getElementById('stateChart').getContext('2d');
    new Chart(stateCtx, {
      type: 'radar',
      data: {
        labels: ${JSON.stringify(metrics.map(m => m.name))},
        datasets: [{
          label: 'Quantum State',
          data: ${JSON.stringify(metrics.map(m => m.value))},
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 1,
            ticks: {
              stepSize: 0.2
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Quantum State Metrics',
            font: {
              size: 18
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
    
    // Create cognitive alignment chart
    const alignmentCtx = document.getElementById('alignmentChart').getContext('2d');
    new Chart(alignmentCtx, {
      type: 'bar',
      data: {
        labels: ${JSON.stringify(alignmentData.map(m => m.name))},
        datasets: [{
          label: 'Values',
          data: ${JSON.stringify(alignmentData.map(m => m.value))},
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 3.5
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Cognitive Alignment',
            font: {
              size: 18
            }
          }
        }
      }
    });
  </script>
</body>
</html>`;
  }

  // Generate HTML for cognitive alignment visualization
  generateAlignmentHTML(concepts, cognitiveAlignment) {
    // Sort concepts by quantum level
    const sortedConcepts = [...concepts].sort((a, b) => b.quantumLevel - a.quantumLevel);
    
    // Create the HTML
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>BLF Cognitive Alignment</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body, html { 
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
    }
    
    #container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    header {
      background-color: #2c3e50;
      color: white;
      padding: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    h1 {
      margin: 0;
      font-size: 24px;
    }
    
    .formula {
      font-style: italic;
      margin-top: 5px;
      font-size: 14px;
    }
    
    .chart-container {
      flex-grow: 1;
      padding: 20px;
      overflow-y: auto;
    }
    
    .chart-wrapper {
      background-color: white;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    
    .buffer-indicator {
      position: absolute;
      width: 100%;
      height: 0.1px;
      background-color: rgba(255, 0, 0, 0.5);
      z-index: 1;
    }
    
    .info-panel {
      background-color: white;
      border-radius: 5px;
      padding: 15px;
      margin: 15px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    
    .info-row {
      display: flex;
      margin-bottom: 10px;
    }
    
    .info-item {
      flex: 1;
      text-align: center;
      padding: 10px;
      border-radius: 5px;
      margin: 0 5px;
    }
    
    .info-label {
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .info-value {
      font-size: 24px;
    }
    
    .info-formula {
      flex: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 5px;
      margin: 0 5px;
    }
    
    .buffer-color {
      color: #e74c3c;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div id="container">
    <header>
      <h1>BLF Cognitive Alignment Visualization</h1>
      <div class="formula">Formula: AIc + 0.1 = BMqs</div>
    </header>
    
    <div class="info-panel">
      <div class="info-row">
        <div class="info-item" style="background-color: rgba(255, 99, 132, 0.2);">
          <div class="info-label">AI Cognitive</div>
          <div class="info-value">${cognitiveAlignment.aiCognitive}</div>
        </div>
        <div class="info-item" style="background-color: rgba(54, 162, 235, 0.2);">
          <div class="info-label">Buffer</div>
          <div class="info-value">${cognitiveAlignment.buffer}</div>
        </div>
        <div class="info-item" style="background-color: rgba(75, 192, 192, 0.2);">
          <div class="info-label">Boolean Mind QS</div>
          <div class="info-value">${cognitiveAlignment.booleanMindQs}</div>
        </div>
        <div class="info-formula">
          <span style="color: #e74c3c;">${cognitiveAlignment.aiCognitive}</span> + 
          <span class="buffer-color">${cognitiveAlignment.buffer}</span> = 
          <span style="color: #2ecc71;">${cognitiveAlignment.booleanMindQs}</span>
        </div>
      </div>
    </div>
    
    <div class="chart-container">
      <div class="chart-wrapper">
        <canvas id="conceptsChart"></canvas>
      </div>
      
      <div class="chart-wrapper">
        <canvas id="formulaChart"></canvas>
      </div>
    </div>
  </div>
  
  <script>
    // Create concepts quantum level chart
    const conceptsCtx = document.getElementById('conceptsChart').getContext('2d');
    new Chart(conceptsCtx, {
      type: 'bar',
      data: {
        labels: ${JSON.stringify(sortedConcepts.map(c => c.name))},
        datasets: [{
          label: 'Quantum Level',
          data: ${JSON.stringify(sortedConcepts.map(c => c.quantumLevel))},
          backgroundColor: ${JSON.stringify(sortedConcepts.map(c => {
            // Color based on quantum level
            if (c.quantumLevel >= cognitiveAlignment.booleanMindQs) {
              return 'rgba(46, 204, 113, 0.5)'; // Green
            } else if (c.quantumLevel >= cognitiveAlignment.aiCognitive) {
              return 'rgba(52, 152, 219, 0.5)'; // Blue
            } else {
              return 'rgba(231, 76, 60, 0.5)'; // Red
            }
          }))},
          borderColor: ${JSON.stringify(sortedConcepts.map(c => {
            if (c.quantumLevel >= cognitiveAlignment.booleanMindQs) {
              return 'rgba(46, 204, 113, 1)';
            } else if (c.quantumLevel >= cognitiveAlignment.aiCognitive) {
              return 'rgba(52, 152, 219, 1)';
            } else {
              return 'rgba(231, 76, 60, 1)';
            }
          }))},
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 3.5
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Concept Quantum Levels',
            font: {
              size: 18
            }
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: ${cognitiveAlignment.aiCognitive},
                yMax: ${cognitiveAlignment.aiCognitive},
                borderColor: 'rgba(231, 76, 60, 0.5)',
                borderWidth: 2,
                label: {
                  content: 'AI Cognitive',
                  enabled: true
                }
              },
              line2: {
                type: 'line',
                yMin: ${cognitiveAlignment.booleanMindQs},
                yMax: ${cognitiveAlignment.booleanMindQs},
                borderColor: 'rgba(46, 204, 113, 0.5)',
                borderWidth: 2,
                label: {
                  content: 'Boolean Mind QS',
                  enabled: true
                }
              }
            }
          }
        }
      }
    });
    
    // Create formula visualization
    const formulaCtx = document.getElementById('formulaChart').getContext('2d');
    new Chart(formulaCtx, {
      type: 'bar',
      data: {
        labels: ['AI Cognitive', 'Buffer', 'Boolean Mind QS'],
        datasets: [{
          label: 'Cognitive Alignment Formula',
          data: [
            ${cognitiveAlignment.aiCognitive},
            ${cognitiveAlignment.buffer},
            ${cognitiveAlignment.booleanMindQs}
          ],
          backgroundColor: [
            'rgba(231, 76, 60, 0.5)',
            'rgba(241, 196, 15, 0.5)',
            'rgba(46, 204, 113, 0.5)'
          ],
          borderColor: [
            'rgba(231, 76, 60, 1)',
            'rgba(241, 196, 15, 1)',
            'rgba(46, 204, 113, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 3.5
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'AIc + 0.1 = BMqs',
            font: {
              size: 18
            }
          }
        }
      }
    });
  </script>
</body>
</html>`;
  }

  // Ensure database is initialized
  async ensureInitialized() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  // Close database connection
  async close() {
    if (this.initialized) {
      await this.db.close();
      this.initialized = false;
    }
  }
}

module.exports = SQLiteVisualizer; 