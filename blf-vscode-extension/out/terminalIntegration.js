"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalIntegration = void 0;
const vscode = require("vscode");
const path = require("path");
class TerminalIntegration {
    constructor(blfEngine) {
        this.blfEngine = blfEngine;
        this.outputChannel = vscode.window.createOutputChannel('BLF Terminal');
    }
    /**
     * Create BLF CLI commands script
     */
    async createCLIScript() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found for BLF CLI setup');
            return;
        }
        const scriptPath = path.join(workspaceFolder.uri.fsPath, 'blf-cli.js');
        const cliScript = `#!/usr/bin/env node
/**
 * BLF NJSON V-8 Engine Command Line Interface
 * "Classic, powerful, and reliable, like the black Charger's engine"
 */

const fs = require('fs');
const path = require('path');

class BLFEngine {
    constructor() {
        this.heatShieldActive = true;
        this.bufferValue = 0.1; // The narrow bridge between chaos and control
    }

    process(input) {
        if (!this.heatShieldActive) {
            throw new Error('Heat shield protection required');
        }

        // Calculate AIC (Analog Input Characters)
        const aic = typeof input === 'string' ? input.length : JSON.stringify(input).length;
        
        // Apply buffer (the narrow bridge between chaos and control)
        const bmqs = aic + this.bufferValue;
        
        // Engine status based on complexity
        let status;
        if (bmqs < 50) {
            status = "V-8 engine purring";
        } else if (bmqs < 100) {
            status = "V-8 engine running smooth";
        } else if (bmqs < 200) {
            status = "V-8 engine revving";
        } else {
            status = "V-8 engine at redline - heat shield warning";
        }

        return {
            aic: aic,
            bmqs: bmqs,
            buffer: this.bufferValue,
            status: status,
            timestamp: new Date().toISOString(),
            heatShield: this.heatShieldActive
        };
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

// CLI Commands
const commands = {
    process: (input) => {
        const engine = new BLFEngine();
        const result = engine.process(input);
        console.log('🚗 BLF V-8 Engine Results:');
        console.log(\`AIC (Analog Input Characters): \${result.aic}\`);
        console.log(\`BMqs (Boolean Mind quantum state): \${result.bmqs}\`);
        console.log(\`Buffer Bridge: \${result.buffer} (the narrow bridge between chaos and control)\`);
        console.log(\`Status: \${result.status}\`);
        console.log(\`Heat Shield: \${result.heatShield ? '🛡️ ACTIVE' : '❌ INACTIVE'}\`);
        return result;
    },

    status: () => {
        const engine = new BLFEngine();
        const status = engine.getStatus();
        console.log('🔥 BLF NJSON V-8 Engine Status:');
        console.log(\`Engine: \${status.engine}\`);
        console.log(\`Ready: \${status.ready ? '✅' : '❌'}\`);
        console.log(\`Heat Shield: \${status.heatShield ? '🛡️ ACTIVE' : '❌ INACTIVE'}\`);
        console.log(\`Buffer: \${status.buffer}\`);
        return status;
    },

    file: (filePath) => {
        if (!fs.existsSync(filePath)) {
            console.error(\`❌ File not found: \${filePath}\`);
            return;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const fileInfo = {
            path: filePath,
            basename: path.basename(filePath),
            size: content.length,
            extension: path.extname(filePath)
        };

        console.log(\`📁 Processing file: \${fileInfo.basename}\`);
        return commands.process(JSON.stringify(fileInfo));
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
🚗 BLF NJSON V-8 Engine CLI
"Classic, powerful, and reliable, like the black Charger's engine"

USAGE:
  node blf-cli.js <command> [arguments]

COMMANDS:
  process <text>     Process text through BLF V-8 engine
  status            Show engine status and health
  file <path>       Process file through BLF engine
  scan [dir]        Scan directory and process results
  help              Show this help message

EXAMPLES:
  node blf-cli.js process "Hello BLF V-8!"
  node blf-cli.js status
  node blf-cli.js file package.json
  node blf-cli.js scan src/

MATHEMATICAL FOUNDATION:
  AIc + 0.1 = BMqs
  Where:
  - AIc = Analog Input Characters
  - 0.1 = The narrow bridge between chaos and control
  - BMqs = Boolean Mind quantum state
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

    if (commands[command]) {
        try {
            commands[command](argument);
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
            this.outputChannel.appendLine(`✅ BLF CLI script created: ${scriptPath}`);
            vscode.window.showInformationMessage('BLF CLI script created successfully!', 'Open Terminal').then(selection => {
                if (selection === 'Open Terminal') {
                    this.openTerminalWithBLF();
                }
            });
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to create BLF CLI script: ${error}`);
        }
    }
    /**
     * Open terminal with BLF commands ready
     */
    openTerminalWithBLF() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder)
            return;
        // Create or reuse terminal
        if (!this.terminal || this.terminal.exitStatus) {
            this.terminal = vscode.window.createTerminal({
                name: 'BLF V-8 Engine',
                cwd: workspaceFolder.uri.fsPath,
                iconPath: new vscode.ThemeIcon('zap')
            });
        }
        this.terminal.show();
        // Send welcome commands
        this.terminal.sendText('echo "🔥 BLF NJSON V-8 Engine Terminal Ready"');
        this.terminal.sendText('echo "🛡️ Heat shield protection: ACTIVE"');
        this.terminal.sendText('echo "Type: node blf-cli.js help for commands"');
        this.outputChannel.appendLine('🚗 BLF Terminal opened with V-8 engine ready');
    }
    /**
     * Run BLF command in terminal
     */
    runBLFCommand(command, args) {
        if (!this.terminal || this.terminal.exitStatus) {
            this.openTerminalWithBLF();
        }
        const fullCommand = `node blf-cli.js ${command}${args ? ` ${args}` : ''}`;
        this.terminal?.sendText(fullCommand);
        this.outputChannel.appendLine(`⚡ Executed: ${fullCommand}`);
    }
    /**
     * Process current file through BLF CLI
     */
    processCurrentFile() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active file to process');
            return;
        }
        const filePath = editor.document.fileName;
        const relativePath = vscode.workspace.asRelativePath(filePath);
        this.runBLFCommand('file', `"${relativePath}"`);
    }
    /**
     * Process selected text through BLF CLI
     */
    processSelectedText() {
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
        // Escape quotes for command line
        const escapedText = text.replace(/"/g, '\\"');
        this.runBLFCommand('process', `"${escapedText}"`);
    }
    /**
     * Scan workspace directory through BLF CLI
     */
    scanWorkspace() {
        this.runBLFCommand('scan');
    }
    /**
     * Show BLF engine status in terminal
     */
    showEngineStatus() {
        this.runBLFCommand('status');
    }
    /**
     * Create custom BLF terminal commands
     */
    async createTerminalProfile() {
        const profileConfig = {
            "blf-v8": {
                "path": "node",
                "args": ["blf-cli.js", "help"],
                "icon": "zap"
            }
        };
        vscode.window.showInformationMessage('BLF Terminal Profile created! Add this to your VS Code settings:', 'Copy Config').then(selection => {
            if (selection === 'Copy Config') {
                vscode.env.clipboard.writeText(JSON.stringify(profileConfig, null, 2));
                vscode.window.showInformationMessage('Profile config copied to clipboard!');
            }
        });
    }
    /**
     * Generate BLF terminal alias script
     */
    async generateAliasScript() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder)
            return;
        const aliasScript = `#!/bin/bash
# BLF NJSON V-8 Engine Terminal Aliases
# Add this to your ~/.bashrc or ~/.zshrc

# BLF CLI aliases
alias blf="node ${workspaceFolder.uri.fsPath}/blf-cli.js"
alias blf-status="node ${workspaceFolder.uri.fsPath}/blf-cli.js status"
alias blf-scan="node ${workspaceFolder.uri.fsPath}/blf-cli.js scan"
alias blf-help="node ${workspaceFolder.uri.fsPath}/blf-cli.js help"

# BLF functions
blf-file() {
    if [ -z "$1" ]; then
        echo "Usage: blf-file <filename>"
        return 1
    fi
    node ${workspaceFolder.uri.fsPath}/blf-cli.js file "$1"
}

blf-process() {
    if [ -z "$1" ]; then
        echo "Usage: blf-process <text>"
        return 1
    fi
    node ${workspaceFolder.uri.fsPath}/blf-cli.js process "$1"
}

echo "🔥 BLF NJSON V-8 Engine aliases loaded!"
echo "🛡️ Heat shield protection: ACTIVE"
echo "Available commands: blf, blf-status, blf-scan, blf-help, blf-file, blf-process"
`;
        const aliasPath = path.join(workspaceFolder.uri.fsPath, 'blf-aliases.sh');
        try {
            const fs = require('fs');
            fs.writeFileSync(aliasPath, aliasScript);
            vscode.window.showInformationMessage('BLF alias script created! Add to your shell profile?', 'View Script', 'Copy Path').then(selection => {
                if (selection === 'View Script') {
                    vscode.workspace.openTextDocument(aliasPath).then(doc => {
                        vscode.window.showTextDocument(doc);
                    });
                }
                else if (selection === 'Copy Path') {
                    vscode.env.clipboard.writeText(`source ${aliasPath}`);
                    vscode.window.showInformationMessage('Source command copied to clipboard!');
                }
            });
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to create alias script: ${error}`);
        }
    }
    /**
     * Dispose terminal integration
     */
    dispose() {
        if (this.terminal) {
            this.terminal.dispose();
        }
    }
}
exports.TerminalIntegration = TerminalIntegration;
//# sourceMappingURL=terminalIntegration.js.map