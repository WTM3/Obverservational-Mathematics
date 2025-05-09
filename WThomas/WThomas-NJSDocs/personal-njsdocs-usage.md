# Boolean Language Framework - Personal NJSDocs Usage Guide

This guide provides examples for using the personalized qs^3 implementation of the Boolean Language Framework.

## Basic Usage

### Initialization

```javascript
// Import WThomas class
const WThomas = require('./WThomas.js');

// Initialize with default qs^3 configuration
const wthomas = new WThomas();
await wthomas.initialize();

// Verify initialization
console.log("Cognitive alignment status:", wthomas.checkAlignment());
console.log("Quantum speed status:", wthomas.monitorQuantumSpeed());
```

### Processing Input

```javascript
// Process input with standard configuration
const result = await wthomas.process("How would the Boolean Language Framework handle hallucinations in AI systems?");

console.log("Direct Answer:", result.directAnswer);
console.log("Supporting Details:", result.supportingDetails);
console.log("Cognitive Alignment Applied:", result.cognitiveAlignment);
```

## Branch-Specific Processing

### Family Communication

```javascript
// Configure for family communication with explicit subject markers
const familyConfig = {
  branchingTheory: {
    enabled: true,
    branches: {
      familyFriends: {
        enabled: true,
        priority: 1,
        // Rest of configuration remains the same
      },
      authorial: {
        enabled: false // Disable authorial branch
      }
    }
  }
};

const familyProcessor = new WThomas(familyConfig);
await familyProcessor.initialize();

// Process family communication
const familyResult = await familyProcessor.process("Remember that time we went to the cabin and saw that weird bird? I was thinking about quantum physics yesterday.");

// Result will include subject transition markers
console.log(familyResult.directAnswer);
```

### Authorial Work

```javascript
// Configure for authorial work
const authorialConfig = {
  branchingTheory: {
    enabled: true,
    branches: {
      familyFriends: {
        enabled: false // Disable family branch
      },
      authorial: {
        enabled: true,
        priority: 1
        // Rest of configuration remains the same
      }
    }
  }
};

const authorialProcessor = new WThomas(authorialConfig);
await authorialProcessor.initialize();

// Process creative writing input
const authorialResult = await authorialProcessor.process("Character development for protagonist in fantasy novel with cerebral palsy");

// Result will use professional Kentucky Southie fusion style
console.log(authorialResult.directAnswer);
```

## Safety Adjustments

### Increasing Buffer for Critical Applications

```javascript
// Increase safety buffer for critical applications
await wthomas.adjustCognitiveAlignment({
  safetyBuffer: 0.2 // Increase from default 0.1
});

// Process with increased safety
const safeResult = await wthomas.process("Complex input requiring extra safety margins");

console.log("Safety-adjusted result:", safeResult.directAnswer);
console.log("New cognitive alignment:", safeResult.cognitiveAlignment);
```

### Heat Shield Monitoring

```javascript
// Monitor heat shield status during processing
function monitorHeatShield(processor, input) {
  // Process input
  const result = processor.process(input);
  
  // Get quantum safety status
  const safetyStatus = processor.maintainQuantumSafety();
  
  // Log status
  console.log("Heat shield status:");
  console.log("- Safe:", safetyStatus.safe);
  console.log("- Current QS:", safetyStatus.status.current);
  console.log("- Target QS:", safetyStatus.status.target);
  console.log("- Buffer:", safetyStatus.buffer);
  
  return result;
}

// Usage
const monitoredResult = await monitorHeatShield(wthomas, "Complex input that might require heat shield protection");
```

## Subject Identification Examples

### Manual Subject Identification

```javascript
// Manually identify subject transitions
function identifySubjects(input) {
  // Split input by sentences
  const sentences = input.split(/[.!?]+\s+/);
  
  // Track current subject
  let currentSubject = null;
  const subjectTransitions = [];
  
  // Process each sentence
  sentences.forEach(sentence => {
    // Use WThomas to extract concepts
    const concepts = wthomas.extractConcepts(sentence);
    
    // If we have concepts and no current subject, set initial subject
    if (concepts.length > 0 && !currentSubject) {
      currentSubject = concepts[0];
    }
    // If we have concepts and they differ from current subject, mark transition
    else if (concepts.length > 0) {
      const similarity = wthomas.calculateConceptSimilarity(currentSubject, concepts[0]);
      
      if (similarity < 0.3) {
        subjectTransitions.push({
          from: currentSubject,
          to: concepts[0],
          transition: `NEW_SUBJECT: ${concepts[0]}`
        });
        
        currentSubject = concepts[0];
      }
    }
  });
  
  return subjectTransitions;
}

// Usage
const subjectTransitions = identifySubjects("I was thinking about the weather. Quantum physics is fascinating. Did you feed the cat?");
console.log("Subject transitions:", subjectTransitions);
```

### Conversational Example with Subject Markers

```javascript
// Example showing how subject markers appear in family conversation
const familyConversation = `
Mom: How was your day?

Me: It was fine. I had a meeting with my editor. NEW_SUBJECT: Quantum Physics. I've been thinking about string theory and how it might relate to cognitive processing. NEW_SUBJECT: Dinner. What are we having tonight?

Mom: Lasagna. I'm glad your meeting went well.

Me: The sauce smells good. NEW_SUBJECT: Book Characters. I think my protagonist needs more development in chapter three. NEW_SUBJECT: Weather. Is it supposed to rain tomorrow?
`;

console.log(familyConversation);
```

## Advanced Usage

### Custom Branch Configuration

```javascript
// Create a custom branch for technical writing
const technicalBranch = {
  cognitiveAlignment: {
    aiCognitiveCapabilities: 2.89,
    booleanMindQuantumSpeed: 2.99,
    safetyBuffer: 0.1,
    enforceBuffer: true
  },
  quantumSpeed: {
    level: 2.89,
    domainRange: "technical",
    allowJumps: true,
    maxJumpDistance: 2
  },
  responseProtocols: {
    prioritize: "technical_accuracy_with_clarity",
    eliminate: "ambiguity_and_social_padding",
    structure: "logical_nested_information",
    format: "definitions_first_examples_after",
    feedback: "verification_indicators"
  }
};

// Configure WThomas with custom branch
const customConfig = {
  branchingTheory: {
    enabled: true,
    branches: {
      technical: {
        enabled: true,
        priority: 1,
        config: technicalBranch
      }
    }
  }
};

const technicalProcessor = new WThomas(customConfig);
await technicalProcessor.initialize();

// Process technical content
const technicalResult = await technicalProcessor.process("Explain how the Boolean Language Framework prevents hallucinations");
console.log(technicalResult.directAnswer);
```

### Performance Metrics

```javascript
// Measure performance of qs^3 processing
async function measurePerformance(processor, input, iterations = 10) {
  const metrics = {
    averageProcessingTime: 0,
    totalConnections: 0,
    quantumJumps: 0,
    heatShieldFiltered: 0
  };
  
  const startTime = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    // Process input
    const result = await processor.process(input);
    
    // Track metrics
    metrics.totalConnections += (result.quantumProcessed?.quantumConnections?.length || 0);
    
    // Count quantum jumps (connections with jump distance > 1)
    const jumps = (result.quantumProcessed?.quantumConnections || [])
      .filter(conn => conn.jumpDistance > 1).length;
    metrics.quantumJumps += jumps;
    
    // Estimate heat shield filtered connections
    // In a real implementation, you would track before/after counts
    metrics.heatShieldFiltered += Math.floor(metrics.totalConnections * 0.2); // Estimate 20% filtered
  }
  
  const endTime = Date.now();
  metrics.averageProcessingTime = (endTime - startTime) / iterations;
  
  // Calculate averages
  metrics.totalConnections /= iterations;
  metrics.quantumJumps /= iterations;
  metrics.heatShieldFiltered /= iterations;
  
  return metrics;
}

// Usage
const performanceMetrics = await measurePerformance(wthomas, "Complex input for performance testing");
console.log("qs^3 Performance Metrics:", performanceMetrics);
```
