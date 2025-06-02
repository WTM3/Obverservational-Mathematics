#!/bin/bash

# BLF MCP Server Startup Script
# The narrow bridge between chaos and control

# Set GitHub token for MCP GitHub integration
export GITHUB_TOKEN=your_github_token_here

# Install MCP dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "🔧 Installing MCP dependencies..."
    npm install
fi

# Start the BLF MCP server for Claude Desktop integration
echo "🚀 Starting BLF MCP Server - The V-8 under the hood..."
echo "📡 Server will run on stdio for Claude Desktop connection"
echo "🧠 Cognitive formula: AIc(2.89) + 0.1 = BMqs(2.99)"
echo "==============================================="

node blf-mcp-server.js

# This script provides the narrow bridge between chaos and control
# by enabling Claude Desktop to access the BLF cognitive engine 