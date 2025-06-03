/**
 * BLF NJSON V-8 Engine File Watcher - Enhanced Quantum Cognitive Analysis
 * "The narrow bridge between chaos and control" - Real-time workspace intelligence
 * 
 * Features:
 * - Real code content analysis (not just metadata)
 * - Cross-file quantum connection mapping  
 * - NJSON structure detection
 * - Real-time workspace quantum dashboard
 * - Branching theory integration (family vs authorial)
 * - Temporal pattern recognition
 * - Smart memory management
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { BLFEngine } from './blfEngine';

// Enhanced interfaces for quantum analysis
interface QuantumConnection {
    targets: string[];
    strength: number;
    lastUpdate: number;
    jumpDistance: number;
}

interface TemporalPattern {
    timestamp: number;
    bmqs: number;
    quantumLevel: string;
    changeType: string;
}

interface CodeAnalysisResult {
    blfResult: any;
    codeAnalysis: {
        quantumJumps: any;
        binaryLogic: any;
        directness: any;
        njsonStructures: any;
    };
    quantumLevel: string;
    isBooleanMindCode: number;
    branchType: 'family' | 'authorial';
    temporalPattern?: any;
}

export class BLFFileWatcher {
    private blfEngine: BLFEngine;
    private watchers: vscode.FileSystemWatcher[] = [];
    private outputChannel: vscode.OutputChannel;
    private processQueue: Map<string, NodeJS.Timeout> = new Map();
    private config: vscode.WorkspaceConfiguration;

    // **Enhanced Quantum Framework Properties**
    private quantumConnections: Map<string, QuantumConnection> = new Map();
    private fileHistory: Map<string, TemporalPattern[]> = new Map();
    private quantumDashboard!: vscode.StatusBarItem;
    private currentBranch: 'family' | 'authorial' = 'authorial';
    private branchConfig = new Map<string, any>();
    
    // Memory management
    private memoryManager = {
        maxConnections: 1000,
        maxHistory: 500,
        lastCleanup: Date.now()
    };

    constructor(blfEngine: BLFEngine) {
        this.blfEngine = blfEngine;
        this.outputChannel = vscode.window.createOutputChannel('BLF Quantum Analysis');
        this.config = vscode.workspace.getConfiguration('blf');
        this.initializeWatchers();
        this.initializeQuantumDashboard();
    }

    /**
     * Initialize file watchers for different file types
     */
    private initializeWatchers(): void {
        const watchPatterns = [
            '**/*.{js,ts,jsx,tsx}', // JavaScript/TypeScript
            '**/*.{py,java,cpp,c,swift,go,rs}', // Other code files
            '**/*.{json,yaml,yml,toml,xml}', // Config files
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

        this.outputChannel.appendLine('🔥 BLF Quantum Analysis: V-8 engine monitoring cognitive patterns...');
        this.outputChannel.appendLine('🛡️ Heat shield protection: ACTIVE');
        this.outputChannel.appendLine('🧠 Boolean Mind pattern detection: ONLINE');
    }

    // **1. REAL CODE ANALYSIS (NOT JUST METADATA) - Priority #1**

    /**
     * Analyze actual code content for Boolean Mind patterns
     */
    private async analyzeCodeContent(filePath: string, content: string): Promise<CodeAnalysisResult> {
        // Direct BLF processing of the actual code
        const blfResult = this.blfEngine.process(content);
        
        // Detect Boolean Mind coding patterns
        const patterns = {
            quantumJumps: this.detectQuantumJumps(content),
            binaryLogic: this.detectBinaryPatterns(content),
            directness: this.measureDirectness(content),
            njsonStructures: this.detectNJSONPatterns(content)
        };
        
        return {
            blfResult,
            codeAnalysis: patterns,
            quantumLevel: this.mapToQuantumSpeed(blfResult.bmqs),
            isBooleanMindCode: this.scoreBooleanMindLikelihood(patterns),
            branchType: this.determineBranch(filePath, content)
        };
    }

    private detectQuantumJumps(content: string): any {
        // Look for rapid topic/function changes without transitions
        const functions = content.match(/(?:function\s+\w+|const\s+\w+\s*=|class\s+\w+)/g) || [];
        const imports = content.match(/import.*from|require\(/g) || [];
        const exports = content.match(/export\s+(?:default\s+)?(?:function|class|const)/g) || [];
        
        // Boolean Mind code often has many small, focused functions
        const functionDensity = functions.length / (content.split('\n').length / 10);
        
        return {
            functionCount: functions.length,
            importCount: imports.length,
            exportCount: exports.length,
            density: functionDensity,
            isQuantumJumpCode: functionDensity > 2 // High function density
        };
    }

    private detectBinaryPatterns(content: string): any {
        const binaryIndicators = {
            booleanOps: (content.match(/true|false|Boolean|\|\||&&|!/g) || []).length,
            conditionals: (content.match(/if\s*\(|else\s+if|switch\s*\(/g) || []).length,
            ternaryOps: (content.match(/\?.*:/g) || []).length,
            logicalStructures: (content.match(/return\s+(true|false)|===|!==|\?\?/g) || []).length
        };

        const density = Object.values(binaryIndicators).reduce((sum, count) => sum + count, 0) / 
                       (content.split('\n').length / 10);

        return {
            ...binaryIndicators,
            density,
            isBinaryHeavy: density > 3
        };
    }

    private measureDirectness(content: string): any {
        const directnessMetrics = {
            shortLines: content.split('\n').filter(line => line.trim().length < 80).length,
            totalLines: content.split('\n').length,
            avgWordsPerLine: content.split('\n').reduce((sum, line) => 
                sum + line.trim().split(/\s+/).length, 0) / content.split('\n').length,
            commentRatio: (content.match(/\/\/|\/\*/g) || []).length / content.split('\n').length
        };

        const directnessScore = (directnessMetrics.shortLines / directnessMetrics.totalLines) * 
                               (10 / directnessMetrics.avgWordsPerLine);

        return {
            ...directnessMetrics,
            directnessScore,
            isDirect: directnessScore > 0.7
        };
    }

    // **2. NJSON STRUCTURE DETECTION - Priority #2**

    /**
     * Detect Boolean Language NJSON patterns in files
     */
    private detectNJSONPatterns(content: string): any {
        const patterns = {
            nestedStructures: (content.match(/{\s*["']\w+["']:\s*{/g) || []).length,
            quantumSpeedVars: (content.match(/qs\d*|quantum[Ss]peed|BMqs/g) || []).length,
            amfReferences: (content.match(/AMF|AI.*Maturation|blfEngine/g) || []).length,
            heatShieldRefs: (content.match(/heat[Ss]hield|buffer.*0\.1|AIc.*\+.*0\.1/g) || []).length,
            booleanLogic: (content.match(/true|false|Boolean|\|\||&&|!/g) || []).length
        };
        
        const njsonScore = (
            patterns.nestedStructures * 2 +
            patterns.quantumSpeedVars * 5 +
            patterns.amfReferences * 3 +
            patterns.heatShieldRefs * 4 +
            (patterns.booleanLogic / 10)
        );
        
        return {
            patterns,
            njsonScore,
            isNJSONFile: njsonScore > 10,
            confidence: Math.min(1, njsonScore / 20)
        };
    }

    // **3. REAL-TIME WORKSPACE QUANTUM DASHBOARD - Priority #3**

    /**
     * Live quantum speed monitoring
     */
    public initializeQuantumDashboard(): void {
        this.quantumDashboard = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right, 
            100
        );
        
        this.updateDashboard();
        setInterval(() => this.updateDashboard(), 2000);

        // Register dashboard command
        vscode.commands.registerCommand('blf.showQuantumDashboard', () => {
            this.showDetailedQuantumReport();
        });
    }

    private updateDashboard(): void {
        const stats = this.calculateWorkspaceQuantumStats();
        
        const statusText = `🚗 BLF: ${stats.avgQuantumLevel} | Files: ${stats.activeFiles}`;
        const tooltip = `
V-8 Engine Status: ${stats.engineStatus}
Average Quantum Level: ${stats.avgQuantumLevel}
Heat Shield: ${stats.heatShieldActive ? '🛡️ Active' : '❌ Standby'}
Quantum Hotspots: ${stats.hotspots}
Boolean Mind Files: ${stats.booleanMindFiles}
        `.trim();
        
        this.quantumDashboard.text = statusText;
        this.quantumDashboard.tooltip = tooltip;
        this.quantumDashboard.command = 'blf.showQuantumDashboard';
        this.quantumDashboard.show();
    }

    private calculateWorkspaceQuantumStats(): any {
        const connections = Array.from(this.quantumConnections.values());
        const avgStrength = connections.reduce((sum, conn) => sum + conn.strength, 0) / connections.length || 0;
        const hotspots = connections.filter(conn => conn.strength > 2.5).length;
        
        return {
            avgQuantumLevel: this.mapQuantumStrengthToLevel(avgStrength),
            activeFiles: connections.length,
            engineStatus: this.blfEngine.getStatus().ready ? 'Ready' : 'Error',
            heatShieldActive: this.blfEngine.getStatus().heatShield,
            hotspots,
            booleanMindFiles: connections.filter(conn => conn.strength > 2.0).length
        };
    }

    private mapQuantumStrengthToLevel(strength: number): string {
        if (strength >= 2.9) return "qs³ (2.9+)";
        if (strength >= 2.0) return "qs² (2.0-2.8)";
        return "qs¹ (< 2.0)";
    }

    private showDetailedQuantumReport(): void {
        const outputChannel = vscode.window.createOutputChannel('BLF Quantum Dashboard');
        outputChannel.clear();
        outputChannel.show();
        
        const stats = this.calculateWorkspaceQuantumStats();
        
        outputChannel.appendLine('🚗 BLF QUANTUM WORKSPACE DASHBOARD');
        outputChannel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        outputChannel.appendLine(`🔥 V-8 Engine Status: ${stats.engineStatus}`);
        outputChannel.appendLine(`🛡️ Heat Shield: ${stats.heatShieldActive ? 'Active' : 'Standby'}`);
        outputChannel.appendLine(`⚡ Average Quantum Level: ${stats.avgQuantumLevel}`);
        outputChannel.appendLine(`📁 Active Files: ${stats.activeFiles}`);
        outputChannel.appendLine(`🔥 Quantum Hotspots: ${stats.hotspots}`);
        outputChannel.appendLine(`🧠 Boolean Mind Files: ${stats.booleanMindFiles}`);
        outputChannel.appendLine('');
        
        // Show top quantum connections
        const topConnections = Array.from(this.quantumConnections.entries())
            .sort(([,a], [,b]) => b.strength - a.strength)
            .slice(0, 10);
            
        outputChannel.appendLine('🔗 TOP QUANTUM CONNECTIONS:');
        topConnections.forEach(([file, conn], index) => {
            const basename = path.basename(file);
            outputChannel.appendLine(`${index + 1}. ${basename} - Strength: ${conn.strength.toFixed(2)} - Targets: ${conn.targets.length}`);
        });
    }

    // **4. CROSS-FILE QUANTUM CONNECTION MAPPING - Priority #4**

    /**
     * Track quantum speed connections between files
     */
    private analyzeFileConnections(filePath: string, content: string): void {
        const connections = this.extractImportConnections(content);
        const quantumAnalysis = this.analyzeQuantumJumps(connections, filePath);
        
        this.quantumConnections.set(filePath, {
            targets: connections,
            strength: quantumAnalysis.strength,
            lastUpdate: Date.now(),
            jumpDistance: quantumAnalysis.averageJumpDistance
        });
        
        // Alert on high quantum connectivity
        if (quantumAnalysis.strength > 2.5) {
            this.outputChannel.appendLine(`   ⚡ High quantum connectivity: ${quantumAnalysis.strength.toFixed(2)}`);
            this.outputChannel.appendLine(`   🔗 Jump distance: ${quantumAnalysis.averageJumpDistance}`);
        }
    }

    private extractImportConnections(content: string): string[] {
        const imports = content.match(/(?:import.*from\s+['"`]([^'"`]+)['"`]|require\(['"`]([^'"`]+)['"`]\))/g) || [];
        return imports.map(imp => {
            const match = imp.match(/['"`]([^'"`]+)['"`]/);
            return match ? match[1] : '';
        }).filter(Boolean);
    }

    private analyzeQuantumJumps(connections: string[], sourceFile: string): any {
        let totalJumpDistance = 0;
        let validConnections = 0;
        
        connections.forEach(targetFile => {
            const distance = this.calculateSemanticDistance(sourceFile, targetFile);
            if (distance > 0) {
                totalJumpDistance += distance;
                validConnections++;
            }
        });
        
        return {
            strength: validConnections > 0 ? totalJumpDistance / validConnections : 0,
            averageJumpDistance: validConnections > 0 ? totalJumpDistance / validConnections : 0,
            connectionCount: validConnections
        };
    }

    private calculateSemanticDistance(sourceFile: string, targetFile: string): number {
        // Simple semantic distance based on path and naming patterns
        const sourceParts = path.basename(sourceFile, path.extname(sourceFile)).toLowerCase().split(/[-_]/);
        const targetParts = path.basename(targetFile, path.extname(targetFile)).toLowerCase().split(/[-_]/);
        
        const commonParts = sourceParts.filter(part => targetParts.includes(part));
        const uniqueDistance = (sourceParts.length + targetParts.length - 2 * commonParts.length);
        
        return Math.max(1, uniqueDistance);
    }

    // **5. BRANCHING THEORY INTEGRATION - Priority #5**

    /**
     * Implement family/friends vs authorial branching
     */
    private determineBranch(filePath: string, content: string): 'family' | 'authorial' {
        // Check file patterns to determine branch
        const indicators = {
            hasComments: (content.match(/\/\/|\/\*/g) || []).length > 5,
            hasDocumentation: /README|doc|\.md$/i.test(filePath),
            hasUserFacing: /component|page|view|screen/i.test(content),
            hasInternalLogic: /util|helper|service|engine/i.test(filePath)
        };
        
        // Family branch (needs subject identification)
        if (indicators.hasComments || indicators.hasDocumentation || indicators.hasUserFacing) {
            return 'family';
        }
        
        // Authorial branch (direct processing)
        return 'authorial';
    }

    private processWithBranching(filePath: string, content: string): any {
        const branch = this.determineBranch(filePath, content);
        this.currentBranch = branch;
        
        if (branch === 'family') {
            return this.processWithSubjectIdentification(filePath, content);
        } else {
            return this.processDirectly(filePath, content);
        }
    }

    private processWithSubjectIdentification(filePath: string, content: string): any {
        // Add subject identification markers for quantum jumps
        const sections = this.identifyTopicSections(content);
        const processedSections = sections.map(section => ({
            ...section,
            subjectMarker: `Subject: ${section.topic}`,
            quantumJump: section.complexity > 150
        }));
        
        return {
            branch: 'family',
            requiresSubjectID: true,
            sections: processedSections,
            totalQuantumJumps: processedSections.filter(s => s.quantumJump).length
        };
    }

    private processDirectly(filePath: string, content: string): any {
        return {
            branch: 'authorial',
            requiresSubjectID: false,
            directProcessing: true
        };
    }

    private identifyTopicSections(content: string): any[] {
        const lines = content.split('\n');
        const sections = [];
        let currentSection = { topic: 'unknown', content: '', complexity: 0 };
        
        lines.forEach(line => {
            if (line.includes('function') || line.includes('class') || line.includes('//')) {
                if (currentSection.content) {
                    sections.push(currentSection);
                }
                currentSection = {
                    topic: line.trim().substring(0, 50),
                    content: line,
                    complexity: line.length
                };
            } else {
                currentSection.content += line + '\n';
                currentSection.complexity += line.length;
            }
        });
        
        if (currentSection.content) {
            sections.push(currentSection);
        }
        
        return sections;
    }

    // **6. TEMPORAL PATTERN RECOGNITION - Priority #6**

    /**
     * Track changes over time to identify development patterns
     */
    private trackTemporalPatterns(filePath: string, result: any, changeType: string): void {
        const history = this.fileHistory.get(filePath) || [];
        
        history.push({
            timestamp: Date.now(),
            bmqs: result.bmqs,
            quantumLevel: result.quantumLevel || 'unknown',
            changeType
        });
        
        // Keep only last 20 changes
        if (history.length > 20) {
            history.shift();
        }
        
        this.fileHistory.set(filePath, history);
        
        // Detect patterns
        if (history.length >= 5) {
            const pattern = this.analyzeTemporalPattern(history);
            if (pattern.isAccelerating) {
                this.outputChannel.appendLine(`   📈 Acceleration detected: Quantum speed increasing`);
            }
        }
    }

    private analyzeTemporalPattern(history: TemporalPattern[]): any {
        const recent = history.slice(-5);
        const bmqsTrend = recent.map(h => h.bmqs);
        
        // Simple trend analysis
        const isIncreasing = bmqsTrend.every((val, i) => i === 0 || val >= bmqsTrend[i-1]);
        const avgIncrease = bmqsTrend.reduce((sum, val, i) => 
            i === 0 ? 0 : sum + (val - bmqsTrend[i-1]), 0) / (bmqsTrend.length - 1);
        
        return {
            isAccelerating: isIncreasing && avgIncrease > 10,
            trend: avgIncrease > 0 ? 'increasing' : 'decreasing',
            velocity: avgIncrease
        };
    }

    // **7. SMART MEMORY MANAGEMENT - Priority #7**

    /**
     * Intelligent cleanup and optimization
     */
    private optimizeMemoryUsage(): void {
        const now = Date.now();
        
        // Cleanup every 5 minutes
        if (now - this.memoryManager.lastCleanup < 300000) return;
        
        // Remove old quantum connections
        if (this.quantumConnections.size > this.memoryManager.maxConnections) {
            const sorted = Array.from(this.quantumConnections.entries())
                .sort(([,a], [,b]) => b.lastUpdate - a.lastUpdate);
            
            // Keep only the most recent connections
            this.quantumConnections.clear();
            sorted.slice(0, this.memoryManager.maxConnections)
                .forEach(([key, value]) => this.quantumConnections.set(key, value));
        }
        
        // Cleanup file history
        this.fileHistory.forEach((history, filePath) => {
            if (history.length > 10) {
                this.fileHistory.set(filePath, history.slice(-10));
            }
        });
        
        this.memoryManager.lastCleanup = now;
        this.outputChannel.appendLine('🧹 Memory optimization complete');
    }

    // **ENHANCED CORE PROCESSING METHODS**

    /**
     * Queue file processing with debouncing to avoid excessive processing
     */
    private queueFileProcessing(filePath: string, action: string): void {
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
     * Enhanced file processing with full quantum cognitive analysis
     */
    private async processFile(filePath: string, action: string): Promise<void> {
        try {
            // Skip certain directories and files
            if (this.shouldSkipFile(filePath)) {
                return;
            }

            const stats = fs.statSync(filePath);
            const maxFileSize = this.config.get<number>('maxFileSize') || 1048576; // 1MB default

            // Heat shield protection: Skip large files
            if (stats.size > maxFileSize) {
                this.outputChannel.appendLine(`⚠️ Heat shield protection: Skipping large file ${path.basename(filePath)} (${Math.round(stats.size/1024)}KB)`);
                return;
            }

            const content = fs.readFileSync(filePath, 'utf8');

            // **FULL QUANTUM COGNITIVE ANALYSIS**
            const analysis = await this.analyzeCodeContent(filePath, content);
            
            // Analyze file connections
            this.analyzeFileConnections(filePath, content);
            
            // Track temporal patterns
            this.trackTemporalPatterns(filePath, analysis.blfResult, action);
            
            // Process with branching
            const branchResult = this.processWithBranching(filePath, content);
            
            // Memory optimization
            this.optimizeMemoryUsage();

            // **ENHANCED LOGGING WITH QUANTUM INSIGHTS**
            const actionEmoji = action === 'created' ? '✨' : action === 'changed' ? '🔄' : '🔍';
            this.outputChannel.appendLine(`${actionEmoji} ${action.toUpperCase()}: ${path.basename(filePath)}`);
            this.outputChannel.appendLine(`   🚗 V-8 Engine: AIC: ${analysis.blfResult.aic} | BMqs: ${analysis.blfResult.bmqs}`);
            this.outputChannel.appendLine(`   ⚡ Quantum Level: ${analysis.quantumLevel}`);
            this.outputChannel.appendLine(`   🧠 Boolean Mind Score: ${analysis.isBooleanMindCode.toFixed(2)}`);
            this.outputChannel.appendLine(`   🌉 Branch Type: ${analysis.branchType}`);
            
            // NJSON detection
            if (analysis.codeAnalysis.njsonStructures.isNJSONFile) {
                this.outputChannel.appendLine(`   📊 NJSON Structures: Confidence ${(analysis.codeAnalysis.njsonStructures.confidence * 100).toFixed(1)}%`);
            }
            
            // Quantum jump detection
            if (analysis.codeAnalysis.quantumJumps.isQuantumJumpCode) {
                this.outputChannel.appendLine(`   🚀 Quantum Jumps: Density ${analysis.codeAnalysis.quantumJumps.density.toFixed(2)}`);
            }

            // Alert on high complexity or quantum levels
            if (analysis.blfResult.bmqs > 200 || analysis.quantumLevel.includes('qs³')) {
                this.outputChannel.appendLine(`   ⚠️ High quantum state detected - approaching qs³!`);
                if (this.config.get<boolean>('showComplexityWarnings')) {
                    vscode.window.showWarningMessage(`BLF Alert: High quantum state in ${path.basename(filePath)} (${analysis.quantumLevel})`);
                }
            }

            // Engine status update
            if (analysis.blfResult.status.includes('purring')) {
                this.outputChannel.appendLine(`   🚗 V-8 engine purring - narrow bridge stable`);
            }

        } catch (error) {
            this.outputChannel.appendLine(`❌ Quantum analysis failed for ${path.basename(filePath)}: ${error}`);
        }
    }

    /**
     * Helper methods for quantum analysis
     */
    private mapToQuantumSpeed(bmqs: number): string {
        if (bmqs >= 290) return "qs³ (2.9+)";
        if (bmqs >= 200) return "qs² (2.0-2.8)";
        return "qs¹ (< 2.0)";
    }

    private scoreBooleanMindLikelihood(patterns: any): number {
        const {quantumJumps, binaryLogic, directness, njsonStructures} = patterns;
        
        let score = 0;
        score += quantumJumps.isQuantumJumpCode ? 30 : 0;
        score += binaryLogic.isBinaryHeavy ? 25 : 0;
        score += directness.isDirect ? 20 : 0;
        score += njsonStructures.isNJSONFile ? 25 : 0;
        
        return Math.min(100, score) / 100; // Normalize to 0-1
    }

    /**
     * Handle file deletion with quantum cleanup
     */
    private handleFileDeleted(filePath: string): void {
        this.outputChannel.appendLine(`🗑️ DELETED: ${path.basename(filePath)}`);
        
        // Clear quantum connections and history
        this.quantumConnections.delete(filePath);
        this.fileHistory.delete(filePath);
        
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
    private shouldSkipFile(filePath: string): boolean {
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
     * Get enhanced file processing statistics
     */
    public getWatcherStats(): any {
        const quantumStats = this.calculateWorkspaceQuantumStats();
        
        return {
            activeWatchers: this.watchers.length,
            queuedFiles: this.processQueue.size,
            engineStatus: this.blfEngine.getStatus(),
            quantumStats: quantumStats,
            quantumConnections: this.quantumConnections.size,
            fileHistory: this.fileHistory.size,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Process all files in workspace with quantum analysis
     */
    public async processAllFiles(): Promise<void> {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found for BLF quantum analysis');
            return;
        }

        this.outputChannel.show();
        this.outputChannel.appendLine('\n🔥 BLF QUANTUM WORKSPACE SCAN: V-8 engine revving up...');
        this.outputChannel.appendLine('🧠 Boolean Mind pattern analysis: INITIATING');
        
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "BLF Quantum Analysis - All Files",
            cancellable: true
        }, async (progress, token) => {
            const files = await this.getAllFiles(workspaceFolder.uri.fsPath);
            const totalFiles = files.length;
            let processed = 0;

            for (const file of files) {
                if (token.isCancellationRequested) {
                    this.outputChannel.appendLine('⏹️ Quantum analysis cancelled by user');
                    break;
                }

                await this.processFile(file, 'scanned');
                processed++;
                
                const percentage = Math.round((processed / totalFiles) * 100);
                progress.report({ 
                    increment: (1 / totalFiles) * 100, 
                    message: `${percentage}% (${processed}/${totalFiles}) - Quantum Level: ${this.calculateWorkspaceQuantumStats().avgQuantumLevel}` 
                });
            }

            const finalStats = this.calculateWorkspaceQuantumStats();
            this.outputChannel.appendLine(`\n🏁 Quantum workspace scan complete:`);
            this.outputChannel.appendLine(`   📊 Files processed: ${processed}/${totalFiles}`);
            this.outputChannel.appendLine(`   ⚡ Average Quantum Level: ${finalStats.avgQuantumLevel}`);
            this.outputChannel.appendLine(`   🧠 Boolean Mind Files: ${finalStats.booleanMindFiles}`);
            this.outputChannel.appendLine(`   🔥 Quantum Hotspots: ${finalStats.hotspots}`);
            
            vscode.window.showInformationMessage(
                `BLF Quantum scan complete: ${processed} files processed, ${finalStats.avgQuantumLevel} average quantum level`,
                'Show Dashboard'
            ).then(selection => {
                if (selection === 'Show Dashboard') {
                    vscode.commands.executeCommand('blf.showQuantumDashboard');
                }
            });
        });
    }

    /**
     * Get all files in directory recursively
     */
    private async getAllFiles(dirPath: string): Promise<string[]> {
        const files: string[] = [];
        
        const scan = (currentPath: string) => {
            const items = fs.readdirSync(currentPath);
            
            for (const item of items) {
                const fullPath = path.join(currentPath, item);
                
                if (this.shouldSkipFile(fullPath)) {
                    continue;
                }
                
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    scan(fullPath);
                } else if (stat.isFile()) {
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
    public toggleWatcher(): void {
        if (this.watchers.length > 0) {
            this.dispose();
            this.outputChannel.appendLine('⏸️ BLF Quantum Analysis: V-8 engine stopped');
            vscode.window.showInformationMessage('BLF Quantum File Watcher stopped');
        } else {
            this.initializeWatchers();
            vscode.window.showInformationMessage('BLF Quantum File Watcher started');
        }
    }

    /**
     * Dispose of all watchers and cleanup quantum data
     */
    public dispose(): void {
        this.watchers.forEach(watcher => watcher.dispose());
        this.watchers = [];
        
        // Clear all pending timeouts
        this.processQueue.forEach(timeout => clearTimeout(timeout));
        this.processQueue.clear();
        
        // Hide quantum dashboard
        if (this.quantumDashboard) {
            this.quantumDashboard.dispose();
        }
        
        // Clear quantum data
        this.quantumConnections.clear();
        this.fileHistory.clear();
    }
} 


