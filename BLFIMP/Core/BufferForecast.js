// BufferForecast.js - Predictive buffer integrity forecasting system
// Detecting the engine's purring before it becomes a warning light
const fs = require('fs');
const path = require('path');
const SQLiteDatabase = require('./SQLiteDatabase');

class BufferForecast {
  constructor(database) {
    this.db = database;
    this.bufferValue = 0.1; // The narrow bridge - exact, non-negotiable
    this.historicalData = []; // Buffer readings over time
    this.forecastHorizon = 20; // How far ahead to forecast
    this.trainingWindow = 30; // How much historical data to use
    this.patternMemory = []; // Identified patterns
    this.alarms = []; // Predicted future violations
    
    // Forecasting parameters
    this.params = {
      learningRate: 0.03,
      decayFactor: 0.92,
      noiseThreshold: 0.006,
      patternMatchThreshold: 0.85,
      criticalThreshold: 0.05,
      warningThreshold: 0.08
    };
    
    // Breathing pattern detection
    this.breathing = {
      cycleDetected: false,
      cycleLength: 0,
      amplitude: 0,
      phase: 0,
      rhythm: 'unknown'
    };

    // Enhanced adaptive learning system
    this.adaptiveLearning = {
      enabled: true,
      patternConfidence: 0,
      falsePositives: 0,
      falseNegatives: 0,
      patterns: [],
      lastAdjustment: Date.now(),
      adjustmentFrequency: 5 * 60 * 1000 // 5 minutes
    };
    
    // Early warning system enhancement
    this.earlyWarning = {
      status: 'normal',
      confidenceLevel: 1.0,
      detectionThreshold: 0.75,
      lastWarningTime: null,
      warningHistory: [],
      harmonicPatterns: [],
      frequencyDomain: []
    };
    
    console.log('Enhanced Buffer Forecast system initialized - engine light warning system active with harmonic detection');
  }
  
  /**
   * Format time in seconds to minutes:seconds
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + secs.toString().padStart(2, '0');
  }
  
  /**
   * Ingest new buffer integrity data
   * @param {Object} dataPoint - New buffer reading
   */
  addDataPoint(dataPoint) {
    // Ensure dataPoint has required structure
    const normalizedPoint = {
      timestamp: dataPoint.timestamp || Date.now(),
      buffer: typeof dataPoint.buffer === 'number' ? dataPoint.buffer : this.bufferValue,
      quantum_state: dataPoint.quantum_state || 'unknown',
      heat_shield_active: !!dataPoint.heat_shield_active,
      source: dataPoint.source || 'manual'
    };
    
    // Add to historical data, keeping the window limited
    this.historicalData.push(normalizedPoint);
    if (this.historicalData.length > this.trainingWindow) {
      this.historicalData.shift();
    }
    
    // Detect breathing patterns after each new data point
    this.detectBreathingPatterns();
    
    // Enhanced: Perform harmonic analysis for more advanced pattern detection
    this.detectHarmonicPatterns();
    
    // Enhanced: Update adaptive learning parameters
    this.updateAdaptiveLearning();
    
    // Update forecasts and early warning system
    this.generateForecast();
    this.updateEarlyWarningSystem();
  }
  
  /**
   * Detect breathing patterns in buffer fluctuations
   * The subtle purring of the engine that indicates future problems
   */
  detectBreathingPatterns() {
    if (this.historicalData.length < 10) return; // Need minimum data
    
    // Extract just buffer values for analysis
    const bufferValues = this.historicalData.map(d => d.buffer);
    
    // Calculate moving average with adaptive window size
    const windowSize = Math.min(5, Math.max(3, Math.floor(bufferValues.length / 10)));
    const movingAvg = [];
    for (let i = windowSize; i < bufferValues.length; i++) {
      const windowSum = bufferValues.slice(i - windowSize, i).reduce((a, b) => a + b, 0);
      movingAvg.push(windowSum / windowSize);
    }
    
    // Detect zero crossings to identify cycles
    const deviations = [];
    for (let i = 1; i < movingAvg.length; i++) {
      deviations.push(movingAvg[i] - movingAvg[i-1]);
    }
    
    // Enhanced: Use median filtering to reduce noise
    const medianFiltered = this.medianFilter(deviations, 3);
    
    // Count sign changes to detect cycles
    let signChanges = 0;
    let lastSign = Math.sign(medianFiltered[0]);
    for (let i = 1; i < medianFiltered.length; i++) {
      const currentSign = Math.sign(medianFiltered[i]);
      if (currentSign !== 0 && currentSign !== lastSign) {
        signChanges++;
        lastSign = currentSign;
      }
    }
    
    // Calculate cycle properties
    if (signChanges >= 4) { // Need at least 2 complete cycles to confirm pattern
      // Approximate cycle length
      this.breathing.cycleDetected = true;
      this.breathing.cycleLength = Math.floor(medianFiltered.length / (signChanges / 2));
      
      // Calculate amplitude (max deviation from mean)
      const mean = bufferValues.reduce((a, b) => a + b, 0) / bufferValues.length;
      const maxDeviation = Math.max(...bufferValues.map(v => Math.abs(v - mean)));
      this.breathing.amplitude = maxDeviation;
      
      // Determine breathing rhythm
      if (this.breathing.cycleLength < 4) {
        this.breathing.rhythm = 'rapid';
      } else if (this.breathing.cycleLength < 8) {
        this.breathing.rhythm = 'normal';
      } else {
        this.breathing.rhythm = 'slow';
      }
      
      // Determine current phase
      const recentPattern = medianFiltered.slice(-this.breathing.cycleLength);
      const risingPhase = recentPattern.filter(d => d > 0).length;
      const fallingPhase = recentPattern.filter(d => d < 0).length;
      this.breathing.phase = risingPhase > fallingPhase ? 'rising' : 'falling';
      
      // Enhanced: Store pattern with confidence level
      this.adaptiveLearning.patterns.push({
        cycleLength: this.breathing.cycleLength,
        amplitude: this.breathing.amplitude,
        rhythm: this.breathing.rhythm,
        phase: this.breathing.phase,
        confidence: this.calculatePatternConfidence(medianFiltered),
        timestamp: Date.now()
      });
      
      // Keep pattern memory manageable
      if (this.adaptiveLearning.patterns.length > 10) {
        this.adaptiveLearning.patterns.shift();
      }
    } else {
      this.breathing.cycleDetected = false;
    }
  }
  
  /**
   * NEW: Apply median filter to reduce noise in data
   * @param {Array} data - Data array to filter
   * @param {number} windowSize - Size of median filter window
   * @returns {Array} Filtered data
   */
  medianFilter(data, windowSize) {
    const result = [];
    const halfWindow = Math.floor(windowSize / 2);
    
    for (let i = 0; i < data.length; i++) {
      const windowStart = Math.max(0, i - halfWindow);
      const windowEnd = Math.min(data.length, i + halfWindow + 1);
      const values = data.slice(windowStart, windowEnd).sort((a, b) => a - b);
      result.push(values[Math.floor(values.length / 2)]);
    }
    
    return result;
  }
  
  /**
   * NEW: Calculate confidence in detected pattern
   * @param {Array} signal - Signal data
   * @returns {number} Confidence level (0-1)
   */
  calculatePatternConfidence(signal) {
    if (signal.length < 10) return 0.5;
    
    // Calculate signal regularity
    let irregularitySum = 0;
    for (let i = 1; i < signal.length - 1; i++) {
      // Check if point follows the trend of neighbors or breaks it
      const prevDelta = signal[i] - signal[i-1];
      const nextDelta = signal[i+1] - signal[i];
      if (Math.sign(prevDelta) !== Math.sign(nextDelta)) {
        irregularitySum += 1;
      }
    }
    
    // Normalize irregularity (0 means perfectly regular, 1 means completely irregular)
    const irregularity = irregularitySum / (signal.length - 2);
    
    // Convert to confidence (1 - irregularity, adjusted to 0.5-1.0 range)
    return 0.5 + 0.5 * (1 - irregularity);
  }
  
  /**
   * NEW: Detect harmonic patterns in buffer fluctuations
   * More advanced pattern detection for engine purring
   */
  detectHarmonicPatterns() {
    if (this.historicalData.length < 15) return; // Need more data for harmonic analysis
    
    const bufferValues = this.historicalData.map(d => d.buffer);
    
    // Calculate autocorrelation to find repeating patterns
    const autoCorr = this.calculateAutocorrelation(bufferValues);
    
    // Find peaks in autocorrelation (indicates periodicity)
    const peaks = this.findPeaks(autoCorr, 3);
    
    // Store frequency domain information
    this.earlyWarning.frequencyDomain = autoCorr;
    
    if (peaks.length > 0) {
      // Store harmonic patterns
      this.earlyWarning.harmonicPatterns = peaks.map(peak => ({
        period: peak.index,
        strength: peak.value,
        timestamp: Date.now()
      }));
    }
  }
  
  /**
   * NEW: Calculate autocorrelation of signal
   * @param {Array} signal - Signal to analyze
   * @returns {Array} Autocorrelation values
   */
  calculateAutocorrelation(signal) {
    const result = [];
    const mean = signal.reduce((a, b) => a + b, 0) / signal.length;
    const normalizedSignal = signal.map(v => v - mean);
    
    for (let lag = 0; lag < signal.length / 2; lag++) {
      let numerator = 0;
      let denominator = 0;
      
      for (let i = 0; i < signal.length - lag; i++) {
        numerator += normalizedSignal[i] * normalizedSignal[i + lag];
        denominator += normalizedSignal[i] * normalizedSignal[i];
      }
      
      result.push(denominator !== 0 ? numerator / denominator : 0);
    }
    
    return result;
  }
  
  /**
   * NEW: Find peaks in a signal
   * @param {Array} signal - Signal to analyze
   * @param {number} minDistance - Minimum distance between peaks
   * @returns {Array} Peak positions and values
   */
  findPeaks(signal, minDistance) {
    const peaks = [];
    
    for (let i = 1; i < signal.length - 1; i++) {
      if (signal[i] > signal[i-1] && signal[i] > signal[i+1]) {
        peaks.push({index: i, value: signal[i]});
      }
    }
    
    // Filter peaks that are too close
    return peaks.filter((peak, index) => {
      if (index === 0) return true;
      return peak.index - peaks[index-1].index >= minDistance;
    });
  }
  
  /**
   * NEW: Update adaptive learning parameters
   * This adjusts forecasting parameters based on historical accuracy
   */
  updateAdaptiveLearning() {
    const now = Date.now();
    if (!this.adaptiveLearning.enabled) return;
    
    // Only update periodically
    if (now - this.adaptiveLearning.lastAdjustment < this.adaptiveLearning.adjustmentFrequency) {
      return;
    }
    
    this.adaptiveLearning.lastAdjustment = now;
    
    // Calculate pattern confidence based on historical patterns
    if (this.adaptiveLearning.patterns.length > 0) {
      const avgConfidence = this.adaptiveLearning.patterns.reduce((sum, p) => sum + p.confidence, 0) / 
        this.adaptiveLearning.patterns.length;
      this.adaptiveLearning.patternConfidence = avgConfidence;
    }
    
    // Adjust learning parameters based on performance
    if (this.adaptiveLearning.falsePositives > this.adaptiveLearning.falseNegatives) {
      // Too many false alarms, make detection more conservative
      this.params.patternMatchThreshold = Math.min(0.95, this.params.patternMatchThreshold + 0.01);
      this.earlyWarning.detectionThreshold = Math.min(0.95, this.earlyWarning.detectionThreshold + 0.02);
    } else if (this.adaptiveLearning.falseNegatives > this.adaptiveLearning.falsePositives) {
      // Too many missed warnings, make detection more sensitive
      this.params.patternMatchThreshold = Math.max(0.7, this.params.patternMatchThreshold - 0.01);
      this.earlyWarning.detectionThreshold = Math.max(0.6, this.earlyWarning.detectionThreshold - 0.02);
    }
    
    // Adjust noise threshold based on observed data
    if (this.historicalData.length > 10) {
      const recent = this.historicalData.slice(-10);
      const differences = [];
      for (let i = 1; i < recent.length; i++) {
        differences.push(Math.abs(recent[i].buffer - recent[i-1].buffer));
      }
      // Use 75th percentile of differences as noise threshold
      differences.sort((a, b) => a - b);
      const noiseEstimate = differences[Math.floor(differences.length * 0.75)];
      this.params.noiseThreshold = Math.max(0.001, Math.min(0.01, noiseEstimate));
    }
  }
  
  /**
   * NEW: Update early warning system
   * Determines if preemptive action is needed
   */
  updateEarlyWarningSystem() {
    // Default to normal status
    let newStatus = 'normal';
    let confidenceLevel = 1.0;
    
    // Check if forecast contains values in warning/critical range
    const forecast = this.generateForecast();
    const warningPoints = forecast.filter(p => p.buffer < this.params.warningThreshold);
    const criticalPoints = forecast.filter(p => p.buffer < this.params.criticalThreshold);
    
    // Calculate time to critical
    const timeToCritical = this.calculateTimeToCritical();
    
    // Calculate current trend from historical data
    let trend = 0;
    if (this.historicalData.length > 5) {
      const recentData = this.historicalData.slice(-5);
      // Simple linear regression for trend
      const sum = recentData.reduce((acc, point, i) => {
        return acc + (point.buffer - recentData[0].buffer) * (i / (recentData.length - 1));
      }, 0);
      trend = sum / recentData.length;
    }
    
    // Check breathing pattern
    if (this.breathing.cycleDetected) {
      // Factor in breathing pattern
      if (this.breathing.rhythm === 'rapid' && this.breathing.amplitude > 0.02) {
        newStatus = 'attention';
        confidenceLevel = 0.8;
      }
      
      // Check if we're in falling phase heading toward warning threshold
      if (this.breathing.phase === 'falling' && 
          forecast[0].buffer < this.bufferValue &&
          forecast[0].buffer - this.breathing.amplitude < this.params.warningThreshold) {
        newStatus = 'warning';
        confidenceLevel = this.adaptiveLearning.patternConfidence;
      }
    }
    
    // Check harmonic patterns
    if (this.earlyWarning.harmonicPatterns.length > 0) {
      // Strong harmonic with decreasing trend
      const strongestHarmonic = this.earlyWarning.harmonicPatterns.sort((a, b) => b.strength - a.strength)[0];
      if (strongestHarmonic.strength > 0.7 && trend < -0.001) {
        newStatus = 'warning';
        confidenceLevel = Math.max(confidenceLevel, strongestHarmonic.strength);
      }
    }
    
    // Direct forecast check
    if (warningPoints.length > 0) {
      newStatus = 'warning';
      confidenceLevel = Math.min(1.0, 0.7 + (warningPoints.length / forecast.length) * 0.3);
    }
    
    if (criticalPoints.length > 0) {
      newStatus = 'critical';
      confidenceLevel = Math.min(1.0, 0.8 + (criticalPoints.length / forecast.length) * 0.2);
    }
    
    // Check if time to critical is very short
    if (timeToCritical.critical < 5 && timeToCritical.critical > 0) {
      newStatus = 'critical';
      confidenceLevel = 0.95;
    } else if (timeToCritical.warning < 3 && timeToCritical.warning > 0) {
      newStatus = 'warning';
      confidenceLevel = 0.9;
    }
    
    // Update status
    this.earlyWarning.status = newStatus;
    this.earlyWarning.confidenceLevel = confidenceLevel;
    
    // Record warning if status changed to warning/critical
    if ((newStatus === 'warning' || newStatus === 'critical') && 
        confidenceLevel > this.earlyWarning.detectionThreshold) {
      this.earlyWarning.lastWarningTime = Date.now();
      this.earlyWarning.warningHistory.push({
        timestamp: Date.now(),
        status: newStatus,
        confidence: confidenceLevel,
        timeToCritical: timeToCritical.critical,
        timeToWarning: timeToCritical.warning
      });
      
      // Keep history manageable
      if (this.earlyWarning.warningHistory.length > 20) {
        this.earlyWarning.warningHistory.shift();
      }
    }
    
    return {
      status: newStatus,
      confidence: confidenceLevel,
      timeToCritical: timeToCritical
    };
  }
  
  /**
   * Generate forecast of future buffer values
   * @returns {Array} Predicted future buffer states
   */
  generateForecast() {
    // Need minimum data to make predictions
    if (this.historicalData.length < 5) return [];
    
    // Extract buffer values
    const bufferValues = this.historicalData.map(d => d.buffer);
    const timePoints = this.historicalData.map(d => d.timestamp);
    
    // Initialize forecast array with latest values
    const forecast = [];
    
    // Determine current trend using exponential moving average
    const alpha = this.params.learningRate;
    let trend = 0;
    for (let i = 1; i < bufferValues.length; i++) {
      const newTrend = bufferValues[i] - bufferValues[i-1];
      trend = alpha * newTrend + (1 - alpha) * trend;
    }
    
    // Base forecast on current value
    let currentValue = bufferValues[bufferValues.length - 1];
    
    // If breathing pattern detected, use it to improve forecast
    if (this.breathing.cycleDetected) {
      // Generate forecast incorporating breathing pattern
      for (let i = 0; i < this.forecastHorizon; i++) {
        // Calculate time since last measurement
        const nextTime = timePoints[timePoints.length - 1] + (i + 1) * 
          (timePoints[timePoints.length - 1] - timePoints[timePoints.length - 2]);
        
        // Apply trend with decay
        const trendComponent = trend * Math.pow(this.params.decayFactor, i);
        
        // Apply breathing pattern if detected
        let breathingComponent = 0;
        if (this.breathing.cycleDetected) {
          // Calculate position in cycle
          const cyclePosition = i % this.breathing.cycleLength;
          const cyclePhase = 2 * Math.PI * cyclePosition / this.breathing.cycleLength;
          // Add sinusoidal component
          breathingComponent = this.breathing.amplitude * Math.sin(cyclePhase);
        }
        
        // Generate next value
        let nextValue = currentValue + trendComponent + breathingComponent;
        
        // Apply random noise (smaller than threshold)
        const noise = (Math.random() - 0.5) * this.params.noiseThreshold;
        nextValue += noise;
        
        // Ensure value stays in reasonable bounds
        nextValue = Math.max(0.001, Math.min(0.2, nextValue));
        
        // Add to forecast
        forecast.push({
          timestamp: nextTime,
          buffer: nextValue,
          trend: trendComponent,
          breathing: breathingComponent,
          noise: noise,
          warning: nextValue < this.params.warningThreshold,
          critical: nextValue < this.params.criticalThreshold
        });
        
        // Update current value for next iteration
        currentValue = nextValue;
      }
    } else {
      // Simple exponential forecast without breathing pattern
      for (let i = 0; i < this.forecastHorizon; i++) {
        // Calculate time since last measurement
        const nextTime = timePoints[timePoints.length - 1] + (i + 1) * 
          (timePoints[timePoints.length - 1] - timePoints[timePoints.length - 2]);
        
        // Apply trend with decay
        const trendComponent = trend * Math.pow(this.params.decayFactor, i);
        
        // Generate next value
        let nextValue = currentValue + trendComponent;
        
        // Apply random noise (smaller than threshold)
        const noise = (Math.random() - 0.5) * this.params.noiseThreshold;
        nextValue += noise;
        
        // Ensure value stays in reasonable bounds
        nextValue = Math.max(0.001, Math.min(0.2, nextValue));
        
        // Add to forecast
        forecast.push({
          timestamp: nextTime,
          buffer: nextValue,
          trend: trendComponent,
          breathing: 0,
          noise: noise,
          warning: nextValue < this.params.warningThreshold,
          critical: nextValue < this.params.criticalThreshold
        });
        
        // Update current value for next iteration
        currentValue = nextValue;
      }
    }
    
    // Look for upcoming warnings or critical points
    this.alarms = forecast.filter(f => f.warning || f.critical);
    
    // Return the forecast
    return forecast;
  }
  
  /**
   * Get the earliest predicted alarm point
   * @returns {Object|null} Earliest predicted alarm or null if none found
   */
  getEarliestAlarm() {
    if (this.alarms.length === 0) return null;
    
    // Sort alarms by timestamp
    const sortedAlarms = [...this.alarms].sort((a, b) => a.timestamp - b.timestamp);
    
    // Return earliest
    return sortedAlarms[0];
  }
  
  /**
   * Calculate time to critical threshold
   * @returns {Object} Time estimates to warning and critical thresholds
   */
  calculateTimeToCritical() {
    if (this.historicalData.length === 0) return { warning: null, critical: null };
    
    // Get current buffer value
    const currentBuffer = this.historicalData[this.historicalData.length - 1].buffer;
    
    // If already below thresholds, return 0
    const result = {
      warning: currentBuffer <= this.params.warningThreshold ? 0 : null,
      critical: currentBuffer <= this.params.criticalThreshold ? 0 : null
    };
    
    // If no forecast, return current status only
    if (!this.alarms || this.alarms.length === 0) return result;
    
    // Find earliest warning and critical points
    const warningPoint = this.alarms.find(a => a.warning);
    const criticalPoint = this.alarms.find(a => a.critical);
    
    // Calculate time to these points
    if (warningPoint && result.warning === null) {
      const latestTime = this.historicalData[this.historicalData.length - 1].timestamp;
      result.warning = Math.max(0, (warningPoint.timestamp - latestTime) / 1000); // in seconds
    }
    
    if (criticalPoint && result.critical === null) {
      const latestTime = this.historicalData[this.historicalData.length - 1].timestamp;
      result.critical = Math.max(0, (criticalPoint.timestamp - latestTime) / 1000); // in seconds
    }
    
    return result;
  }
  
  /**
   * Generate visualization of buffer forecasts
   * @param {string} outputPath - Path to save the HTML output
   * @returns {Promise<string>} - Path to the generated HTML file
   */
  async generateVisualization(outputPath) {
    // If no forecast exists, generate one
    this.generateForecast();
    
    // Prepare data for visualization
    const historicalData = this.historicalData.map(d => ({
      time: new Date(d.timestamp).toLocaleTimeString(),
      buffer: d.buffer,
      heat_shield: d.heat_shield_active
    }));
    
    const forecastData = this.generateForecast().map((f, i) => ({
      time: `F+${i+1}`,
      buffer: f.buffer,
      warning: f.warning,
      critical: f.critical
    }));
    
    // Time to critical calculations
    const timeToCritical = this.calculateTimeToCritical();
    const breathingStatus = this.breathing;
    
    // Current status
    const currentBuffer = this.historicalData.length > 0 
      ? this.historicalData[this.historicalData.length - 1].buffer
      : this.bufferValue;
    
    const status = currentBuffer < this.params.criticalThreshold ? 'critical' :
                  currentBuffer < this.params.warningThreshold ? 'warning' :
                  'optimal';
    
    // Create HTML content
    const html = this.generateHtml(historicalData, forecastData, timeToCritical, breathingStatus, status);
    
    // Write to file
    const outputFile = outputPath || path.join(__dirname, 'blf-forecast.html');
    fs.writeFileSync(outputFile, html);
    
    console.log(`Buffer forecast visualization generated at: ${outputFile}`);
    return outputFile;
  }
  
  /**
   * Generate HTML for visualization
   */
  generateHtml(historicalData, forecastData, timeToCritical, breathingStatus, status) {
    // Combine historical and forecast data for the chart
    const timeLabels = [
      ...historicalData.map(d => d.time),
      ...forecastData.map(d => d.time)
    ];
    
    const bufferValues = [
      ...historicalData.map(d => d.buffer),
      ...forecastData.map(d => d.buffer)
    ];
    
    const warningThreshold = Array(timeLabels.length).fill(this.params.warningThreshold);
    const criticalThreshold = Array(timeLabels.length).fill(this.params.criticalThreshold);
    
    // Create heat shield indicators for historical data
    const heatShieldValues = [
      ...historicalData.map(d => d.heat_shield ? 0.15 : null),
      ...Array(forecastData.length).fill(null)
    ];
    
    // Create warning zone highlights for forecast data
    const warningZone = [
      ...Array(historicalData.length).fill(null),
      ...forecastData.map(d => d.warning && !d.critical ? 0.08 : null)
    ];
    
    // Create critical zone highlights for forecast data
    const criticalZone = [
      ...Array(historicalData.length).fill(null),
      ...forecastData.map(d => d.critical ? 0.05 : null)
    ];
    
    // Historical-forecast divider index
    const dividerIndex = historicalData.length;
    
    return `<!DOCTYPE html>
<html>
<head>
  <title>BLF Buffer Forecast - Predictive Engine Light Warning</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style type="text/css">
    body, html {
      font-family: Arial, sans-serif;
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
      margin-bottom: 20px;
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
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 20px;
    }
    .metric {
      flex: 1;
      min-width: 100px;
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
    .forecast-divider {
      border-left: 2px dashed #666;
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }
    .countdown {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
    }
    .time-unit {
      font-size: 14px;
      color: #666;
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
  </style>
</head>
<body>
  <div class="header">
    <h1>Buffer Forecast System</h1>
    <p>Predictive engine light warning - detecting the purr before the problem</p>
  </div>
  
  <div class="container">
    <div class="dashboard">
      <div class="dashboard-card">
        <h2>Buffer Status</h2>
        <div class="status-indicator">
          <div class="status-light light-${status}"></div>
          <h3 class="status-${status}">${status.toUpperCase()}</h3>
        </div>
        
        <div class="breathing-status">
          <div class="breathing-indicator" style="background-color: ${breathingStatus.cycleDetected ? '#3498DB' : '#ccc'};"></div>
          <p>Breathing: ${breathingStatus.cycleDetected ? breathingStatus.rhythm + ' rhythm' : 'Not detected'}</p>
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
        </div>
      </div>
    </div>
    
    <div class="chart-container">
      <h2>Buffer Forecast Timeline</h2>
      <div style="position: relative;">
        <div class="forecast-divider" style="left: ${(dividerIndex / timeLabels.length) * 100}%;"></div>
        <canvas id="forecast-chart"></canvas>
      </div>
      <div style="text-align: center; margin-top: 10px; color: #666;">
        <span style="margin-right: 20px;">◀ Historical Data</span>
        <span>Forecast Data ▶</span>
      </div>
    </div>
    
    <div class="dashboard-card">
      <h2>Forecast Analysis</h2>
      <p>The buffer forecast system analyzes patterns in buffer deterioration before they manifest as problems. The current analysis shows:</p>
      
      ${breathingStatus.cycleDetected ? `
      <p>A ${breathingStatus.rhythm} breathing pattern has been detected with cycle length of ${breathingStatus.cycleLength} time units and amplitude of ${breathingStatus.amplitude.toFixed(3)}. The buffer is currently in the ${breathingStatus.phase} phase of the cycle.</p>
      ` : `
      <p>No regular breathing pattern has been detected in the buffer values. This could indicate stable conditions or insufficient data for pattern recognition.</p>
      `}
      
      ${timeToCritical.warning !== null || timeToCritical.critical !== null ? `
      <p>Based on current trends and breathing patterns, the buffer is expected to reach ${timeToCritical.warning !== null ? 'warning threshold in ' + this.formatTime(timeToCritical.warning) : ''} ${timeToCritical.warning !== null && timeToCritical.critical !== null ? ' and ' : ''} ${timeToCritical.critical !== null ? 'critical threshold in ' + this.formatTime(timeToCritical.critical) : ''}.</p>
      
      <p class="status-warning">Recommended Action: Monitor buffer levels closely and prepare for heat shield activation. Consider preventative calibration to stabilize the buffer before it reaches critical levels.</p>
      ` : `
      <p>Based on current trends, no buffer violations are predicted in the forecast window. The buffer is expected to maintain integrity within acceptable parameters.</p>
      
      <p class="status-optimal">Status: Normal operation. Continue routine monitoring.</p>
      `}
    </div>
  </div>

  <script>
    // Format time function for display
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return mins + ':' + secs.toString().padStart(2, '0');
    }
    
    // Buffer forecast chart
    const forecastChart = document.getElementById('forecast-chart').getContext('2d');
    new Chart(forecastChart, {
      type: 'line',
      data: {
        labels: ${JSON.stringify(timeLabels)},
        datasets: [
          {
            label: 'Buffer Value',
            data: ${JSON.stringify(bufferValues)},
            borderColor: '#3498DB',
            pointBackgroundColor: function(context) {
              const index = context.dataIndex;
              // Change color for forecast points
              return index >= ${dividerIndex} ? 'rgba(52, 152, 219, 0.5)' : '#3498DB';
            },
            pointBorderColor: function(context) {
              const index = context.dataIndex;
              // Change color for forecast points
              return index >= ${dividerIndex} ? 'rgba(52, 152, 219, 0.5)' : '#3498DB';
            },
            pointRadius: function(context) {
              const index = context.dataIndex;
              // Smaller points for forecast
              return index >= ${dividerIndex} ? 3 : 4;
            },
            borderWidth: function(context) {
              const index = context.dataIndex;
              // Dashed line for forecast
              return index >= ${dividerIndex} ? 2 : 3;
            },
            borderDash: function(context) {
              const index = context.dataIndex;
              // Dashed line for forecast
              return index >= ${dividerIndex} ? [5, 5] : [];
            },
            tension: 0.2,
            fill: false
          },
          {
            label: 'Target (0.1)',
            data: ${JSON.stringify(Array(timeLabels.length).fill(0.1))},
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
            data: ${JSON.stringify(heatShieldValues)},
            backgroundColor: 'rgba(243, 156, 18, 0.3)',
            borderWidth: 0,
            pointRadius: 0,
            tension: 0,
            fill: true
          },
          {
            label: 'Warning Zone (Forecast)',
            data: ${JSON.stringify(warningZone)},
            backgroundColor: 'rgba(243, 156, 18, 0.2)',
            borderWidth: 0,
            pointRadius: 0,
            tension: 0,
            fill: true
          },
          {
            label: 'Critical Zone (Forecast)',
            data: ${JSON.stringify(criticalZone)},
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
              },
              footer: function(tooltipItems) {
                const index = tooltipItems[0].dataIndex;
                if (index >= ${dividerIndex}) {
                  return 'Forecast data point';
                }
                return '';
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
   * Import historical data from a buffer visualizer or monitor
   * @param {BufferVisualizer} bufferVisualizer - Source of historical data
   * @returns {number} Count of data points imported
   */
  importFromVisualizer(bufferVisualizer) {
    if (!bufferVisualizer || !bufferVisualizer.bufferData) {
      console.error('Invalid buffer visualizer data source');
      return 0;
    }
    
    // Convert buffer visualizer data format to forecast format
    const now = Date.now();
    const timeStep = 60000; // 1 minute steps for simulation data
    
    this.historicalData = bufferVisualizer.bufferData.map((d, i) => ({
      timestamp: now - (bufferVisualizer.bufferData.length - i) * timeStep,
      buffer: d.buffer,
      quantum_state: 'imported',
      heat_shield_active: d.heatShieldActive,
      source: 'visualizer'
    }));
    
    // Apply limits to historical window
    if (this.historicalData.length > this.trainingWindow) {
      this.historicalData = this.historicalData.slice(-this.trainingWindow);
    }
    
    console.log(`Imported ${this.historicalData.length} data points from visualizer`);
    
    // Update forecast based on new data
    this.detectBreathingPatterns();
    this.generateForecast();
    
    return this.historicalData.length;
  }
}

module.exports = BufferForecast;

// If run directly, create and run the forecast
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
      const forecast = new BufferForecast(db);
      
      // Generate some sample data for demonstration
      console.log('Generating sample data for forecast demonstration...');
      
      // Import from buffer visualizer if available
      try {
        const BufferVisualizer = require('./BufferVisualizer');
        const visualizer = new BufferVisualizer(db);
        
        // Configure simulation parameters 
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
        
        // Simulate buffer data
        visualizer.simulateBufferDynamics(deteriorationRate, recoveryRate, noiseLevel);
        
        // Import data
        forecast.importFromVisualizer(visualizer);
      } catch (err) {
        console.warn('Could not import from BufferVisualizer, using synthetic data');
        
        // Create synthetic data if no visualizer available
        const now = Date.now();
        const baseValue = 0.1;
        const timeStep = 60000; // 1 minute
        
        for (let i = 0; i < 30; i++) {
          // Create slightly deteriorating pattern with noise
          const noise = (Math.random() - 0.5) * 0.01;
          const trend = -0.002 * i;
          const cycle = 0.01 * Math.sin(i / 3);
          
          forecast.addDataPoint({
            timestamp: now - (30 - i) * timeStep,
            buffer: Math.max(0.01, baseValue + trend + cycle + noise),
            heat_shield_active: i > 25,
            source: 'synthetic'
          });
        }
      }
      
      // Generate the visualization
      const outputPath = path.join(__dirname, 'blf-forecast.html');
      await forecast.generateVisualization(outputPath);
      
      console.log(`\nBuffer forecast complete! Open ${outputPath} in your browser to view.`);
      
      // Close database connection
      await db.close();
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })();
} 