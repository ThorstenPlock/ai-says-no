export type Screen = 'start' | 'analysis' | 'result';

export interface AppState {
  currentScreen: Screen;
  question: string;
  hash: number;
  observation: string;
  language: 'en' | 'de';
}

export type AppAction =
  | { type: 'START_ANALYSIS'; payload: { question: string; hash: number } }
  | { type: 'COMPLETE_ANALYSIS'; payload: { observation: string } }
  | { type: 'RESET' }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'de' };

export interface StartScreenProps {
  onSubmit: (question: string) => void;
  language: 'en' | 'de';
}

export interface AnalysisScreenProps {
  question: string;
  hash: number;
  language: 'en' | 'de';
  onComplete: () => void;
}

export interface ResultScreenProps {
  question: string;
  observation: string;
  language: 'en' | 'de';
  onNewQuestion: () => void;
  onShare: () => void;
}

export interface ProgressBarProps {
  progress: number;
}

export interface AnalysisStep {
  timestamp: number;
  progress: number;
  message: string;
  phase: number;
}

export interface Translations {
  title: string;
  subtitle: string;
  placeholder: string;
  button: string;
  newQuestion: string;
  share: string;
  result: string;
  analysisMessages: {
    phase1: string[];
    phase2: string[];
    phase3: string[];
    phase4: string[];
    phase5: string[];
    phase6: string[];
  };
  observations: string[];
}