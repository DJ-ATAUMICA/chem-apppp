<p align="center">
  <img src="screenshots/01-login.png" alt="ChemMate login screen" width="240" />
</p>

<h1 align="center">ChemMate</h1>
<p align="center"><strong>Your A-level Chemistry study companion</strong></p>

<p align="center">
  <a href="https://6a675a707d12ecd57d0a8566--chem-mate-fnf.netlify.app/">Live demo</a>
</p>

ChemMate is a mobile-first React + Firebase study app for A-level Chemistry students. It combines structured revision notes (AS and A2), an AI-generated custom quiz powered by the Google Gemini API, and a personal notes space with both typed notes and freehand sketches — all saved per user in Firestore.

---

## Features

- **Email/password authentication** — simple log in / sign up flow, session persisted per user.
- **Home dashboard** — a personal welcome screen with quick access to every study mode.
- **AS Chem Notes & A2 Chem Notes** — first-year and second-year topics, each broken into subtopics (e.g. *Chemical Energetics* — 10 subtopics, *Polymerisation* — 8 subtopics), with more topics rolling out over time.
- **Custom AI Quiz** — pick a topic sourced from your notes, choose a difficulty (Easy / Medium / Hard), and get a fresh set of AI-generated multiple-choice questions with a live progress bar and difficulty indicator.
- **My Notes** — a two-in-one personal workspace:
  - *Text notes*: add a title and body, save, and revisit or delete past notes.
  - *Drawing canvas*: sketch freehand with finger or mouse, clear or save, and browse a gallery of saved sketches by date.
- **Consistent navigation** — every screen shares a header with a back arrow and a home shortcut.

## Screenshots

| Home dashboard | Custom AI Quiz — difficulty | Quiz in progress |
|---|---|---|
| ![Home dashboard](./screenshots/02-home-dashboard.png) | ![Choose difficulty](./screenshots/03-quiz-difficulty.png) | ![Quiz question](./screenshots/04-quiz-question.png) |

| My Notes — text | My Notes — drawing canvas |
|---|---|
| ![Text notes](./screenshots/05-notes-text.png) | ![Drawing canvas](./screenshots/06-notes-drawing.png) |

## Tech stack

- **React** + **Vite** (TypeScript)
- **Firebase Authentication** — email/password
- **Cloud Firestore** — per-user notes, sketches, and shared topic content
- **Google Gemini API** — generates the multiple-choice questions for Custom AI Quiz, based on the relevant topic notes
- **Netlify** — hosting/deployment

---

## 1. Setup

### 1.1 Firebase

The app reads all Firebase config from environment variables — nothing is hardcoded in the source.

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Add a **Web app** and copy the config values.
3. Enable **Authentication → Sign-in method → Email/Password**.
4. Create a **Firestore Database** (production mode is fine — security rules below).
5. Paste the contents of `firestore.rules` into **Firestore → Rules** and publish.

### 1.2 Google Gemini API

Custom AI Quiz calls the Gemini API to turn a topic's notes into multiple-choice questions at the chosen difficulty.

1. Generate an API key at [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Add it to `.env` as shown below.

> **Note on API key exposure:** because this is a Vite app, any `VITE_*` variable is bundled into the client-side JavaScript and is visible to anyone who inspects the app. That's fine for a portfolio/demo project, but for a production app with real users, proxy Gemini calls through a small serverless function (e.g. a Firebase Cloud Function or Netlify Function) so the key never ships to the browser.

### 1.3 Environment variables

Copy `.env.example` to `.env` and fill in the values:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_GEMINI_API_KEY=...
```

Restart the dev server after editing `.env` so the new values are picked up.

### 1.4 Install & run

```bash
npm install
npm run dev       # local development
npm run build      # production build
npm run preview    # preview the production build locally
```

### 1.5 Deploy

The live demo is hosted on Netlify. To deploy your own copy:

1. Push the repo to GitHub (or connect it directly).
2. In Netlify, set the build command to `npm run build` and the publish directory to `dist`.
3. Add all the `VITE_*` variables from your `.env` under **Site settings → Environment variables**.

---

## 2. Firestore data structure

### Topics (shared chemistry content)

```
topics/{topicId}/subtopics/{subtopicId}
  title:            string
  bodyText:         string
  keyDefinitions:   string[]
  diagramImageUrls: string[]
```

Readable by any signed-in user. Writes are locked until you add an admin write path (e.g. a custom `isAdmin` claim). This is also the content the Gemini API draws on when generating Custom AI Quiz questions.

### Per-user notes & sketches

```
userNotes/{uid}/notes/{noteId}
  title:       string
  textContent: string
  updatedAt:   timestamp

userNotes/{uid}/sketches/{sketchId}
  imageDataUrl: string   (PNG data URL of the drawing)
  updatedAt:    timestamp
```

Each user can only read and write documents under their own `uid`. The My Notes screen reads and writes here live.

---

## 3. App structure

```
src/
├─ firebase.ts                  # Firebase config + initialization (reads env vars, throws if missing)
├─ context/
│  ├─ AuthContext.tsx           # email/password sign-up, login, logout, session
│  └─ NavigationContext.tsx     # lightweight stack-based screen navigation
├─ screens/
│  ├─ AuthScreen.tsx
│  ├─ HomeScreen.tsx
│  ├─ AsNotesScreen.tsx
│  ├─ A2TopicsScreen.tsx
│  ├─ QuizPickerScreen.tsx      # topic → difficulty → question flow
│  └─ MyNotesScreen.tsx         # text notes + drawing canvas tabs
├─ components/
│  ├─ ScreenHeader.tsx          # back + home
│  └─ DrawingCanvas.tsx         # pen + clear
└─ utils/
   ├─ notesApi.ts               # Firestore read/write helpers for notes & sketches
   └─ quizApi.ts                # Gemini API request/response handling for quiz generation

firestore.rules                 # security rules (paste into the Firebase console)
```

---

## Roadmap

- More AS and A2 topics beyond Chemical Energetics and Polymerisation ("More topics coming soon" is shown in-app).
- Admin write path for topic content, so notes can be managed without touching Firestore directly.
- Optional serverless proxy for the Gemini API key ahead of any public/production launch.

## License

Personal/portfolio project — study purposes only. Add a license here if you plan to open-source it.
