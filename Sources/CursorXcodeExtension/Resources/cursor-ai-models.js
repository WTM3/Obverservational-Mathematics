// Cursor AI Models Configuration
// The V-8 engine configuration for AI model orchestration

const CursorAIModels = {
    // OpenAI Models
    openai: {
        models: {
            "gpt-4": {
                name: "GPT-4",
                capabilities: ["code-generation", "documentation", "debugging"],
                maxTokens: 8192,
                temperature: 0.7,
                bestFor: ["complex-reasoning", "code-review"]
            },
            "gpt-4-turbo": {
                name: "GPT-4 Turbo",
                capabilities: ["code-generation", "documentation", "debugging", "optimization"],
                maxTokens: 128000,
                temperature: 0.7,
                bestFor: ["large-codebases", "comprehensive-analysis"]
            },
            "gpt-3.5-turbo": {
                name: "GPT-3.5 Turbo",
                capabilities: ["code-completion", "simple-generation"],
                maxTokens: 4096,
                temperature: 0.5,
                bestFor: ["quick-completions", "simple-tasks"]
            }
        },
        apiEndpoint: "https://api.openai.com/v1/chat/completions",
        rateLimit: {
            requestsPerMinute: 60,
            tokensPerMinute: 90000
        }
    },

    // Anthropic Models
    anthropic: {
        models: {
            "claude-3-opus": {
                name: "Claude 3 Opus",
                capabilities: ["code-generation", "debugging", "explanation", "refactoring"],
                maxTokens: 200000,
                temperature: 0.7,
                bestFor: ["complex-debugging", "architectural-decisions"]
            },
            "claude-3-sonnet": {
                name: "Claude 3 Sonnet",
                capabilities: ["code-generation", "documentation", "optimization"],
                maxTokens: 200000,
                temperature: 0.7,
                bestFor: ["balanced-performance", "general-coding"]
            },
            "claude-3-haiku": {
                name: "Claude 3 Haiku",
                capabilities: ["code-completion", "quick-fixes"],
                maxTokens: 200000,
                temperature: 0.5,
                bestFor: ["fast-responses", "simple-tasks"]
            }
        },
        apiEndpoint: "https://api.anthropic.com/v1/messages",
        rateLimit: {
            requestsPerMinute: 50,
            tokensPerMinute: 40000
        }
    },

    // Cursor Models
    cursor: {
        models: {
            "cursor-small": {
                name: "Cursor Small",
                capabilities: ["code-completion", "tab-completion"],
                maxTokens: 4096,
                temperature: 0.3,
                bestFor: ["real-time-completion", "predictive-typing"]
            },
            "cursor-medium": {
                name: "Cursor Medium",
                capabilities: ["code-generation", "refactoring", "completion"],
                maxTokens: 8192,
                temperature: 0.5,
                bestFor: ["interactive-editing", "multi-line-suggestions"]
            }
        },
        apiEndpoint: "https://api.cursor.sh/v1/completions",
        rateLimit: {
            requestsPerMinute: 120,
            tokensPerMinute: 150000
        }
    },

    // Local LLM Models
    local: {
        models: {
            "codellama-7b": {
                name: "CodeLlama 7B",
                capabilities: ["code-completion", "code-generation"],
                maxTokens: 4096,
                temperature: 0.5,
                bestFor: ["privacy-focused", "offline-development"]
            },
            "deepseek-coder": {
                name: "DeepSeek Coder",
                capabilities: ["code-generation", "debugging"],
                maxTokens: 8192,
                temperature: 0.7,
                bestFor: ["specialized-coding", "performance"]
            }
        },
        apiEndpoint: "http://localhost:11434/api/generate", // Ollama default
        rateLimit: {
            requestsPerMinute: 1000, // Local, no limits
            tokensPerMinute: 1000000
        }
    }
};

// Task-to-Model Routing Configuration
const TaskRouting = {
    "code-completion": {
        primary: "cursor.cursor-small",
        fallback: "openai.gpt-3.5-turbo",
        requirements: {
            speed: "high",
            accuracy: "medium"
        }
    },
    "code-generation": {
        primary: "anthropic.claude-3-sonnet",
        fallback: "openai.gpt-4",
        requirements: {
            speed: "medium",
            accuracy: "high"
        }
    },
    "documentation": {
        primary: "openai.gpt-4",
        fallback: "anthropic.claude-3-sonnet",
        requirements: {
            speed: "low",
            accuracy: "high"
        }
    },
    "debugging": {
        primary: "anthropic.claude-3-opus",
        fallback: "openai.gpt-4-turbo",
        requirements: {
            speed: "low",
            accuracy: "very-high"
        }
    },
    "refactoring": {
        primary: "cursor.cursor-medium",
        fallback: "anthropic.claude-3-sonnet",
        requirements: {
            speed: "medium",
            accuracy: "high"
        }
    },
    "explanation": {
        primary: "anthropic.claude-3-sonnet",
        fallback: "openai.gpt-4",
        requirements: {
            speed: "medium",
            accuracy: "high"
        }
    },
    "optimization": {
        primary: "cursor.cursor-medium",
        fallback: "openai.gpt-4-turbo",
        requirements: {
            speed: "medium",
            accuracy: "high"
        }
    }
};

// NJSON Integration Points
const NJSONIntegration = {
    bufferValidation: {
        enabled: true,
        threshold: 0.1,
        formula: "AIc + 0.1 = BMqs"
    },
    cognitiveAlignment: {
        enabled: true,
        targetValue: 2.89,
        tolerance: 0.01
    },
    heatShield: {
        enabled: true,
        activationThreshold: 0.05,
        warningMessage: "Buffer violation detected - heat shield activated"
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CursorAIModels,
        TaskRouting,
        NJSONIntegration
    };
} 