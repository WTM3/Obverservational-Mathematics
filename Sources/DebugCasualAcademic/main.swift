import Foundation
import BLFNJSONBridge

@main
struct DebugCasualAcademic {
    static func main() async {
        print("🔍 Debugging Casual Academic Classification")
        
        do {
            let njson = try NJSON()
            try await njson.initialize()
            
            let testInput = "University course research study for academic inquiry."
            
            print("\n📝 Input: '\(testInput)'")
            
            // Use the enhanced detection to see detailed breakdown
            let enhancedContext = await njson.detectEnhancedAcademicContext(testInput)
            
            print("🎯 Enhanced Academic Context:")
            print("   Is Academic: \(enhancedContext.isAcademic)")
            print("   Primary Domain: \(enhancedContext.primaryDomain.rawValue)")
            print("   Context Type: \(enhancedContext.contextType)")
            print("   Suggested Mode: \(enhancedContext.suggestedMode.rawValue)")
            print("   Formality Level: \(enhancedContext.formalityLevel.rawValue)")
            print("   Weighted Score: \(enhancedContext.weightedScore)")
            print("   Confidence: \(String(format: "%.2f", enhancedContext.confidence))")
            print("   Keywords Detected: \(enhancedContext.keywordsDetected)")
            
            // Also check the legacy method
            let legacyContext = await njson.detectAcademicContext(testInput)
            print("\n📊 Legacy Context:")
            print("   Is Academic: \(legacyContext.isAcademic)")
            print("   Context Type: \(legacyContext.contextType)")
            print("   Suggested Mode: \(legacyContext.suggestedMode.rawValue)")
            print("   Velocity Adjustment: \(legacyContext.velocityAdjustment)")
            print("   Confidence: \(String(format: "%.2f", legacyContext.confidence))")
            
        } catch {
            print("❌ Error: \(error)")
        }
    }
}