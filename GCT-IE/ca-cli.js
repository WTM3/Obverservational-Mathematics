#!/usr/bin/env node

const GCT_IE = {
  // Core GCT Formula: CA = (NTC + CCBM^qs ±PA)
  
  // PA (Physical Accommodations) range: 0.1 to 3.0
  PA_LEVELS: {
    MIN: 0.1,
    MAX: 3.0,
    DEFAULT: 1.0
  },
  
  // PA Parser - Validates and normalizes PA input
  parsePALevel(input) {
    const paLevel = parseFloat(input);
    if (isNaN(paLevel) || paLevel < this.PA_LEVELS.MIN || paLevel > this.PA_LEVELS.MAX) {
      throw new Error(`PA level must be between ${this.PA_LEVELS.MIN} and ${this.PA_LEVELS.MAX}`);
    }
    return paLevel;
  },
  
  // Accommodation Types mapping
  accommodationTypes: {
    motor: {
      levels: {
        0.1: { description: "Minor motor assistance", features: ["enlarged click targets"] },
        1.0: { description: "Moderate motor assistance", features: ["keyboard shortcuts", "reduced precision requirements"] },
        2.0: { description: "Significant motor assistance", features: ["voice commands", "gesture simplification"] },
        3.0: { description: "Maximum motor assistance", features: ["single-arm-left operation", "minimal movement interface"] }
      }
    },
    communication: {
      levels: {
        0.1: { description: "Basic communication support", features: ["clear labeling"] },
        1.0: { description: "Enhanced communication support", features: ["multiple input methods"] },
        2.0: { description: "Advanced communication support", features: ["AAC device integration"] },
        3.0: { description: "Complete communication support", features: ["text-only interface", "screen reader optimized"] }
      }
    },
    cognitive: {
      levels: {
        0.1: { description: "Minor cognitive assistance", features: ["simplified navigation"] },
        1.0: { description: "Moderate cognitive assistance", features: ["clear workflows", "reduced complexity"] },
        2.0: { description: "Significant cognitive assistance", features: ["guided processes", "visual aids"] },
        3.0: { description: "Maximum cognitive assistance", features: ["step-by-step guidance", "error prevention"] }
      }
    }
  },
  
  // Get accommodation features for a given PA level
  getAccommodationFeatures(paLevel, type = 'all') {
    const features = [];
    const level = this.findClosestLevel(paLevel);
    
    if (type === 'all' || type === 'motor') {
      features.push(...this.accommodationTypes.motor.levels[level].features);
    }
    if (type === 'all' || type === 'communication') {
      features.push(...this.accommodationTypes.communication.levels[level].features);
    }
    if (type === 'all' || type === 'cognitive') {
      features.push(...this.accommodationTypes.cognitive.levels[level].features);
    }
    
    return features;
  },
  
  // Find closest defined PA level
  findClosestLevel(paLevel) {
    const levels = [0.1, 1.0, 2.0, 3.0];
    return levels.reduce((prev, curr) => 
      Math.abs(curr - paLevel) < Math.abs(prev - paLevel) ? curr : prev
    );
  },
  
  // Main CLI interface
  processCommand(args) {
    const command = args[2];
    const paLevelArg = args[3];
    const typeArg = args[4] || 'all';
    
    if (!command || command === 'help') {
      this.showHelp();
      return;
    }
    
    if (command === 'generate') {
      if (!paLevelArg) {
        console.error('Error: PA level required for generate command');
        this.showHelp();
        process.exit(1);
      }
      
      try {
        const paLevel = this.parsePALevel(paLevelArg);
        const features = this.getAccommodationFeatures(paLevel, typeArg);
        
        console.log(`\n🎯 GCT Implementation Engine - CA Generator`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`Formula: CA = (NTC + CCBM^qs ±PA)`);
        console.log(`PA Level: ${paLevel} | Type: ${typeArg}`);
        console.log(`\nAccommodation Features:`);
        features.forEach(feature => console.log(`  • ${feature}`));
        console.log(`\n💡 Use 'ca-cli template ${paLevel}' to generate code`);
        
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      }
    }
    
    if (command === 'template') {
      if (!paLevelArg) {
        console.error('Error: PA level required for template command');
        this.showHelp();
        process.exit(1);
      }
      
      try {
        const paLevel = this.parsePALevel(paLevelArg);
        const caGenerator = require('./ca-generator');
        const caResult = caGenerator.generateCA(paLevel, typeArg, { paLevel });
        
        console.log('\n📄 Generated CA Template:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(caResult.caCode);
        console.log('\n📊 CA Metadata:');
        console.log(JSON.stringify(caResult.metadata, null, 2));
        console.log('\n📋 Deployment Instructions:');
        console.log(caResult.deploymentInstructions);
        
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      }
    }
    
    if (command === 'test') {
      const testPALevel = paLevelArg || '3.0';
      console.log(`\n🧪 Running test for PA level ${testPALevel}...`);
      require('./ca-test-validator').runTest(testPALevel);
    }
  },
  
  showHelp() {
    console.log(`
GCT Implementation Engine - Coding Agent (CA) CLI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Formula: CA = (NTC + CCBM^qs ±PA)

Usage:
  ca-cli <command> [options]

Commands:
  generate <PA-level> [type]   Generate accommodation features
  template <PA-level> [type]   Generate code template
  test [PA-level]              Run validation test
  help                         Show this help

PA Levels: 0.1 (minimal) to 3.0 (maximum)
Types: motor, communication, cognitive, all (default)

Examples:
  ca-cli generate 3.0          # Max accommodations, all types
  ca-cli generate 1.5 motor    # Moderate motor accommodations
  ca-cli template 3.0          # Generate 3.0PA code template
  ca-cli test 3.0              # Test cerebral palsy case
`);
  }
};

// Execute CLI
GCT_IE.processCommand(process.argv);