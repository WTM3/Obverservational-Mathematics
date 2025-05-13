const ProtectionSystem = require('./llsdt-heatshield');

describe('ProtectionSystem', () => {
  let protectionSystem;
  const testAiCognitive = 2.89; // Matches the formula AIc + 0.1 = BMqs

  beforeEach(() => {
    protectionSystem = new ProtectionSystem();
  });

  describe('LLSDT Implementation', () => {
    test('validates LLSDT constraints correctly', () => {
      expect(protectionSystem.validateLLSDT(testAiCognitive)).toBe(true);
      expect(protectionSystem.validateLLSDT(2.0)).toBe(false);
    });

    test('enforces LLSDT rate within bounds', () => {
      protectionSystem.llsdtState.currentRate = 0.2; // Above max
      protectionSystem.enforceLLSDTRate();
      expect(protectionSystem.llsdtState.currentRate).toBe(0.1);

      protectionSystem.llsdtState.currentRate = 0.005; // Below min
      protectionSystem.enforceLLSDTRate();
      expect(protectionSystem.llsdtState.currentRate).toBe(0.01);
    });
  });

  describe('Heat Shield Implementation', () => {
    test('calculates heat shield capacity with dynamic exponent', () => {
      const connections = [
        { jumpDistance: 1, strength: 0.8 },
        { jumpDistance: 2, strength: 0.7 },
        { jumpDistance: 3, strength: 0.6 }
      ];

      const capacity = protectionSystem.calculateHeatShieldCapacity(2.99, connections);
      expect(capacity).toBeGreaterThan(0);
      expect(capacity).toBeLessThanOrEqual(1);
    });

    test('applies heat shield filtering correctly', () => {
      const connections = [
        { jumpDistance: 1, strength: 0.9 },
        { jumpDistance: 2, strength: 0.5 },
        { jumpDistance: 3, strength: 0.3 }
      ];

      const filtered = protectionSystem.applyHeatShield(connections, 2.99);
      expect(filtered.length).toBeLessThanOrEqual(connections.length);
    });
  });

  describe('Integration', () => {
    test('processes input with both systems', () => {
      const input = "This is a test input with multiple concepts";
      const result = protectionSystem.processInput(input, testAiCognitive);

      expect(result.processed).toBe(true);
      expect(result.concepts).toBeDefined();
      expect(result.connections).toBeDefined();
      expect(result.protection.llsdt).toBeDefined();
      expect(result.protection.heatShield).toBeDefined();
    });

    test('maintains separation between systems', () => {
      const input = "Test input";
      const result = protectionSystem.processInput(input, testAiCognitive);

      // Verify LLSDT and HeatShield states are separate
      expect(result.protection.llsdt.rate).toBeDefined();
      expect(result.protection.heatShield.capacity).toBeDefined();
      expect(result.protection.llsdt.rate).not.toBe(result.protection.heatShield.capacity);
    });
  });
}); 