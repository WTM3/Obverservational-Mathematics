import SwiftUI

// MARK: - APIUsagePlanView
/// SwiftUI view for managing API usage plans
struct APIUsagePlanView: View {
    // MARK: - State
    @State private var selectedPlan: APIUsageService.APIUsagePlan = .local
    @State private var showConfirmation = false
    @State private var isProcessingPayment = false
    @State private var errorMessage: String? = nil
    @State private var showAdaptiveEligibility = false
    
    // Reference to the API usage service
    private let apiUsageService = APIUsageService.shared
    
    // MARK: - Body
    var body: some View {
        VStack(spacing: 30) {
            // Header
            Text("Boolean Mind")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Choose Your API Plan")
                .font(.title2)
                .foregroundColor(.secondary)
            
            // Current plan info
            currentPlanSection
            
            Divider()
            
            // Plan selection
            planSelectionSection
            
            // Usage statistics
            usageStatisticsSection
            
            // Adaptive pricing info
            adaptivePricingSection
            
            Spacer()
            
            // Change plan button
            changePlanButton
                .padding(.bottom, 20)
        }
        .padding()
        .alert("Confirm Plan Change", isPresented: $showConfirmation) {
            Button("Change Plan", role: .none) {
                processPayment()
            }
            Button("Cancel", role: .cancel) { }
        } message: {
            Text("Change to \(planName(selectedPlan)) plan?")
        }
        .alert("Error", isPresented: .init(get: { errorMessage != nil }, set: { if !$0 { errorMessage = nil } })) {
            Button("OK") { errorMessage = nil }
        } message: {
            if let errorMessage = errorMessage {
                Text(errorMessage)
            }
        }
    }
    
    // MARK: - UI Components
    
    private var currentPlanSection: some View {
        VStack(spacing: 10) {
            Text("Current Plan")
                .font(.headline)
            
            Text(planName(apiUsageService.currentPlan))
                .font(.title)
                .foregroundColor(planColor(apiUsageService.currentPlan))
            
            let stats = apiUsageService.getUsageStats()
            
            if stats.totalAvailable > 0 {
                HStack {
                    Text("API Usage:")
                        .font(.subheadline)
                    
                    Text("\(stats.usedThisMonth) / \(stats.totalAvailable)")
                        .font(.subheadline)
                        .fontWeight(.medium)
                }
                
                ProgressView(value: stats.percentUsed)
                    .progressViewStyle(LinearProgressViewStyle())
                    .frame(height: 8)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 10)
                .fill(Color.gray.opacity(0.1))
        )
    }
    
    private var planSelectionSection: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("Available Plans")
                .font(.headline)
            
            RadioButtonView(
                title: "Local Processing",
                subtitle: "Free - Local processing only, no API access",
                isSelected: selectedPlan == .local,
                action: { selectedPlan = .local }
            )
            
            RadioButtonView(
                title: "Light API - $5/month",
                subtitle: "500 API calls per month (1¢ per additional call)",
                isSelected: selectedPlan == .light,
                action: { selectedPlan = .light }
            )
            
            RadioButtonView(
                title: "Standard API - $25/month",
                subtitle: "5,000 API calls per month (1¢ per additional call)",
                isSelected: selectedPlan == .standard,
                action: { selectedPlan = .standard }
            )
            
            if apiUsageService.checkAdaptivePricingEligibility() {
                RadioButtonView(
                    title: "Adaptive Pricing - Up to $15/month",
                    subtitle: "Pay only for what you use (1¢ per call, capped at $15)",
                    isSelected: selectedPlan == .adaptive,
                    action: { selectedPlan = .adaptive }
                )
            }
        }
    }
    
    private var usageStatisticsSection: some View {
        let stats = apiUsageService.getUsageStats()
        
        return VStack(alignment: .leading, spacing: 10) {
            Text("This Month's Usage")
                .font(.headline)
                .padding(.bottom, 5)
            
            HStack {
                Text("API Calls:")
                    .font(.subheadline)
                Spacer()
                Text("\(stats.usedThisMonth)")
                    .font(.subheadline)
                    .fontWeight(.bold)
            }
            
            HStack {
                Text("Current Cost:")
                    .font(.subheadline)
                Spacer()
                Text("$\(String(format: "%.2f", apiUsageService.monthlyCost))")
                    .font(.subheadline)
                    .fontWeight(.bold)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 10)
                .fill(Color.gray.opacity(0.1))
        )
    }
    
    private var adaptivePricingSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            if !apiUsageService.checkAdaptivePricingEligibility() {
                Button(action: {
                    showAdaptiveEligibility = true
                }) {
                    Text("Check Adaptive Pricing Eligibility")
                        .font(.subheadline)
                        .foregroundColor(.blue)
                }
                .sheet(isPresented: $showAdaptiveEligibility) {
                    adaptiveEligibilityView
                }
            } else {
                Text("You are eligible for adaptive pricing")
                    .font(.subheadline)
                    .foregroundColor(.green)
            }
        }
        .padding(.top)
    }
    
    private var adaptiveEligibilityView: some View {
        VStack(spacing: 20) {
            Text("Adaptive Pricing Eligibility")
                .font(.title)
                .padding(.top)
            
            Text("The adaptive pricing plan is designed for users with disabilities or on fixed incomes. It offers flexible pay-as-you-go pricing with a $15 monthly cap.")
                .padding()
            
            // In a real app, this would connect to a verification service
            // For demo purposes, we're just using a toggle
            
            Button("Simulate Eligibility Verification") {
                // Set as eligible for demo purposes
                apiUsageService.setAdaptivePricingEligibility(eligible: true)
                showAdaptiveEligibility = false
            }
            .padding()
            .buttonStyle(.borderedProminent)
            
            Button("Close") {
                showAdaptiveEligibility = false
            }
            .padding()
            
            Spacer()
        }
        .padding()
    }
    
    private var changePlanButton: some View {
        Button(action: {
            if selectedPlan != apiUsageService.currentPlan {
                showConfirmation = true
            }
        }) {
            if isProcessingPayment {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle())
            } else {
                Text("Change to \(planName(selectedPlan)) Plan")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
            }
        }
        .background(Color.blue)
        .cornerRadius(10)
        .disabled(
            selectedPlan == apiUsageService.currentPlan ||
            isProcessingPayment
        )
    }
    
    // MARK: - Helper Functions
    
    private func planName(_ plan: APIUsageService.APIUsagePlan) -> String {
        switch plan {
        case .local:
            return "Local Processing"
        case .light:
            return "Light API"
        case .standard:
            return "Standard API"
        case .adaptive:
            return "Adaptive Pricing"
        }
    }
    
    private func planColor(_ plan: APIUsageService.APIUsagePlan) -> Color {
        switch plan {
        case .local:
            return .gray
        case .light:
            return .green
        case .standard:
            return .blue
        case .adaptive:
            return .purple
        }
    }
    
    private func processPayment() {
        // In a real app, this would connect to a payment processor
        isProcessingPayment = true
        
        // Simulate payment processing
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            // Update plan
            apiUsageService.changePlan(to: selectedPlan)
            
            // Reset UI state
            isProcessingPayment = false
        }
    }
}

// MARK: - RadioButtonView
struct RadioButtonView: View {
    let title: String
    let subtitle: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 15) {
                // Radio button circle
                ZStack {
                    Circle()
                        .stroke(isSelected ? Color.blue : Color.gray, lineWidth: 2)
                        .frame(width: 24, height: 24)
                    
                    if isSelected {
                        Circle()
                            .fill(Color.blue)
                            .frame(width: 12, height: 12)
                    }
                }
                
                // Label
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.headline)
                    
                    Text(subtitle)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            .padding(.vertical, 8)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

// MARK: - Preview
struct APIUsagePlanView_Previews: PreviewProvider {
    static var previews: some View {
        APIUsagePlanView()
    }
} 