import Foundation
import os.log

/// Boolean Language Framework templating system optimized for qs³ processing
@available(macOS 10.15, *)
actor TemplateSystem {
    // MARK: - Properties
    
    /// All available templates indexed by type, branch, and padding level
    private var templates: [String: [String: [String: String]]] = [:]
    
    /// Template loading status for different sources
    private var loadedSources: [TemplateSource: Bool] = [:]
    
    /// Parsing and formatting performance metrics
    private var metrics = TemplateMetrics()
    
    /// Logging interface
    private let logger = Logger(subsystem: "com.blf.templates", category: "TemplateSystem")
    
    // MARK: - Initialization
    
    init() {
        Task {
            await loadAllTemplates()
        }
        logger.info("Template system initialized with qs³ optimization")
    }
    
    // MARK: - Template Loading
    
    /// Load all templates from all available sources
    private func loadAllTemplates() async {
        do {
            // Load bundled templates first (always available)
            try await loadBundledTemplates()
            
            // Try to load from user-customized templates file
            try await loadUserTemplates()
            
            // Log loading results
            logger.info("Loaded templates: \(getTemplateCount()) templates across \(templates.keys.count) categories")
        } catch {
            logger.error("Failed to load all templates: \(error.localizedDescription)")
        }
    }
    
    /// Load templates bundled with the application
    private func loadBundledTemplates() async throws {
        // Mark bundled templates as loading
        loadedSources[.bundled] = false
        
        // In a real implementation, this would load JSON from a bundle resource
        // For now, we'll use hardcoded templates
        
        // Initialize template categories
        templates["standard"] = [:]
        templates["birthday"] = [:]
        templates["getWell"] = [:]
        templates["congratulations"] = [:]
        templates["checkIn"] = [:]
        templates["questionResponse"] = [:]
        templates["subjectChange"] = [:]
        
        // Standard templates
        templates["standard"]["familyFriends"] = [
            "none": "{content}",
            "medium": "{content}",
            "more": "Hey! {content}"
        ]
        
        templates["standard"]["professional"] = [
            "none": "{content}",
            "medium": "{content}",
            "more": "Hello, {content}"
        ]
        
        // Subject change templates
        templates["subjectChange"]["familyFriends"] = [
            "none": "{content}",
            "medium": "New topic: {content}",
            "more": "Speaking of something else: {content}"
        ]
        
        templates["subjectChange"]["professional"] = [
            "none": "{content}",
            "medium": "On another note: {content}",
            "more": "Regarding a different matter: {content}"
        ]
        
        // Question response templates
        templates["questionResponse"]["familyFriends"] = [
            "none": "{content}",
            "medium": "{content}",
            "more": "To answer your question: {content}"
        ]
        
        templates["questionResponse"]["professional"] = [
            "none": "{content}",
            "medium": "{content}",
            "more": "In response to your inquiry: {content}"
        ]
        
        // Birthday templates
        templates["birthday"]["familyFriends"] = [
            "none": "Happy Birthday!",
            "medium": "Happy Birthday, {recipient}!",
            "more": "Happy Birthday, {recipient}! Hope you have a great day!"
        ]
        
        templates["birthday"]["professional"] = [
            "none": "Happy Birthday.",
            "medium": "Happy Birthday, {recipient}.",
            "more": "Happy Birthday, {recipient}. Hope you enjoy your special day."
        ]
        
        // Get well templates
        templates["getWell"]["familyFriends"] = [
            "none": "Get well soon.",
            "medium": "Hope you feel better soon, {recipient}.",
            "more": "Sorry to hear you're not feeling well, {recipient}. Hope you feel better soon!"
        ]
        
        templates["getWell"]["professional"] = [
            "none": "Get well soon.",
            "medium": "Hope you recover quickly, {recipient}.",
            "more": "I was sorry to hear you're unwell, {recipient}. Wishing you a speedy recovery."
        ]
        
        // Mark bundled templates as loaded
        loadedSources[.bundled] = true
        logger.debug("Bundled templates loaded successfully")
    }
    
    /// Load user-customized templates
    private func loadUserTemplates() async throws {
        // Mark user templates as loading
        loadedSources[.user] = false
        
        // Check for user templates file in Documents directory
        let fileManager = FileManager.default
        let documentDirectory = try fileManager.url(for: .documentDirectory, 
                                                  in: .userDomainMask, 
                                                  appropriateFor: nil, 
                                                  create: false)
        let templateFileURL = documentDirectory.appendingPathComponent("blf_templates.json")
        
        // Check if file exists
        if fileManager.fileExists(atPath: templateFileURL.path) {
            do {
                // Load and parse JSON
                let templateData = try Data(contentsOf: templateFileURL)
                let decoder = JSONDecoder()
                let userTemplates = try decoder.decode([String: [String: [String: String]]].self, from: templateData)
                
                // Merge with existing templates
                for (category, branchTemplates) in userTemplates {
                    if templates[category] == nil {
                        templates[category] = [:]
                    }
                    
                    for (branch, paddingTemplates) in branchTemplates {
                        if templates[category]?[branch] == nil {
                            templates[category]?[branch] = [:]
                        }
                        
                        // Add or override templates
                        for (padding, template) in paddingTemplates {
                            templates[category]?[branch]?[padding] = template
                        }
                    }
                }
                
                // Mark user templates as loaded
                loadedSources[.user] = true
                logger.info("User templates loaded successfully from \(templateFileURL.path)")
            } catch {
                logger.warning("Failed to load user templates: \(error.localizedDescription)")
                // Not marking as loaded since it failed
            }
        } else {
            // No user templates, mark as not loaded but not an error
            logger.debug("No user templates found at \(templateFileURL.path)")
        }
    }
    
    // MARK: - Template Retrieval
    
    /// Get a template for a specific type, branch, and padding level
    func getTemplate(type: String, branch: String, padding: String) -> String? {
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Check if template exists
        let template = templates[type]?[branch]?[padding]
        
        // Record metrics
        let retrievalTime = CFAbsoluteTimeGetCurrent() - startTime
        metrics.recordRetrieval(time: retrievalTime, found: template != nil)
        
        return template
    }
    
    /// Format a template with parameters
    func formatTemplate(_ template: String, with parameters: [String: String]) -> String {
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Simple template formatting with {placeholder} syntax
        var result = template
        
        for (key, value) in parameters {
            result = result.replacingOccurrences(of: "{\(key)}", with: value)
        }
        
        // Record metrics
        let formatTime = CFAbsoluteTimeGetCurrent() - startTime
        metrics.recordFormatting(time: formatTime)
        
        return result
    }
    
    /// Get a formatted message using templates
    func getMessage(type: String, branch: String, padding: String, parameters: [String: String]) -> String {
        let defaultMessage = parameters["content"] ?? parameters["default"] ?? "Message"
        
        // First try to get the specific template
        guard let template = templates[type]?[branch]?[padding] else {
            // Use fallback template or default message
            if let fallbackTemplate = getFallbackTemplate(type: type, branch: branch, padding: padding) {
                return formatTemplate(fallbackTemplate, with: parameters)
            }
            return defaultMessage
        }
        
        // Format the template with parameters
        return formatTemplate(template, with: parameters)
    }
    
    /// Find a suitable fallback template when the exact one isn't available
    private func getFallbackTemplate(type: String, branch: String, padding: String) -> String? {
        // Try different fallback strategies
        
        // 1. Try different padding in same branch/type
        let paddingOptions = ["medium", "none", "more"]
        for paddingOption in paddingOptions where paddingOption != padding {
            if let template = templates[type]?[branch]?[paddingOption] {
                logger.debug("Using padding fallback for \(type)/\(branch)/\(padding) -> \(paddingOption)")
                return template
            }
        }
        
        // 2. Try different branch with same type/padding
        let branchOptions = ["familyFriends", "professional"]
        for branchOption in branchOptions where branchOption != branch {
            if let template = templates[type]?[branchOption]?[padding] {
                logger.debug("Using branch fallback for \(type)/\(branch)/\(padding) -> \(branchOption)")
                return template
            }
        }
        
        // 3. Try standard template type as final fallback
        if type != "standard",
           let standardTemplate = templates["standard"]?[branch]?[padding] {
            logger.debug("Using standard fallback for \(type)/\(branch)/\(padding)")
            return standardTemplate
        }
        
        // No suitable fallback found
        return nil
    }
    
    // MARK: - Statistics and Metrics
    
    /// Get template count
    func getTemplateCount() -> Int {
        var count = 0
        for (_, branchTemplates) in templates {
            for (_, paddingTemplates) in branchTemplates {
                count += paddingTemplates.count
            }
        }
        return count
    }
    
    /// Get template system metrics
    func getMetrics() -> TemplateMetrics {
        return metrics
    }
}

// MARK: - Supporting Types

/// Sources of templates
enum TemplateSource {
    case bundled    // Templates included with the application
    case user       // User-customized templates
    case remote     // Templates fetched from remote source
}

/// Performance metrics for template system
struct TemplateMetrics {
    var retrievalCount: Int = 0
    var retrievalNotFoundCount: Int = 0
    var totalRetrievalTime: Double = 0
    var formattingCount: Int = 0
    var totalFormattingTime: Double = 0
    
    var averageRetrievalTime: Double {
        retrievalCount > 0 ? totalRetrievalTime / Double(retrievalCount) : 0
    }
    
    var averageFormattingTime: Double {
        formattingCount > 0 ? totalFormattingTime / Double(formattingCount) : 0
    }
    
    var missRate: Double {
        retrievalCount > 0 ? Double(retrievalNotFoundCount) / Double(retrievalCount) : 0
    }
    
    mutating func recordRetrieval(time: Double, found: Bool) {
        retrievalCount += 1
        totalRetrievalTime += time
        if !found {
            retrievalNotFoundCount += 1
        }
    }
    
    mutating func recordFormatting(time: Double) {
        formattingCount += 1
        totalFormattingTime += time
    }
} 