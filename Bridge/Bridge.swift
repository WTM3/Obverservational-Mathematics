import Foundation
import XcodeKit
import BLFNJSONBridge

class Bridge: NSObject, XCSourceEditorExtension {
    func extensionDidFinishLaunching() {
        print("🌉 BLF Bridge: Connected to V-8")
    }
    var commandDefinitions: [[XCSourceEditorCommandDefinitionKey: Any]] { return [] }
}
