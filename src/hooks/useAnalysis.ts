import { useState, useEffect, useRef } from 'react';
import { buildAnalysisSequence, executeDecoupledSequence, getMessagePool } from '../utils/analysisSequence';

export function useAnalysis(
  _question: string,
  hash: number,
  language: 'en' | 'de',
  onComplete: () => void
) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [phase, setPhase] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  
  const prevMessageRef = useRef('');
  
  // Get appropriate message pool
  const messagePool = getMessagePool(language);

  // Detect message changes and trigger animation
  useEffect(() => {
    if (message && message !== prevMessageRef.current) {
      setIsChanging(true);
      
      // Reset animation class after animation completes
      const timer = setTimeout(() => {
        setIsChanging(false);
        prevMessageRef.current = message;
      }, 200); // Longer duration for better readability
      
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    // Build randomized message sequence (independent of progress)
    const messageSequence = buildAnalysisSequence(hash, messagePool);

    // Calculate progress duration based on message sequence
    // Progress should reach 100% when last message is shown (+ 1000ms buffer before completion)
    const lastMessageTime = messageSequence[messageSequence.length - 1]?.timestamp || 8000;
    const progressDuration = lastMessageTime + 1000;

    // Execute both systems in sync
    const cleanup = executeDecoupledSequence(
      messageSequence,
      progressDuration,
      setProgress,
      setMessage,
      setPhase,
      onComplete
    );

    return cleanup;
  }, [hash, onComplete, language]);

  return { progress, message, phase, isChanging };
}