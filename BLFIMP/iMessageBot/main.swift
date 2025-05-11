import Foundation
import os.log

@main
struct BLFiMessageBot {
    static func main() async {
        let logger = Logger(subsystem: "com.blf.iMessageBot", category: "Main")
        
        logger.info("🚀 Boolean Language Framework iMessage Bot")
        logger.info("Initializing V8 engine components...")
        
        // Create and start bot controller
        let controller = BotController()
        
        do {
            // Start the bot
            try await controller.start()
            
            logger.info("BLF V8 engine running at optimal capacity")
            logger.info("Press Control+C to terminate")
            
            // Set up signal handler for graceful shutdown
            setupSignalHandler(controller: controller)
            
            // Keep the main thread alive
            while true {
                try await Task.sleep(nanoseconds: 1_000_000_000)
            }
        } catch {
            logger.error("Fatal error running BLF iMessage Bot: \(error.localizedDescription)")
            exit(1)
        }
    }
    
    static func setupSignalHandler(controller: BotController) {
        // Set up signal handler for graceful shutdown
        signal(SIGINT) { _ in
            print("\nGracefully shutting down BLF iMessage Bot...")
            
            Task {
                await controller.stop()
                print("Shutdown complete. Goodbye!")
                exit(0)
            }
        }
    }
} 