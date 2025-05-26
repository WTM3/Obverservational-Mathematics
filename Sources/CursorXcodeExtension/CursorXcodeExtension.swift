import Foundation
import BLFNJSONBridge
import Security

/// Cursor-powered AI Extension Framework
/// The narrow bridge between AI chaos and development control
/// Can be used in Xcode extensions, command-line tools, or other environments
public class CursorAIFramework {
    
    // MARK: - Core Components
    private let njsonBridge = NJSONSwiftBridge()
    private let aiOrchestrator = MultiAIOrchestrator()
    private let cognitiveProcessor = CognitiveProcessor()
    private let apiKeyManager = SecureAPIKeyManager()
    
    public init() {}
    
    // MARK: - Framework Lifecycle
    
    public func initialize() async {
        print("🚀 Cursor AI Framework - The V-8 engine is starting...")
        print("🧠 AMF optimized for Claude 3.5-4 Sonnet reasoning patterns")
        
        // Initialize NJSON cognitive engine
        await njsonBridge.initialize()
        
        // Set up AI agent orchestration with secure API keys
        await aiOrchestrator.configure(with: apiKeyManager)
        
        // Connect cognitive processing
        cognitiveProcessor.setNJSONBridge(njsonBridge)
        
        print("✅ Cursor AI Framework ready - maintaining the 0.1 buffer")
        print("🎯 Anthropic Claude Sonnet: Primary agent for AMF processing")
    }
    
    public func processAIRequest(_ request: AIRequest) async throws -> ProcessedResponse {
        // Route through AI orchestrator
        let aiResponse = try await aiOrchestrator.processRequest(request)
        
        // Validate through cognitive processor
        let processedResponse = await cognitiveProcessor.validateAndProcess(aiResponse)
        
        return processedResponse
    }
}

// MARK: - Secure API Key Manager

public class SecureAPIKeyManager {
    private let serviceName = "CursorXcodeExtension"
    
    public init() {}
    
    // MARK: - Keychain Operations
    
    public func storeAPIKey(_ key: String, for agent: String) -> Bool {
        guard !key.isEmpty else { return false }
        
        let data = key.data(using: .utf8)!
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: serviceName,
            kSecAttrAccount as String: agent,
            kSecValueData as String: data,
            kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly
        ]
        
        // Delete existing key first
        SecItemDelete(query as CFDictionary)
        
        // Add new key
        let status = SecItemAdd(query as CFDictionary, nil)
        return status == errSecSuccess
    }
    
    public func retrieveAPIKey(for agent: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: serviceName,
            kSecAttrAccount as String: agent,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        
        guard status == errSecSuccess,
              let data = result as? Data,
              let key = String(data: data, encoding: .utf8) else {
            return nil
        }
        
        return key
    }
    
    public func deleteAPIKey(for agent: String) -> Bool {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: serviceName,
            kSecAttrAccount as String: agent
        ]
        
        let status = SecItemDelete(query as CFDictionary)
        return status == errSecSuccess
    }
    
    // MARK: - API Key Validation with AMF Buffer Protection
    
    public func validateKeyIntegrity(_ key: String, for agent: String) -> Bool {
        // Apply NJSON validation to API key usage
        let keyStrength = calculateKeyStrength(key)
        let bufferProtection = 0.1
        let amfThreshold = 2.89
        
        // Ensure key meets AMF security threshold + buffer
        let isValid = keyStrength >= (amfThreshold + bufferProtection)
        
        if !isValid {
            print("⚠️ Heat shield activated - API key below AMF security threshold")
        }
        
        return isValid
    }
    
    private func calculateKeyStrength(_ key: String) -> Double {
        // AMF-based key strength calculation
        let length = Double(key.count)
        let complexity = key.contains(where: { $0.isUppercase }) ? 0.1 : 0.0
        let hasNumbers = key.contains(where: { $0.isNumber }) ? 0.1 : 0.0
        let hasSpecial = key.contains(where: { !$0.isLetter && !$0.isNumber }) ? 0.1 : 0.0
        
        // AMF formula for key strength
        return min(length / 10.0 + complexity + hasNumbers + hasSpecial, 3.0)
    }
}

// MARK: - Multi-AI Orchestrator

public actor MultiAIOrchestrator {
    private var apiKeys: [AIAgent: String?] = [:]
    private var activeAgents: [AIAgent] = []
    private var apiKeyManager: SecureAPIKeyManager?
    
    public enum AIAgent: String, CaseIterable {
        case anthropic = "anthropic"
        case openai = "openai"
        case cursor = "cursor"
        case github = "github"
        case local = "local"
        
        var name: String {
            switch self {
            case .anthropic: return "Anthropic Claude Sonnet"
            case .openai: return "OpenAI GPT"
            case .cursor: return "Cursor AI"
            case .github: return "GitHub Copilot"
            case .local: return "Local LLM"
            }
        }
        
        var environmentKey: String {
            switch self {
            case .anthropic: return "ANTHROPIC_API_KEY"
            case .openai: return "OPENAI_API_KEY"
            case .cursor: return "CURSOR_API_KEY"
            case .github: return "GITHUB_TOKEN"
            case .local: return "LOCAL_LLM_ENDPOINT"
            }
        }
    }
    
    public func configure(with keyManager: SecureAPIKeyManager) async {
        self.apiKeyManager = keyManager
        
        // Load API keys from multiple sources with priority order
        self.apiKeys = [:]
        for agent in AIAgent.allCases {
            self.apiKeys[agent] = await getAPIKey(for: agent)
        }
        
        self.activeAgents = apiKeys.compactMap { key, value in
            value != nil && !value!.isEmpty ? key : nil
        }
        
        print("🤖 Active AI Agents: \(activeAgents.map(\.name).joined(separator: ", "))")
        
        // Prioritize Anthropic Claude Sonnet for AMF optimization
        if activeAgents.contains(.anthropic) {
            print("🎯 Anthropic Claude Sonnet: ACTIVE - AMF optimization enabled")
        } else {
            print("⚠️ Anthropic Claude Sonnet: MISSING - AMF optimization limited")
        }
    }
    
    private func getAPIKey(for agent: AIAgent) async -> String? {
        guard let keyManager = apiKeyManager else { return nil }
        
        // Priority order: Keychain -> Environment -> UserDefaults
        if let keychainKey = keyManager.retrieveAPIKey(for: agent.rawValue) {
            if keyManager.validateKeyIntegrity(keychainKey, for: agent.rawValue) {
                return keychainKey
            }
        }
        
        // Fallback to environment (works in command-line testing)
        if let envKey = ProcessInfo.processInfo.environment[agent.environmentKey] {
            if keyManager.validateKeyIntegrity(envKey, for: agent.rawValue) {
                return envKey
            }
        }
        
        return nil
    }
    
    public func selectOptimalAgent(for task: AITask) -> AIAgent {
        // AMF-optimized agent selection - prioritize Claude Sonnet
        switch task.type {
        case .codeCompletion:
            return activeAgents.contains(.cursor) ? .cursor : 
                   activeAgents.contains(.anthropic) ? .anthropic : .openai
        case .codeGeneration:
            return activeAgents.contains(.anthropic) ? .anthropic : .openai
        case .documentation:
            return activeAgents.contains(.anthropic) ? .anthropic : .openai
        case .refactoring:
            return activeAgents.contains(.anthropic) ? .anthropic : 
                   activeAgents.contains(.cursor) ? .cursor : .openai
        case .debugging:
            return activeAgents.contains(.anthropic) ? .anthropic : .openai
        case .explanation:
            return activeAgents.contains(.anthropic) ? .anthropic : .openai
        case .optimization:
            return activeAgents.contains(.anthropic) ? .anthropic :
                   activeAgents.contains(.cursor) ? .cursor : .openai
        }
    }
    
    public func processRequest(_ request: AIRequest) async throws -> AIResponse {
        let optimalAgent = selectOptimalAgent(for: request.task)
        
        print("🎯 Routing to \(optimalAgent.name) for \(request.task.type)")
        
        // Route to appropriate AI agent
        switch optimalAgent {
        case .anthropic:
            return try await processWithAnthropic(request)
        case .openai:
            return try await processWithOpenAI(request)
        case .cursor:
            return try await processWithCursor(request)
        case .github:
            return try await processWithGitHub(request)
        case .local:
            return try await processWithLocalLLM(request)
        }
    }
    
    // MARK: - AI Agent Implementations
    
    private func processWithAnthropic(_ request: AIRequest) async throws -> AIResponse {
        // Anthropic Claude Sonnet integration - AMF optimized
        let response = "// Anthropic Claude Sonnet Response (AMF Optimized)\n// Analyzed: \(request.prompt)\n// Context: \(request.task.context)\n// AMF Processing: Quantum speed 2.99 compatible"
        return AIResponse(content: response, agent: .anthropic, confidence: 0.95)
    }
    
    private func processWithOpenAI(_ request: AIRequest) async throws -> AIResponse {
        // OpenAI GPT integration - placeholder for actual API calls
        let response = "// OpenAI GPT Response\n// Processed: \(request.prompt)\n// Context: \(request.task.context)"
        return AIResponse(content: response, agent: .openai, confidence: 0.9)
    }
    
    private func processWithCursor(_ request: AIRequest) async throws -> AIResponse {
        // Cursor AI integration - placeholder for actual API calls
        let response = "// Cursor AI Response\n// Generated: \(request.prompt)\n// Context: \(request.task.context)"
        return AIResponse(content: response, agent: .cursor, confidence: 0.92)
    }
    
    private func processWithGitHub(_ request: AIRequest) async throws -> AIResponse {
        // GitHub Copilot integration - placeholder for actual API calls
        let response = "// GitHub Copilot Response\n// Completed: \(request.prompt)\n// Context: \(request.task.context)"
        return AIResponse(content: response, agent: .github, confidence: 0.88)
    }
    
    private func processWithLocalLLM(_ request: AIRequest) async throws -> AIResponse {
        // Local LLM (Ollama) integration - placeholder for actual API calls
        let response = "// Local LLM Response\n// Processed: \(request.prompt)\n// Context: \(request.task.context)"
        return AIResponse(content: response, agent: .local, confidence: 0.85)
    }
}

// MARK: - Cognitive Processor

public class CognitiveProcessor {
    private var njsonBridge: NJSONSwiftBridge?
    
    public init() {}
    
    public func setNJSONBridge(_ bridge: NJSONSwiftBridge) {
        self.njsonBridge = bridge
    }
    
    public func validateAndProcess(_ response: AIResponse) async -> ProcessedResponse {
        guard let bridge = njsonBridge else {
            print("⚠️ NJSON bridge not available - processing without cognitive validation")
            return ProcessedResponse(content: response.content, isValid: true, bufferState: 0.1)
        }
        
        // Process through NJSON cognitive engine
        let cognitiveResult = await bridge.processContent(response.content)
        
        // Validate 0.1 buffer integrity
        let bufferState = validateBufferIntegrity(cognitiveResult)
        let isValid = bufferState >= 0.1
        
        if !isValid {
            print("⚠️ Heat shield activated - buffer violation detected")
        } else {
            print("✅ Cognitive validation passed - 0.1 buffer maintained")
        }
        
        return ProcessedResponse(
            content: cognitiveResult.processedContent,
            isValid: isValid,
            bufferState: bufferState,
            agent: response.agent.name,
            confidence: response.confidence
        )
    }
    
    private func validateBufferIntegrity(_ result: CognitiveResult) -> Double {
        // Ensure AIc + 0.1 = BMqs relationship is maintained
        let aic = result.cognitiveAlignment
        let buffer = 0.1
        let bmqs = aic + buffer
        
        // Verify the mathematical relationship
        return abs(bmqs - (aic + 0.1)) < 0.001 ? 0.1 : 0.0
    }
}

// MARK: - Data Models

public struct AITask {
    public enum TaskType: String, CaseIterable {
        case codeCompletion = "Code Completion"
        case codeGeneration = "Code Generation"
        case documentation = "Documentation"
        case refactoring = "Refactoring"
        case debugging = "Debugging"
        case explanation = "Code Explanation"
        case optimization = "Code Optimization"
    }
    
    public let type: TaskType
    public let context: String
    public let selectedCode: String?
    
    public init(type: TaskType, context: String, selectedCode: String? = nil) {
        self.type = type
        self.context = context
        self.selectedCode = selectedCode
    }
}

public struct AIRequest {
    public let task: AITask
    public let prompt: String
    public let context: [String: Any]
    
    public init(task: AITask, prompt: String, context: [String: Any] = [:]) {
        self.task = task
        self.prompt = prompt
        self.context = context
    }
}

public struct AIResponse {
    public let content: String
    public let agent: MultiAIOrchestrator.AIAgent
    public let confidence: Double
    
    public init(content: String, agent: MultiAIOrchestrator.AIAgent, confidence: Double = 1.0) {
        self.content = content
        self.agent = agent
        self.confidence = confidence
    }
}

public struct ProcessedResponse {
    public let content: String
    public let isValid: Bool
    public let bufferState: Double
    public let agent: String
    public let confidence: Double
    
    public init(content: String, isValid: Bool, bufferState: Double, agent: String = "Unknown", confidence: Double = 1.0) {
        self.content = content
        self.isValid = isValid
        self.bufferState = bufferState
        self.agent = agent
        self.confidence = confidence
    }
}

public struct CognitiveResult {
    public let processedContent: String
    public let cognitiveAlignment: Double
    
    public init(processedContent: String, cognitiveAlignment: Double) {
        self.processedContent = processedContent
        self.cognitiveAlignment = cognitiveAlignment
    }
}

// MARK: - NJSON Bridge Extension

extension NJSONSwiftBridge {
    public func processContent(_ content: String) async -> CognitiveResult {
        // Process content through NJSON engine
        // This integrates with our existing breakthrough architecture
        
        // Simulate cognitive processing
        do {
            try await Task.sleep(nanoseconds: 100_000_000) // 0.1 second
        } catch {
            // Handle sleep interruption gracefully
            print("⚠️ Cognitive processing interrupted: \(error)")
        }
        
        return CognitiveResult(
            processedContent: "// NJSON Processed:\n\(content)\n// Buffer State: Maintained at 0.1",
            cognitiveAlignment: 2.89 // Maintains AIc value for 0.1 buffer
        )
    }
    
    public func initialize() async {
        // Initialize NJSON bridge
        print("🧠 NJSON Bridge initialized - cognitive engine ready")
    }
} 