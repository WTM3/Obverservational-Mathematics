#!/bin/bash

# BLF NJSON V-8 Engine - Cursor Installation Script
# "The narrow bridge between chaos and control" installation

echo "🎯 Installing BLF NJSON V-8 Engine Extension in Cursor..."
echo "=================================="

# Get the current directory (where the extension is)
EXTENSION_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXTENSION_NAME="blf-njson-engine-1.0.0"

# Cursor extensions directory
CURSOR_EXTENSIONS_DIR="$HOME/.cursor/extensions"

# Create Cursor extensions directory if it doesn't exist
if [ ! -d "$CURSOR_EXTENSIONS_DIR" ]; then
    echo "📁 Creating Cursor extensions directory..."
    mkdir -p "$CURSOR_EXTENSIONS_DIR"
fi

# Target installation directory
TARGET_DIR="$CURSOR_EXTENSIONS_DIR/$EXTENSION_NAME"

# Remove existing installation if it exists
if [ -d "$TARGET_DIR" ]; then
    echo "🗑️ Removing existing BLF extension..."
    rm -rf "$TARGET_DIR"
fi

# Copy extension to Cursor extensions directory
echo "📦 Installing BLF NJSON V-8 Engine..."
cp -r "$EXTENSION_DIR" "$TARGET_DIR"

# Verify installation
if [ -d "$TARGET_DIR" ] && [ -f "$TARGET_DIR/package.json" ]; then
    echo "✅ BLF NJSON V-8 Engine successfully installed!"
    echo ""
    echo "🔄 Next Steps:"
    echo "1. Restart Cursor completely"
    echo "2. Press Cmd+Shift+P to open Command Palette"
    echo "3. Type 'BLF:' to see available commands:"
    echo "   - 🎯 BLF: Process Text through BLF NJSON V-8 Engine"
    echo "   - 🚗 BLF: BLF Engine Status Report"
    echo "   - 🧮 BLF: Validate BLF Mathematical Precision"
    echo "   - 🌉 BLF: Process Selected Text with BLF"
    echo ""
    echo "🧪 Test it by selecting some text and right-clicking!"
    echo ""
    echo "🏁 The V-8 engine is ready to purr in Cursor!"
    echo "🌉 The narrow bridge between chaos and control is now active in your editor."
else
    echo "❌ Installation failed. Check permissions and try again."
    exit 1
fi 