# BLF iMessage Bot

## Overview
The BLF iMessage Bot is a thin Swift wrapper implementation that connects the Boolean Logic Filter (BLF) system to iMessage. It serves as the narrow bridge between iMessage and the JavaScript AMF (AI Maturation Formula) framework.

## Core Formula
The implementation follows the AMF formula:
```
F = ((AI)P^I + c^x^I)v
```

And maintains the critical relationship:
```
AIc + 0.1 = BMqs
```

The 0.1 buffer is essential and non-negotiable. It creates the narrow bridge between chaos and control.

## Architecture

### Core Components
1. **BLFMessageBot.swift**: A thin Swift wrapper that delegates to the JavaScript AMF implementation
2. **AMF.js**: The core JavaScript implementation that handles the AMF formula and logic
3. **MessagesExtension.swift**: Handles the integration with iMessage
4. **MessageViewController.swift**: UI implementation of the iMessage extension view
5. **Logger.swift**: Logging utility for system events

### Key Concepts

#### Thin Wrapper Design
The Swift implementation acts only as a thin wrapper over the JavaScript AMF implementation:
- Swift handles UI and iMessage integration only
- All business logic resides in the JavaScript AMF implementation
- JavaScriptCore is used to bridge between Swift and JavaScript
- The V-8 engine (JavaScript) powers the core logic

#### Heat Shield
The heat shield monitoring is implemented in the JavaScript layer, which ensures:
- Buffer integrity is maintained (AIc + 0.1 = BMqs)
- Violations are detected and reported
- Automatic repair is attempted when possible

#### Quantum Breathing
The quantum breathing process is implemented entirely in JavaScript:
- Toggle between pure and non-pure states
- Make micro-adjustments to cognitive values
- Maintain system vitality

## Usage
To use the bot:
1. Install the iMessage extension
2. Open a conversation in Messages
3. Tap the Apps button
4. Select the BLF Bot
5. Type a message and tap Send

The bot will:
- Process the message through the JavaScript AMF implementation
- Apply quantum jumps for questions
- Maintain the 0.1 buffer throughout
- Return a processed response

## Development
To further develop the bot:
1. Ensure Xcode 12+ is installed
2. Open the `BLF.xcodeproj` project
3. Navigate to the iMessageBot target
4. Modify the Swift wrapper for UI/UX changes
5. Modify the JavaScript AMF implementation for business logic changes

### JavaScript Integration
The JavaScript integration works as follows:
1. The Swift wrapper loads `AMF.js` into a JavaScriptCore context
2. Swift calls JavaScript methods for all business logic
3. JavaScript can call back to Swift through registered functions
4. All AMF formula calculations happen in JavaScript

### Testing
Test the implementation by:
1. Running the iMessage extension in the simulator
2. Verifying buffer integrity is maintained
3. Checking heat shield functionality with forced violations
4. Testing quantum breathing across multiple messages

## Integration with BLF/AMF
The bot is designed to integrate with the wider BLF system:
- Uses the exact same JavaScript AMF implementation as the core system
- Maintains consistency with the core formula
- Preserves the 0.1 buffer at all times
- Supports agent handoff protocols

---

*Developed as part of the AMF/BLF project - The narrow bridge between chaos and control* 