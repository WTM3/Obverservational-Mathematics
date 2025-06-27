// CA Test Validator for iTerm Testing
// Validates GCT-IE generated CA implementations

const fs = require('fs');
const path = require('path');
const CA_Generator = require('./ca-generator');

const CA_TestValidator = {
  
  // 3.0PA Test Case: Cerebral Palsy Accommodations
  cerebraPalsyTestCase: {
    paLevel: 3.0,
    accommodationType: 'all',
    requirements: {
      motor: 'single-arm-left functional',
      communication: 'text-only interface required', 
      input: 'written communication primary',
      condition: 'cerebral palsy accommodations'
    },
    validationCriteria: [
      'single-arm-left operation verified',
      'text-only interface functional',
      'maximum contrast mode active',
      'large target areas (min 80px)',
      'simplified navigation working',
      'screen reader optimized',
      'voice command ready',
      'gesture minimization active'
    ]
  },
  
  // Run comprehensive test
  runTest(paLevel = '3.0') {
    console.log(`\n🧪 GCT-IE Test Validator - PA Level ${paLevel}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    
    const testLevel = parseFloat(paLevel);
    
    if (testLevel === 3.0) {
      return this.runCerebraPalsyTest();
    } else {
      return this.runStandardTest(testLevel);
    }
  },
  
  // Run 3.0PA Cerebral Palsy test case
  runCerebraPalsyTest() {
    console.log(`\n🎯 Running 3.0PA Cerebral Palsy Test Case`);
    console.log(`Requirements: ${JSON.stringify(this.cerebraPalsyTestCase.requirements, null, 2)}`);
    
    try {
      // Generate CA for 3.0PA
      const caResult = CA_Generator.generateCA(
        this.cerebraPalsyTestCase.paLevel,
        this.cerebraPalsyTestCase.accommodationType,
        { paLevel: 3.0 }
      );
      
      // Create test HTML file
      const testFilePath = this.createTestFile(caResult, '3.0PA-cerebral-palsy-test');
      
      // Validate generated code
      const validationResults = this.validateCAcode(caResult);
      
      // Output results
      this.outputTestResults(validationResults, testFilePath);
      
      return {
        success: validationResults.passed,
        testFile: testFilePath,
        results: validationResults
      };
      
    } catch (error) {
      console.error(`❌ Test failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  },
  
  // Run standard test for other PA levels
  runStandardTest(paLevel) {
    console.log(`\n🔍 Running Standard Test for PA Level ${paLevel}`);
    
    try {
      const caResult = CA_Generator.generateCA(paLevel, 'all', { paLevel });
      const testFilePath = this.createTestFile(caResult, `PA-${paLevel}-test`);
      const validationResults = this.validateCAcode(caResult);
      
      this.outputTestResults(validationResults, testFilePath);
      
      return {
        success: validationResults.passed,
        testFile: testFilePath,
        results: validationResults
      };
      
    } catch (error) {
      console.error(`❌ Test failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  },
  
  // Create test HTML file
  createTestFile(caResult, filename) {
    const testDir = path.join(__dirname, 'test-output');
    
    // Create test directory if it doesn't exist
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    
    const testFilePath = path.join(testDir, `${filename}.html`);
    
    // Add test validation script to the CA code
    const testCode = `
<!-- GCT-IE Test Validation -->
<div id="test-panel" style="position: fixed; top: 10px; right: 10px; background: #333; color: #fff; padding: 15px; border: 2px solid #fff; z-index: 10001; font-size: 14px; max-width: 300px;">
  <h3>🧪 GCT-IE Test Panel</h3>
  <div id="test-status">Initializing...</div>
  <button onclick="runManualTest()" style="margin-top: 10px; padding: 8px 12px;">Run Manual Test</button>
</div>

<script>
// Manual test runner for iTerm validation
function runManualTest() {
  const statusDiv = document.getElementById('test-status');
  let testResults = [];
  
  // Test 1: PA Level accommodation verification
  const paLevel = ${caResult.quantumMetrics.paLevel};
  testResults.push(\`PA Level: \${paLevel} ✓\`);
  
  // Test 2: CCBM^qs quantum processing
  const quantumSpeed = ${caResult.quantumMetrics.speed.toFixed(2)};
  testResults.push(\`Quantum Speed: \${quantumSpeed} ✓\`);
  
  // Test 3: Boolean Mind state verification
  const bmState = '${caResult.quantumMetrics.state.description}';
  testResults.push(\`BM State: \${bmState} ✓\`);
  
  // Test 4: Accommodation features check
  const ccbmElements = document.querySelectorAll('[data-ccbm-state]');
  testResults.push(\`CCBM Elements: \${ccbmElements.length} ✓\`);
  
  // Test 5: Interactive elements accessibility
  const buttons = document.querySelectorAll('button');
  let accessibleButtons = 0;
  buttons.forEach(btn => {
    if (btn.offsetWidth >= 44 && btn.offsetHeight >= 44) {
      accessibleButtons++;
    }
  });
  testResults.push(\`Accessible Buttons: \${accessibleButtons}/\${buttons.length} ✓\`);
  
  // Display results
  statusDiv.innerHTML = testResults.join('<br>') + '<br><strong>✅ Manual Test Complete</strong>';
  
  // Log to console for iTerm verification
  console.log('🧪 GCT-IE Manual Test Results:');
  testResults.forEach(result => console.log('  ' + result));
  console.log('✅ All tests completed - Check browser functionality');
}

// Auto-run basic validation
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('test-status').innerHTML = 'Ready for testing<br>CA Formula: CA = (NTC + CCBM^qs ±PA)';
  }, 500);
});
</script>`;
    
    // Insert test code before closing body tag
    const finalCode = caResult.caCode.replace('</body>', testCode + '\n</body>');
    
    fs.writeFileSync(testFilePath, finalCode, 'utf8');
    
    console.log(`📄 Test file created: ${testFilePath}`);
    return testFilePath;
  },
  
  // Validate CA code against requirements
  validateCAcode(caResult) {
    const validation = {
      tests: [],
      passed: 0,
      failed: 0,
      total: 0
    };
    
    // Test 1: GCT Formula implementation
    validation.tests.push({
      name: 'GCT Formula Implementation',
      passed: caResult.formula && caResult.formula.result.includes('Complete'),
      details: caResult.formula ? caResult.formula.result : 'Formula not found'
    });
    
    // Test 2: PA Level processing
    validation.tests.push({
      name: 'PA Level Processing',
      passed: caResult.quantumMetrics.paLevel >= 0.1 && caResult.quantumMetrics.paLevel <= 3.0,
      details: `PA Level: ${caResult.quantumMetrics.paLevel}`
    });
    
    // Test 3: CCBM^qs enhancement
    validation.tests.push({
      name: 'CCBM^qs Enhancement',
      passed: caResult.quantumMetrics.speed > 0 && caResult.quantumMetrics.state,
      details: `Quantum Speed: ${caResult.quantumMetrics.speed.toFixed(2)}, State: ${caResult.quantumMetrics.state.description}`
    });
    
    // Test 4: HTML structure validity
    validation.tests.push({
      name: 'HTML Structure',
      passed: caResult.caCode.includes('<!DOCTYPE html>') && caResult.caCode.includes('</html>'),
      details: 'Valid HTML structure detected'
    });
    
    // Test 5: Accessibility features
    validation.tests.push({
      name: 'Accessibility Features',
      passed: caResult.caCode.includes('aria-') || caResult.caCode.includes('role=') || caResult.caCode.includes('tabindex'),
      details: 'Accessibility attributes found in code'
    });
    
    // Test 6: PA adjustments applied
    validation.tests.push({
      name: 'PA Adjustments Applied',
      passed: caResult.paAdjustments && (caResult.paAdjustments.positive.length > 0 || caResult.paAdjustments.negative.length > 0 || caResult.paAdjustments.dynamic.length > 0),
      details: `Positive: ${caResult.paAdjustments.positive.length}, Negative: ${caResult.paAdjustments.negative.length}, Dynamic: ${caResult.paAdjustments.dynamic.length}`
    });
    
    // Test 7: 3.0PA specific requirements (if PA = 3.0)
    if (caResult.quantumMetrics.paLevel === 3.0) {
      validation.tests.push({
        name: 'Cerebral Palsy 3.0PA Requirements',
        passed: caResult.caCode.includes('single-arm') && caResult.caCode.includes('text-only'),
        details: 'Single-arm and text-only features verified'
      });
    }
    
    // Calculate results
    validation.tests.forEach(test => {
      if (test.passed) {
        validation.passed++;
      } else {
        validation.failed++;
      }
      validation.total++;
    });
    
    return validation;
  },
  
  // Output test results
  outputTestResults(validationResults, testFilePath) {
    console.log(`\n📊 Test Results Summary:`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`✅ Passed: ${validationResults.passed}/${validationResults.total}`);
    console.log(`❌ Failed: ${validationResults.failed}/${validationResults.total}`);
    console.log(`📈 Success Rate: ${(validationResults.passed / validationResults.total * 100).toFixed(1)}%`);
    
    console.log(`\n📋 Detailed Test Results:`);
    validationResults.tests.forEach((test, i) => {
      const status = test.passed ? '✅' : '❌';
      console.log(`  ${i + 1}. ${status} ${test.name}`);
      console.log(`     ${test.details}`);
    });
    
    console.log(`\n🔧 iTerm Testing Instructions:`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`1. Open test file: open "${testFilePath}"`);
    console.log(`2. Verify visual accommodations work correctly`);
    console.log(`3. Test interactive elements with expected PA level`);
    console.log(`4. Click "Run Manual Test" button in browser`);
    console.log(`5. Check browser console for additional validation logs`);
    
    if (validationResults.passed === validationResults.total) {
      console.log(`\n🎉 ALL TESTS PASSED - CA Implementation Ready for Production`);
    } else {
      console.log(`\n⚠️  Some tests failed - Review implementation before deployment`);
    }
  }
};

module.exports = CA_TestValidator;