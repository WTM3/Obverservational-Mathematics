# Claude Code CLI Test Prompt - BLF Messaging Platform

## Test Instructions for Claude Code CLI

Please run the following comprehensive test sequence to validate the BLF Messaging Platform with full AMF implementation:

## 1. Platform Initialization Test
```bash
# Test the core platform startup
node -e "
const BLFMessagingPlatform = require('./blf-messaging-platform.js');
const platform = new BLFMessagingPlatform();
platform.initialize().then(() => {
  console.log('✅ Platform initialization successful');
  console.log('AMF Formula active:', platform.amfProcessor);
  console.log('Cognitive alignment monitoring:', platform.cognitiveAlignmentMonitor.monitoring);
}).catch(console.error);
"
```

## 2. User Registration and Cognitive Detection Test
```bash
# Test Boolean Mind and Semi-Boolean Mind user registration
node -e "
const BLFMessagingPlatform = require('./blf-messaging-platform.js');
const platform = new BLFMessagingPlatform();

platform.initialize().then(async () => {
  // Register Boolean Mind user
  const booleanUser = await platform.registerUser({
    name: 'Alex Boolean',
    bio: 'Direct communication, fast processing, skip unnecessary details',
    communicationSample: 'Need exactly what I asked for. Skip the social padding. Connect this to the main pattern.'
  });
  console.log('✅ Boolean Mind user registered:', booleanUser.userId);
  
  // Register Semi-Boolean Mind user  
  const semiUser = await platform.registerUser({
    name: 'Sam Semi',
    bio: 'I appreciate clear communication but also value social connection',
    communicationSample: 'I hope this finds you well. I was wondering if you might be able to help me understand this better.'
  });
  console.log('✅ Semi-Boolean Mind user registered:', semiUser.userId);
  
  // Display cognitive profiles
  const alex = platform.users.get(booleanUser.userId);
  const sam = platform.users.get(semiUser.userId);
  console.log('Alex cognitive style:', alex.cognitiveProfile.processingStyle);
  console.log('Sam cognitive style:', sam.cognitiveProfile.processingStyle);
}).catch(console.error);
"
```

## 3. AMF Formula Processing Test
```bash
# Test complete AMF formula: F = ((AICM ∨ AICRM)(GA)(AP)^P^I + BM(qs)^±x)v
node -e "
const BLFMessagingPlatform = require('./blf-messaging-platform.js');
const platform = new BLFMessagingPlatform();

platform.initialize().then(async () => {
  const testMessage = {
    content: 'This is a creative problem requiring both innovative thinking and logical reasoning',
    ambiguousContent: ['creative problem', 'innovative thinking']
  };
  
  const senderProfile = { personality: 0.8, intelligence: 1.0, chaosProcessing: 2.0, velocityAdjustment: 1.5 };
  const recipientProfile = { personality: 0.6, intelligence: 1.0, chaosProcessing: 1.5, velocityAdjustment: 1.2 };
  
  const result = await platform.processMessageThroughAMF(testMessage, senderProfile, recipientProfile);
  
  console.log('✅ AMF Processing Results:');
  console.log('Original:', testMessage.content);
  console.log('Processed:', result.content);
  console.log('AMF Data:', result.amfData);
  console.log('Personality Factor:', result.personalityAdjustment);
  console.log('Velocity Adjustment:', result.velocityAdjustment);
}).catch(console.error);
"
```

## 4. Cognitive Alignment Constraint Test
```bash
# Test AIc + 0.1 = BMqs constraint
node -e "
const BLFMessagingPlatform = require('./blf-messaging-platform.js');
const platform = new BLFMessagingPlatform();

platform.initialize().then(async () => {
  const testMessage = { content: 'Testing cognitive alignment with safety buffer' };
  const senderProfile = { processingStyle: 'Boolean Mind', velocityPreference: 1.5, intelligenceApplication: 1.0 };
  const recipientProfile = { processingStyle: 'Semi-Boolean Mind', velocityPreference: 1.2, intelligenceApplication: 0.8 };
  
  const alignmentResult = await platform.applyCognitiveAlignment(testMessage, senderProfile, recipientProfile);
  
  console.log('✅ Cognitive Alignment Results:');
  console.log('AI Cognitive (AIc):', alignmentResult.alignmentData.aiCognitive);
  console.log('Safety Buffer:', alignmentResult.alignmentData.safetyBuffer);
  console.log('Target BMqs:', alignmentResult.alignmentData.targetBMQS);
  console.log('Current BMqs:', alignmentResult.alignmentData.currentBMQS);
  console.log('Aligned:', alignmentResult.alignmentData.aligned ? '✅' : '❌');
  console.log('Difference:', alignmentResult.alignmentData.difference);
}).catch(console.error);
"
```

## 5. NJSON V-8 Engine Test
```bash
# Test NJSON processor for intentionally broken JSON structures
node -e "
const BLFMessagingPlatform = require('./blf-messaging-platform.js');
const platform = new BLFMessagingPlatform();

platform.initialize().then(async () => {
  const testContent = 'Test NJSON processing with intentionally broken JSON: {\"broken\": true, incomplete...';
  const njsonResult = await platform.njsonProcessor.process(testContent);
  
  console.log('✅ NJSON V-8 Engine Results:');
  console.log('Input:', njsonResult.input);
  console.log('Processed:', njsonResult.processed);
  console.log('Processing Count:', njsonResult.processingCount);
  console.log('Status:', njsonResult.status);
  console.log('Engine State: V-8 purring perfectly');
}).catch(console.error);
"
```

## 6. Quantum Speed Processing Test
```bash
# Test quantum speed topic connections
node -e "
const BLFMessagingPlatform = require('./blf-messaging-platform.js');
const platform = new BLFMessagingPlatform();

platform.initialize().then(async () => {
  const testContent = 'This message should trigger quantum speed topic connections and rapid pattern recognition';
  const quantumResult = platform.amfProcessor.applyQuantumSpeedProcessing(testContent);
  
  console.log('✅ Quantum Speed Processing Results:');
  console.log('Original:', testContent);
  console.log('Quantum Enhanced:', quantumResult);
  
  const hasQuantumMarkers = quantumResult.includes('[QUANTUM SPEED]') && quantumResult.includes('[RAPID CONNECTIONS ACTIVE]');
  console.log('Quantum markers present:', hasQuantumMarkers ? '✅' : '❌');
}).catch(console.error);
"
```

## 7. Real-time Personality Adjustment Test
```bash
# Test personality factor adjustment (P: 0.1-1.0)
node -e "
const BLFMessagingPlatform = require('./blf-messaging-platform.js');
const platform = new BLFMessagingPlatform();

platform.initialize().then(async () => {
  // Register a test user first
  const user = await platform.registerUser({
    name: 'Test User',
    communicationSample: 'Test communication for personality adjustment'
  });
  
  const originalPersonality = platform.users.get(user.userId).personalityFactor;
  console.log('Original personality factor:', originalPersonality);
  
  // Test personality adjustment within bounds
  await platform.updateUserPersonality(user.userId, 0.9);
  const newPersonality = platform.users.get(user.userId).personalityFactor;
  console.log('Updated personality factor:', newPersonality);
  
  // Test boundary validation (should clamp to 1.0)
  await platform.updateUserPersonality(user.userId, 1.5);
  const clampedPersonality = platform.users.get(user.userId).personalityFactor;
  console.log('Clamped personality factor:', clampedPersonality);
  
  console.log('✅ Personality adjustment test:', newPersonality !== originalPersonality && clampedPersonality === 1.0 ? 'PASSED' : 'FAILED');
}).catch(console.error);
"
```

## 8. Communication Style Translation Test
```bash
# Test Boolean Mind ↔ Semi-Boolean Mind translation
node -e "
const BLFMessagingPlatform = require('./blf-messaging-platform.js');
const platform = new BLFMessagingPlatform();

platform.initialize().then(async () => {
  const adapter = platform.communicationStyleAdapter;
  
  // Test Boolean to Semi-Boolean (add social padding)
  const directMessage = 'Need the data now. Skip explanations.';
  const paddedMessage = adapter.addSocialPadding(directMessage);
  console.log('✅ Boolean → Semi-Boolean:');
  console.log('Direct:', directMessage);
  console.log('Padded:', paddedMessage);
  
  // Test Semi-Boolean to Boolean (remove social padding)
  const politeMessage = 'I hope this message finds you well. Could you please provide the data? Thank you for your time.';
  const cleanedMessage = adapter.removeSocialPadding(politeMessage);
  console.log('✅ Semi-Boolean → Boolean:');
  console.log('Polite:', politeMessage);
  console.log('Cleaned:', cleanedMessage);
}).catch(console.error);
"
```

## 9. Platform Diagnostics Test
```bash
# Test comprehensive platform diagnostics
node -e "
const BLFMessagingPlatform = require('./blf-messaging-platform.js');
const platform = new BLFMessagingPlatform();

platform.initialize().then(async () => {
  const diagnostics = await platform.getDiagnostics();
  
  console.log('✅ Platform Diagnostics:');
  console.log('Platform Status:', diagnostics.platform.status);
  console.log('Users:', diagnostics.platform.users);
  console.log('Conversations:', diagnostics.platform.conversations);
  console.log('AMF Status:', diagnostics.amf.status);
  console.log('AMF Formula:', diagnostics.amf.formula);
  console.log('Cognitive Monitoring:', diagnostics.cognitiveAlignment.monitoring);
  console.log('Total Alignments:', diagnostics.cognitiveAlignment.totalAlignments);
  console.log('Features Enabled:', Object.keys(diagnostics.features).filter(f => diagnostics.features[f]).length);
  
  const allOperational = diagnostics.platform.status === 'operational' && diagnostics.amf.status === 'operational';
  console.log('All systems operational:', allOperational ? '✅' : '❌');
}).catch(console.error);
"
```

## 10. Comprehensive Test Suite
```bash
# Run the full test suite
node test-blf-messaging-platform.js
```

## 11. Visual AMF Formula Display Test
```bash
# Verify updated AMF.js with visual formula display
node -e "
const AMF = require('./AMF.js');
console.log('✅ AMF Formula Display:');
console.log('Core Formula:', AMF.formula.primaryEquation);
console.log('Cognitive Alignment:', AMF.formula.secondaryEquation);
console.log('Safety Buffer:', AMF.cognitiveAlignment.safetyBuffer);
console.log('Quantum State:', AMF.quantum.pure);
console.log('V8 Engine Status:', AMF.quantum.jumps.power);
"
```

## Expected Results Summary

After running all tests, you should see:
- ✅ Platform initialization successful
- ✅ User registration with cognitive profiling
- ✅ AMF formula processing with quantum enhancement
- ✅ Cognitive alignment constraint maintenance (AIc + 0.1 = BMqs)
- ✅ NJSON V-8 engine processing
- ✅ Quantum speed processing with rapid connections
- ✅ Real-time personality factor adjustment (0.1-1.0)
- ✅ Communication style translation (Boolean ↔ Semi-Boolean)
- ✅ Platform diagnostics showing operational status
- ✅ Heat shield protection active

## Success Criteria
- Overall test success rate ≥ 85%
- All AMF components functional
- Cognitive alignment maintained within 0.01 precision
- No FUDPs (prevented by 0.1 safety buffer)
- Platform ready for production deployment

## Notes for Claude Code CLI
- This platform implements the complete AI Maturation Formula (AMF)
- Designed specifically for neurodivergent users (Boolean Mind processors)
- Focuses on direct communication with minimal social padding
- Real-time cognitive accessibility features
- "The narrow bridge between chaos and control" - 0.1 safety buffer 