// W&S DDG Tool - Web Scraping Implementation
// Wilson & Smith search with real DuckDuckGo integration

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

console.error("Starting W&S DDG Tool with web scraping...");

class WilsonSmithDDG {
  constructor() {
    // Boolean Language Framework integration
    this.cognitiveAlignment = {
      aiCapabilities: 2.89,
      safetyBuffer: 0.1,
      booleanMindQs: 2.99
    };
    
    // FUDP Prevention System
    this.fudpStats = {
      totalSearches: 0,
      successfulSearches: 0,
      fudpPrevented: 0,
      lastUpdate: new Date().toISOString()
    };
    
    // Rate limiting to prevent getting blocked
    this.lastRequestTime = 0;
    this.minRequestInterval = 1000; // 1 second between requests
    
    console.error("W&S DDG Tool initialized with cognitive alignment:", this.cognitiveAlignment);
  }

  // Real DuckDuckGo web scraping implementation
  async searchDuckDuckGo(query, agent = 'wilson') {
    this.fudpStats.totalSearches++;
    
    try {
      // Rate limiting
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;
      if (timeSinceLastRequest < this.minRequestInterval) {
        await new Promise(resolve => setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest));
      }
      this.lastRequestTime = Date.now();

      console.error(`${agent} searching DDG: "${query}"`);
      
      // DuckDuckGo search URL
      const searchUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
      
      // Fetch the search results page
      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        timeout: 10000 // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`DDG HTTP error: ${response.status}`);
      }

      const html = await response.text();
      const results = this.parseSearchResults(html);
      
      // Apply BLF FUDP filtering
      const filteredResults = this.applyFUDPFilter(results, query);
      
      // Cognitive alignment check
      if (filteredResults.length === 0 && results.length > 0) {
        console.error(`FUDP prevented: ${results.length} results filtered out for query: "${query}"`);
        this.fudpStats.fudpPrevented++;
        return this.getFallbackResults(query, agent);
      }
      
      if (filteredResults.length === 0) {
        return this.getFallbackResults(query, agent);
      }
      
      this.fudpStats.successfulSearches++;
      console.error(`${agent} found ${filteredResults.length} results for: "${query}"`);
      
      return filteredResults;
      
    } catch (error) {
      console.error(`DDG search error: ${error.message}`);
      this.fudpStats.fudpPrevented++;
      return this.handleSearchFailure(query, error, agent);
    }
  }

  // Parse DuckDuckGo HTML results
  parseSearchResults(html) {
    try {
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      const results = [];
      
      // DDG uses .result class for search results
      const resultElements = document.querySelectorAll('.result');
      
      resultElements.forEach((element, index) => {
        if (index >= 10) return; // Limit to top 10 results
        
        try {
          const titleElement = element.querySelector('.result__title a');
          const snippetElement = element.querySelector('.result__snippet');
          const urlElement = element.querySelector('.result__url');
          
          if (titleElement && snippetElement) {
            const title = titleElement.textContent.trim();
            const snippet = snippetElement.textContent.trim();
            const url = titleElement.href || urlElement?.textContent?.trim() || '';
            
            if (title && snippet && url) {
              results.push({
                title,
                snippet,
                url,
                source: 'DuckDuckGo',
                timestamp: new Date().toISOString(),
                relevanceScore: this.calculateRelevanceScore(title, snippet, index)
              });
            }
          }
        } catch (parseError) {
          console.error(`Error parsing result ${index}:`, parseError.message);
        }
      });
      
      return results;
      
    } catch (error) {
      console.error('HTML parsing error:', error.message);
      return [];
    }
  }

  // Calculate relevance score for BLF optimization
  calculateRelevanceScore(title, snippet, position) {
    let score = 1.0 - (position * 0.1); // Position-based scoring
    
    // Boolean Mind keyword boost
    const booleanKeywords = ['boolean', 'binary', 'logical', 'precise', 'direct', 'clear'];
    const text = (title + ' ' + snippet).toLowerCase();
    
    booleanKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score += 0.1;
      }
    });
    
    return Math.min(1.0, Math.max(0.1, score));
  }

  // BLF FUDP Prevention Filter
  applyFUDPFilter(results, query) {
    const filtered = results.filter(result => {
      // Filter out obvious spam/low quality
      if (result.title.length < 3 || result.snippet.length < 10) {
        return false;
      }
      
      // Filter out results with excessive special characters (spam indicators)
      const titleSpecialChars = (result.title.match(/[^a-zA-Z0-9\s]/g) || []).length;
      const titleRatio = titleSpecialChars / result.title.length;
      if (titleRatio > 0.3) {
        return false;
      }
      
      // Cognitive alignment check - maintain quality standards
      if (result.relevanceScore < 0.2) {
        return false;
      }
      
      return true;
    });
    
    // Sort by relevance score
    return filtered.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  // Fallback results for FUDP prevention
  getFallbackResults(query, agent) {
    return [
      {
        title: `No reliable results found for: ${query}`,
        snippet: `${agent} could not locate high-quality search results that meet Boolean Language Framework standards. Consider refining your search query or trying alternative terms.`,
        url: '',
        source: 'BLF Fallback',
        timestamp: new Date().toISOString(),
        relevanceScore: 0.5,
        fallback: true
      }
    ];
  }

  // Handle search failures
  handleSearchFailure(query, error, agent) {
    console.error(`Search failure for "${query}": ${error.message}`);
    
    return [
      {
        title: `Search Error: ${query}`,
        snippet: `${agent} encountered an error while searching: ${error.message}. The Boolean Language Framework prevented returning unreliable results.`,
        url: '',
        source: 'BLF Error Handler',
        timestamp: new Date().toISOString(),
        relevanceScore: 0.3,
        error: true
      }
    ];
  }

  // Get W&S tool status
  getStatus() {
    const fudpRate = this.fudpStats.totalSearches > 0 
      ? (this.fudpStats.fudpPrevented / this.fudpStats.totalSearches) 
      : 0;
    
    const successRate = this.fudpStats.totalSearches > 0 
      ? (this.fudpStats.successfulSearches / this.fudpStats.totalSearches) 
      : 0;

    return {
      cognitiveAlignment: this.cognitiveAlignment,
      wilsonStatus: "operational",
      smithStatus: "operational", 
      searchEngine: "DuckDuckGo (web scraping)",
      fudpStats: {
        ...this.fudpStats,
        fudpRate: `${(fudpRate * 100).toFixed(1)}%`,
        successRate: `${(successRate * 100).toFixed(1)}%`
      },
      timestamp: new Date().toISOString()
    };
  }

  // Boolean Language search wrapper
  async booleanSearch(query, agent = 'wilson') {
    // Apply Boolean Language principles
    const optimizedQuery = this.optimizeQueryForBoolean(query);
    const results = await this.searchDuckDuckGo(optimizedQuery, agent);
    
    return {
      query: optimizedQuery,
      originalQuery: query,
      agent,
      results,
      cognitiveAlignment: this.cognitiveAlignment,
      booleanOptimized: optimizedQuery !== query,
      timestamp: new Date().toISOString()
    };
  }

  // Optimize queries for Boolean Mind processing
  optimizeQueryForBoolean(query) {
    // Remove unnecessary words that add ambiguity
    const unnecessaryWords = ['please', 'maybe', 'perhaps', 'possibly', 'might', 'could'];
    let optimized = query;
    
    unnecessaryWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      optimized = optimized.replace(regex, '').replace(/\s+/g, ' ').trim();
    });
    
    return optimized;
  }
}

const wsddg = new WilsonSmithDDG();

// Create MCP Server
const server = new Server(
  {
    name: "wilson-smith-ddg",
    version: "2.1.0",
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
        name: "ws_search",
        description: "Wilson & Smith DDG search with Boolean Language Framework",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Search query" },
            agent: { type: "string", description: "wilson or smith", default: "wilson" }
          },
          required: ["query"]
        }
      },
      {
        name: "ws_status",
        description: "Get W&S DDG Tool status and FUDP statistics",
        inputSchema: { type: "object", properties: {}, required: [] }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    let result;
    
    switch (name) {
      case "ws_search":
        result = await wsddg.booleanSearch(args.query, args.agent || 'wilson');
        break;
      case "ws_status":
        result = wsddg.getStatus();
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
    
  } catch (error) {
    console.error(`W&S DDG error (${name}):`, error);
    return {
      content: [
        {
          type: "text",
          text: `W&S DDG error: ${error.message}`
        }
      ]
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("W&S DDG Tool connected with web scraping!");
  console.error("Boolean Language Framework v2.1.0 with FUDP prevention");
}

main().catch((error) => {
  console.error("W&S DDG startup failed:", error);
  process.exit(1);
});

