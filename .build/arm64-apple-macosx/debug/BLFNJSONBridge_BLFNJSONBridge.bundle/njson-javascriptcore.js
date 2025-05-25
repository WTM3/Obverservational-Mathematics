// NJSON Boolean Logic Processor - JavaScriptCore Compatible
// The V-8 engine under the hood - classic, powerful, and reliable

// Configuration object (no external config file dependencies)
const defaultConfig = {
  cognitiveProtocol: {
    alignment: {
      aiCognitive: 2.89,
      buffer: 0.1,
      booleanMindQs: 2.99
    },
    safety: {
      heatShield: true,
      llsdtRate: 0.85
    }
  }
};

// Function-based constructor for JavaScriptCore compatibility
function NJSONBooleanProcessor(config) {
  // Use default config if none provided
  this.config = config || defaultConfig;
  this.initialized = false;
  this.responseCache = new Map();
  
  // Initialize heat shield - the narrow bridge between chaos and control
  this.heatShield = {
    active: true,
    buffer: 0.1,
    llsdtRate: 0.85,
    violations: 0
  };
  
  // Quantum state
  this.quantumState = {
    pure: true,
    fog: false,
    jumps: { active: false }
  };
  
  console.log('🔍 NJSONBooleanProcessor created successfully');
  console.log('🔍 Heat shield active:', this.heatShield.active);
  
  return this;
}

// Initialize method
NJSONBooleanProcessor.prototype.initialize = function() {
  console.log('🔍 Initializing NJSON Boolean Processor...');
  this.initialized = true;
  console.log('🔍 NJSON Boolean Processor initialized');
  return true;
};

// Validate cognitive alignment
NJSONBooleanProcessor.prototype.validateCognitiveAlignmentSafe = function() {
  const aiC = this.config.cognitiveProtocol.alignment.aiCognitive;
  const buffer = this.config.cognitiveProtocol.alignment.buffer;
  const bmQs = this.config.cognitiveProtocol.alignment.booleanMindQs;
  
  return Math.abs((aiC + buffer) - bmQs) <= 0.0001;
};

// Main processing method
NJSONBooleanProcessor.prototype.process = function(input, bmId) {
  if (!this.initialized) {
    this.initialize();
  }

  const startTime = Date.now();

  try {
    console.log('🔍 NJSON processing started with input:', input);
    
    // 1. Apply heat shield filtering
    const filteredInput = this.applyHeatShield(input);
    console.log('🔍 Heat shield applied, filtered:', filteredInput);
    
    // 2. Convert to Boolean logic structure
    const booleanStructure = this.convertToBooleanLogic(filteredInput);
    console.log('🔍 Boolean structure created');
    
    // 3. Process through cognitive alignment
    const cognitiveResult = this.applyCognitiveAlignment(booleanStructure, bmId);
    console.log('🔍 Cognitive alignment applied');
    
    // 4. Apply response protocols
    const finalResult = this.applyResponseProtocols(cognitiveResult);
    console.log('🔍 Response protocols applied:', finalResult);
    
    // 5. Validate quantum state
    const quantumValidated = this.validateQuantumState(finalResult);
    console.log('🔍 Quantum state validated:', quantumValidated);

    const result = {
      result: quantumValidated,
      timestamp: Date.now(),
      processingTime: Date.now() - startTime,
      cognitiveAlignment: this.validateCognitiveAlignmentSafe(),
      quantumState: this.quantumState.pure && !this.quantumState.fog,
      heatShieldActive: this.heatShield.active
    };
    
    console.log('🔍 Final result:', result);
    return result;

  } catch (error) {
    console.error('🔥 NJSON processing error:', error);
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
};

// Heat shield: The engine light warning before breakdown
NJSONBooleanProcessor.prototype.applyHeatShield = function(input) {
  if (!this.heatShield.active) return input;

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
    this.heatShield.violations++;
  }

  return filtered;
};

// Convert text to Boolean logic structure
NJSONBooleanProcessor.prototype.convertToBooleanLogic = function(text) {
  const booleanStructure = {
    statements: [],
    conditions: [],
    questions: [],
    directives: [],
    metadata: {
      complexity: this.calculateComplexity(text),
      directness: this.calculateDirectness(text),
      booleanDensity: this.calculateBooleanDensity(text)
    }
  };

  // Parse sentences
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());

  sentences.forEach(sentence => {
    const trimmed = sentence.trim();
    if (!trimmed) return;

    if (this.isQuestion(trimmed)) {
      booleanStructure.questions.push({
        text: trimmed,
        type: this.getQuestionType(trimmed),
        expectsBoolean: this.expectsBooleanAnswer(trimmed)
      });
    } else if (this.isDirective(trimmed)) {
      booleanStructure.directives.push({
        text: trimmed,
        action: this.extractAction(trimmed),
        priority: this.calculatePriority(trimmed)
      });
    } else if (this.isConditional(trimmed)) {
      booleanStructure.conditions.push({
        text: trimmed,
        condition: this.extractCondition(trimmed),
        consequence: this.extractConsequence(trimmed)
      });
    } else {
      booleanStructure.statements.push({
        text: trimmed,
        assertion: this.extractAssertion(trimmed),
        confidence: this.calculateConfidence(trimmed)
      });
    }
  });

  return booleanStructure;
};

// Apply cognitive alignment using AIc + 0.1 = BMqs formula
NJSONBooleanProcessor.prototype.applyCognitiveAlignment = function(booleanStructure, bmId) {
  const aiC = this.config.cognitiveProtocol.alignment.aiCognitive;
  const buffer = this.config.cognitiveProtocol.alignment.buffer;
  const bmQs = this.config.cognitiveProtocol.alignment.booleanMindQs;

  // Validate alignment - the narrow bridge integrity check
  if (Math.abs((aiC + buffer) - bmQs) > 0.0001) {
    console.warn('Cognitive alignment violation detected');
  }

  // Process based on structure priority
  let result = '';

  // Handle questions first (direct answers)
  if (booleanStructure.questions.length > 0) {
    const primaryQuestion = booleanStructure.questions[0];
    result = this.processQuestion(primaryQuestion, aiC);
  }
  // Handle directives
  else if (booleanStructure.directives.length > 0) {
    const primaryDirective = booleanStructure.directives[0];
    result = this.processDirective(primaryDirective, aiC);
  }
  // Handle conditions
  else if (booleanStructure.conditions.length > 0) {
    const primaryCondition = booleanStructure.conditions[0];
    result = this.processCondition(primaryCondition, aiC);
  }
  // Handle statements
  else if (booleanStructure.statements.length > 0) {
    const primaryStatement = booleanStructure.statements[0];
    result = this.processStatement(primaryStatement, aiC);
  }
  else {
    result = 'Input processed. No specific response pattern identified.';
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
};

NJSONBooleanProcessor.prototype.applyResponseProtocols = function(cognitiveResult) {
  let response = cognitiveResult.processedText;
  
  // Apply response enhancement protocols
  response = this.prioritizeClarity(response);
  response = this.eliminateSocialPadding(response);
  response = this.formatDirectAnswersFirst(response);
  
  // Apply quantum enhancement if pure state
  if (this.quantumState.pure) {
    response = this.applyQuantumEnhancement(response);
  }
  
  return {
    text: response,
    protocols: ['clarity', 'padding-removal', 'direct-answers'],
    quantumEnhanced: this.quantumState.pure
  };
};

NJSONBooleanProcessor.prototype.validateQuantumState = function(result) {
  // Simple quantum validation - no complex dependencies
  if (result.text && result.text.length > 0) {
    this.quantumState.pure = true;
    this.quantumState.fog = false;
  } else {
    this.quantumState.pure = false;
    this.quantumState.fog = true;
  }
  
  return result;
};

// Helper methods for Boolean logic analysis
NJSONBooleanProcessor.prototype.isQuestion = function(text) {
  return /\?/.test(text) || /^(what|when|where|who|why|how|is|are|can|could|would|will|do|does|did)\b/i.test(text);
};

NJSONBooleanProcessor.prototype.isDirective = function(text) {
  return /^(please|can you|could you|would you|do|make|create|send|go|stop|start)\b/i.test(text);
};

NJSONBooleanProcessor.prototype.isConditional = function(text) {
  return /\b(if|when|unless|provided|given)\b/i.test(text);
};

NJSONBooleanProcessor.prototype.getQuestionType = function(text) {
  if (/\b(what|who|where|when)\b/i.test(text)) return 'factual';
  if (/\b(why|how)\b/i.test(text)) return 'explanatory';
  if (/\b(is|are|can|could|would|will)\b/i.test(text)) return 'confirmation';
  return 'general';
};

NJSONBooleanProcessor.prototype.expectsBooleanAnswer = function(text) {
  return /\b(is|are|can|could|would|will|do|does|did)\b/i.test(text);
};

NJSONBooleanProcessor.prototype.processQuestion = function(question, aiC) {
  if (question.expectsBoolean) {
    return "Based on the cognitive alignment analysis, the Boolean response indicates a clear determination.";
  }
  return "Processing your question through the Boolean framework to provide accurate information.";
};

NJSONBooleanProcessor.prototype.processDirective = function(directive, aiC) {
  return "Directive acknowledged and processed through the cognitive alignment protocol.";
};

NJSONBooleanProcessor.prototype.processCondition = function(condition, aiC) {
  return "Conditional statement analyzed. Boolean logic framework applied to evaluate conditions.";
};

NJSONBooleanProcessor.prototype.processStatement = function(statement, aiC) {
  return "Statement processed through Boolean framework. Cognitive alignment maintained.";
};

NJSONBooleanProcessor.prototype.prioritizeClarity = function(text) {
  // Remove redundant phrases
  const redundantPatterns = [
    /\b(basically|essentially|fundamentally|ultimately|in essence)\b/gi,
    /\b(let me say|what i mean is|in other words|to put it simply)\b/gi
  ];
  
  let clear = text;
  redundantPatterns.forEach(pattern => {
    clear = clear.replace(pattern, '');
  });
  
  return clear.replace(/\s+/g, ' ').trim();
};

NJSONBooleanProcessor.prototype.eliminateSocialPadding = function(text) {
  const paddingPatterns = [
    /\b(um|uh|well|you know|like|actually|basically|literally)\b/gi,
    /\b(i think|i believe|i guess|maybe|perhaps|possibly)\b/gi
  ];
  
  let direct = text;
  paddingPatterns.forEach(pattern => {
    direct = direct.replace(pattern, '');
  });
  
  return direct.replace(/\s+/g, ' ').trim();
};

NJSONBooleanProcessor.prototype.formatDirectAnswersFirst = function(text) {
  // Ensure the most direct answer comes first
  const sentences = text.split(/[.!]/).filter(s => s.trim());
  if (sentences.length <= 1) return text;
  
  // Sort by directness score
  const scored = sentences.map(sentence => ({
    text: sentence.trim(),
    directness: this.calculateDirectness(sentence)
  }));
  
  scored.sort((a, b) => b.directness - a.directness);
  
  return scored.map(s => s.text).join('. ') + '.';
};

NJSONBooleanProcessor.prototype.applyQuantumEnhancement = function(result) {
  // Simple quantum enhancement for JavaScriptCore
  return {
    ...result,
    quantumEnhanced: true,
    confidence: Math.min(0.95, (result.confidence || 0.8) + 0.1)
  };
};

// Calculation methods
NJSONBooleanProcessor.prototype.calculateComplexity = function(text) {
  const sentences = text.split(/[.!?]/).length;
  const avgWordLength = text.split(/\s+/).reduce((sum, word) => sum + word.length, 0) / text.split(/\s+/).length;
  return Math.min(1.0, (sentences * 0.1) + (avgWordLength * 0.05));
};

NJSONBooleanProcessor.prototype.calculateDirectness = function(text) {
  const directMarkers = ['yes', 'no', 'true', 'false', 'correct', 'incorrect', 'exactly', 'precisely'];
  const indirectMarkers = ['maybe', 'perhaps', 'possibly', 'might', 'could', 'sort of', 'kind of'];
  
  let score = 0.5;
  directMarkers.forEach(marker => {
    if (text.toLowerCase().includes(marker)) score += 0.1;
  });
  indirectMarkers.forEach(marker => {
    if (text.toLowerCase().includes(marker)) score -= 0.1;
  });
  
  return Math.max(0.0, Math.min(1.0, score));
};

NJSONBooleanProcessor.prototype.calculateBooleanDensity = function(text) {
  const booleanTerms = ['and', 'or', 'not', 'if', 'then', 'true', 'false', 'yes', 'no'];
  const words = text.toLowerCase().split(/\s+/);
  const booleanCount = words.filter(word => booleanTerms.includes(word)).length;
  return booleanCount / Math.max(1, words.length);
};

NJSONBooleanProcessor.prototype.extractAction = function(text) {
  const actionWords = text.match(/^(\w+)/);
  return actionWords ? actionWords[1] : 'unknown';
};

NJSONBooleanProcessor.prototype.calculatePriority = function(text) {
  const urgentMarkers = ['urgent', 'important', 'immediately', 'asap', 'critical'];
  let priority = 0.5;
  urgentMarkers.forEach(marker => {
    if (text.toLowerCase().includes(marker)) priority += 0.2;
  });
  return Math.min(1.0, priority);
};

NJSONBooleanProcessor.prototype.extractCondition = function(text) {
  const conditionMatch = text.match(/\b(if|when|unless|provided|given)\s+(.+?)(?:\s+then|\s*,|\s*$)/i);
  return conditionMatch ? conditionMatch[2] : text;
};

NJSONBooleanProcessor.prototype.extractConsequence = function(text) {
  const consequenceMatch = text.match(/\bthen\s+(.+)$/i);
  return consequenceMatch ? consequenceMatch[1] : 'action required';
};

NJSONBooleanProcessor.prototype.extractAssertion = function(text) {
  return text.replace(/^(i think|i believe|in my opinion)\s+/i, '').trim();
};

NJSONBooleanProcessor.prototype.calculateConfidence = function(text) {
  const confidentMarkers = ['definitely', 'certainly', 'absolutely', 'clearly', 'obviously'];
  const uncertainMarkers = ['maybe', 'perhaps', 'possibly', 'might', 'could'];
  
  let confidence = 0.7;
  confidentMarkers.forEach(marker => {
    if (text.toLowerCase().includes(marker)) confidence += 0.1;
  });
  uncertainMarkers.forEach(marker => {
    if (text.toLowerCase().includes(marker)) confidence -= 0.1;
  });
  
  return Math.max(0.1, Math.min(0.9, confidence)); // Apply 0.1 buffer
};

NJSONBooleanProcessor.prototype.getErrorResponse = function(error) {
  return {
    text: "Processing error encountered. Boolean framework safety protocols engaged.",
    error: true,
    heatShieldActive: true
  };
};

// Global initialization for JavaScriptCore
// Make the function constructor available globally
if (typeof this.NJSONBooleanProcessor === 'undefined') {
  this.NJSONBooleanProcessor = NJSONBooleanProcessor;
}

console.log('🔍 NJSON JavaScript engine loaded with function-based constructor'); 