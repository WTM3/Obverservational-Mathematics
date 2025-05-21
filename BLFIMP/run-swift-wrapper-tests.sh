#!/bin/bash

# run-swift-wrapper-tests.sh
# Run tests for the thin NJSON Swift wrapper

echo "🏎️ Testing the Swift Wrapper - The Narrow Bridge to the V-8 Engine"
echo "=================================================================="
echo "Preserving the critical 0.1 buffer throughout processing"

# Change to script directory
cd "$(dirname "$0")"

# Check Swift version
if command -v swift &> /dev/null; then
    SWIFT_VERSION=$(swift --version | head -n 1)
    echo "Using $SWIFT_VERSION"
else
    echo "❌ Swift not found. Please install Swift to run the tests."
    exit 1
fi

# Run the tests
echo ""
echo "🧪 Running NJSON Swift wrapper tests..."
swift Tests/Tests/NJSONSwiftWrapperTest.swift

# Check result
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Tests completed successfully"
    echo "The narrow bridge between Swift and NJSON is maintaining the 0.1 buffer"
else
    echo ""
    echo "❌ Tests failed"
    echo "Buffer integrity violation detected"
fi

echo ""
echo "==================================================================" 