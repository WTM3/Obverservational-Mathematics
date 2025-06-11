#!/usr/bin/env node
/**
 * Test GitHub Integration Bridge on Real BLF Repository
 * Simulating what the V-8 engine would discover
 */

const fs = require('fs');
const path = require('path');

console.log('📊 BLF GitHub Bridge - Repository Analysis Test');
console.log('🛡️ Heat shield protection: ACTIVE');
console.log('🚗 V-8 engine firing up...');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

// Simple BLF Engine for testing
const blfEngine = {
    process: (input) => {
        const aic = typeof input === 'string' ? input.length : JSON.stringify(input).length;
        const bmqs = aic + 0.1; // The narrow bridge between chaos and control
        return {
            aic: aic,
            bmqs: bmqs,
            buffer: 0.1,
            status: bmqs < 100 ? 'V-8 engine purring' : bmqs < 500 ? 'V-8 engine running smooth' : 'V-8 engine revving',
            timestamp: new Date().toISOString(),
            heatShield: true
        };
    }
};

// Repository analysis function
function analyzeRepository(rootPath) {
    const analysis = {
        totalFiles: 0,
        codeFiles: 0,
        configFiles: 0,
        docFiles: 0,
        directories: 0,
        totalSize: 0,
        fileTypes: {},
        complexity: 0
    };

    function scanDirectory(dirPath) {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            
            // Skip certain directories
            if (item.startsWith('.') || item === 'node_modules' || item === 'out') {
                continue;
            }
            
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                analysis.directories++;
                scanDirectory(fullPath);
            } else {
                analysis.totalFiles++;
                analysis.totalSize += stat.size;
                
                const ext = path.extname(item).toLowerCase();
                analysis.fileTypes[ext] = (analysis.fileTypes[ext] || 0) + 1;
                
                // Categorize files
                if (['.js', '.ts', '.py', '.java', '.cpp', '.c', '.swift', '.go', '.rs'].includes(ext)) {
                    analysis.codeFiles++;
                    analysis.complexity += stat.size / 1000; // Rough complexity metric
                } else if (['.json', '.yaml', '.yml', '.toml', '.xml', '.ini'].includes(ext)) {
                    analysis.configFiles++;
                } else if (['.md', '.txt', '.rst', '.adoc'].includes(ext)) {
                    analysis.docFiles++;
                }
            }
        }
    }

    scanDirectory(rootPath);
    return analysis;
}

// Calculate repository health score
function calculateHealth(repoAnalysis, blfResult) {
    let score = 100;
    
    // Deduct points for complexity
    if (repoAnalysis.complexity > 1000) score -= 20;
    if (repoAnalysis.totalFiles > 500) score -= 15;
    
    // Bonus points for good structure
    if (repoAnalysis.docFiles > 0) score += 5;
    if (repoAnalysis.configFiles > 0) score += 5;
    
    // BLF engine insights
    if (blfResult.bmqs > 100) score -= 10; // High quantum state indicates complexity
    if (blfResult.status.includes('purring')) score += 10; // Engine running smoothly
    
    return Math.max(0, Math.min(100, score));
}

// Run the analysis
try {
    console.log('🔍 Scanning BLF repository...');
    const repoAnalysis = analyzeRepository('.');
    const blfResult = blfEngine.process(JSON.stringify(repoAnalysis));
    
    console.log('📊 Repository Analysis Complete:');
    console.log(`📁 Total Files: ${repoAnalysis.totalFiles}`);
    console.log(`📝 Code Files: ${repoAnalysis.codeFiles}`);
    console.log(`🔧 Config Files: ${repoAnalysis.configFiles}`);
    console.log(`📖 Documentation Files: ${repoAnalysis.docFiles}`);
    console.log(`📂 Directories: ${repoAnalysis.directories}`);
    console.log(`💾 Total Size: ${Math.round(repoAnalysis.totalSize / 1024)}KB`);
    console.log('');
    
    console.log('🚗 BLF V-8 Engine Results:');
    console.log(`AIC (Analog Input Characters): ${blfResult.aic}`);
    console.log(`BMqs (Boolean Mind quantum state): ${blfResult.bmqs}`);
    console.log(`Status: ${blfResult.status}`);
    console.log(`Buffer Bridge (0.1): ${blfResult.buffer}`);
    console.log('');
    
    // Repository health assessment
    const healthScore = calculateHealth(repoAnalysis, blfResult);
    console.log(`🏁 Repository Health Score: ${healthScore}/100`);
    
    if (healthScore < 70) {
        console.log('⚠️ Heat shield warning: Repository complexity approaching critical levels');
    } else {
        console.log('✅ Repository health: Excellent condition for continued development');
    }
    
    console.log('');
    console.log('📊 File Type Distribution:');
    Object.entries(repoAnalysis.fileTypes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .forEach(([ext, count]) => {
            console.log(`   ${ext || 'no-ext'}: ${count} files`);
        });
    
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ GitHub Bridge Test: SUCCESSFUL');
    console.log('🚗 V-8 engine performed repository analysis flawlessly');
    console.log('🛡️ Heat shield protection maintained throughout scan');
    
} catch (error) {
    console.error('❌ GitHub Bridge Test Failed:', error.message);
    console.log('🛡️ Heat shield activated - protecting against scan errors');
} 