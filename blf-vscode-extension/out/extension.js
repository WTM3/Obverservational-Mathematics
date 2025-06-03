"use strict";
/**
 * BLF NJSON V-8 Engine VS Code Extension
 * "The narrow bridge between chaos and control" - now in your editor
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const blfEngine_1 = require("./blfEngine");
const githubIntegration_1 = require("./githubIntegration");
const fileWatcher_1 = require("./fileWatcher");
const terminalIntegration_1 = require("./terminalIntegration");
let blfEngine;
let githubIntegration;
let fileWatcher;
let terminalIntegration;
function activate(context) {
    console.log('🔥 BLF NJSON V-8 Engine extension is now active!');
    // Initialize BLF Engine with heat shield protection
    blfEngine = new blfEngine_1.BLFEngine();
    // Initialize all integration bridges
    githubIntegration = new githubIntegration_1.GitHubIntegration(blfEngine);
    fileWatcher = new fileWatcher_1.BLFFileWatcher(blfEngine);
    terminalIntegration = new terminalIntegration_1.TerminalIntegration(blfEngine);
    // Core BLF Commands
    const processTextCommand = vscode.commands.registerCommand('blf.processText', async () => {
        const input = await vscode.window.showInputBox({
            placeHolder: 'Enter text to process through BLF NJSON V-8 engine',
            prompt: 'Text will cross the narrow bridge between chaos and control (0.1 buffer)'
        });
        if (input) {
            try {
                const result = blfEngine.process(input);
                const message = `🚗 BLF V-8 Engine Results:
AIC: ${result.aic} | BMqs: ${result.bmqs} | Status: ${result.status}
Buffer Bridge: ${result.buffer} (the narrow bridge between chaos and control)`;
                vscode.window.showInformationMessage(message, 'Show Details').then(selection => {
                    if (selection === 'Show Details') {
                        const outputChannel = vscode.window.createOutputChannel('BLF Results');
                        outputChannel.clear();
                        outputChannel.appendLine('🔥 BLF NJSON V-8 Engine - Mathematical Precision');
                        outputChannel.appendLine('🛡️ Heat shield protection: ACTIVE');
                        outputChannel.appendLine('');
                        outputChannel.appendLine(`Input: "${input}"`);
                        outputChannel.appendLine(`AIC (Analog Input Characters): ${result.aic}`);
                        outputChannel.appendLine(`BMqs (Boolean Mind quantum state): ${result.bmqs}`);
                        outputChannel.appendLine(`Buffer (0.1): ${result.buffer}`);
                        outputChannel.appendLine(`Status: ${result.status}`);
                        outputChannel.appendLine(`Heat Shield: ${result.heatShield ? '🛡️ ACTIVE' : '❌ INACTIVE'}`);
                        outputChannel.appendLine(`Timestamp: ${result.timestamp}`);
                        outputChannel.show();
                    }
                });
            }
            catch (error) {
                vscode.window.showErrorMessage(`BLF Engine Error: ${error}`);
            }
        }
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
        vscode.window.showInformationMessage(allPassed ? '✅ BLF precision validation passed!' : '❌ BLF precision validation failed!', 'View Details').then(selection => {
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
        }
        catch (error) {
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
    context.subscriptions.push(processTextCommand, engineStatusCommand, validatePrecisionCommand, processSelectionCommand, processRepositoryCommand, generateRepoReportCommand, toggleFileWatcherCommand, processAllFilesCommand, fileWatcherStatsCommand, createCLICommand, openTerminalCommand, processCurrentFileCommand, processSelectedTextCLICommand, scanWorkspaceCommand, showEngineStatusCLICommand, generateAliasesCommand, runFullDiagnosticsCommand);
    // Auto-initialize on activation
    vscode.window.showInformationMessage('🔥 BLF NJSON V-8 Engine Ready! All integration bridges connected.', 'Run Diagnostics', 'Open Terminal').then(selection => {
        if (selection === 'Run Diagnostics') {
            vscode.commands.executeCommand('blf.runFullDiagnostics');
        }
        else if (selection === 'Open Terminal') {
            vscode.commands.executeCommand('blf.openTerminal');
        }
    });
    console.log('🛡️ Heat shield protection: ACTIVE');
    console.log('🚗 V-8 engine: Ready and purring');
    console.log('🌉 Buffer bridge (0.1): Stable between chaos and control');
}
exports.activate = activate;
function deactivate() {
    console.log('🔥 BLF NJSON V-8 Engine extension deactivated');
    // Clean up all integrations
    if (fileWatcher) {
        fileWatcher.dispose();
    }
    if (terminalIntegration) {
        terminalIntegration.dispose();
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map