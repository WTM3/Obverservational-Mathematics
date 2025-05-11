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
        
        // Initialize configuration
        let config = loadConfiguration()
        
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
    
    /// Load system configuration (or use defaults)
    static func loadConfiguration() -> BotConfiguration {
        // In a real implementation, this would load from a configuration file
        // For now, we'll use sensible defaults
        return BotConfiguration(
            checkInterval: 1.0,
            metricsInterval: 300.0
        )
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

/// Bot Configuration
struct BotConfiguration {
    let checkInterval: TimeInterval
    let metricsInterval: TimeInterval
} 