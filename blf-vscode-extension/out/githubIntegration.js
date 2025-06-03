"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubIntegration = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
class GitHubIntegration {
    constructor(blfEngine) {
        this.blfEngine = blfEngine;
        this.outputChannel = vscode.window.createOutputChannel('BLF GitHub Bridge');
    }
    /**
     * Process repository structure through BLF NJSON V-8 engine
     */
    async processRepository() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found for BLF repository processing');
            return;
        }
        this.outputChannel.show();
        this.outputChannel.appendLine('🔥 BLF GitHub Bridge: V-8 engine firing up...');
        this.outputChannel.appendLine('🛡️ Heat shield protection: ACTIVE');
        try {
            const repoAnalysis = await this.analyzeRepository(workspaceFolder.uri.fsPath);
            const blfResult = this.blfEngine.process(JSON.stringify(repoAnalysis));
            this.outputChannel.appendLine('\n📊 Repository Analysis Complete:');
            this.outputChannel.appendLine(`📁 Total Files: ${repoAnalysis.totalFiles}`);
            this.outputChannel.appendLine(`📝 Code Files: ${repoAnalysis.codeFiles}`);
            this.outputChannel.appendLine(`🔧 Config Files: ${repoAnalysis.configFiles}`);
            this.outputChannel.appendLine(`📖 Documentation Files: ${repoAnalysis.docFiles}`);
            this.outputChannel.appendLine('\n🚗 BLF V-8 Engine Results:');
            this.outputChannel.appendLine(`AIC (Analog Input Characters): ${blfResult.aic}`);
            this.outputChannel.appendLine(`BMqs (Boolean Mind quantum state): ${blfResult.bmqs}`);
            this.outputChannel.appendLine(`Status: ${blfResult.status}`);
            this.outputChannel.appendLine(`Buffer Bridge (0.1): ${blfResult.buffer}`);
            // Generate repository health report
            const healthScore = this.calculateRepositoryHealth(repoAnalysis, blfResult);
            this.outputChannel.appendLine(`\n🏁 Repository Health Score: ${healthScore}/100`);
            if (healthScore < 70) {
                this.outputChannel.appendLine('⚠️ Heat shield warning: Repository complexity approaching critical levels');
            }
        }
        catch (error) {
            this.outputChannel.appendLine(`❌ Bridge connection failed: ${error}`);
            vscode.window.showErrorMessage('BLF GitHub Bridge: V-8 engine stalled');
        }
    }
    /**
     * Process individual file changes through BLF engine
     */
    async processFileChange(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const fileInfo = {
                path: filePath,
                size: content.length,
                extension: path.extname(filePath),
                content: content.substring(0, 1000) // First 1000 chars for analysis
            };
            const blfResult = this.blfEngine.process(JSON.stringify(fileInfo));
            this.outputChannel.appendLine(`\n🔄 File Change Processed: ${path.basename(filePath)}`);
            this.outputChannel.appendLine(`AIC: ${blfResult.aic} | BMqs: ${blfResult.bmqs} | ${blfResult.status}`);
        }
        catch (error) {
            this.outputChannel.appendLine(`❌ File processing failed: ${filePath} - ${error}`);
        }
    }
    /**
     * Analyze repository structure and metrics
     */
    async analyzeRepository(rootPath) {
        const analysis = {
            totalFiles: 0,
            codeFiles: 0,
            configFiles: 0,
            docFiles: 0,
            directories: 0,
            totalSize: 0,
            fileTypes: new Map(),
            complexity: 0
        };
        const scanDirectory = (dirPath) => {
            const items = fs.readdirSync(dirPath);
            for (const item of items) {
                const fullPath = path.join(dirPath, item);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    if (!item.startsWith('.') && item !== 'node_modules') {
                        analysis.directories++;
                        scanDirectory(fullPath);
                    }
                }
                else {
                    analysis.totalFiles++;
                    analysis.totalSize += stat.size;
                    const ext = path.extname(item).toLowerCase();
                    analysis.fileTypes.set(ext, (analysis.fileTypes.get(ext) || 0) + 1);
                    // Categorize files
                    if (['.js', '.ts', '.py', '.java', '.cpp', '.c', '.swift', '.go', '.rs'].includes(ext)) {
                        analysis.codeFiles++;
                        analysis.complexity += stat.size / 1000; // Rough complexity metric
                    }
                    else if (['.json', '.yaml', '.yml', '.toml', '.xml', '.ini'].includes(ext)) {
                        analysis.configFiles++;
                    }
                    else if (['.md', '.txt', '.rst', '.adoc'].includes(ext)) {
                        analysis.docFiles++;
                    }
                }
            }
        };
        scanDirectory(rootPath);
        return {
            ...analysis,
            fileTypes: Object.fromEntries(analysis.fileTypes)
        };
    }
    /**
     * Calculate repository health score based on BLF analysis
     */
    calculateRepositoryHealth(repoAnalysis, blfResult) {
        let score = 100;
        // Deduct points for complexity
        if (repoAnalysis.complexity > 1000)
            score -= 20;
        if (repoAnalysis.totalFiles > 500)
            score -= 15;
        // Bonus points for good structure
        if (repoAnalysis.docFiles > 0)
            score += 5;
        if (repoAnalysis.configFiles > 0)
            score += 5;
        // BLF engine insights
        if (blfResult.bmqs > 100)
            score -= 10; // High quantum state indicates complexity
        if (blfResult.status.includes('purring'))
            score += 10; // Engine running smoothly
        return Math.max(0, Math.min(100, score));
    }
    /**
     * Generate BLF repository report
     */
    async generateRepositoryReport() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder)
            return;
        try {
            const repoAnalysis = await this.analyzeRepository(workspaceFolder.uri.fsPath);
            const blfResult = this.blfEngine.process(JSON.stringify(repoAnalysis));
            const report = `# BLF Repository Analysis Report
## Generated by V-8 Engine with Heat Shield Protection

### Repository Metrics
- **Total Files**: ${repoAnalysis.totalFiles}
- **Code Files**: ${repoAnalysis.codeFiles}
- **Documentation**: ${repoAnalysis.docFiles}
- **Configuration**: ${repoAnalysis.configFiles}
- **Directories**: ${repoAnalysis.directories}
- **Total Size**: ${Math.round(repoAnalysis.totalSize / 1024)}KB

### BLF NJSON Analysis
- **AIC (Analog Input Characters)**: ${blfResult.aic}
- **BMqs (Boolean Mind quantum state)**: ${blfResult.bmqs}
- **Buffer Bridge**: ${blfResult.buffer} (the narrow bridge between chaos and control)
- **Engine Status**: ${blfResult.status}

### Health Assessment
- **Repository Health**: ${this.calculateRepositoryHealth(repoAnalysis, blfResult)}/100
- **Complexity Index**: ${Math.round(repoAnalysis.complexity)}

---
*Report generated by BLF NJSON V-8 Engine - "Classic, powerful, and reliable, like the black Charger's engine"*
`;
            // Save report
            const reportPath = path.join(workspaceFolder.uri.fsPath, 'BLF-REPOSITORY-REPORT.md');
            fs.writeFileSync(reportPath, report);
            // Open report
            const doc = await vscode.workspace.openTextDocument(reportPath);
            await vscode.window.showTextDocument(doc);
            vscode.window.showInformationMessage('BLF Repository Report generated successfully!');
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to generate BLF report: ${error}`);
        }
    }
}
exports.GitHubIntegration = GitHubIntegration;
//# sourceMappingURL=githubIntegration.js.map