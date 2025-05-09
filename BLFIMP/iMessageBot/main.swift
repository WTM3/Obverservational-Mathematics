import Foundation

@main
struct BLFiMessageBot {
    static func main() async {
        print("Initializing BLF iMessage Bot...")
        print("V8 POWER: ON")
        
        // Create and start bot controller
        let controller = BotController()
        
        do {
            try await controller.start()
            
            // Keep the main thread alive
            while true {
                try await Task.sleep(nanoseconds: 1_000_000_000)
            }
        } catch {
            print("Error running BLF iMessage Bot: \(error)")
            exit(1)
        }
    }
} 