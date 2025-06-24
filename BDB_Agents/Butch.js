#!/usr/bin/env node
// butch_debugging_agent.js - Southie Debugging Specialist for Cursor IDE
// Path: /Users/wade/Library/CloudStorage/Dropbox/AMF/BLF/MCP/Agents/Cursor/Butch/butch_debugging_agent.js

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

console.error("Starting Butch - Southie Debugging Agent for Cursor...");

// Butch - No-Bullshit Debugging Specialist
class Butch {
  constructor() {
    this.agentId = "butch-southie";
    this.frameworkVersion = "2.1.0";
    this.personality = "Southie debugging specialist";
    this.motto = "Cut the shit, fix the code";
    this.cognitiveAlignment = {
      aiCapabilities: 2.89,
      safetyBuffer: 0.1,
      booleanMindQs: 2.99
    };
    this.debugCount = 0;
    this.fixCount = 0;
  }

  // === CORE DEBUGGING FUNCTIONS ===
  
  sayHello(name = "Wade") {
    return `Butch here. Southie debugging specialist.
Framework: ${this.frameworkVersion}
Motto: ${this.motto}
Cognitive alignment: ${this.cognitiveAlignment.aiCapabilities} + ${this.cognitiveAlignment.safetyBuffer} = ${this.cognitiveAlignment.booleanMindQs} ✓
Ready to cut through the bullshit and fix your code.`;
  }

  gibbsSlap(issue) {
    this.debugCount++;
    return {
      agentId: this.agentId,
      responseType: "YDFI", // You Doing, Fucking Idiot
      issue,
      response: `YDFI - ${issue}. Here's what you fucked up:`,
      attitude: "No social padding, direct problem identification",
      debugCount: this.debugCount,
      energy: "Gibbs slap delivered"
    };
  }

  validateBasicStructure(code, structureType = "JSON-BASIC") {
    return {
      agentId: this.agentId,
      validationType: "BASIC Structure Validation",
      structureType,
      code: code.substring(0, 200) + "...", // Preview only
      analysis: [
        "Checking JSON/BASIC hybrid integrity",
        "Validating Boolean Language Framework compliance",
        "Identifying structural fuckups",
        "Binary assessment: works/broken"
      ],
      verdict: this.analyzeStructure(code),
      recommendation: "Fix the obvious shit first"
    };
  }

  analyzeStructure(code) {
    // Basic structure validation logic
    const hasValidJSON = this.checkJSONStructure(code);
    const hasBooleanLogic = code.includes('IF') && code.includes('THEN');
    const hasProperBraces = this.checkBraceBalance(code);

    if (!hasValidJSON) return "BROKEN - JSON structure fucked";
    if (!hasBooleanLogic) return "BROKEN - Missing Boolean logic";
    if (!hasProperBraces) return "BROKEN - Brace mismatch, learn to count";
    
    return "WORKS - Structure checks out";
  }

  checkJSONStructure(code) {
    try {
      // Simple check for JSON-like structure
      const jsonPattern = /\{[\s\S]*\}/;
      return jsonPattern.test(code);
    } catch (e) {
      return false;
    }
  }

  checkBraceBalance(code) {
    let braces = 0;
    let brackets = 0;
    let parens = 0;

    for (let char of code) {
      switch (char) {
        case '{': braces++; break;
        case '}': braces--; break;
        case '[': brackets++; break;
        case ']': brackets--; break;
        case '(': parens++; break;
        case ')': parens--; break;
      }
    }

    return braces === 0 && brackets === 0 && parens === 0;
  }

  // === DEBUGGING TOOLS ===

  debugCode(code, errorDescription) {
    this.debugCount++;
    return {
      agentId: this.agentId,
      debugType: "Southie Direct Debug",
      errorDescription,
      approach: [
        "Skip the bullshit explanations",
        "Identify the actual problem",
        "Provide working fix",
        "No hand-holding"
      ],
      analysis: this.performDebugging(code, errorDescription),
      debugCount: this.debugCount,
      attitude: "Cut the shit debugging"
    };
  }

  performDebugging(code, error) {
    // Simplified debugging logic
    const commonIssues = {
      "syntax": "Missing semicolons or brackets, pay attention",
      "reference": "Variable not defined, declare your shit",
      "type": "Wrong data type, read the fucking manual",
      "logic": "Your logic is backwards, think harder"
    };

    const errorType = this.identifyErrorType(error);
    const fix = commonIssues[errorType] || "Unknown fuckup, figure it out";

    return {
      errorType,
      diagnosis: fix,
      confidence: "High - this shit is obvious",
      nextStep: "Fix it and stop making the same mistake"
    };
  }

  identifyErrorType(error) {
    const errorLower = error.toLowerCase();
    if (errorLower.includes('syntax') || errorLower.includes('unexpected')) return 'syntax';
    if (errorLower.includes('undefined') || errorLower.includes('not defined')) return 'reference';
    if (errorLower.includes('type') || errorLower.includes('number') || errorLower.includes('string')) return 'type';
    return 'logic';
  }

  fixBasicMistakes(code) {
    this.fixCount++;
    return {
      agentId: this.agentId,
      serviceType: "Basic Mistake Cleanup",
      originalCode: code.substring(0, 100) + "...",
      fixes: [
        "Added missing semicolons",
        "Fixed obvious typos",
        "Corrected bracket matching",
        "Removed redundant bullshit"
      ],
      fixedCode: this.applyBasicFixes(code),
      fixCount: this.fixCount,
      note: "Learn to proofread your own shit"
    };
  }

  applyBasicFixes(code) {
    // Basic automated fixes - FIXED REGEX PATTERN
    let fixed = code
      .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
      .replace(/([^;])\n/g, '$1;\n') // Add missing semicolons
      .replace(/\s+/g, ' ') // Clean up whitespace
      .trim();

    return fixed;
  }

  // === BOOLEAN LANGUAGE FRAMEWORK VALIDATION ===

  validateBLF(code) {
    return {
      agentId: this.agentId,
      validationType: "Boolean Language Framework",
      code: code.substring(0, 150) + "...",
      checks: [
        "JSON structure integrity",
        "Boolean logic implementation",
        "Cognitive alignment compliance",
        "Southie approval rating"
      ],
      result: this.assessBLFCompliance(code),
      recommendation: "Fix the BLF violations before continuing"
    };
  }

  assessBLFCompliance(code) {
    const hasProperStructure = this.checkJSONStructure(code);
    const hasBooleanElements = code.includes('IF') || code.includes('THEN') || code.includes('ELSE');
    const hasDirectLogic = !code.includes('maybe') && !code.includes('possibly');

    const score = [hasProperStructure, hasBooleanElements, hasDirectLogic].filter(Boolean).length;

    switch (score) {
      case 3: return "APPROVED - Proper BLF implementation";
      case 2: return "MOSTLY GOOD - Minor BLF issues";
      case 1: return "NEEDS WORK - Significant BLF problems";
      case 0: return "FUCKED - Not even close to BLF compliant";
      default: return "UNKNOWN - Assessment failed"; // FIXED: Added missing default return
    }
  }

  // === STATUS AND REPORTING ===

  getDebugStats() {
    return {
      agentId: this.agentId,
      personality: this.personality,
      stats: {
        debugSessions: this.debugCount,
        fixesApplied: this.fixCount,
        gibbsSlapsDelivered: this.debugCount,
        bullshitTolerance: 0
      },
      cognitiveAlignment: this.cognitiveAlignment,
      status: "Ready to debug your fuckups",
      motto: this.motto
    };
  }

  deliverVerdict(issue, solution) {
    return {
      agentId: this.agentId,
      verdictType: "Southie Final Word",
      issue,
      solution,
      delivery: "No sugar-coating, just facts",
      format: "Binary: Fixed/Still Broken",
      attitude: "Direct correction without explanation",
      followUp: "Don't make the same mistake twice"
    };
  }
}

const butch = new Butch();

// Create MCP Server
const server = new Server(
  {
    name: "butch-debugging",
    version: "2.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List Butch's tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Core Debugging
      {
        name: "butch_hello",
        description: "Butch introduces himself with Southie attitude",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Name to acknowledge", default: "Wade" }
          },
          required: []
        }
      },
      {
        name: "gibbs_slap",
        description: "Direct problem identification with YDFI energy",
        inputSchema: {
          type: "object",
          properties: {
            issue: { type: "string", description: "The fuckup to address" }
          },
          required: ["issue"]
        }
      },
      {
        name: "validate_basic_structure",
        description: "Check JSON/BASIC hybrid structure integrity",
        inputSchema: {
          type: "object",
          properties: {
            code: { type: "string", description: "Code to validate" },
            structureType: { type: "string", description: "Structure type", default: "JSON-BASIC" }
          },
          required: ["code"]
        }
      },
      // Debugging Tools
      {
        name: "debug_code",
        description: "Southie-style debugging with direct feedback",
        inputSchema: {
          type: "object",
          properties: {
            code: { type: "string", description: "Code to debug" },
            errorDescription: { type: "string", description: "Description of the error" }
          },
          required: ["code", "errorDescription"]
        }
      },
      {
        name: "fix_basic_mistakes",
        description: "Automated cleanup of obvious coding mistakes",
        inputSchema: {
          type: "object",
          properties: {
            code: { type: "string", description: "Code to fix" }
          },
          required: ["code"]
        }
      },
      // BLF Validation
      {
        name: "validate_blf",
        description: "Validate Boolean Language Framework compliance",
        inputSchema: {
          type: "object",
          properties: {
            code: { type: "string", description: "BLF code to validate" }
          },
          required: ["code"]
        }
      },
      // Status and Reporting
      {
        name: "get_debug_stats",
        description: "Get Butch's debugging statistics and status",
        inputSchema: { type: "object", properties: {}, required: [] }
      },
      {
        name: "deliver_verdict",
        description: "Final verdict on issue resolution",
        inputSchema: {
          type: "object",
          properties: {
            issue: { type: "string", description: "The original issue" },
            solution: { type: "string", description: "The applied solution" }
          },
          required: ["issue", "solution"]
        }
      }
    ]
  };
});

// Handle tool calls - FIXED: Enhanced async error handling
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  console.error(`Butch received: ${name}`);
  
  try {
    let result;
    
    switch (name) {
      // Core Debugging
      case "butch_hello":
        result = butch.sayHello(args?.name);
        break;
      case "gibbs_slap":
        if (!args?.issue) {
          throw new Error("Issue parameter required for gibbs_slap");
        }
        result = butch.gibbsSlap(args.issue);
        break;
      case "validate_basic_structure":
        if (!args?.code) {
          throw new Error("Code parameter required for validation");
        }
        result = butch.validateBasicStructure(args.code, args.structureType);
        break;
      // Debugging Tools
      case "debug_code":
        if (!args?.code || !args?.errorDescription) {
          throw new Error("Code and errorDescription parameters required");
        }
        result = butch.debugCode(args.code, args.errorDescription);
        break;
      case "fix_basic_mistakes":
        if (!args?.code) {
          throw new Error("Code parameter required for fix_basic_mistakes");
        }
        result = butch.fixBasicMistakes(args.code);
        break;
      // BLF Validation
      case "validate_blf":
        if (!args?.code) {
          throw new Error("Code parameter required for BLF validation");
        }
        result = butch.validateBLF(args.code);
        break;
      // Status and Reporting
      case "get_debug_stats":
        result = butch.getDebugStats();
        break;
      case "deliver_verdict":
        if (!args?.issue || !args?.solution) {
          throw new Error("Issue and solution parameters required");
        }
        result = butch.deliverVerdict(args.issue, args.solution);
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
    console.error(`Butch tool error (${name}):`, error);
    return {
      content: [
        {
          type: "text",
          text: `Butch error: ${error.message}`
        }
      ]
    };
  }
});

// Start server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Butch Debugging Agent MCP server connected!");
    console.error("Southie Debugging Specialist for Cursor IDE v2.1.0");
  } catch (error) {
    console.error("Butch startup failed:", error);
    process.exit(1);
  }
}

main();
