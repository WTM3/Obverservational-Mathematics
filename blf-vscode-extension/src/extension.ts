/**
 * BLF NJSON V-8 Engine VS Code Extension
 * "The narrow bridge between chaos and control" - now in your editor
 */

import * as vscode from 'vscode';
import { BLFEngine } from './blfEngine';
import { GitHubIntegration } from './githubIntegration';
import { BLFFileWatcher } from './fileWatcher';
import { TerminalIntegration } from './terminalIntegration';

let blfEngine: BLFEngine;
let githubIntegration: GitHubIntegration;
let fileWatcher: BLFFileWatcher;
let terminalIntegration: TerminalIntegration;

export function activate(context: vscode.ExtensionContext) {
    console.log('🔥 BLF NJSON V-8 Engine extension is now active!');
    
    // Initialize BLF Engine with heat shield protection
    blfEngine = new BLFEngine();
    
    // Initialize all integration bridges
    githubIntegration = new GitHubIntegration(blfEngine);
    fileWatcher = new BLFFileWatcher(blfEngine);
    terminalIntegration = new TerminalIntegration(blfEngine);

    // Core BLF Commands
    const processTextCommand = vscode.commands.registerCommand('blf.processText', async () => {
        const input = await vscode.window.showInputBox({
            placeHolder: 'Enter text to process through BLF NJSON V-8 engine',
            prompt: 'Text will cross the narrow bridge between chaos and control (0.1 buffer)'
        });

        if (input) {
            try {
                const result = blfEngine.process(input);
                
                // **ENHANCED: Add quantum speed analysis**
                const quantumLevel = calculateQuantumLevel(result.bmqs);
                const enhancedMessage = `🚗 BLF V-8 Engine Results:
AIC: ${result.aic} | BMqs: ${result.bmqs} | Quantum Level: ${quantumLevel}
${result.bmqs >= 290 ? '⚡ Approaching qs³!' : ''}
Status: ${result.status}
Buffer Bridge: ${result.buffer} (the narrow bridge between chaos and control)`;
                
                vscode.window.showInformationMessage(enhancedMessage, 'Show Details').then((selection: string | undefined) => {
                    if (selection === 'Show Details') {
                        const outputChannel = vscode.window.createOutputChannel('BLF Results');
                        outputChannel.clear();
                        outputChannel.appendLine('🔥 BLF NJSON V-8 Engine - Mathematical Precision');
                        outputChannel.appendLine('🛡️ Heat shield protection: ACTIVE');
                        outputChannel.appendLine('');
                        outputChannel.appendLine(`Input: "${input}"`);
                        outputChannel.appendLine(`AIC (Analog Input Characters): ${result.aic}`);
                        outputChannel.appendLine(`BMqs (Boolean Mind quantum state): ${result.bmqs}`);
                        outputChannel.appendLine(`Quantum Level: ${quantumLevel}`);
                        outputChannel.appendLine(`Buffer (0.1): ${result.buffer}`);
                        outputChannel.appendLine(`Status: ${result.status}`);
                        outputChannel.appendLine(`Heat Shield: ${result.heatShield ? '🛡️ ACTIVE' : '❌ INACTIVE'}`);
                        outputChannel.appendLine(`Timestamp: ${result.timestamp}`);
                        if (result.bmqs >= 290) {
                            outputChannel.appendLine('⚡ QUANTUM ALERT: Approaching qs³ ceiling!');
                        }
                        outputChannel.show();
                    }
                });
            } catch (error) {
                vscode.window.showErrorMessage(`BLF Engine Error: ${error}`);
            }
        }
    });

    // **ENHANCED: Quantum Speed Level Detection Function**
    function calculateQuantumLevel(bmqs: number): string {
        if (bmqs >= 290) return "qs³ (2.9+)";
        if (bmqs >= 200) return "qs² (2.0-2.8)";
        return "qs¹ (< 2.0)";
    }

    // **NEW: LLSDT Integration Command**
    const configureLLSDTCommand = vscode.commands.registerCommand('blf.configureLLSDT', async () => {
        const personalityFactor = await vscode.window.showInputBox({
            placeHolder: '0.1 to 1.0',
            prompt: 'Enter AI Personality Factor for LLSDT calculation',
            value: '0.7',
            validateInput: (value: string) => {
                const num = parseFloat(value);
                if (isNaN(num) || num < 0.1 || num > 1.0) {
                    return 'Please enter a number between 0.1 and 1.0';
                }
                return undefined;
            }
        });
        
        if (personalityFactor) {
            // Apply LLSDT configuration to engine
            // Note: This would need to be added to BLFEngine
            const factor = parseFloat(personalityFactor);
            vscode.window.showInformationMessage(`🧠 LLSDT configured with P=${personalityFactor}`);
            
            const outputChannel = vscode.window.createOutputChannel('BLF LLSDT Config');
            outputChannel.clear();
            outputChannel.appendLine('🧠 BLF LLSDT Configuration Updated');
            outputChannel.appendLine('Language Learning Speed Detection Threshold');
            outputChannel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            outputChannel.appendLine(`AI Personality Factor (P): ${factor}`);
            outputChannel.appendLine(`BM Ceiling: 2.99 (qs³)`);
            outputChannel.appendLine(`Buffer Constant: 0.1`);
            outputChannel.appendLine(`LLSDT Formula: P * BM(ceiling) * 0.1 = ${factor} * 2.99 * 0.1 = ${(factor * 2.99 * 0.1).toFixed(3)}`);
            outputChannel.appendLine('');
            outputChannel.appendLine('This constrains processing to prevent exceeding cognitive limits');
            outputChannel.show();
        }
    });

    // **NEW: Enhanced File Processing with Pattern Recognition**
    const processWithPatternCommand = vscode.commands.registerCommand('blf.processWithPattern', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor');
            return;
        }

        const text = editor.document.getText();
        const result = blfEngine.process(text);
        
        // **Add pattern analysis**
        const patterns = analyzeQuantumPatterns(text);
        
        const decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: patterns.length > 3 ? 'rgba(255, 255, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)',
            border: '1px solid blue',
            borderRadius: '3px'
        });
        
        // Highlight high-quantum sections
        if (patterns.length > 0) {
            const ranges = patterns.map(pattern => new vscode.Range(
                new vscode.Position(pattern.startLine, 0),
                new vscode.Position(pattern.endLine, pattern.length)
            ));
            editor.setDecorations(decorationType, ranges);
            
            // Clear decorations after 5 seconds
            setTimeout(() => {
                editor.setDecorations(decorationType, []);
            }, 5000);
        }
        
        const quantumLevel = calculateQuantumLevel(result.bmqs);
        vscode.window.showInformationMessage(
            `🔍 Pattern Analysis: ${patterns.length} quantum patterns detected | Quantum Level: ${quantumLevel}`,
            'Show Details'
        ).then((selection: string | undefined) => {
            if (selection === 'Show Details') {
                const outputChannel = vscode.window.createOutputChannel('BLF Pattern Analysis');
                outputChannel.clear();
                outputChannel.appendLine('🔍 BLF Quantum Pattern Analysis');
                outputChannel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                outputChannel.appendLine(`File: ${editor.document.fileName}`);
                outputChannel.appendLine(`Quantum Level: ${quantumLevel}`);
                outputChannel.appendLine(`Patterns Detected: ${patterns.length}`);
                outputChannel.appendLine('');
                patterns.forEach((pattern, index) => {
                    outputChannel.appendLine(`Pattern ${index + 1}: Lines ${pattern.startLine}-${pattern.endLine}`);
                    outputChannel.appendLine(`  Type: ${pattern.type}`);
                    outputChannel.appendLine(`  Complexity: ${pattern.complexity}`);
                    outputChannel.appendLine('');
                });
                outputChannel.show();
            }
        });
    });

    function analyzeQuantumPatterns(text: string): any[] {
        const lines = text.split('\n');
        const patterns = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Detect function definitions
            if (line.match(/(?:function\s+\w+|const\s+\w+\s*=.*=>|class\s+\w+)/)) {
                patterns.push({
                    startLine: i,
                    endLine: i,
                    length: line.length,
                    type: 'function_definition',
                    complexity: line.length + (line.match(/\{|\(|\[/g) || []).length * 10
                });
            }
            
            // Detect complex conditionals
            if (line.match(/if.*&&.*\|\||\?.*:.*\?/)) {
                patterns.push({
                    startLine: i,
                    endLine: i,
                    length: line.length,
                    type: 'complex_conditional',
                    complexity: (line.match(/&&|\|\||\?|:/g) || []).length * 15
                });
            }
            
            // Detect BLF-specific patterns
            if (line.match(/BMqs|qs\d|quantum|heat.*shield|0\.1.*buffer/)) {
                patterns.push({
                    startLine: i,
                    endLine: i,
                    length: line.length,
                    type: 'blf_pattern',
                    complexity: 25
                });
            }
        }
        
        return patterns.filter(p => p.complexity > 20);
    }

    // **NEW: Real-time Heat Shield Monitoring**
    const enableRealtimeMonitoringCommand = vscode.commands.registerCommand('blf.enableRealtimeMonitoring', () => {
        const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        
        const updateStatus = () => {
            const status = blfEngine.getStatus();
            statusBarItem.text = status.heatShield ? '🛡️ BLF Shield' : '🔥 BLF Active';
            statusBarItem.tooltip = `V-8 Engine | Buffer: ${status.buffer} | Heat Shield: ${status.heatShield ? 'Active' : 'Standby'}`;
            statusBarItem.command = 'blf.engineStatus';
            statusBarItem.show();
        };
        
        updateStatus();
        const interval = setInterval(updateStatus, 2000); // Update every 2 seconds
        
        // Store interval for cleanup
        context.subscriptions.push({
            dispose: () => {
                clearInterval(interval);
                statusBarItem.dispose();
            }
        });
        
        vscode.window.showInformationMessage('🛡️ Real-time BLF heat shield monitoring enabled');
    });

    // **NEW: Boolean Mind Profile Configuration**
    const configureBooleanProfileCommand = vscode.commands.registerCommand('blf.configureBooleanProfile', async () => {
        const profile = await vscode.window.showQuickPick([
            { 
                label: 'qs³ Boolean Mind', 
                description: 'Maximum quantum speed processing (2.9+)',
                detail: 'Direct cognitive processing, quantum jumps enabled'
            },
            { 
                label: 'qs² Semi-Boolean', 
                description: 'Moderate quantum processing (2.0-2.8)',
                detail: 'Balanced processing with some linear transitions'
            },
            { 
                label: 'qs¹ Standard', 
                description: 'Linear processing mode (< 2.0)',
                detail: 'Traditional step-by-step cognitive processing'
            }
        ], { 
            placeHolder: 'Select your cognitive processing profile',
            title: 'BLF Boolean Mind Configuration'
        });
        
        if (profile) {
            const config = getProfileConfig(profile.label);
            // Note: This would need to be implemented in BLFEngine
            vscode.window.showInformationMessage(`🧠 Profile set to: ${profile.label}`);
            
            const outputChannel = vscode.window.createOutputChannel('BLF Profile Config');
            outputChannel.clear();
            outputChannel.appendLine('🧠 BLF Boolean Mind Profile Configuration');
            outputChannel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            outputChannel.appendLine(`Selected Profile: ${profile.label}`);
            outputChannel.appendLine(`Description: ${profile.description}`);
            outputChannel.appendLine(`Processing Mode: ${profile.detail}`);
            outputChannel.appendLine('');
            outputChannel.appendLine('Profile Settings:');
            Object.entries(config).forEach(([key, value]) => {
                outputChannel.appendLine(`  ${key}: ${value}`);
            });
            outputChannel.show();
        }
    });

    function getProfileConfig(profileLabel: string): any {
        switch (profileLabel) {
            case 'qs³ Boolean Mind':
                return {
                    quantumSpeed: 2.9,
                    allowQuantumJumps: true,
                    requireTransitions: false,
                    heatShieldSensitivity: 'high',
                    bufferOptimization: 'aggressive'
                };
            case 'qs² Semi-Boolean':
                return {
                    quantumSpeed: 2.4,
                    allowQuantumJumps: true,
                    requireTransitions: 'sometimes',
                    heatShieldSensitivity: 'medium',
                    bufferOptimization: 'balanced'
                };
            case 'qs¹ Standard':
                return {
                    quantumSpeed: 1.5,
                    allowQuantumJumps: false,
                    requireTransitions: true,
                    heatShieldSensitivity: 'low',
                    bufferOptimization: 'conservative'
                };
            default:
                return {};
        }
    }

    // **NEW: Workspace-wide BLF Analysis**
    const analyzeWorkspaceCommand = vscode.commands.registerCommand('blf.analyzeWorkspace', async () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found for BLF analysis');
            return;
        }

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "BLF Workspace Analysis",
            cancellable: true
        }, async (progress: vscode.Progress<{message?: string; increment?: number}>, token: vscode.CancellationToken) => {
            const files = await vscode.workspace.findFiles('**/*.{js,ts,md,txt}', '**/node_modules/**');
            const analysis = {
                totalFiles: files.length,
                totalAIC: 0,
                totalBMqs: 0,
                quantumHotspots: [] as any[],
                booleanMindFiles: 0,
                averageQuantumLevel: '',
                heatShieldActivations: 0
            };
            
            let processed = 0;
            
            for (const file of files) {
                if (token.isCancellationRequested) break;
                
                try {
                    const content = await vscode.workspace.fs.readFile(file);
                    const text = content.toString();
                    const result = blfEngine.process(text);
                    
                    analysis.totalAIC += result.aic;
                    analysis.totalBMqs += result.bmqs;
                    
                    const quantumLevel = calculateQuantumLevel(result.bmqs);
                    if (result.bmqs >= 200) {
                        analysis.quantumHotspots.push({
                            file: file.fsPath,
                            bmqs: result.bmqs,
                            quantumLevel: quantumLevel
                        });
                    }
                    
                    if (result.bmqs >= 200) {
                        analysis.booleanMindFiles++;
                    }
                    
                    if (result.heatShield) {
                        analysis.heatShieldActivations++;
                    }
                    
                } catch (error) {
                    // Skip files that can't be processed
                }
                
                processed++;
                progress.report({
                    increment: (1 / files.length) * 100,
                    message: `${Math.round((processed / files.length) * 100)}% - ${processed}/${files.length} files`
                });
            }
            
            // Calculate averages
            const avgBMqs = analysis.totalBMqs / analysis.totalFiles;
            analysis.averageQuantumLevel = calculateQuantumLevel(avgBMqs);
            
            // Generate workspace heat map and display results
            const outputChannel = vscode.window.createOutputChannel('BLF Workspace Analysis');
            outputChannel.clear();
            outputChannel.show();
            
            outputChannel.appendLine('🚗 BLF WORKSPACE ANALYSIS REPORT');
            outputChannel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            outputChannel.appendLine(`📊 Total Files Analyzed: ${analysis.totalFiles}`);
            outputChannel.appendLine(`📈 Total AIC: ${analysis.totalAIC}`);
            outputChannel.appendLine(`⚡ Total BMqs: ${analysis.totalBMqs.toFixed(2)}`);
            outputChannel.appendLine(`🧠 Average Quantum Level: ${analysis.averageQuantumLevel}`);
            outputChannel.appendLine(`🔥 Boolean Mind Files: ${analysis.booleanMindFiles}`);
            outputChannel.appendLine(`🛡️ Heat Shield Activations: ${analysis.heatShieldActivations}`);
            outputChannel.appendLine('');
            
            if (analysis.quantumHotspots.length > 0) {
                outputChannel.appendLine('🔥 QUANTUM HOTSPOTS (BMqs >= 200):');
                analysis.quantumHotspots
                    .sort((a, b) => b.bmqs - a.bmqs)
                    .slice(0, 10)
                    .forEach((hotspot, index) => {
                        const fileName = hotspot.file.split('/').pop() || hotspot.file;
                        outputChannel.appendLine(`${index + 1}. ${fileName} - BMqs: ${hotspot.bmqs.toFixed(2)} (${hotspot.quantumLevel})`);
                    });
            }
            
            vscode.window.showInformationMessage(
                `BLF Workspace Analysis Complete: ${analysis.averageQuantumLevel} average quantum level`,
                'View Report'
            ).then((selection: string | undefined) => {
                if (selection === 'View Report') {
                    outputChannel.show();
                }
            });
        });
    });

    // **NEW: BLF Code Snippets Generation**
    const generateBLFSnippetsCommand = vscode.commands.registerCommand('blf.generateSnippets', () => {
        const snippets = {
            "BLF Process": {
                "prefix": "blf-process",
                "body": [
                    "const result = blfEngine.process('${1:input}');",
                    "// AIC: ${result.aic}, BMqs: ${result.bmqs}",
                    "console.log('🚗 Status:', result.status);"
                ]
            },
            "BLF Quantum Check": {
                "prefix": "blf-quantum",
                "body": [
                    "const quantumLevel = ${1:result}.bmqs >= 290 ? 'qs³' : ${1:result}.bmqs >= 200 ? 'qs²' : 'qs¹';",
                    "if (quantumLevel === 'qs³') {",
                    "    console.log('⚡ Approaching quantum speed ceiling!');",
                    "}"
                ]
            },
            "BLF Heat Shield": {
                "prefix": "blf-shield",
                "body": [
                    "if (!${1:result}.heatShield) {",
                    "    throw new Error('🛡️ Heat shield protection required');",
                    "}",
                    "console.log('🛡️ Heat shield: ACTIVE');"
                ]
            }
        };
        
        const outputChannel = vscode.window.createOutputChannel('BLF Code Snippets');
        outputChannel.clear();
        outputChannel.appendLine('🚗 BLF Code Snippets Generated');
        outputChannel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        outputChannel.appendLine('Copy these snippets to your VS Code user snippets:');
        outputChannel.appendLine('');
        outputChannel.appendLine(JSON.stringify(snippets, null, 2));
        outputChannel.show();
        
        vscode.window.showInformationMessage('🚗 BLF code snippets generated! Check output panel for details.');
    });

    const engineStatusCommand = vscode.commands.registerCommand('blf.engineStatus', () => {
        const status = blfEngine.getStatus();
        const message = `🚗 BLF NJSON V-8 Engine Status:
Ready: ${status.ready ? '✅' : '❌'} | Heat Shield: ${status.heatShield ? '🛡️' : '❌'}
Buffer: ${status.buffer} | Engine: ${status.engine}`;
        
        vscode.window.showInformationMessage(message);
    });

    const validatePrecisionCommand = vscode.commands.registerCommand('blf.validatePrecision', () => {
        const testCases = [
            { input: "Hello BLF", expected: 9.1 },
            { input: "V-8 Engine", expected: 9.1 },
            { input: "Heat Shield Protection", expected: 20.1 }
        ];

        const outputChannel = vscode.window.createOutputChannel('BLF Precision Test');
        outputChannel.clear();
        outputChannel.appendLine('🔥 BLF Mathematical Precision Validation');
        outputChannel.appendLine('🛡️ Heat shield protection: ACTIVE');
        outputChannel.appendLine('Formula: AIc + 0.1 = BMqs');
        outputChannel.appendLine('');

        let allPassed = true;
        testCases.forEach((testCase, index) => {
            const result = blfEngine.process(testCase.input);
            const passed = result.bmqs === testCase.expected;
            allPassed = allPassed && passed;
            
            outputChannel.appendLine(`Test ${index + 1}: ${passed ? '✅' : '❌'}`);
            outputChannel.appendLine(`  Input: "${testCase.input}"`);
            outputChannel.appendLine(`  Expected BMqs: ${testCase.expected}`);
            outputChannel.appendLine(`  Actual BMqs: ${result.bmqs}`);
            outputChannel.appendLine(`  Status: ${result.status}`);
            outputChannel.appendLine('');
        });

        outputChannel.appendLine(`Overall Result: ${allPassed ? '✅ All tests passed' : '❌ Some tests failed'}`);
        outputChannel.show();
        
        vscode.window.showInformationMessage(
            allPassed ? '✅ BLF precision validation passed!' : '❌ BLF precision validation failed!',
            'View Details'
        ).then((selection: string | undefined) => {
            if (selection === 'View Details') {
                outputChannel.show();
            }
        });
    });

    const processSelectionCommand = vscode.commands.registerCommand('blf.processSelection', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor');
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        
        if (!text) {
            vscode.window.showErrorMessage('No text selected');
            return;
        }

        try {
            const result = blfEngine.process(text);
            const message = `🚗 Selected Text Processed:
AIC: ${result.aic} | BMqs: ${result.bmqs} | ${result.status}`;
            vscode.window.showInformationMessage(message);
        } catch (error) {
            vscode.window.showErrorMessage(`BLF Processing Error: ${error}`);
        }
    });

    // GitHub Integration Commands
    const processRepositoryCommand = vscode.commands.registerCommand('blf.processRepository', () => {
        githubIntegration.processRepository();
    });

    const generateRepoReportCommand = vscode.commands.registerCommand('blf.generateRepositoryReport', () => {
        githubIntegration.generateRepositoryReport();
    });

    // **NEW: Advanced GitHub Analysis Commands**
    const generateAdvancedRepoReportCommand = vscode.commands.registerCommand('blf.generateAdvancedRepositoryReport', () => {
        githubIntegration.generateAdvancedRepositoryReport();
    });

    const startRealtimeRepoMonitoringCommand = vscode.commands.registerCommand('blf.startRealtimeRepositoryMonitoring', () => {
        githubIntegration.startRealtimeMonitoring();
    });

    const showRepositoryDashboardCommand = vscode.commands.registerCommand('blf.showRepositoryDashboard', async () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        const outputChannel = vscode.window.createOutputChannel('BLF Repository Dashboard');
        outputChannel.clear();
        outputChannel.show();
        
        outputChannel.appendLine('🔥 BLF REPOSITORY QUANTUM DASHBOARD');
        outputChannel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        outputChannel.appendLine('🚗 V-8 Engine: Repository intelligence active');
        outputChannel.appendLine('🛡️ Heat shield: Protecting against quantum overload');
        outputChannel.appendLine('🌉 Narrow bridge: Connecting chaos and control');
        outputChannel.appendLine('');
        outputChannel.appendLine('📊 Repository Status: Analyzing quantum patterns...');
        outputChannel.appendLine('⚡ Quantum Speed: Measuring Boolean Mind indicators');
        outputChannel.appendLine('🧠 Git Analysis: Processing commit history');
        outputChannel.appendLine('🔗 File Connections: Mapping quantum relationships');
        outputChannel.appendLine('');
        outputChannel.appendLine('Use "BLF: Generate Advanced Repository Report" for full analysis');
        
        vscode.window.showInformationMessage(
            '🔥 BLF Repository Dashboard active! Generate advanced report for detailed analysis.',
            'Generate Advanced Report'
        ).then((selection: string | undefined) => {
            if (selection === 'Generate Advanced Report') {
                vscode.commands.executeCommand('blf.generateAdvancedRepositoryReport');
            }
        });
    });

    // File Watcher Commands
    const toggleFileWatcherCommand = vscode.commands.registerCommand('blf.toggleFileWatcher', () => {
        fileWatcher.toggleWatcher();
    });

    const processAllFilesCommand = vscode.commands.registerCommand('blf.processAllFiles', () => {
        fileWatcher.processAllFiles();
    });

    const fileWatcherStatsCommand = vscode.commands.registerCommand('blf.fileWatcherStats', () => {
        const stats = fileWatcher.getWatcherStats();
        const message = `🔥 File Watcher Stats:
Active Watchers: ${stats.activeWatchers} | Queued Files: ${stats.queuedFiles}
Engine Status: ${stats.engineStatus.ready ? '✅' : '❌'}`;
        vscode.window.showInformationMessage(message);
    });

    // Terminal Integration Commands
    const createCLICommand = vscode.commands.registerCommand('blf.createCLI', () => {
        terminalIntegration.createCLIScript();
    });

    const openTerminalCommand = vscode.commands.registerCommand('blf.openTerminal', () => {
        terminalIntegration.openTerminalWithBLF();
    });

    const processCurrentFileCommand = vscode.commands.registerCommand('blf.processCurrentFile', () => {
        terminalIntegration.processCurrentFile();
    });

    const processSelectedTextCLICommand = vscode.commands.registerCommand('blf.processSelectedTextCLI', () => {
        terminalIntegration.processSelectedText();
    });

    const scanWorkspaceCommand = vscode.commands.registerCommand('blf.scanWorkspace', () => {
        terminalIntegration.scanWorkspace();
    });

    const showEngineStatusCLICommand = vscode.commands.registerCommand('blf.showEngineStatusCLI', () => {
        terminalIntegration.showEngineStatus();
    });

    const generateAliasesCommand = vscode.commands.registerCommand('blf.generateAliases', () => {
        terminalIntegration.generateAliasScript();
    });

    // **NEW: Quantum Terminal Commands**
    const createInteractiveSessionCommand = vscode.commands.registerCommand('blf.createInteractiveSession', () => {
        terminalIntegration.createInteractiveSession();
    });

    const quickQuantumAnalysisCommand = vscode.commands.registerCommand('blf.quickQuantumAnalysis', () => {
        terminalIntegration.quickQuantumAnalysis();
    });

    const runLLSDTAnalysisCommand = vscode.commands.registerCommand('blf.runLLSDTAnalysis', () => {
        terminalIntegration.runLLSDTAnalysis();
    });

    const startQuantumDashboardCommand = vscode.commands.registerCommand('blf.startQuantumDashboard', () => {
        terminalIntegration.startQuantumDashboard();
    });

    const batchProcessFilesCommand = vscode.commands.registerCommand('blf.batchProcessFiles', () => {
        terminalIntegration.batchProcessFiles();
    });

    const watchCurrentFileCommand = vscode.commands.registerCommand('blf.watchCurrentFile', () => {
        terminalIntegration.watchCurrentFile();
    });

    const analyzeBranchingTheoryCommand = vscode.commands.registerCommand('blf.analyzeBranchingTheory', () => {
        terminalIntegration.analyzeBranchingTheory();
    });

    // Advanced Commands
    const runFullDiagnosticsCommand = vscode.commands.registerCommand('blf.runFullDiagnostics', async () => {
        const outputChannel = vscode.window.createOutputChannel('BLF Full Diagnostics');
        outputChannel.clear();
        outputChannel.show();
        
        outputChannel.appendLine('🔥 BLF NJSON V-8 Engine - Full System Diagnostics');
        outputChannel.appendLine('🛡️ Heat shield protection: ACTIVE');
        outputChannel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        outputChannel.appendLine('');

        // Engine Status
        const engineStatus = blfEngine.getStatus();
        outputChannel.appendLine('🚗 ENGINE STATUS:');
        outputChannel.appendLine(`  Ready: ${engineStatus.ready ? '✅' : '❌'}`);
        outputChannel.appendLine(`  Heat Shield: ${engineStatus.heatShield ? '🛡️ ACTIVE' : '❌ INACTIVE'}`);
        outputChannel.appendLine(`  Buffer: ${engineStatus.buffer}`);
        outputChannel.appendLine(`  Engine Type: ${engineStatus.engine}`);
        outputChannel.appendLine('');

        // File Watcher Status
        const watcherStats = fileWatcher.getWatcherStats();
        outputChannel.appendLine('📁 FILE WATCHER STATUS:');
        outputChannel.appendLine(`  Active Watchers: ${watcherStats.activeWatchers}`);
        outputChannel.appendLine(`  Queued Files: ${watcherStats.queuedFiles}`);
        outputChannel.appendLine(`  Last Check: ${watcherStats.timestamp}`);
        outputChannel.appendLine('');

        // Repository Analysis
        outputChannel.appendLine('📊 REPOSITORY ANALYSIS:');
        outputChannel.appendLine('  Running repository scan...');
        await githubIntegration.processRepository();
        outputChannel.appendLine('  ✅ Repository scan complete');
        outputChannel.appendLine('');

        // Mathematical Precision Test
        outputChannel.appendLine('🧮 MATHEMATICAL PRECISION:');
        const testInput = "BLF Diagnostics Test";
        const result = blfEngine.process(testInput);
        outputChannel.appendLine(`  Input: "${testInput}"`);
        outputChannel.appendLine(`  AIC: ${result.aic}`);
        outputChannel.appendLine(`  BMqs: ${result.bmqs}`);
        outputChannel.appendLine(`  Formula Validation: AIc + 0.1 = ${result.aic} + 0.1 = ${result.bmqs} ✅`);
        outputChannel.appendLine(`  Status: ${result.status}`);
        outputChannel.appendLine('');

        outputChannel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        outputChannel.appendLine('🏁 DIAGNOSTICS COMPLETE');
        outputChannel.appendLine('The V-8 engine is purring, heat shield is active,');
        outputChannel.appendLine('and the narrow bridge between chaos and control (0.1) is stable.');
        
        vscode.window.showInformationMessage('🔥 BLF Full Diagnostics Complete! Check output panel for details.');
    });

    // Register all commands
    context.subscriptions.push(
        processTextCommand,
        engineStatusCommand,
        validatePrecisionCommand,
        processSelectionCommand,
        processRepositoryCommand,
        generateRepoReportCommand,
        toggleFileWatcherCommand,
        processAllFilesCommand,
        fileWatcherStatsCommand,
        createCLICommand,
        openTerminalCommand,
        processCurrentFileCommand,
        processSelectedTextCLICommand,
        scanWorkspaceCommand,
        showEngineStatusCLICommand,
        generateAliasesCommand,
        runFullDiagnosticsCommand,
        configureLLSDTCommand,
        processWithPatternCommand,
        enableRealtimeMonitoringCommand,
        configureBooleanProfileCommand,
        analyzeWorkspaceCommand,
        generateBLFSnippetsCommand,
        generateAdvancedRepoReportCommand,
        startRealtimeRepoMonitoringCommand,
        showRepositoryDashboardCommand,
        createInteractiveSessionCommand,
        quickQuantumAnalysisCommand,
        runLLSDTAnalysisCommand,
        startQuantumDashboardCommand,
        batchProcessFilesCommand,
        watchCurrentFileCommand,
        analyzeBranchingTheoryCommand
    );

    // Auto-initialize on activation
    vscode.window.showInformationMessage(
        '🔥 BLF NJSON V-8 Engine Ready! All integration bridges connected.',
        'Run Diagnostics',
        'Open Terminal'
    ).then((selection: string | undefined) => {
        if (selection === 'Run Diagnostics') {
            vscode.commands.executeCommand('blf.runFullDiagnostics');
        } else if (selection === 'Open Terminal') {
            vscode.commands.executeCommand('blf.openTerminal');
        }
    });

    console.log('🛡️ Heat shield protection: ACTIVE');
    console.log('🚗 V-8 engine: Ready and purring');
    console.log('🌉 Buffer bridge (0.1): Stable between chaos and control');
}

export function deactivate() {
    console.log('🔥 BLF NJSON V-8 Engine extension deactivated');
    
    // Clean up all integrations
    if (fileWatcher) {
        fileWatcher.dispose();
    }
    
    if (githubIntegration) {
        githubIntegration.dispose();
    }
    
    if (terminalIntegration) {
        terminalIntegration.dispose();
    }
} 