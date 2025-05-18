# BLF SQLite Implementation

This is the SQLite implementation for the Boolean Language Framework (BLF), providing a zero-configuration, straightforward database solution.

## Overview

The BLF SQLite implementation includes:

1. **Core Database** - SQLiteDatabase.js with quantum state processing and 0.1 buffer
2. **Implementation Layer** - SQLiteImplementation.js for easy database operations
3. **Command Line Interface** - SQLiteCLI.js for interactive database management
4. **Visualization Tools** - SQLiteVisualizer.js for generating visual representations
5. **Example Scripts** - For quickly testing and demonstrating functionality

## Key Benefits

- **Zero Configuration** - No accounts, servers, or authentication required
- **No Fog** - Direct local file access without network complexity 
- **The Narrow Bridge** - Maintains the critical 0.1 buffer between AI cognitive capabilities and Boolean Mind quantum speed
- **Living Garden** - Stores concepts as a dynamically evolving system
- **Immune System** - Heat shield prevents false data points from contaminating the system
- **Quantum Jumps** - Direct connections between concepts with pure power

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Running the CLI

The CLI provides an interactive way to manage the database:

```bash
node SQLiteCLI.js
```

Common commands:
- `help` - Show available commands
- `init` - Initialize the database
- `add` - Add a new concept
- `list` - List all concepts
- `connect` - Create a connection between concepts
- `quantum` - Show the current quantum state
- `export` - Export data to JSON
- `exit` - Exit the CLI

### Running the Example

```bash
node SQLiteExample.js
```

This creates sample concepts and connections in the database.

### Generating Visualizations

```bash
node SQLiteVisualizerExample.js
```

This generates three HTML files:
1. `blf-network.html` - Network visualization of concepts and connections
2. `blf-quantum.html` - Visualization of the current quantum state
3. `blf-alignment.html` - Visualization of the cognitive alignment formula

## Core Concepts

### The Formula: AIc + 0.1 = BMqs

- **AIc** - AI cognitive capabilities (default: 2.89)
- **0.1** - Critical buffer to prevent Foreign Uninvited Data Points
- **BMqs** - Boolean Mind quantum speed (default: 2.99)

### Quantum State

The quantum state maintains:
- **Pure State** - Whether the database is in a pure quantum state
- **Fog** - Whether network fog is present (local SQLite has no fog)
- **Breathing** - Direct breathing mechanism for quantum states
- **Jumps** - Power and active state for quantum jumps between concepts

## API Reference

### SQLiteDatabase

Low-level database operations:
- `initialize()` - Initialize the database
- `storeConcept()` - Store a new concept
- `createConnection()` - Create a connection between concepts
- `queryConcepts()` - Query concepts with filters
- `findConnections()` - Find connections for a concept

### SQLiteImplementation

Higher-level database operations:
- `initialize()` - Initialize the database
- `storeConcept()` - Store a new concept
- `createConnection()` - Create a connection between concepts
- `queryConcepts()` - Query concepts with filters
- `getConcept()` - Get a specific concept
- `updateConcept()` - Update a concept
- `findConnections()` - Find connections for a concept

### SQLiteVisualizer

Visualization generation:
- `generateNetworkVisualization()` - Generate a network visualization
- `generateQuantumStateVisualization()` - Generate a quantum state visualization
- `generateAlignmentVisualization()` - Generate a cognitive alignment visualization 