import { describe, it, expect } from 'vitest';
import { generateAnalysisHash } from '../hashGenerator';

describe('generateAnalysisHash', () => {
  it('should generate consistent hash for same input', () => {
    const input = 'Should I quit my job?';
    const hash1 = generateAnalysisHash(input);
    const hash2 = generateAnalysisHash(input);
    expect(hash1).toBe(hash2);
  });
  
  it('should generate different hashes for different inputs', () => {
    const hash1 = generateAnalysisHash('Question 1');
    const hash2 = generateAnalysisHash('Question 2');
    expect(hash1).not.toBe(hash2);
  });
  
  it('should always return positive numbers', () => {
    const hash = generateAnalysisHash('Any question');
    expect(hash).toBeGreaterThanOrEqual(0);
  });
  
  it('should generate different values for similar inputs', () => {
    const hash1 = generateAnalysisHash('test');
    const hash2 = generateAnalysisHash('Test');
    expect(hash1).not.toBe(hash2);
  });
});