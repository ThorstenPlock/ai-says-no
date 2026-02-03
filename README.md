# AI Says No

A satirical web application that pretends to perform complex AI analysis but always ends with the answer "NO."

## Overview

**AI Says No** is a minimalistic, deterministic web app that creates the illusion of sophisticated artificial intelligence analysis. The humor comes from the contrast between the professional appearance and the predictable, simple outcome.

**Project Name:** big-pickles

## Features

- 🎯 **Deterministic Analysis:** Same input always produces same (but meaningless) analysis sequence
- 📊 **Progressive Analysis:** Multi-phase analysis with realistic progress bar and status messages
- 🌍 **Internationalization:** English and German support with automatic detection
- 📱 **PWA Ready:** Installable as a mobile app with offline support
- 🔗 **Shareable Results:** Each analysis can be shared with a unique URL
- 🌙 **Dark Mode:** Automatic system theme detection
- 📸 **Screenshot-Optimized:** Every screen works as a standalone screenshot

## Tech Stack

- **Frontend:** React 18+ with TypeScript
- **Styling:** Tailwind CSS + CSS Modules
- **State Management:** React Context API + useReducer
- **Build Tool:** Vite
- **PWA:** Workbox Service Worker
- **Deployment:** Static hosting ready (Vercel, Netlify, GitHub Pages)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd big-pickles

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Architecture

### Component Structure

```
src/
├── components/
│   ├── StartScreen.tsx      # Initial question input
│   ├── AnalysisScreen.tsx   # Fake analysis progress
│   ├── ResultScreen.tsx     # Final "NO." result
│   └── ProgressBar.tsx     # Progress indicator
├── context/
│   └── AppContext.tsx      # Global state management
├── utils/
│   ├── i18n.ts           # Translations and language detection
│   ├── hashGenerator.ts    # Deterministic hash function
│   ├── analysisSequence.ts # Analysis simulation logic
│   ├── resultMessages.ts   # Observation selector
│   └── shareableUrl.ts   # URL encoding/decoding
└── types/
    └── index.ts          # TypeScript definitions
```

### How It Works

1. **Input Phase:** User enters a question (3-200 characters)
2. **Hash Generation:** Deterministic hash created from input
3. **Analysis Simulation:** 6-phase fake analysis with progress bar (4.5-6.5s)
4. **Result Display:** Always shows "NO." with contextual observation
5. **Sharing:** Generates shareable URL that reproduces same analysis

### Deterministic Behavior

- Same question = same analysis sequence
- Same question = same observation message
- Same question = same progress timing
- Results are reproducible across sessions and devices

## Internationalization

Supports:
- **English** (default)
- **Deutsch** (German)

Language is automatically detected from browser preferences.

## PWA Features

- ✅ Installable on desktop and mobile
- ✅ Offline support
- ✅ Custom icons and splash screens
- ✅ Standalone mode

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build and upload dist/ folder
npm run build
# Upload dist/ to Netlify
```

### Manual

1. Run `npm run build`
2. Upload `dist/` folder to your static hosting provider

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_APP_URL=https://your-domain.com
VITE_APP_NAME=AI Says No
```

## Design Principles

- **Minimalism:** No unnecessary visual elements
- **Professionalism:** Takes itself seriously
- **Subtlety:** The joke is never explained
- **Consistency:** Deterministic, reproducible behavior
- **Performance:** Fast loading, smooth animations

## Contributing

1. Keep it minimal
2. Don't explain the joke
3. Maintain deterministic behavior
4. Test on multiple devices
5. Follow existing code style

## License

MIT License - feel free to use this as a template for your own satirical apps.

## Credits

Built with React, TypeScript, Tailwind CSS, and a sense of humor.

---

*(The answer is still NO.)*

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
