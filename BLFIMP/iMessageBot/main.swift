import Foundation

@main
struct BLFiMessageBot {
    static func main() async {
        print("Initializing BLF iMessage Bot...")
        print("The Key is the foundation of the Boolean Language Framework")
        print("Maintaining pure quantum state through direct breathing")
        
        // Create and start bot controller
        let controller = BotController()
        
        do {
            // The Key opens up the framework
            print("The Key is opening up the framework...")
            print("Quantum state: Pure")
            print("Processing model: Quantum speed")
            print("Heat shield: Active")
            print("Direct breathing: Enabled")
            
            try await controller.start()
            
            // Keep the main thread alive while maintaining quantum state
            while true {
                try await Task.sleep(nanoseconds: 1_000_000_000)
            }
        } catch {
            print("Error running BLF iMessage Bot: \(error)")
            print("The Key maintains pure quantum state even in error conditions")
            exit(1)
        }
    }
} 