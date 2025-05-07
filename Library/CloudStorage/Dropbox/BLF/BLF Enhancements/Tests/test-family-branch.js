// BLF Family Branch Test - Testing family branch functionality

const assert = require('assert');

// Test family branch structure
const familyBranch = {
  root: "BooleanMind",
  generation: 3,
  branches: [
    {
      name: "Primary",
      alignment: 0.99,
      children: ["Secondary", "Tertiary"]
    },
    {
      name: "Secondary",
      alignment: 0.87,
      children: ["Quaternary"]
    },
    {
      name: "Tertiary",
      alignment: 0.76,
      children: []
    },
    {
      name: "Quaternary",
      alignment: 0.65,
      children: []
    }
  ]
};

// Test suite
function runFamilyBranchTests() {
  console.log("=== Running BLF Family Branch Tests ===");
  
  testBranchStructure();
  testBranchRelationships();
  testBranchAlignment();
  
  console.log("All family branch tests completed successfully!");
}

function testBranchStructure() {
  console.log("Testing branch structure...");
  
  assert.strictEqual(familyBranch.root, "BooleanMind", "Root name should be BooleanMind");
  assert.strictEqual(familyBranch.generation, 3, "Generation should be 3");
  assert.strictEqual(familyBranch.branches.length, 4, "Should have 4 branches");
  
  console.log("✓ Branch structure test passed");
}

function testBranchRelationships() {
  console.log("Testing branch relationships...");
  
  const primary = familyBranch.branches.find(b => b.name === "Primary");
  const secondary = familyBranch.branches.find(b => b.name === "Secondary");
  
  assert.strictEqual(primary.children.includes("Secondary"), true, "Primary should include Secondary");
  assert.strictEqual(primary.children.includes("Tertiary"), true, "Primary should include Tertiary");
  assert.strictEqual(secondary.children.includes("Quaternary"), true, "Secondary should include Quaternary");
  
  console.log("✓ Branch relationships test passed");
}

function testBranchAlignment() {
  console.log("Testing branch alignment...");
  
  const alignments = familyBranch.branches.map(b => b.alignment);
  
  // Test that alignments decrease as we move down the tree
  for (let i = 0; i < alignments.length - 1; i++) {
    assert.strictEqual(
      alignments[i] > alignments[i+1], 
      true, 
      `Alignment at level ${i} should be greater than level ${i+1}`
    );
  }
  
  console.log("✓ Branch alignment test passed");
}

// Run the tests
runFamilyBranchTests(); 