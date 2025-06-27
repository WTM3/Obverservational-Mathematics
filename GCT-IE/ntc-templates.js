// NTC (Neurotypical Coder) Template Library
// Base coding patterns for accommodation-aware code generation

const NTC_Templates = {
  
  // Base HTML template patterns
  htmlTemplates: {
    basic: {
      structure: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    {{styles}}
</head>
<body>
    {{content}}
    {{scripts}}
</body>
</html>`,
      
      accommodationStyles: {
        0.1: `<style>
    body { font-size: 16px; line-height: 1.6; }
    button { min-height: 44px; min-width: 44px; }
</style>`,
        
        1.0: `<style>
    body { font-size: 18px; line-height: 1.8; }
    button { min-height: 48px; min-width: 48px; padding: 12px; }
    .focus-outline { outline: 3px solid #0066cc; }
</style>`,
        
        2.0: `<style>
    body { font-size: 20px; line-height: 2.0; }
    button { min-height: 60px; min-width: 60px; padding: 16px; }
    .high-contrast { background: #ffffff; color: #000000; }
    .focus-outline { outline: 4px solid #ff6600; }
</style>`,
        
        3.0: `<style>
    body { 
        font-size: 24px; 
        line-height: 2.2; 
        background: #000000; 
        color: #ffffff; 
    }
    button { 
        min-height: 80px; 
        min-width: 120px; 
        padding: 20px; 
        font-size: 20px;
        border: 3px solid #ffffff;
        background: #333333;
        color: #ffffff;
    }
    .single-arm-left { 
        position: fixed; 
        left: 20px; 
        top: 50%; 
        transform: translateY(-50%); 
    }
    .text-only { display: block; margin: 10px 0; }
</style>`
      }
    }
  },
  
  // JavaScript interaction patterns
  jsTemplates: {
    basicInteraction: {
      0.1: `// Basic interaction with standard events
function setupBasicInteraction() {
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', handleClick);
    });
}`,
      
      1.0: `// Enhanced interaction with keyboard support
function setupEnhancedInteraction() {
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', handleClick);
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(e);
            }
        });
        btn.setAttribute('tabindex', '0');
    });
}`,
      
      2.0: `// Advanced interaction with multiple input methods
function setupAdvancedInteraction() {
    document.querySelectorAll('button').forEach(btn => {
        // Click and keyboard
        btn.addEventListener('click', handleClick);
        btn.addEventListener('keydown', handleKeyInteraction);
        
        // Long press for confirmation
        let pressTimer;
        btn.addEventListener('mousedown', () => {
            pressTimer = setTimeout(() => {
                btn.classList.add('confirmed');
                handleClick({ target: btn, confirmed: true });
            }, 1000);
        });
        
        btn.addEventListener('mouseup', () => {
            clearTimeout(pressTimer);
        });
        
        btn.setAttribute('aria-label', btn.textContent);
        btn.setAttribute('tabindex', '0');
    });
}`,
      
      3.0: `// Maximum accommodation interaction
function setupMaxAccommodationInteraction() {
    // Single-arm-left interface
    const leftPanel = document.createElement('div');
    leftPanel.className = 'single-arm-left';
    leftPanel.innerHTML = \`
        <div class="text-only">
            <h2>Commands:</h2>
            <button onclick="handleCommand('next')">NEXT</button>
            <button onclick="handleCommand('select')">SELECT</button>
            <button onclick="handleCommand('back')">BACK</button>
            <button onclick="handleCommand('help')">HELP</button>
        </div>
    \`;
    document.body.appendChild(leftPanel);
    
    // Text-only feedback
    const feedback = document.createElement('div');
    feedback.id = 'text-feedback';
    feedback.className = 'text-only';
    feedback.style.cssText = 'position: fixed; top: 20px; right: 20px; width: 300px; background: #333; color: #fff; padding: 20px; border: 2px solid #fff;';
    document.body.appendChild(feedback);
    
    // Command processor for cerebral palsy accommodations  
    window.handleCommand = function(cmd) {
        const feedback = document.getElementById('text-feedback');
        switch(cmd) {
            case 'next':
                feedback.innerHTML = 'Moving to next item...';
                break;
            case 'select':
                feedback.innerHTML = 'Item selected. Processing...';
                break;
            case 'back':
                feedback.innerHTML = 'Going back...';
                break;
            case 'help':
                feedback.innerHTML = 'Commands: NEXT (navigate), SELECT (choose), BACK (return), HELP (this message)';
                break;
        }
    };
}`
    }
  },
  
  // Form templates with accommodations
  formTemplates: {
    basic: {
      0.1: `<form class="accommodation-form">
    <label for="input1">Field 1:</label>
    <input type="text" id="input1" name="input1">
    <button type="submit">Submit</button>
</form>`,
      
      1.0: `<form class="accommodation-form">
    <fieldset>
        <legend>Form Information</legend>
        <div class="form-group">
            <label for="input1">Field 1 (Required):</label>
            <input type="text" id="input1" name="input1" required aria-describedby="input1-help">
            <small id="input1-help">Enter your information here</small>
        </div>
        <button type="submit" class="primary-button">Submit Form</button>
    </fieldset>
</form>`,
      
      2.0: `<form class="accommodation-form high-contrast">
    <div class="form-progress">Step 1 of 1</div>
    <fieldset>
        <legend>Complete This Form</legend>
        <div class="form-group">
            <label for="input1" class="large-label">
                <strong>Field 1 (Required)</strong>
                <span class="help-text">Please enter your information</span>
            </label>
            <input type="text" id="input1" name="input1" required 
                   class="large-input" aria-describedby="input1-error">
            <div id="input1-error" class="error-message" role="alert"></div>
        </div>
        <div class="button-group">
            <button type="submit" class="primary-button large-button">
                ✓ Submit Form
            </button>
            <button type="reset" class="secondary-button large-button">
                ↺ Clear Form
            </button>
        </div>
    </fieldset>
</form>`,
      
      3.0: `<div class="cerebral-palsy-form">
    <div class="text-only">
        <h1>FORM ENTRY MODE</h1>
        <p>Use left panel commands to navigate</p>
    </div>
    
    <form class="accommodation-form max-accommodation">
        <div class="form-field active" data-field="0">
            <h2 class="text-only">FIELD 1</h2>
            <label for="cp-input1" class="text-only">Enter Information:</label>
            <input type="text" id="cp-input1" name="input1" 
                   class="max-accommodation-input"
                   placeholder="Type here or use voice input">
            <div class="text-only">Status: Ready for input</div>
        </div>
        
        <div class="form-controls text-only">
            <button type="button" onclick="formNext()" class="max-button">NEXT FIELD</button>
            <button type="button" onclick="formSubmit()" class="max-button">SUBMIT FORM</button>
            <button type="button" onclick="formClear()" class="max-button">CLEAR FIELD</button>
        </div>
    </form>
</div>

<script>
let currentField = 0;
const fields = document.querySelectorAll('.form-field');

function formNext() {
    if (currentField < fields.length - 1) {
        fields[currentField].classList.remove('active');
        currentField++;
        fields[currentField].classList.add('active');
        document.getElementById('text-feedback').innerHTML = 'Moved to field ' + (currentField + 1);
    }
}

function formSubmit() {
    document.getElementById('text-feedback').innerHTML = 'Form submitted successfully!';
}

function formClear() {
    fields[currentField].querySelector('input').value = '';
    document.getElementById('text-feedback').innerHTML = 'Field cleared';
}
</script>`
    }
  },
  
  // Generate complete template based on PA level
  generateTemplate(paLevel, type = 'all') {
    const level = this.findClosestLevel(paLevel);
    const styles = this.htmlTemplates.basic.accommodationStyles[level];
    const jsCode = this.jsTemplates.basicInteraction[level];
    const formCode = this.formTemplates.basic[level];
    
    const template = this.htmlTemplates.basic.structure
      .replace('{{title}}', `GCT-IE Generated Template (PA: ${paLevel})`)
      .replace('{{styles}}', styles)
      .replace('{{content}}', `
    <main class="main-content">
        <h1>GCT Implementation Engine</h1>
        <p>PA Level: ${paLevel} | Accommodation Type: ${type}</p>
        
        <section class="accommodation-demo">
            <h2>Generated Accommodation Code</h2>
            ${formCode}
        </section>
        
        <section class="test-validation">
            <h2>Test This Implementation</h2>
            <div class="text-only">
                <p>To test: Save as .html file and open in browser</p>
                <p>Verify: All accommodations function correctly</p>
            </div>
        </section>
    </main>
      `)
      .replace('{{scripts}}', `<script>\n${jsCode}\n\n// Initialize on load\ndocument.addEventListener('DOMContentLoaded', function() {\n    if (typeof setupMaxAccommodationInteraction === 'function') {\n        setupMaxAccommodationInteraction();\n    } else if (typeof setupAdvancedInteraction === 'function') {\n        setupAdvancedInteraction();\n    } else if (typeof setupEnhancedInteraction === 'function') {\n        setupEnhancedInteraction();\n    } else {\n        setupBasicInteraction();\n    }\n});\n</script>`);
    
    return template;
  },
  
  // Find closest defined PA level
  findClosestLevel(paLevel) {
    const levels = [0.1, 1.0, 2.0, 3.0];
    return levels.reduce((prev, curr) => 
      Math.abs(curr - paLevel) < Math.abs(prev - paLevel) ? curr : prev
    );
  }
};

module.exports = NTC_Templates;