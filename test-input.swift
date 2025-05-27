import Foundation

print("🧠 BLF Input Test")
print("Type something and press Enter:")

if let input = readLine() {
    print("✅ Input received: '\(input)'")
    print("🛡️ Heat shield: Text input pathways operational")
} else {
    print("❌ No input received")
    print("🔥 Heat shield: Input pathways blocked")
} 