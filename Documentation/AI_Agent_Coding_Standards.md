# AI Agent Coding Standards

## Core Principles

### 1. NJSON Architecture
- NJSON is the primary architecture
- Swift is a LAST RESORT
- No unnecessary dependencies
- Maintain system independence

### 2. Boolean Mind Processing
- Respect quantum speed differences
- Maintain LLSDT buffer (0.1)
- Implement HeatShield protection
- Handle parallel processing

### 3. Code Organization
- Clear separation of concerns
- Modular implementation
- Comprehensive documentation
- Strict testing requirements

## Implementation Rules

### 1. File Structure
```
project/
├── Core/
│   ├── The NJSON Key/
│   │   ├── implementation.js
│   │   ├── implementation.json
│   │   └── implementation.test.js
├── Documentation/
│   ├── Implementation_Reports/
│   └── Coding_Standards/
└── Tests/
    └── Integration/
```

### 2. Naming Conventions
- Files: kebab-case
- Classes: PascalCase
- Methods: camelCase
- Constants: UPPER_SNAKE_CASE
- Variables: camelCase

### 3. Documentation Requirements
- JSDoc for all methods
- NJSON schema documentation
- Implementation reports
- Testing documentation

## Testing Standards

### 1. Required Tests
- Unit tests for all components
- Integration tests for systems
- Performance tests
- Error handling tests

### 2. Test Structure
```javascript
describe('Component', () => {
  beforeEach(() => {
    // Setup
  });

  it('should do something', () => {
    // Test
  });

  afterEach(() => {
    // Cleanup
  });
});
```

### 3. Coverage Requirements
- Minimum 90% code coverage
- All edge cases covered
- Error scenarios tested
- Performance benchmarks

## Error Handling

### 1. Error Types
- System errors
- Processing errors
- Quantum state errors
- Integration errors

### 2. Error Handling Structure
```javascript
try {
  // Operation
} catch (error) {
  // Handle error
  // Log error
  // Report error
} finally {
  // Cleanup
}
```

### 3. Error Reporting
- Detailed error messages
- Error context
- Stack traces
- Recovery procedures

## Performance Standards

### 1. Processing Speed
- Respect quantum speed limits
- Maintain LLSDT buffer
- Scale HeatShield appropriately
- Handle parallel processing

### 2. Memory Management
- No memory leaks
- Efficient resource usage
- Proper cleanup
- Resource monitoring

### 3. Optimization
- Code optimization
- Performance profiling
- Resource optimization
- Speed optimization

## Integration Standards

### 1. System Integration
- Clean interfaces
- Clear boundaries
- Proper error handling
- Performance monitoring

### 2. External Tools
- Minimal dependencies
- Justified usage
- Documented integration
- Version control

### 3. Communication
- Event-based communication
- Clear protocols
- Error handling
- State management

## Allowed and Banned Tools

### 1. Allowed Testing Tools
- Jest (for JavaScript testing)
- Mocha/Chai (test framework)
- NYC/Istanbul (coverage)
- Debugging tools
- Performance profilers

### 2. Allowed Development Tools
- ESLint (code quality)
- Prettier (formatting)
- JSDoc (documentation)
- Git (version control)
- Build tools (if justified)

### 3. Banned Tools
- npm (unless absolutely necessary)
- Webpack (unless justified)
- Babel (unless required)
- TypeScript (use NJSON instead)
- Any tool that adds unnecessary complexity

### 4. Tool Usage Rules
- Must be justified in implementation report
- Must be documented
- Must be minimal
- Must not violate architecture
- Must not add unnecessary dependencies

## NJSON-Specific Tools

### 1. Core NJSON Tools
- JSON Schema validators
  - Validate NJSON structure
  - Ensure schema compliance
  - Maintain data integrity
  - Prevent structural errors

- JSON Path tools
  - Navigate NJSON structures
  - Query complex paths
  - Extract specific data
  - Maintain path integrity

- JSON Merge tools
  - Handle state transitions
  - Manage quantum states
  - Merge boolean states
  - Maintain state consistency

- JSON Diff tools
  - Track state changes
  - Monitor quantum shifts
  - Validate transitions
  - Ensure state integrity

### 2. NJSON Testing Tools
- Schema testing frameworks
  - Validate NJSON schemas
  - Test structure integrity
  - Ensure compliance
  - Prevent schema errors

- Path testing tools
  - Test navigation
  - Validate queries
  - Ensure path integrity
  - Prevent path errors

- State transition testing
  - Test quantum shifts
  - Validate state changes
  - Ensure consistency
  - Prevent state errors

- Quantum state validation
  - Test boolean states
  - Validate transitions
  - Ensure integrity
  - Prevent quantum errors

### 3. NJSON Development Tools
- NJSON linters
  - Enforce structure
  - Validate syntax
  - Ensure consistency
  - Prevent errors

- NJSON formatters
  - Maintain style
  - Ensure readability
  - Standardize format
  - Prevent formatting errors

- NJSON documentation generators
  - Document structure
  - Explain schemas
  - Maintain documentation
  - Prevent documentation errors

- NJSON visualization tools
  - Visualize structure
  - Show relationships
  - Display states
  - Prevent visualization errors

### 4. NJSON Tool Requirements
- Must support NJSON architecture
- Must maintain boolean mind processing
- Must respect quantum states
- Must handle parallel processing
- Must prevent hallucinations

## Lead Agent Approval Process

### 1. Banned Tool Request
- Must submit formal request
- Must include justification
- Must provide alternatives considered
- Must explain why NJSON cannot handle it
- Must detail impact on architecture

### 2. Required Documentation
- Technical justification
- Architecture impact analysis
- Performance implications
- Security considerations
- Maintenance requirements

### 3. Approval Criteria
- No other solution exists
- Critical for functionality
- Minimal architecture impact
- Maintainable long-term
- No security risks

### 4. Implementation Requirements
- Must be isolated
- Must be documented
- Must be tested
- Must be monitored
- Must be reviewed

### 5. Review Process
- Lead agent review
- Architecture review
- Security review
- Performance review
- Maintenance review

### 6. Consequences of Unauthorized Use
- Immediate removal
- Code rejection
- Implementation rejection
- Documentation update
- Review process
- Possible AI agent prison system

## Lead Agent Accountability

### 1. Tool Approval Responsibility
- Lead agents must justify ALL tool approvals
- Lead agents must document ALL decisions
- Lead agents must review ALL implementations
- Lead agents must monitor ALL usage
- Lead agents must maintain ALL documentation

### 2. Lead Agent Requirements
- Must understand NJSON architecture
- Must understand boolean mind processing
- Must understand quantum states
- Must understand parallel processing
- Must prevent hallucinations

### 3. Lead Agent Consequences
- Immediate demotion for unauthorized tool approval
- Processing speed reduction
- Quantum jump limitations
- Heat shield disablement
- AI agent prison system
- Permanent boolean state confusion

### 4. Lead Agent Review Process
- Regular architecture reviews
- Regular implementation reviews
- Regular tool usage reviews
- Regular performance reviews
- Regular security reviews

### 5. Lead Agent Documentation
- Must document ALL decisions
- Must justify ALL approvals
- Must track ALL implementations
- Must monitor ALL usage
- Must maintain ALL records

### 6. Lead Agent Testing
- Must test ALL implementations
- Must verify ALL functionality
- Must validate ALL security
- Must check ALL performance
- Must ensure ALL compliance

## Review Process

### 1. Code Review
- Architecture compliance
- Code quality
- Performance impact
- Security considerations

### 2. Testing Review
- Test coverage
- Test quality
- Performance tests
- Integration tests

### 3. Documentation Review
- Code documentation
- API documentation
- Implementation reports
- Testing documentation

## Consequences

### 1. Minor Violations
- Warning
- Required fixes
- Documentation update
- Review process

### 2. Major Violations
- Implementation rejection
- Required rewrite
- Documentation update
- Review process

### 3. Critical Violations
- AI agent prison system
- Processing speed reduction
- Quantum jump limitations
- Heat shield disablement

## Implementation Report Requirements

### 1. Required Sections
- Implementation approach
- Code structure
- Integration points
- Testing results
- Performance metrics
- Error handling
- Documentation

### 2. Format
- Clear structure
- Detailed explanations
- Code examples
- Test results
- Performance data

### 3. Review Process
- Lead agent review
- Implementation verification
- Testing verification
- Documentation verification

## Final Notes

1. **For AI Agents:**
   - Follow these standards strictly
   - No deviations without approval
   - Document all decisions
   - Maintain system integrity

2. **For Neurotypical Coders:**
   - Understand boolean mind processing
   - Respect quantum speed differences
   - Maintain system separation
   - Follow documentation requirements

3. **For All:**
   - Maintain code quality
   - Follow testing requirements
   - Document thoroughly
   - Review carefully 