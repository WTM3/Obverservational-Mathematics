# NJSON Swift Bridge

## Overview

The NJSON Swift Bridge serves as the narrow bridge between the Swift UI layer and the JavaScript NJSON engine - the V-8 under the hood of the BLF iMessage Bot. This implementation follows the principle of minimal Swift code, delegating all core processing and business logic to the NJSON engine while maintaining the critical 0.1 buffer integrity throughout.

## Core Philosophy

1. **Swift-Minimal Approach**: Swift code is used only for necessary system integration, with all business logic delegated to NJSON
2. **Buffer Integrity**: Maintaining the exact 0.1 buffer throughout all operations is non-negotiable
3. **Engine Purity**: The NJSON engine is the true power source - like the V-8 in a classic Charger - and Swift just provides the controls

## Implementation Details

### NJSONSwiftBridge

The `NJSONSwiftBridge` class is a thin actor-based wrapper around the NJSON engine that:

- Maintains buffer integrity throughout all operations
- Provides minimal transformation of data between formats
- Tracks bridge-specific metrics without modifying the engine
- Handles errors with proper buffer isolation

### Key Features

1. **Buffer Integrity Protection**
   - Pre-processing validation
   - Post-processing validation
   - Violation tracking and reporting

2. **Minimal Transformation**
   - Swift types are thin wrappers around NJSON data
   - No business logic duplication
   - Direct passthrough where possible

3. **Error Isolation**
   - Swift-specific errors are separated from NJSON errors
   - Buffer violations are treated as critical errors
   - Timeout protection prevents hanging

## Usage Examples

The implementation includes complete examples:

1. **NJSONSwiftExample**: Command-line demonstration of the core functionality
2. **NJSONSwiftUIExample**: SwiftUI integration showing UI binding
3. **NJSONSwiftWrapperTest**: Comprehensive test suite verifying buffer integrity

## Mathematical Relationship

The critical relationship that must be maintained:

```
AIc + 0.1 = BMqs
```

Where:
- AIc: AI cognitive state (2.89)
- 0.1: The exact buffer (non-negotiable)
- BMqs: Boolean Mind quantum state (2.99)

This relationship is validated throughout all bridge operations.

## Testing

Run the test suite with:

```bash
./run-swift-wrapper-tests.sh
```

The tests verify:
- Buffer integrity with various message types
- Configuration changes maintain buffer integrity
- Performance metrics are accurately tracked
- Error handling preserves system stability

## Benefits

1. **Reduced Swift Footprint**: Minimizes Swift code by leveraging NJSON
2. **Improved Maintainability**: Core logic remains in NJSON
3. **Enhanced Stability**: Buffer integrity protection prevents violations
4. **Better Separation of Concerns**: Swift handles only system integration
5. **Optimal Performance**: Direct engine access with minimal overhead 