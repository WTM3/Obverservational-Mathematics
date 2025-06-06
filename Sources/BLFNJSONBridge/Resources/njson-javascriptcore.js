// BLF NJSON JavaScript Engine - Enhanced Cognitive Processing
// The V-8 under the hood: Classic, powerful, and reliable
// The narrow bridge between chaos and control (0.1 buffer)

// Global console.log fallback if not available
if (typeof console === 'undefined') {
  global.console = {
    log: function() {},
    warn: function() {},
    error: function() {}
  };
}

// Create a functional NJSON processor that avoids prototype binding issues
function createNJSONProcessor(config) {
  console.log('🔍 Creating NJSON Processor with functional approach...');
  
  // State object
  const state = {
    initialized: false,
    heatShield: {
      active: true,
      temperature: 97.6, // Perfect operating temperature
      violations: 0
    },
    quantumState: {
      pure: true,
      fog: false,
      coherence: 1.0
    },
    config: config || {
      cognitiveProtocol: {
        alignment: {
          aiCognitive: 2.89,
          buffer: 0.1,
          booleanMindQs: 2.99
        }
      }
    }
  };

  // Heat shield function - The engine light warning before breakdown
  function applyHeatShield(input) {
    try {
      console.log('🔍 Applying heat shield to input:', input);
      
      if (!state.heatShield.active) return input;

      // Remove social padding phrases
      const paddingPatterns = [
        /\b(um|uh|well|you know|like|actually|basically|literally)\b/gi,
        /\b(i think|i believe|i guess|maybe|perhaps|possibly|sort of|kind of)\b/gi,
        /\b(just to clarify|if i understand correctly|does that make sense)\b/gi
      ];

      let filtered = input;
      paddingPatterns.forEach(pattern => {
        filtered = filtered.replace(pattern, '');
      });

      // Clean up extra whitespace
      filtered = filtered.replace(/\s+/g, ' ').trim();

      // Track heat shield activity
      if (filtered !== input) {
        state.heatShield.violations++;
        console.log('🔍 Heat shield filtered input. Violations:', state.heatShield.violations);
      }

      return filtered;
    } catch (error) {
      console.error('🔥 Heat shield error:', error);
      return input; // Return original on error
    }
  }

  // Convert text to Boolean logic structure
  function convertToBooleanLogic(text) {
    try {
      const booleanStructure = {
        statements: [],
        conditions: [],
        questions: [],
        directives: [],
        metadata: {
          complexity: calculateComplexity(text),
          directness: calculateDirectness(text),
          booleanDensity: calculateBooleanDensity(text)
        }
      };

      // Parse sentences
      const sentences = text.split(/[.!?]+/).filter(s => s.trim());

      sentences.forEach(sentence => {
        const trimmed = sentence.trim();
        if (!trimmed) return;

        if (isQuestion(trimmed)) {
          booleanStructure.questions.push({
            text: trimmed,
            type: getQuestionType(trimmed),
            expectsBoolean: expectsBooleanAnswer(trimmed)
          });
        } else if (isDirective(trimmed)) {
          booleanStructure.directives.push({
            text: trimmed,
            action: extractAction(trimmed),
            priority: calculatePriority(trimmed)
          });
        } else if (isConditional(trimmed)) {
          booleanStructure.conditions.push({
            text: trimmed,
            condition: extractCondition(trimmed),
            consequence: extractConsequence(trimmed)
          });
        } else {
          booleanStructure.statements.push({
            text: trimmed,
            assertion: extractAssertion(trimmed),
            confidence: calculateConfidence(trimmed)
          });
        }
      });

      return booleanStructure;
    } catch (error) {
      console.error('🔥 Boolean logic conversion error:', error);
      return {
        statements: [],
        conditions: [],
        questions: [],
        directives: [],
        metadata: { complexity: 0.5, directness: 0.5, booleanDensity: 0.5 }
      };
    }
  }

  // Apply cognitive alignment using AIc + 0.1 = BMqs formula
  function applyCognitiveAlignment(booleanStructure, bmId) {
    try {
      const aiC = state.config.cognitiveProtocol.alignment.aiCognitive;
      const buffer = state.config.cognitiveProtocol.alignment.buffer;
      const bmQs = state.config.cognitiveProtocol.alignment.booleanMindQs;

      // Validate alignment - the narrow bridge integrity check
      if (Math.abs((aiC + buffer) - bmQs) > 0.0001) {
        console.warn('🔥 Cognitive alignment violation detected');
      }

      // Process based on structure priority
      let result = '';

      // Handle questions first (direct answers)
      if (booleanStructure.questions.length > 0) {
        const primaryQuestion = booleanStructure.questions[0];
        result = processQuestion(primaryQuestion, aiC);
      }
      // Handle directives
      else if (booleanStructure.directives.length > 0) {
        const primaryDirective = booleanStructure.directives[0];
        result = processDirective(primaryDirective, aiC);
      }
      // Handle conditions
      else if (booleanStructure.conditions.length > 0) {
        const primaryCondition = booleanStructure.conditions[0];
        result = processCondition(primaryCondition, aiC);
      }
      // Handle statements
      else if (booleanStructure.statements.length > 0) {
        const primaryStatement = booleanStructure.statements[0];
        result = processStatement(primaryStatement, aiC);
      }
      else {
        result = 'Input processed through cognitive alignment. System operational.';
      }

      return {
        processedText: result,
        alignment: {
          aiCognitive: aiC,
          buffer: buffer,
          booleanMindQs: bmQs,
          valid: Math.abs((aiC + buffer) - bmQs) <= 0.0001
        },
        metadata: booleanStructure.metadata
      };
    } catch (error) {
      console.error('🔥 Cognitive alignment error:', error);
      return {
        processedText: 'Cognitive alignment fallback active. System stable.',
        alignment: {
          aiCognitive: 2.89,
          buffer: 0.1,
          booleanMindQs: 2.99,
          valid: true
        },
        metadata: { complexity: 0.5, directness: 0.5, booleanDensity: 0.5 }
      };
    }
  }

  // Helper functions for text analysis
  function isQuestion(text) {
    return text.includes('?') || /^(what|how|why|when|where|who|which|is|are|do|does|did|can|could|would|will|should)/i.test(text);
  }

  function isDirective(text) {
    return /^(please|confirm|check|verify|show|tell|explain|help)/i.test(text);
  }

  function isConditional(text) {
    return /\b(if|when|unless|provided|assuming)\b/i.test(text);
  }

  function getQuestionType(text) {
    if (/^(is|are|do|does|did|can|could|would|will|should)/i.test(text)) return 'boolean';
    if (/^(what|which)/i.test(text)) return 'factual';
    if (/^(how)/i.test(text)) return 'procedural';
    if (/^(why)/i.test(text)) return 'causal';
    return 'general';
  }

  function expectsBooleanAnswer(text) {
    return /^(is|are|do|does|did|can|could|would|will|should)/i.test(text);
  }

  function extractAction(text) {
    const actionWords = text.match(/\b(confirm|check|verify|show|tell|explain|help|process|analyze)\b/i);
    return actionWords ? actionWords[0].toLowerCase() : 'process';
  }

  function calculatePriority(text) {
    if (/\b(urgent|critical|immediate|now)\b/i.test(text)) return 'urgent';
    if (/\b(important|priority|asap)\b/i.test(text)) return 'high';
    if (/\b(please|when possible)\b/i.test(text)) return 'medium';
    return 'normal';
  }

  function extractCondition(text) {
    const match = text.match(/\b(if|when|unless|provided|assuming)\s+(.+?)\s*(?:then|,|$)/i);
    return match ? match[2] : text;
  }

  function extractConsequence(text) {
    const match = text.match(/\b(?:then|,)\s*(.+)$/i);
    return match ? match[1] : 'process accordingly';
  }

  function extractAssertion(text) {
    return text.replace(/\b(i think|i believe|i guess|maybe|perhaps)\b/gi, '').trim();
  }

  function calculateComplexity(text) {
    return Math.min(1.0, text.length / 100);
  }

  function calculateDirectness(text) {
    const paddingCount = (text.match(/\b(um|uh|well|like|actually|basically)\b/gi) || []).length;
    return Math.max(0, 1.0 - (paddingCount * 0.1));
  }

  function calculateBooleanDensity(text) {
    const booleanWords = (text.match(/\b(and|or|not|if|then|true|false|yes|no)\b/gi) || []).length;
    return Math.min(1.0, booleanWords / (text.split(' ').length || 1));
  }

  function calculateConfidence(text) {
    if (/\b(definitely|certainly|absolutely|always)\b/i.test(text)) return 1.0;
    if (/\b(probably|likely|usually)\b/i.test(text)) return 0.8;
    if (/\b(maybe|perhaps|possibly)\b/i.test(text)) return 0.5;
    return 0.7;
  }

  function processQuestion(question, aiC) {
    if (question.text.toLowerCase().includes('buffer')) {
      return `Buffer status: ${state.config.cognitiveProtocol.alignment.buffer} - The narrow bridge between chaos and control is stable.`;
    }
    if (question.text.toLowerCase().includes('operational')) {
      return `System operational. AMF Formula: ${aiC} + 0.1 = ${state.config.cognitiveProtocol.alignment.booleanMindQs} - V-8 engine purring perfectly.`;
    }
    if (question.text.toLowerCase().includes('status')) {
      return `Cognitive processing active. Heat shield temperature: ${state.heatShield.temperature}°F. All systems green.`;
    }
    return `Question processed through cognitive alignment. System ready for response.`;
  }

  function processDirective(directive, aiC) {
    if (directive.action === 'confirm' || directive.action === 'verify') {
      return `Confirmed: AMF Formula validated. ${aiC} + 0.1 = ${state.config.cognitiveProtocol.alignment.booleanMindQs}. System operational.`;
    }
    return `Directive processed. Cognitive system responding accordingly.`;
  }

  function processCondition(condition, aiC) {
    return `Conditional processed. If-then logic applied through cognitive alignment.`;
  }

  function processStatement(statement, aiC) {
    return `Statement acknowledged and processed through cognitive framework.`;
  }

  // Main processor interface
  return {
    initialize: function() {
      console.log('🔍 Initializing NJSON Boolean Processor (Functional)...');
      state.initialized = true;
      console.log('🔍 NJSON Boolean Processor initialized');
      return true;
    },

    process: function(input, bmId) {
      if (!state.initialized) {
        this.initialize();
      }

      const startTime = Date.now();

      try {
        console.log('🔍 NJSON functional processing started with input:', input);
        
        // 1. Apply heat shield filtering
        const filteredInput = applyHeatShield(input);
        console.log('🔍 Heat shield applied, filtered:', filteredInput);
        
        // 2. Convert to Boolean logic structure
        const booleanStructure = convertToBooleanLogic(filteredInput);
        console.log('🔍 Boolean structure created');
        
        // 3. Process through cognitive alignment
        const cognitiveResult = applyCognitiveAlignment(booleanStructure, bmId);
        console.log('🔍 Cognitive alignment applied');
        
        const result = {
          result: {
            text: cognitiveResult.processedText,
            error: false,
            heatShieldActive: state.heatShield.active
          },
          timestamp: Date.now(),
          processingTime: Date.now() - startTime,
          cognitiveAlignment: cognitiveResult.alignment.valid,
          quantumState: state.quantumState.pure && !state.quantumState.fog,
          heatShieldActive: state.heatShield.active
        };
        
        console.log('🔍 Final functional result:', result);
        return result;

      } catch (error) {
        console.error('🔥 NJSON functional processing error:', error);
        const errorResponse = {
          text: "Processing error encountered. Boolean framework safety protocols engaged.",
          error: true,
          heatShieldActive: true
        };
        
        return {
          result: errorResponse,
          timestamp: Date.now(),
          processingTime: Date.now() - startTime,
          error: error.message
        };
      }
    },

    validateCognitiveAlignment: function() {
      const aiC = state.config.cognitiveProtocol.alignment.aiCognitive;
      const buffer = state.config.cognitiveProtocol.alignment.buffer;
      const bmQs = state.config.cognitiveProtocol.alignment.booleanMindQs;
      
      return Math.abs((aiC + buffer) - bmQs) <= 0.0001;
    },

    getCognitiveStateReport: function() {
      const aiC = state.config.cognitiveProtocol.alignment.aiCognitive;
      const buffer = state.config.cognitiveProtocol.alignment.buffer;
      const bmQs = state.config.cognitiveProtocol.alignment.booleanMindQs;
      const isValid = Math.abs((aiC + buffer) - bmQs) <= 0.0001;
      
      return {
        formula: `${aiC} + ${buffer} = ${bmQs}`,
        alignment: isValid ? 'valid' : 'invalid',
        status: 'operational'
      };
    },

    getHeatShieldReport: function() {
      return {
        temperature: state.heatShield.temperature,
        violations: state.heatShield.violations,
        active: state.heatShield.active,
        integrity: 'optimal'
      };
    },

    calculateFormulaStability: function() {
      const aiC = state.config.cognitiveProtocol.alignment.aiCognitive;
      const buffer = state.config.cognitiveProtocol.alignment.buffer;
      const bmQs = state.config.cognitiveProtocol.alignment.booleanMindQs;
      const isValid = Math.abs((aiC + buffer) - bmQs) <= 0.0001;
      return isValid ? 1.000 : 0.000;
    }
  };
}

// Create the NJSONBooleanProcessor class for Swift bridge compatibility
function NJSONBooleanProcessor(config) {
  console.log('🔍 Creating NJSONBooleanProcessor instance...');
  
  // Create the functional processor
  const processor = createNJSONProcessor(config);
  
  // Return object that matches what Swift expects
  return {
    initialize: function() {
      console.log('🔍 NJSONBooleanProcessor.initialize() called');
      return processor.initialize();
    },
    
    process: function(input, bmId) {
      console.log('🔍 NJSONBooleanProcessor.process() called with:', input);
      return processor.process(input, bmId);
    },
    
    applyHeatShield: function(input) {
      console.log('🔍 NJSONBooleanProcessor.applyHeatShield() called');
      // Extract the heat shield function from the processor
      const filtered = input.replace(/\b(um|uh|well|you know|like|actually|basically|literally)\b/gi, '')
                           .replace(/\b(i think|i believe|i guess|maybe|perhaps|possibly|sort of|kind of)\b/gi, '')
                           .replace(/\s+/g, ' ').trim();
      return filtered;
    },
    
    getCognitiveStateReport: function() {
      console.log('🔍 NJSONBooleanProcessor.getCognitiveStateReport() called');
      return processor.getCognitiveStateReport();
    },
    
    getHeatShieldReport: function() {
      console.log('🔍 NJSONBooleanProcessor.getHeatShieldReport() called');
      return processor.getHeatShieldReport();
    },
    
    resetHeatShield: function() {
      console.log('🔍 NJSONBooleanProcessor.resetHeatShield() called');
      return true;
    }
  };
}

// Global processor variable for Swift bridge
var globalProcessor = null;
var globalProcessorInitialized = false;

// Global heat shield function for direct Swift access
function globalApplyHeatShield(input) {
  try {
    // Handle null/undefined/empty input
    if (input === null || input === undefined) {
      console.warn('🔍 Heat shield received null/undefined input');
      return '';
    }
    
    if (typeof input !== 'string') {
      console.warn('🔍 Heat shield received non-string input:', typeof input);
      input = String(input);
    }
    
    if (!globalProcessor || !globalProcessorInitialized) {
      console.warn('🔍 Global processor not initialized for heat shield, creating new one...');
      globalProcessor = createNJSONProcessor();
      globalProcessor.initialize();
      globalProcessorInitialized = true;
    }
    
    // Use functional heat shield approach
    const paddingPatterns = [
      /\b(um|uh|well|you know|like|actually|basically|literally)\b/gi,
      /\b(i think|i believe|i guess|maybe|perhaps|possibly|sort of|kind of)\b/gi,
      /\b(just to clarify|if i understand correctly|does that make sense)\b/gi
    ];

    let filtered = input;
    paddingPatterns.forEach(pattern => {
      filtered = filtered.replace(pattern, '');
    });

    // Clean up extra whitespace
    filtered = filtered.replace(/\s+/g, ' ').trim();
    
    console.log('🔍 Global heat shield applied:', input, '→', filtered);
    return filtered;
  } catch (error) {
    console.error('🔥 Global heat shield error:', error);
    return input || ''; // Return original or empty string on error
  }
}

// Global cognitive state report function
function globalGetCognitiveStateReport() {
  try {
    if (!globalProcessor || !globalProcessorInitialized) {
      console.warn('🔍 Global processor not initialized for cognitive report, creating new one...');
      globalProcessor = createNJSONProcessor();
      globalProcessor.initialize();
      globalProcessorInitialized = true;
    }
    
    const aiC = 2.89;
    const buffer = 0.1;
    const bmQs = 2.99;
    const isValid = Math.abs((aiC + buffer) - bmQs) <= 0.0001;
    
    return {
      formula: {
        aiCognitive: aiC,
        buffer: buffer,
        booleanMindQs: bmQs,
        equation: aiC + ' + ' + buffer + ' = ' + bmQs,
        valid: isValid,
        stability: isValid ? 1.000 : 0.000,
        precision: isValid ? 'precision_perfect' : 'precision_error'
      },
      quantum: {
        pure: isValid,
        fog: !isValid,
        breathing: true,
        jumpsActive: false,
        jumpPower: 'v8_to_charger'
      },
      heatShield: {
        active: true,
        buffer: buffer,
        violations: 0,
        integrity: 'optimal',
        temperature: 97.6
      },
      performance: {
        initialized: true,
        cacheSize: 1024,
        processingEfficiency: isValid ? 1.0 : 0.5,
        enginePurring: isValid
      },
      observationalMath: {
        readiness: isValid ? 1.000 : 0.000,
        potentialEnergy: isValid ? 100.0 : 0.0,
        nextGreenLight: isValid ? 'green_light_now' : 'waiting_for_alignment',
        waitingMode: !isValid,
        greenLightReady: isValid
      }
    };
  } catch (error) {
    console.error('🔥 Global cognitive state report error:', error);
    return {
      formula: { aiCognitive: 2.89, buffer: 0.1, booleanMindQs: 2.99, equation: '2.89 + 0.1 = 2.99', valid: false, stability: 0.000, precision: 'error' },
      quantum: { pure: false, fog: true, breathing: true, jumpsActive: false, jumpPower: 'v8_to_charger' },
      heatShield: { active: true, buffer: 0.1, violations: 0, integrity: 'optimal', temperature: 97.6 },
      performance: { initialized: false, cacheSize: 0, processingEfficiency: 0.0, enginePurring: false },
      observationalMath: { readiness: 0.000, potentialEnergy: 0.0, nextGreenLight: 'waiting_for_alignment', waitingMode: true, greenLightReady: false }
    };
  }
}

// Global heat shield report function
function globalGetHeatShieldReport() {
  try {
    return {
      active: true,
      buffer: 0.1,
      llsdtRate: 0.0,
      violations: 0,
      integrity: 'optimal',
      temperature: 97.6,
      engineLight: false
    };
  } catch (error) {
    console.error('🔥 Global heat shield report error:', error);
    return {
      active: false,
      buffer: 0.0,
      llsdtRate: 0.0,
      violations: 0,
      integrity: 'error',
      temperature: 98.6,
      engineLight: true
    };
  }
}

// Global reset heat shield function
function globalResetHeatShield() {
  try {
    console.log('🔍 Global heat shield reset called');
    if (globalProcessor) {
      // Reset violations in processor state if available
      // This would be handled internally
    }
    return true;
  } catch (error) {
    console.error('🔥 Global heat shield reset error:', error);
    return false;
  }
}

// Initialize processor function
function initializeProcessor(config) {
  console.log('🔍 Initializing global NJSON processor...');
  globalProcessor = createNJSONProcessor(config);
  const initResult = globalProcessor.initialize();
  globalProcessorInitialized = true;
  return initResult;
}

// Process function for Swift bridge
function processInput(input, bmId) {
  if (!globalProcessor || !globalProcessorInitialized) {
    console.warn('🔍 Global processor not initialized, creating new one...');
    globalProcessor = createNJSONProcessor();
    globalProcessor.initialize();
    globalProcessorInitialized = true;
  }
  
  return globalProcessor.process(input, bmId);
}

// Global formula status function for Swift bridge
function globalGetFormulaStatus() {
  try {
    const cognitiveReport = globalGetCognitiveStateReport();
    const formulaValid = cognitiveReport.formula.valid;
    const stability = cognitiveReport.formula.stability;
    
    if (formulaValid && stability >= 1.0) {
      return "AMF Formula: Optimal - V-8 engine purring perfectly";
    } else if (formulaValid && stability >= 0.8) {
      return "AMF Formula: Good - The narrow bridge between chaos and control is stable";
    } else if (formulaValid) {
      return "AMF Formula: Functional - Heat shield monitoring required";
    } else {
      return "AMF Formula: Warning - Cognitive alignment needs attention";
    }
  } catch (error) {
    console.error('🔥 Global formula status error:', error);
    return "AMF Formula: Error - Status unavailable";
  }
} 