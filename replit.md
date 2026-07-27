# ChemMate

A mobile-first A-level Chemistry study companion built with React + Vite + TypeScript + Firebase.

## How to run

The app starts automatically via the **Start application** workflow (`npm run dev`), served on port 5000.

## Environment variables

All config lives in `.env`. Firebase values are already filled in (project: `chemmate-web`).  
The Gemini API key (`VITE_GEMINI_API_KEY`) is stored as a Replit Secret — required for the AI Quiz feature.

## Stack

- **React 18 + Vite 5** — frontend build
- **TypeScript** — typed throughout
- **Tailwind CSS** — utility-first styling
- **Firebase 12** — Authentication (email/password) + Firestore (notes & sketches)
- **Google Gemini** — AI quiz generation (`src/utils/geminiQuiz.ts`)

## Project structure

```
src/
  screens/       # AuthScreen, HomeScreen, MyNotesScreen, A2TopicsScreen, QuizPickerScreen, AsNotesScreen
  components/    # ScreenHeader, DrawingCanvas
  context/       # AuthContext (Firebase auth), NavigationContext (stack navigation)
  utils/         # notesApi.ts (Firestore), geminiQuiz.ts (AI), authErrors.ts
  firebase.ts    # Firebase init (reads VITE_FIREBASE_* env vars)
  data/          # a2Topics.ts — static A2 chemistry topic data
firestore.rules  # Security rules — paste into Firebase console
```

## Firestore rules

Paste `firestore.rules` into **Firebase console → Firestore → Rules** to enforce per-user data isolation.

## User preferences

- Keep the existing project structure and stack.
