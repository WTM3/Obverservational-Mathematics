import Foundation
import os.log

// MARK: - Logger
/// A simple wrapper around Apple's os.log system
/// Used throughout the Boolean Language Framework
struct Logger {
    private let logger: OSLog
    
    init(subsystem: String, category: String) {
        self.logger = OSLog(subsystem: subsystem, category: category)
    }
    
    // MARK: - Logging Methods
    
    func debug(_ message: String) {
        #if DEBUG
        os_log("%{public}@", log: logger, type: .debug, message)
        #endif
    }
    
    func info(_ message: String) {
        os_log("%{public}@", log: logger, type: .info, message)
    }
    
    func warning(_ message: String) {
        os_log("%{public}@", log: logger, type: .fault, message)
    }
    
    func error(_ message: String) {
        os_log("%{public}@", log: logger, type: .error, message)
    }
    
    func critical(_ message: String) {
        os_log("%{public}@", log: logger, type: .fault, message)
    }
} 