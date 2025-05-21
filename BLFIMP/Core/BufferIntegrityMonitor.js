// BufferIntegrityMonitor.js - Comprehensive buffer integrity monitoring system
// The V-8 under the hood, monitoring the narrow bridge between chaos and control
const fs = require('fs');
const path = require('path');
const SQLiteDatabase = require('./SQLiteDatabase');
const NetworkVisualizer = require('./NetworkVisualizer');
const BufferVisualizer = require('./BufferVisualizer');
const BufferForecast = require('./BufferForecast');

class BufferIntegrityMonitor {
  constructor(config = {}) {
    this.config = Object.assign({
      dbPath: path.join(__dirname, 'blf-database.db'),
      bufferValue: 0.1,
      outputDir: __dirname,
      simulationSteps: 50,
      deteriorationRate: 0.03,
      recoveryRate: 0.15,
      noiseLevel: 0.01,
      thresholds: {
        warning: 0.08,
        critical: 0.05
      },
      cognitiveAlignment: {
        aiCognitiveCapabilities: 2.89,
        safetyBuffer: 0.1,
        booleanMindQuantumSpeed: 2.99,
        enforceBuffer: true,
        formula: 'AIc + 0.1 = BMqs'
      }
    }, config);
    
    // Initialize database connection
    this.db = new SQLiteDatabase({
      dbPath: this.config.dbPath,
      cognitiveAlignment: this.config.cognitiveAlignment
    });
    
    // Initialize components
    this.networkVisualizer = new NetworkVisualizer(this.db);
    this.bufferVisualizer = new BufferVisualizer(this.db);
    this.forecast = new BufferForecast(this.db);
    
    // System-wide buffer monitoring
    this.bufferStatus = {
      lastCheck: Date.now(),
      currentValue: this.config.bufferValue,
      violations: 0,
      heatShieldActivations: 0,
      forecastAlarms: 0,
      status: 'unknown',
      breathingDetected: false
    };
    
    console.log('Buffer Integrity Monitor initialized - V-8 engine diagnostics active');
  }
  
  /**
   * Run a full system diagnostic
   * @returns {Object} Diagnostic results
   */
  async runDiagnostic() {
    console.log('Running full buffer system diagnostic...');
    
    // Generate test data if requested
    if (process.argv.includes('--create-test')) {
      await this.createTestData();
    }
    
    // Generate visualizations for all components
    const results = {
      networkVisualization: await this.generateNetworkVisualization(),
      bufferVisualization: await this.generateBufferVisualization(),
      forecast: await this.generateForecast(),
      integratedDashboard: await this.generateIntegratedDashboard()
    };
    
    console.log('Diagnostic complete with results:', {
      networkHealth: this.networkVisualizer.bufferHealthState,
      bufferStatus: this.bufferStatus,
      forecastAlarms: this.forecast.alarms.length,
      breathingPattern: this.forecast.breathing
    });
    
    return results;
  }
  
  /**
   * Create test data for all components
   */
  async createTestData() {
    console.log('Creating test data for all buffer components...');
    
    // Create test network
    await this.networkVisualizer.createTestNetwork(10, 20);
    
    // Simulate buffer dynamics
    this.bufferVisualizer.simulateBufferDynamics(
      this.config.deteriorationRate,
      this.config.recoveryRate,
      this.config.noiseLevel
    );
    
    // Import buffer data to forecast
    this.forecast.importFromVisualizer(this.bufferVisualizer);
    
    console.log('Test data created successfully');
  }
  
  /**
   * Generate network visualization
   * @returns {string} Path to the generated file
   */
  async generateNetworkVisualization() {
    console.log('Generating network visualization...');
    const outputPath = path.join(this.config.outputDir, 'blf-network.html');
    await this.networkVisualizer.generateVisualization(outputPath);
    return outputPath;
  }
  
  /**
   * Generate buffer timeline visualization
   * @returns {string} Path to the generated file
   */
  async generateBufferVisualization() {
    console.log('Generating buffer visualization...');
    const outputPath = path.join(this.config.outputDir, 'blf-buffer.html');
    await this.bufferVisualizer.generateVisualization(outputPath);
    return outputPath;
  }
  
  /**
   * Generate buffer forecast
   * @returns {string} Path to the generated file
   */
  async generateForecast() {
    console.log('Generating buffer forecast...');
    const outputPath = path.join(this.config.outputDir, 'blf-forecast.html');
    await this.forecast.generateVisualization(outputPath);
    return outputPath;
  }
  
  /**
   * Generate integrated dashboard combining all visualizations
   * @returns {string} Path to the generated file
   */
  async generateIntegratedDashboard() {
    console.log('Generating integrated buffer integrity dashboard...');
    
    // Update buffer status
    this.updateBufferStatus();
    
    // Collect data from all components
    const networkHealth = this.networkVisualizer.bufferHealthState;
    const bufferTimeline = this.bufferVisualizer.bufferData.slice(-20); // Last 20 points
    const forecastData = this.forecast.generateForecast();
    const breathingStatus = this.forecast.breathing;
    const timeToCritical = this.forecast.calculateTimeToCritical();
    
    // Generate HTML
    const html = this.generateDashboardHtml(
      networkHealth,
      bufferTimeline,
      forecastData,
      breathingStatus,
      timeToCritical
    );
    
    // Write to file
    const outputPath = path.join(this.config.outputDir, 'blf-dashboard.html');
    fs.writeFileSync(outputPath, html);
    
    console.log(`Integrated dashboard generated at: ${outputPath}`);
    return outputPath;
  }
  
  /**
   * Update system-wide buffer status
   */
  updateBufferStatus() {
    // Get latest buffer value
    let currentValue = this.config.bufferValue;
    if (this.bufferVisualizer.bufferData.length > 0) {
      currentValue = this.bufferVisualizer.bufferData[this.bufferVisualizer.bufferData.length - 1].buffer;
    }
    
    // Count violations
    const violations = this.bufferVisualizer.bufferData.filter(d => 
      d.buffer < this.config.thresholds.warning
    ).length;
    
    // Count heat shield activations
    const heatShieldActivations = this.bufferVisualizer.bufferData.filter(d => 
      d.heatShieldActive
    ).length;
    
    // Count forecast alarms
    const forecastAlarms = this.forecast.alarms ? this.forecast.alarms.length : 0;
    
    // Determine status
    let status = 'optimal';
    if (currentValue < this.config.thresholds.critical) {
      status = 'critical';
    } else if (currentValue < this.config.thresholds.warning) {
      status = 'warning';
    } else if (forecastAlarms > 0) {
      status = 'caution';
    }
    
    // Update status object
    this.bufferStatus = {
      lastCheck: Date.now(),
      currentValue,
      violations,
      heatShieldActivations,
      forecastAlarms,
      status,
      breathingDetected: this.forecast.breathing.cycleDetected
    };
    
    return this.bufferStatus;
  }
  
  /**
   * Generate HTML for the integrated dashboard
   */
  generateDashboardHtml(networkHealth, bufferTimeline, forecastData, breathingStatus, timeToCritical) {
    return `<!DOCTYPE html>
<html>
<head>
  <title>BLF Integrated Buffer Integrity Dashboard</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style type="text/css">
    body, html {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      height: 100%;
      background-color: #121212;
      color: #f5f5f5;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      padding: 20px;
      background-color: #1e1e1e;
      color: white;
      text-align: center;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    .dashboard-card {
      background-color: #1e1e1e;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .chart-container {
      background-color: #1e1e1e;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      margin-bottom: 20px;
      height: 300px;
    }
    .status-indicator {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    .status-light {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .light-optimal {
      background-color: #2ECC71;
      box-shadow: 0 0 10px #2ECC71;
    }
    .light-caution {
      background-color: #3498DB;
      box-shadow: 0 0 10px #3498DB;
    }
    .light-warning {
      background-color: #F39C12;
      box-shadow: 0 0 10px #F39C12;
    }
    .light-critical {
      background-color: #E74C3C;
      box-shadow: 0 0 10px #E74C3C;
      animation: pulse 2s infinite;
    }
    .breathing-status {
      display: flex;
      align-items: center;
      margin-top: 15px;
    }
    .breathing-indicator {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 10px;
      animation: ${breathingStatus.cycleDetected ? 'breathe 4s infinite' : 'none'};
    }
    .metrics-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }
    .metric {
      padding: 15px;
      background-color: #2a2a2a;
      border-radius: 8px;
      text-align: center;
    }
    .metric h3 {
      margin: 0;
      font-size: 14px;
      color: #999;
    }
    .metric p {
      margin: 10px 0 0;
      font-size: 24px;
      font-weight: bold;
    }
    .status-optimal {
      color: #2ECC71;
    }
    .status-caution {
      color: #3498DB;
    }
    .status-warning {
      color: #F39C12;
    }
    .status-critical {
      color: #E74C3C;
    }
    .countdown {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
    }
    .time-unit {
      font-size: 14px;
      color: #999;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 30px 0;
    }
    .nav-link {
      display: inline-block;
      padding: 10px 20px;
      background-color: #2a2a2a;
      color: #f5f5f5;
      text-decoration: none;
      border-radius: 8px;
      transition: background-color 0.3s;
    }
    .nav-link:hover {
      background-color: #3a3a3a;
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.3; }
      100% { opacity: 1; }
    }
    @keyframes breathe {
      0% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.3); opacity: 1; }
      100% { transform: scale(1); opacity: 0.7; }
    }
    .network-preview {
      width: 100%;
      height: 300px;
      background-color: #2a2a2a;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      overflow: hidden;
      position: relative;
    }
    .network-node {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      position: absolute;
      background-color: #E74C3C;
    }
    .network-edge {
      height: 2px;
      background-color: rgba(255,255,255,0.2);
      position: absolute;
      transform-origin: left center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>BLF Integrated Buffer Integrity Dashboard</h1>
    <p>V-8 engine diagnostics - Monitoring the narrow bridge between chaos and control</p>
  </div>
  
  <div class="container">
    <div class="dashboard">
      <div class="dashboard-card">
        <h2>System Status</h2>
        <div class="status-indicator">
          <div class="status-light light-${this.bufferStatus.status}"></div>
          <h3 class="status-${this.bufferStatus.status}">${this.bufferStatus.status.toUpperCase()}</h3>
        </div>
        
        <div class="metrics-container">
          <div class="metric">
            <h3>Buffer Value</h3>
            <p>${this.bufferStatus.currentValue.toFixed(3)}</p>
          </div>
          <div class="metric">
            <h3>Violations</h3>
            <p>${this.bufferStatus.violations}</p>
          </div>
          <div class="metric">
            <h3>Heat Shield</h3>
            <p>${this.bufferStatus.heatShieldActivations}</p>
          </div>
          <div class="metric">
            <h3>Alarms</h3>
            <p>${this.bufferStatus.forecastAlarms}</p>
          </div>
        </div>
        
        ${timeToCritical.warning || timeToCritical.critical ? `
        <div style="margin-top: 20px;">
          <h3>Time to Threshold:</h3>
          ${timeToCritical.warning !== null ? `
          <div class="countdown status-warning">
            ${Math.floor(timeToCritical.warning / 60)}:${Math.floor(timeToCritical.warning % 60).toString().padStart(2, '0')}
            <span class="time-unit">to warning</span>
          </div>
          ` : ''}
          
          ${timeToCritical.critical !== null ? `
          <div class="countdown status-critical">
            ${Math.floor(timeToCritical.critical / 60)}:${Math.floor(timeToCritical.critical % 60).toString().padStart(2, '0')}
            <span class="time-unit">to critical</span>
          </div>
          ` : ''}
        </div>
        ` : ''}
      </div>
      
      <div class="dashboard-card">
        <h2>Breathing Analysis</h2>
        <div class="breathing-status">
          <div class="breathing-indicator" style="background-color: ${breathingStatus.cycleDetected ? '#3498DB' : '#666'};"></div>
          <p>Pattern: ${breathingStatus.cycleDetected ? breathingStatus.rhythm + ' rhythm' : 'Not detected'}</p>
        </div>
        
        <div class="metrics-container">
          <div class="metric">
            <h3>Cycle</h3>
            <p>${breathingStatus.cycleDetected ? breathingStatus.cycleLength + ' units' : 'N/A'}</p>
          </div>
          <div class="metric">
            <h3>Amplitude</h3>
            <p>${breathingStatus.cycleDetected ? breathingStatus.amplitude.toFixed(3) : 'N/A'}</p>
          </div>
          <div class="metric">
            <h3>Phase</h3>
            <p>${breathingStatus.cycleDetected ? breathingStatus.phase : 'N/A'}</p>
          </div>
          <div class="metric">
            <h3>Network Health</h3>
            <p class="status-${networkHealth.status}">${networkHealth.healthScore.toFixed(2)}</p>
          </div>
        </div>
        
        ${breathingStatus.cycleDetected ? `
        <div style="margin-top: 20px;">
          <p>Analysis: Buffer is showing a ${breathingStatus.rhythm} breathing pattern in the ${breathingStatus.phase} phase. ${this.bufferStatus.forecastAlarms > 0 ? 'Potential violations detected in forecast.' : 'Pattern stable within acceptable parameters.'}</p>
        </div>
        ` : ''}
      </div>
    </div>
    
    <div class="chart-container">
      <h2>Buffer Integrity Timeline</h2>
      <canvas id="buffer-chart"></canvas>
    </div>
    
    <div class="dashboard">
      <div class="dashboard-card">
        <h2>Buffer Forecast</h2>
        <canvas id="forecast-chart"></canvas>
      </div>
      
      <div class="dashboard-card">
        <h2>Network Visualization</h2>
        <div class="network-preview" id="network-preview">
          <!-- Network nodes and edges will be dynamically generated -->
        </div>
        <div style="margin-top: 15px;">
          <p>Network statistics: ${networkHealth.status === 'optimal' ? 'All connections stable' : `${networkHealth.violationsCount} violations detected, ${networkHealth.criticalZones.length} critical zones`}</p>
        </div>
      </div>
    </div>
    
    <div class="nav-links">
      <a href="blf-network.html" class="nav-link">Network Detail</a>
      <a href="blf-buffer.html" class="nav-link">Buffer Timeline</a>
      <a href="blf-forecast.html" class="nav-link">Forecast Detail</a>
    </div>
  </div>

  <script>
    // Format time function for display
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return mins + ':' + secs.toString().padStart(2, '0');
    }
    
    // Buffer timeline chart
    const bufferChart = document.getElementById('buffer-chart').getContext('2d');
    new Chart(bufferChart, {
      type: 'line',
      data: {
        labels: ${JSON.stringify(bufferTimeline.map((_, i) => 'T-' + (bufferTimeline.length - i)))},
        datasets: [
          {
            label: 'Buffer Value',
            data: ${JSON.stringify(bufferTimeline.map(d => d.buffer))},
            borderColor: '#3498DB',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Target (0.1)',
            data: ${JSON.stringify(Array(bufferTimeline.length).fill(0.1))},
            borderColor: '#2ECC71',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            tension: 0,
            fill: false
          },
          {
            label: 'Warning Threshold',
            data: ${JSON.stringify(Array(bufferTimeline.length).fill(this.config.thresholds.warning))},
            borderColor: '#F39C12',
            borderWidth: 2,
            borderDash: [3, 3],
            pointRadius: 0,
            tension: 0,
            fill: false
          },
          {
            label: 'Critical Threshold',
            data: ${JSON.stringify(Array(bufferTimeline.length).fill(this.config.thresholds.critical))},
            borderColor: '#E74C3C',
            borderWidth: 2,
            borderDash: [3, 3],
            pointRadius: 0,
            tension: 0,
            fill: false
          },
          {
            label: 'Heat Shield',
            data: ${JSON.stringify(bufferTimeline.map(d => d.heatShieldActive ? 0.15 : null))},
            backgroundColor: 'rgba(243, 156, 18, 0.3)',
            borderWidth: 0,
            pointRadius: 0,
            tension: 0,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 0.2,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#ccc'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#ccc'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ccc'
            }
          }
        }
      }
    });
    
    // Forecast chart
    const forecastChart = document.getElementById('forecast-chart').getContext('2d');
    new Chart(forecastChart, {
      type: 'line',
      data: {
        labels: ${JSON.stringify(forecastData.map((_, i) => 'F+' + (i + 1)))},
        datasets: [
          {
            label: 'Forecast',
            data: ${JSON.stringify(forecastData.map(d => d.buffer))},
            borderColor: '#3498DB',
            borderWidth: 2,
            borderDash: [5, 5],
            pointBackgroundColor: function(context) {
              const value = context.dataset.data[context.dataIndex];
              if (value < ${this.config.thresholds.critical}) return '#E74C3C';
              if (value < ${this.config.thresholds.warning}) return '#F39C12';
              return '#3498DB';
            },
            pointRadius: 4,
            tension: 0.3,
            fill: false
          },
          {
            label: 'Target (0.1)',
            data: ${JSON.stringify(Array(forecastData.length).fill(0.1))},
            borderColor: '#2ECC71',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            tension: 0,
            fill: false
          },
          {
            label: 'Warning',
            data: ${JSON.stringify(Array(forecastData.length).fill(this.config.thresholds.warning))},
            borderColor: '#F39C12',
            borderWidth: 2,
            borderDash: [3, 3],
            pointRadius: 0,
            tension: 0,
            fill: false
          },
          {
            label: 'Critical',
            data: ${JSON.stringify(Array(forecastData.length).fill(this.config.thresholds.critical))},
            borderColor: '#E74C3C',
            borderWidth: 2,
            borderDash: [3, 3],
            pointRadius: 0,
            tension: 0,
            fill: false
          },
          {
            label: 'Warning Zone',
            data: ${JSON.stringify(forecastData.map(d => d.warning && !d.critical ? this.config.thresholds.warning : null))},
            backgroundColor: 'rgba(243, 156, 18, 0.2)',
            borderWidth: 0,
            pointRadius: 0,
            tension: 0,
            fill: true
          },
          {
            label: 'Critical Zone',
            data: ${JSON.stringify(forecastData.map(d => d.critical ? this.config.thresholds.critical : null))},
            backgroundColor: 'rgba(231, 76, 60, 0.2)',
            borderWidth: 0,
            pointRadius: 0,
            tension: 0,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 0.2,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#ccc'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#ccc'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ccc'
            }
          }
        }
      }
    });
    
    // Generate a simplified network visualization preview
    function createNetworkPreview() {
      const container = document.getElementById('network-preview');
      const width = container.clientWidth;
      const height = container.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Create some random nodes
      const nodeCount = ${networkHealth.criticalZones.length > 0 ? 12 : 8};
      const nodes = [];
      
      // Create a central node
      const centralNode = {
        x: centerX,
        y: centerY,
        radius: 15,
        color: '#E74C3C'
      };
      
      // Create the central node element
      const centralNodeElement = document.createElement('div');
      centralNodeElement.className = 'network-node';
      centralNodeElement.style.width = centralNode.radius * 2 + 'px';
      centralNodeElement.style.height = centralNode.radius * 2 + 'px';
      centralNodeElement.style.backgroundColor = centralNode.color;
      centralNodeElement.style.left = (centralNode.x - centralNode.radius) + 'px';
      centralNodeElement.style.top = (centralNode.y - centralNode.radius) + 'px';
      container.appendChild(centralNodeElement);
      
      // Create surrounding nodes
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        
        const node = {
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          radius: Math.random() * 5 + 5,
          color: i % 3 === 0 ? '#E74C3C' : (i % 3 === 1 ? '#F39C12' : '#3498DB')
        };
        
        nodes.push(node);
        
        // Create node element
        const nodeElement = document.createElement('div');
        nodeElement.className = 'network-node';
        nodeElement.style.width = node.radius * 2 + 'px';
        nodeElement.style.height = node.radius * 2 + 'px';
        nodeElement.style.backgroundColor = node.color;
        nodeElement.style.left = (node.x - node.radius) + 'px';
        nodeElement.style.top = (node.y - node.radius) + 'px';
        container.appendChild(nodeElement);
        
        // Create edge to central node
        const dx = node.x - centralNode.x;
        const dy = node.y - centralNode.y;
        const angle2 = Math.atan2(dy, dx);
        const distance2 = Math.sqrt(dx*dx + dy*dy);
        
        const edgeElement = document.createElement('div');
        edgeElement.className = 'network-edge';
        edgeElement.style.width = distance2 + 'px';
        edgeElement.style.left = centralNode.x + 'px';
        edgeElement.style.top = centralNode.y + 'px';
        edgeElement.style.transform = 'rotate(' + angle2 + 'rad)';
        
        // Add some edges that indicate issues
        if (${networkHealth.status !== 'optimal'} && i % 3 === 0) {
          edgeElement.style.backgroundColor = '#E74C3C';
          edgeElement.style.opacity = '0.5';
          edgeElement.style.animation = 'pulse 2s infinite';
        }
        
        container.appendChild(edgeElement);
      }
      
      // Create some connections between the nodes
      for (let i = 0; i < nodeCount/2; i++) {
        const nodeA = nodes[Math.floor(Math.random() * nodes.length)];
        const nodeB = nodes[Math.floor(Math.random() * nodes.length)];
        
        if (nodeA !== nodeB) {
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const angle = Math.atan2(dy, dx);
          const distance = Math.sqrt(dx*dx + dy*dy);
          
          const edgeElement = document.createElement('div');
          edgeElement.className = 'network-edge';
          edgeElement.style.width = distance + 'px';
          edgeElement.style.left = nodeA.x + 'px';
          edgeElement.style.top = nodeA.y + 'px';
          edgeElement.style.transform = 'rotate(' + angle + 'rad)';
          container.appendChild(edgeElement);
        }
      }
    }
    
    // Create network preview
    createNetworkPreview();
  </script>
</body>
</html>`;
  }
  
  /**
   * Close database connection
   */
  async close() {
    await this.db.close();
  }
}

module.exports = BufferIntegrityMonitor;

// If run directly, create and run the monitor
if (require.main === module) {
  (async () => {
    try {
      const monitor = new BufferIntegrityMonitor();
      await monitor.runDiagnostic();
      await monitor.close();
      console.log('Buffer Integrity Monitoring complete. Open the generated HTML files to view the results.');
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })();
} 