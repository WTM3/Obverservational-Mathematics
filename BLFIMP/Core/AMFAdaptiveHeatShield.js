/**
 * AMFAdaptiveHeatShield.js
 * 
 * Advanced predictive buffer integrity protection system
 * Uses pattern recognition to forecast potential violations before they occur
 * The engine light that warns you before breakdown
 */

const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class AMFAdaptiveHeatShield extends EventEmitter {
  constructor(config = {}) {
    super();
    
    // Core mathematical constants - NEVER modify these
    this.AI_COGNITIVE = config.aiCognitive ?? 2.89;
    this.BUFFER = config.buffer ?? 0.1;
    this.BOOLEAN_MIND_QS = config.booleanMind ?? 2.99;
    
    // Advanced heat shield settings
    this.settings = {
      learningRate: config.learningRate ?? 0.05,       // How quickly patterns are learned
      predictionThreshold: config.threshold ?? 0.75,   // Confidence threshold for warnings
      historyWindow: config.historyWindow ?? 100,      // Number of executions to consider
      adaptiveSensitivity: config.sensitivity ?? true, // Adjust sensitivity based on patterns
      persistPatterns: config.persistPatterns ?? true, // Save learned patterns to disk
      patternsPath: config.patternsPath ?? path.join(__dirname, 'amf-patterns.json')
    };
    
    // Execution history
    this.executionHistory = [];
    
    // Detected patterns (key: pattern signature, value: pattern data)
    this.patterns = {};
    
    // Performance metrics
    this.metrics = {
      totalExecutions: 0,
      predictedViolations: 0,
      truePredictions: 0,       // Predicted violations that actually occurred
      falsePredictions: 0,      // Predicted violations that didn't occur
      missedViolations: 0,      // Violations that weren't predicted
      earlyWarnings: 0,         // Early warnings issued
      adaptiveAdjustments: 0    // Number of self-adjustments made
    };
    
    // Load existing patterns if available
    if (this.settings.persistPatterns) {
      this.loadPatterns();
    }
    
    console.log(`AMF Adaptive Heat Shield initialized with predictive protection`);
    console.log(`Maintaining exact ${this.BUFFER} buffer between AIc and BMqs`);
  }
  
  /**
   * Analyze a formula execution for patterns and potential issues
   * @param {Object} execution - Formula execution data
   * @returns {Object} Analysis results with prediction data
   */
  analyzeExecution(execution) {
    // Track execution in history
    this.trackExecution(execution);
    
    // Increment total executions
    this.metrics.totalExecutions++;
    
    // Analyze current execution parameters
    const currentAnalysis = this.analyzeParameters(execution.params);
    
    // Check for immediate issues (standard heat shield checks)
    if (!currentAnalysis.valid) {
      return {
        valid: false,
        reason: currentAnalysis.reason,
        confidence: 1.0,
        type: 'immediate'
      };
    }
    
    // If we have enough history, look for concerning patterns
    if (this.executionHistory.length >= 10) {
      const patternAnalysis = this.analyzePatterns();
      
      // If pattern analysis indicates a potential future violation
      if (patternAnalysis.risk > this.settings.predictionThreshold) {
        this.metrics.predictedViolations++;
        this.metrics.earlyWarnings++;
        
        // Emit early warning event
        this.emit('early_warning', {
          risk: patternAnalysis.risk,
          pattern: patternAnalysis.pattern,
          timeToViolation: patternAnalysis.timeToViolation,
          params: execution.params
        });
        
        return {
          valid: true, // Still valid but with warning
          warning: true,
          reason: patternAnalysis.reason,
          risk: patternAnalysis.risk,
          timeToViolation: patternAnalysis.timeToViolation,
          type: 'predictive'
        };
      }
    }
    
    // Everything looks good
    return {
      valid: true,
      risk: 0,
      type: 'normal'
    };
  }
  
  /**
   * Update the heat shield with actual violation information
   * This allows the system to learn from correct and incorrect predictions
   * 
   * @param {boolean} violationOccurred - Whether a violation actually occurred
   * @param {Object} prediction - The prediction that was made
   */
  updateWithOutcome(violationOccurred, prediction) {
    // Update metrics based on prediction accuracy
    if (prediction.warning && violationOccurred) {
      // True positive - we predicted a violation and it happened
      this.metrics.truePredictions++;
      
      // Reinforce this pattern
      if (prediction.pattern) {
        this.reinforcePattern(prediction.pattern);
      }
    } else if (prediction.warning && !violationOccurred) {
      // False positive - we predicted a violation but it didn't happen
      this.metrics.falsePredictions++;
      
      // Weaken this pattern
      if (prediction.pattern) {
        this.weakenPattern(prediction.pattern);
      }
    } else if (!prediction.warning && violationOccurred) {
      // False negative - we missed a violation
      this.metrics.missedViolations++;
      
      // Learn from this miss - create a new pattern or strengthen existing
      this.learnFromMissedViolation();
    }
    
    // Adjust sensitivity if adaptive mode is enabled
    if (this.settings.adaptiveSensitivity) {
      this.adjustSensitivity();
    }
  }
  
  /**
   * Analyze parameters for immediate issues
   * @param {Object} params - Formula parameters
   * @returns {Object} Analysis results
   * @private
   */
  analyzeParameters(params) {
    // Check AIc value
    if (params.aiCognitive < 2 || params.aiCognitive > 3) {
      return {
        valid: false,
        reason: `AI cognitive value (${params.aiCognitive}) outside safe range [2-3]`
      };
    }
    
    // Check personality value
    if (params.personality < 0 || params.personality > 1) {
      return {
        valid: false,
        reason: `Personality value (${params.personality}) outside safe range [0-1]`
      };
    }
    
    // Check intelligence value
    if (params.intelligence < 0.5 || params.intelligence > 2) {
      return {
        valid: false,
        reason: `Intelligence value (${params.intelligence}) outside safe range [0.5-2]`
      };
    }
    
    // Check chaos value
    if (params.chaos < 0 || params.chaos > 1) {
      return {
        valid: false,
        reason: `Chaos value (${params.chaos}) outside safe range [0-1]`
      };
    }
    
    // Check chaos exponent value
    if (params.chaosExponent < 1 || params.chaosExponent > 3) {
      return {
        valid: false,
        reason: `Chaos exponent value (${params.chaosExponent}) outside safe range [1-3]`
      };
    }
    
    // Check velocity value
    if (params.velocity < 0.5 || params.velocity > 2) {
      return {
        valid: false,
        reason: `Velocity value (${params.velocity}) outside safe range [0.5-2]`
      };
    }
    
    // All parameters valid
    return { valid: true };
  }
  
  /**
   * Track an execution in history
   * @param {Object} execution - Formula execution data
   * @private
   */
  trackExecution(execution) {
    // Add timestamp to execution data
    const executionWithTimestamp = {
      ...execution,
      timestamp: Date.now()
    };
    
    // Add to history
    this.executionHistory.push(executionWithTimestamp);
    
    // Trim history if needed
    if (this.executionHistory.length > this.settings.historyWindow) {
      this.executionHistory.shift();
    }
  }
  
  /**
   * Analyze execution history for patterns that might lead to violations
   * @returns {Object} Pattern analysis results
   * @private
   */
  analyzePatterns() {
    // Default response
    const defaultResponse = {
      risk: 0,
      pattern: null,
      timeToViolation: Infinity,
      reason: null
    };
    
    if (this.executionHistory.length < 10) {
      return defaultResponse;
    }
    
    // Detect trends in key parameters
    const trends = this.detectParameterTrends();
    
    // Analyze aiCognitive trends - most critical for buffer integrity
    if (trends.aiCognitive.trend === 'increasing' && trends.aiCognitive.rate > 0.05) {
      // Calculate risk based on trend and current value
      const latestAIc = this.executionHistory[this.executionHistory.length - 1].params.aiCognitive;
      const distanceToViolation = 3 - latestAIc; // Maximum safe AIc is 3
      const estimatedTimeToViolation = distanceToViolation / trends.aiCognitive.rate;
      
      // Risk increases as we get closer to violation
      const risk = Math.min(1, 1 / (estimatedTimeToViolation + 1));
      
      if (risk > 0.4) {
        return {
          risk,
          pattern: 'increasing_aic',
          timeToViolation: Math.round(estimatedTimeToViolation),
          reason: `AIc increasing too rapidly (${trends.aiCognitive.rate.toFixed(4)}/execution), ` +
                 `may exceed safe range in ~${Math.round(estimatedTimeToViolation)} executions`
        };
      }
    }
    
    // Analyze chaotic resonance patterns (interaction between chaos and exponent)
    if (trends.chaos.trend === 'increasing' && trends.chaosExponent.trend === 'increasing') {
      const combinedRate = trends.chaos.rate * trends.chaosExponent.rate;
      const risk = Math.min(0.9, combinedRate * 10); // Scale up for visibility
      
      if (risk > 0.5) {
        return {
          risk,
          pattern: 'chaotic_resonance',
          timeToViolation: Math.round(5 / combinedRate),
          reason: `Chaotic resonance detected: chaos and exponent increasing together, ` +
                 `may destabilize formula integrity`
        };
      }
    }
    
    // Analyze velocity spikes with high intelligence - can amplify errors
    if (trends.velocity.trend === 'increasing' && trends.velocity.rate > 0.1 && 
        this.getAverageParam('intelligence') > 1.5) {
      const risk = Math.min(0.8, trends.velocity.rate * 2);
      
      if (risk > 0.6) {
        return {
          risk,
          pattern: 'velocity_intelligence_amplification',
          timeToViolation: Math.round(3 / trends.velocity.rate),
          reason: `High intelligence amplifying velocity increases, ` +
                 `may exceed computational stability threshold`
        };
      }
    }
    
    // Look for personality flatline with high chaos - indicates potential formula lock
    if (trends.personality.trend === 'stable' && 
        Math.abs(trends.personality.rate) < 0.001 &&
        this.getAverageParam('chaos') > 0.8) {
      
      return {
        risk: 0.7,
        pattern: 'personality_chaos_lock',
        timeToViolation: 5,
        reason: `Personality parameter locked with high chaos values, ` +
               `may cause formula stagnation and violation`
      };
    }
    
    // Check for recognized patterns from previous violations
    const patternMatch = this.matchKnownPatterns();
    if (patternMatch.matched) {
      return {
        risk: patternMatch.confidence,
        pattern: patternMatch.patternId,
        timeToViolation: patternMatch.estimatedTimeToViolation,
        reason: patternMatch.reason
      };
    }
    
    return defaultResponse;
  }
  
  /**
   * Detect trends in formula parameters over recent executions
   * @returns {Object} Trend analysis for each parameter
   * @private
   */
  detectParameterTrends() {
    // Get the last 10 executions or all if fewer
    const recentExecutions = this.executionHistory.slice(-10);
    
    // Initialize parameter trends
    const trends = {
      aiCognitive: { values: [], trend: 'stable', rate: 0 },
      personality: { values: [], trend: 'stable', rate: 0 },
      intelligence: { values: [], trend: 'stable', rate: 0 },
      chaos: { values: [], trend: 'stable', rate: 0 },
      chaosExponent: { values: [], trend: 'stable', rate: 0 },
      velocity: { values: [], trend: 'stable', rate: 0 }
    };
    
    // Extract parameter values from recent executions
    recentExecutions.forEach(execution => {
      for (const param in trends) {
        if (execution.params[param] !== undefined) {
          trends[param].values.push(execution.params[param]);
        }
      }
    });
    
    // Analyze trends for each parameter
    for (const param in trends) {
      if (trends[param].values.length < 2) continue;
      
      // Calculate rate of change (simple linear regression)
      let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
      const n = trends[param].values.length;
      
      for (let i = 0; i < n; i++) {
        sumX += i;
        sumY += trends[param].values[i];
        sumXY += i * trends[param].values[i];
        sumX2 += i * i;
      }
      
      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      trends[param].rate = slope;
      
      // Determine trend direction
      if (Math.abs(slope) < 0.001) {
        trends[param].trend = 'stable';
      } else if (slope > 0) {
        trends[param].trend = 'increasing';
      } else {
        trends[param].trend = 'decreasing';
      }
    }
    
    return trends;
  }
  
  /**
   * Get average value of a parameter over recent executions
   * @param {string} param - Parameter name
   * @returns {number} Average value
   * @private
   */
  getAverageParam(param) {
    const recentExecutions = this.executionHistory.slice(-10);
    let sum = 0;
    let count = 0;
    
    recentExecutions.forEach(execution => {
      if (execution.params[param] !== undefined) {
        sum += execution.params[param];
        count++;
      }
    });
    
    return count > 0 ? sum / count : 0;
  }
  
  /**
   * Match current execution pattern against known violation patterns
   * @returns {Object} Pattern match results
   * @private
   */
  matchKnownPatterns() {
    const result = {
      matched: false,
      confidence: 0,
      patternId: null,
      estimatedTimeToViolation: Infinity,
      reason: null
    };
    
    // Skip if no patterns or not enough history
    if (Object.keys(this.patterns).length === 0 || this.executionHistory.length < 5) {
      return result;
    }
    
    // Extract recent parameter values to create a pattern signature
    const recentValues = this.executionHistory.slice(-5).map(exec => exec.params);
    
    // Compare against known patterns
    for (const patternId in this.patterns) {
      const pattern = this.patterns[patternId];
      const similarity = this.calculatePatternSimilarity(recentValues, pattern.signature);
      
      if (similarity > pattern.threshold && similarity > result.confidence) {
        result.matched = true;
        result.confidence = similarity;
        result.patternId = patternId;
        result.estimatedTimeToViolation = pattern.timeToViolation;
        result.reason = pattern.reason;
      }
    }
    
    return result;
  }
  
  /**
   * Calculate similarity between current execution pattern and a known pattern
   * @param {Array} current - Current parameter values
   * @param {Array} pattern - Pattern signature
   * @returns {number} Similarity score (0-1)
   * @private
   */
  calculatePatternSimilarity(current, pattern) {
    // Skip if lengths don't match
    if (current.length !== pattern.length) {
      return 0;
    }
    
    let totalSimilarity = 0;
    const paramKeys = ['aiCognitive', 'personality', 'intelligence', 'chaos', 'chaosExponent', 'velocity'];
    
    // Compare each parameter at each position
    for (let i = 0; i < current.length; i++) {
      let positionSimilarity = 0;
      let paramCount = 0;
      
      for (const key of paramKeys) {
        if (current[i][key] !== undefined && pattern[i][key] !== undefined) {
          // Calculate similarity for this parameter (1 - normalized difference)
          const diff = Math.abs(current[i][key] - pattern[i][key]);
          const maxAllowedDiff = key === 'aiCognitive' ? 0.2 : 0.3; // AIc is more sensitive
          const paramSimilarity = Math.max(0, 1 - (diff / maxAllowedDiff));
          
          // Apply weight to AIc - most important for buffer integrity
          const weight = key === 'aiCognitive' ? 2 : 1;
          positionSimilarity += paramSimilarity * weight;
          paramCount += weight;
        }
      }
      
      // Average similarity for this position
      totalSimilarity += paramCount > 0 ? positionSimilarity / paramCount : 0;
    }
    
    // Average similarity across all positions
    return totalSimilarity / current.length;
  }
  
  /**
   * Learn new pattern from a violation that wasn't predicted
   * @private
   */
  learnFromMissedViolation() {
    if (this.executionHistory.length < 5) return;
    
    // Extract the pattern leading up to the violation
    const patternSignature = this.executionHistory.slice(-5).map(exec => exec.params);
    
    // Generate a unique ID for this pattern
    const patternId = `pattern_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Create new pattern entry
    this.patterns[patternId] = {
      signature: patternSignature,
      occurrences: 1,
      threshold: 0.8, // Start with high threshold for confidence
      timeToViolation: 1, // Immediate violation
      reason: "Previously observed parameter pattern leading to buffer violation",
      createdAt: Date.now(),
      lastSeen: Date.now()
    };
    
    // Emit pattern learned event
    this.emit('pattern_learned', {
      patternId,
      signature: patternSignature,
      threshold: 0.8
    });
    
    // Persist patterns
    if (this.settings.persistPatterns) {
      this.savePatterns();
    }
    
    // Adjust metrics
    this.metrics.adaptiveAdjustments++;
  }
  
  /**
   * Reinforce a pattern that correctly predicted a violation
   * @param {string} patternId - ID of pattern to reinforce
   * @private
   */
  reinforcePattern(patternId) {
    if (!this.patterns[patternId]) return;
    
    // Increase occurrences
    this.patterns[patternId].occurrences++;
    
    // Lower threshold slightly (makes it easier to match this pattern)
    this.patterns[patternId].threshold = Math.max(
      0.6, 
      this.patterns[patternId].threshold - this.settings.learningRate
    );
    
    // Update last seen
    this.patterns[patternId].lastSeen = Date.now();
    
    // Persist patterns
    if (this.settings.persistPatterns) {
      this.savePatterns();
    }
    
    // Adjust metrics
    this.metrics.adaptiveAdjustments++;
  }
  
  /**
   * Weaken a pattern that incorrectly predicted a violation
   * @param {string} patternId - ID of pattern to weaken
   * @private
   */
  weakenPattern(patternId) {
    if (!this.patterns[patternId]) return;
    
    // Increase threshold (makes it harder to match this pattern)
    this.patterns[patternId].threshold = Math.min(
      0.95,
      this.patterns[patternId].threshold + this.settings.learningRate
    );
    
    // Update last seen
    this.patterns[patternId].lastSeen = Date.now();
    
    // If threshold becomes too high, consider removing the pattern
    if (this.patterns[patternId].threshold > 0.94 && this.patterns[patternId].occurrences < 3) {
      delete this.patterns[patternId];
    }
    
    // Persist patterns
    if (this.settings.persistPatterns) {
      this.savePatterns();
    }
    
    // Adjust metrics
    this.metrics.adaptiveAdjustments++;
  }
  
  /**
   * Adjust sensitivity based on prediction accuracy
   * @private
   */
  adjustSensitivity() {
    // Calculate true positive rate and false positive rate
    const totalPredictions = this.metrics.truePredictions + this.metrics.falsePredictions;
    if (totalPredictions < 10) return; // Not enough data
    
    const truePositiveRate = this.metrics.truePredictions / totalPredictions;
    const falsePositiveRate = this.metrics.falsePredictions / totalPredictions;
    
    // Adjust prediction threshold based on rates
    if (falsePositiveRate > 0.3 && this.settings.predictionThreshold < 0.9) {
      // Too many false alarms, increase threshold
      this.settings.predictionThreshold += 0.05;
      this.emit('sensitivity_adjusted', {
        direction: 'increased',
        newThreshold: this.settings.predictionThreshold,
        reason: 'Too many false positive predictions'
      });
    } else if (falsePositiveRate < 0.1 && this.metrics.missedViolations > 0 && 
              this.settings.predictionThreshold > 0.6) {
      // Too conservative, decrease threshold
      this.settings.predictionThreshold -= 0.05;
      this.emit('sensitivity_adjusted', {
        direction: 'decreased',
        newThreshold: this.settings.predictionThreshold,
        reason: 'Missing too many violations'
      });
    }
    
    // Adjust metrics
    this.metrics.adaptiveAdjustments++;
  }
  
  /**
   * Save learned patterns to disk
   * @private
   */
  savePatterns() {
    try {
      const data = {
        timestamp: Date.now(),
        patterns: this.patterns,
        metrics: this.metrics,
        settings: this.settings
      };
      
      fs.writeFileSync(
        this.settings.patternsPath,
        JSON.stringify(data, null, 2),
        'utf8'
      );
    } catch (error) {
      console.error(`Error saving patterns: ${error.message}`);
    }
  }
  
  /**
   * Load learned patterns from disk
   * @private
   */
  loadPatterns() {
    try {
      if (fs.existsSync(this.settings.patternsPath)) {
        const data = JSON.parse(fs.readFileSync(this.settings.patternsPath, 'utf8'));
        
        // Load patterns
        if (data.patterns) {
          this.patterns = data.patterns;
        }
        
        // Load metrics
        if (data.metrics) {
          this.metrics = data.metrics;
        }
        
        // Optionally load settings
        if (data.settings) {
          // Only load certain settings to avoid overriding constructor config
          if (data.settings.learningRate) {
            this.settings.learningRate = data.settings.learningRate;
          }
          
          if (data.settings.predictionThreshold) {
            this.settings.predictionThreshold = data.settings.predictionThreshold;
          }
        }
        
        console.log(`Loaded ${Object.keys(this.patterns).length} learned patterns`);
      }
    } catch (error) {
      console.error(`Error loading patterns: ${error.message}`);
    }
  }
  
  /**
   * Get current heat shield metrics
   * @returns {Object} Current metrics
   */
  getMetrics() {
    return {
      ...this.metrics,
      patternCount: Object.keys(this.patterns).length,
      executionHistoryLength: this.executionHistory.length,
      predictionThreshold: this.settings.predictionThreshold,
      earlyWarningRate: this.metrics.totalExecutions > 0 
                         ? this.metrics.earlyWarnings / this.metrics.totalExecutions 
                         : 0
    };
  }
}

module.exports = AMFAdaptiveHeatShield; 