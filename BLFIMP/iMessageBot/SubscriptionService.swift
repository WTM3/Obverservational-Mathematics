import Foundation

// MARK: - APIUsageService
/// Manages the API usage tracking and billing for the Boolean Mind Framework
class APIUsageService {
    // MARK: - Singleton
    static let shared = APIUsageService()
    
    // MARK: - API Usage Plans
    enum APIUsagePlan {
        case local   // No API usage, local processing only
        case light   // Basic API usage with monthly limits
        case standard  // Standard API usage
        case adaptive  // Adaptive pricing for eligible users
    }
    
    // MARK: - Configuration
    private(set) var currentPlan: APIUsagePlan = .local
    private var eligibleForAdaptivePricing: Bool = false
    
    // MARK: - Usage Tracking
    private var apiCallsThisMonth: Int = 0
    private var lastAPICallDate: Date?
    private var currentMonthStart: Date = Date().startOfMonth
    
    // MARK: - Pricing
    var monthlyCost: Double {
        switch currentPlan {
        case .local:
            return 0.0
        case .light:
            return 5.0
        case .standard:
            return 25.0
        case .adaptive:
            // Adaptive pricing based on actual usage
            return min(15.0, Double(apiCallsThisMonth) * 0.01)
        }
    }
    
    // MARK: - Usage Limits
    struct APIUsageStats {
        let usedThisMonth: Int
        let totalAvailable: Int
        let currentPlan: APIUsagePlan
        let costPerExtraCall: Double
        let monthlyCost: Double
        
        var percentUsed: Double {
            if totalAvailable <= 0 {
                return 0.0
            }
            return min(1.0, Double(usedThisMonth) / Double(totalAvailable))
        }
    }
    
    // MARK: - Initialization
    private init() {
        // Check for stored plan status
        loadPlanStatus()
        resetIfNewMonth()
    }
    
    // MARK: - Plan Management
    
    /// Change the current API usage plan
    func changePlan(to plan: APIUsagePlan) {
        currentPlan = plan
        savePlanStatus()
    }
    
    /// Check eligibility for adaptive pricing
    func checkAdaptivePricingEligibility() -> Bool {
        // In a real app, this might check for disability status or income verification
        // For now, we'll simulate this
        let result = UserDefaults.standard.bool(forKey: "eligibleForAdaptivePricing")
        eligibleForAdaptivePricing = result
        return result
    }
    
    /// Set eligibility for adaptive pricing (for testing)
    func setAdaptivePricingEligibility(eligible: Bool) {
        eligibleForAdaptivePricing = eligible
        UserDefaults.standard.set(eligible, forKey: "eligibleForAdaptivePricing")
    }
    
    /// Get current usage statistics
    func getUsageStats() -> APIUsageStats {
        resetIfNewMonth()
        
        let totalAvailable: Int
        let costPerExtra: Double
        
        switch currentPlan {
        case .local:
            totalAvailable = 0
            costPerExtra = 0.0
        case .light:
            totalAvailable = 500
            costPerExtra = 0.05
        case .standard:
            totalAvailable = 5000
            costPerExtra = 0.01
        case .adaptive:
            totalAvailable = 1500
            costPerExtra = 0.01
        }
        
        return APIUsageStats(
            usedThisMonth: apiCallsThisMonth,
            totalAvailable: totalAvailable,
            currentPlan: currentPlan,
            costPerExtraCall: costPerExtra,
            monthlyCost: monthlyCost
        )
    }
    
    // MARK: - API Call Tracking
    
    /// Record an API call
    func recordAPICall() {
        resetIfNewMonth()
        apiCallsThisMonth += 1
        lastAPICallDate = Date()
        savePlanStatus()
    }
    
    /// Check if API calls are available or require extra billing
    func checkAPIAvailability() -> (available: Bool, extraCost: Double?) {
        resetIfNewMonth()
        
        // Local plan doesn't use API
        if currentPlan == .local {
            return (false, nil)
        }
        
        let stats = getUsageStats()
        
        // If we're under our limit, API is available at no extra cost
        if stats.totalAvailable > 0 && apiCallsThisMonth < stats.totalAvailable {
            return (true, nil)
        }
        
        // If we're over limit, calculate extra cost
        let extraCost = stats.costPerExtraCall
        return (true, extraCost)
    }
    
    // MARK: - Persistence
    
    private func savePlanStatus() {
        let defaults = UserDefaults.standard
        
        // Store plan
        defaults.set(planToString(currentPlan), forKey: "apiUsagePlan")
        
        // Store usage data
        defaults.set(apiCallsThisMonth, forKey: "apiCallsThisMonth")
        defaults.set(lastAPICallDate, forKey: "lastAPICallDate")
        defaults.set(currentMonthStart, forKey: "currentMonthStart")
    }
    
    private func loadPlanStatus() {
        let defaults = UserDefaults.standard
        
        // Load plan
        if let planString = defaults.string(forKey: "apiUsagePlan") {
            currentPlan = stringToPlan(planString)
        }
        
        // Load usage data
        apiCallsThisMonth = defaults.integer(forKey: "apiCallsThisMonth")
        lastAPICallDate = defaults.object(forKey: "lastAPICallDate") as? Date
        if let storedDate = defaults.object(forKey: "currentMonthStart") as? Date {
            currentMonthStart = storedDate
        }
        
        // Load eligibility
        eligibleForAdaptivePricing = defaults.bool(forKey: "eligibleForAdaptivePricing")
    }
    
    private func resetIfNewMonth() {
        let today = Date()
        if !Calendar.current.isDate(today, inSameDayAs: currentMonthStart) && 
           today.startOfMonth != currentMonthStart {
            // Reset counters for new month
            apiCallsThisMonth = 0
            currentMonthStart = today.startOfMonth
            savePlanStatus()
        }
    }
    
    // MARK: - Helper Methods
    
    private func planToString(_ plan: APIUsagePlan) -> String {
        switch plan {
        case .local: return "local"
        case .light: return "light"
        case .standard: return "standard"
        case .adaptive: return "adaptive"
        }
    }
    
    private func stringToPlan(_ string: String) -> APIUsagePlan {
        switch string {
        case "light": return .light
        case "standard": return .standard
        case "adaptive": return .adaptive
        default: return .local
        }
    }
}

// MARK: - Date Extensions
extension Date {
    var startOfMonth: Date {
        let calendar = Calendar.current
        let components = calendar.dateComponents([.year, .month], from: self)
        return calendar.date(from: components) ?? self
    }
} 