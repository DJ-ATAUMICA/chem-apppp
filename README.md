# ChemMate — A-level Chemistry Study Companion

A mobile-first React + Firebase study app with email/password auth, a Home
Dashboard, placeholder study sections, and a working "My Notes" screen with text
notes and a freehand drawing canvas — all saved per user in Firestore.

## 1. Firebase setup (required before the app runs)

The app reads all Firebase config from environment variables — nothing is
hardcoded in the source.

1. Create a project at <https://console.firebase.google.com>.
2. Add a **Web app** and copy the config values.
3. Enable **Authentication → Sign-in method → Email/Password**.
4. Create a **Firestore Database** (production mode is fine — security rules below).
5. Copy `.env.example` to `.env` and fill in the six `VITE_FIREBASE_*` values:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

6. Paste the contents of `firestore.rules` into **Firestore → Rules** and publish.

> The dev server is already running — restart it after editing `.env` so the new
> values are picked up.

## 2. Firestore data structure

### Topics (shared chemistry content)

```
topics/{topicId}/subtopics/{subtopicId}
  title:            string
  bodyText:         string
  keyDefinitions:   string[]
  diagramImageUrls: string[]
```

Readable by any signed-in user. Writes are locked until you add an admin write
path (e.g. a custom `isAdmin` claim).

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

Each user can only read and write documents under their own `uid`. The My Notes
screen reads and writes here live.

## 3. App structure

- `src/firebase.ts` — config + initialization (reads env vars, throws if missing).
- `src/context/AuthContext.tsx` — email/password sign-up, login, logout, session.
- `src/context/NavigationContext.tsx` — lightweight stack-based screen navigation.
- `src/screens/` — AuthScreen, HomeScreen, AsNotesScreen, A2TopicsScreen, QuizPickerScreen, MyNotesScreen.
- `src/components/` — ScreenHeader (back + home), DrawingCanvas (pen + clear).
- `src/utils/notesApi.ts` — Firestore read/write helpers for notes & sketches.
- `firestore.rules` — security rules (paste into the Firebase console).
