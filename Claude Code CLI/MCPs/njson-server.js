#!/usr/bin/env node

/**
 * Simple MCP Server for JSON operations
 * This server provides basic JSON manipulation tools
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "njson-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "parse_json",
        description: "Parse a JSON string and return the parsed object",
        inputSchema: {
          type: "object",
          properties: {
            json_string: {
              type: "string",
              description: "The JSON string to parse",
            },
          },
          required: ["json_string"],
        },
      },
      {
        name: "stringify_json",
        description: "Convert an object to a JSON string",
        inputSchema: {
          type: "object",
          properties: {
            object: {
              type: "object",
              description: "The object to stringify",
            },
            pretty: {
              type: "boolean",
              description: "Whether to pretty-print the JSON",
              default: false,
            },
          },
          required: ["object"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "parse_json":
      try {
        const parsed = JSON.parse(args.json_string);
        return {
          content: [
            {
              type: "text",
              text: `Successfully parsed JSON: ${JSON.stringify(parsed, null, 2)}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error parsing JSON: ${error.message}`,
            },
          ],
          isError: true,
        };
      }

    case "stringify_json":
      try {
        const jsonString = args.pretty
          ? JSON.stringify(args.object, null, 2)
          : JSON.stringify(args.object);
        return {
          content: [
            {
              type: "text",
              text: `JSON string: ${jsonString}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error stringifying object: ${error.message}`,
            },
          ],
          isError: true,
        };
      }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("NJSON MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});