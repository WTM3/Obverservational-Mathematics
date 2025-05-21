-- NJSON Swift Bridge Database Entry
-- Adds the thin Swift wrapper to the database with proper 0.1 buffer protection

-- Create the NJSON implementation record
INSERT INTO implementations (
    name,
    type,
    version,
    description,
    quantum_level,
    buffer_value,
    created_at
) VALUES (
    'NJSON Swift Bridge',
    'bridge',
    '1.0.0',
    'A thin Swift wrapper around the NJSON engine that preserves the critical 0.1 buffer throughout all operations',
    2.89,
    0.1,
    CURRENT_TIMESTAMP
);

-- Get the implementation ID
INSERT INTO implementation_properties (
    implementation_id,
    key,
    value
) VALUES (
    (SELECT id FROM implementations WHERE name = 'NJSON Swift Bridge'),
    'language',
    'Swift'
),
(
    (SELECT id FROM implementations WHERE name = 'NJSON Swift Bridge'),
    'pattern',
    'Thin Wrapper'
),
(
    (SELECT id FROM implementations WHERE name = 'NJSON Swift Bridge'),
    'platform',
    'iOS/macOS'
),
(
    (SELECT id FROM implementations WHERE name = 'NJSON Swift Bridge'),
    'core_engine',
    'NJSON'
);

-- Create concept connections
INSERT INTO concepts (
    name,
    type,
    quantum_level,
    description
) VALUES (
    'NJSON Swift Bridge',
    'bridge',
    2.89,
    'The narrow bridge between Swift UI and JavaScript core'
);

-- Connect to existing components
INSERT INTO connections (
    from_concept_id,
    to_concept_id,
    strength,
    description
) VALUES (
    (SELECT id FROM concepts WHERE name = 'NJSON Swift Bridge'),
    (SELECT id FROM concepts WHERE name = 'NJSON' AND type = 'engine'),
    0.9,
    'Swift bridge to NJSON core engine'
),
(
    (SELECT id FROM concepts WHERE name = 'NJSON Swift Bridge'),
    (SELECT id FROM concepts WHERE name = 'iMessage' AND type = 'platform'),
    0.8,
    'Swift integration to iMessage'
);

-- Add metrics tracking
INSERT INTO metrics (
    name,
    source,
    value,
    timestamp
) VALUES (
    'buffer_integrity',
    'NJSON Swift Bridge',
    1.0,
    CURRENT_TIMESTAMP
),
(
    'swift_footprint',
    'NJSON Swift Bridge',
    0.1,
    CURRENT_TIMESTAMP
),
(
    'engine_utilization',
    'NJSON Swift Bridge',
    0.9,
    CURRENT_TIMESTAMP
);

-- Add system state entry
INSERT INTO quantum_states (
    implementation_id,
    qi_value,
    buffer_intact,
    timestamp,
    description
) VALUES (
    (SELECT id FROM implementations WHERE name = 'NJSON Swift Bridge'),
    2.99,
    1,
    CURRENT_TIMESTAMP,
    'Initial quantum state for NJSON Swift Bridge - buffer integrity verified'
);

-- Add documentation reference
INSERT INTO documentation (
    title,
    path,
    version,
    description,
    created_at
) VALUES (
    'NJSON Swift Bridge Documentation',
    'BLFIMP/Core/BLFCore/NJSON_SWIFT_README.md',
    '1.0.0',
    'Comprehensive documentation of the thin Swift wrapper around NJSON',
    CURRENT_TIMESTAMP
);

-- Add implementation file references
INSERT INTO implementation_files (
    implementation_id,
    file_path,
    role,
    description
) VALUES (
    (SELECT id FROM implementations WHERE name = 'NJSON Swift Bridge'),
    'BLFIMP/Core/BLFCore/NJSONSwiftBridge.swift',
    'core',
    'Core Swift wrapper implementation'
),
(
    (SELECT id FROM implementations WHERE name = 'NJSON Swift Bridge'),
    'BLFIMP/Core/BLFCore/NJSONSwiftExample.swift',
    'example',
    'Example usage patterns'
),
(
    (SELECT id FROM implementations WHERE name = 'NJSON Swift Bridge'),
    'BLFIMP/Tests/Tests/NJSONSwiftWrapperTest.swift',
    'test',
    'Test suite for buffer validation'
);

-- Add SQL comment explaining the 0.1 buffer significance
-- The V-8 under the hood requires this exact buffer value 