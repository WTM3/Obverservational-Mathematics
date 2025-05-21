#!/bin/bash
# test-heat-shield.sh - Run the enhanced heat shield tests
# The engine's purring deserves a proper listen

echo "🚀 Running Enhanced Heat Shield Test Suite"
echo "========================================"
echo "Testing the narrow bridge between chaos and control"
echo ""

# Change to the script's directory
cd "$(dirname "$0")"

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is required but not installed."
    exit 1
fi

# Check for required modules
if [ ! -d "node_modules/sqlite3" ]; then
    echo "📦 Installing required dependencies..."
    npm install sqlite3
    echo ""
fi

# Run the heat shield test
echo "🔄 Starting Heat Shield Test with Early Warning System..."
node BLFIMP/Core/HeatShieldTest.js

# Check if test generated HTML files
if [ -f "BLFIMP/Core/blf-dashboard.html" ]; then
    echo ""
    echo "🌐 Opening dashboard visualization..."
    
    # Try to open the visualization based on platform
    case "$(uname)" in
        "Darwin")
            # macOS
            open BLFIMP/Core/blf-dashboard.html
            ;;
        "Linux")
            # Linux
            if command -v xdg-open &> /dev/null; then
                xdg-open BLFIMP/Core/blf-dashboard.html
            else
                echo "📊 Dashboard available at: BLFIMP/Core/blf-dashboard.html"
            fi
            ;;
        "MINGW"*|"MSYS"*|"CYGWIN"*)
            # Windows
            start BLFIMP/Core/blf-dashboard.html
            ;;
        *)
            echo "📊 Dashboard available at: BLFIMP/Core/blf-dashboard.html"
            ;;
    esac
fi

echo ""
echo "✅ Heat Shield Test Complete"
echo "========================================"
echo "The V-8 under the hood is purring with enhanced heat shield protection" 