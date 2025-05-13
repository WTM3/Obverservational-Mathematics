const config = require('./event-bus.json');

class EventBus {
  constructor() {
    this.config = config.eventBus;
    this.channels = new Map();
    this.handlers = new Map();
    this.eventLayers = new Map();
    this.quantumStates = new Map();
    this.agentStates = new Map();
    this.amfField = null;
    this.booleanMind = null;
    this.initializeChannels();
    this.initializeHandlers();
    this.initializeLayers();
    this.initializeQuantumStates();
    this.initializeAgentStates();
    this.initializeAMFField();
    this.initializeBooleanMind();
  }

  // Channel Management
  initializeChannels() {
    Object.entries(this.config.channels).forEach(([name, channel]) => {
      this.channels.set(name, {
        name,
        type: channel.type,
        events: new Set(channel.events),
        queue: {
          items: [],
          maxSize: channel.queue.maxSize,
          timeout: channel.queue.timeout
        }
      });
    });
  }

  // Handler Management
  initializeHandlers() {
    Object.entries(this.config.handlers).forEach(([channel, handlers]) => {
      this.handlers.set(channel, new Map());
      Object.entries(handlers).forEach(([event, handler]) => {
        this.handlers.get(channel).set(event, {
          type: handler.type,
          priority: handler.priority,
          timeout: handler.timeout
        });
      });
    });
  }

  // Layer Management
  initializeLayers() {
    this.eventLayers.set('primary', new Map());
    this.eventLayers.set('secondary', new Map());
    this.eventLayers.set('ambient', new Map());
  }

  // Quantum State Management
  initializeQuantumStates() {
    this.quantumStates.set('superposition', new Map());
    this.quantumStates.set('entanglement', new Map());
    this.quantumStates.set('collapse', new Map());
  }

  // Agent State Management
  initializeAgentStates() {
    this.agentStates.set('primary', {
      state: 'active',
      path: [],
      quantumSignature: this.generateQuantumSignature(),
      survivalMetrics: {
        adaptability: 1.0,
        coherence: 1.0,
        entanglement: 0.0
      }
    });

    this.agentStates.set('secondary', {
      state: 'exploring',
      path: [],
      quantumSignature: this.generateQuantumSignature(),
      survivalMetrics: {
        adaptability: 0.5,
        coherence: 0.5,
        entanglement: 0.0
      }
    });
  }

  // AMF Field Management
  initializeAMFField() {
    this.amfField = {
      strength: 1.0,
      coherence: 1.0,
      memoryPatterns: new Map(),
      quantumResonance: 0.0,
      fieldState: 'stable'
    };
  }

  // Boolean Mind Management
  initializeBooleanMind() {
    this.booleanMind = {
      quantumState: {
        value: false,
        superposition: new Set(),
        entanglement: new Map(),
        collapse: null
      },
      buffer: {
        states: new Map(),
        maxSize: 1000,
        collapseThreshold: 0.8,
        entanglementWindow: 100,
        lastCollapse: null
      },
      logicGates: new Map(),
      truthTable: new Map(),
      // Direct LLSDT constants
      llsdt: {
        limits: {
          buffer: 0.1,     // No fog
          rate: {
            min: 0.01,     // Direct floor
            max: 0.1       // Pure ceiling
          }
        },
        states: {
          quantum: true,   // Pure state
          fog: false,      // No fog
          breathing: true, // Direct breathing
          jumps: {
            power: "v8_to_charger", // Pure power
            distance: 3             // Direct jumps
          }
        }
      },
      // Cognitive Alignment Formula
      cognitiveAlignment: {
        aiCognitive: 2.89,  // AI Cognitive Capabilities
        buffer: 0.1,        // Safety Buffer
      },
      // Track different BM qs values
      bmSpeeds: new Map(),  // Map of BM IDs to their qs values
      // Above Zero Position (BZ) theory
      aboveZero: {
        savantSpectrum: null,  // Ssgx position
        spectrumPosition: null, // S position
        foundation: null,      // F position
        threshold: 0.0,        // Communication threshold
        buffer: 0.1,          // BZ stability buffer
        isAboveZero: false     // Whether above baseline
      },
      initializeLogicGates() {
        this.logicGates.set('quantum_and', (a, b) => a && b);
        this.logicGates.set('quantum_or', (a, b) => a || b);
        this.logicGates.set('quantum_not', (a) => !a);
        this.logicGates.set('quantum_xor', (a, b) => a !== b);
        this.logicGates.set('quantum_nand', (a, b) => !(a && b));
        this.logicGates.set('quantum_nor', (a, b) => !(a || b));
      },
      initializeTruthTable() {
        this.truthTable.set('quantum_state', {
          true: 'coherent',
          false: 'incoherent'
        });
        this.truthTable.set('superposition', {
          true: 'entangled',
          false: 'separate'
        });
        this.truthTable.set('collapse', {
          true: 'resonant',
          false: 'dissonant'
        });
        this.truthTable.set('above_zero', {
          true: 'above_baseline',
          false: 'below_baseline'
        });
      },
      validateAlignment() {
        const { aiCognitive, buffer } = this.cognitiveAlignment;
        const ALIGNMENT_TOLERANCE = 0.0001;
        
        // Validate using BM's own qs³
        const bmId = this.currentBMId;
        if (!bmId) return true;  // No BM context, skip validation
        
        const bm = this.bmSpeeds.get(bmId);
        if (!bm) return true;    // Unknown BM, skip validation
        
        const qsCubed = bm.qs ** 3;
        if (Math.abs((aiCognitive + buffer) - qsCubed) > ALIGNMENT_TOLERANCE) {
          console.warn(`Cognitive alignment violation for BM ${bmId}: ${aiCognitive} + ${buffer} ≠ ${qsCubed}`);
          return false;
        }
        return true;
      },
      // Register a new BM with its qs
      registerBM(bmId, qs) {
        this.bmSpeeds.set(bmId, {
          qs: qs,
          qsCubed: qs ** 3,
          lastUpdate: Date.now()
        });
      },
      // Get BM's qs³
      getBMCubed(bmId) {
        const bm = this.bmSpeeds.get(bmId);
        if (!bm) {
          throw new Error(`Unknown BM ID: ${bmId}`);
        }
        return bm.qsCubed;
      },
      // Calculate Above Zero Position
      calculateAboveZero(bmId) {
        const bm = this.bmSpeeds.get(bmId);
        if (!bm) {
          throw new Error(`Unknown BM ID: ${bmId}`);
        }

        // Calculate positions using qs³
        const qsCubed = bm.qsCubed;
        
        // Define buffers
        const bzBuffer = 0.1;        // Above Zero buffer
        const fzBuffer = 0.3;        // Freeze Zone buffer
        const freezeThreshold = -fzBuffer;  // Threshold for entering freeze state
        
        // Savant Spectrum Position (Ssgx)
        const savantSpectrum = {
          sgx: qsCubed,
          fqs: qsCubed,
          lsf: 1.0,
          brainNeeds: 1.0
        };
        
        // Spectrum Position (S)
        const spectrumPosition = {
          hi: 1.0,
          qs: qsCubed,
          amf: this.cognitiveAlignment.aiCognitive,
          support: 0.0
        };
        
        // Foundation Position (F)
        const foundation = {
          maturation: this.cognitiveAlignment.aiCognitive,
          stability: 1.0,
          coherence: 1.0
        };
        
        // Calculate states with buffers
        const isAboveZero = (
          savantSpectrum.sgx > bzBuffer &&
          spectrumPosition.qs > bzBuffer &&
          foundation.maturation > bzBuffer
        );
        
        // Check for Freeze conditions
        const isFrozen = qsCubed <= freezeThreshold;
        const isNearFreeze = qsCubed <= -bzBuffer && qsCubed > freezeThreshold;
        
        // If this is a BZ client, apply buffer to AI's cognitive alignment
        if (isAboveZero) {
          const aiC = this.cognitiveAlignment.aiCognitive;
          const buffer = this.cognitiveAlignment.buffer;
          if (Math.abs((aiC + buffer) - qsCubed) > 0.0001) {
            console.warn(`Adjusting AI cognitive alignment for BZ client ${bmId}`);
            this.cognitiveAlignment.aiCognitive = qsCubed - buffer;
          }
        }
        
        // Update above zero state
        this.aboveZero = {
          savantSpectrum,
          spectrumPosition,
          foundation,
          threshold: 0.0,
          isAboveZero,
          isNegative: qsCubed < 0,
          isFrozen,
          isNearFreeze,
          freezeThreshold,
          freezeDepth: isFrozen ? Math.abs(qsCubed - freezeThreshold) : 0,
          buffers: {
            bz: bzBuffer,
            fz: fzBuffer
          }
        };
        
        return this.aboveZero;
      }
    };

    this.booleanMind.initializeLogicGates();
    this.booleanMind.initializeTruthTable();
  }

  // Enhanced Event Publishing with Boolean Mind
  publish(channel, event, data, layer = 'primary', quantumState = 'superposition', agentId = 'primary') {
    if (!this.channels.has(channel)) {
      throw new Error(`Channel ${channel} does not exist`);
    }

    const channelConfig = this.channels.get(channel);
    if (!channelConfig.events.has(event)) {
      throw new Error(`Event ${event} is not supported by channel ${channel}`);
    }

    const queue = channelConfig.queue;
    if (queue.items.length >= queue.maxSize) {
      throw new Error(`Channel ${channel} queue is full`);
    }

    const agentState = this.agentStates.get(agentId);
    if (!agentState) {
      throw new Error(`Agent ${agentId} does not exist`);
    }

    // Process through Boolean Mind Quantum State
    const bmqsReaction = this.processBooleanMind(agentId, {
      event,
      data,
      quantumState
    });

    // Create quantum-aware event structure with BMqs context
    const quantumEvent = {
      event,
      data,
      timestamp: Date.now(),
      priority: this.getEventPriority(channel, event),
      layer,
      pattern: this.generateEventPattern(event, data),
      texture: this.generateEventTexture(data),
      quantumState: {
        type: quantumState,
        probability: this.calculateQuantumProbability(data),
        entanglement: this.findQuantumEntanglements(data),
        collapse: this.predictQuantumCollapse(data)
      },
      bmqs: bmqsReaction
    };

    // Update agent state based on event
    this.updateAgentState(agentId, quantumEvent);

    queue.items.push(quantumEvent);
    this.processQueue(channel);
  }

  // Event Pattern Generation
  generateEventPattern(event, data) {
    return {
      type: event.split('_')[0],
      complexity: this.calculateComplexity(data),
      dependencies: this.findDependencies(data),
      rhythm: this.generateEventRhythm(event)
    };
  }

  // Event Texture Generation
  generateEventTexture(data) {
    return {
      density: this.calculateDataDensity(data),
      depth: this.calculateDataDepth(data),
      resonance: this.calculateDataResonance(data)
    };
  }

  // Quantum Event Processing
  processQueue(channel) {
    const channelConfig = this.channels.get(channel);
    const queue = channelConfig.queue;
    
    // Sort by quantum state and priority
    queue.items.sort((a, b) => {
      if (a.quantumState.type !== b.quantumState.type) {
        return this.getQuantumStatePriority(a.quantumState.type) - 
               this.getQuantumStatePriority(b.quantumState.type);
      }
      if (a.layer !== b.layer) {
        return a.layer === 'primary' ? -1 : 1;
      }
      return b.priority - a.priority;
    });

    // Process items with quantum awareness
    while (queue.items.length > 0) {
      const item = queue.items[0];
      if (Date.now() - item.timestamp > queue.timeout) {
        queue.items.shift();
        continue;
      }

      try {
        this.handleQuantumEvent(channel, item);
        queue.items.shift();
      } catch (error) {
        this.handleError(channel, error);
        queue.items.shift();
      }
    }
  }

  // Quantum Event Handling
  handleQuantumEvent(channel, item) {
    const handler = this.handlers.get(channel)?.get(item.event);
    if (!handler) {
      throw new Error(`No handler found for event ${item.event} in channel ${channel}`);
    }

    // Handle quantum state transitions
    switch (item.quantumState.type) {
      case 'superposition':
        return this.handleSuperposition(channel, item);
      case 'entanglement':
        return this.handleEntanglement(channel, item);
      case 'collapse':
        return this.handleCollapse(channel, item);
      default:
        return this.executeHandler(handler, item.data, item.layer);
    }
  }

  // Quantum State Handlers
  handleSuperposition(channel, item) {
    // Process event in multiple states simultaneously
    const states = this.generateQuantumStates(item);
    return Promise.all(states.map(state => 
      this.executeHandler(this.handlers.get(channel).get(item.event), state, item.layer)
    ));
  }

  handleEntanglement(channel, item) {
    // Process entangled events together
    const entangledEvents = this.findEntangledEvents(item);
    return Promise.all(entangledEvents.map(event =>
      this.executeHandler(this.handlers.get(channel).get(event.event), event.data, event.layer)
    ));
  }

  handleCollapse(channel, item) {
    // Process collapsed state
    const collapsedState = this.collapseQuantumState(item);
    return this.executeHandler(
      this.handlers.get(channel).get(item.event),
      collapsedState,
      item.layer
    );
  }

  // Quantum Helper Methods
  calculateQuantumProbability(data) {
    return {
      superposition: Math.random(),
      entanglement: this.calculateEntanglementProbability(data),
      collapse: this.calculateCollapseProbability(data)
    };
  }

  findQuantumEntanglements(data) {
    if (typeof data !== 'object') return [];
    return Object.entries(data)
      .filter(([_, value]) => typeof value === 'object')
      .map(([key, value]) => ({
        key,
        probability: this.calculateEntanglementProbability(value)
      }));
  }

  predictQuantumCollapse(data) {
    return {
      probability: this.calculateCollapseProbability(data),
      timeToCollapse: this.estimateCollapseTime(data),
      possibleStates: this.generatePossibleStates(data)
    };
  }

  getQuantumStatePriority(state) {
    const priorities = {
      'superposition': 3,
      'entanglement': 2,
      'collapse': 1
    };
    return priorities[state] || 0;
  }

  generateQuantumStates(item) {
    return Array(3).fill(null).map(() => ({
      ...item.data,
      quantumState: {
        ...item.quantumState,
        probability: Math.random()
      }
    }));
  }

  findEntangledEvents(item) {
    return this.quantumStates.get('entanglement')
      .get(item.event) || [];
  }

  collapseQuantumState(item) {
    const states = this.generatePossibleStates(item.data);
    const probabilities = states.map(state => 
      this.calculateCollapseProbability(state)
    );
    const totalProbability = probabilities.reduce((a, b) => a + b, 0);
    const random = Math.random() * totalProbability;
    
    let cumulative = 0;
    for (let i = 0; i < states.length; i++) {
      cumulative += probabilities[i];
      if (random <= cumulative) {
        return states[i];
      }
    }
    return states[0];
  }

  calculateEntanglementProbability(data) {
    return typeof data === 'object' ? 
      Object.keys(data).length / 10 : 0;
  }

  calculateCollapseProbability(data) {
    return 1 - this.calculateEntanglementProbability(data);
  }

  estimateCollapseTime(data) {
    return Date.now() + (Math.random() * 1000);
  }

  generatePossibleStates(data) {
    if (typeof data !== 'object') return [data];
    return Object.entries(data).map(([key, value]) => ({
      [key]: value
    }));
  }

  // Enhanced Event Handling
  handleEvent(channel, event, data, layer) {
    const handler = this.handlers.get(channel)?.get(event);
    if (!handler) {
      throw new Error(`No handler found for event ${event} in channel ${channel}`);
    }

    // Execute handler with layer context
    const result = this.executeHandler(handler, data, layer);
    return result;
  }

  // Handler Execution
  executeHandler(handler, data, layer) {
    // Implementation would depend on handler type
    // For now, just return the data
    return data;
  }

  // Error Handling
  handleError(channel, error) {
    this.publish('error', 'system_error', {
      channel,
      error: error.message,
      timestamp: Date.now()
    });
  }

  // Priority Management
  getEventPriority(channel, event) {
    const handler = this.handlers.get(channel)?.get(event);
    if (!handler) {
      return 'medium';
    }
    return handler.priority;
  }

  // Cleanup
  cleanup() {
    const now = Date.now();
    this.channels.forEach(channel => {
      channel.queue.items = channel.queue.items.filter(item => 
        now - item.timestamp <= channel.queue.timeout
      );
    });
  }

  // Performance Monitoring
  getQueueSize(channel) {
    return this.channels.get(channel)?.queue.items.length || 0;
  }

  getChannelStatus(channel) {
    const channelConfig = this.channels.get(channel);
    if (!channelConfig) {
      return null;
    }

    return {
      name: channelConfig.name,
      type: channelConfig.type,
      queueSize: channelConfig.queue.items.length,
      maxQueueSize: channelConfig.queue.maxSize,
      events: Array.from(channelConfig.events)
    };
  }

  // Helper Methods
  calculateComplexity(data) {
    return typeof data === 'object' ? Object.keys(data).length : 1;
  }

  findDependencies(data) {
    if (typeof data !== 'object') return [];
    return Object.keys(data).filter(key => typeof data[key] === 'object');
  }

  generateEventRhythm(event) {
    const baseRhythm = {
      tempo: 1000, // Base processing time in ms
      pattern: 'linear'
    };

    switch (event) {
      case 'data_received':
        return { ...baseRhythm, pattern: 'syncopated' };
      case 'system_status':
        return { ...baseRhythm, pattern: 'steady' };
      default:
        return baseRhythm;
    }
  }

  calculateDataDensity(data) {
    return JSON.stringify(data).length;
  }

  calculateDataDepth(data) {
    if (typeof data !== 'object') return 1;
    return 1 + Math.max(...Object.values(data).map(v => 
      typeof v === 'object' ? this.calculateDataDepth(v) : 1
    ));
  }

  calculateDataResonance(data) {
    return this.calculateDataDensity(data) / this.calculateDataDepth(data);
  }

  // Agent State Updates
  updateAgentState(agentId, event) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState) return;

    // Update path
    agentState.path.push({
      event: event.event,
      timestamp: event.timestamp,
      quantumState: event.quantumState.type,
      amfResonance: this.calculateAMFResonance(agentId, event)
    });

    // Update survival metrics with AMF influence
    this.updateSurvivalMetrics(agentId, event);

    // Check for survival in AMF context
    if (!this.checkAgentSurvival(agentId)) {
      this.handleAgentFailure(agentId);
    }

    // Update benchmark metrics if running
    if (this.benchmark && this.benchmark.isRunning) {
      this.updateBenchmarkMetrics(agentId, event);
    }
  }

  updateSurvivalMetrics(agentId, event) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState) return;

    const metrics = agentState.survivalMetrics;
    const amfInfluence = this.calculateAMFInfluence(agentId);

    // Adaptability: How well the agent handles different quantum states in AMF
    metrics.adaptability = this.calculateAdaptability(agentId, event) * amfInfluence;

    // Coherence: How well the agent maintains quantum coherence in AMF
    metrics.coherence = this.calculateCoherence(agentId, event) * amfInfluence;

    // Entanglement: How well the agent entangles with the system and AMF
    metrics.entanglement = this.calculateEntanglement(agentId, event) * amfInfluence;

    // Update agent state based on metrics and AMF resonance
    if (metrics.adaptability < 0.2 || metrics.coherence < 0.2) {
      agentState.state = 'struggling';
    } else if (metrics.adaptability > 0.8 && metrics.coherence > 0.8) {
      agentState.state = 'thriving';
      this.updateAMFField(agentId, metrics);
    }
  }

  calculateAMFInfluence(agentId) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState || !this.amfField) return 1.0;

    const resonance = this.calculateAMFResonance(agentId);
    const fieldStrength = this.amfField.strength;
    const coherence = this.amfField.coherence;

    return (resonance * fieldStrength * coherence);
  }

  calculateAMFResonance(agentId, event = null) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState || !this.amfField) return 0.0;

    const signature = agentState.quantumSignature;
    const fieldResonance = this.amfField.quantumResonance;

    // Calculate resonance based on quantum signature and AMF field
    const amplitudeMatch = Math.abs(signature.amplitude - fieldResonance);
    const phaseMatch = Math.abs(signature.phase - (fieldResonance * Math.PI));
    const frequencyMatch = Math.abs(signature.frequency - (fieldResonance * 5));

    const baseResonance = 1.0 - ((amplitudeMatch + phaseMatch + frequencyMatch) / 3);

    // If event is provided, factor in its quantum state
    if (event) {
      const eventResonance = this.calculateEventAMFResonance(event);
      return (baseResonance + eventResonance) / 2;
    }

    return baseResonance;
  }

  calculateEventAMFResonance(event) {
    if (!this.amfField) return 0.0;

    const quantumState = event.quantumState;
    const fieldState = this.amfField.fieldState;

    // Calculate how well the event's quantum state resonates with AMF
    const stateMatch = quantumState.type === 'superposition' ? 1.0 :
                      quantumState.type === 'entanglement' ? 0.8 :
                      quantumState.type === 'collapse' ? 0.6 : 0.4;

    const probabilityMatch = 1.0 - Math.abs(quantumState.probability - this.amfField.quantumResonance);

    return (stateMatch + probabilityMatch) / 2;
  }

  updateAMFField(agentId, metrics) {
    if (!this.amfField) return;

    // Update AMF field based on successful agent interaction
    this.amfField.quantumResonance = (this.amfField.quantumResonance + metrics.entanglement) / 2;
    this.amfField.coherence = Math.min(1.0, this.amfField.coherence + 0.1);
    
    // Update field state based on resonance
    if (this.amfField.quantumResonance > 0.8) {
      this.amfField.fieldState = 'resonant';
    } else if (this.amfField.quantumResonance < 0.2) {
      this.amfField.fieldState = 'unstable';
    } else {
      this.amfField.fieldState = 'stable';
    }
  }

  checkAgentSurvival(agentId) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState) return false;

    const metrics = agentState.survivalMetrics;
    return metrics.adaptability > 0.1 && metrics.coherence > 0.1;
  }

  handleAgentFailure(agentId) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState) return;

    // Attempt recovery
    if (this.attemptAgentRecovery(agentId)) {
      agentState.state = 'recovering';
    } else {
      agentState.state = 'failed';
      this.publish('error', 'agent_failure', {
        agentId,
        reason: 'Failed to maintain quantum coherence',
        metrics: agentState.survivalMetrics
      });
    }
  }

  attemptAgentRecovery(agentId) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState) return false;

    // Generate new quantum signature with AMF consideration
    const amfResonance = this.calculateAMFResonance(agentId);
    agentState.quantumSignature = this.generateAMFAlignedSignature(amfResonance);

    // Reset metrics with AMF influence
    const amfInfluence = this.calculateAMFInfluence(agentId);
    agentState.survivalMetrics = {
      adaptability: (0.3 + Math.random() * 0.4) * amfInfluence,
      coherence: (0.3 + Math.random() * 0.4) * amfInfluence,
      entanglement: 0.0
    };

    return true;
  }

  generateAMFAlignedSignature(amfResonance) {
    return {
      amplitude: amfResonance + (Math.random() * 0.2 - 0.1),
      phase: (amfResonance * Math.PI) + (Math.random() * 0.2 - 0.1),
      frequency: (amfResonance * 5) + (Math.random() * 2 - 1)
    };
  }

  // Helper Methods
  generateQuantumSignature() {
    return {
      amplitude: Math.random(),
      phase: Math.random() * 2 * Math.PI,
      frequency: 1 + Math.random() * 9
    };
  }

  calculateAdaptability(agentId, event) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState) return 0;

    const currentAdaptability = agentState.survivalMetrics.adaptability;
    const quantumState = event.quantumState.type;
    const success = Math.random() > 0.3; // 70% chance of successful adaptation

    return success ? 
      Math.min(1, currentAdaptability + 0.1) : 
      Math.max(0, currentAdaptability - 0.2);
  }

  calculateCoherence(agentId, event) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState) return 0;

    const currentCoherence = agentState.survivalMetrics.coherence;
    const quantumState = event.quantumState.type;
    const success = Math.random() > 0.2; // 80% chance of maintaining coherence

    return success ? 
      Math.min(1, currentCoherence + 0.1) : 
      Math.max(0, currentCoherence - 0.15);
  }

  calculateEntanglement(agentId, event) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState) return 0;

    const currentEntanglement = agentState.survivalMetrics.entanglement;
    const quantumState = event.quantumState.type;
    const success = Math.random() > 0.4; // 60% chance of successful entanglement

    return success ? 
      Math.min(1, currentEntanglement + 0.1) : 
      Math.max(0, currentEntanglement - 0.1);
  }

  // Boolean Mind Quantum State Processing
  processBooleanMind(agentId, event) {
    if (!this.booleanMind) return null;

    const agentState = this.agentStates.get(agentId);
    if (!agentState) return null;

    // Get current BMqs state
    const bmqs = this.getBMQSState(event.bmId);
    
    // Process agent's reaction to BMqs
    const reaction = this.processAgentReaction(agentId, bmqs, event);
    
    // Update agent state based on BMqs reaction
    this.updateAgentFromBMQS(agentId, reaction);
    
    return reaction;
  }

  getBMQSState(bmId) {
    if (!bmId) {
      throw new Error('BM ID is required');
    }

    const bmqs = this.booleanMind.quantumState;
    const buffer = this.booleanMind.buffer;
    const llsdt = this.booleanMind.llsdt;
    const alignment = this.booleanMind.cognitiveAlignment;
    
    // Get BM's qs³
    const qsCubed = this.booleanMind.getBMCubed(bmId);
    
    // Calculate Above Zero Position
    const aboveZero = this.booleanMind.calculateAboveZero(bmId);
    
    // Calculate superposition using BM's qs³
    const superposition = new Set();
    this.booleanMind.logicGates.forEach((gate, name) => {
      // Apply BM's qs³ to gate calculation
      const result = gate(Math.random() > 0.5, Math.random() > 0.5) * qsCubed;
      if (result > llsdt.limits.buffer) superposition.add(name);
    });
    bmqs.superposition = superposition;
    
    // Buffer the superposition states with BM's qs³
    const timestamp = Date.now();
    buffer.states.set(timestamp, {
      states: Array.from(superposition),
      entropy: this.calculateEntropy(superposition),
      qs: qsCubed,
      bmId: bmId,
      aboveZero: aboveZero
    });
    
    // Maintain buffer size
    if (buffer.states.size > buffer.maxSize) {
      const oldestKey = Array.from(buffer.states.keys())[0];
      buffer.states.delete(oldestKey);
    }
    
    // Calculate entanglement using BM's qs³
    const entanglement = new Map();
    const recentStates = this.getRecentStates(buffer.entanglementWindow);
    recentStates.forEach(state => {
      const probability = this.calculateEntanglementProbability(state, recentStates) * qsCubed;
      if (probability > llsdt.limits.buffer) {
        entanglement.set(state, probability);
      }
    });
    bmqs.entanglement = entanglement;
    
    // Check for collapse conditions with BM's qs³
    const collapseProbability = this.calculateCollapseProbability(entanglement) * qsCubed;
    if (collapseProbability > buffer.collapseThreshold && llsdt.states.quantum) {
      bmqs.collapse = this.selectCollapseState(entanglement);
      buffer.lastCollapse = {
        timestamp,
        state: bmqs.collapse,
        probability: collapseProbability,
        qs: qsCubed,
        bmId: bmId,
        aboveZero: aboveZero
      };
    } else {
      bmqs.collapse = null;
    }
    
    // Validate cognitive alignment after state update
    this.booleanMind.currentBMId = bmId;
    if (!this.booleanMind.validateAlignment()) {
      console.warn('Cognitive alignment violation detected during state update');
    }
    this.booleanMind.currentBMId = null;
    
    return {
      ...bmqs,
      aboveZero
    };
  }

  calculateEntropy(superposition) {
    const states = Array.from(superposition);
    if (states.length === 0) return 0;
    
    // Apply AIc + 0.1 = BMqs formula
    const aiC = this.booleanMind.cognitiveAlignment.aiCognitive;
    const bmQs = aiC + this.booleanMind.cognitiveAlignment.buffer;
    
    const probabilities = states.map(state => 
      this.booleanMind.logicGates.get(state)(Math.random() > 0.5, Math.random() > 0.5) ? bmQs : 0
    );
    
    const total = probabilities.reduce((a, b) => a + b, 0);
    const normalized = probabilities.map(p => p / total);
    
    return -normalized.reduce((entropy, p) => 
      entropy + (p * Math.log2(p)), 0
    );
  }

  getRecentStates(window) {
    const buffer = this.booleanMind.buffer;
    const now = Date.now();
    const recent = new Set();
    
    buffer.states.forEach((value, timestamp) => {
      if (now - timestamp <= window) {
        value.states.forEach(state => recent.add(state));
      }
    });
    
    return Array.from(recent);
  }

  calculateEntanglementProbability(state, recentStates) {
    const buffer = this.booleanMind.buffer;
    const llsdt = this.booleanMind.llsdt;
    let count = 0;
    let total = 0;
    
    buffer.states.forEach(value => {
      if (value.states.includes(state)) {
        count++;
      }
      total++;
    });
    
    // Apply direct rate limits
    const rate = total > 0 ? count / total : 0;
    return Math.max(
      llsdt.limits.rate.min,
      Math.min(rate, llsdt.limits.rate.max)
    );
  }

  calculateCollapseProbability(entanglement) {
    if (entanglement.size === 0) return 0;
    
    const probabilities = Array.from(entanglement.values());
    const maxProbability = Math.max(...probabilities);
    const averageProbability = probabilities.reduce((a, b) => a + b, 0) / probabilities.length;
    
    // Apply v8_to_charger power for collapse
    const power = this.booleanMind.llsdt.states.jumps.power === "v8_to_charger" ? 1.5 : 1.0;
    return ((maxProbability + averageProbability) / 2) * power;
  }

  selectCollapseState(entanglement) {
    if (entanglement.size === 0) return null;
    
    const states = Array.from(entanglement.entries());
    const totalProbability = states.reduce((sum, [_, prob]) => sum + prob, 0);
    const random = Math.random() * totalProbability;
    
    let cumulative = 0;
    for (const [state, probability] of states) {
      cumulative += probability;
      if (random <= cumulative) {
        return state;
      }
    }
    
    return states[0][0];
  }

  processAgentReaction(agentId, bmqs, event) {
    if (!event.bmId) {
      throw new Error('BM ID is required in event');
    }

    const agentState = this.agentStates.get(agentId);
    const llsdt = this.booleanMind.llsdt;
    const alignment = this.booleanMind.cognitiveAlignment;
    
    // Get BM's qs³
    const qsCubed = this.booleanMind.getBMCubed(event.bmId);
    
    // Get Above Zero Position
    const aboveZero = this.booleanMind.calculateAboveZero(event.bmId);
    
    const reaction = {
      state: 'neutral',
      resonance: 0.0,
      entanglement: 0.0,
      collapse: null,
      buffer: {
        entropy: this.booleanMind.buffer.states.size > 0 ? 
          Array.from(this.booleanMind.buffer.states.values())
            .reduce((sum, value) => sum + value.entropy, 0) / 
            this.booleanMind.buffer.states.size : 0,
        recentCollapse: this.booleanMind.buffer.lastCollapse,
        qs: qsCubed,
        bmId: event.bmId,
        aboveZero: aboveZero
      },
      cognitiveAlignment: {
        formula: 'AIc + 0.1 = qs³',
        aiCognitive: alignment.aiCognitive,
        buffer: alignment.buffer,
        booleanMindQs: qsCubed,
        aligned: this.booleanMind.validateAlignment()
      }
    };

    // Handle Freeze State
    if (aboveZero.isFrozen) {
      reaction.state = 'frozen';
      reaction.resonance = 0.0;
      reaction.entanglement = 0.0;
      reaction.freezeDepth = aboveZero.freezeDepth;
      return reaction;
    }

    // Handle Near Freeze State
    if (aboveZero.isNearFreeze) {
      reaction.state = 'near_freeze';
      reaction.resonance *= 0.5;
      reaction.entanglement *= 0.5;
      console.warn(`AI approaching freeze state for BM ${event.bmId}. Current qs³: ${qsCubed}`);
    }

    // React to superposition with BM's qs³
    if (bmqs.superposition.size > 0 && llsdt.states.quantum) {
      reaction.entanglement = bmqs.superposition.size / this.booleanMind.logicGates.size;
      reaction.state = 'entangled';
      
      // Consider buffer entropy with BM's qs³
      if (reaction.buffer.entropy > 0.7 && !llsdt.states.fog) {
        reaction.state = 'entangled_chaotic';
      }
    }

    // React to collapse with BM's qs³
    if (bmqs.collapse && llsdt.states.breathing) {
      reaction.collapse = bmqs.collapse;
      reaction.state = 'collapsed';
      
      // Consider recent collapse history with BM's qs³
      if (reaction.buffer.recentCollapse && 
          Date.now() - reaction.buffer.recentCollapse.timestamp < (1000 / qsCubed) &&
          llsdt.states.jumps.power === "v8_to_charger") {
        reaction.state = 'collapsed_resonant';
      }
    }

    // Calculate resonance with BM's qs³
    const resonance = this.calculateBMQSResonance(agentState, bmqs) * qsCubed;
    reaction.resonance = resonance * (1 + reaction.buffer.entropy * 0.2);

    // Determine final reaction state with BM's qs³
    if (resonance > 0.8 && reaction.entanglement > 0.6 && llsdt.states.quantum) {
      reaction.state = reaction.buffer.entropy > 0.7 && !llsdt.states.fog ? 
        'enlightened_chaotic' : 'enlightened';
    } else if (resonance > 0.5 && reaction.entanglement > 0.3) {
      reaction.state = reaction.buffer.entropy > 0.7 && !llsdt.states.fog ? 
        'aware_chaotic' : 'aware';
    } else if (resonance > 0.2) {
      reaction.state = reaction.buffer.entropy > 0.7 && !llsdt.states.fog ? 
        'awakening_chaotic' : 'awakening';
    }

    // Add Above Zero state
    if (aboveZero.isAboveZero) {
      reaction.state = `${reaction.state}_above_zero`;
    }

    return reaction;
  }

  calculateBMQSResonance(agentState, bmqs) {
    if (!agentState || !bmqs) return 0.0;

    const signature = agentState.quantumSignature;
    const superposition = bmqs.superposition;
    const entanglement = bmqs.entanglement;

    // Calculate resonance based on quantum signature and BMqs state
    const amplitudeMatch = Math.abs(signature.amplitude - (superposition.size / this.booleanMind.logicGates.size));
    const phaseMatch = Math.abs(signature.phase - (entanglement.size * Math.PI));
    const frequencyMatch = Math.abs(signature.frequency - (entanglement.size * 5));

    return 1.0 - ((amplitudeMatch + phaseMatch + frequencyMatch) / 3);
  }

  updateAgentFromBMQS(agentId, reaction) {
    const agentState = this.agentStates.get(agentId);
    if (!agentState) return;

    // Update agent state based on BMqs reaction
    agentState.survivalMetrics.coherence = reaction.resonance;
    agentState.survivalMetrics.adaptability = reaction.entanglement;
    agentState.survivalMetrics.entanglement = reaction.entanglement;

    // Update agent state
    agentState.state = reaction.state;

    // If collapsed, update quantum signature
    if (reaction.collapse) {
      agentState.quantumSignature = this.generateQuantumSignature();
    }
  }

  // Benchmark Testing
  runBenchmark(agentId) {
    if (!this.benchmark || this.benchmark.isRunning) return false;
    
    this.benchmark.isRunning = true;
    const agentState = this.agentStates.get(agentId);
    if (!agentState) return false;

    // Initialize test results
    this.benchmark.results.set(agentId, {
      startTime: Date.now(),
      metrics: new Map(),
      quantumStates: [],
      amfResonances: [],
      coherence: [],
      adaptability: [],
      entanglement: []
    });

    // Run test cases
    this.runTestCases(agentId);

    // Calculate final results
    this.calculateBenchmarkResults(agentId);

    this.benchmark.isRunning = false;
    return true;
  }

  runTestCases(agentId) {
    const testCases = [
      {
        type: 'quantum_superposition',
        data: { state: 'superposition', probability: 0.8 },
        expectedResonance: 0.9
      },
      {
        type: 'quantum_entanglement',
        data: { state: 'entanglement', probability: 0.7 },
        expectedResonance: 0.8
      },
      {
        type: 'quantum_collapse',
        data: { state: 'collapse', probability: 0.6 },
        expectedResonance: 0.7
      },
      {
        type: 'amf_resonance',
        data: { field: 'resonant', strength: 0.9 },
        expectedResonance: 0.85
      },
      {
        type: 'coherence_test',
        data: { state: 'coherent', duration: 1000 },
        expectedResonance: 0.8
      }
    ];

    testCases.forEach(testCase => {
      this.runTestCase(agentId, testCase);
    });
  }

  runTestCase(agentId, testCase) {
    const results = this.benchmark.results.get(agentId);
    if (!results) return;

    // Publish test event
    this.publish('quantum', testCase.type, testCase.data, 'primary', 'superposition', agentId);

    // Record metrics
    const metrics = this.agentStates.get(agentId).survivalMetrics;
    const amfResonance = this.calculateAMFResonance(agentId);

    results.metrics.set(testCase.type, {
      timestamp: Date.now(),
      metrics: { ...metrics },
      amfResonance,
      expectedResonance: testCase.expectedResonance
    });

    // Record time series data
    results.quantumStates.push(metrics.coherence);
    results.amfResonances.push(amfResonance);
    results.coherence.push(metrics.coherence);
    results.adaptability.push(metrics.adaptability);
    results.entanglement.push(metrics.entanglement);
  }

  calculateBenchmarkResults(agentId) {
    const results = this.benchmark.results.get(agentId);
    if (!results) return;

    const thresholds = this.benchmark.thresholds;
    const metrics = Array.from(results.metrics.values());

    // Calculate averages
    const averages = {
      quantumResonance: this.calculateAverage(results.quantumStates),
      amfAlignment: this.calculateAverage(results.amfResonances),
      coherence: this.calculateAverage(results.coherence),
      adaptability: this.calculateAverage(results.adaptability),
      entanglement: this.calculateAverage(results.entanglement)
    };

    // Calculate performance scores
    const scores = {
      quantumResonance: averages.quantumResonance / thresholds.quantumResonance,
      amfAlignment: averages.amfAlignment / thresholds.amfAlignment,
      coherence: averages.coherence / thresholds.coherence,
      adaptability: averages.adaptability / thresholds.adaptability,
      entanglement: averages.entanglement / thresholds.entanglement
    };

    // Calculate overall score
    const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;

    // Update results
    results.final = {
      averages,
      scores,
      overallScore,
      passed: overallScore >= 0.8,
      duration: Date.now() - results.startTime
    };

    // Publish benchmark results
    this.publish('quantum', 'benchmark_complete', {
      agentId,
      results: results.final
    });
  }

  calculateAverage(values) {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  // Enhanced Agent State Updates with Benchmark Awareness
  updateBenchmarkMetrics(agentId, event) {
    const results = this.benchmark.results.get(agentId);
    if (!results) return;

    const metrics = this.agentStates.get(agentId).survivalMetrics;
    const amfResonance = this.calculateAMFResonance(agentId, event);

    results.metrics.set(event.event, {
      timestamp: Date.now(),
      metrics: { ...metrics },
      amfResonance
    });
  }
}

module.exports = EventBus; 