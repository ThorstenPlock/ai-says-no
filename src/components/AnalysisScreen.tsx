import React from 'react';
import type { AnalysisScreenProps } from '../types';
import { ProgressBar } from './ProgressBar';
import { useAnalysis } from '../hooks/useAnalysis';

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({
  question,
  hash,
  language,
  onComplete
}) => {
  const { progress, message, phase, isChanging } = useAnalysis(
    question,
    hash,
    language,
    onComplete
  );

  return (
    <div className="screen analysis-screen">
      <div className="question-display">
        <p className="question-text">{question}</p>
      </div>
      
      <div className="analysis-container">
        <div className={`status-message ${isChanging ? 'changing' : ''}`}>
          {message}
        </div>
        
        <ProgressBar progress={progress} />
        
        <div className="progress-percentage">
          {Math.round(progress)}%
        </div>
        
        {/* Optional: Phase indicator */}
        <div className="phase-indicator">
          Phase {phase + 1}/8
        </div>
      </div>
    </div>
  );
};