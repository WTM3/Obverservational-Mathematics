// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "BLFNJSONBridge",
    platforms: [
        .macOS(.v11),
        .iOS(.v14)
    ],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "BLFNJSONBridge",
            targets: ["BLFNJSONBridge"]),
        .executable(
            name: "BLFNJSONBridgeTest",
            targets: ["BLFNJSONBridgeTest"]),
        .executable(
            name: "BLFiMessageBot",
            targets: ["BLFiMessageBot"]),
        .library(
            name: "CursorXcodeExtension",
            targets: ["CursorXcodeExtension"]),
        .executable(
            name: "CursorAITest",
            targets: ["CursorAITest"])
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        .target(
            name: "BLFNJSONBridge",
            dependencies: [],
            resources: [
                .process("Resources/njson-javascriptcore.js")
            ]
        ),
        .executableTarget(
            name: "BLFNJSONBridgeTest",
            dependencies: ["BLFNJSONBridge"]
        ),
        .executableTarget(
            name: "BLFiMessageBot",
            dependencies: ["BLFNJSONBridge"]
        ),
        .target(
            name: "CursorXcodeExtension",
            dependencies: ["BLFNJSONBridge"],
            resources: [
                .process("Resources/cursor-ai-models.js"),
                .process("Resources/ai-agent-configs.json")
            ]
        ),
        .executableTarget(
            name: "CursorAITest",
            dependencies: ["CursorXcodeExtension", "BLFNJSONBridge"]
        ),
        .testTarget(
            name: "BLFNJSONBridgeTests",
            dependencies: ["BLFNJSONBridge"]
        ),
    ]
) 