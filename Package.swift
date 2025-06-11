// swift-tools-version: 5.9

// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "BLFMessagingApp",
    platforms: [
        .iOS(.v16) // iOS 16+ for modern SwiftUI features - THIN wrapper only
    ],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "BLFMessagingApp",
            targets: ["BLFMessagingApp"]
        ),
    ],
    dependencies: [
        // NO external dependencies - keep it thin
        // All BLF/AMF processing happens in JavaScript
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        .target(
            name: "BLFMessagingApp",
            dependencies: [],
            resources: [
                // Include JavaScript BLF engine as bundle resource
                .process("Resources/blf-messaging-platform.js")
            ]
        ),
        .testTarget(
            name: "BLFMessagingAppTests",
            dependencies: ["BLFMessagingApp"]
        ),
    ]
) 