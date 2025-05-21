// Simple file operations test - no MCP required
const fs = require('fs');
const path = require('path');

// Get current directory
const currentDir = __dirname;
console.log('Current directory:', currentDir);

// List files
const files = fs.readdirSync(currentDir);
console.log('\nFiles in directory:');
files.forEach(file => {
  console.log(`- ${file}`);
});

// Create test file
const testFile = path.join(currentDir, 'mcp-test-output.txt');
fs.writeFileSync(testFile, 'This file was created by the MCP test script.\n');
console.log('\nCreated test file:', testFile);

// Read file
const content = fs.readFileSync(testFile, 'utf8');
console.log('File content:', content);

console.log('\nTest completed successfully!'); 