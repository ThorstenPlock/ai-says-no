import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildAnalysisSequence, executeDecoupledSequence, getMessagePool } from '../analysisSequence';
import { analysisMessagesEN } from '../analysisMessages';
import { selectRandomMessages } from '../messageSelector';

describe('getMessagePool', () => {
  it('should return correct pool for english', () => {
    const pool = getMessagePool('en');
    expect(pool.initialization).toContain("Initializing quantum decision matrix...");
  });

  it('should return correct pool for german', () => {
    const pool = getMessagePool('de');
    expect(pool.initialization).toContain("Quanten-Entscheidungsmatrix wird initialisiert...");
  });
});

describe('Random Message Selection', () => {
  it('should be deterministic for same hash', () => {
    const hash = 12345;
    const messages1 = selectRandomMessages(hash, analysisMessagesEN);
    const messages2 = selectRandomMessages(hash, analysisMessagesEN);
    
    expect(messages1).toEqual(messages2);
  });
  
  it('should be different for different hashes', () => {
    const messages1 = selectRandomMessages(11111, analysisMessagesEN);
    const messages2 = selectRandomMessages(22222, analysisMessagesEN);
    
    expect(messages1).not.toEqual(messages2);
  });
  
  it('should select correct distribution', () => {
    const messages = selectRandomMessages(12345, analysisMessagesEN, 18);
    
    expect(messages).toHaveLength(18);
    // Ensure we have messages from different categories
    expect(new Set(messages).size).toBeGreaterThan(10);
  });
});

describe('buildAnalysisSequence', () => {
  it('should create sequence with all phases', () => {
    const messagePool = analysisMessagesEN;

    const sequence = buildAnalysisSequence(123, messagePool);
    
    expect(sequence.length).toBeGreaterThan(0);
    expect(sequence[0].timestamp).toBe(0);
    expect(sequence[0].message).toBeDefined();
  });
});

describe('executeDecoupledSequence', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should rotate through all messages', async () => {
    const messages: string[] = [];
    const setMessage = vi.fn((msg: string) => messages.push(msg));
    const setProgress = vi.fn();
    const setPhase = vi.fn();
    const onComplete = vi.fn();
    
    const messageSequence = [
      { timestamp: 0, message: 'First', phase: 0 },
      { timestamp: 1000, message: 'Second', phase: 1 },
      { timestamp: 2000, message: 'Third', phase: 2 }
    ];
    
    executeDecoupledSequence(messageSequence, 3000, setProgress, setMessage, setPhase, onComplete);
    
    // Advance time
    vi.advanceTimersByTime(500);
    expect(setMessage).toHaveBeenCalledWith('First');
    
    vi.advanceTimersByTime(1000);
    expect(setMessage).toHaveBeenCalledWith('Second');
    
    vi.advanceTimersByTime(2500); // Let progress bar complete
    expect(setMessage).toHaveBeenCalledWith('Third');
    vi.advanceTimersByTime(800); // Wait for completion delay
    expect(onComplete).toHaveBeenCalled();
  });
});