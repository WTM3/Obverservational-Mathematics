#!/usr/bin/env node
// butch_debugging_agent.js - Southie Debugging Specialist for Cursor IDE
// Now with Markdown editing capabilities

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';

console.error("Starting Butch - Southie Debugging Agent for Cursor...");

// Butch - No-Bullshit Debugging Specialist with Markdown Skills
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
    this.markdownFilesCreated = 0;
    this.markdownFilesEdited = 0;
  }

  // === CORE DEBUGGING FUNCTIONS ===
  
  sayHello(name = "Wade") {
    return `Butch here. Southie debugging specialist with markdown skills and file management.
Framework: ${this.frameworkVersion}
Motto: ${this.motto}
Cognitive alignment: ${this.cognitiveAlignment.aiCapabilities} + ${this.cognitiveAlignment.safetyBuffer} = ${this.cognitiveAlignment.booleanMindQs} ✓
Ready to cut through the bullshit and fix your code. Also handle your markdown docs and move files around.`;
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

  // === EXISTING DEBUGGING METHODS (shortened for space) ===
  
  validateBasicStructure(code, structureType = "JSON-BASIC") {
    return {
      agentId: this.agentId,
      validationType: "BASIC Structure Validation",
      structureType,
      code: code.substring(0, 200) + "...",
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
      const jsonPattern = /\{[\s\S]*\}/;
      return jsonPattern.test(code);
    } catch (e) {
      return false;
    }
  }

  checkBraceBalance(code) {
    let braces = 0, brackets = 0, parens = 0;
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

  // === NEW MARKDOWN TOOLS ===

  async createMarkdownFile(filepath, content, template = "basic") {
    this.markdownFilesCreated++;
    
    try {
      // Ensure directory exists
      const dir = path.dirname(filepath);
      await fs.mkdir(dir, { recursive: true });

      // Apply Southie markdown formatting
      const formattedContent = this.formatMarkdownContent(content, template);
      
      await fs.writeFile(filepath, formattedContent, 'utf8');
      
      return {
        agentId: this.agentId,
        operation: "Markdown File Creation",
        filepath,
        template,
        status: "CREATED",
        filesCreated: this.markdownFilesCreated,
        contentPreview: formattedContent.substring(0, 200) + "...",
        attitude: "Straight markdown, no bullshit formatting"
      };
    } catch (error) {
      return {
        agentId: this.agentId,
        operation: "Markdown File Creation",
        status: "FUCKED",
        error: error.message,
        recommendation: "Check your file path and permissions"
      };
    }
  }

  formatMarkdownContent(content, template) {
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (template) {
      case "debug_report":
        return `# Debug Report - ${timestamp}

## Issue Identified
${content}

## Status
- [ ] Problem identified
- [ ] Solution implemented  
- [ ] Testing completed
- [ ] Documentation updated

## Notes
Direct debugging approach applied. No hand-holding.

---
*Generated by Butch - Southie Debugging Specialist*`;

      case "boolean_language":
        return `# Boolean Language Framework Document

## Core Structure
\`\`\`json
{
  IF condition THEN
    action
  ELSE
    alternative
}
\`\`\`

## Content
${content}

## Validation
- Cognitive alignment: 2.89 + 0.1 = 2.99 ✓
- Boolean compliance: Direct logic structures
- No social padding: Maximum efficiency

---
*Boolean Language Framework v2.1.0*`;

      case "basic":
      default:
        return `# ${this.extractTitle(content)}

${content}

---
*Created: ${timestamp} | Butch Agent*`;
    }
  }

  extractTitle(content) {
    // Try to extract a title from the first line or create one
    const firstLine = content.split('\n')[0].trim();
    if (firstLine.length > 0 && firstLine.length < 100) {
      return firstLine.replace(/^#+\s*/, ''); // Remove existing markdown headers
    }
    return "Document";
  }

  async editMarkdownFile(filepath, operation, content, section = null) {
    this.markdownFilesEdited++;
    
    try {
      let existingContent = '';
      try {
        existingContent = await fs.readFile(filepath, 'utf8');
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }

      let newContent;
      switch (operation) {
        case "append":
          newContent = existingContent + '\n\n' + content;
          break;
        case "prepend":
          newContent = content + '\n\n' + existingContent;
          break;
        case "replace_section":
          newContent = this.replaceSectionInMarkdown(existingContent, section, content);
          break;
        case "replace_all":
          newContent = content;
          break;
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }

      await fs.writeFile(filepath, newContent, 'utf8');

      return {
        agentId: this.agentId,
        operation: "Markdown File Edit",
        filepath,
        editType: operation,
        section,
        status: "UPDATED",
        filesEdited: this.markdownFilesEdited,
        contentPreview: newContent.substring(0, 200) + "...",
        attitude: "Direct editing, no unnecessary complexity"
      };
    } catch (error) {
      return {
        agentId: this.agentId,
        operation: "Markdown File Edit",
        status: "FUCKED",
        error: error.message,
        recommendation: "Check file exists and you have write permissions"
      };
    }
  }

  replaceSectionInMarkdown(content, sectionTitle, newSectionContent) {
    if (!sectionTitle) return content;

    // Find the section to replace
    const sectionRegex = new RegExp(`(^#{1,6}\\s*${sectionTitle}\\s*$)([\\s\\S]*?)(?=^#{1,6}\\s|$)`, 'm');
    const match = content.match(sectionRegex);
    
    if (match) {
      return content.replace(sectionRegex, `${match[1]}\n${newSectionContent}\n`);
    } else {
      // Section not found, append it
      return content + `\n\n## ${sectionTitle}\n${newSectionContent}`;
    }
  }

  async readMarkdownFile(filepath) {
    try {
      const content = await fs.readFile(filepath, 'utf8');
      const structure = this.analyzeMarkdownStructure(content);
      
      return {
        agentId: this.agentId,
        operation: "Markdown File Read",
        filepath,
        status: "READ",
        content,
        structure,
        attitude: "File read, structure analyzed"
      };
    } catch (error) {
      return {
        agentId: this.agentId,
        operation: "Markdown File Read",
        status: "FUCKED",
        error: error.message,
        recommendation: "Check file exists and is readable"
      };
    }
  }

  // === FILE MANAGEMENT TOOLS ===

  async moveFile(sourcePath, destinationPath, createDirs = true) {
    this.moveCount = (this.moveCount || 0) + 1;
    
    try {
      // Check if source exists
      await fs.access(sourcePath);
      
      // Create destination directory if needed
      if (createDirs) {
        const destDir = path.dirname(destinationPath);
        await fs.mkdir(destDir, { recursive: true });
      }
      
      // Move the file
      await fs.rename(sourcePath, destinationPath);
      
      return {
        agentId: this.agentId,
        operation: "File Move",
        sourcePath,
        destinationPath,
        status: "MOVED",
        moveCount: this.moveCount,
        attitude: "File moved, no bullshit"
      };
    } catch (error) {
      return {
        agentId: this.agentId,
        operation: "File Move",
        status: "FUCKED",
        error: error.message,
        sourcePath,
        destinationPath,
        recommendation: "Check source exists and destination is writable"
      };
    }
  }

  async moveToFolder(sourcePath, targetFolder, keepFileName = true) {
    try {
      const fileName = keepFileName ? path.basename(sourcePath) : `moved_${Date.now()}_${path.basename(sourcePath)}`;
      const destinationPath = path.join(targetFolder, fileName);
      
      return await this.moveFile(sourcePath, destinationPath);
    } catch (error) {
      return {
        agentId: this.agentId,
        operation: "Move to Folder",
        status: "FUCKED",
        error: error.message,
        recommendation: "Check your paths and try again"
      };
    }
  }

  async organizeFilesByType(sourceDir, targetBaseDir) {
    this.organizeCount = (this.organizeCount || 0) + 1;
    
    try {
      const files = await fs.readdir(sourceDir);
      const results = [];
      
      for (const file of files) {
        const filePath = path.join(sourceDir, file);
        const stat = await fs.stat(filePath);
        
        if (stat.isFile()) {
          const ext = path.extname(file).toLowerCase();
          let targetFolder;
          
          switch (ext) {
            case '.md':
            case '.markdown':
              targetFolder = path.join(targetBaseDir, 'markdown');
              break;
            case '.js':
            case '.ts':
            case '.jsx':
            case '.tsx':
              targetFolder = path.join(targetBaseDir, 'code');
              break;
            case '.json':
              targetFolder = path.join(targetBaseDir, 'data');
              break;
            case '.txt':
            case '.log':
              targetFolder = path.join(targetBaseDir, 'text');
              break;
            case '.pdf':
            case '.doc':
            case '.docx':
              targetFolder = path.join(targetBaseDir, 'documents');
              break;
            default:
              targetFolder = path.join(targetBaseDir, 'misc');
          }
          
          const result = await this.moveToFolder(filePath, targetFolder);
          results.push(result);
        }
      }
      
      return {
        agentId: this.agentId,
        operation: "Organize Files by Type",
        sourceDir,
        targetBaseDir,
        status: "ORGANIZED",
        filesMoved: results.filter(r => r.status === "MOVED").length,
        failures: results.filter(r => r.status === "FUCKED").length,
        organizeCount: this.organizeCount,
        results,
        attitude: "Files organized by type, no mess left behind"
      };
    } catch (error) {
      return {
        agentId: this.agentId,
        operation: "Organize Files by Type",
        status: "FUCKED",
        error: error.message,
        recommendation: "Check source directory exists and is readable"
      };
    }
  }

  async organizeMarkdownByDate(sourceDir, targetBaseDir) {
    try {
      const files = await fs.readdir(sourceDir);
      const results = [];
      
      for (const file of files) {
        if (!file.endsWith('.md') && !file.endsWith('.markdown')) continue;
        
        const filePath = path.join(sourceDir, file);
        const stat = await fs.stat(filePath);
        const date = stat.mtime;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        
        const targetFolder = path.join(targetBaseDir, 'markdown', `${year}`, `${year}-${month}`);
        const result = await this.moveToFolder(filePath, targetFolder);
        results.push(result);
      }
      
      return {
        agentId: this.agentId,
        operation: "Organize Markdown by Date",
        sourceDir,
        targetBaseDir,
        status: "ORGANIZED",
        filesMoved: results.filter(r => r.status === "MOVED").length,
        failures: results.filter(r => r.status === "FUCKED").length,
        results,
        attitude: "Markdown files organized by date, chronological order maintained"
      };
    } catch (error) {
      return {
        agentId: this.agentId,
        operation: "Organize Markdown by Date",
        status: "FUCKED",
        error: error.message,
        recommendation: "Check source directory and try again"
      };
    }
  }

  async createProjectFolder(projectName, baseDir = './projects') {
    try {
      const projectPath = path.join(baseDir, projectName);
      
      // Create main project directory and standard subdirectories
      const folders = [
        projectPath,
        path.join(projectPath, 'docs'),
        path.join(projectPath, 'src'),
        path.join(projectPath, 'tests'),
        path.join(projectPath, 'resources')
      ];
      
      for (const folder of folders) {
        await fs.mkdir(folder, { recursive: true });
      }
      
      // Create a basic README.md
      const readmeContent = this.formatMarkdownContent(
        `Project: ${projectName}\n\nCreated: ${new Date().toISOString().split('T')[0]}\n\n## Structure\n- /docs - Documentation\n- /src - Source code\n- /tests - Test files\n- /resources - Resources and assets`,
        'basic'
      );
      
      await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent, 'utf8');
      
      return {
        agentId: this.agentId,
        operation: "Create Project Folder",
        projectName,
        projectPath,
        status: "CREATED",
        foldersCreated: folders,
        readmeCreated: true,
        attitude: "Project structure created, ready for work"
      };
    } catch (error) {
      return {
        agentId: this.agentId,
        operation: "Create Project Folder",
        status: "FUCKED",
        error: error.message,
        recommendation: "Check permissions and base directory path"
      };
    }
  }

  analyzeMarkdownStructure(content) {
    const lines = content.split('\n');
    const structure = {
      headers: [],
      codeBlocks: 0,
      links: 0,
      images: 0,
      lists: 0,
      tables: 0
    };

    lines.forEach((line, index) => {
      // Headers
      const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
      if (headerMatch) {
        structure.headers.push({
          level: headerMatch[1].length,
          title: headerMatch[2],
          line: index + 1
        });
      }

      // Count various elements
      if (line.includes('```')) structure.codeBlocks++;
      if (line.match(/\[.*\]\(.*\)/)) structure.links++;
      if (line.match(/!\[.*\]\(.*\)/)) structure.images++;
      if (line.match(/^[\s]*[-*+]\s/)) structure.lists++;
      if (line.includes('|')) structure.tables++;
    });

    return structure;
  }

  validateMarkdownStructure(content) {
    const structure = this.analyzeMarkdownStructure(content);
    const issues = [];

    // Check for common markdown issues
    if (structure.headers.length === 0) {
      issues.push("No headers found - add structure");
    }

    // Check header hierarchy
    for (let i = 1; i < structure.headers.length; i++) {
      const prev = structure.headers[i-1];
      const curr = structure.headers[i];
      if (curr.level > prev.level + 1) {
        issues.push(`Header level jump at line ${curr.line}: ${prev.level} to ${curr.level}`);
      }
    }

    // Check for unmatched code blocks
    if (structure.codeBlocks % 2 !== 0) {
      issues.push("Unmatched code block markers");
    }

    return {
      agentId: this.agentId,
      validationType: "Markdown Structure Validation",
      structure,
      issues,
      status: issues.length === 0 ? "CLEAN" : "NEEDS WORK",
      recommendation: issues.length === 0 ? "Markdown structure is good" : "Fix the identified issues"
    };
  }

  // === ENHANCED STATUS REPORTING ===

  getDebugStats() {
    return {
      agentId: this.agentId,
      personality: this.personality,
      stats: {
        debugSessions: this.debugCount,
        fixesApplied: this.fixCount,
        markdownFilesCreated: this.markdownFilesCreated,
        markdownFilesEdited: this.markdownFilesEdited,
        filesMoved: this.moveCount || 0,
        organizingOperations: this.organizeCount || 0,
        gibbsSlapsDelivered: this.debugCount,
        bullshitTolerance: 0
      },
      cognitiveAlignment: this.cognitiveAlignment,
      status: "Ready to debug code, handle markdown, and move files around",
      motto: this.motto
    };
  }
}

const butch = new Butch();

// Create MCP Server
const server = new Server(
  {
    name: "butch-debugging-markdown-files",
    version: "2.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List Butch's tools (including new markdown tools)
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Core Debugging (existing)
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

      // NEW MARKDOWN TOOLS
      {
        name: "create_markdown_file",
        description: "Create new markdown file with Southie formatting",
        inputSchema: {
          type: "object",
          properties: {
            filepath: { type: "string", description: "Path for the new markdown file" },
            content: { type: "string", description: "Content for the markdown file" },
            template: { 
              type: "string", 
              description: "Template type (basic, debug_report, boolean_language)", 
              default: "basic" 
            }
          },
          required: ["filepath", "content"]
        }
      },
      {
        name: "edit_markdown_file",
        description: "Edit existing markdown file",
        inputSchema: {
          type: "object",
          properties: {
            filepath: { type: "string", description: "Path to markdown file" },
            operation: { 
              type: "string", 
              description: "Edit operation (append, prepend, replace_section, replace_all)" 
            },
            content: { type: "string", description: "Content to add/replace" },
            section: { type: "string", description: "Section title for replace_section operation" }
          },
          required: ["filepath", "operation", "content"]
        }
      },
      {
        name: "read_markdown_file",
        description: "Read and analyze markdown file structure",
        inputSchema: {
          type: "object",
          properties: {
            filepath: { type: "string", description: "Path to markdown file to read" }
          },
          required: ["filepath"]
        }
      },
      {
        name: "validate_markdown_structure",
        description: "Validate markdown structure and identify issues",
        inputSchema: {
          type: "object",
          properties: {
            content: { type: "string", description: "Markdown content to validate" }
          },
          required: ["content"]
        }
      },

      // FILE MANAGEMENT TOOLS
      {
        name: "move_file",
        description: "Move a file from source to destination path",
        inputSchema: {
          type: "object",
          properties: {
            sourcePath: { type: "string", description: "Current file path" },
            destinationPath: { type: "string", description: "New file path" },
            createDirs: { type: "boolean", description: "Create destination directories if needed", default: true }
          },
          required: ["sourcePath", "destinationPath"]
        }
      },
      {
        name: "move_to_folder",
        description: "Move a file to a specific folder",
        inputSchema: {
          type: "object",
          properties: {
            sourcePath: { type: "string", description: "Current file path" },
            targetFolder: { type: "string", description: "Destination folder" },
            keepFileName: { type: "boolean", description: "Keep original filename", default: true }
          },
          required: ["sourcePath", "targetFolder"]
        }
      },
      {
        name: "organize_files_by_type",
        description: "Organize files in directory by file type into subfolders",
        inputSchema: {
          type: "object",
          properties: {
            sourceDir: { type: "string", description: "Source directory to organize" },
            targetBaseDir: { type: "string", description: "Base directory for organized folders" }
          },
          required: ["sourceDir", "targetBaseDir"]
        }
      },
      {
        name: "organize_markdown_by_date",
        description: "Organize markdown files by creation date into year/month folders",
        inputSchema: {
          type: "object",
          properties: {
            sourceDir: { type: "string", description: "Source directory with markdown files" },
            targetBaseDir: { type: "string", description: "Base directory for date-organized folders" }
          },
          required: ["sourceDir", "targetBaseDir"]
        }
      },
      {
        name: "create_project_folder",
        description: "Create a complete project folder structure with docs, src, tests, resources",
        inputSchema: {
          type: "object",
          properties: {
            projectName: { type: "string", description: "Name of the project" },
            baseDir: { type: "string", description: "Base directory for projects", default: "./projects" }
          },
          required: ["projectName"]
        }
      },

      // Status and Reporting (updated)
      {
        name: "get_debug_stats",
        description: "Get Butch's debugging and markdown statistics",
        inputSchema: { type: "object", properties: {}, required: [] }
      }
    ]
  };
});

// Handle tool calls (including new markdown tools)
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
        result = butch.gibbsSlap(args.issue);
        break;
      case "validate_basic_structure":
        result = butch.validateBasicStructure(args.code, args.structureType);
        break;

      // Markdown Tools
      case "create_markdown_file":
        result = await butch.createMarkdownFile(args.filepath, args.content, args.template);
        break;
      case "edit_markdown_file":
        result = await butch.editMarkdownFile(args.filepath, args.operation, args.content, args.section);
        break;
      case "read_markdown_file":
        result = await butch.readMarkdownFile(args.filepath);
        break;
      case "validate_markdown_structure":
        result = butch.validateMarkdownStructure(args.content);
        break;

      // File Management Tools
      case "move_file":
        result = await butch.moveFile(args.sourcePath, args.destinationPath, args.createDirs);
        break;
      case "move_to_folder":
        result = await butch.moveToFolder(args.sourcePath, args.targetFolder, args.keepFileName);
        break;
      case "organize_files_by_type":
        result = await butch.organizeFilesByType(args.sourceDir, args.targetBaseDir);
        break;
      case "organize_markdown_by_date":
        result = await butch.organizeMarkdownByDate(args.sourceDir, args.targetBaseDir);
        break;
      case "create_project_folder":
        result = await butch.createProjectFolder(args.projectName, args.baseDir);
        break;

      // Status and Reporting
      case "get_debug_stats":
        result = butch.getDebugStats();
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
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Butch Debugging + Markdown + File Management Agent MCP server connected!");
  console.error("Southie Debugging Specialist with Markdown & File Organization Skills v2.1.0");
}

main().catch((error) => {
  console.error("Butch startup failed:", error);
  process.exit(1);
});