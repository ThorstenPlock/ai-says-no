import React, { createContext, useContext, useReducer } from 'react';
import type { AppState, AppAction } from '../types';
import { detectLanguage } from '../utils/i18n';

const initialState: AppState = {
  currentScreen: 'start',
  question: '',
  hash: 0,
  observation: '',
  language: detectLanguage()
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'START_ANALYSIS':
      return {
        ...state,
        currentScreen: 'analysis',
        question: action.payload.question,
        hash: action.payload.hash
      };
      
    case 'COMPLETE_ANALYSIS':
      return {
        ...state,
        currentScreen: 'result',
        observation: action.payload.observation
      };
      
    case 'RESET':
      return {
        ...state,
        currentScreen: 'start',
        question: '',
        hash: 0,
        observation: ''
      };
      
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload
      };
      
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}