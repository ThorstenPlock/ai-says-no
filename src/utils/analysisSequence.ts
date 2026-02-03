import { selectRandomMessages } from './messageSelector';
import { analysisMessagesEN, analysisMessagesDE } from './analysisMessages';

interface MessageStep {
  timestamp: number;
  message: string;
  phase: number;
}

export function buildAnalysisSequence(
  hash: number,
  messagePool: any
): MessageStep[] {
  const sequence: MessageStep[] = [];
  
  // Select random messages (deterministic based on hash)
  const selectedMessages = selectRandomMessages(hash, messagePool, 18);
  
  // Extended timing: 8-12 seconds total
  const baseDuration = 8000;
  const variation = hash % 4000;
  const totalDuration = baseDuration + variation; // 8000-12000ms
  
  // Calculate intervals (messages spread across duration)
  const messageCount = selectedMessages.length;
  const baseInterval = totalDuration / messageCount;  
  let currentTime = 0;
  let currentPhase = 0;
  
  selectedMessages.forEach((message, index) => {
    // Add variation to intervals (1200-1800ms per message)
    const intervalVariation = ((hash + index) % 600) - 300;
    const interval = Math.max(1200, baseInterval + intervalVariation);
    
    // Phase progression (roughly divide into 8 phases)
    currentPhase = Math.floor((index / messageCount) * 8);
    
    sequence.push({
      timestamp: Math.round(currentTime),
      message,
      phase: currentPhase
    });
    
    currentTime += interval;
    
    // Add dramatic pauses at key moments
    if (index === Math.floor(messageCount * 0.33)) {
      currentTime += 400; // Pause after deep analysis starts
    }
    if (index === Math.floor(messageCount * 0.66)) {
      currentTime += 300; // Pause before finalization
    }
  });
  
  return sequence;
}

export function executeDecoupledSequence(
  messageSequence: MessageStep[],
  progressDuration: number,
  setProgress: (progress: number) => void,
  setMessage: (message: string) => void,
  setPhase: (phase: number) => void,
  onComplete: () => void
) {
  const startTime = Date.now();
  let currentMessageIndex = 0;
  let messageTimerId: ReturnType<typeof setTimeout>;
  let animationFrameId: number;

  // Smooth progress updates (60fps)
  function updateProgress() {
    const elapsed = Date.now() - startTime;
    const rawProgress = (elapsed / progressDuration) * 100;

    setProgress(Math.min(100, rawProgress));

    // Continue updating until we reach 100%
    if (rawProgress < 100) {
      animationFrameId = requestAnimationFrame(updateProgress);
    }
  }

  function scheduleNextMessage() {
    if (currentMessageIndex >= messageSequence.length) {
      return;
    }

    const step = messageSequence[currentMessageIndex];
    
    setMessage(step.message);
    setPhase(step.phase);
    
    currentMessageIndex++;
    
    if (currentMessageIndex < messageSequence.length) {
      const nextStep = messageSequence[currentMessageIndex];
      const delay = nextStep.timestamp - step.timestamp;
      
      messageTimerId = setTimeout(scheduleNextMessage, delay);
    } else {
      // Last message - wait then complete
      setTimeout(onComplete, 1000);
    }
  }

  animationFrameId = requestAnimationFrame(updateProgress);
  scheduleNextMessage();

  return () => {
    clearTimeout(messageTimerId);
    cancelAnimationFrame(animationFrameId);
  };
}

export function getMessagePool(language: 'en' | 'de'): any {
  return language === 'de' ? {
    initialization: analysisMessagesDE.initialization,
    parsing: analysisMessagesDE.parsing,
    deepAnalysis: analysisMessagesDE.deepAnalysis,
    biasDetection: analysisMessagesDE.biasDetection,
    realityCheck: analysisMessagesDE.realityCheck,
    technobabble: analysisMessagesDE.technobabble,
    philosophical: analysisMessagesDE.philosophical,
    finalization: analysisMessagesDE.finalization
  } : {
    initialization: analysisMessagesEN.initialization,
    parsing: analysisMessagesEN.parsing,
    deepAnalysis: analysisMessagesEN.deepAnalysis,
    biasDetection: analysisMessagesEN.biasDetection,
    realityCheck: analysisMessagesEN.realityCheck,
    technobabble: analysisMessagesEN.technobabble,
    philosophical: analysisMessagesEN.philosophical,
    finalization: analysisMessagesEN.finalization
  };
}