import Foundation
import XcodeKit
import BLFNJSONBridge

/// Cursor-Powered Xcode Source Editor Extension
/// The narrow bridge between Xcode and AI-powered development
/// Built for professional developers who demand premium performance
class CursorXcodeSourceEditorExtension: NSObject, XCSourceEditorExtension {
    
    private let cursorFramework = CursorAIFramework()
    private let dropdownMenu = iMessageDropdownMenu()
    
    func extensionDidFinishLaunching() {
        print("🚀 Cursor Xcode Extension: V-8 engine starting...")
        
        Task {
            await cursorFramework.initialize()
            print("✅ Cursor AI Framework ready for professional development")
            print("🎯 AMF optimization: Active for Claude Sonnet reasoning patterns")
        }
    }
    
    var commandDefinitions: [[XCSourceEditorCommandDefinitionKey: Any]] {
        return [
            // Core AI Commands
            [
                XCSourceEditorCommandDefinitionKey.classNameKey: "CursorCodeCompletionCommand",
                XCSourceEditorCommandDefinitionKey.commandNameKey: "Cursor: AI Code Completion",
                XCSourceEditorCommandDefinitionKey.commandIdentifierKey: "cursor.completion"
            ],
            [
                XCSourceEditorCommandDefinitionKey.classNameKey: "CursorChatCommand", 
                XCSourceEditorCommandDefinitionKey.commandNameKey: "Cursor: AI Chat (CMD+L)",
                XCSourceEditorCommandDefinitionKey.commandIdentifierKey: "cursor.chat"
            ],
            [
                XCSourceEditorCommandDefinitionKey.classNameKey: "CursorInlineEditCommand",
                XCSourceEditorCommandDefinitionKey.commandNameKey: "Cursor: Inline Edit (CMD+K)",
                XCSourceEditorCommandDefinitionKey.commandIdentifierKey: "cursor.inline.edit"
            ],
            [
                XCSourceEditorCommandDefinitionKey.classNameKey: "CursorRefactorCommand",
                XCSourceEditorCommandDefinitionKey.commandNameKey: "Cursor: AI Refactor",
                XCSourceEditorCommandDefinitionKey.commandIdentifierKey: "cursor.refactor"
            ],
            [
                XCSourceEditorCommandDefinitionKey.classNameKey: "CursorExplainCommand",
                XCSourceEditorCommandDefinitionKey.commandNameKey: "Cursor: Explain Code",
                XCSourceEditorCommandDefinitionKey.commandIdentifierKey: "cursor.explain"
            ],
            [
                XCSourceEditorCommandDefinitionKey.classNameKey: "CursorOptimizeCommand",
                XCSourceEditorCommandDefinitionKey.commandNameKey: "Cursor: Optimize Code",
                XCSourceEditorCommandDefinitionKey.commandIdentifierKey: "cursor.optimize"
            ],
            [
                XCSourceEditorCommandDefinitionKey.classNameKey: "CursorDocumentCommand",
                XCSourceEditorCommandDefinitionKey.commandNameKey: "Cursor: Generate Documentation",
                XCSourceEditorCommandDefinitionKey.commandIdentifierKey: "cursor.document"
            ],
            [
                XCSourceEditorCommandDefinitionKey.classNameKey: "CursorDebugCommand",
                XCSourceEditorCommandDefinitionKey.commandNameKey: "Cursor: Debug Assistant",
                XCSourceEditorCommandDefinitionKey.commandIdentifierKey: "cursor.debug"
            ],
            
            // Social Padding Commands
            [
                XCSourceEditorCommandDefinitionKey.classNameKey: "CursorMentionCommand",
                XCSourceEditorCommandDefinitionKey.commandNameKey: "Cursor: @Mention with Social Padding",
                XCSourceEditorCommandDefinitionKey.commandIdentifierKey: "cursor.mention"
            ],
            [
                XCSourceEditorCommandDefinitionKey.classNameKey: "CursorCommentPaddingCommand",
                XCSourceEditorCommandDefinitionKey.commandNameKey: "Cursor: Add Social Padding to Comments",
                XCSourceEditorCommandDefinitionKey.commandIdentifierKey: "cursor.comment.padding"
            ]
        ]
    }
}

// MARK: - Base Command Class

class CursorBaseCommand: NSObject, XCSourceEditorCommand {
    
    let cursorFramework = CursorAIFramework()
    
    func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        // Override in subclasses
        completionHandler(nil)
    }
    
    // MARK: - Helper Methods
    
    func getSelectedText(from invocation: XCSourceEditorCommandInvocation) -> (text: String, range: NSRange)? {
        guard let selection = invocation.buffer.selections.firstObject as? XCSourceTextRange else {
            return nil
        }
        
        let startLine = selection.start.line
        let endLine = selection.end.line
        let startColumn = selection.start.column
        let endColumn = selection.end.column
        
        var selectedText = ""
        
        if startLine == endLine {
            // Single line selection
            let line = invocation.buffer.lines[startLine] as! String
            let startIndex = line.index(line.startIndex, offsetBy: startColumn)
            let endIndex = line.index(line.startIndex, offsetBy: endColumn)
            selectedText = String(line[startIndex..<endIndex])
        } else {
            // Multi-line selection
            for lineIndex in startLine...endLine {
                let line = invocation.buffer.lines[lineIndex] as! String
                
                if lineIndex == startLine {
                    let startIndex = line.index(line.startIndex, offsetBy: startColumn)
                    selectedText += String(line[startIndex...])
                } else if lineIndex == endLine {
                    let endIndex = line.index(line.startIndex, offsetBy: endColumn)
                    selectedText += String(line[..<endIndex])
                } else {
                    selectedText += line
                }
                
                if lineIndex < endLine {
                    selectedText += "\n"
                }
            }
        }
        
        return (selectedText, NSRange(location: startLine, length: endLine - startLine + 1))
    }
    
    func replaceSelectedText(in invocation: XCSourceEditorCommandInvocation, with newText: String) {
        guard let selection = invocation.buffer.selections.firstObject as? XCSourceTextRange else {
            return
        }
        
        let startLine = selection.start.line
        let endLine = selection.end.line
        let startColumn = selection.start.column
        let endColumn = selection.end.column
        
        // Replace the selected text
        if startLine == endLine {
            // Single line replacement
            let line = invocation.buffer.lines[startLine] as! String
            let startIndex = line.index(line.startIndex, offsetBy: startColumn)
            let endIndex = line.index(line.startIndex, offsetBy: endColumn)
            
            let newLine = String(line[..<startIndex]) + newText + String(line[endIndex...])
            invocation.buffer.lines[startLine] = newLine
        } else {
            // Multi-line replacement
            let firstLine = invocation.buffer.lines[startLine] as! String
            let lastLine = invocation.buffer.lines[endLine] as! String
            
            let startIndex = firstLine.index(firstLine.startIndex, offsetBy: startColumn)
            let endIndex = lastLine.index(lastLine.startIndex, offsetBy: endColumn)
            
            let newLine = String(firstLine[..<startIndex]) + newText + String(lastLine[endIndex...])
            
            // Remove the lines in between
            for _ in startLine..<endLine {
                invocation.buffer.lines.removeObject(at: startLine + 1)
            }
            
            // Replace the first line
            invocation.buffer.lines[startLine] = newLine
        }
        
        // Update selection to end of inserted text
        let newEndColumn = startColumn + newText.count
        selection.start = XCSourceTextPosition(line: startLine, column: newEndColumn)
        selection.end = XCSourceTextPosition(line: startLine, column: newEndColumn)
    }
    
    func insertTextAtCursor(in invocation: XCSourceEditorCommandInvocation, text: String) {
        guard let selection = invocation.buffer.selections.firstObject as? XCSourceTextRange else {
            return
        }
        
        let line = selection.start.line
        let column = selection.start.column
        
        let currentLine = invocation.buffer.lines[line] as! String
        let insertIndex = currentLine.index(currentLine.startIndex, offsetBy: column)
        
        let newLine = String(currentLine[..<insertIndex]) + text + String(currentLine[insertIndex...])
        invocation.buffer.lines[line] = newLine
        
        // Move cursor to end of inserted text
        let newColumn = column + text.count
        selection.start = XCSourceTextPosition(line: line, column: newColumn)
        selection.end = XCSourceTextPosition(line: line, column: newColumn)
    }
}

// MARK: - AI Command Implementations

class CursorCodeCompletionCommand: CursorBaseCommand {
    override func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        
        Task {
            do {
                // Get current context
                let currentLine = invocation.buffer.selections.firstObject as? XCSourceTextRange
                let lineIndex = currentLine?.start.line ?? 0
                let line = invocation.buffer.lines[lineIndex] as? String ?? ""
                
                // Create AI request for code completion
                let task = AITask(type: .codeCompletion, context: "Swift code completion in Xcode")
                let request = AIRequest(
                    task: task,
                    prompt: "Complete this Swift code: \(line)",
                    context: ["language": "swift", "editor": "xcode"]
                )
                
                // Process through Cursor AI Framework
                let response = try await cursorFramework.processAIRequest(request)
                
                // Insert completion
                await MainActor.run {
                    self.insertTextAtCursor(in: invocation, text: response.content)
                    completionHandler(nil)
                }
                
            } catch {
                await MainActor.run {
                    completionHandler(error)
                }
            }
        }
    }
}

class CursorChatCommand: CursorBaseCommand {
    override func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        
        // Get selected text for context
        let selectedText = getSelectedText(from: invocation)?.text ?? ""
        
        Task {
            do {
                let task = AITask(type: .explanation, context: "Xcode chat session", selectedCode: selectedText)
                let request = AIRequest(
                    task: task,
                    prompt: "Explain this code and suggest improvements: \(selectedText)",
                    context: ["mode": "chat", "language": "swift"]
                )
                
                let response = try await cursorFramework.processAIRequest(request)
                
                // Insert as comment
                let commentedResponse = response.content.components(separatedBy: .newlines)
                    .map { "// \($0)" }
                    .joined(separator: "\n")
                
                await MainActor.run {
                    self.insertTextAtCursor(in: invocation, text: "\n\(commentedResponse)\n")
                    completionHandler(nil)
                }
                
            } catch {
                await MainActor.run {
                    completionHandler(error)
                }
            }
        }
    }
}

class CursorInlineEditCommand: CursorBaseCommand {
    override func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        
        guard let selection = getSelectedText(from: invocation) else {
            completionHandler(NSError(domain: "CursorExtension", code: 1, userInfo: [NSLocalizedDescriptionKey: "No text selected"]))
            return
        }
        
        Task {
            do {
                let task = AITask(type: .refactoring, context: "Inline code editing", selectedCode: selection.text)
                let request = AIRequest(
                    task: task,
                    prompt: "Improve and refactor this code while maintaining functionality: \(selection.text)",
                    context: ["mode": "inline_edit", "language": "swift"]
                )
                
                let response = try await cursorFramework.processAIRequest(request)
                
                await MainActor.run {
                    self.replaceSelectedText(in: invocation, with: response.content)
                    completionHandler(nil)
                }
                
            } catch {
                await MainActor.run {
                    completionHandler(error)
                }
            }
        }
    }
}

class CursorRefactorCommand: CursorBaseCommand {
    override func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        
        guard let selection = getSelectedText(from: invocation) else {
            completionHandler(NSError(domain: "CursorExtension", code: 1, userInfo: [NSLocalizedDescriptionKey: "No text selected"]))
            return
        }
        
        Task {
            do {
                let task = AITask(type: .refactoring, context: "Code refactoring for better structure", selectedCode: selection.text)
                let request = AIRequest(
                    task: task,
                    prompt: "Refactor this Swift code for better readability, performance, and maintainability: \(selection.text)",
                    context: ["language": "swift", "focus": "refactoring"]
                )
                
                let response = try await cursorFramework.processAIRequest(request)
                
                await MainActor.run {
                    self.replaceSelectedText(in: invocation, with: response.content)
                    completionHandler(nil)
                }
                
            } catch {
                await MainActor.run {
                    completionHandler(error)
                }
            }
        }
    }
}

class CursorExplainCommand: CursorBaseCommand {
    override func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        
        guard let selection = getSelectedText(from: invocation) else {
            completionHandler(NSError(domain: "CursorExtension", code: 1, userInfo: [NSLocalizedDescriptionKey: "No text selected"]))
            return
        }
        
        Task {
            do {
                let task = AITask(type: .explanation, context: "Code explanation", selectedCode: selection.text)
                let request = AIRequest(
                    task: task,
                    prompt: "Explain this Swift code in detail, including its purpose, how it works, and any potential improvements: \(selection.text)",
                    context: ["language": "swift", "mode": "explanation"]
                )
                
                let response = try await cursorFramework.processAIRequest(request)
                
                // Insert explanation as comments above the selected code
                let explanation = response.content.components(separatedBy: .newlines)
                    .map { "// \($0)" }
                    .joined(separator: "\n")
                
                await MainActor.run {
                    // Insert at the beginning of the selection
                    if let selection = invocation.buffer.selections.firstObject as? XCSourceTextRange {
                        let lineIndex = selection.start.line
                        invocation.buffer.lines.insert("\(explanation)\n", at: lineIndex)
                    }
                    completionHandler(nil)
                }
                
            } catch {
                await MainActor.run {
                    completionHandler(error)
                }
            }
        }
    }
}

class CursorOptimizeCommand: CursorBaseCommand {
    override func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        
        guard let selection = getSelectedText(from: invocation) else {
            completionHandler(NSError(domain: "CursorExtension", code: 1, userInfo: [NSLocalizedDescriptionKey: "No text selected"]))
            return
        }
        
        Task {
            do {
                let task = AITask(type: .optimization, context: "Performance optimization", selectedCode: selection.text)
                let request = AIRequest(
                    task: task,
                    prompt: "Optimize this Swift code for better performance, memory usage, and efficiency: \(selection.text)",
                    context: ["language": "swift", "focus": "performance"]
                )
                
                let response = try await cursorFramework.processAIRequest(request)
                
                await MainActor.run {
                    self.replaceSelectedText(in: invocation, with: response.content)
                    completionHandler(nil)
                }
                
            } catch {
                await MainActor.run {
                    completionHandler(error)
                }
            }
        }
    }
}

class CursorDocumentCommand: CursorBaseCommand {
    override func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        
        guard let selection = getSelectedText(from: invocation) else {
            completionHandler(NSError(domain: "CursorExtension", code: 1, userInfo: [NSLocalizedDescriptionKey: "No text selected"]))
            return
        }
        
        Task {
            do {
                let task = AITask(type: .documentation, context: "Code documentation generation", selectedCode: selection.text)
                let request = AIRequest(
                    task: task,
                    prompt: "Generate comprehensive Swift documentation comments for this code: \(selection.text)",
                    context: ["language": "swift", "style": "swift_doc"]
                )
                
                let response = try await cursorFramework.processAIRequest(request)
                
                await MainActor.run {
                    // Insert documentation above the selected code
                    if let selection = invocation.buffer.selections.firstObject as? XCSourceTextRange {
                        let lineIndex = selection.start.line
                        invocation.buffer.lines.insert("\(response.content)\n", at: lineIndex)
                    }
                    completionHandler(nil)
                }
                
            } catch {
                await MainActor.run {
                    completionHandler(error)
                }
            }
        }
    }
}

class CursorDebugCommand: CursorBaseCommand {
    override func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        
        guard let selection = getSelectedText(from: invocation) else {
            completionHandler(NSError(domain: "CursorExtension", code: 1, userInfo: [NSLocalizedDescriptionKey: "No text selected"]))
            return
        }
        
        Task {
            do {
                let task = AITask(type: .debugging, context: "Debug assistance", selectedCode: selection.text)
                let request = AIRequest(
                    task: task,
                    prompt: "Analyze this Swift code for potential bugs, issues, and provide debugging suggestions: \(selection.text)",
                    context: ["language": "swift", "mode": "debug"]
                )
                
                let response = try await cursorFramework.processAIRequest(request)
                
                // Insert debug analysis as comments
                let debugComments = response.content.components(separatedBy: .newlines)
                    .map { "// DEBUG: \($0)" }
                    .joined(separator: "\n")
                
                await MainActor.run {
                    self.insertTextAtCursor(in: invocation, text: "\n\(debugComments)\n")
                    completionHandler(nil)
                }
                
            } catch {
                await MainActor.run {
                    completionHandler(error)
                }
            }
        }
    }
}

// MARK: - Social Padding Commands

class CursorMentionCommand: CursorBaseCommand {
    override func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        
        // Insert @mention dropdown trigger
        insertTextAtCursor(in: invocation, text: "@")
        
        // TODO: Integrate with iMessageDropdownMenu for contact selection
        // This would show the dropdown menu for contact selection with social padding
        
        completionHandler(nil)
    }
}

class CursorCommentPaddingCommand: CursorBaseCommand {
    override func perform(with invocation: XCSourceEditorCommandInvocation, completionHandler: @escaping (Error?) -> Void) {
        
        guard let selection = getSelectedText(from: invocation) else {
            completionHandler(NSError(domain: "CursorExtension", code: 1, userInfo: [NSLocalizedDescriptionKey: "No text selected"]))
            return
        }
        
        // Apply social padding to comments
        let paddingManager = SocialPaddingManager()
        paddingManager.showPaddingOptions(for: .work)
        
        // Add work-appropriate padding to the comment
        if let firstPadding = paddingManager.availablePadding.first {
            paddingManager.addPadding(firstPadding)
            let paddedComment = paddingManager.generatePaddedMessage(coreMessage: selection.text)
            
            replaceSelectedText(in: invocation, with: "// \(paddedComment)")
        }
        
        completionHandler(nil)
    }
} 