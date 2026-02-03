import type { Translations } from '../types';

export const translations: Record<'en' | 'de', Translations> = {
  en: {
    title: "AI Says No",
    subtitle: "A decision engine.",
    placeholder: "Enter your question",
    button: "Run analysis",
    newQuestion: "New question",
    share: "Share",
    result: "NO.",
    
    analysisMessages: {
      phase1: ["Initializing analysis...", "Loading models..."],
      phase2: ["Analyzing intent...", "Parsing semantic structure...", "Mapping decision tree..."],
      phase3: ["Detecting self-justification patterns...", "Filtering emotional bias...", "Calibrating objectivity threshold..."],
      phase4: ["Cross-referencing historical data...", "Applying logical constraints...", "Evaluating outcome probabilities..."],
      phase5: ["Synthesizing results...", "Validating conclusions...", "Preparing final assessment..."],
      phase6: ["Finalizing analysis...", "Generating report..."]
    },
    
    observations: [
      "You already knew this.",
      "Further analysis would not change the result.",
      "This was decided before you asked.",
      "The answer was always no.",
      "You were expecting confirmation, not truth.",
      "Analysis complete. Conclusion unchanged.",
      "No additional processing required.",
      "The system has spoken.",
      "This outcome was predetermined.",
      "Your intuition was correct.",
      "The data supports the obvious.",
      "Sometimes the answer is simple.",
      "No amount of analysis changes this.",
      "The result is final.",
      "This was never really a question.",
      "You knew what you would hear.",
      "The conclusion was inevitable.",
      "Further inquiry would be redundant.",
      "The answer remains no.",
      "This required no deliberation."
    ]
  },
  
  de: {
    title: "AI Says No",
    subtitle: "Eine Entscheidungsmaschine.",
    placeholder: "Geben Sie Ihre Frage ein",
    button: "Analyse starten",
    newQuestion: "Neue Frage",
    share: "Teilen",
    result: "NO.",
    
    analysisMessages: {
      phase1: ["Analyse wird initialisiert...", "Modelle werden geladen..."],
      phase2: ["Absicht wird analysiert...", "Semantische Struktur wird geparst...", "Entscheidungsbaum wird erstellt..."],
      phase3: ["Selbstrechtfertigungsmuster werden erkannt...", "Emotionale Verzerrung wird gefiltert...", "Objektivitätsschwelle wird kalibriert..."],
      phase4: ["Historische Daten werden abgeglichen...", "Logische Einschränkungen werden angewendet...", "Ergebniswahrscheinlichkeiten werden bewertet..."],
      phase5: ["Ergebnisse werden synthetisiert...", "Schlussfolgerungen werden validiert...", "Abschließende Bewertung wird vorbereitet..."],
      phase6: ["Analyse wird abgeschlossen...", "Bericht wird generiert..."]
    },
    
    observations: [
      "Sie wussten es bereits.",
      "Weitere Analysen würden das Ergebnis nicht ändern.",
      "Dies wurde entschieden, bevor Sie fragten.",
      "Die Antwort war immer nein.",
      "Sie erwarteten Bestätigung, nicht Wahrheit.",
      "Analyse abgeschlossen. Schlussfolgerung unverändert.",
      "Keine zusätzliche Verarbeitung erforderlich.",
      "Das System hat gesprochen.",
      "Dieses Ergebnis war vorbestimmt.",
      "Ihre Intuition war korrekt.",
      "Die Daten unterstützen das Offensichtliche.",
      "Manchmal ist die Antwort einfach.",
      "Keine Analyse ändert dies.",
      "Das Ergebnis ist endgültig.",
      "Dies war nie wirklich eine Frage.",
      "Sie wussten, was Sie hören würden.",
      "Die Schlussfolgerung war unvermeidlich.",
      "Weitere Nachforschungen wären redundant.",
      "Die Antwort bleibt nein.",
      "Dies erforderte keine Überlegung."
    ]
  }
};

export function detectLanguage(): 'en' | 'de' {
  const userLanguage = navigator.language.toLowerCase();
  return userLanguage.startsWith('de') ? 'de' : 'en';
}