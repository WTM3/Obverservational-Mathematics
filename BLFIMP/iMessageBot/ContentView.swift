import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var appState: BLFAppState
    
    var body: some View {
        NavigationView {
            // Sidebar
            List {
                NavigationLink(destination: DashboardView()) {
                    Label("Dashboard", systemImage: "speedometer")
                }
                NavigationLink(destination: SettingsView()) {
                    Label("Settings", systemImage: "gear")
                }
                NavigationLink(destination: LogsView()) {
                    Label("Logs", systemImage: "list.bullet")
                }
            }
            .listStyle(SidebarListStyle())
            .frame(minWidth: 150)
            
            // Default view
            DashboardView()
        }
    }
}

// Dashboard displays current status and controls
struct DashboardView: View {
    @EnvironmentObject private var appState: BLFAppState
    
    var body: some View {
        VStack(spacing: 20) {
            // Status card
            StatusCard(isRunning: appState.isRunning, 
                       statusMessage: appState.statusMessage,
                       processingCycles: appState.processingCycles)
            
            // Controls
            HStack(spacing: 20) {
                Button(action: {
                    if appState.isRunning {
                        Task { await appState.stopBot() }
                    } else {
                        Task { await appState.startBot() }
                    }
                }) {
                    HStack {
                        Image(systemName: appState.isRunning ? "stop.fill" : "play.fill")
                        Text(appState.isRunning ? "Stop" : "Start")
                    }
                    .frame(width: 100)
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                
                Spacer()
            }
            .padding(.top)
            
            // Recent activity
            if !appState.logs.isEmpty {
                VStack(alignment: .leading) {
                    Text("Recent Activity")
                        .font(.headline)
                    
                    ForEach(appState.logs.prefix(3), id: \.id) { log in
                        RecentActivityRow(log: log)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.top)
            }
            
            Spacer()
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// Settings view for template and branch configuration
struct SettingsView: View {
    @EnvironmentObject private var appState: BLFAppState
    
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Bot Settings")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            // Branch selection
            VStack(alignment: .leading) {
                Text("Communication Branch")
                    .font(.headline)
                
                Picker("", selection: Binding(
                    get: { self.appState.activeBranch },
                    set: { newBranch in
                        Task { await self.appState.setBranch(newBranch) }
                    }
                )) {
                    Text("Family & Friends").tag(Branch.familyFriends)
                    Text("Professional").tag(Branch.professional)
                }
                .pickerStyle(SegmentedPickerStyle())
                .padding(.bottom, 5)
                
                Text("Select how the bot should communicate")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding(.bottom)
            
            // Padding selection
            VStack(alignment: .leading) {
                Text("Social Padding Level")
                    .font(.headline)
                
                Picker("", selection: Binding(
                    get: { self.appState.socialPadding },
                    set: { newPadding in
                        Task { await self.appState.setPadding(newPadding) }
                    }
                )) {
                    Text("More").tag(SocialPadding.more)
                    Text("Medium").tag(SocialPadding.medium)
                    Text("None").tag(SocialPadding.none)
                }
                .pickerStyle(SegmentedPickerStyle())
                .padding(.bottom, 5)
                
                Text("Controls how conversational the bot's responses are")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
    }
}

// Logs view shows system logs
struct LogsView: View {
    @EnvironmentObject private var appState: BLFAppState
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("System Logs")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            if appState.logs.isEmpty {
                Text("No logs to display")
                    .foregroundColor(.secondary)
                    .padding(.top)
            } else {
                ScrollView {
                    VStack(alignment: .leading, spacing: 8) {
                        ForEach(appState.logs, id: \.id) { log in
                            LogEntryRow(log: log)
                        }
                    }
                }
            }
            
            Spacer()
            
            Button("Refresh Logs") {
                Task {
                    await appState.refreshState()
                }
            }
            .padding(.top)
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
    }
}

// Helper Views

struct StatusCard: View {
    let isRunning: Bool
    let statusMessage: String
    let processingCycles: Int
    
    var body: some View {
        VStack(alignment: .leading) {
            HStack {
                Circle()
                    .fill(isRunning ? Color.green : Color.red)
                    .frame(width: 12, height: 12)
                Text(isRunning ? "Running" : "Stopped")
                    .font(.headline)
                    .foregroundColor(isRunning ? .green : .red)
                Spacer()
                Text("Status: \(statusMessage)")
                    .foregroundColor(.secondary)
            }
            
            Divider()
            
            HStack {
                VStack(alignment: .leading) {
                    Text("Processing Cycles")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text("\(processingCycles)")
                        .font(.title)
                }
                
                Spacer()
            }
        }
        .padding()
        .background(Color(.textBackgroundColor))
        .cornerRadius(10)
    }
}

struct RecentActivityRow: View {
    let log: LogEntry
    
    var body: some View {
        HStack(alignment: .top) {
            Image(systemName: getIconName(for: log))
                .foregroundColor(getIconColor(for: log))
                .frame(width: 20)
            
            VStack(alignment: .leading) {
                Text(getTitle(for: log))
                    .fontWeight(.medium)
                Text(log.content.prefix(100))
                    .font(.caption)
                    .foregroundColor(.secondary)
                Text(formatTimestamp(log.timestamp))
                    .font(.caption2)
                    .foregroundColor(.tertiary)
            }
        }
        .padding(.vertical, 4)
    }
    
    private func getIconName(for log: LogEntry) -> String {
        if log.type == .message {
            return log.direction == .incoming ? "arrow.down.circle" : "arrow.up.circle"
        } else if let eventType = log.eventType {
            switch eventType {
            case .subjectChange: return "arrow.triangle.swap"
            case .processingError: return "exclamationmark.triangle"
            case .systemError: return "xmark.octagon"
            case .permissionChange: return "lock.rotation"
            case .configChange: return "gear"
            case .systemStart: return "power"
            case .systemStop: return "power.circle"
            }
        }
        return "circle"
    }
    
    private func getIconColor(for log: LogEntry) -> Color {
        if log.type == .message {
            return log.direction == .incoming ? .blue : .green
        } else if let eventType = log.eventType {
            switch eventType {
            case .subjectChange: return .orange
            case .processingError: return .yellow
            case .systemError: return .red
            case .permissionChange: return .purple
            case .configChange: return .gray
            case .systemStart: return .green
            case .systemStop: return .red
            }
        }
        return .gray
    }
    
    private func getTitle(for log: LogEntry) -> String {
        if log.type == .message {
            return log.direction == .incoming ? "Incoming Message" : "Outgoing Message"
        } else if let eventType = log.eventType {
            switch eventType {
            case .subjectChange: return "Subject Changed"
            case .processingError: return "Processing Error"
            case .systemError: return "System Error"
            case .permissionChange: return "Permission Change"
            case .configChange: return "Configuration Change"
            case .systemStart: return "System Started"
            case .systemStop: return "System Stopped"
            }
        }
        return "Log Entry"
    }
    
    private func formatTimestamp(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .medium
        return formatter.string(from: date)
    }
}

struct LogEntryRow: View {
    let log: LogEntry
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Image(systemName: getIconName(for: log))
                    .foregroundColor(getIconColor(for: log))
                Text(getTitle(for: log))
                    .fontWeight(.medium)
                Spacer()
                Text(formatTimestamp(log.timestamp))
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            if let sender = log.sender {
                Text("From: \(sender)")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Text(log.content)
                .font(.body)
                .foregroundColor(.primary)
                .padding(.vertical, 2)
            
            Divider()
        }
        .padding(.vertical, 4)
    }
    
    private func getIconName(for log: LogEntry) -> String {
        if log.type == .message {
            return log.direction == .incoming ? "arrow.down.circle" : "arrow.up.circle"
        } else if let eventType = log.eventType {
            switch eventType {
            case .subjectChange: return "arrow.triangle.swap"
            case .processingError: return "exclamationmark.triangle"
            case .systemError: return "xmark.octagon"
            case .permissionChange: return "lock.rotation"
            case .configChange: return "gear"
            case .systemStart: return "power"
            case .systemStop: return "power.circle"
            }
        }
        return "circle"
    }
    
    private func getIconColor(for log: LogEntry) -> Color {
        if log.type == .message {
            return log.direction == .incoming ? .blue : .green
        } else if let eventType = log.eventType {
            switch eventType {
            case .subjectChange: return .orange
            case .processingError: return .yellow
            case .systemError: return .red
            case .permissionChange: return .purple
            case .configChange: return .gray
            case .systemStart: return .green
            case .systemStop: return .red
            }
        }
        return .gray
    }
    
    private func getTitle(for log: LogEntry) -> String {
        if log.type == .message {
            return log.direction == .incoming ? "Incoming Message" : "Outgoing Message"
        } else if let eventType = log.eventType {
            switch eventType {
            case .subjectChange: return "Subject Changed"
            case .processingError: return "Processing Error"
            case .systemError: return "System Error"
            case .permissionChange: return "Permission Change"
            case .configChange: return "Configuration Change"
            case .systemStart: return "System Started"
            case .systemStop: return "System Stopped"
            }
        }
        return "Log Entry"
    }
    
    private func formatTimestamp(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .medium
        return formatter.string(from: date)
    }
}

// MARK: - Previews

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(PreviewAppState())
    }
}

// Preview support state
class PreviewAppState: BLFAppState {
    override init() {
        super.init()
        // Set preview values
        self.isRunning = true
        self.statusMessage = "Preview Mode"
        self.processingCycles = 42
        self.messageCount = 12
        self.errorCount = 2
        
        // Add sample logs
        self.logs = [
            LogEntry(
                timestamp: Date(), 
                type: .message, 
                direction: .incoming, 
                sender: "John", 
                content: "Hey, how's it going?"
            ),
            LogEntry(
                timestamp: Date().addingTimeInterval(-60), 
                type: .message, 
                direction: .outgoing, 
                sender: "system", 
                content: "I'm doing great! How about you?"
            ),
            LogEntry(
                timestamp: Date().addingTimeInterval(-120), 
                type: .event, 
                eventType: .systemStart, 
                content: "System started"
            )
        ]
    }
} 