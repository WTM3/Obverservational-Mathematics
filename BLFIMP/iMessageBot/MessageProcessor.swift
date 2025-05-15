import Foundation

// MARK: - MessageProcessor delegates all logic to NJSON (the V-8 engine)
class MessageProcessor {
    // Placeholder for NJSON engine instance
    // In the future, this will be the core logic engine
    // var njsonEngine: NJSONEngine
    
    // User age property (kept for minimal context, can be passed to NJSON)
    let userAge: Int
    private var journal: [String] = []
    
    // Initializer
    init(userAge: Int) {
        self.userAge = userAge
        // NJSON engine would be initialized here
        // self.njsonEngine = NJSONEngine(userAge: userAge)
        journal.append("# MessageProcessor Journal\n- **Instance created**\n- **User age:** \(userAge)\n- **Timestamp:** \(Date())\n")
    }
    
    // Result struct to hold response and intervention flag
    struct ProcessResult {
        let response: String
        let requiresIntervention: Bool
    }
    
    // Process message by delegating to NJSON
    func process(message: String) -> ProcessResult {
        // Placeholder: Basic wellness check (to be replaced by NJSON logic)
        let distressKeywords = ["help", "sad", "depressed", "overwhelmed", "hopeless"]
        let lowercased = message.lowercased()
        let needsSupport = distressKeywords.contains { lowercased.contains($0) }
        // Journal entry in Markdown
        let entry = """
## Message Processed
- **Input:** `\(message)`
- **Requires Intervention:** \(needsSupport ? "Yes" : "No")
- **Timestamp:** \(Date())
"""
        journal.append(entry)
        return ProcessResult(response: message, requiresIntervention: needsSupport)
        // Future:
        // let njsonResult = njsonEngine.process(message: message)
        // return ProcessResult(response: njsonResult.response, requiresIntervention: njsonResult.requiresIntervention)
    }
    
    func addJournalEntry(title: String, details: String) {
        let entry = """
### \(title)
\(details)
- **Timestamp:** \(Date())
"""
        journal.append(entry)
    }
    
    func exportJournalMarkdown() -> String {
        return journal.joined(separator: "\n\n")
    }
    
    func saveJournalToRoot() {
        let markdown = exportJournalMarkdown()
        // Adjust path as needed; this assumes running from BLFIMP/iMessageBot/
        let fileURL = URL(fileURLWithPath: "../../MessageProcessorJournal.md")
        do {
            try markdown.write(to: fileURL, atomically: true, encoding: .utf8)
            print("Journal saved to root repository.")
        } catch {
            print("Failed to save journal: \(error)")
        }
    }
}

// MARK: - Test Code (optional, can be removed or adapted for NJSON)
// func testMessageProcessor() {
//     let processor = MessageProcessor(userAge: 12)
//     let response = processor.process(message: "Hello, world!")
//     print("Response: \(response)")
// }
// testMessageProcessor()

// Example usage (for demonstration)
// let processor = MessageProcessor(userAge: 20)
// let result = processor.process(message: "I feel sad today.")
// if result.requiresIntervention {
//     print("ALERT: User may need support.")
// }
// processor.saveJournalToRoot()
// print("Bot response: \(result.response)") 