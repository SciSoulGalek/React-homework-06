# Questlog

Questlog is a React-based game tracking application where users can discover games, build a personal library, and track their gaming progress.

## Features

- Browse and search a game catalog.
- Filter games by genre, platform, and library status.
- Sort and paginate game results.
- View individual game details.
- Add games to a personal library.
- Track games as Want to Play, Playing, Completed, or Dropped.
- Add custom games to the catalog.
- View gaming statistics on the Dashboard.
- Sign up and log in using email/password or Google.
- Access a protected user Profile page.

## Technologies

- React
- Vite
- React Router
- Firebase Authentication
- JavaScript
- CSS
- Browser localStorage (mock API database)

## Installation

Clone the repository:

```bash
git clone https://github.com/SciSoulGalek/React-homework-06.git
cd React-homework-06
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root and configure Firebase:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Firebase Authentication

Questlog uses Firebase Authentication with:

- Email and password registration.
- Email and password login.
- Google sign-in.
- Persistent authentication sessions.
- Logout functionality.
- Protected Profile route.

Firebase configuration is loaded through Vite environment variables. The `.env.local` file is excluded from version control.

## Server Data and Caching

The project uses a simulated asynchronous API in `src/services/gamesApi.js`. Game data is stored in browser localStorage to simulate a backend.

Caching is implemented separately in `src/services/cacheService.js`.

The caching strategy includes:

- Cache keys for game lists and individual game details.
- A 30-second cache expiration period.
- Reuse of valid cached responses.
- Cache invalidation after game creation, updates, and library changes.
- Cache version checks to prevent outdated requests from repopulating invalidated entries.

Pages also use request identifiers to prevent older asynchronous responses from overwriting newer results.

## Project Structure

```text
src/
├── components/
├── contexts/
├── layouts/
├── pages/
├── services/
│   ├── authService.js
│   ├── cacheService.js
│   └── gamesApi.js
├── firebase.js
├── App.jsx
└── main.jsx
```

## Deployment

The application is deployed using GitHub Pages.

Live application: https://scisoulgalek.github.io/React-homework-06/

## Author

Galymzhan Ryszhanov

KBTU — Computer Systems and Software

2026