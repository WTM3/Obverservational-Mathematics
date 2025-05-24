// NJSON Boolean Logic Processor
// Implements the core Boolean Language Framework text processing

const BLFProcessor = require('./blf-processor.js');

class NJSONBooleanProcessor extends BLFProcessor {
  constructor(config) {
    super(config);
    this.heatShield = null;
    this.responseCache = new Map();
  }

  async initialize() {
    const baseInit = await super.initialize();
    if (!baseInit) return false;

    // Initialize heat shield
    this.heatShield = {
      active: this.config.cognitiveProtocol.safety.heatShield,
      buffer: this.config.cognitiveProtocol.alignment.buffer,
      llsdtRate: this.config.cognitiveProtocol.safety.llsdtRate,
      violations: 0
    };

    return true;
  }

  // Main NJSON processing method
  async process(input, bmId = null) {
    if (!this.initialized) {
      await this.initialize();
    }

    const startTime = Date.now();

    try {
      // 1. Apply heat shield filtering
      const filteredInput = this.applyHeatShield(input);
      
      // 2. Convert to Boolean logic structure
      const booleanStructure = this.convertToBooleanLogic(filteredInput);
      
      // 3. Process through cognitive alignment
      const cognitiveResult = this.applyCognitiveAlignment(booleanStructure, bmId);
      
      // 4. Apply response protocols
      const finalResult = this.applyResponseProtocols(cognitiveResult);
      
      // 5. Validate quantum state
      const quantumValidated = this.validateQuantumState(finalResult);

      return {
        result: quantumValidated,
        timestamp: Date.now(),
        processingTime: Date.now() - startTime,
        cognitiveAlignment: this.validateCognitiveAlignmentSafe(),
        quantumState: this.quantumState.pure && !this.quantumState.fog,
        heatShieldActive: this.heatShield.active
      };

    } catch (error) {
      console.error('NJSON processing error:', error);
      return {
        result: this.getErrorResponse(error),
        timestamp: Date.now(),
        processingTime: Date.now() - startTime,
        error: error.message
      };
    }
  }

  // Heat shield: Filters out low-confidence connections
  applyHeatShield(input) {
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
  }

  // Convert text to Boolean logic structure
  convertToBooleanLogic(text) {
    // Identify Boolean statements and conditions
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
  }

  // Apply cognitive alignment using AIc + 0.1 = BMqs formula
  applyCognitiveAlignment(booleanStructure, bmId) {
    const aiC = this.config.cognitiveProtocol.alignment.aiCognitive;
    const buffer = this.config.cognitiveProtocol.alignment.buffer;
    const bmQs = this.config.cognitiveProtocol.alignment.booleanMindQs;

    // Validate alignment
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
  }

  // Apply response protocols
  applyResponseProtocols(cognitiveResult) {
    const protocols = this.config.responseProtocols;
    let response = cognitiveResult.processedText;

    // Apply "clarity_over_comprehensiveness"
    if (protocols.prioritize === 'clarity_over_comprehensiveness') {
      response = this.prioritizeClarity(response);
    }

    // Apply "eliminate unnecessary_social_padding"
    if (protocols.eliminate === 'unnecessary_social_padding') {
      response = this.eliminateSocialPadding(response);
    }

    // Apply "direct_answers_first_details_after"
    if (protocols.format === 'direct_answers_first_details_after') {
      response = this.formatDirectAnswersFirst(response);
    }

    return response;
  }

  // Quantum state validation
  validateQuantumState(result) {
    if (!this.quantumState.pure || this.quantumState.fog) {
      console.warn('Quantum state compromised - applying correction');
      this.quantumState.pure = true;
      this.quantumState.fog = false;
    }

    if (this.quantumState.breathing && this.quantumState.jumps.active) {
      return this.applyQuantumEnhancement(result);
    }

    return result;
  }

  // Helper methods for Boolean logic processing
  isQuestion(text) {
    return text.includes('?') || /^(what|how|why|when|where|who|which|is|are|do|does|can|could|will|would)\b/i.test(text);
  }

  isDirective(text) {
    return /^(please|could you|can you|would you|help|show|explain|describe|provide|give|tell)\b/i.test(text);
  }

  isConditional(text) {
    return /\b(if|when|unless|provided|assuming|given)\b/i.test(text);
  }

  getQuestionType(text) {
    if (/^(is|are|do|does|can|could|will|would)\b/i.test(text)) return 'boolean';
    if (/^what\b/i.test(text)) return 'definition';
    if (/^how\b/i.test(text)) return 'process';
    if (/^why\b/i.test(text)) return 'explanation';
    return 'general';
  }

  expectsBooleanAnswer(text) {
    return /^(is|are|do|does|can|could|will|would)\b/i.test(text);
  }

  processQuestion(question, aiC) {
    if (question.expectsBoolean) {
      // For Boolean questions, provide direct yes/no with brief explanation
      return 'Yes. [Direct Boolean response based on available information]';
    }
    
    switch (question.type) {
      case 'definition':
        return '[Definition provided with core concepts first]';
      case 'process':
        return '[Step-by-step process with key actions highlighted]';
      case 'explanation':
        return '[Direct explanation focusing on primary causes]';
      default:
        return '[Direct response to question with main point first]';
    }
  }

  processDirective(directive, aiC) {
    return '[Directive acknowledged. Primary action items identified and prioritized]';
  }

  processCondition(condition, aiC) {
    return '[Conditional statement processed. Boolean logic applied to condition-consequence relationship]';
  }

  processStatement(statement, aiC) {
    return '[Statement processed. Core assertion extracted and validated]';
  }

  // Response protocol helpers
  prioritizeClarity(text) {
    // Keep sentences short and direct
    return text.split(/[.!]/).map(sentence => {
      const trimmed = sentence.trim();
      if (trimmed.length > 100) {
        // Split long sentences at logical break points
        return trimmed.substring(0, 100) + '...';
      }
      return trimmed;
    }).filter(s => s).join('. ');
  }

  eliminateSocialPadding(text) {
    const paddingPhrases = [
      'I hope this helps',
      'Does that make sense',
      'Let me know if you have questions',
      'I think',
      'In my opinion',
      'You might want to consider'
    ];

    let cleaned = text;
    paddingPhrases.forEach(phrase => {
      cleaned = cleaned.replace(new RegExp(phrase, 'gi'), '');
    });

    return cleaned.replace(/\s+/g, ' ').trim();
  }

  formatDirectAnswersFirst(text) {
    // Ensure the most direct answer comes first
    if (text.includes('[') && text.includes(']')) {
      // Already formatted for direct response
      return text;
    }
    
    // Add direct answer indicator
    return `[Direct response] ${text}`;
  }

  applyQuantumEnhancement(result) {
    if (this.quantumState.jumps.power === 'v8_to_charger') {
      // Apply v8_to_charger enhancement for maximum directness
      return result.replace(/\[([^\]]+)\]/g, '$1');
    }
    return result;
  }

  // Calculation helpers
  calculateComplexity(text) {
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    return Math.min(1.0, (words / sentences) / 20); // Normalized complexity
  }

  calculateDirectness(text) {
    const directWords = ['yes', 'no', 'true', 'false', 'is', 'are', 'will', 'must'];
    const words = text.toLowerCase().split(/\s+/);
    const directCount = words.filter(word => directWords.includes(word)).length;
    return Math.min(1.0, directCount / words.length * 10);
  }

  calculateBooleanDensity(text) {
    const booleanWords = ['and', 'or', 'not', 'if', 'then', 'else', 'true', 'false'];
    const words = text.toLowerCase().split(/\s+/);
    const booleanCount = words.filter(word => booleanWords.includes(word)).length;
    return Math.min(1.0, booleanCount / words.length * 5);
  }

  extractAction(text) {
    const actionWords = text.match(/\b(show|explain|provide|give|tell|help|describe)\b/gi);
    return actionWords ? actionWords[0] : 'process';
  }

  calculatePriority(text) {
    if (/\b(urgent|important|critical|asap)\b/i.test(text)) return 'high';
    if (/\b(please|could|would)\b/i.test(text)) return 'medium';
    return 'normal';
  }

  extractCondition(text) {
    const conditionMatch = text.match(/\b(if|when|unless|provided|assuming)\s+(.+?)(?:\s+then|\s*,|\s*$)/i);
    return conditionMatch ? conditionMatch[2] : text;
  }

  extractConsequence(text) {
    const consequenceMatch = text.match(/\b(then|,)\s+(.+)$/i);
    return consequenceMatch ? consequenceMatch[2] : 'action required';
  }

  extractAssertion(text) {
    // Extract the main claim or assertion
    return text.split(/\s+(because|since|due to|as)\s+/i)[0];
  }

  calculateConfidence(text) {
    const lowConfidence = ['maybe', 'perhaps', 'possibly', 'might', 'could'];
    const highConfidence = ['definitely', 'certainly', 'absolutely', 'clearly'];
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 0.5; // neutral baseline

    words.forEach(word => {
      if (lowConfidence.includes(word)) score -= 0.2;
      if (highConfidence.includes(word)) score += 0.2;
    });

    return Math.max(0, Math.min(1, score));
  }

  getErrorResponse(error) {
    return `Processing error. Core systems maintaining cognitive alignment (AIc + 0.1 = BMqs). ${error.message}`;
  }
}

module.exports = NJSONBooleanProcessor;