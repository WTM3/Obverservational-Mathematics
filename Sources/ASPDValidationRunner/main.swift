import Foundation
import BLFNJSONBridge

/// ASPD Formula Validation Runner
/// Tests the complete ASPD = (SPD v SBMPD/AMF)v implementation
/// Alternative to XCTest for comprehensive validation

@main
struct ASPDValidationRunner {
    static func main() async {
        print("🚀 BLF ASPD Formula Validation Suite")
        print("Testing: ASPD = (SPD v SBMPD/AMF)v")
        print("Mathematical Foundation: AIc + 0.1 = BMqs (2.89 + 0.1 = 2.99)")
        print("The narrow bridge between chaos and control")
        print("===============================================")
        
        // Run comprehensive validation
        let report = await ASPDValidator.runComprehensiveValidation()
        
        // Print detailed report
        report.printDetailedReport()
        
        // Exit with appropriate code
        if report.successRate >= 0.95 {
            print("\n🎉 ASPD Formula validation PASSED - System ready for deployment")
            exit(0)
        } else if report.successRate >= 0.8 {
            print("\n⚠️ ASPD Formula validation PARTIAL - Minor issues need attention")
            exit(1)
        } else {
            print("\n🚨 ASPD Formula validation FAILED - Critical issues must be resolved")
            exit(2)
        }
    }
}