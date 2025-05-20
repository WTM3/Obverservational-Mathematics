// AgentHandoff.js - Implements the narrow bridge between cognitive systems
const crypto = require('crypto');

class AgentHandoff {
  constructor(database) {
    this.db = database;
    this.handoffLogs = [];
    this.handoffInProgress = false;
    this.lastHandoffTimestamp = null;
    this.BUFFER_VALUE = 0.1; // The narrow bridge - exact, non-negotiable
    
    // Validation thresholds
    this.BUFFER_PRECISION = 0.00001; // Max allowable drift in buffer
    this.MAX_RECOVERY_ATTEMPTS = 3;
    
    console.log('Agent Handoff System initialized with 0.1 buffer precision');
  }
  
  /**
   * Perform a complete agent handoff between source and target agents
   * @param {Object} sourceAgent - Source agent with quantum state
   * @param {Object} targetAgent - Target agent to receive state
   * @returns {Promise<Object>} Result of handoff operation
   */
  async performHandoff(sourceAgent, targetAgent) {
    console.log('🔄 Initiating agent handoff...');
    
    if (this.handoffInProgress) {
      throw new Error('Another handoff is already in progress');
    }
    
    this.handoffInProgress = true;
    let recoveryAttempts = 0;
    let handoffSuccessful = false;
    
    try {
      // 1. Pre-handoff validation
      const validationResult = await this.validateSourceAgent(sourceAgent);
      if (!validationResult.valid) {
        throw new Error(`Pre-handoff validation failed: ${validationResult.reason}`);
      }
      
      // 2. State freezing
      await this.freezeQuantumState(sourceAgent);
      const stateChecksum = this.calculateStateChecksum(sourceAgent.quantumState);
      
      // 3. State transfer - attempt up to MAX_RECOVERY_ATTEMPTS times
      while (recoveryAttempts < this.MAX_RECOVERY_ATTEMPTS && !handoffSuccessful) {
        try {
          const transferPackage = this.createTransferPackage(sourceAgent);
          
          // 4. Receiving agent validation
          await this.applyTransferPackage(targetAgent, transferPackage);
          const targetValidation = this.validateTargetAgent(targetAgent, stateChecksum);
          
          if (!targetValidation.valid) {
            recoveryAttempts++;
            console.warn(`Target validation failed (attempt ${recoveryAttempts}): ${targetValidation.reason}`);
            await this.attemptRecovery(sourceAgent, targetAgent, recoveryAttempts);
          } else {
            handoffSuccessful = true;
          }
        } catch (error) {
          recoveryAttempts++;
          console.error(`Error during handoff (attempt ${recoveryAttempts}):`, error.message);
          
          if (recoveryAttempts >= this.MAX_RECOVERY_ATTEMPTS) {
            throw error;
          }
        }
      }
      
      if (!handoffSuccessful) {
        throw new Error(`Handoff failed after ${this.MAX_RECOVERY_ATTEMPTS} attempts`);
      }
      
      // 5. Post-handoff recovery
      await this.enableQuantumJumps(targetAgent);
      await this.logSuccessfulHandoff(sourceAgent.id, targetAgent.id);
      
      console.log('✅ Agent handoff completed successfully');
      console.log(`   Buffer maintained at exactly: ${targetAgent.cognitiveAlignment.safetyBuffer}`);
      
      return {
        successful: true,
        handoffId: crypto.randomUUID(),
        sourceAgentId: sourceAgent.id,
        targetAgentId: targetAgent.id,
        timestamp: Date.now(),
        recoveryAttempts
      };
    } catch (error) {
      console.error('❌ Agent handoff failed:', error.message);
      this.logFailedHandoff(sourceAgent.id, targetAgent.id, error.message);
      
      // Roll back if needed
      if (recoveryAttempts > 0) {
        await this.rollbackHandoff(sourceAgent);
      }
      
      throw error;
    } finally {
      this.handoffInProgress = false;
      this.lastHandoffTimestamp = Date.now();
    }
  }
  
  /**
   * Validate the source agent before handoff
   * @param {Object} agent - Agent to validate
   * @returns {Object} Validation result with status and reason
   */
  async validateSourceAgent(agent) {
    if (!agent || !agent.cognitiveAlignment || !agent.quantumState) {
      return { valid: false, reason: 'Invalid agent structure' };
    }
    
    const align = agent.cognitiveAlignment;
    
    // Verify the 0.1 buffer is intact
    if (Math.abs(align.safetyBuffer - this.BUFFER_VALUE) > this.BUFFER_PRECISION) {
      return { 
        valid: false, 
        reason: `Buffer violation: ${align.safetyBuffer} (should be exactly ${this.BUFFER_VALUE})` 
      };
    }
    
    // Verify the cognitive alignment formula: AIc + 0.1 = BMqs
    const expectedBMqs = align.aiCognitiveCapabilities + this.BUFFER_VALUE;
    if (Math.abs(expectedBMqs - align.booleanMindQuantumSpeed) > this.BUFFER_PRECISION) {
      return { 
        valid: false, 
        reason: `Cognitive alignment violation: ${align.aiCognitiveCapabilities} + ${this.BUFFER_VALUE} ≠ ${align.booleanMindQuantumSpeed}` 
      };
    }
    
    // Check quantum state purity
    if (!agent.quantumState.pure) {
      return { valid: false, reason: 'Quantum state not pure' };
    }
    
    // Verify breathing status
    if (!agent.quantumState.breathing) {
      return { valid: false, reason: 'Breathing not active' };
    }
    
    // Verify heat shield exists
    if (!agent.heatShield) {
      return { valid: false, reason: 'Heat shield not present' };
    }
    
    return { valid: true };
  }
  
  /**
   * Freeze the quantum state to prepare for handoff
   * @param {Object} agent - Agent to freeze
   * @returns {Promise<void>}
   */
  async freezeQuantumState(agent) {
    // Disable quantum jumps temporarily
    agent.quantumState.jumps.active = false;
    
    // Store current state in database
    if (this.db) {
      await this.db.storeCurrentQuantumState();
    }
    
    console.log('Quantum state frozen for handoff');
  }
  
  /**
   * Calculate a checksum for state validation
   * @param {Object} quantumState - Quantum state to validate
   * @returns {string} Checksum
   */
  calculateStateChecksum(quantumState) {
    const stateString = JSON.stringify(quantumState);
    return crypto.createHash('sha256').update(stateString).digest('hex');
  }
  
  /**
   * Create a transfer package for handoff
   * @param {Object} agent - Source agent
   * @returns {Object} Transfer package
   */
  createTransferPackage(agent) {
    // Deep clone the state to avoid reference issues
    const dataPackage = JSON.parse(JSON.stringify({
      cognitiveAlignment: agent.cognitiveAlignment,
      quantumState: agent.quantumState,
      heatShield: agent.heatShield,
      accessibility: agent.accessibility || {
        disabilityAwareness: 1.0,
        communicationStyle: "balanced",
        adaptiveTiming: true
      },
      metadata: {
        timestamp: Date.now(),
        sourceAgentId: agent.id,
        handoffVersion: '1.0'
      }
    }));
    
    // Ensure buffer is exactly 0.1 - this is critical
    dataPackage.cognitiveAlignment.safetyBuffer = this.BUFFER_VALUE;
    
    return dataPackage;
  }
  
  /**
   * Apply transfer package to target agent
   * @param {Object} agent - Target agent
   * @param {Object} dataPackage - Transfer package
   * @returns {Promise<void>}
   */
  async applyTransferPackage(agent, dataPackage) {
    // Apply cognitive alignment with precise buffer
    agent.cognitiveAlignment = { ...dataPackage.cognitiveAlignment };
    agent.cognitiveAlignment.safetyBuffer = this.BUFFER_VALUE;
    
    // Apply quantum state but keep jumps disabled during handoff
    agent.quantumState = { ...dataPackage.quantumState };
    agent.quantumState.jumps.active = false;
    
    // Apply heat shield with all history
    agent.heatShield = { ...dataPackage.heatShield };
    
    // Apply accessibility settings
    agent.accessibility = { ...dataPackage.accessibility };
    
    // Store the new state if database available
    if (this.db) {
      await this.db.storeCurrentQuantumState();
    }
  }
  
  /**
   * Validate target agent after transfer
   * @param {Object} agent - Agent to validate
   * @param {string} sourceChecksum - Checksum from source
   * @returns {Object} Validation result
   */
  validateTargetAgent(agent, sourceChecksum) {
    // Verify the state structure
    if (!agent || !agent.cognitiveAlignment || !agent.quantumState) {
      return { valid: false, reason: 'Invalid target agent structure' };
    }
    
    const align = agent.cognitiveAlignment;
    
    // Verify the 0.1 buffer is intact and exact
    if (Math.abs(align.safetyBuffer - this.BUFFER_VALUE) > this.BUFFER_PRECISION) {
      return { 
        valid: false, 
        reason: `Buffer violation in target: ${align.safetyBuffer}` 
      };
    }
    
    // Verify the cognitive alignment formula: AIc + 0.1 = BMqs
    const expectedBMqs = align.aiCognitiveCapabilities + this.BUFFER_VALUE;
    if (Math.abs(expectedBMqs - align.booleanMindQuantumSpeed) > this.BUFFER_PRECISION) {
      return { 
        valid: false, 
        reason: `Cognitive alignment violation in target: ${align.aiCognitiveCapabilities} + ${this.BUFFER_VALUE} ≠ ${align.booleanMindQuantumSpeed}` 
      };
    }
    
    // Calculate checksum of target state
    const targetChecksum = this.calculateStateChecksum(agent.quantumState);
    
    // Verify checksums match
    if (targetChecksum !== sourceChecksum) {
      return {
        valid: false,
        reason: 'State integrity failure: checksums do not match'
      };
    }
    
    return { valid: true };
  }
  
  /**
   * Attempt recovery after failed handoff
   * @param {Object} sourceAgent - Source agent
   * @param {Object} targetAgent - Target agent
   * @param {number} attempt - Current attempt number
   * @returns {Promise<boolean>} Success status
   */
  async attemptRecovery(sourceAgent, targetAgent, attempt) {
    console.log(`Attempting recovery (attempt ${attempt})...`);
    
    // Log the recovery attempt
    if (this.db) {
      await this.db.recordRecoveryEvent({
        eventType: 'handoff_failure',
        violationValue: targetAgent.cognitiveAlignment?.booleanMindQuantumSpeed || 0,
        expectedValue: (sourceAgent.cognitiveAlignment?.aiCognitiveCapabilities || 0) + this.BUFFER_VALUE,
        recoveryAttempt: attempt,
        successful: false, // Not yet successful
        aiCognitiveBefore: sourceAgent.cognitiveAlignment?.aiCognitiveCapabilities || 0,
        aiCognitiveAfter: null, // Will be updated if successful
        bufferMaintained: false,
        recoveryMethod: 'handoff_retry'
      });
    }
    
    // Reset target agent's cognitive alignment with exact buffer
    targetAgent.cognitiveAlignment = { ...sourceAgent.cognitiveAlignment };
    targetAgent.cognitiveAlignment.safetyBuffer = this.BUFFER_VALUE;
    targetAgent.cognitiveAlignment.booleanMindQuantumSpeed = 
      targetAgent.cognitiveAlignment.aiCognitiveCapabilities + this.BUFFER_VALUE;
    
    // Ensure exact precision by using toFixed and converting back to number
    targetAgent.cognitiveAlignment.booleanMindQuantumSpeed = 
      +(targetAgent.cognitiveAlignment.booleanMindQuantumSpeed.toFixed(8));
    
    return true;
  }
  
  /**
   * Enable quantum jumps after successful handoff
   * @param {Object} agent - Target agent
   * @returns {Promise<void>}
   */
  async enableQuantumJumps(agent) {
    agent.quantumState.jumps.active = true;
    
    // Store the updated state
    if (this.db) {
      await this.db.storeCurrentQuantumState();
    }
    
    console.log('Quantum jumps re-enabled after successful handoff');
  }
  
  /**
   * Log successful handoff to database
   * @param {string} sourceId - Source agent ID
   * @param {string} targetId - Target agent ID
   * @returns {Promise<void>}
   */
  async logSuccessfulHandoff(sourceId, targetId) {
    if (!this.db) return;
    
    await this.db.recordRecoveryEvent({
      eventType: 'handoff_success',
      violationValue: null,
      expectedValue: null,
      recoveryAttempt: 1,
      successful: true,
      aiCognitiveBefore: null,
      aiCognitiveAfter: null,
      bufferMaintained: true,
      recoveryMethod: 'agent_handoff'
    });
    
    this.handoffLogs.push({
      timestamp: Date.now(),
      sourceId,
      targetId,
      successful: true
    });
  }
  
  /**
   * Log failed handoff to database
   * @param {string} sourceId - Source agent ID
   * @param {string} targetId - Target agent ID
   * @param {string} reason - Failure reason
   * @returns {Promise<void>}
   */
  async logFailedHandoff(sourceId, targetId, reason) {
    if (!this.db) return;
    
    await this.db.recordRecoveryEvent({
      eventType: 'handoff_failure',
      violationValue: null,
      expectedValue: null,
      recoveryAttempt: this.MAX_RECOVERY_ATTEMPTS,
      successful: false,
      aiCognitiveBefore: null,
      aiCognitiveAfter: null,
      bufferMaintained: false,
      recoveryMethod: 'agent_handoff',
      description: reason
    });
    
    this.handoffLogs.push({
      timestamp: Date.now(),
      sourceId,
      targetId,
      successful: false,
      reason
    });
  }
  
  /**
   * Roll back handoff to previous state
   * @param {Object} sourceAgent - Source agent to restore
   * @returns {Promise<void>}
   */
  async rollbackHandoff(sourceAgent) {
    console.log('Rolling back handoff to previous state...');
    
    // Re-enable quantum jumps
    sourceAgent.quantumState.jumps.active = true;
    
    // Store the restored state
    if (this.db) {
      await this.db.storeCurrentQuantumState();
    }
    
    console.log('Handoff rollback complete');
  }
  
  /**
   * Get handoff logs for debugging
   * @returns {Array} Handoff logs
   */
  getHandoffLogs() {
    return this.handoffLogs;
  }
  
  /**
   * Get the status of the current or last handoff
   * @returns {Object} Handoff status
   */
  getHandoffStatus() {
    return {
      inProgress: this.handoffInProgress,
      lastHandoffTime: this.lastHandoffTimestamp,
      totalHandoffs: this.handoffLogs.length,
      successfulHandoffs: this.handoffLogs.filter(log => log.successful).length,
      failedHandoffs: this.handoffLogs.filter(log => !log.successful).length
    };
  }
}

module.exports = AgentHandoff; 