/**
 * Selects deterministic messages from pools based on hash
 * Same hash always produces same selection
 */
export function selectRandomMessages(
  hash: number,
  messagePool: any,
  targetCount: number = 18
): string[] {
  const selected: string[] = [];
  
  // Phase distribution (total: ~18 messages over 8-12 seconds)
  const distribution = {
    initialization: 2,   // Warm-up
    parsing: 3,          // Understanding
    deepAnalysis: 4,     // Heavy lifting
    biasDetection: 3,    // Critical phase
    realityCheck: 2,     // Reality hits
    technobabble: 2,     // Comic relief
    philosophical: 1,    // Existential moment
    finalization: 1      // Wrap up
  };
  
  let seed = hash;
  
  // Remove unused function - using simple modulo for deterministic selection
  
  // Select messages using deterministic indices
  Object.entries(distribution).forEach(([category, amount]) => {
    const pool = messagePool[category as keyof any];
    const startIndex = Math.abs(seed) % (pool.length - amount + 1);
    
    // Take messages sequentially from startIndex
    for (let i = 0; i < amount; i++) {
      const index = (startIndex + i) % pool.length;
      selected.push(pool[index]);
    }
  });
  
  return selected.slice(0, targetCount);
}