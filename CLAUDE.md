# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Freedom Architect is a gamified financial education platform built with React. Users progress through levels learning financial principles, completing quizzes to unlock subsequent levels and accumulate wealth.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run lint` — ESLint across all files
- `npm run preview` — Preview production build locally

No test framework is configured.

## Architecture

**Stack:** React 19 + Vite 7 + Tailwind CSS (CDN) + React Router DOM 7

**Routing (App.jsx):**
- `/` → `WorldMap` — level selection map
- `/level/:id` → `LevelPlayer` — video + article + quiz for a level

**State:** Lifted in `App.jsx` — `unlockedLevels` (array) and `wealth` (number). No external state library. Components receive state via props.

**Course content:** All level data lives in `src/courseData.js` as a static array. Each level has `id`, `title`, `description`, `locked`, `position` (CSS coords for map), and `content` (videoUrl, markdown article, quiz challenge with options).

**Game flow:** Level 1 starts unlocked → user watches video/reads article → completes quiz → next level unlocks + $1000 wealth added.

## Styling

Tailwind CSS loaded via CDN in `index.html` with a custom cyberpunk theme:
- Primary: `#64ffda` (cyan), Dark: `#0a192f` (navy), Light: `#112240`, Secondary: `#ff6b6b`
- Glassmorphism (`backdrop-blur-md`), monospace font, neon accents
- UI text uses ALL CAPS for game flavor (e.g., "STATUS: READY")

Icons from `lucide-react`. `framer-motion` is installed but not yet used.

## Key Files

| File | Role |
|------|------|
| `src/App.jsx` | Router setup, top-level state |
| `src/courseData.js` | All level content (videos, articles, quizzes) |
| `src/components/WorldMap.jsx` | Map view with positioned level nodes |
| `src/components/LevelPlayer.jsx` | Content player with embedded video, article renderer, quiz |
| `index.html` | Tailwind CDN config with custom theme colors |

## Conventions

- JavaScript only (no TypeScript)
- Functional components with hooks, arrow functions preferred
- PascalCase component files matching component names
- Tailwind utility classes exclusively (no CSS modules/BEM)
- ESLint flat config (v9) with React hooks and refresh plugins
