# 🎯 BLF NJSON V-8 Engine - VS Code Extension

**"The narrow bridge between chaos and control" - now in your editor**

Brings the Boolean Language Framework (BLF) NJSON V-8 Engine directly into VS Code and Cursor, providing real-time text processing with mathematical precision through the **AIc + 0.1 = BMqs** formula.

## 🚗 Features

- **🎯 Text Processing**: Process any text through the BLF NJSON V-8 engine
- **🌉 Selection Processing**: Right-click selected text to process with BLF
- **🚗 Engine Status**: Real-time engine diagnostics and status monitoring
- **🧮 Precision Validation**: Validate mathematical precision across test cases
- **🛡️ Heat Shield Protection**: Automatic input validation and error prevention
- **📊 Status Bar Integration**: Live processing results in VS Code status bar
- **🔧 Configurable**: Adjust buffer value, heat shield settings, and input limits

## 📋 Installation

### Method 1: Install Directly in VS Code/Cursor

1. **Open VS Code or Cursor**

2. **Copy the extension folder to VS Code extensions directory:**
   ```bash
   # For VS Code
   cp -r blf-vscode-extension ~/.vscode/extensions/blf-njson-engine-1.0.0

   # For Cursor
   cp -r blf-vscode-extension ~/.cursor/extensions/blf-njson-engine-1.0.0
   ```

3. **Restart VS Code/Cursor**

4. **Look for BLF commands** in the Command Palette (Cmd+Shift+P):
   - `BLF: Process Text through BLF NJSON V-8 Engine`
   - `BLF: BLF Engine Status Report`
   - `BLF: Validate BLF Mathematical Precision`

### Method 2: Package and Install

1. **Install VSCE (VS Code Extension packager):**
   ```bash
   npm install -g vsce
   ```

2. **Package the extension:**
   ```bash
   cd blf-vscode-extension
   vsce package
   ```

3. **Install the packaged extension:**
   ```bash
   code --install-extension blf-njson-engine-1.0.0.vsix
   ```

## 🎯 Usage

### Processing Text

1. **Command Palette Method:**
   - Press `Cmd+Shift+P`
   - Type "BLF: Process Text"
   - Enter your text in the input box

2. **Selection Method:**
   - Select text in any editor
   - Right-click → "🌉 Process Selected Text with BLF"

### Engine Status

- **Command Palette:** "BLF: BLF Engine Status Report"
- **Click the status bar item** when BLF is processing

### Validation

- **Command Palette:** "BLF: Validate BLF Mathematical Precision"
- Enter custom test cases or use defaults

## 🔧 Configuration

Access BLF settings in VS Code/Cursor preferences:

```json
{
  "blf.heatShieldEnabled": true,
  "blf.maxInputSize": 15000,
  "blf.bufferValue": 0.1
}
```

### Settings Explained

- **`blf.heatShieldEnabled`**: Enable/disable input validation protection
- **`blf.maxInputSize`**: Maximum characters before heat shield activation  
- **`blf.bufferValue`**: The narrow bridge constant (default: 0.1)

## 🧮 Mathematical Foundation

The BLF engine maintains precise calculation through:

```
AIc + 0.1 = BMqs

Where:
- AIc = Analog Input Characters (input.length)
- 0.1 = The narrow bridge between chaos and control
- BMqs = Boolean Mind quantum state
```

## 🛡️ Heat Shield Protection

The heat shield automatically protects against:

- **Invalid input types** (null, undefined, non-string)
- **Oversized inputs** (exceeding configured limit)
- **Processing errors** (maintains system stability)

When activated, you'll see:
```
🔥 BLF Heat Shield Activated:
Error: Heat shield activated - invalid input type
🌉 The narrow bridge protected against invalid input.
```

## 📊 Output Examples

### Successful Processing
```
🎯 BLF NJSON V-8 Processing Result (User Input):

Input: "Hello from the V-8 engine"
AIC (Analog Input Characters): 24
Buffer: 0.1
BMqs (Boolean Mind quantum state): 24.1
Formula: 24 + 0.1 = 24.1

✅ NJSON processed: "Hello from the V-8 engine"

Status: V-8 engine purring
Processing Count: 1
Heat Shield: 🛡️ STANDBY
Timestamp: 2024-06-01T22:32:15.234Z

🌉 The narrow bridge between chaos and control maintained.
```

### Engine Status
```
🚗 BLF NJSON V-8 Engine Status Report:

Engine Status: 🏁 V-8 engine purring perfectly
Processing Count: 5
Buffer Value: 0.1
Heat Shield: 🛡️ STANDBY

Mathematical Foundation: AIc + 0.1 = BMqs
Philosophy: The narrow bridge between chaos and control
Architecture: NJSON V-8 - classic, powerful, and reliable

🎯 The V-8 engine stands ready to process Boolean Language Framework queries.
```

### Precision Validation
```
🧮 BLF Mathematical Precision Validation:

Test Results: 3 tests
Success Rate: 100.0%
All Tests Passed: ✅

Detailed Results:
  • "test" | AIC: 4 | BMqs: 4.1 | Buffer: ✅
  • "hello world" | AIC: 11 | BMqs: 11.1 | Buffer: ✅
  • "BLF V-8 engine" | AIC: 14 | BMqs: 14.1 | Buffer: ✅

🏁 V-8 Engine Status: PURRING PERFECTLY
🌉 Cross-Platform Bridge: STABLE
📋 VS Code Integration: VERIFIED
```

## 🔍 Commands Reference

| Command | Description | Shortcut |
|---------|-------------|----------|
| `BLF: Process Text through BLF NJSON V-8 Engine` | Process custom text input | None |
| `BLF: Process Selected Text with BLF` | Process selected editor text | Right-click menu |
| `BLF: BLF Engine Status Report` | Show engine diagnostics | None |
| `BLF: Validate BLF Mathematical Precision` | Run precision tests | None |

## 🌉 Philosophy

The BLF NJSON V-8 Engine embodies the principle of **"the narrow bridge between chaos and control"** - providing:

- **Mathematical precision** through the AIc + 0.1 = BMqs formula
- **Cognitive alignment** preventing FUDP (Functional Understanding and Decision-making Problems)
- **Heat shield protection** maintaining system integrity
- **Cross-platform stability** across VS Code, Cursor, and Node.js environments

## 🏁 Status Indicators

- 🏁 **V-8 engine purring perfectly** = Normal operation
- 🔥 **Heat shield engaged** = Error state, protection active
- 🛡️ **STANDBY** = Heat shield ready
- 🛡️ **ACTIVE** = Heat shield protecting against invalid input
- 🌉 **Bridge maintained** = Mathematical precision verified

---

**Part of the [AMF/BLF Framework](../README.md) - The narrow bridge between chaos and control** 