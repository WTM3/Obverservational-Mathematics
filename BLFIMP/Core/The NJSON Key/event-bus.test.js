const EventBus = require('./event-bus');

describe('EventBus', () => {
  let eventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe('Channel Management', () => {
    test('should initialize with correct channels', () => {
      expect(eventBus.channels.has('llsdt')).toBe(true);
      expect(eventBus.channels.has('heatShield')).toBe(true);
      expect(eventBus.channels.has('quantum')).toBe(true);
      expect(eventBus.channels.has('error')).toBe(true);
    });

    test('should have correct channel configurations', () => {
      const llsdtChannel = eventBus.channels.get('llsdt');
      expect(llsdtChannel.type).toBe('system');
      expect(llsdtChannel.events.has('data_received')).toBe(true);
      expect(llsdtChannel.queue.maxSize).toBe(1000);
    });
  });

  describe('Event Publishing', () => {
    test('should publish event to valid channel', () => {
      expect(() => {
        eventBus.publish('llsdt', 'data_received', { data: 'test' });
      }).not.toThrow();
    });

    test('should throw error for invalid channel', () => {
      expect(() => {
        eventBus.publish('invalid', 'data_received', { data: 'test' });
      }).toThrow('Channel invalid does not exist');
    });

    test('should throw error for invalid event', () => {
      expect(() => {
        eventBus.publish('llsdt', 'invalid_event', { data: 'test' });
      }).toThrow('Event invalid_event is not supported by channel llsdt');
    });
  });

  describe('Queue Management', () => {
    test('should respect queue size limits', () => {
      const channel = 'llsdt';
      const maxSize = eventBus.channels.get(channel).queue.maxSize;

      // Fill queue to max size
      for (let i = 0; i < maxSize; i++) {
        eventBus.publish(channel, 'data_received', { data: `test${i}` });
      }

      // Attempt to exceed queue size
      expect(() => {
        eventBus.publish(channel, 'data_received', { data: 'overflow' });
      }).toThrow('Channel llsdt queue is full');
    });

    test('should process queue items in priority order', () => {
      const channel = 'llsdt';
      const events = [
        { event: 'data_received', priority: 'high' },
        { event: 'system_status', priority: 'low' },
        { event: 'data_processed', priority: 'medium' }
      ];

      events.forEach(({ event }) => {
        eventBus.publish(channel, event, { data: 'test' });
      });

      const queue = eventBus.channels.get(channel).queue.items;
      expect(queue[0].priority).toBe('high');
      expect(queue[1].priority).toBe('medium');
      expect(queue[2].priority).toBe('low');
    });
  });

  describe('Error Handling', () => {
    test('should handle errors and publish to error channel', () => {
      const errorSpy = jest.spyOn(eventBus, 'publish');
      
      eventBus.handleError('llsdt', new Error('Test error'));
      
      expect(errorSpy).toHaveBeenCalledWith(
        'error',
        'system_error',
        expect.objectContaining({
          channel: 'llsdt',
          error: 'Test error'
        })
      );
    });
  });

  describe('Cleanup', () => {
    test('should remove expired items from queue', () => {
      const channel = 'llsdt';
      const queue = eventBus.channels.get(channel).queue;
      
      // Add an expired item
      queue.items.push({
        event: 'data_received',
        data: { test: 'expired' },
        timestamp: Date.now() - (queue.timeout + 1000)
      });

      // Add a valid item
      queue.items.push({
        event: 'data_received',
        data: { test: 'valid' },
        timestamp: Date.now()
      });

      eventBus.cleanup();

      expect(queue.items.length).toBe(1);
      expect(queue.items[0].data.test).toBe('valid');
    });
  });

  describe('Performance Monitoring', () => {
    test('should return correct queue size', () => {
      const channel = 'llsdt';
      eventBus.publish(channel, 'data_received', { data: 'test1' });
      eventBus.publish(channel, 'data_received', { data: 'test2' });

      expect(eventBus.getQueueSize(channel)).toBe(2);
    });

    test('should return correct channel status', () => {
      const channel = 'llsdt';
      const status = eventBus.getChannelStatus(channel);

      expect(status).toEqual(expect.objectContaining({
        name: 'llsdt',
        type: 'system',
        maxQueueSize: 1000,
        events: expect.any(Array)
      }));
    });
  });
}); 