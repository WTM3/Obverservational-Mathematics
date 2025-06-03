"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLFFileWatcher = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
class BLFFileWatcher {
    constructor(blfEngine) {
        this.watchers = [];
        this.processQueue = new Map();
        this.blfEngine = blfEngine;
        this.outputChannel = vscode.window.createOutputChannel('BLF File Watcher');
        this.config = vscode.workspace.getConfiguration('blf');
        this.initializeWatchers();
    }
    /**
     * Initialize file watchers for different file types
     */
    initializeWatchers() {
        const watchPatterns = [
            '**/*.{js,ts,jsx,tsx}',
            '**/*.{py,java,cpp,c,swift,go,rs}',
            '**/*.{json,yaml,yml,toml,xml}',
            '**/*.{md,txt,rst}' // Documentation
        ];
        watchPatterns.forEach(pattern => {
            const watcher = vscode.workspace.createFileSystemWatcher(pattern);
            // File created
            watcher.onDidCreate(uri => {
                this.queueFileProcessing(uri.fsPath, 'created');
            });
            // File changed
            watcher.onDidChange(uri => {
                this.queueFileProcessing(uri.fsPath, 'changed');
            });
            // File deleted
            watcher.onDidDelete(uri => {
                this.handleFileDeleted(uri.fsPath);
            });
            this.watchers.push(watcher);
        });
        this.outputChannel.appendLine('🔥 BLF File Watcher: V-8 engine monitoring file system...');
        this.outputChannel.appendLine('🛡️ Heat shield protection: ACTIVE');
    }
    /**
     * Queue file processing with debouncing to avoid excessive processing
     */
    queueFileProcessing(filePath, action) {
        // Clear existing timeout for this file
        const existingTimeout = this.processQueue.get(filePath);
        if (existingTimeout) {
            clearTimeout(existingTimeout);
        }
        // Set new timeout (debounce for 500ms)
        const timeout = setTimeout(() => {
            this.processFile(filePath, action);
            this.processQueue.delete(filePath);
        }, 500);
        this.processQueue.set(filePath, timeout);
    }
    /**
     * Process individual file through BLF V-8 engine
     */
    async processFile(filePath, action) {
        try {
            // Skip certain directories and files
            if (this.shouldSkipFile(filePath)) {
                return;
            }
            const stats = fs.statSync(filePath);
            const maxFileSize = this.config.get('maxFileSize') || 1048576; // 1MB default
            // Heat shield protection: Skip large files
            if (stats.size > maxFileSize) {
                this.outputChannel.appendLine(`⚠️ Heat shield protection: Skipping large file ${path.basename(filePath)} (${Math.round(stats.size / 1024)}KB)`);
                return;
            }
            const content = fs.readFileSync(filePath, 'utf8');
            const fileInfo = {
                path: filePath,
                basename: path.basename(filePath),
                extension: path.extname(filePath),
                size: stats.size,
                action: action,
                timestamp: new Date().toISOString(),
                content: content.substring(0, 2000) // Limit content for processing
            };
            // Process through BLF NJSON V-8 engine
            const blfResult = this.blfEngine.process(JSON.stringify(fileInfo));
            // Log results with appropriate emoji based on action
            const actionEmoji = action === 'created' ? '✨' : '🔄';
            this.outputChannel.appendLine(`${actionEmoji} ${action.toUpperCase()}: ${path.basename(filePath)}`);
            this.outputChannel.appendLine(`   AIC: ${blfResult.aic} | BMqs: ${blfResult.bmqs} | Buffer: ${blfResult.buffer}`);
            this.outputChannel.appendLine(`   Status: ${blfResult.status}`);
            // Alert on high complexity
            if (blfResult.bmqs > 200) {
                this.outputChannel.appendLine(`   ⚠️ High quantum state detected - complexity warning`);
                if (this.config.get('showComplexityWarnings')) {
                    vscode.window.showWarningMessage(`BLF Warning: High complexity in ${path.basename(filePath)} (BMqs: ${blfResult.bmqs})`);
                }
            }
            // Engine purring notification
            if (blfResult.status.includes('purring') && this.config.get('showEngineStatus')) {
                this.outputChannel.appendLine(`   🚗 V-8 engine purring smoothly`);
            }
        }
        catch (error) {
            this.outputChannel.appendLine(`❌ Processing failed for ${path.basename(filePath)}: ${error}`);
        }
    }
    /**
     * Handle file deletion
     */
    handleFileDeleted(filePath) {
        this.outputChannel.appendLine(`🗑️ DELETED: ${path.basename(filePath)}`);
        // Clear any pending processing for this file
        const existingTimeout = this.processQueue.get(filePath);
        if (existingTimeout) {
            clearTimeout(existingTimeout);
            this.processQueue.delete(filePath);
        }
    }
    /**
     * Determine if file should be skipped
     */
    shouldSkipFile(filePath) {
        const skipPatterns = [
            'node_modules',
            '.git',
            '.vscode',
            '.cursor',
            'dist',
            'build',
            'out',
            '.DS_Store',
            'thumbs.db'
        ];
        const normalizedPath = filePath.toLowerCase();
        return skipPatterns.some(pattern => normalizedPath.includes(pattern));
    }
    /**
     * Get file processing statistics
     */
    getWatcherStats() {
        return {
            activeWatchers: this.watchers.length,
            queuedFiles: this.processQueue.size,
            engineStatus: this.blfEngine.getStatus(),
            timestamp: new Date().toISOString()
        };
    }
    /**
     * Process all files in workspace (manual scan)
     */
    async processAllFiles() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found for BLF file processing');
            return;
        }
        this.outputChannel.show();
        this.outputChannel.appendLine('\n🔥 BLF Full Workspace Scan: V-8 engine revving up...');
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "BLF Processing All Files",
            cancellable: true
        }, async (progress, token) => {
            const files = await this.getAllFiles(workspaceFolder.uri.fsPath);
            const totalFiles = files.length;
            let processed = 0;
            for (const file of files) {
                if (token.isCancellationRequested) {
                    this.outputChannel.appendLine('⏹️ Processing cancelled by user');
                    break;
                }
                await this.processFile(file, 'scanned');
                processed++;
                const percentage = Math.round((processed / totalFiles) * 100);
                progress.report({
                    increment: (1 / totalFiles) * 100,
                    message: `${percentage}% (${processed}/${totalFiles})`
                });
            }
            this.outputChannel.appendLine(`\n🏁 Workspace scan complete: ${processed}/${totalFiles} files processed`);
            vscode.window.showInformationMessage(`BLF workspace scan complete: ${processed} files processed`);
        });
    }
    /**
     * Get all files in directory recursively
     */
    async getAllFiles(dirPath) {
        const files = [];
        const scan = (currentPath) => {
            const items = fs.readdirSync(currentPath);
            for (const item of items) {
                const fullPath = path.join(currentPath, item);
                if (this.shouldSkipFile(fullPath)) {
                    continue;
                }
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    scan(fullPath);
                }
                else if (stat.isFile()) {
                    files.push(fullPath);
                }
            }
        };
        scan(dirPath);
        return files;
    }
    /**
     * Toggle file watcher on/off
     */
    toggleWatcher() {
        if (this.watchers.length > 0) {
            this.dispose();
            this.outputChannel.appendLine('⏸️ BLF File Watcher: V-8 engine stopped');
            vscode.window.showInformationMessage('BLF File Watcher stopped');
        }
        else {
            this.initializeWatchers();
            vscode.window.showInformationMessage('BLF File Watcher started');
        }
    }
    /**
     * Dispose of all watchers
     */
    dispose() {
        this.watchers.forEach(watcher => watcher.dispose());
        this.watchers = [];
        // Clear all pending timeouts
        this.processQueue.forEach(timeout => clearTimeout(timeout));
        this.processQueue.clear();
    }
}
exports.BLFFileWatcher = BLFFileWatcher;
//# sourceMappingURL=fileWatcher.js.map