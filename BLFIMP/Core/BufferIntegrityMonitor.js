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
      },
      // Add new configuration for enhanced early warning system
      earlyWarning: {
        enabled: true,
        detectionThreshold: 0.75,
        notificationInterval: 60 * 1000, // 1 minute between notifications
        harmonicAnalysis: true
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
      breathingDetected: false,
      // Add enhanced monitoring
      earlyWarnings: [],
      lastWarningTime: null,
      harmonicPatterns: [],
      confidenceLevel: 1.0
    };
    
    console.log('Enhanced Buffer Integrity Monitor initialized - V-8 engine diagnostics active with early warning system');
  }
  
  /**
   * Run a full system diagnostic
   * @returns {Object} Diagnostic results
   */
  async runDiagnostic() {
    console.log('Running full buffer system diagnostic with harmonic analysis...');
    
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
    
    // Enhanced monitoring results
    const earlyWarningStatus = this.forecast.earlyWarning || { status: 'unknown', confidenceLevel: 0 };
    
    console.log('Diagnostic complete with results:', {
      networkHealth: this.networkVisualizer.bufferHealthState,
      bufferStatus: this.bufferStatus,
      forecastAlarms: this.forecast.alarms?.length || 0,
      breathingPattern: this.forecast.breathing,
      earlyWarningStatus: earlyWarningStatus.status,
      confidenceLevel: earlyWarningStatus.confidenceLevel
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
    console.log('Generating enhanced integrated buffer integrity dashboard...');
    
    // Update buffer status
    this.updateBufferStatus();
    
    // Collect data from all components
    const networkHealth = this.networkVisualizer.bufferHealthState;
    const bufferTimeline = this.bufferVisualizer.bufferData.slice(-20); // Last 20 points
    const forecastData = this.forecast.generateForecast();
    const breathingStatus = this.forecast.breathing;
    const timeToCritical = this.forecast.calculateTimeToCritical();
    
    // Enhanced monitoring data
    const earlyWarningStatus = this.forecast.earlyWarning || { 
      status: 'normal', 
      confidenceLevel: 1.0,
      warningHistory: []
    };
    
    // Generate HTML
    const html = this.generateDashboardHtml(
      networkHealth,
      bufferTimeline,
      forecastData,
      breathingStatus,
      timeToCritical,
      earlyWarningStatus
    );
    
    // Write to file
    const outputPath = path.join(this.config.outputDir, 'blf-dashboard.html');
    fs.writeFileSync(outputPath, html);
    
    console.log(`Enhanced integrated dashboard generated at: ${outputPath}`);
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
    }
    
    // Check for breathing pattern
    const breathingDetected = this.forecast.breathing?.cycleDetected || false;
    
    // Get early warning status if available
    if (this.forecast.earlyWarning) {
      this.bufferStatus.earlyWarnings = this.forecast.earlyWarning.warningHistory || [];
      this.bufferStatus.lastWarningTime = this.forecast.earlyWarning.lastWarningTime;
      this.bufferStatus.harmonicPatterns = this.forecast.earlyWarning.harmonicPatterns || [];
      this.bufferStatus.confidenceLevel = this.forecast.earlyWarning.confidenceLevel || 1.0;
      
      // If early warning is more severe than current status, upgrade
      if ((this.forecast.earlyWarning.status === 'critical' && status !== 'critical') ||
          (this.forecast.earlyWarning.status === 'warning' && status === 'optimal')) {
        status = this.forecast.earlyWarning.status;
      }
    }
    
    // Update status
    this.bufferStatus = {
      ...this.bufferStatus,
      lastCheck: Date.now(),
      currentValue,
      violations,
      heatShieldActivations,
      forecastAlarms,
      status,
      breathingDetected
    };
    
    return this.bufferStatus;
  }
  
  /**
   * Generate dashboard HTML
   * Updated to include early warning system and harmonic analysis
   */
  generateDashboardHtml(networkHealth, bufferTimeline, forecastData, breathingStatus, timeToCritical, earlyWarningStatus) {
    // ... existing code to initialize the dashboard HTML ...
    
    // Add enhanced early warning system section
    const earlyWarningSection = `
    <div class="dashboard-card">
      <h2>Early Warning System</h2>
      <div class="status-indicator">
        <div class="status-light light-${earlyWarningStatus.status}"></div>
        <h3 class="status-${earlyWarningStatus.status}">
          ${earlyWarningStatus.status.toUpperCase()} 
          (${Math.round(earlyWarningStatus.confidenceLevel * 100)}% confidence)
        </h3>
      </div>
      
      <div class="metrics-container">
        <div class="metric">
          <h3>Warnings</h3>
          <p>${earlyWarningStatus.warningHistory?.length || 0} detected</p>
        </div>
        <div class="metric">
          <h3>Last Warning</h3>
          <p>${earlyWarningStatus.lastWarningTime ? 
            new Date(earlyWarningStatus.lastWarningTime).toLocaleTimeString() : 'None'}</p>
        </div>
        <div class="metric">
          <h3>Harmonics</h3>
          <p>${earlyWarningStatus.harmonicPatterns?.length || 0} patterns</p>
        </div>
      </div>
      
      ${timeToCritical.warning !== null || timeToCritical.critical !== null ? `
      <div class="countdown-container">
        <h3>Estimated Time to Threshold:</h3>
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
      ` : `
      <div class="status-message">
        <p>No threshold violations predicted in forecast window</p>
      </div>
      `}
    </div>`;
    
    // Add breathing analysis improvements
    const breathingAnalysisSection = `
    <div class="dashboard-card">
      <h2>Enhanced Breathing Analysis</h2>
      <div class="breathing-status">
        <div class="breathing-indicator" style="background-color: ${breathingStatus.cycleDetected ? '#3498DB' : '#ccc'};"></div>
        <p>Breathing: ${breathingStatus.cycleDetected ? breathingStatus.rhythm + ' rhythm' : 'Not detected'}</p>
      </div>
      
      <div class="metrics-container">
        <div class="metric">
          <h3>Pattern</h3>
          <p>${breathingStatus.cycleDetected ? breathingStatus.rhythm : 'N/A'}</p>
        </div>
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
          <h3>Confidence</h3>
          <p>${this.forecast.adaptiveLearning?.patternConfidence ? 
            (this.forecast.adaptiveLearning.patternConfidence * 100).toFixed(1) + '%' : 'N/A'}</p>
        </div>
      </div>
      
      ${breathingStatus.cycleDetected ? `
      <div class="analysis-message">
        <p class="status-${earlyWarningStatus.status}">
          ${breathingStatus.rhythm === 'rapid' ? 
            'Rapid breathing detected - potential buffer instability' : 
            breathingStatus.rhythm === 'slow' ? 
            'Slow breathing pattern indicates gradual buffer changes' : 
            'Normal breathing pattern - standard buffer fluctuations'}
        </p>
        <p>Current phase: <strong>${breathingStatus.phase}</strong> ${
          breathingStatus.phase === 'falling' ? 
          '(buffer decreasing - monitor closely)' : 
          '(buffer recovering - continue observation)'
        }</p>
      </div>
      ` : ''}
    </div>`;
    
    // ... insert these new sections into the existing dashboard HTML ...
    
    return `<!DOCTYPE html>
    <html>
    <head>
      <title>Buffer Integrity Dashboard - Heat Shield Monitoring</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        /* ... existing styles ... */
        
        /* Enhanced dashboard styles */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        .countdown-container {
          margin-top: 20px;
          text-align: center;
        }
        .analysis-message {
          margin-top: 15px;
          padding: 10px;
          border-radius: 5px;
          background-color: #f5f5f5;
        }
        .harmonic-display {
          height: 100px;
          background: linear-gradient(90deg, 
            rgba(41, 128, 185, 0.1), 
            rgba(41, 128, 185, 0.5), 
            rgba(41, 128, 185, 0.1)
          );
          border-radius: 5px;
          position: relative;
          margin-top: 10px;
          overflow: hidden;
        }
        .harmonic-wave {
          position: absolute;
          height: 100%;
          width: 100%;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 20px,
            rgba(255, 255, 255, 0.1) 20px,
            rgba(255, 255, 255, 0.1) 40px
          );
          animation: wave 8s linear infinite;
        }
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(40px); }
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Buffer Integrity Dashboard</h1>
        <p>Heat Shield Monitoring - The narrow bridge between chaos and control</p>
        <div class="status-indicator">
          <div class="status-light light-${this.bufferStatus.status}"></div>
          <h2>System Status: ${this.bufferStatus.status.toUpperCase()}</h2>
        </div>
      </header>
      
      <main class="container">
        <div class="dashboard-grid">
          ${earlyWarningSection}
          ${breathingAnalysisSection}
          
          <!-- Buffer Value Card -->
          <div class="dashboard-card">
            <h2>Buffer Value</h2>
            <div class="gauge-container">
              <!-- Gauge visualization here -->
            </div>
            <div class="metrics-container">
              <div class="metric">
                <h3>Current</h3>
                <p class="status-${this.bufferStatus.status}">${this.bufferStatus.currentValue.toFixed(3)}</p>
              </div>
              <div class="metric">
                <h3>Target</h3>
                <p>0.100</p>
              </div>
              <div class="metric">
                <h3>Deviation</h3>
                <p>${Math.abs(this.bufferStatus.currentValue - 0.1).toFixed(3)}</p>
              </div>
            </div>
          </div>
          
          <!-- Network Health Card -->
          <div class="dashboard-card">
            <h2>Network Health</h2>
            <div class="metrics-container">
              <div class="metric">
                <h3>Concepts</h3>
                <p>${networkHealth.conceptCount || 0}</p>
              </div>
              <div class="metric">
                <h3>Connections</h3>
                <p>${networkHealth.connectionCount || 0}</p>
              </div>
              <div class="metric">
                <h3>Mean Buffer</h3>
                <p>${networkHealth.meanBuffer?.toFixed(3) || '0.000'}</p>
              </div>
              <div class="metric">
                <h3>Worst Dev</h3>
                <p class="status-${networkHealth.worstDeviationStatus || 'optimal'}">${networkHealth.worstDeviation?.toFixed(3) || '0.000'}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Buffer Timeline Chart -->
        <div class="chart-container">
          <h2>Buffer Timeline with Forecast</h2>
          <canvas id="buffer-chart"></canvas>
        </div>
        
        <!-- Additional analysis card -->
        <div class="dashboard-card">
          <h2>Harmonic Analysis</h2>
          <p>The system is detecting buffer fluctuation patterns that may indicate future issues:</p>
          
          <div class="harmonic-display">
            <div class="harmonic-wave"></div>
          </div>
          
          <div class="metrics-container">
            <div class="metric">
              <h3>Patterns</h3>
              <p>${earlyWarningStatus.harmonicPatterns?.length || 0}</p>
            </div>
            <div class="metric">
              <h3>Strongest</h3>
              <p>${earlyWarningStatus.harmonicPatterns?.length ? 
                earlyWarningStatus.harmonicPatterns.sort((a,b) => b.strength - a.strength)[0].strength.toFixed(2) : 
                'N/A'}</p>
            </div>
            <div class="metric">
              <h3>Forecast</h3>
              <p class="status-${earlyWarningStatus.status}">${earlyWarningStatus.status}</p>
            </div>
          </div>
          
          <div class="analysis-message">
            <p>The buffer is currently ${
              this.bufferStatus.status === 'optimal' ? 
              'stable within acceptable parameters.' :
              this.bufferStatus.status === 'warning' ?
              'showing signs of deterioration that require attention.' :
              'critically unstable and requires immediate intervention.'
            }</p>
            
            ${breathingStatus.cycleDetected ? `
            <p>Breathing pattern analysis indicates ${breathingStatus.rhythm} cycles that are ${
              breathingStatus.phase === 'rising' ? 'currently improving' : 'trending downward'
            }.</p>
            ` : ''}
            
            ${timeToCritical.warning !== null || timeToCritical.critical !== null ? `
            <p class="status-warning">Recommended action: ${
              timeToCritical.critical !== null && timeToCritical.critical < 10 ?
              'Immediate heat shield activation required' :
              timeToCritical.warning !== null && timeToCritical.warning < 5 ?
              'Prepare heat shield for activation' :
              'Continue monitoring with increased frequency'
            }</p>
            ` : ''}
          </div>
        </div>
      </main>
      
      <footer>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <p>Buffer Integrity Dashboard v2.0 - Enhanced with harmonic pattern detection</p>
      </footer>
      
      <script>
        // Buffer chart initialization
        const bufferChart = document.getElementById('buffer-chart').getContext('2d');
        
        // Combine historical and forecast data
        const labels = [
          ...${JSON.stringify(bufferTimeline.map(d => new Date(d.timestamp).toLocaleTimeString()))},
          ...${JSON.stringify(forecastData.map((d, i) => 'F+' + (i+1)))}
        ];
        
        const bufferData = [
          ...${JSON.stringify(bufferTimeline.map(d => d.buffer))},
          ...${JSON.stringify(forecastData.map(d => d.buffer))}
        ];
        
        const heatShieldData = [
          ...${JSON.stringify(bufferTimeline.map(d => d.heatShieldActive ? 0.15 : null))},
          ...Array(${forecastData.length}).fill(null)
        ];
        
        const warningThreshold = Array(labels.length).fill(${this.config.thresholds.warning});
        const criticalThreshold = Array(labels.length).fill(${this.config.thresholds.critical});
        const targetBuffer = Array(labels.length).fill(${this.config.bufferValue});
        
        // Create chart
        new Chart(bufferChart, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Buffer Value',
                data: bufferData,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                pointBackgroundColor: function(context) {
                  const index = context.dataIndex;
                  // Forecast points are more transparent
                  return index >= ${bufferTimeline.length} ? 'rgba(52, 152, 219, 0.5)' : 'rgba(52, 152, 219, 1)';
                },
                pointBorderColor: function(context) {
                  const index = context.dataIndex;
                  return index >= ${bufferTimeline.length} ? 'rgba(52, 152, 219, 0.5)' : 'rgba(52, 152, 219, 1)';
                },
                pointRadius: function(context) {
                  const index = context.dataIndex;
                  return index >= ${bufferTimeline.length} ? 3 : 5;
                },
                tension: 0.2
              },
              {
                label: 'Target (0.1)',
                data: targetBuffer,
                backgroundColor: 'transparent',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0
              },
              {
                label: 'Warning Threshold',
                data: warningThreshold,
                backgroundColor: 'transparent',
                borderColor: 'rgba(243, 156, 18, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0
              },
              {
                label: 'Critical Threshold',
                data: criticalThreshold,
                backgroundColor: 'transparent',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0
              },
              {
                label: 'Heat Shield Active',
                data: heatShieldData,
                backgroundColor: 'rgba(243, 156, 18, 0.3)',
                borderColor: 'transparent',
                pointRadius: 0,
                fill: true
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: false,
                min: 0,
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
                  },
                  footer: function(tooltipItems) {
                    const index = tooltipItems[0].dataIndex;
                    if (index >= ${bufferTimeline.length}) {
                      const forecastIndex = index - ${bufferTimeline.length};
                      const forecast = ${JSON.stringify(forecastData)}[forecastIndex];
                      if (forecast.warning) {
                        return 'WARNING: Predicted buffer violation';
                      } else if (forecast.critical) {
                        return 'CRITICAL: Predicted critical violation';
                      } else {
                        return 'Forecast data point';
                      }
                    }
                    const historical = ${JSON.stringify(bufferTimeline)}[index];
                    return historical.heatShieldActive ? 'Heat Shield Active' : '';
                  }
                }
              }
            }
          }
        });
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