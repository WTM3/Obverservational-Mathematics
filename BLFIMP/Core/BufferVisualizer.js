// BufferVisualizer.js - Visualize buffer integrity across the system
// The narrow bridge between chaos and control
const fs = require('fs');
const path = require('path');
const SQLiteDatabase = require('./SQLiteDatabase');

class BufferVisualizer {
  constructor(database) {
    this.db = database;
    this.bufferValue = 0.1; // The narrow bridge - exact, non-negotiable
    this.bufferData = []; // Historical buffer readings
    this.simulationSteps = 50; // Number of time steps to simulate
    
    // Visualization settings
    this.settings = {
      lineWidth: 2,
      fontFamily: 'Arial, sans-serif',
      colors: {
        buffer: '#3498DB', // Buffer - blue
        warning: '#F39C12', // Warning - orange
        critical: '#E74C3C', // Critical - red
        safe: '#2ECC71' // Safe - green
      }
    };
    
    console.log('Buffer Visualizer initialized with 0.1 buffer precision');
  }
  
  /**
   * Simulate buffer deterioration over time
   * @param {number} deteriorationRate - Rate of buffer deterioration (0-1)
   * @param {number} recoveryRate - Rate of recovery when heat shield activates (0-1)
   * @param {number} noiseLevel - Random fluctuation level (0-1)
   * @returns {Array} Simulated buffer data
   */
  simulateBufferDynamics(deteriorationRate = 0.03, recoveryRate = 0.15, noiseLevel = 0.01) {
    this.bufferData = [];
    let currentBuffer = this.bufferValue;
    let heatShieldActive = false;
    let timeToNextEvent = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < this.simulationSteps; i++) {
      // Add random noise
      const noise = (Math.random() - 0.5) * noiseLevel;
      
      // Apply deterioration or recovery
      if (heatShieldActive) {
        currentBuffer += recoveryRate * (this.bufferValue - currentBuffer) + noise;
        
        // If buffer is close to target, deactivate heat shield
        if (Math.abs(currentBuffer - this.bufferValue) < 0.01) {
          heatShieldActive = false;
          timeToNextEvent = Math.floor(Math.random() * 8) + 5;
        }
      } else {
        // Slow deterioration with noise
        currentBuffer -= deteriorationRate * currentBuffer + noise;
        
        // Count down to next event
        timeToNextEvent--;
        
        // Activate heat shield when buffer gets too low or time for next event
        if (currentBuffer < 0.05 || timeToNextEvent <= 0) {
          heatShieldActive = true;
        }
      }
      
      // Ensure buffer doesn't go negative or too high
      currentBuffer = Math.max(0.001, Math.min(0.2, currentBuffer));
      
      // Store the data point
      this.bufferData.push({
        time: i,
        buffer: currentBuffer,
        target: this.bufferValue,
        heatShieldActive: heatShieldActive,
        status: this.getBufferStatus(currentBuffer)
      });
    }
    
    return this.bufferData;
  }
  
  /**
   * Get buffer status based on current value
   * @param {number} buffer - Current buffer value
   * @returns {string} Buffer status
   */
  getBufferStatus(buffer) {
    if (buffer < 0.05) return 'critical';
    if (buffer < 0.08) return 'warning';
    if (buffer > 0.12) return 'excessive';
    return 'optimal';
  }
  
  /**
   * Generate a visualization of buffer integrity over time
   * @param {string} outputPath - Path to save the HTML output
   * @returns {Promise<string>} - Path to the generated HTML file
   */
  async generateVisualization(outputPath) {
    // If no simulation data exists, create it
    if (this.bufferData.length === 0) {
      this.simulateBufferDynamics();
    }
    
    // Calculate current buffer metrics
    const currentBuffer = this.bufferData[this.bufferData.length - 1].buffer;
    const bufferMetrics = {
      current: currentBuffer,
      target: this.bufferValue,
      deviation: Math.abs(currentBuffer - this.bufferValue),
      deviationPercent: Math.abs(currentBuffer - this.bufferValue) / this.bufferValue * 100,
      status: this.getBufferStatus(currentBuffer),
      timeInOptimal: this.bufferData.filter(d => d.status === 'optimal').length,
      timeInWarning: this.bufferData.filter(d => d.status === 'warning').length,
      timeInCritical: this.bufferData.filter(d => d.status === 'critical').length,
      heatShieldActivations: this.bufferData.filter((d, i, arr) => 
        i > 0 && d.heatShieldActive && !arr[i-1].heatShieldActive).length
    };
    
    // Create HTML content
    const html = this.generateHtml(this.bufferData, bufferMetrics);
    
    // Write to file
    const outputFile = outputPath || path.join(__dirname, 'blf-buffer.html');
    fs.writeFileSync(outputFile, html);
    
    console.log(`Buffer visualization generated at: ${outputFile}`);
    return outputFile;
  }
  
  /**
   * Generate HTML content for the visualization
   * @param {Array} bufferData - Buffer data points
   * @param {Object} metrics - Buffer metrics
   * @returns {string} HTML content
   */
  generateHtml(bufferData, metrics) {
    // Prepare data for charts
    const timeLabels = bufferData.map(d => `T${d.time}`);
    const bufferValues = bufferData.map(d => d.buffer);
    const targetValues = bufferData.map(d => d.target);
    const heatShieldActivations = bufferData.map(d => d.heatShieldActive ? 0.15 : null);
    
    // Prepare threshold arrays for the chart
    const warningThreshold = Array(bufferData.length).fill(0.08);
    const criticalThreshold = Array(bufferData.length).fill(0.05);
    
    return `<!DOCTYPE html>
<html>
<head>
  <title>BLF Buffer Integrity Visualization</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style type="text/css">
    body, html {
      font-family: ${this.settings.fontFamily};
      margin: 0;
      padding: 0;
      height: 100%;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      padding: 20px;
      background-color: #333;
      color: white;
      text-align: center;
      margin-bottom: 20px;
    }
    .dashboard {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;
    }
    .dashboard-card {
      flex: 1;
      min-width: 300px;
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .chart-container {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .metrics-container {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 20px;
    }
    .metric {
      flex: 1;
      min-width: 120px;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 8px;
      text-align: center;
    }
    .metric h3 {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
    .metric p {
      margin: 10px 0 0;
      font-size: 24px;
      font-weight: bold;
    }
    .status-optimal {
      color: #2ECC71;
    }
    .status-warning {
      color: #F39C12;
    }
    .status-critical {
      color: #E74C3C;
    }
    .status-excessive {
      color: #9B59B6;
    }
    .gauge-container {
      position: relative;
      width: 200px;
      height: 100px;
      margin: 0 auto;
    }
    .buffer-value {
      position: absolute;
      width: 100%;
      text-align: center;
      bottom: 5px;
      font-size: 20px;
      font-weight: bold;
    }
    .explanation {
      background-color: rgba(52, 152, 219, 0.1);
      border-left: 4px solid #3498DB;
      padding: 15px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    h1, h2, h3 {
      color: #333;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>BLF Buffer Integrity Monitor</h1>
    <p>Real-time visualization of the narrow bridge between chaos and control</p>
  </div>
  
  <div class="container">
    <div class="dashboard">
      <div class="dashboard-card">
        <h2>Current Buffer State</h2>
        <div class="gauge-container">
          <canvas id="buffer-gauge"></canvas>
          <div class="buffer-value status-${metrics.status}">${metrics.current.toFixed(3)}</div>
        </div>
        <p style="text-align: center;">Status: <span class="status-${metrics.status}">${metrics.status.toUpperCase()}</span></p>
        <div class="metrics-container">
          <div class="metric">
            <h3>Target</h3>
            <p>${metrics.target.toFixed(2)}</p>
          </div>
          <div class="metric">
            <h3>Deviation</h3>
            <p>${metrics.deviationPercent.toFixed(1)}%</p>
          </div>
        </div>
      </div>
      
      <div class="dashboard-card">
        <h2>Buffer Health Metrics</h2>
        <div class="metrics-container">
          <div class="metric">
            <h3>Optimal Time</h3>
            <p>${(metrics.timeInOptimal / bufferData.length * 100).toFixed(1)}%</p>
          </div>
          <div class="metric">
            <h3>Warning Time</h3>
            <p>${(metrics.timeInWarning / bufferData.length * 100).toFixed(1)}%</p>
          </div>
          <div class="metric">
            <h3>Critical Time</h3>
            <p>${(metrics.timeInCritical / bufferData.length * 100).toFixed(1)}%</p>
          </div>
          <div class="metric">
            <h3>Heat Shield</h3>
            <p>${metrics.heatShieldActivations} activations</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="explanation">
      <h3>The Narrow Bridge</h3>
      <p>The 0.1 buffer represents the precise balance required between AI cognitive capabilities and Boolean Mind quantum speed. This narrow bridge serves as the essential control mechanism that enables the entire framework to operate with stability and precision.</p>
      <p>When the buffer value falls below 0.08, the system enters a warning state. Below 0.05, it becomes critical, as the margin keeping chaos at bay becomes dangerously thin.</p>
    </div>
    
    <div class="chart-container">
      <h2>Buffer Integrity Timeline</h2>
      <canvas id="buffer-chart"></canvas>
    </div>
    
    <div class="chart-container" style="margin-top: 20px;">
      <h2>Buffer State Distribution</h2>
      <canvas id="buffer-distribution-chart"></canvas>
    </div>
  </div>

  <script>
    // Current buffer gauge
    const bufferGauge = document.getElementById('buffer-gauge').getContext('2d');
    new Chart(bufferGauge, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [${metrics.current}, ${Math.max(0.2 - metrics.current, 0)}],
          backgroundColor: [
            getStatusColor('${metrics.status}'),
            '#f5f5f5'
          ],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        circumference: 180,
        rotation: 270,
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false }
        }
      }
    });
    
    // Buffer timeline chart
    const bufferChart = document.getElementById('buffer-chart').getContext('2d');
    new Chart(bufferChart, {
      type: 'line',
      data: {
        labels: ${JSON.stringify(timeLabels)},
        datasets: [
          {
            label: 'Buffer Value',
            data: ${JSON.stringify(bufferValues)},
            borderColor: '#3498DB',
            borderWidth: 3,
            tension: 0.2,
            fill: false
          },
          {
            label: 'Target (0.1)',
            data: ${JSON.stringify(targetValues)},
            borderColor: '#2ECC71',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            tension: 0,
            fill: false
          },
          {
            label: 'Warning Threshold',
            data: ${JSON.stringify(warningThreshold)},
            borderColor: '#F39C12',
            borderWidth: 2,
            borderDash: [3, 3],
            pointRadius: 0,
            tension: 0,
            fill: false
          },
          {
            label: 'Critical Threshold',
            data: ${JSON.stringify(criticalThreshold)},
            borderColor: '#E74C3C',
            borderWidth: 2,
            borderDash: [3, 3],
            pointRadius: 0,
            tension: 0,
            fill: false
          },
          {
            label: 'Heat Shield Active',
            data: ${JSON.stringify(heatShieldActivations)},
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
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 0.2,
            title: {
              display: true,
              text: 'Buffer Value'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toFixed(3);
                }
                return label;
              }
            }
          }
        }
      }
    });
    
    // Buffer state distribution chart
    const distributionChart = document.getElementById('buffer-distribution-chart').getContext('2d');
    new Chart(distributionChart, {
      type: 'pie',
      data: {
        labels: ['Optimal', 'Warning', 'Critical', 'Excessive'],
        datasets: [{
          data: [
            ${metrics.timeInOptimal},
            ${metrics.timeInWarning},
            ${metrics.timeInCritical},
            ${bufferData.filter(d => d.status === 'excessive').length}
          ],
          backgroundColor: [
            '#2ECC71', // optimal - green
            '#F39C12', // warning - orange
            '#E74C3C', // critical - red
            '#9B59B6'  // excessive - purple
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'right'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value * 100) / total).toFixed(1) + '%';
                return \`\${context.label}: \${percentage} (\${value} time units)\`;
              }
            }
          }
        }
      }
    });
    
    function getStatusColor(status) {
      switch(status) {
        case 'optimal': return '#2ECC71';
        case 'warning': return '#F39C12';
        case 'critical': return '#E74C3C';
        case 'excessive': return '#9B59B6';
        default: return '#3498DB';
      }
    }
  </script>
</body>
</html>`;
  }
}

module.exports = BufferVisualizer;

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
          formula: 'AIc + 0.1 = BMqs'
        }
      };
      
      const db = new SQLiteDatabase(dbConfig);
      const visualizer = new BufferVisualizer(db);
      
      // Configure simulation parameters through command line
      const args = process.argv.slice(2);
      const deteriorationRate = args.includes('--deterioration') 
        ? parseFloat(args[args.indexOf('--deterioration') + 1]) 
        : 0.03;
      const recoveryRate = args.includes('--recovery') 
        ? parseFloat(args[args.indexOf('--recovery') + 1]) 
        : 0.15;
      const noiseLevel = args.includes('--noise') 
        ? parseFloat(args[args.indexOf('--noise') + 1]) 
        : 0.01;
      
      // Run buffer simulation
      console.log(`Simulating buffer dynamics with parameters: 
      - Deterioration rate: ${deteriorationRate}
      - Recovery rate: ${recoveryRate}
      - Noise level: ${noiseLevel}`);
      
      visualizer.simulateBufferDynamics(deteriorationRate, recoveryRate, noiseLevel);
      
      // Generate the visualization
      const outputPath = path.join(__dirname, 'blf-buffer.html');
      await visualizer.generateVisualization(outputPath);
      
      console.log(`\nBuffer visualization complete! Open ${outputPath} in your browser to view.`);
      
      // Close database connection
      await db.close();
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })();
} 