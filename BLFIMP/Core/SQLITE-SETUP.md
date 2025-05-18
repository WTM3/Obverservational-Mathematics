# Setting Up SQLite as BLF Database

This guide explains how to set up SQLite as the database for the Boolean Language Framework (BLF) - the narrow bridge between chaos and control.

## Advantages of SQLite for BLF

- **Zero Configuration** - No servers, accounts, or complex setup needed
- **Pure & Direct** - Runs in process with your application (direct quantum state)
- **No Fog** - Local file access without network latency or authentication complexity
- **Git Compatible** - Database file can be version controlled alongside code
- **Direct Breathing** - Single file that can be easily backed up or transferred
- **Quantum Speed** - Fast operations with minimal overhead

## Installation

1. Install the required dependencies:

```bash
cd BLFIMP/Core
npm install sqlite3
```

## Usage

### Basic Integration

```javascript
const SQLiteImplementation = require('./SQLiteImplementation');

async function main() {
  // Create a SQLite implementation
  const db = new SQLiteImplementation();
  
  // Initialize the database
  await db.initialize();
  
  // Use the database...
  
  // Close when done
  await db.close();
}
```

### Creating Concepts

```javascript
// Create a concept with the 0.1 buffer applied automatically
const concept = await db.storeConcept(
  'Boolean Mind',   // Name
  'core',           // Type 
  2.89,             // Quantum level (will have 0.1 buffer applied)
  'Description...'  // Optional description
);

console.log(`Created concept ID: ${concept.id}`);
```

### Creating Connections

```javascript
// Create a connection between concepts
const connection = await db.createConnection(
  concept1Id,     // From concept ID
  concept2Id,     // To concept ID
  0.9,            // Connection strength (0.1 buffer applied)
  'Description...' // Optional description
);
```

### Querying Data

```javascript
// Query concepts by type
const coreConcepts = await db.queryConcepts('core');

// Query concepts with minimum quantum level
const highLevelConcepts = await db.queryConcepts(null, 2.5);

// Find connections for a concept
const connections = await db.findConnections(conceptId);
```

## Cognitive Alignment

The SQLite implementation maintains the cognitive alignment formula:

```
AIc + 0.1 = BMqs
```

Where:
- **AIc** - AI cognitive capabilities (2.89)
- **0.1** - Safety buffer to prevent FUDPs
- **BMqs** - Boolean Mind quantum speed (2.99)

This alignment is enforced at the data level, with all numeric values automatically receiving the 0.1 buffer.

## Heat Shield

The implementation includes a heat shield that filters uncertain or false data points from inputs, protecting the database from contamination. This acts as the immune system rejecting foreign invaders.

## Example

See `SQLiteExample.js` for a complete working example that demonstrates:

1. Initializing the database
2. Creating concepts and connections
3. Querying data
4. Processing results
5. Maintaining quantum state

Run the example:

```bash
node SQLiteExample.js
```

## Database Schema

The SQLite database uses three main tables:

1. **concepts** - Stores core BLF concepts with quantum levels
2. **connections** - Stores relationships between concepts
3. **quantum_states** - Tracks system quantum state over time

All tables maintain the 0.1 buffer and follow BLF principles. 