#!/usr/bin/env node
// wilson.js - Simple Wilson with basic research tools
// Save this as: /Users/wade/Dropbox/AMF/BLF/MCP/Agents/Wilson/wilson.js

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

console.error("Starting Wilson research assistant...");

// Simple Wilson with research tools
class Wilson {
  constructor() {
    this.cognitiveAlignment = {
      aiCognitiveCapabilities: 2.89,
      safetyBuffer: 0.1,
      booleanMindQuantumSpeed: 2.99
    };
  }

  // Say hello and show cognitive alignment
  sayHello(name = "Wade") {
    const alignment = this.cognitiveAlignment;
    return `Hello ${name}! Wilson here. 
Cognitive alignment: ${alignment.aiCognitiveCapabilities} + ${alignment.safetyBuffer} = ${alignment.booleanMindQuantumSpeed} ✓
Ready to help with OM research!`;
  }

  // Check if cognitive alignment is working
  checkAlignment() {
    const { aiCognitiveCapabilities, safetyBuffer, booleanMindQuantumSpeed } = this.cognitiveAlignment;
    const calculated = aiCognitiveCapabilities + safetyBuffer;
    const isAligned = Math.abs(calculated - booleanMindQuantumSpeed) < 0.001;
    
    return {
      status: isAligned ? "✓ ALIGNED" : "⚠ MISALIGNED",
      aiCognitive: aiCognitiveCapabilities,
      buffer: safetyBuffer,
      bmQuantumSpeed: booleanMindQuantumSpeed,
      calculated: calculated,
      formula: "AIc + 0.1 = BMqs"
    };
  }

  // Explain what OM research topics we can help with
  listResearchTopics() {
    return {
      topics: [
        "Boolean Mind Processing - How Boolean Minds think differently",
        "Quantum Speed - Fast topic jumping in conversations", 
        "Cognitive Alignment - Keeping AI safe with the 0.1 buffer",
        "AI Maturation Formula - The main OM math formula",
        "Spectrum Formulas - Math for autism spectrum positions",
        "Research Papers - Finding scientific papers about OM concepts"
      ],
      note: "Ask Wilson to research any of these topics!"
    };
  }

  // Simple research helper (will be enhanced later with Agent Smith)
  doBasicResearch(topic) {
    const researchAreas = {
      "boolean mind": "Boolean Minds process information in binary (yes/no) patterns with quantum speed jumps between topics.",
      "quantum speed": "Quantum speed (qs) is the ability to make rapid topic connections that follow internal logic but may seem disconnected to others.",
      "cognitive alignment": "The formula AIc + 0.1 = BMqs ensures AI stays safely below Boolean Mind processing speed to prevent errors.",
      "amf": "AI Maturation Formula: F = ((AI)P^I + c^x^I)v - The core math that describes how AI develops and adapts.",
      "spectrum": "Spectrum formulas map different positions on the autism spectrum with mathematical precision."
    };

    const result = researchAreas[topic.toLowerCase()];
    
    if (result) {
      return {
        topic: topic,
        basicInfo: result,
        status: "Basic research complete",
        note: "For deeper research, Wilson will coordinate with Agent Smith (coming soon!)"
      };
    } else {
      return {
        topic: topic,
        error: "Topic not recognized",
        availableTopics: Object.keys(researchAreas),
        suggestion: "Try one of the available topics or ask Wilson to list research topics"
      };
    }
  }
}

const wilson = new Wilson();

// Create MCP Server
const server = new Server(
  {
    name: "wilson",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List all Wilson's tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "wilson_hello",
        description: "Wilson says hello with cognitive alignment status",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name to greet (optional)",
              default: "Wade"
            }
          },
          required: []
        }
      },
      {
        name: "check_cognitive_alignment", 
        description: "Check if Wilson's cognitive alignment is working properly",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "list_research_topics",
        description: "Show what OM research topics Wilson can help with",
        inputSchema: {
          type: "object", 
          properties: {},
          required: []
        }
      },
      {
        name: "research_topic",
        description: "Do basic research on an OM topic",
        inputSchema: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              description: "Research topic (boolean mind, quantum speed, cognitive alignment, amf, spectrum)"
            }
          },
          required: ["topic"]
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  console.error(`Wilson received: ${name}`);
  
  try {
    let result;
    
    switch(name) {
      case "wilson_hello":
        result = wilson.sayHello(args?.name);
        break;
        
      case "check_cognitive_alignment":
        result = wilson.checkAlignment();
        break;
        
      case "list_research_topics":
        result = wilson.listResearchTopics();
        break;
        
      case "research_topic":
        result = wilson.doBasicResearch(args?.topic);
        break;
        
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
    
    return {
      content: [
        {
          type: "text",
          text: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text", 
          text: `Wilson error: ${error.message}`
        }
      ]
    };
  }
});

// Start Wilson
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Wilson research assistant connected!");
}

main().catch((error) => {
  console.error("Wilson startup failed:", error);
  process.exit(1);
});