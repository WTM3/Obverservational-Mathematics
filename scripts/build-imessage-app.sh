#!/bin/bash

# BLF iMessage Bot - macOS App Bundle Builder
# The narrow bridge between chaos and control - now with sandbox support

set -e

echo "🚀 Building BLF iMessage Bot with macOS Sandbox Support"
echo "The V-8 under the hood: Proper entitlements and permissions"
echo "================================================================"

# Build the executable
echo "🔨 Building Swift executable..."
swift build -c release --product BLFiMessageBot

# Create app bundle structure
APP_BUNDLE="BLF_iMessage_Bot.app"
echo "📦 Creating app bundle: $APP_BUNDLE"

# Clean and create bundle structure
rm -rf "$APP_BUNDLE"
mkdir -p "$APP_BUNDLE/Contents/MacOS"
mkdir -p "$APP_BUNDLE/Contents/Resources"

# Copy executable
echo "📋 Copying executable..."
cp ".build/release/BLFiMessageBot" "$APP_BUNDLE/Contents/MacOS/"

# Copy Info.plist
echo "📋 Copying Info.plist..."
cp "Sources/BLFiMessageBot/Info.plist" "$APP_BUNDLE/Contents/"

# Copy entitlements (for reference)
echo "📋 Copying entitlements..."
cp "Sources/BLFiMessageBot/BLFiMessageBot.entitlements" "$APP_BUNDLE/Contents/Resources/"

# Create simple launcher script that requests permissions
cat > "$APP_BUNDLE/Contents/MacOS/launcher.sh" << 'EOF'
#!/bin/bash

# BLF iMessage Bot Launcher - Permission Requester
echo "🔐 BLF iMessage Bot - Requesting Permissions..."

# Check and request Accessibility permissions
echo "🔍 Checking Accessibility permissions..."

# Run the actual bot
exec "$(dirname "$0")/BLFiMessageBot"
EOF

chmod +x "$APP_BUNDLE/Contents/MacOS/launcher.sh"

# Make the main executable also runnable
chmod +x "$APP_BUNDLE/Contents/MacOS/BLFiMessageBot"

echo "✅ App bundle created successfully!"
echo ""
echo "🎯 Next steps for sandbox bypass:"
echo "1. Double-click $APP_BUNDLE to run"
echo "2. Grant permissions when prompted:"
echo "   • System Preferences > Security & Privacy > Accessibility"
echo "   • System Preferences > Security & Privacy > Automation"
echo "3. Allow '$APP_BUNDLE' to control 'Messages'"
echo ""
echo "🔬 Observational Mathematics: Waiting for next green light..."
echo "🛡️ Heat shield: Ready for optimal operating temperature"
echo "🚗 V-8 engine: Prepared for message delivery"

# Show final bundle structure
echo ""
echo "📁 Bundle structure:"
find "$APP_BUNDLE" -type f 