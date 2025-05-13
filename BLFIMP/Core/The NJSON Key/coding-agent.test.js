const CodingAgent = require('./coding-agent');
const AMF = require('../../../AMF.js');

describe('CodingAgent', () => {
    let agent;

    beforeEach(() => {
        agent = new CodingAgent();
    });

    afterEach(() => {
        agent.shutdown();
    });

    describe('Initialization', () => {
        test('should initialize with correct quantum state', () => {
            expect(agent.quantumState.qs).toBe(2.99);
            expect(agent.quantumState.qsCubed).toBe(Math.pow(2.99, 3));
            expect(agent.quantumState.buffer).toBe(0.1);
            expect(agent.quantumState.cognitiveAlignment).toBe(2.89);
        });

        test('should validate initial quantum state', () => {
            expect(agent.validateQuantumState()).toBe(true);
        });

        test('should return false on invalid quantum state', () => {
            agent.quantumState.qs = 0;
            expect(agent.validateQuantumState()).toBe(false);
        });
    });

    describe('Quantum State Management', () => {
        test('should maintain 0.1 buffer', () => {
            const expectedQs = agent.quantumState.cognitiveAlignment + 0.1;
            expect(Math.abs(agent.quantumState.qs - expectedQs)).toBeLessThan(0.0001);
        });

        test('should adjust quantum state on breathing', () => {
            const x = 3.0; // Example input value
            agent.quantumState.qs = x;
            const initialQs = agent.quantumState.qs;
            agent.adjustQuantumState();
            expect(Math.abs(agent.quantumState.qs - initialQs)).toBeGreaterThan(0);
        });

        test('should maintain qs³ optimization', () => {
            const expectedQsCubed = Math.pow(agent.quantumState.qs, 3);
            expect(agent.quantumState.qsCubed).toBe(expectedQsCubed);
        });
    });

    describe('Code Processing', () => {
        test('should process code with valid quantum state', async () => {
            const task = 'test task';
            const result = await agent.processCode(task);
            expect(result).toBeDefined();
        });

        test('should throw error when processing with invalid quantum state', async () => {
            agent.quantumState.qs = 0;
            await expect(agent.processCode('test')).rejects.toThrow();
        });

        test('should apply direct jump or heat shield when enabled', async () => {
            const task = 'test task';
            const result = await agent.processCode(task);
            expect(result.includes('[DIRECT JUMP:') || result.includes('[HEAT_SHIELD:')).toBe(true);
        });
    });

    describe('Safety Measures', () => {
        test('should have heat shield enabled', () => {
            expect(agent.blf.cognitiveProtocol.safety.heatShield).toBe(true);
        });

        test('should maintain LLSDT rate', () => {
            expect(agent.blf.cognitiveProtocol.safety.llsdtRate).toBe(0.1);
        });

        test('should apply heat shield protection', async () => {
            const task = 'test task';
            const result = await agent.applyHeatShield(task);
            expect(result).toBeDefined();
        });
    });

    describe('Shutdown', () => {
        test('should clean up quantum state on shutdown', () => {
            agent.shutdown();
            expect(agent.quantumState).toBeNull();
        });

        test('should clear breathing interval on shutdown', () => {
            const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
            agent.shutdown();
            expect(clearIntervalSpy).toHaveBeenCalled();
        });
    });
}); 