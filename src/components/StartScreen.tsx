import React, { useState, useEffect } from 'react';
import type { StartScreenProps } from '../types';
import { translations } from '../utils/i18n';

export const StartScreen: React.FC<StartScreenProps> = ({ onSubmit, language }) => {
  const [question, setQuestion] = useState('');
  const [isValid, setIsValid] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const trimmed = question.trim();
    setIsValid(trimmed.length >= 3 && trimmed.length <= 200);
  }, [question]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(question.trim());
    }
  };

  return (
    <div className="screen start-screen">
      <div className="container">
        <h1 className="title">{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t.placeholder}
            className="input"
            maxLength={200}
            autoFocus
          />
          
          <button
            type="submit"
            disabled={!isValid}
            className="button primary"
          >
            {t.button}
          </button>
        </form>
      </div>
    </div>
  );
};