# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A local-only Vite + React (plain JavaScript, no TypeScript) prototype of a post-drill report UI for Uptime Labs. It reads static data files already in the repo and serves them via a custom Vite middleware plugin — no separate backend.

## Commands

All commands run from `app/`:

```bash
npm run dev        # start dev server at localhost:5173
npm test           # run all tests (vitest run)
npm run test:watch # watch mode
```

Run a single test file:
```bash
npx vitest run src/parsers/__tests__/parseMarkersFile.test.js
```

## Data layout (project root, not in `app/`)

```
readouts/{sessionId}/
  {sessionId}-final-report.md
  {sessionId}-markers.md
  {sessionId}-facets.md
transcripts/{playerName}-{sessionId}.csv
session_states/session_states.csv
```

The Vite plugin in `vite.config.js` serves these at runtime:
- `GET /api/sessions` — scans `readouts/` dirs and matches transcript filenames to derive `{ sessionId, playerName, drillName }`
- `GET /data/*` — serves any file under the project root by path (e.g. `/data/readouts/9423/9423-markers.md`)

## Architecture

**Navigation** is state-based — no router library. `App.jsx` holds `currentSession` and `view` state. `null` session → `SessionPicker`; non-null → Nav + one of four page components (`overview`, `markers`, `facets`, `transcript`).

**Data loading** — `useSessionData(sessionId, playerName)` fires a single `Promise.all` fetching all five files for a session (final-report, session_states, transcript, markers, facets), parses them, and caches the result in a `useRef` to avoid re-fetching on tab switches. Returns `{ data, error, loading }` where `data` has keys: `finalReport`, `sessionStates`, `transcript`, `meta`, `markersReport`, `facetsReport`.

**Parser layer** (`src/parsers/`) is pure functions with no React dependency — testable with Vitest in a Node environment. The shared primitives are in `parseUtils.js`:
- `splitAtH2(text)` — splits markdown into `{ heading, body }` sections
- `parseRatedBlock(id, name, body)` — extracts `{ id, name, rating, evidence, rationale }` from a block; rating is `1–4` or `'N/A'`; throws on malformed input

**Markers and facets file format:**
```
## L3 — Marker name        ← ID [LCMK]\d+ or F\d+, then em/en-dash or hyphen
**Rating:** 3              ← 1|2|3|4|N/A
**Evidence:**
> "quote"
**Rationale:**
Free text
---
## Score Summary           ← captured verbatim
## Caveats                 ← captured verbatim
```
Duplicate IDs in a file are silently de-duped (first occurrence wins). The final report section heading may be `## Looking Ahead` or `## Looking Forward`.

**Rating scale:** 1=Not evident, 2=Practicing, 3=Strengthening, 4=Fluent. N/A is excluded from averages. Format helpers are in `src/utils/ratingUtils.js`.

**Marker categories** are derived from the ID prefix: L=Leadership, C=Coordination, M=Mindset, K=Communication. Facet IDs (F1–F5) are drill-scoped and do not map to any catalog.

**Category summary text** on the overview = first sentence of each non-N/A marker's rationale joined with spaces (`synthesizeCategorySummary` in `src/utils/markerUtils.js`).

**CSS** uses CSS Modules throughout. Global design tokens (colours, radius, shadow, font) are in `src/styles/global.css`. The `.card` and `.container` utility classes are global.

**Vitest config** runs in `environment: 'node'` with `globals: true` and `TZ: 'UTC'` (the UTC override is required for `sessionMeta` tests to pass on non-UTC machines).
