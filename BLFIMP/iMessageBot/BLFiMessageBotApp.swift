import SwiftUI

@main
struct BLFiMessageBotApp: App {
    // Use NJSON for state management
    @StateObject private var appState = BLFAppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
                .frame(minWidth: 600, minHeight: 400)
                .onAppear {
                    // Initialize NJSON when app appears
                    Task {
                        await appState.initialize()
                    }
                }
        }
        .windowStyle(HiddenTitleBarWindowStyle())
        .commands {
            CommandGroup(replacing: .newItem) { }
        }
    }
}

// This thin wrapper connects SwiftUI to NJSON
@MainActor
class BLFAppState: ObservableObject {
    // NJSON singleton for all business logic
    private let njson = NJSON.shared
    
    // UI state (minimal, just for display)
    @Published var isRunning = false
    @Published var activeBranch: Branch = .familyFriends
    @Published var socialPadding: SocialPadding = .medium
    @Published var statusMessage = "Initializing..."
    @Published var messageCount = 0
    @Published var processingCycles = 0
    @Published var errorCount = 0
    @Published var logs: [LogEntry] = []
    
    // Timer for UI updates
    private var updateTimer: Timer?
    
    func initialize() async {
        // Start UI update timer
        DispatchQueue.main.async {
            self.statusMessage = "Ready"
            self.updateTimer = Timer.scheduledTimer(withTimeInterval: 2.0, repeats: true) { [weak self] _ in
                Task { [weak self] in
                    await self?.refreshState()
                }
            }
        }
    }
    
    func startBot() async {
        guard !isRunning else { return }
        
        do {
            // Log event through NJSON
            await njson.logEvent(.systemStart, details: "Bot started from UI")
            
            // Create and start bot controller
            // For now, we just update the state - actual start will be implemented later
            DispatchQueue.main.async {
                self.isRunning = true
                self.statusMessage = "Running"
            }
            
            // Refresh state after starting
            await refreshState()
        } catch {
            DispatchQueue.main.async {
                self.statusMessage = "Failed to start: \(error.localizedDescription)"
            }
        }
    }
    
    func stopBot() async {
        guard isRunning else { return }
        
        // Log event through NJSON
        await njson.logEvent(.systemStop, details: "Bot stopped from UI")
        
        // Update state
        DispatchQueue.main.async {
            self.isRunning = false
            self.statusMessage = "Stopped"
        }
        
        // Refresh state after stopping
        await refreshState()
    }
    
    func setBranch(_ branch: Branch) async {
        // Set branch through NJSON
        await njson.setBranch(branch)
        
        // Update UI state
        DispatchQueue.main.async {
            self.activeBranch = branch
        }
    }
    
    func setPadding(_ padding: SocialPadding) async {
        // Set padding through NJSON
        await njson.setPadding(padding)
        
        // Update UI state
        DispatchQueue.main.async {
            self.socialPadding = padding
        }
    }
    
    func refreshState() async {
        // Get state from NJSON
        let cognitiveState = await njson.getCognitiveState()
        let recentLogs = await njson.getRecentLogs(count: 5)
        
        // Update UI state
        DispatchQueue.main.async {
            self.processingCycles = cognitiveState.processingCycles
            self.logs = recentLogs
            // Other state updates will be added as needed
        }
    }
} 