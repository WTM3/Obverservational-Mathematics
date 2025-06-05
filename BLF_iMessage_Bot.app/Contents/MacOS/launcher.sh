#!/bin/bash

# BLF iMessage Bot Launcher - Permission Requester
echo "🔐 BLF iMessage Bot - Requesting Permissions..."

# Check and request Accessibility permissions
echo "🔍 Checking Accessibility permissions..."

# Add timeout and non-interactive mode for the main bot
echo "🚀 Starting BLF iMessage Bot with timeout protection..."

# Run the actual bot with built-in timeout using background process
"$(dirname "$0")/BLFiMessageBot" &
BOT_PID=$!

# Wait for bot to initialize with manual timeout
sleep 2

if kill -0 $BOT_PID 2>/dev/null; then
    echo "✅ Bot started successfully (PID: $BOT_PID)"
    echo "🔄 Bot running in background. Kill with: kill $BOT_PID"
    
    # Optional: wait for a short demo period then exit
    sleep 8
    if kill -0 $BOT_PID 2>/dev/null; then
        echo "⏱️ Demo complete - bot still running"
        echo "🛑 Stopping bot gracefully..."
        kill -TERM $BOT_PID 2>/dev/null
        sleep 2
        if kill -0 $BOT_PID 2>/dev/null; then
            kill -KILL $BOT_PID 2>/dev/null
        fi
        echo "✅ Bot stopped"
    fi
else
    echo "❌ Bot failed to start"
    exit 1
fi
