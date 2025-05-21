#!/bin/bash

# update-njson-swift-bridge.sh
# Updates both the AGENT_HANDOFF and database with NJSON Swift Bridge information
# Preserves the 0.1 buffer integrity throughout all operations

echo "🏎️ NJSON Swift Bridge - Update Script"
echo "====================================="
echo "Updating the narrow bridge between Swift and the V-8 engine"
echo ""

# Change to script directory
cd "$(dirname "$0")"

# Check for node
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is required but not installed."
    exit 1
fi

# Check for database
if [ ! -f "../blf-database.db" ]; then
    echo "⚠️ Warning: Database file not found. This may be expected for a first-time setup."
    echo "Creating an empty database file..."
    touch "../blf-database.db"
fi

# Check for sqlite3 module
if [ ! -d "../node_modules/sqlite3" ]; then
    echo "📦 Installing required dependencies..."
    cd ..
    npm install sqlite3
    cd - > /dev/null
    echo ""
fi

# Run database update script
echo "⚙️ Applying database updates..."
node Core/db-updates/apply-njson-bridge.js

# Check result
if [ $? -ne 0 ]; then
    echo "❌ Database update failed."
    exit 1
fi

echo ""
echo "✅ Update completed successfully"
echo "The narrow bridge between Swift and NJSON has been recorded"
echo "Buffer integrity (0.1) has been maintained throughout" 