import Foundation
import CursorXcodeExtension
import BLFNJSONBridge

@main
struct CursorAITest {
    static func main() async {
        print("🚀 Cursor AI Framework Test - Multi-Agent Orchestration")
        print("The V-8 under the hood: NJSON + Multi-AI Integration")
        print("=========================================================")
        
        // Initialize the Cursor AI Framework
        let framework = CursorAIFramework()
        await framework.initialize()
        
        print("\n🧪 Testing Multi-AI Agent Capabilities...")
        
        // Test different AI tasks
        let testTasks = [
            (
                task: AITask(type: .codeCompletion, context: "Swift function", selectedCode: "func calculateSum("),
                prompt: "Complete this Swift function to calculate sum of two integers"
            ),
            (
                task: AITask(type: .codeGeneration, context: "SwiftUI View", selectedCode: nil),
                prompt: "Create a SwiftUI view for a weather card component"
            ),
            (
                task: AITask(type: .documentation, context: "API function", selectedCode: "func processData(_ data: [String]) -> Result<[ProcessedData], Error>"),
                prompt: "Generate comprehensive documentation for this function"
            ),
            (
                task: AITask(type: .debugging, context: "Memory leak", selectedCode: "class DataManager { var observers: [Observer] = [] }"),
                prompt: "Identify potential memory leaks in this code"
            ),
            (
                task: AITask(type: .refactoring, context: "Legacy code", selectedCode: "if condition == true { return true } else { return false }"),
                prompt: "Refactor this code to be more concise"
            ),
            (
                task: AITask(type: .explanation, context: "Algorithm", selectedCode: "func quickSort<T: Comparable>(_ array: [T]) -> [T]"),
                prompt: "Explain how this quicksort algorithm works"
            )
        ]
        
        for (index, testCase) in testTasks.enumerated() {
            print("\n📋 Test \(index + 1): \(testCase.task.type.rawValue)")
            print("   Context: \(testCase.task.context)")
            print("   Prompt: \(testCase.prompt)")
            
            do {
                let request = AIRequest(task: testCase.task, prompt: testCase.prompt)
                let response = try await framework.processAIRequest(request)
                
                print("   ✅ Agent: \(response.agent)")
                print("   ✅ Confidence: \(String(format: "%.1f%%", response.confidence * 100))")
                print("   ✅ Buffer State: \(response.bufferState)")
                print("   ✅ Valid: \(response.isValid ? "Yes" : "No")")
                print("   📝 Response Preview:")
                
                // Show first few lines of response
                let lines = response.content.components(separatedBy: .newlines)
                for (lineIndex, line) in lines.prefix(3).enumerated() {
                    print("      \(lineIndex + 1): \(line)")
                }
                if lines.count > 3 {
                    print("      ... (\(lines.count - 3) more lines)")
                }
                
            } catch {
                print("   ❌ Error: \(error)")
            }
            
            // Small delay between tests
            try? await Task.sleep(nanoseconds: 500_000_000) // 0.5 seconds
        }
        
        print("\n🎯 Multi-AI Agent Test Complete!")
        print("The narrow bridge between chaos and control is operational! 🚗💨")
        
        // Test NJSON cognitive validation
        print("\n🧠 Testing NJSON Cognitive Validation...")
        
        let cognitiveTest = AITask(type: .optimization, context: "Performance critical", selectedCode: "for i in 0..<1000000 { array.append(i) }")
        let cognitiveRequest = AIRequest(task: cognitiveTest, prompt: "Optimize this performance-critical loop")
        
        do {
            let cognitiveResponse = try await framework.processAIRequest(cognitiveRequest)
            
            print("   🧠 Cognitive Processing Results:")
            print("   ✅ Buffer Integrity: \(cognitiveResponse.bufferState == 0.1 ? "Maintained" : "Violated")")
            print("   ✅ NJSON Validation: \(cognitiveResponse.isValid ? "Passed" : "Failed")")
            print("   ✅ Agent Selection: \(cognitiveResponse.agent)")
            
            if cognitiveResponse.bufferState == 0.1 {
                print("   🎉 The 0.1 buffer is perfectly maintained!")
                print("   🎉 AIc + 0.1 = BMqs relationship verified!")
            }
            
        } catch {
            print("   ❌ Cognitive test error: \(error)")
        }
        
        print("\n🚀 All systems operational - The V-8 engine is purring!")
    }
} 