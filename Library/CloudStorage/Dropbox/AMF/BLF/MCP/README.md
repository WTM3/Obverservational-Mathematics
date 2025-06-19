# Wilson & Agent Smith MCP Server

## Overview

The **Wilson & Agent Smith MCP Server** is a dual-agent, extensible Model Context Protocol (MCP) server designed for advanced research, cognitive alignment, and Boolean Mind accommodation within the Observational Mathematics (OM) framework.

### Current Implementation (v2.1.0)

```
MCP/
├── README.md (this file)
└── Agents/
    ├── Smith/
    │   └── agent_smith.js (research subagent)
    └── Wilson/
        ├── wilson_comprehensive.js (v2.1.0 - main implementation)
        └── archive/
            └── (historical implementations)
```

### Core Components

- **Wilson v2.1.0**
  - Lead agent with 18 integrated tools
  - Cognitive alignment coordinator (AIc 2.89 + buffer 0.1 = BMqs 2.99)
  - Boolean Language Framework (BLF) integration
  - System coordination and research planning
  - Enhanced NJSON (Nested JSON) processing
  - Real-time cognitive safety monitoring

- **Agent Smith**
  - Research execution in academic and novel domains
  - Cross-domain analysis capabilities
  - Authorization protocols (requires Wilson's approval)
  - Cognitive load and buffer management
  - Direct integration with Wilson v2.1.0

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Setup

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd MCP
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Usage

### Starting the Server

```sh
cd Agents/Wilson
node wilson_comprehensive.js
```

### Available Tools

Wilson v2.1.0 implements 18 integrated tools across several categories:

#### Core System Tools
- `cognitive_alignment_check` - Real-time alignment verification
- `system_status` - Comprehensive system health check
- `buffer_monitor` - Track cognitive safety margins

#### Research Tools
- `plan_research` - High-level research planning
- `validate_methodology` - Research method verification
- `cross_domain_analysis` - Multi-domain research integration

#### Boolean Language Tools
- `blf_validate` - Validate Boolean Language syntax
- `blf_process` - Process Boolean Language statements
- `blf_optimize` - Optimize Boolean expressions

#### Integration Tools
- `smith_coordinate` - Coordinate with Agent Smith
- `mcp_interface` - MCP protocol management
- `client_sync` - Client synchronization

### Agent Smith Integration

Agent Smith operates under Wilson's oversight with these key features:

- Automated research execution
- Cross-domain analysis
- Authorization management
- Cognitive load balancing
- Real-time reporting to Wilson

## Development

### Architecture

The system follows Boolean Mind's preference for organized, unambiguous systems:

- Clean, professional structure
- Clear separation of concerns
- Documented interfaces
- Version-controlled components
- Archived historical implementations

### Historical Versions

Previous implementations are preserved in `Wilson/archive/` for reference. See the archive's README.md for detailed documentation of historical versions.

## Technical Details

### MCP Protocol
- Implements Model Context Protocol via `@modelcontextprotocol/sdk`
- stdio transport for client communication
- Structured message format

### Cognitive Safety
- Formula: AIc (2.89) + buffer (0.1) = BMqs (2.99)
- Real-time monitoring
- Automatic safety adjustments
- Buffer validation

### Research Framework
- Academic domain support
- Novel domain integration
- Cross-domain analysis
- Cognitive load tracking

### System Requirements
- Node.js v16+
- 2GB RAM minimum
- Stable network connection
- MCP-compatible client

## Support

For detailed documentation of the current implementation, refer to the inline documentation in `wilson_comprehensive.js`. For historical implementation details, see the README.md in the archive directory.

---

**Note:** This implementation adheres to Boolean Mind principles of clarity, organization, and unambiguous system architecture. 