// Test script for fixed BLF Family/Friends branch
const WThomas = require('./FixedWThomas');

async function testFixedFamilyFriendsBranch() {
  console.log("Initializing Fixed WThomas with Family/Friends branch configuration...");
  
  try {
    // Initialize WThomas processor
    const wthomas = new WThomas();
    await wthomas.initialize();
    
    console.log("Initialization successful");
    
    // Process a sample family/friends style input
    console.log("\n--- Testing Family/Friends style input ---");
    const result = await wthomas.process("Hey, how's it going? I've been meaning to catch up with you!");
    
    // Display the results
    console.log("\nDirect Answer:", result.directAnswer);
    console.log("\nSupporting Details:", result.supportingDetails);
    console.log("\nRelevant Concepts:", result.relevantConcepts);
    console.log("\nCognitive Alignment:", JSON.stringify(result.cognitiveAlignment, null, 2));
    
    // Try another example with a different tone
    console.log("\n--- Testing another Family/Friends interaction ---");
    const result2 = await wthomas.process("I'm thinking about going to that new restaurant this weekend. Have you heard anything about it?");
    
    console.log("\nDirect Answer:", result2.directAnswer);
    console.log("\nSupporting Details:", result2.supportingDetails);
    console.log("\nRelevant Concepts:", result2.relevantConcepts);
    
    // Test the quantum safety status
    console.log("\nQuantum Safety Status:");
    console.log(wthomas.maintainQuantumSafety ? 
                wthomas.maintainQuantumSafety() : 
                "Quantum safety check not available");
                
    return "Test completed successfully";
  } catch (error) {
    console.error("Test failed with error:", error);
    return "Test failed";
  }
}

// Run the test
testFixedFamilyFriendsBranch()
  .then(result => console.log("\nFinal result:", result))
  .catch(error => console.error("Unhandled error:", error)); 