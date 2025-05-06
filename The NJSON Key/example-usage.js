// Example usage of the Boolean Language Framework (BLF) Processor
// This example demonstrates how to use the BLF processor to process text inputs

const BLFProcessor = require('./blf-processor.js');

async function processText() {
  console.log('=== BLF Text Processing Example ===\n');
  
  // Initialize the processor
  const processor = new BLFProcessor();
  await processor.initialize();
  console.log('BLF Processor initialized with quantum state:', processor.quantumState);
  
  // Example texts to process
  const exampleTexts = [
    "Please summarize the key points of the meeting in a concise manner.",
    "Provide a detailed analysis of all the factors contributing to this issue.",
    "What is the current status of the project and next steps?",
    "Explain the technical architecture in simple terms that anyone can understand."
  ];
  
  // Process each example text
  console.log('\nProcessing example texts:');
  for (const text of exampleTexts) {
    console.log('\n------------------------------');
    console.log(`Original: "${text}"`);
    
    const result = await processor.process(text);
    
    console.log(`Processed: "${result.result}"`);
    console.log('Processing timestamp:', new Date(result.timestamp).toLocaleTimeString());
    console.log('Applied protocols:', 
      `prioritize=${processor.config.responseProtocols.prioritize}`, 
      `eliminate=${processor.config.responseProtocols.eliminate}`
    );
  }
  
  console.log('\n=== Example completed ===');
}

// Run the example
processText().catch(error => {
  console.error('Example error:', error);
}); 