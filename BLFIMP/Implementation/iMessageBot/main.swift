import Foundation
import BLFCore

func main() {
    // Create NJSON instance with default configuration
    let njson = NJSON()
    do {
        // Initialize NJSON
        try njson.initialize()
        // Create message handler
        let handler = NJSONMessageHandler(njson: njson)
        // Start monitoring for new messages
        try handler.startMonitoring()
        // Keep the main thread alive
        RunLoop.main.run()
    } catch {
        print("Error initializing or running NJSON iMessage bot: \(error)")
    }
}

main() 