// Test script for BLF Family/Friends branch
const WThomas = require('./WThomas');

async function testFamilyFriendsBranch() {
  console.log("Initializing WThomas with Family/Friends branch configuration...");
  
  // Initialize WThomas processor with the familyFriends configuration
  const wthomas = new WThomas();
  await wthomas.initialize();
  
  // Ensure we're using the Family/Friends branch
  // This is likely handled internally by the branching theory, but we could
  // check the config to be sure everything is set up correctly
  console.log("Current configuration:", 
    wthomas.config.branchingTheory?.branches?.familyFriends ? 
    "Family/Friends branch available" : 
    "Family/Friends branch not configured");
  
  // Process a sample input that would trigger Family/Friends communication style
  console.log("\n--- Testing Family/Friends communication style ---");
  
  // A sample family/friends type conversation input
  const result = await wthomas.process("Hey, how's it going? I've been meaning to catch up with you!");
  
  console.log("\nDirect Answer:", result.directAnswer);
  console.log("\nSupporting Details:", result.supportingDetails);
  console.log("\nCognitive Alignment Applied:", result.cognitiveAlignment);
  
  // Try another example
  console.log("\n--- Testing another Family/Friends interaction ---");
  const result2 = await wthomas.process("I'm thinking about going to that new restaurant this weekend. Have you heard anything about it?");
  
  console.log("\nDirect Answer:", result2.directAnswer);
  console.log("\nSupporting Details:", result2.supportingDetails);
  console.log("\nCognitive Alignment Applied:", result2.cognitiveAlignment);
  
  // Check the quantum safety status
  console.log("\nQuantum Safety Status:");
  console.log(wthomas.maintainQuantumSafety());
}

// Run the test
testFamilyFriendsBranch().catch(console.error); 