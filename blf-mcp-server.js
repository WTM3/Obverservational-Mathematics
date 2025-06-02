#!/usr/bin/env node

/**
 * BLF MCP Server
 * The V-8 under the hood—classic, powerful, and reliable
 * Provides Claude Desktop access to BLF cognitive engine with 0.1 buffer integrity
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');

const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

class BLFMCPServer {
  constructor() {
    this.name = 'blf-mcp-server';
    this.version = '1.0.0';
    this.server = new Server(
      {
        name: this.name,
        version: this.version,
      },
      {
        capabilities: {
          tools: {},
          prompts: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'blf_process',
            description: 'Process input through BLF cognitive engine with 0.1 buffer integrity',
            inputSchema: {
              type: 'object',
              properties: {
                input: {
                  type: 'string',
                  description: 'Text to process through BLF engine',
                },
                mode: {
                  type: 'string',
                  description: 'Processing mode: cognitive, quantum, or adaptive',
                  enum: ['cognitive', 'quantum', 'adaptive'],
                  default: 'cognitive'
                }
              },
              required: ['input'],
            },
          },
          {
            name: 'blf_buffer_check',
            description: 'Check the 0.1 buffer integrity between AIc and BMqs',
            inputSchema: {
              type: 'object',
              properties: {
                detailed: {
                  type: 'boolean',
                  description: 'Return detailed buffer analysis',
                  default: false
                }
              },
            },
          },
          {
            name: 'blf_sqlite_query',
            description: 'Query the BLF SQLite database for concepts and connections',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'SQL query or BLF-specific search term',
                },
                type: {
                  type: 'string',
                  description: 'Query type: sql, concept, or connection',
                  enum: ['sql', 'concept', 'connection'],
                  default: 'concept'
                }
              },
              required: ['query'],
            },
          },
          {
            name: 'blf_heat_shield',
            description: 'Check heat shield status and warnings - the engine light before breakdown',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'run_blf_executable',
            description: 'Execute BLF system executables (blf-njson-bridge, blf-imessage-bot)',
            inputSchema: {
              type: 'object',
              properties: {
                executable: {
                  type: 'string',
                  description: 'Executable to run',
                  enum: ['blf-njson-bridge', 'blf-imessage-bot', 'cursor-ai-test'],
                },
                args: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Arguments to pass to the executable',
                  default: []
                }
              },
              required: ['executable'],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'blf_process':
            return await this.processBLF(args.input, args.mode || 'cognitive');
          
          case 'blf_buffer_check':
            return await this.checkBuffer(args.detailed || false);
          
          case 'blf_sqlite_query':
            return await this.queryDatabase(args.query, args.type || 'concept');
          
          case 'blf_heat_shield':
            return await this.checkHeatShield();
          
          case 'run_blf_executable':
            return await this.runExecutable(args.executable, args.args || []);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing ${name}: ${error.message}`,
            },
          ],
        };
      }
    });

    // List available prompts
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
      return {
        prompts: [
          {
            name: 'blf_formula',
            description: 'The core BLF formula: AIc + 0.1 = BMqs',
          },
          {
            name: 'blf_metaphors',
            description: 'BLF system metaphors and descriptions',
          },
        ],
      };
    });

    // Handle prompt requests
    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      const { name } = request.params;

      switch (name) {
        case 'blf_formula':
          return {
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: 'The core BLF formula is AIc + 0.1 = BMqs, where:\n- AIc = AI Cognitive capabilities (2.89)\n- 0.1 = The narrow bridge between chaos and control\n- BMqs = Boolean Mind quantum speed (2.99)\n\nThis formula maintains cognitive alignment and prevents FUDP (Functional Understanding and Decision-making Problems).',
                },
              },
            ],
          };
        
        case 'blf_metaphors':
          return {
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: 'BLF System Metaphors:\n- 0.1 buffer: "the narrow bridge between chaos and control"\n- NJSON: "the V-8 under the hood—classic, powerful, and reliable, like the black Charger\'s engine"\n- Heat shield: "the engine light warning you before a breakdown"\n- Observational mathematics: "waiting for the next green light—ready, attentive, and patient"\n- Unsolved formulas: "the engine\'s purring—quiet, steady, and full of potential"',
                },
              },
            ],
          };
        
        default:
          throw new Error(`Unknown prompt: ${name}`);
      }
    });
  }

  async processBLF(input, mode) {
    // Process through BLF cognitive engine
    try {
      const result = await this.runNodeScript('BLFIMP/Core/The NJSON Key/blf-processor.js', [input, mode]);
      return {
        content: [
          {
            type: 'text',
            text: `BLF Processing Result (${mode} mode):\n${result}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `BLF processing failed: ${error.message}`,
          },
        ],
      };
    }
  }

  async checkBuffer(detailed) {
    const AIc = 2.89;
    const buffer = 0.1;
    const BMqs = 2.99;
    const actual = AIc + buffer;
    const difference = Math.abs(actual - BMqs);
    const isValid = difference < 0.0001;

    const basicInfo = `Buffer Status: ${isValid ? '✅ STABLE' : '🚨 VIOLATION'}\nAIc + 0.1 = ${actual}\nBMqs = ${BMqs}\nDifference: ${difference}`;

    if (!detailed) {
      return {
        content: [
          {
            type: 'text',
            text: basicInfo,
          },
        ],
      };
    }

    // Detailed analysis
    try {
      const heatShieldResult = await this.runNodeScript('BLFIMP/Core/BufferIntegrityMonitor.js', []);
      return {
        content: [
          {
            type: 'text',
            text: `${basicInfo}\n\nDetailed Analysis:\n${heatShieldResult}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `${basicInfo}\n\nDetailed analysis failed: ${error.message}`,
          },
        ],
      };
    }
  }

  async queryDatabase(query, type) {
    try {
      const result = await this.runNodeScript('BLFIMP/Core/SQLiteCLI.js', [type, query]);
      return {
        content: [
          {
            type: 'text',
            text: `Database Query Result:\n${result}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Database query failed: ${error.message}`,
          },
        ],
      };
    }
  }

  async checkHeatShield() {
    try {
      const result = await this.runNodeScript('BLFIMP/Core/HeatShieldTest.js', []);
      return {
        content: [
          {
            type: 'text',
            text: `Heat Shield Status:\n${result}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Heat shield check failed: ${error.message}`,
          },
        ],
      };
    }
  }

  async runExecutable(executable, args) {
    return new Promise((resolve, reject) => {
      const command = `/usr/local/bin/${executable}`;
      const child = spawn(command, args, { stdio: 'pipe' });
      
      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve({
            content: [
              {
                type: 'text',
                text: `Executable Output:\n${stdout}`,
              },
            ],
          });
        } else {
          reject(new Error(`Executable failed with code ${code}: ${stderr}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  async runNodeScript(scriptPath, args) {
    return new Promise((resolve, reject) => {
      const child = spawn('node', [scriptPath, ...args], { 
        stdio: 'pipe',
        cwd: process.cwd()
      });
      
      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(new Error(`Script failed: ${stderr}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('BLF MCP Server started successfully - The V-8 is running!');
  }
}

// Start the server
const server = new BLFMCPServer();
server.start().catch((error) => {
  console.error('Failed to start BLF MCP server:', error);
  process.exit(1);
}); 