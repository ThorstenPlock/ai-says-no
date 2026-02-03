import React from 'react';
import type { ResultScreenProps } from '../types';
import { translations } from '../utils/i18n';

export const ResultScreen: React.FC<ResultScreenProps> = ({
  question,
  observation,
  language,
  onNewQuestion,
  onShare
}) => {
  const t = translations[language];

  return (
    <div className="screen result-screen">
      <div className="result-container">
        <p className="question-prominent">{question}</p>
        <h1 className="result-text">{t.result}</h1>
        <p className="observation-text">{observation}</p>
        
        <div className="action-buttons">
          <button onClick={onNewQuestion} className="button secondary">
            {t.newQuestion}
          </button>
          <button onClick={onShare} className="button secondary">
            {t.share}
          </button>
        </div>
      </div>
    </div>
  );
};