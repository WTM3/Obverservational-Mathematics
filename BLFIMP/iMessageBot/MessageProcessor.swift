import Foundation

class MessageProcessor {
    // Option to enable or disable foul language filtering
    var filterFoulLanguage: Bool
    
    // User age property
    var userAge: Int {
        didSet {
            // If user is 18 or older, disable foul language filter by default
            if userAge >= 18 {
                filterFoulLanguage = false
            } else {
                filterFoulLanguage = true
            }
        }
    }
    
    // List of foul words to filter (expand as needed)
    private let foulWords: Set<String> = ["badword1", "badword2", "badword3"]
    
    // Initializer
    init(userAge: Int) {
        self.userAge = userAge
        // Set filterFoulLanguage based on age
        if userAge >= 18 {
            self.filterFoulLanguage = false
        } else {
            self.filterFoulLanguage = true
        }
    }
    
    // Placeholder for message processing logic
    // Add your methods and properties here
    
    func process(message: String) -> String {
        var processedMessage = message
        if filterFoulLanguage {
            processedMessage = filterFoulLanguageIn(message: processedMessage)
        }
        // Example: Echo the message for now (after filtering)
        return processedMessage
    }
    
    private func filterFoulLanguageIn(message: String) -> String {
        // Simple word-based filter (case-insensitive)
        let words = message.components(separatedBy: .whitespacesAndNewlines)
        let filteredWords = words.map { word -> String in
            let lowercased = word.lowercased().trimmingCharacters(in: .punctuationCharacters)
            if foulWords.contains(lowercased) {
                return String(repeating: "*", count: word.count)
            } else {
                return word
            }
        }
        return filteredWords.joined(separator: " ")
    }
} 