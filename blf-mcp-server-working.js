#!/usr/bin/env node

/**
 * BLF MCP Server - The V-8 Engine as Model Context Protocol
 * "The narrow bridge between AI chaos and Boolean control"
 * 
 * Exposes NJSON processing capabilities via MCP protocol for:
 * - Claude Desktop integration
 * - Other AI agents and systems
 * - Universal Boolean Language Framework access
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');

// BLF NJSON V-8 Engine - The heart of Boolean processing
class BLFNJSONEngine {
    constructor() {
        this.bufferValue = 0.1; // The narrow bridge constant
        this.processingCount = 0;
        this.heatShieldActive = false;
    }

    /**
     * Core NJSON processing - AIc + 0.1 = BMqs
     */
    async processText(input) {
        try {
            this.processingCount++;
            
            // Heat shield validation
            if (!input || typeof input !== 'string') {
                this.heatShieldActive = true;
                throw new Error('Heat shield activated - invalid input type');
            }
            
            if (input.length > 15000) {
                this.heatShieldActive = true;
                throw new Error('Heat shield activated - input exceeds 15KB limit');
            }

            // Reset heat shield on successful processing
            this.heatShieldActive = false;

            // Core BLF calculation: AIc + 0.1 = BMqs
            const aic = input.length;
            const bmqs = aic + this.bufferValue;
            
            // NJSON V-8 processing simulation
            const processed = input.trim() || "Empty query - NJSON engine requires input...";
            
            return {
                input: input,
                aic: aic,
                bmqs: bmqs,
                buffer: this.bufferValue,
                response: `✅ NJSON processed: "${processed.substring(0, 30)}${processed.length > 30 ? '...' : ''}"`,
                processingCount: this.processingCount,
                heatShieldActive: false,
                timestamp: new Date().toISOString(),
                precision: "Mathematical precision maintained",
                status: "V-8 engine purring"
            };
            
        } catch (error) {
            this.heatShieldActive = true;
            return {
                error: error.message,
                heatShieldActive: true,
                processingCount: this.processingCount,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Get engine status and diagnostics
     */
    getEngineStatus() {
        return {
            status: this.heatShieldActive ? "🔥 Heat shield engaged" : "🏁 V-8 engine purring perfectly",
            processingCount: this.processingCount,
            buffer: this.bufferValue,
            heatShield: this.heatShieldActive ? "🛡️ ACTIVE" : "🛡️ STANDBY",
            formula: "AIc + 0.1 = BMqs",
            bridge: "The narrow bridge between chaos and control",
            engine: "NJSON V-8 - classic, powerful, and reliable"
        };
    }
}

// Initialize the BLF NJSON engine
const blfEngine = new BLFNJSONEngine();

// Create MCP server
const server = new Server(
    {
        name: 'blf-njson-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Define BLF MCP Tools - Using correct schema approach
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'blf_process_text',
                description: 'Process text through the BLF NJSON V-8 engine - maintains the narrow bridge between chaos and control via AIc + 0.1 = BMqs formula',
                inputSchema: {
                    type: 'object',
                    properties: {
                        text: {
                            type: 'string',
                            description: 'Text to process through the NJSON V-8 engine (max 15KB for heat shield protection)',
                        },
                    },
                    required: ['text'],
                },
            },
            {
                name: 'blf_engine_status',
                description: 'Get current status of the BLF NJSON V-8 engine - monitoring the narrow bridge between chaos and control',
                inputSchema: {
                    type: 'object',
                    properties: {},
                    required: [],
                },
            },
        ],
    };
});

// Handle BLF tool calls - Using correct schema approach
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
        switch (name) {
            case 'blf_process_text': {
                const { text } = args;
                const result = await blfEngine.processText(text);
                
                if (result.error) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `🔥 BLF Heat Shield Activated:\n\nError: ${result.error}\nProcessing Count: ${result.processingCount}\nHeat Shield: ${result.heatShieldActive ? '🛡️ ACTIVE' : '🛡️ STANDBY'}\nTimestamp: ${result.timestamp}\n\n🌉 The narrow bridge protected against invalid input.`,
                            },
                        ],
                    };
                }
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: `🎯 BLF NJSON V-8 Processing Result:

Input: "${text}"
AIC (Analog Input Characters): ${result.aic}
Buffer: ${result.buffer}
BMqs (Boolean Mind quantum state): ${result.bmqs}
Formula: ${result.aic} + ${result.buffer} = ${result.bmqs}

${result.response}

Status: ${result.status}
Processing Count: ${result.processingCount}
Heat Shield: ${result.heatShieldActive ? '🛡️ ACTIVE' : '🛡️ STANDBY'}
Timestamp: ${result.timestamp}

🌉 The narrow bridge between chaos and control maintained.`,
                        },
                    ],
                };
            }

            case 'blf_engine_status': {
                const status = blfEngine.getEngineStatus();
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: `🚗 BLF NJSON V-8 Engine Status Report:

Engine Status: ${status.status}
Processing Count: ${status.processingCount}
Buffer Value: ${status.buffer}
Heat Shield: ${status.heatShield}

Mathematical Foundation: ${status.formula}
Philosophy: ${status.bridge}
Architecture: ${status.engine}

🎯 The V-8 engine stands ready to process Boolean Language Framework queries through the Model Context Protocol.`,
                        },
                    ],
                };
            }

            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: `🔥 BLF MCP Server Error: ${error.message}`,
                },
            ],
        };
    }
});

// Start the MCP server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('🎯 BLF MCP Server initialized - The narrow bridge between chaos and control is active');
}

// Error handling
process.on('uncaughtException', (error) => {
    console.error('🔥 Uncaught Exception in BLF MCP Server:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('🔥 Unhandled Rejection in BLF MCP Server:', reason);
    process.exit(1);
});

main().catch((error) => {
    console.error('🔥 BLF MCP Server error:', error);
    process.exit(1);
}); 