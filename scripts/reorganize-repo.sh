#!/bin/bash

echo "🔄 Reorganizing BLF Repository Structure..."

# Create main organizational directories
mkdir -p platform/web
mkdir -p platform/ios
mkdir -p platform/node
mkdir -p docs
mkdir -p scripts
mkdir -p archive
mkdir -p core

echo "📁 Created organizational directories"

# Move web platform files
echo "🌐 Organizing web platform files..."
mv blf-messaging-platform.js platform/web/
mv blf-messaging-ui.html platform/web/
mv test-blf-messaging-platform.js platform/web/
mv BLF-MESSAGING-PLATFORM-README.md platform/web/
mv tsconfig.json platform/web/
mv package.json platform/web/
mv package-lock.json platform/web/

# Move iOS platform files (keep in current location but note in docs)
echo "📱 Organizing iOS platform files..."
# iOS files are already properly organized in Sources/ and Package.swift

# Move Node.js/MCP platform files
echo "🚀 Organizing Node.js platform files..."
mv blf-mcp-server.js platform/node/
mv blf-mcp-server-working.js platform/node/
mv blf-mcp-server-corrected.js platform/node/
mv test-blf-server-corrected.js platform/node/

# Move documentation
echo "📚 Organizing documentation..."
mv CLAUDE-CODE-CLI-TEST-PROMPT.md docs/
mv BLF-MESSAGING-PLATFORM-README.md docs/ 2>/dev/null || true
mv iOS-BLF-Messaging-README.md docs/
mv iOS-BLF-COMPLETION-SUMMARY.md docs/
mv SAVE-STATE-SUMMARY.md docs/
mv DEPLOYMENT-READY-SUMMARY.md docs/
mv Updated_OM_Core_Formulas_with_ASPD.md docs/
mv Observational_Mathematics_README.md docs/
mv BLF-*.md docs/ 2>/dev/null || true
mv *.md docs/ 2>/dev/null || true

# Move scripts
echo "🔧 Organizing scripts..."
mv *.sh scripts/ 2>/dev/null || true
mv build-*.sh scripts/ 2>/dev/null || true
mv run-*.sh scripts/ 2>/dev/null || true
mv start-*.sh scripts/ 2>/dev/null || true
mv install-*.sh scripts/ 2>/dev/null || true

# Move core files
echo "⚡ Organizing core files..."
mv AMF.js core/
mv test-quantum-blf-engine.js core/
mv runBLFCommands.js core/
mv react-to-db.js core/

# Move test files to archive
echo "🗄️ Archiving test files..."
mv test-*.swift archive/ 2>/dev/null || true
mv test-*.js archive/ 2>/dev/null || true
mv quick-test.* archive/ 2>/dev/null || true

# Clean up temporary and duplicate files
echo "🧹 Cleaning up..."
rm -f test-input.swift 2>/dev/null || true

# Move config files to appropriate locations
mv claude-desktop-config.json platform/node/
mv claude_config_update.json platform/node/

echo "✅ Repository reorganization complete!"
echo ""
echo "📁 New structure:"
echo "├── platform/"
echo "│   ├── web/     (Web-based messaging platform)"
echo "│   ├── ios/     (iOS Swift app - see Sources/)"
echo "│   └── node/    (Node.js/MCP servers)"
echo "├── docs/        (All documentation)"
echo "├── scripts/     (Build and deployment scripts)"
echo "├── core/        (Core AMF/BLF engine files)"
echo "├── archive/     (Test files and legacy code)"
echo "└── Sources/     (iOS Swift Package structure)" 