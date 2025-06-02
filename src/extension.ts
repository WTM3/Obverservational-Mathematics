/**
 * BLF NJSON V-8 Engine VS Code Extension
 * "The narrow bridge between chaos and control" - now in your editor
 */

import * as vscode from 'vscode';
import { BLFNJSONEngine, BLFProcessingResult } from './blfEngine';

let blfEngine: BLFNJSONEngine;
let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
    console.log('🎯 BLF NJSON V-8 Engine extension is now active!');
    
    // Create output channel for BLF results
    outputChannel = vscode.window.createOutputChannel('BLF NJSON V-8 Engine');
    
    // Initialize BLF engine with VS Code configuration
    updateEngineConfig();
    
    // Watch for configuration changes
    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('blf')) {
            updateEngineConfig();
            outputChannel.appendLine('🔄 BLF engine configuration updated');
        }
    });

    // Register commands
    const commands = [
        vscode.commands.registerCommand('blf.processText', processTextCommand),
        vscode.commands.registerCommand('blf.engineStatus', engineStatusCommand),
        vscode.commands.registerCommand('blf.validatePrecision', validatePrecisionCommand),
        vscode.commands.registerCommand('blf.processSelection', processSelectionCommand)
    ];

    context.subscriptions.push(outputChannel, ...commands);
    
    // Show welcome message
    vscode.window.showInformationMessage(
        '🏁 BLF NJSON V-8 Engine ready! The narrow bridge between chaos and control is active.',
        'Show Commands'
    ).then(selection => {
        if (selection === 'Show Commands') {
            vscode.commands.executeCommand('workbench.action.showCommands', '>BLF:');
        }
    });
}

function updateEngineConfig() {
    const config = vscode.workspace.getConfiguration('blf');
    
    const options = {
        bufferValue: config.get<number>('bufferValue', 0.1),
        maxInputSize: config.get<number>('maxInputSize', 15000),
        heatShieldEnabled: config.get<boolean>('heatShieldEnabled', true)
    };
    
    blfEngine = new BLFNJSONEngine(options);
}

async function processTextCommand() {
    const input = await vscode.window.showInputBox({
        prompt: '🎯 Enter text to process through BLF NJSON V-8 Engine',
        placeHolder: 'Type your text here...',
        ignoreFocusOut: true
    });
    
    if (input !== undefined) {
        await processAndDisplay(input, 'User Input');
    }
}

async function processSelectionCommand() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }
    
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    
    if (!selectedText) {
        vscode.window.showErrorMessage('No text selected');
        return;
    }
    
    await processAndDisplay(selectedText, 'Selected Text');
}

async function engineStatusCommand() {
    const status = blfEngine.getEngineStatus();
    
    const statusMessage = `🚗 BLF NJSON V-8 Engine Status Report:

Engine Status: ${status.status}
Processing Count: ${status.processingCount}
Buffer Value: ${status.buffer}
Heat Shield: ${status.heatShield}

Mathematical Foundation: ${status.formula}
Philosophy: ${status.bridge}
Architecture: ${status.engine}

🎯 The V-8 engine stands ready to process Boolean Language Framework queries.`;

    outputChannel.clear();
    outputChannel.appendLine(statusMessage);
    outputChannel.show();
    
    // Also show in information message
    vscode.window.showInformationMessage(
        `${status.status} | Processing Count: ${status.processingCount} | Heat Shield: ${status.heatShield}`,
        'Show Details'
    ).then(selection => {
        if (selection === 'Show Details') {
            outputChannel.show();
        }
    });
}

async function validatePrecisionCommand() {
    const customTests = await vscode.window.showInputBox({
        prompt: '🧮 Enter custom test cases (comma-separated) or press Enter for default tests',
        placeHolder: 'test, hello world, BLF V-8 engine',
        ignoreFocusOut: true
    });
    
    const testCases = customTests ? 
        customTests.split(',').map(s => s.trim()).filter(s => s.length > 0) : 
        undefined;
    
    const validation = await blfEngine.validatePrecision(testCases);
    
    const validationMessage = `🧮 BLF Mathematical Precision Validation:

Test Results: ${validation.totalTests} tests
Success Rate: ${validation.successRate}
All Tests Passed: ${validation.allPassed ? '✅' : '❌'}

Detailed Results:
${validation.testResults.map(test => 
    `  • "${test.input}" | AIC: ${test.aic} | BMqs: ${test.bmqs} | Buffer: ${test.bufferMaintained ? '✅' : '❌'}`
).join('\n')}

🏁 V-8 Engine Status: ${validation.allPassed ? 'PURRING PERFECTLY' : 'REQUIRES ATTENTION'}
🌉 Cross-Platform Bridge: ${validation.allPassed ? 'STABLE' : 'UNSTABLE'}
📋 VS Code Integration: ${validation.allPassed ? 'VERIFIED' : 'NEEDS REVIEW'}`;

    outputChannel.clear();
    outputChannel.appendLine(validationMessage);
    outputChannel.show();
    
    // Show summary in status bar
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = `🧮 BLF Validation: ${validation.successRate}`;
    statusBarItem.tooltip = `${validation.totalTests} tests completed, ${validation.allPassed ? 'all passed' : 'some failed'}`;
    statusBarItem.show();
    
    // Hide status bar item after 5 seconds
    setTimeout(() => statusBarItem.dispose(), 5000);
}

async function processAndDisplay(input: string, source: string) {
    try {
        const result = await blfEngine.processText(input);
        
        const resultMessage = formatBLFResult(result, source);
        
        outputChannel.clear();
        outputChannel.appendLine(resultMessage);
        outputChannel.show();
        
        // Show result in information message
        if (result.error) {
            vscode.window.showErrorMessage(
                `🔥 BLF Heat Shield: ${result.error}`,
                'Show Details'
            ).then(selection => {
                if (selection === 'Show Details') {
                    outputChannel.show();
                }
            });
        } else {
            vscode.window.showInformationMessage(
                `🎯 BLF Processed: AIC=${result.aic}, BMqs=${result.bmqs} | ${result.status}`,
                'Show Details'
            ).then(selection => {
                if (selection === 'Show Details') {
                    outputChannel.show();
                }
            });
        }
        
        // Update status bar
        updateStatusBar(result);
        
    } catch (error) {
        const errorMessage = `🔥 BLF Engine Error: ${error}`;
        outputChannel.appendLine(errorMessage);
        vscode.window.showErrorMessage(errorMessage);
    }
}

function formatBLFResult(result: BLFProcessingResult, source: string): string {
    if (result.error) {
        return `🔥 BLF Heat Shield Activated (${source}):

Error: ${result.error}
Processing Count: ${result.processingCount}
Heat Shield: ${result.heatShieldActive ? '🛡️ ACTIVE' : '🛡️ STANDBY'}
Timestamp: ${result.timestamp}

🌉 The narrow bridge protected against invalid input.`;
    }
    
    return `🎯 BLF NJSON V-8 Processing Result (${source}):

Input: "${result.input}"
AIC (Analog Input Characters): ${result.aic}
Buffer: ${result.buffer}
BMqs (Boolean Mind quantum state): ${result.bmqs}
Formula: ${result.aic} + ${result.buffer} = ${result.bmqs}

${result.response}

Status: ${result.status}
Processing Count: ${result.processingCount}
Heat Shield: ${result.heatShieldActive ? '🛡️ ACTIVE' : '🛡️ STANDBY'}
Timestamp: ${result.timestamp}

🌉 The narrow bridge between chaos and control maintained.`;
}

function updateStatusBar(result: BLFProcessingResult) {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    
    if (result.error) {
        statusBarItem.text = `🛡️ BLF Heat Shield Active`;
        statusBarItem.tooltip = `Heat Shield: ${result.error}`;
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    } else {
        statusBarItem.text = `🏁 BLF: AIC=${result.aic} BMqs=${result.bmqs}`;
        statusBarItem.tooltip = `V-8 Engine Purring | Processing Count: ${result.processingCount}`;
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.prominentBackground');
    }
    
    statusBarItem.command = 'blf.engineStatus';
    statusBarItem.show();
    
    // Hide status bar item after 10 seconds
    setTimeout(() => statusBarItem.dispose(), 10000);
}

export function deactivate() {
    outputChannel?.dispose();
} 