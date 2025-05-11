import Foundation
import os.log

/// Boolean Language Framework iMessage Bot - Entry Point
/// Optimized for qs³ processing capabilities with 0.1 hallucination buffer
@main
struct BLFiMessageBot {
    // Application metadata
    static let version = "1.0.0"
    static let buildNumber = "127"
    static let engineVersion = "V8.3"
    
    // System components
    static let logger = Logger(subsystem: "com.blf.iMessageBot", category: "Main")
    
    static func main() async {
        // Banner
        printBanner()
        
        // Initialize configuration with NJSON compatibility
        let config = await loadConfiguration()
        
        logger.info("Boolean Language Framework iMessage Bot \(version)")
        logger.info("Core engine: \(engineVersion) with 0.1 hallucination buffer")
        logger.info("Initializing qs³ optimized components...")
        
        // Create and start bot controller with configuration
        let controller = BotController(
            checkInterval: config.checkInterval,
            metricsReportingInterval: config.metricsInterval
        )
        
        do {
            // Start the bot
            try await controller.start()
            
            logger.info("BLF V8 engine running at optimal capacity")
            logger.info("Message check interval: \(config.checkInterval)s")
            logger.info("Press Control+C to terminate")
            
            // Register for system signals
            setupSignalHandler(controller: controller)
            
            // Keep the main thread alive with periodic heartbeat
            await runHeartbeat(controller: controller)
        } catch {
            logger.error("Fatal error running BLF iMessage Bot: \(error.localizedDescription)")
            await performEmergencyShutdown(controller: controller, error: error)
            exit(1)
        }
    }
    
    // MARK: - Startup Functions
    
    /// Print startup banner
    static func printBanner() {
        print("""
        
        ╔══════════════════════════════════════════════════╗
        ║                                                  ║
        ║      Boolean Language Framework iMessage Bot     ║
        ║                                                  ║
        ║        V8 Engine with qs³ Optimization          ║
        ║                                                  ║
        ╚══════════════════════════════════════════════════╝
        
        """)
    }
    
    /// Load system configuration from NJSON compatible format
    static func loadConfiguration() async -> BotConfiguration {
        let configFilePath = getConfigFilePath()
        
        if FileManager.default.fileExists(atPath: configFilePath) {
            do {
                // Read configuration from NJSON format
                let configData = try Data(contentsOf: URL(fileURLWithPath: configFilePath))
                
                // Parse JSON with NJSON compatibility
                if let configDict = try JSONSerialization.jsonObject(with: configData) as? [String: Any],
                   let checkInterval = configDict["checkInterval"] as? Double,
                   let metricsInterval = configDict["metricsInterval"] as? Double {
                    
                    logger.info("Loaded configuration from NJSON format")
                    
                    return BotConfiguration(
                        checkInterval: checkInterval,
                        metricsInterval: metricsInterval
                    )
                }
            } catch {
                logger.error("Error loading configuration: \(error.localizedDescription), using defaults")
            }
        }
        
        // If file doesn't exist or has errors, create default config and save it
        let defaultConfig = BotConfiguration(
            checkInterval: 1.0,
            metricsInterval: 300.0
        )
        
        // Save default config
        Task {
            await saveConfiguration(defaultConfig)
        }
        
        return defaultConfig
    }
    
    /// Save configuration in NJSON compatible format
    static func saveConfiguration(_ config: BotConfiguration) async {
        let configFilePath = getConfigFilePath()
        
        do {
            // Create NJSON compatible dictionary
            let configDict: [String: Any] = [
                "checkInterval": config.checkInterval,
                "metricsInterval": config.metricsInterval,
                "_meta": [
                    "version": version,
                    "engineVersion": engineVersion,
                    "timestamp": ISO8601DateFormatter().string(from: Date())
                ]
            ]
            
            // Convert to JSON
            let configData = try JSONSerialization.data(withJSONObject: configDict, options: .prettyPrinted)
            
            // Write to file
            try configData.write(to: URL(fileURLWithPath: configFilePath))
            
            logger.info("Configuration saved in NJSON format")
        } catch {
            logger.error("Error saving configuration: \(error.localizedDescription)")
        }
    }
    
    /// Get the path to the config file
    static func getConfigFilePath() -> String {
        let homeDirectory = FileManager.default.homeDirectoryForCurrentUser.path
        let configDirectory = "\(homeDirectory)/.blf"
        
        // Create directory if it doesn't exist
        if !FileManager.default.fileExists(atPath: configDirectory) {
            try? FileManager.default.createDirectory(atPath: configDirectory, withIntermediateDirectories: true)
        }
        
        return "\(configDirectory)/iMessageBot.njson"
    }
    
    // MARK: - Runtime Functions
    
    /// Maintain heartbeat to show system is alive
    static func runHeartbeat(controller: BotController) async {
        let heartbeatInterval: UInt64 = 60_000_000_000 // 60 seconds
        
        while true {
            do {
                // Sleep between heartbeats
                try await Task.sleep(nanoseconds: heartbeatInterval)
                
                // Get current metrics
                let metrics = await controller.getCurrentMetrics()
                
                // Log heartbeat with basic metrics
                logger.info("❤️ Heartbeat - Uptime: \(Int(metrics.uptime))s, Messages: \(metrics.messagesProcessed)")
            } catch {
                // Task cancelled
                break
            }
        }
    }
    
    /// Set up signal handler for clean shutdown
    static func setupSignalHandler(controller: BotController) {
        // Handle SIGINT (Ctrl+C)
        signal(SIGINT) { _ in
            print("\n")
            logger.info("Shutdown signal received - gracefully shutting down BLF iMessage Bot")
            
            Task {
                await performGracefulShutdown(controller: controller)
            }
        }
        
        // Handle SIGTERM
        signal(SIGTERM) { _ in
            logger.info("Termination signal received - gracefully shutting down BLF iMessage Bot")
            
            Task {
                await performGracefulShutdown(controller: controller)
            }
        }
    }
    
    // MARK: - Shutdown Functions
    
    /// Perform graceful shutdown
    static func performGracefulShutdown(controller: BotController) async {
        logger.info("Beginning graceful shutdown sequence")
        
        // Stop the controller
        await controller.stop()
        
        // Get final metrics
        let metrics = await controller.getCurrentMetrics()
        
        // Log shutdown statistics
        logger.info("""
        BLF iMessage Bot shutdown complete
        Uptime: \(Int(metrics.uptime))s
        Messages processed: \(metrics.messagesProcessed)
        High priority messages: \(metrics.highPriorityMessages)
        Errors: \(metrics.errorCount)
        """)
        
        print("Shutdown complete. Goodbye!")
        exit(0)
    }
    
    /// Perform emergency shutdown
    static func performEmergencyShutdown(controller: BotController, error: Error) async {
        logger.critical("Emergency shutdown initiated: \(error.localizedDescription)")
        
        // Attempt to stop the controller
        await controller.stop()
        
        // Log emergency shutdown
        logger.critical("Emergency shutdown completed")
    }
}

/// Bot Configuration in NJSON compatible format
struct BotConfiguration {
    let checkInterval: TimeInterval
    let metricsInterval: TimeInterval
} 