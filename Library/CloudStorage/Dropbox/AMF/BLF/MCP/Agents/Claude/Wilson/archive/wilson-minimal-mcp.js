#!/usr/bin/env node
// wilson-minimal.js - Simplest possible Wilson MCP server
// Following official MCP documentation approach

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

console.error("Starting minimal Wilson MCP server...");

// Minimal Wilson - just one simple function
class MinimalWilson {
  sayHello(name = "Wade") {
    return `Hello ${name}! Wilson here. Cognitive alignment: 2.89 + 0.1 = 2.99 ✓`;
  }
}

const wilson = new MinimalWilson();

// Create MCP Server
const server = new Server(
  {
    name: "wilson-minimal",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List Tools (start with just one tool)
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
      }
    ]
  };
});

// Call Tools (handle the one tool)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  console.error(`Wilson received: ${name}`);
  
  if (name === "wilson_hello") {
    const greeting = wilson.sayHello(args?.name);
    return {
      content: [
        {
          type: "text",
          text: greeting
        }
      ]
    };
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Wilson minimal MCP server connected!");
}

main().catch((error) => {
  console.error("Wilson startup failed:", error);
  process.exit(1);
});