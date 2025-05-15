import Foundation

class Logger {
    static func info(_ message: String) {
        print("[INFO] \(timestamp()) - \(message)")
    }
    static func warning(_ message: String) {
        print("[WARNING] \(timestamp()) - \(message)")
    }
    static func error(_ message: String) {
        print("[ERROR] \(timestamp()) - \(message)")
    }
    private static func timestamp() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        return formatter.string(from: Date())
    }
} 