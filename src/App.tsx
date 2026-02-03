import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { StartScreen } from './components/StartScreen';
import { AnalysisScreen } from './components/AnalysisScreen';
import { ResultScreen } from './components/ResultScreen';
import { generateAnalysisHash } from './utils/hashGenerator';
import { selectObservation } from './utils/resultMessages';
import { generateShareableUrl } from './utils/shareableUrl';
import { decodeQuestionFromUrl } from './utils/shareableUrl';
import { translations } from './utils/i18n';

function AppContent() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Check for shared URL
    const sharedQuestion = decodeQuestionFromUrl();
    if (sharedQuestion) {
      const hash = generateAnalysisHash(sharedQuestion);
      dispatch({ type: 'START_ANALYSIS', payload: { question: sharedQuestion, hash } });
    }
  }, [dispatch]);

  const handleSubmit = (question: string) => {
    const hash = generateAnalysisHash(question);
    dispatch({ type: 'START_ANALYSIS', payload: { question, hash } });
  };

  const handleAnalysisComplete = () => {
    const observation = selectObservation(state.hash, translations[state.language].observations);
    dispatch({ type: 'COMPLETE_ANALYSIS', payload: { observation } });
  };

  const handleNewQuestion = () => {
    dispatch({ type: 'RESET' });
  };

  const handleShare = async () => {
    const url = generateShareableUrl(state.question);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AI Says No',
          text: `I asked: "${state.question}"`,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleLanguageChange = (language: 'en' | 'de') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'start':
        return (
          <StartScreen
            onSubmit={handleSubmit}
            language={state.language}
          />
        );
      
      case 'analysis':
        return (
          <AnalysisScreen
            question={state.question}
            hash={state.hash}
            language={state.language}
            onComplete={handleAnalysisComplete}
          />
        );
      
      case 'result':
        return (
          <ResultScreen
            question={state.question}
            observation={state.observation}
            language={state.language}
            onNewQuestion={handleNewQuestion}
            onShare={handleShare}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="language-selector">
        <button
          onClick={() => handleLanguageChange('en')}
          className={`language-btn ${state.language === 'en' ? 'active' : ''}`}
        >
          EN
        </button>
        <span className="language-divider">/</span>
        <button
          onClick={() => handleLanguageChange('de')}
          className={`language-btn ${state.language === 'de' ? 'active' : ''}`}
        >
          DE
        </button>
      </div>
      {renderScreen()}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
