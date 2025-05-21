#!/bin/bash

# Run BLF iMessage Bot Tests
# The narrow bridge between development and verification

echo "🧪 Running BLF iMessage Bot Tests..."
echo "Formula: AIc + 0.1 = BMqs"
echo "==============================================="

# Check for xcodebuild
if ! command -v xcodebuild &> /dev/null; then
    echo "❌ Error: xcodebuild not found. Please install Xcode command line tools."
    exit 1
fi

# Set paths
WORKSPACE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_PATH="$WORKSPACE_DIR/../../BLF.xcodeproj"
SCHEME="BLFMessageBot"
TEST_CLASS="BLFMessageBotTests"

echo "🔍 Running tests for $SCHEME..."
echo "📂 Project: $PROJECT_PATH"
echo "🧠 Test Class: $TEST_CLASS"
echo "==============================================="

# Run the tests
xcodebuild test \
    -project "$PROJECT_PATH" \
    -scheme "$SCHEME" \
    -destination 'platform=iOS Simulator,name=iPhone 12' \
    -only-testing:"$TEST_CLASS" \
    | grep -E "Test (Case|Suite|Method)|Executed" --color=auto

# Check result
if [ $? -eq 0 ]; then
    echo "✅ Tests completed successfully"
    echo "🛡️ The narrow bridge maintained its 0.1 buffer integrity"
else
    echo "❌ Tests failed"
    echo "⚠️ Buffer violation detected - see logs for details"
fi 