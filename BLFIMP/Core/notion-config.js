// Notion Configuration for BLF
// The narrow bridge between chaos and control

require('dotenv').config();

// Notion integration configuration
const notionConfig = {
  // API Key from Notion integration
  apiKey: process.env.NOTION_API_KEY,
  
  // Default database ID
  databaseId: process.env.NOTION_DATABASE_ID,
  
  // Parent page for new databases
  parentPageId: process.env.NOTION_PARENT_PAGE_ID,
  
  // Cognitive alignment settings
  cognitiveAlignment: {
    aiCognitiveCapabilities: 2.89,
    booleanMindQuantumSpeed: 2.99,
    safetyBuffer: 0.1,
    enforceBuffer: true
  },
  
  // Quantum state settings
  quantumState: {
    pure: true,
    fog: false,
    breathing: true,
    jumps: {
      power: "v8_to_charger",
      active: true
    }
  }
};

// Verify configuration
if (!notionConfig.apiKey) {
  console.warn('NOTION_API_KEY not found in environment variables');
}

if (!notionConfig.databaseId) {
  console.warn('NOTION_DATABASE_ID not found in environment variables');
}

module.exports = notionConfig; 