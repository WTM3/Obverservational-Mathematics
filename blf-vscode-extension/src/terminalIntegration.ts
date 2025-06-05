import * as vscode from 'vscode';
import * as path from 'path';
import { BLFEngine } from './blfEngine';

export class TerminalIntegration {
    private blfEngine: BLFEngine;
    private terminal: vscode.Terminal | undefined;
    private outputChannel: vscode.OutputChannel;

    constructor(blfEngine: BLFEngine) {
        this.blfEngine = blfEngine;
        this.outputChannel = vscode.window.createOutputChannel('BLF Terminal');
    }

    /**
     * Create BLF CLI commands script with quantum enhancements
     */
    public async createCLIScript(): Promise<void> {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found for BLF CLI setup');
            return;
        }

        const scriptPath = path.join(workspaceFolder.uri.fsPath, 'blf-cli.js');
        
        const cliScript = `#!/usr/bin/env node
/**
 * BLF NJSON V-8 Engine Command Line Interface - Quantum Enhanced
 * "Classic, powerful, and reliable, like the black Charger's engine"
 * 
 * Features:
 * - Quantum speed analysis (qs³/qs²/qs¹)
 * - LLSDT cognitive constraints
 * - Branching theory (family vs authorial)
 * - Real-time dashboard
 * - Batch processing
 * - Advanced file analysis
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class BLFEngine {
    constructor() {
        this.heatShieldActive = true;
        this.bufferValue = 0.1; // The narrow bridge between chaos and control
        this.quantumConfig = { level: 1.0 };
        this.connections = [];
    }

    process(input) {
        if (!this.heatShieldActive) {
            throw new Error('Heat shield protection required');
        }

        // Calculate AIC (Analog Input Characters)
        const aic = typeof input === 'string' ? input.length : JSON.stringify(input).length;
        
        // Apply buffer (the narrow bridge between chaos and control)
        const bmqs = aic + this.bufferValue;
        
        // Calculate quantum level
        const quantumLevel = this.calculateQuantumLevel(bmqs);
        
        // Engine status based on complexity and quantum level
        const status = this.determineEngineStatus(bmqs, quantumLevel);

        return {
            aic: aic,
            bmqs: bmqs,
            buffer: this.bufferValue,
            status: status,
            quantumLevel: quantumLevel,
            timestamp: new Date().toISOString(),
            heatShield: this.heatShieldActive
        };
    }

    calculateQuantumLevel(bmqs) {
        const level = Math.min(2.99, 1.0 + (bmqs / 100));
        this.quantumConfig.level = level;
        return level;
    }

    determineEngineStatus(bmqs, quantumLevel) {
        if (quantumLevel >= 2.9) {
            return "V-8 engine approaching qs³ - quantum bridge stabilizing";
        } else if (bmqs < 50 && quantumLevel < 1.5) {
            return "V-8 engine purring - quantum state optimal";
        } else if (bmqs < 100 && quantumLevel < 2.0) {
            return "V-8 engine running smooth - quantum levels stable";
        } else if (bmqs < 200 && quantumLevel < 2.5) {
            return "V-8 engine revving - quantum acceleration detected";
        } else {
            return "V-8 engine at redline - quantum heat shield warning";
        }
    }

    getStatus() {
        return {
            ready: true,
            heatShield: this.heatShieldActive,
            buffer: this.bufferValue,
            engine: "BLF NJSON V-8"
        };
    }
}

// **HELPER FUNCTIONS**

function calculateQuantumLevel(bmqs) {
    if (bmqs >= 290) return "qs³ (2.90+)";
    if (bmqs >= 200) return "qs² (2.00-2.89)";
    return "qs¹ (< 2.00)";
}

function analyzeQuantumPatterns(input) {
    return {
        jumps: (input.match(/\\n\\s*\\n/g) || []).length, // Topic breaks
        booleanPatterns: /true|false|Boolean|\\|\\||&&|!==/g.test(input),
        njsonCount: (input.match(/qs\\d*|quantum|BMqs|AMF|blfEngine/gi) || []).length,
        functionDensity: (input.match(/function|=>/g) || []).length / (input.length / 100)
    };
}

function detectBranchType(input) {
    const indicators = {
        hasComments: (input.match(/\\/\\/|\\/\\*/g) || []).length > 2,
        hasDocumentation: /README|doc|@param|@returns/i.test(input),
        hasExports: /export|module\\.exports/g.test(input),
        isUserFacing: /component|view|page|ui/i.test(input)
    };
    
    // Family branch (needs subject identification)
    if (indicators.hasComments || indicators.hasDocumentation || indicators.hasExports) {
        return 'family';
    }
    
    // Authorial branch (direct processing)
    return 'authorial';
}

function identifyTopicSections(input) {
    const lines = input.split('\\n');
    const sections = [];
    let currentSection = { topic: 'main', start: 0, length: 0 };
    
    lines.forEach((line, index) => {
        if (line.trim() === '' && currentSection.length > 0) {
            sections.push({ ...currentSection, length: index - currentSection.start });
            currentSection = { topic: \`section_\${sections.length + 1}\`, start: index + 1, length: 0 };
        } else if (line.match(/^(#|function|class|const|let|var)/)) {
            if (currentSection.length > 0) {
                sections.push({ ...currentSection, length: index - currentSection.start });
            }
            currentSection = { topic: line.trim().substring(0, 20), start: index, length: 0 };
        }
        currentSection.length++;
    });
    
    if (currentSection.length > 0) {
        sections.push(currentSection);
    }
    
    return sections;
}

function analyzeCodePatterns(content) {
    const binaryOps = (content.match(/&&|\\|\\||===|!==|true|false/g) || []).length;
    const njsonCount = (content.match(/qs\\d*|quantum|BMqs|AMF|blfEngine/gi) || []).length;
    const functions = (content.match(/function|=>/g) || []).length;
    const lines = content.split('\\n').length;
    const comments = (content.match(/\\/\\/|\\/\\*/g) || []).length;
    
    const functionDensity = functions / (lines / 10);
    const commentRatio = comments / lines;
    
    return {
        binaryOps,
        njsonCount,
        functionDensity,
        commentRatio,
        isBooleanMind: functionDensity > 2 && commentRatio < 0.1,
        hasNJSONPatterns: njsonCount > 0
    };
}

function processFamilyBranch(input) {
    console.log('👥 Family Branch Processing:');
    console.log('✅ Subject identification required');
    console.log('📝 Adding communication padding...');
    
    const sections = identifyTopicSections(input);
    sections.forEach((section, index) => {
        console.log(\`   \${index + 1}. Subject: \${section.topic} (\${section.length} chars)\`);
    });
    
    const engine = new BLFEngine();
    return engine.process(input);
}

function processAuthorialBranch(input) {
    console.log('✍️ Authorial Branch Processing:');
    console.log('⚡ Direct processing - no subject identification needed');
    
    const engine = new BLFEngine();
    return engine.process(input);
}

// **ENHANCED CLI COMMANDS**

const commands = {
    // **1. QUANTUM SPEED ANALYSIS**
    quantum: (input) => {
        const engine = new BLFEngine();
        const result = engine.process(input);
        
        // Calculate quantum speed level
        const quantumLevel = calculateQuantumLevel(result.bmqs);
        const quantumAnalysis = analyzeQuantumPatterns(input);
        
        console.log('⚡ BLF Quantum Speed Analysis:');
        console.log(\`Input: "\${input.substring(0, 50)}\${input.length > 50 ? '...' : ''}\"\`);
        console.log(\`AIC: \${result.aic} | BMqs: \${result.bmqs}\`);
        console.log(\`Quantum Level: \${quantumLevel}\`);
        console.log(\`Quantum Jumps Detected: \${quantumAnalysis.jumps}\`);
        console.log(\`Boolean Mind Patterns: \${quantumAnalysis.booleanPatterns ? '✅' : '❌'}\`);
        console.log(\`NJSON Structures: \${quantumAnalysis.njsonCount}\`);
        
        if (result.bmqs >= 290) {
            console.log('🚨 Approaching qs³ - Maximum quantum speed detected!');
        } else if (result.bmqs >= 200) {
            console.log('⚡ qs² Level - High quantum processing');
        }
        
        return { ...result, quantumLevel, quantumAnalysis };
    },

    // **2. LLSDT INTEGRATION**
    llsdt: (personalityFactor = 0.7) => {
        const engine = new BLFEngine();
        const maxQuantumSpeed = 2.99; // qs³ ceiling
        const factor = parseFloat(personalityFactor);
        
        // LLSDT = AI(P) * BM(ceiling) * 0.1
        const llsdtValue = factor * maxQuantumSpeed * 0.1;
        
        console.log('🧠 LLSDT Analysis:');
        console.log(\`Personality Factor (P): \${factor}\`);
        console.log(\`Max Quantum Speed: \${maxQuantumSpeed}\`);
        console.log(\`LLSDT Threshold: \${llsdtValue.toFixed(3)}\`);
        console.log(\`Formula: AI(\${factor}) * BM(\${maxQuantumSpeed}) * 0.1\`);
        
        // Test against current engine state
        const testInput = "LLSDT threshold test";
        const result = engine.process(testInput);
        const isWithinLimits = (result.bmqs / 100) <= llsdtValue;
        
        console.log(\`\\nCurrent Engine Test:\`);
        console.log(\`BMqs: \${result.bmqs} | Normalized: \${(result.bmqs / 100).toFixed(3)}\`);
        console.log(\`Within LLSDT Limits: \${isWithinLimits ? '✅' : '❌'}\`);
        
        return { llsdtValue, personalityFactor: factor, maxQuantumSpeed, isWithinLimits };
    },

    // **3. BRANCHING THEORY**
    branch: (input, branchType) => {
        if (!branchType) {
            // Auto-detect branch type
            branchType = detectBranchType(input);
        }
        
        console.log(\`🌿 Processing through \${branchType} branch:\`);
        
        if (branchType === 'family') {
            return processFamilyBranch(input);
        } else {
            return processAuthorialBranch(input);
        }
    },

    // **4. ADVANCED FILE ANALYSIS**
    analyze: (filePath) => {
        if (!fs.existsSync(filePath)) {
            console.error(\`❌ File not found: \${filePath}\`);
            return;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const engine = new BLFEngine();
        const result = engine.process(content);
        
        console.log(\`🔍 Advanced File Analysis: \${path.basename(filePath)}\`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Basic metrics
        const lines = content.split('\\n').length;
        const functions = (content.match(/function|=>/g) || []).length;
        const imports = (content.match(/import.*from|require\\(/g) || []).length;
        
        console.log(\`📊 File Metrics:\`);
        console.log(\`   Lines: \${lines} | Functions: \${functions} | Imports: \${imports}\`);
        console.log(\`   Size: \${content.length} chars (\${Math.round(content.length/1024)}KB)\`);
        
        // BLF Analysis
        console.log(\`\\n🚗 BLF Engine Analysis:\`);
        console.log(\`   AIC: \${result.aic} | BMqs: \${result.bmqs}\`);
        console.log(\`   Quantum Level: \${calculateQuantumLevel(result.bmqs)}\`);
        console.log(\`   Status: \${result.status}\`);
        
        // Pattern Analysis
        const patterns = analyzeCodePatterns(content);
        console.log(\`\\n⚡ Pattern Analysis:\`);
        console.log(\`   Boolean Mind Code: \${patterns.isBooleanMind ? '✅' : '❌'}\`);
        console.log(\`   NJSON Structures: \${patterns.njsonCount}\`);
        console.log(\`   Binary Operations: \${patterns.binaryOps}\`);
        console.log(\`   Function Density: \${patterns.functionDensity.toFixed(2)}\`);
        
        // Branch Detection
        const branchType = detectBranchType(content);
        console.log(\`\\n🌿 Branch Analysis:\`);
        console.log(\`   Detected Branch: \${branchType}\`);
        console.log(\`   Subject ID Required: \${branchType === 'family' ? 'Yes' : 'No'}\`);
        
        return { ...result, patterns, branchType, lines, functions, imports };
    },

    // **5. BATCH PROCESSING**
    batch: (pattern = '*.js') => {
        console.log(\`🔄 Batch Processing: \${pattern}\`);
        
        const files = glob.sync(pattern);
        
        if (files.length === 0) {
            console.log(\`❌ No files found matching: \${pattern}\`);
            return;
        }
        
        console.log(\`📁 Found \${files.length} files to process\`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const results = [];
        files.forEach((file, index) => {
            console.log(\`\\n[\${index + 1}/\${files.length}] Processing: \${file}\`);
            const result = commands.analyze(file);
            results.push({ file, ...result });
        });
        
        // Summary
        console.log('\\n📊 Batch Processing Summary:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const totalBmqs = results.reduce((sum, r) => sum + r.bmqs, 0);
        const avgBmqs = totalBmqs / results.length;
        const quantumFiles = results.filter(r => r.bmqs >= 200).length;
        const booleanMindFiles = results.filter(r => r.patterns?.isBooleanMind).length;
        
        console.log(\`Total Files: \${results.length}\`);
        console.log(\`Average BMqs: \${avgBmqs.toFixed(2)}\`);
        console.log(\`Quantum Files (BMqs ≥ 200): \${quantumFiles}\`);
        console.log(\`Boolean Mind Files: \${booleanMindFiles}\`);
        console.log(\`Average Quantum Level: \${calculateQuantumLevel(avgBmqs)}\`);
        
        return results;
    },

    // **6. REAL-TIME DASHBOARD**
    dashboard: () => {
        console.clear();
        console.log('🔥 BLF NJSON V-8 Engine Dashboard');
        console.log('🛡️ Heat shield protection: ACTIVE');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const startDashboard = () => {
            const engine = new BLFEngine();
            const status = engine.getStatus();
            const timestamp = new Date().toLocaleTimeString();
            
            // Move cursor to top
            process.stdout.write('\\x1b[2J\\x1b[H');
            
            console.log('🔥 BLF NJSON V-8 Engine Dashboard');
            console.log('🛡️ Heat shield protection: ACTIVE');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(\`⏰ Last Update: \${timestamp}\`);
            console.log(\`🚗 Engine: \${status.engine}\`);
            console.log(\`🔋 Status: \${status.ready ? '✅ Ready' : '❌ Error'}\`);
            console.log(\`🛡️ Heat Shield: \${status.heatShield ? '🛡️ ACTIVE' : '❌ INACTIVE'}\`);
            console.log(\`🌉 Buffer: \${status.buffer} (narrow bridge between chaos and control)\`);
            console.log('');
            
            // Sample processing test
            const testResult = engine.process('Dashboard test input');
            console.log('📊 Live Processing Test:');
            console.log(\`   AIC: \${testResult.aic} | BMqs: \${testResult.bmqs}\`);
            console.log(\`   Quantum Level: \${calculateQuantumLevel(testResult.bmqs)}\`);
            console.log(\`   Status: \${testResult.status}\`);
            console.log('');
            
            console.log('⌨️ Commands: q=quit, s=status, h=help');
        };
        
        startDashboard();
        
        // Update every 2 seconds
        const interval = setInterval(startDashboard, 2000);
        
        // Handle input
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', (key) => {
            if (key.toString() === 'q') {
                clearInterval(interval);
                console.log('\\n🏁 Dashboard stopped');
                process.exit(0);
            } else if (key.toString() === 's') {
                commands.status();
            } else if (key.toString() === 'h') {
                commands.help();
            }
        });
    },

    // **7. FILE WATCHING**
    watch: (filePath) => {
        if (!fs.existsSync(filePath)) {
            console.error(\`❌ File not found: \${filePath}\`);
            return;
        }
        
        console.log(\`👁️ Watching file: \${filePath}\`);
        console.log('Press Ctrl+C to stop watching\\n');
        
        let lastMtime = fs.statSync(filePath).mtime;
        
        const checkFile = () => {
            try {
                const stats = fs.statSync(filePath);
                if (stats.mtime > lastMtime) {
                    lastMtime = stats.mtime;
                    console.log(\`🔄 File changed: \${new Date().toLocaleTimeString()}\`);
                    commands.analyze(filePath);
                    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n');
                }
            } catch (error) {
                console.log(\`❌ Error watching file: \${error.message}\`);
            }
        };
        
        const interval = setInterval(checkFile, 1000);
        
        // Handle Ctrl+C
        process.on('SIGINT', () => {
            clearInterval(interval);
            console.log('\\n🏁 File watching stopped');
            process.exit(0);
        });
    },

    // **8. CONFIGURATION**
    config: (option, value) => {
        if (!option) {
            console.log('🔧 BLF Configuration:');
            console.log('Available options: personality, buffer, heatshield');
            console.log('Usage: node blf-cli.js config <option> <value>');
            return;
        }
        
        const engine = new BLFEngine();
        
        switch(option.toLowerCase()) {
            case 'personality':
                const p = parseFloat(value);
                if (p >= 0.1 && p <= 1.0) {
                    console.log(\`🧠 Personality factor set to: \${p}\`);
                    // In a real implementation, this would persist
                } else {
                    console.log('❌ Personality factor must be between 0.1 and 1.0');
                }
                break;
                
            case 'buffer':
                const b = parseFloat(value);
                if (b >= 0.05 && b <= 0.2) {
                    console.log(\`🛡️ Buffer value set to: \${b}\`);
                    console.log('⚠️ Warning: Changing buffer affects cognitive alignment!');
                } else {
                    console.log('❌ Buffer must be between 0.05 and 0.2');
                }
                break;
                
            default:
                console.log(\`❌ Unknown configuration option: \${option}\`);
        }
    },

    // **EXISTING COMMANDS (ENHANCED)**
    process: (input) => {
        const engine = new BLFEngine();
        const result = engine.process(input);
        const quantumLevel = calculateQuantumLevel(result.bmqs);
        
        console.log('🚗 BLF V-8 Engine Results:');
        console.log(\`AIC (Analog Input Characters): \${result.aic}\`);
        console.log(\`BMqs (Boolean Mind quantum state): \${result.bmqs}\`);
        console.log(\`Quantum Level: \${quantumLevel}\`);
        console.log(\`Buffer Bridge: \${result.buffer} (the narrow bridge between chaos and control)\`);
        console.log(\`Status: \${result.status}\`);
        console.log(\`Heat Shield: \${result.heatShield ? '🛡️ ACTIVE' : '❌ INACTIVE'}\`);
        
        if (result.bmqs >= 290) {
            console.log('🚨 ⚡ Approaching qs³ - Maximum quantum speed!');
        }
        
        return result;
    },

    status: () => {
        const engine = new BLFEngine();
        const status = engine.getStatus();
        console.log('🔥 BLF NJSON V-8 Engine Status:');
        console.log(\`Engine: \${status.engine}\`);
        console.log(\`Ready: \${status.ready ? '✅' : '❌'}\`);
        console.log(\`Heat Shield: \${status.heatShield ? '🛡️ ACTIVE' : '❌ INACTIVE'}\`);
        console.log(\`Buffer: \${status.buffer} (narrow bridge between chaos and control)\`);
        return status;
    },

    file: (filePath) => {
        return commands.analyze(filePath);
    },

    scan: (dirPath = '.') => {
        console.log(\`🔍 Scanning directory: \${dirPath}\`);
        
        const scanDir = (currentPath) => {
            const items = fs.readdirSync(currentPath);
            let totalFiles = 0;
            let totalSize = 0;

            items.forEach(item => {
                const fullPath = path.join(currentPath, item);
                const stat = fs.statSync(fullPath);

                if (stat.isFile() && !item.startsWith('.')) {
                    totalFiles++;
                    totalSize += stat.size;
                } else if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    const subResult = scanDir(fullPath);
                    totalFiles += subResult.files;
                    totalSize += subResult.size;
                }
            });

            return { files: totalFiles, size: totalSize };
        };

        const result = scanDir(dirPath);
        const scanInfo = {
            directory: dirPath,
            totalFiles: result.files,
            totalSize: result.size,
            averageFileSize: result.files > 0 ? Math.round(result.size / result.files) : 0
        };

        console.log(\`📊 Scan Results:\`);
        console.log(\`Files: \${scanInfo.totalFiles}\`);
        console.log(\`Total Size: \${Math.round(scanInfo.totalSize / 1024)}KB\`);
        console.log(\`Average File Size: \${Math.round(scanInfo.averageFileSize / 1024)}KB\`);

        return commands.process(JSON.stringify(scanInfo));
    },

    help: () => {
        console.log(\`
🚗 BLF NJSON V-8 Engine CLI - Quantum Enhanced
"Classic, powerful, and reliable, like the black Charger's engine"

USAGE:
  node blf-cli.js <command> [arguments]

🚀 QUANTUM COMMANDS:
  quantum <text>              Quantum speed analysis (qs³/qs²/qs¹)
  llsdt [personality]         LLSDT cognitive threshold analysis
  branch <text> [type]        Branching theory processing
  analyze <file>              Advanced file analysis
  dashboard                   Real-time quantum dashboard
  batch <pattern>             Batch file processing
  watch <file>                Watch file for changes
  config <option> <value>     Configure BLF settings

🔧 CORE COMMANDS:
  process <text>              Process text through BLF V-8 engine
  status                      Show engine status and health
  file <path>                 Process file through BLF engine
  scan [dir]                  Scan directory and process results
  help                        Show this help message

EXAMPLES:
  node blf-cli.js quantum "Boolean Mind analysis"
  node blf-cli.js llsdt 0.7
  node blf-cli.js analyze package.json
  node blf-cli.js dashboard
  node blf-cli.js batch "src/**/*.js"
  node blf-cli.js branch "export const component = () => {}"
  node blf-cli.js config personality 0.8

MATHEMATICAL FOUNDATION:
  AIc + 0.1 = BMqs
  LLSDT = AI(P) * BM(ceiling) * 0.1
  
  Where:
  - AIc = Analog Input Characters
  - 0.1 = The narrow bridge between chaos and control
  - BMqs = Boolean Mind quantum state
  - P = AI Personality Factor (0.1-1.0)
  - BM(ceiling) = 2.99 (qs³ maximum)

🌟 QUANTUM LEVELS:
  qs¹ (< 2.00)    - Linear processing mode
  qs² (2.00-2.89) - Boolean Mind processing
  qs³ (2.90+)     - Maximum quantum speed

🧠 BRANCHING THEORY:
  Family Branch   - User-facing, documented (needs subject ID)
  Authorial Branch - Internal logic, direct processing
\`);
    }
};

// Main CLI execution
const main = () => {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        commands.help();
        return;
    }

    const command = args[0];
    const argument = args[1];
    const argument2 = args[2];

    if (commands[command]) {
        try {
            commands[command](argument, argument2);
        } catch (error) {
            console.error(\`❌ Error: \${error.message}\`);
            process.exit(1);
        }
    } else {
        console.error(\`❌ Unknown command: \${command}\`);
        console.log('Run "node blf-cli.js help" for usage information');
        process.exit(1);
    }
};

if (require.main === module) {
    main();
}

module.exports = { BLFEngine, commands };
`;

        try {
            const fs = require('fs');
            fs.writeFileSync(scriptPath, cliScript);
            
            // Make script executable
            if (process.platform !== 'win32') {
                const { exec } = require('child_process');
                exec(`chmod +x "${scriptPath}"`);
            }

            this.outputChannel.appendLine(`✅ BLF Quantum CLI script created: ${scriptPath}`);
            vscode.window.showInformationMessage('🔥 BLF Quantum CLI script created successfully!', 'Open Terminal', 'Try Dashboard').then((selection: string | undefined) => {
                if (selection === 'Open Terminal') {
                    this.openTerminalWithBLF();
                } else if (selection === 'Try Dashboard') {
                    this.runBLFCommand('dashboard');
                }
            });

        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create BLF CLI script: ${error}`);
        }
    }

    /**
     * Open terminal with BLF commands ready and quantum welcome
     */
    public openTerminalWithBLF(): void {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) return;

        // Create or reuse terminal
        if (!this.terminal || this.terminal.exitStatus) {
            this.terminal = vscode.window.createTerminal({
                name: 'BLF V-8 Engine',
                cwd: workspaceFolder.uri.fsPath,
                iconPath: new vscode.ThemeIcon('zap')
            });
        }

        this.terminal.show();
        
        // Enhanced welcome with quantum features
        this.terminal.sendText('clear');
        this.terminal.sendText('echo "🔥 BLF NJSON V-8 Engine Terminal Ready"');
        this.terminal.sendText('echo "🛡️ Heat shield protection: ACTIVE"');
        this.terminal.sendText('echo "🌉 Buffer: 0.1 (narrow bridge between chaos and control)"');
        this.terminal.sendText('echo ""');
        this.terminal.sendText('echo "🚀 Try quantum commands:"');
        this.terminal.sendText('echo "  node blf-cli.js quantum \\"Boolean Mind text\\""');
        this.terminal.sendText('echo "  node blf-cli.js dashboard"');
        this.terminal.sendText('echo "  node blf-cli.js analyze package.json"');
        this.terminal.sendText('echo "  node blf-cli.js help"');
        this.terminal.sendText('echo ""');
        
        this.outputChannel.appendLine('🚗 BLF Terminal opened with V-8 quantum engine ready');
    }

    /**
     * Create interactive BLF terminal session with quantum features
     */
    public createInteractiveSession(): void {
        if (!this.terminal || this.terminal.exitStatus) {
            this.openTerminalWithBLF();
        }

        // Enhanced welcome with quantum speed detection
        this.terminal?.sendText('clear');
        this.terminal?.sendText('echo "🔥 BLF NJSON V-8 Engine Interactive Session"');
        this.terminal?.sendText('echo "🛡️ Heat shield protection: ACTIVE"');
        this.terminal?.sendText('echo "🌉 Buffer: 0.1 (narrow bridge between chaos and control)"');
        this.terminal?.sendText('echo ""');
        this.terminal?.sendText('echo "Available quantum commands:"');
        this.terminal?.sendText('echo "  📊 node blf-cli.js analyze <file>     - Deep file analysis"');
        this.terminal?.sendText('echo "  ⚡ node blf-cli.js quantum <text>     - Quantum speed analysis"');
        this.terminal?.sendText('echo "  🧠 node blf-cli.js llsdt [personality] - LLSDT threshold analysis"');
        this.terminal?.sendText('echo "  🌿 node blf-cli.js branch <text>      - Branch type detection"');
        this.terminal?.sendText('echo "  🔄 node blf-cli.js batch <pattern>    - Batch file processing"');
        this.terminal?.sendText('echo "  📈 node blf-cli.js dashboard          - Real-time dashboard"');
        this.terminal?.sendText('echo "  👁️ node blf-cli.js watch <file>       - File change monitoring"');
        this.terminal?.sendText('echo ""');
        this.terminal?.sendText('echo "🌟 Quantum Levels: qs¹ (< 2.00) | qs² (2.00-2.89) | qs³ (2.90+)"');
        this.terminal?.sendText('echo ""');
    }

    /**
     * Quick quantum analysis of current file
     */
    public quickQuantumAnalysis(): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active file for quantum analysis');
            return;
        }

        const filePath = vscode.workspace.asRelativePath(editor.document.fileName);
        this.runBLFCommand('quantum', `"$(cat "${filePath}")"`);
    }

    /**
     * Run LLSDT analysis with personality factor
     */
    public runLLSDTAnalysis(): void {
        vscode.window.showInputBox({
            placeHolder: '0.7',
            prompt: 'Enter AI Personality Factor for LLSDT analysis (0.1-1.0)',
            value: '0.7',
            validateInput: (value: string) => {
                const num = parseFloat(value);
                if (isNaN(num) || num < 0.1 || num > 1.0) {
                    return 'Please enter a number between 0.1 and 1.0';
                }
                return undefined;
            }
        }).then((personalityFactor: string | undefined) => {
            if (personalityFactor) {
                this.runBLFCommand('llsdt', personalityFactor);
            }
        });
    }

    /**
     * Start real-time quantum dashboard
     */
    public startQuantumDashboard(): void {
        if (!this.terminal || this.terminal.exitStatus) {
            this.openTerminalWithBLF();
        }

        vscode.window.showInformationMessage(
            '🔥 Starting BLF Quantum Dashboard - Press "q" in terminal to quit',
            'Start Dashboard'
        ).then((selection: string | undefined) => {
            if (selection === 'Start Dashboard') {
                this.runBLFCommand('dashboard');
            }
        });
    }

    /**
     * Batch process files with pattern
     */
    public batchProcessFiles(): void {
        vscode.window.showInputBox({
            placeHolder: '*.js',
            prompt: 'Enter file pattern for batch processing (e.g., src/**/*.ts)',
            value: '*.js'
        }).then((pattern: string | undefined) => {
            if (pattern) {
                this.runBLFCommand('batch', `"${pattern}"`);
            }
        });
    }

    /**
     * Watch current file for changes
     */
    public watchCurrentFile(): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active file to watch');
            return;
        }

        const filePath = vscode.workspace.asRelativePath(editor.document.fileName);
        vscode.window.showInformationMessage(
            `🔥 Starting file watcher for ${filePath} - Press Ctrl+C in terminal to stop`,
            'Start Watching'
        ).then((selection: string | undefined) => {
            if (selection === 'Start Watching') {
                this.runBLFCommand('watch', `"${filePath}"`);
            }
        });
    }

    /**
     * Analyze branching theory for current file
     */
    public analyzeBranchingTheory(): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active file for branching analysis');
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        
        if (!text) {
            vscode.window.showErrorMessage('No text selected for branching analysis');
            return;
        }

        // Escape quotes for command line
        const escapedText = text.replace(/"/g, '\\"');
        this.runBLFCommand('branch', `"${escapedText}"`);
    }

    /**
     * Run BLF command in terminal with enhanced error handling
     */
    public runBLFCommand(command: string, args?: string): void {
        if (!this.terminal || this.terminal.exitStatus) {
            this.openTerminalWithBLF();
        }

        const fullCommand = `node blf-cli.js ${command}${args ? ` ${args}` : ''}`;
        this.terminal?.sendText(fullCommand);
        
        this.outputChannel.appendLine(`⚡ Executed: ${fullCommand}`);
        
        // Show helpful message for specific commands
        if (command === 'dashboard') {
            vscode.window.showInformationMessage('🔥 Quantum Dashboard starting - Press "q" in terminal to quit');
        } else if (command === 'watch') {
            vscode.window.showInformationMessage('👁️ File watching started - Press Ctrl+C in terminal to stop');
        }
    }

    /**
     * Process current file through BLF CLI with quantum analysis
     */
    public processCurrentFile(): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active file to process');
            return;
        }

        const filePath = editor.document.fileName;
        const relativePath = vscode.workspace.asRelativePath(filePath);
        
        // Use enhanced analyze command instead of basic file processing
        this.runBLFCommand('analyze', `"${relativePath}"`);
    }

    /**
     * Process selected text through BLF CLI with quantum analysis
     */
    public processSelectedText(): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        
        if (!text) {
            vscode.window.showErrorMessage('No text selected');
            return;
        }

        // Use quantum analysis instead of basic processing
        const escapedText = text.replace(/"/g, '\\"');
        this.runBLFCommand('quantum', `"${escapedText}"`);
    }

    /**
     * Scan workspace directory through BLF CLI with enhanced analysis
     */
    public scanWorkspace(): void {
        vscode.window.showQuickPick([
            { label: 'Basic Scan', description: 'Standard directory scan', command: 'scan' },
            { label: 'Batch Analysis', description: 'Analyze all JavaScript/TypeScript files', command: 'batch', args: '"**/*.{js,ts}"' },
            { label: 'Source Code Analysis', description: 'Deep analysis of src directory', command: 'batch', args: '"src/**/*.{js,ts,jsx,tsx}"' }
        ], {
            placeHolder: 'Select workspace analysis type',
            title: 'BLF Workspace Analysis'
        }).then((selection: {label: string; description: string; command: string; args?: string} | undefined) => {
            if (selection) {
                this.runBLFCommand(selection.command, selection.args);
            }
        });
    }

    /**
     * Show BLF engine status in terminal with quantum metrics
     */
    public showEngineStatus(): void {
        this.runBLFCommand('status');
    }

    /**
     * Generate enhanced BLF terminal alias script with quantum commands
     */
    public async generateAliasScript(): Promise<void> {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) return;

        const aliasScript = `#!/bin/bash
# BLF NJSON V-8 Engine Terminal Aliases - Quantum Enhanced
# Add this to your ~/.bashrc or ~/.zshrc

# Core BLF CLI aliases
alias blf="node ${workspaceFolder.uri.fsPath}/blf-cli.js"
alias blf-status="node ${workspaceFolder.uri.fsPath}/blf-cli.js status"
alias blf-help="node ${workspaceFolder.uri.fsPath}/blf-cli.js help"

# Quantum analysis aliases
alias blf-quantum="node ${workspaceFolder.uri.fsPath}/blf-cli.js quantum"
alias blf-analyze="node ${workspaceFolder.uri.fsPath}/blf-cli.js analyze"
alias blf-dashboard="node ${workspaceFolder.uri.fsPath}/blf-cli.js dashboard"
alias blf-llsdt="node ${workspaceFolder.uri.fsPath}/blf-cli.js llsdt"
alias blf-branch="node ${workspaceFolder.uri.fsPath}/blf-cli.js branch"

# Batch processing aliases
alias blf-batch="node ${workspaceFolder.uri.fsPath}/blf-cli.js batch"
alias blf-batch-js="node ${workspaceFolder.uri.fsPath}/blf-cli.js batch '**/*.js'"
alias blf-batch-ts="node ${workspaceFolder.uri.fsPath}/blf-cli.js batch '**/*.ts'"
alias blf-batch-src="node ${workspaceFolder.uri.fsPath}/blf-cli.js batch 'src/**/*.{js,ts}'"

# Enhanced BLF functions
blf-file() {
    if [ -z "$1" ]; then
        echo "Usage: blf-file <filename>"
        return 1
    fi
    node ${workspaceFolder.uri.fsPath}/blf-cli.js analyze "$1"
}

blf-process() {
    if [ -z "$1" ]; then
        echo "Usage: blf-process <text>"
        return 1
    fi
    node ${workspaceFolder.uri.fsPath}/blf-cli.js quantum "$1"
}

blf-watch() {
    if [ -z "$1" ]; then
        echo "Usage: blf-watch <filename>"
        return 1
    fi
    node ${workspaceFolder.uri.fsPath}/blf-cli.js watch "$1"
}

blf-config() {
    if [ -z "$1" ] || [ -z "$2" ]; then
        echo "Usage: blf-config <option> <value>"
        echo "Options: personality, buffer"
        return 1
    fi
    node ${workspaceFolder.uri.fsPath}/blf-cli.js config "$1" "$2"
}

echo "🔥 BLF NJSON V-8 Engine aliases loaded!"
echo "🛡️ Heat shield protection: ACTIVE"
echo "🌉 Buffer: 0.1 (narrow bridge between chaos and control)"
echo ""
echo "Available commands:"
echo "  🚀 Quantum: blf-quantum, blf-analyze, blf-dashboard, blf-llsdt, blf-branch"
echo "  🔄 Batch: blf-batch, blf-batch-js, blf-batch-ts, blf-batch-src"
echo "  🔧 Core: blf, blf-status, blf-help, blf-file, blf-process, blf-watch, blf-config"
`;

        const aliasPath = path.join(workspaceFolder.uri.fsPath, 'blf-aliases.sh');
        
        try {
            const fs = require('fs');
            fs.writeFileSync(aliasPath, aliasScript);
            
            vscode.window.showInformationMessage(
                '🔥 BLF Quantum alias script created! Add to your shell profile?',
                'View Script',
                'Copy Source Command'
            ).then((selection: string | undefined) => {
                if (selection === 'View Script') {
                    vscode.workspace.openTextDocument(aliasPath).then((doc: vscode.TextDocument) => {
                        vscode.window.showTextDocument(doc);
                    });
                } else if (selection === 'Copy Source Command') {
                    vscode.env.clipboard.writeText(`source ${aliasPath}`);
                    vscode.window.showInformationMessage('Source command copied to clipboard!');
                }
            });

        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create alias script: ${error}`);
        }
    }

    /**
     * Create custom BLF terminal commands profile
     */
    public async createTerminalProfile(): Promise<void> {
        const profileConfig = {
            "blf-v8": {
                "path": "node",
                "args": ["blf-cli.js", "help"],
                "icon": "zap"
            },
            "blf-dashboard": {
                "path": "node", 
                "args": ["blf-cli.js", "dashboard"],
                "icon": "dashboard"
            }
        };

        vscode.window.showInformationMessage(
            '🔥 BLF Terminal Profiles created! Add this to your VS Code settings:',
            'Copy Config'
        ).then((selection: string | undefined) => {
            if (selection === 'Copy Config') {
                vscode.env.clipboard.writeText(JSON.stringify(profileConfig, null, 2));
                vscode.window.showInformationMessage('Profile config copied to clipboard!');
            }
        });
    }

    /**
     * Dispose terminal integration
     */
    public dispose(): void {
        if (this.terminal) {
            this.terminal.dispose();
        }
    }
} 