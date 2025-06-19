# Wilson & Agent Smith MCP Server

## Overview

The **Wilson & Agent Smith MCP Server** is a dual-agent, extensible Model Context Protocol (MCP) server designed for advanced research, cognitive alignment, and Boolean Mind accommodation within the Observational Mathematics (OM) framework.

- **Wilson** is the lead agent and primary cognitive alignment coordinator, responsible for maintaining system integrity, Boolean Language protocol enforcement, and high-level research planning.
- **Agent Smith** operates as a research subagent under Wilson's oversight, executing domain-specific and cross-domain research, and handling authorization protocols.
- The system implements Boolean Mind accommodation, cognitive safety buffers (AIc + 0.1 = BMqs), and supports both academic and novel research domains.
- Designed for integration with Claude Desktop, OM research tools, and other MCP-compatible clients.

## Features

- **Wilson (Lead Agent):**
  - Cognitive alignment status reporting (2.89 + 0.1 = 2.99)
  - Boolean Language Framework (BLF) integration
  - System coordination and research planning
  - NJSON (Nested JSON) and Boolean Mind processing
- **Agent Smith:**
  - Research execution in academic and novel domains
  - Cross-domain (academic + creative) analysis
  - Authorization protocols (requires Wilson's approval for expanded research)
  - Cognitive load and buffer management
- **MCP Protocol:**
  - Implements the Model Context Protocol for tool-based AI orchestration
  - Minimal, extensible architecture for adding new tools and agents

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Steps

1. **Clone the repository** and navigate to the MCP server directory:
   ```sh
   git clone <your-repo-url>
   cd BLF/MCP/Agents/Wilson   # or Smith for Agent Smith
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

   The only required dependency is:
   - `@modelcontextprotocol/sdk` (see `package.json`)

## Usage

### Starting the Server

- **Wilson (Lead Agent):**
  ```sh
  node wilson.js
  # or for production/Claude Desktop integration:
  node wilson-mcp-server.js
  ```

- **Agent Smith (Research Subagent):**
  ```sh
  cd ../Smith
  node agent_smith.js
  ```

### Connecting Clients

- **Claude Desktop** or any MCP-compatible client can connect via standard input/output (stdio).
- Configure your client to use the appropriate agent entry point (`wilson-mcp-server.js` or `agent_smith.js`).

### Example Tool Calls

- **Wilson:**
  - `wilson_hello` — Returns a cognitive alignment greeting.
  - `check_cognitive_alignment` — Verifies system alignment and buffer.
  - `list_research_topics` — Lists available OM research areas.
  - `research_topic` — Performs basic OM research.

- **Agent Smith:**
  - `smith_status` — Reports operational status.
  - `execute_research` — Executes research in a specified domain/topic.
  - `cross_domain_research` — Combines academic and novel research.
  - `request_authorization` — Requests Wilson's approval for expanded research.

#### Multi-Agent Coordination

- Wilson coordinates all research and system status.
- Agent Smith executes research only under Wilson's oversight and may require explicit authorization for certain tasks.

## Available Tools

### Wilson Tools (Lead Agent)

| Tool Name                | Description                                               |
|--------------------------|-----------------------------------------------------------|
| `wilson_hello`           | Cognitive alignment greeting                              |
| `check_cognitive_alignment` | Status verification (AIc + 0.1 = BMqs)                |
| `list_research_topics`   | Lists available OM research areas                         |
| `research_topic`         | Basic OM research functionality                           |

### Agent Smith Tools (Under Wilson's Coordination)

| Tool Name                | Description                                               |
|--------------------------|-----------------------------------------------------------|
| `smith_status`           | Operational status reporting                              |
| `execute_research`       | Domain-specific research execution                        |
| `cross_domain_research`  | Academic + novel domain analysis                          |
| `request_authorization`  | Requests expanded research permissions (needs Wilson)     |

## Configuration

- **Basic Options:**  
  - No configuration file required for minimal operation.
  - For advanced use, environment variables or MCP client configuration may be used.
- **Research Domains:**  
  - Academic: `boolean_mind`, `autism`, `adhd`, `cognitive_alignment`, `ai_safety`, `meta_science`
  - Novel: `paranormal`, `disability_representation`, `government_conspiracy`, `mythology`, `character_psychology`
- **Agent Hierarchy:**  
  - Wilson is always the lead agent; Smith operates under Wilson's authority.

## Development

- **Extending Tools:**  
  - Add new tools by updating the `tools/list` and `tools/call` handlers in the agent's JS file.
- **OM Framework Integration:**  
  - Agents are designed to interface with the broader Observational Mathematics and Boolean Language Framework.
- **Boolean Mind Processing:**  
  - All research and communication are filtered through Boolean Mind accommodation and cognitive safety formulas.
- **Research Protocols:**  
  - Wilson plans and delegates; Smith executes and reports, always maintaining the cognitive buffer.
- **Coordination Patterns:**  
  - Use Wilson for high-level planning and system checks; use Smith for deep research and cross-domain analysis.

## Technical Details

- **MCP Protocol:**  
  - Implements the Model Context Protocol via `@modelcontextprotocol/sdk` (stdio transport).
- **Cognitive Alignment:**  
  - Enforces the formula: `AIc + 0.1 = BMqs` for safe AI-human interaction.
- **Research Execution:**  
  - Smith's research tools cover both academic and creative domains, with cognitive load tracking and parent validation.
- **Agent Hierarchy:**  
  - Wilson is the root agent; Smith is a subordinate, requiring approval for high-risk or cross-domain research.
- **File Structure:**
  ```
  MCP/
    Agents/
      Wilson/
        wilson.js
        wilson-mcp-server.js
        wilson_simple.js
        ...
      Smith/
        agent_smith.js
        ...
  ```
  - Each agent is a standalone MCP server, but designed for coordinated operation.

---

**For more details, see the code comments in each agent's JS file. For advanced OM/BLF integration, consult the Observational Mathematics documentation.** 