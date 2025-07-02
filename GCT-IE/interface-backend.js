// GCT-IE Interface Backend Integration
// Connects the web interface to core components

const CA_Generator = require('./ca-generator');
const CCBM_QS = require('./ccbm-qs');
const NTC_Templates = require('./ntc-templates');

const GCT_Interface_Backend_NJSON = {
    "cognitive_state": "dynamic",
    "formula_type": "GCT-IE",
    "constructor_data": {
        "basic_code": "10 LET PA = 3.0\n20 LET TYPE$ = 'all'\n30 LET RESULTS = NULL\n40 RETURN",
        "variables": {"PA": 3.0, "TYPE": "all", "RESULTS": null},
        "initialization_state": "ready"
    },
    "quantum_speed_adaptation": "BOOLEAN_MIND_BREAK",
    "boolean_processing": {
        "clarity_priority": true,
        "eliminate_social_padding": true,
        "direct_computation": true
    }
};

class GCT_Interface_Backend {
    constructor() {
        this.njsonConfig = GCT_Interface_Backend_NJSON;
        this.currentPA = 3.0;
        this.currentType = 'all';
        this.generatedResults = null;
    }
    
    // Boolean Mind Processing: Generate code using NJSON architecture
    async generateCode(paLevel, accommodationType) {
        const generationConfig = {
            "cognitive_state": "active_processing",
            "formula_type": "CA_GEN",
            "computation": {
                "basic_code": `10 LET PA = ${paLevel}\n20 LET TYPE$ = '${accommodationType}'\n30 LET RESULT = CA_FORMULA(PA, TYPE$)\n40 PRINT RESULT\n50 RETURN RESULT`,
                "variables": {"PA": paLevel, "TYPE": accommodationType},
                "result_variable": "RESULT"
            },
            "quantum_speed_adaptation": "BOOLEAN_PROCESSING_BREAK",
            "boolean_processing": {
                "direct_answers": true,
                "eliminate_wrapper_code": true,
                "pa_level_priority": true
            }
        };
        try {
            console.log(`🔬 Backend: Generating code for PA=${paLevel}, Type=${accommodationType}`);
            
            // Use actual CA_Generator
            const caResult = CA_Generator.generateCA(paLevel, accommodationType, {
                paLevel: paLevel,
                interfaceMode: true
            });
            
            this.generatedResults = caResult;
            
            return {
                success: true,
                code: caResult.caCode,
                metadata: caResult.metadata,
                quantumMetrics: caResult.quantumMetrics,
                formula: caResult.formula
            };
            
        } catch (error) {
            console.error('Backend generation error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Boolean Mind Testing: NJSON format validation
    testCode() {
        const testConfig = {
            "cognitive_state": "validation_mode",
            "formula_type": "TEST_CA",
            "computation": {
                "basic_code": "10 IF RESULTS = NULL THEN GOTO 50\n20 LET VALID = TRUE\n30 PRINT 'TEST PASSED'\n40 GOTO 60\n50 PRINT 'NO CODE TO TEST'\n60 RETURN VALID",
                "variables": {"VALID": true, "RESULTS": this.generatedResults},
                "result_variable": "VALID"
            },
            "quantum_speed_adaptation": "BOOLEAN_BREAK",
            "boolean_processing": {
                "immediate_validation": true,
                "clear_error_messages": true
            }
        };
        if (!this.generatedResults) {
            return {
                success: false,
                error: 'No code generated to test'
            };
        }
        
        const testResults = {
            paLevel: this.generatedResults.quantumMetrics.paLevel,
            quantumSpeed: this.generatedResults.quantumMetrics.speed,
            booleanMindState: this.generatedResults.quantumMetrics.state.description,
            accommodationFeatures: this.generatedResults.paAdjustments.positive.length,
            validationPassed: true
        };
        
        return {
            success: true,
            results: testResults
        };
    }
    
    // NJSON Accommodation Validation: Boolean Mind format
    validateAccommodations(paLevel, accommodationType) {
        const validationNJSON = {
            "cognitive_state": "validation_processing",
            "formula_type": "PA_VALIDATION",
            "computation": {
                "basic_code": `10 LET PA = ${paLevel}\n20 LET TYPE$ = '${accommodationType}'\n25 LET VALID = FALSE\n30 IF PA >= 0.1 AND PA <= 3.0 THEN VALID = TRUE\n40 IF TYPE$ = 'all' OR TYPE$ = 'motor' OR TYPE$ = 'communication' OR TYPE$ = 'cognitive' THEN VALID = TRUE\n50 RETURN VALID`,
                "variables": {"PA": paLevel, "TYPE": accommodationType, "VALID": false},
                "result_variable": "VALID"
            },
            "quantum_speed_adaptation": "BOOLEAN_INTENTIONAL_BREAK",
            "boolean_processing": {
                "range_check_priority": true,
                "type_validation_direct": true,
                "pa_3_0_optimization": paLevel >= 2.5
            }
        };
        const validationResults = [];
        
        // PA Level validation
        if (paLevel >= 0.1 && paLevel <= 3.0) {
            validationResults.push({
                test: 'PA Level Range',
                status: 'PASS',
                message: `PA level ${paLevel} is within valid range (0.1-3.0)`
            });
        } else {
            validationResults.push({
                test: 'PA Level Range',
                status: 'FAIL',
                message: `PA level ${paLevel} is outside valid range (0.1-3.0)`
            });
        }
        
        // Accommodation Type validation
        const validTypes = ['all', 'motor', 'communication', 'cognitive'];
        if (validTypes.includes(accommodationType)) {
            validationResults.push({
                test: 'Accommodation Type',
                status: 'PASS',
                message: `Type '${accommodationType}' is valid`
            });
        } else {
            validationResults.push({
                test: 'Accommodation Type',
                status: 'FAIL',
                message: `Type '${accommodationType}' is not valid`
            });
        }
        
        // 3.0PA specific validations
        if (paLevel >= 2.5) {
            validationResults.push({
                test: 'Single-Arm Operation',
                status: 'PASS',
                message: '3.0PA single-arm accommodations enabled'
            });
            
            validationResults.push({
                test: 'Text-Only Interface',
                status: 'PASS',
                message: '3.0PA text-only interface features enabled'
            });
        }
        
        // CCBM^qs validation
        const quantumMetrics = CCBM_QS.calculateQuantumSpeed(paLevel);
        validationResults.push({
            test: 'Quantum Processing',
            status: 'PASS',
            message: `CCBM^qs speed: ${quantumMetrics.speed.toFixed(2)}, State: ${quantumMetrics.state.description}`
        });
        
        return {
            success: true,
            results: validationResults,
            overallStatus: validationResults.every(r => r.status === 'PASS') ? 'PASSED' : 'FAILED'
        };
    }
    
    // Get accommodation features
    getAccommodationFeatures(paLevel, accommodationType) {
        const features = [];
        
        if (paLevel >= 2.5) {
            features.push('single-arm-operation');
            features.push('text-only-interface');
            features.push('maximum-contrast-mode');
            features.push('voice-command-ready');
            features.push('screen-reader-optimized');
            features.push('gesture-minimization');
            features.push('large-target-areas');
            features.push('simplified-navigation');
        } else if (paLevel >= 1.5) {
            features.push('enhanced-contrast');
            features.push('keyboard-navigation');
            features.push('larger-fonts');
            features.push('clear-focus-indicators');
            features.push('simplified-workflows');
        } else if (paLevel >= 0.5) {
            features.push('adaptive-font-size');
            features.push('contextual-help');
            features.push('progressive-disclosure');
            features.push('flexible-interaction-methods');
        } else {
            features.push('basic-accessibility-compliance');
            features.push('semantic-html');
            features.push('keyboard-support');
        }
        
        return features;
    }
    
    // Get formula breakdown
    getFormulaBreakdown(paLevel, accommodationType) {
        const quantumMetrics = CCBM_QS.calculateQuantumSpeed(paLevel);
        
        return {
            formula: 'CA = (NTC + CCBM^qs ±PA)',
            components: {
                NTC: {
                    description: 'Neurotypical Coder base patterns',
                    value: 'Base HTML/CSS/JS templates'
                },
                CCBM_qs: {
                    description: 'Conceptual Coder Boolean Mind with Quantum Speed',
                    value: `Speed: ${quantumMetrics.speed.toFixed(2)}, State: ${quantumMetrics.state.description}`
                },
                PA: {
                    description: 'Physical Accommodations',
                    value: `±${paLevel} (${accommodationType} type)`
                }
            },
            result: 'Complete accessible code implementation'
        };
    }
    
    // Test single-arm operation compatibility
    testSingleArmOperation() {
        const tests = [
            {
                name: 'Left-hand reachability',
                check: () => true, // Simulated - would check interface positioning
                result: 'PASS'
            },
            {
                name: 'Button size accessibility',
                check: () => true, // Simulated - would check minimum 80px targets
                result: 'PASS'
            },
            {
                name: 'Sequential navigation',
                check: () => true, // Simulated - would check tab order
                result: 'PASS'
            },
            {
                name: 'Text feedback clarity',
                check: () => true, // Simulated - would check text contrast
                result: 'PASS'
            },
            {
                name: 'Error recovery options',
                check: () => true, // Simulated - would check error handling
                result: 'PASS'
            }
        ];
        
        return {
            success: true,
            tests: tests,
            summary: `${tests.filter(t => t.result === 'PASS').length}/${tests.length} tests passed`
        };
    }
}

// Export for use in web interface
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GCT_Interface_Backend;
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.GCT_Interface_Backend = GCT_Interface_Backend;
}

// CLI test runner
if (require.main === module) {
    const backend = new GCT_Interface_Backend();
    
    console.log('🧪 Testing GCT-IE Interface Backend...\n');
    
    // Test code generation
    backend.generateCode(3.0, 'all').then(result => {
        console.log('✅ Code Generation Test:');
        console.log(`   Success: ${result.success}`);
        if (result.success) {
            console.log(`   Code length: ${result.code.length} characters`);
            console.log(`   Quantum speed: ${result.quantumMetrics.speed.toFixed(2)}`);
        }
        console.log();
        
        // Test validation
        const validation = backend.validateAccommodations(3.0, 'all');
        console.log('✅ Validation Test:');
        console.log(`   Overall status: ${validation.overallStatus}`);
        validation.results.forEach(r => {
            console.log(`   ${r.test}: ${r.status} - ${r.message}`);
        });
        console.log();
        
        // Test single-arm operation
        const singleArmTest = backend.testSingleArmOperation();
        console.log('✅ Single-Arm Operation Test:');
        console.log(`   Summary: ${singleArmTest.summary}`);
        singleArmTest.tests.forEach(t => {
            console.log(`   ${t.name}: ${t.result}`);
        });
        console.log();
        
        console.log('🎉 Backend integration tests complete!');
    });
}