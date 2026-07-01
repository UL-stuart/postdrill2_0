# Post-Drill Report Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a locally-runnable Vite + React (plain JS) prototype of the Uptime Labs post-drill report UI for product team review, reading data from local files already in the repo.

**Architecture:** Vite dev server with a custom middleware plugin that serves local data files (readouts, transcripts, session_states, facets_and_markers) via `/api` and `/data` routes — no separate backend, single `npm run dev` command. React components fetch from these endpoints and render a polished multi-page report with session picker, overview, markers/facets detail pages, timeline, and event-drops transcript visualization. Navigation is state-based (no router library).

**Tech Stack:** Vite, React, plain JavaScript (no TypeScript), Papaparse (CSV), `@marmelab/event-drops` + D3 (transcript visualization), CSS Modules, Vitest (TDD for all parsers and utilities)

---

## Context

The Uptime Labs team needs to show product stakeholders what a post-drill report could look like. The data already exists (18 sessions of the "Snipe Hunt" drill), but there's no UI. The spec mandates a polished, reflection-first experience — ratings visible but not dominant. The prototype scope is local-only, so no backend deployment is needed; a Vite plugin is sufficient to serve the static file data.

---

## File Map

All app code lives in `app/` (a new subdirectory of the project root). Data files stay in the project root.

```
app/
├── package.json
├── vite.config.js            ← data-serving plugin lives here
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx               ← navigation state machine (currentSession, view)
    ├── App.module.css
    ├── styles/
    │   └── global.css        ← CSS custom properties, .container, .card
    │
    ├── parsers/
    │   ├── parseUtils.js         splitAtH2(), parseRatedBlock()
    │   ├── parseMarkersFile.js   markers.md → { markers[], scoreSummary, caveats }
    │   ├── parseFacetsFile.js    facets.md  → { facets[], scoreSummary, caveats }
    │   ├── parseFinalReport.js   final-report.md → { lookingAhead }
    │   ├── parseSessionStates.js session_states.csv → [{ timestamp: Date, state }]
    │   ├── parseTranscript.js    transcript.csv → [{ datetime: Date, player, channel, message }]
    │   └── index.js              re-exports all parsers
    │
    ├── parsers/__tests__/
    │   ├── parseMarkersFile.test.js
    │   ├── parseFacetsFile.test.js
    │   ├── parseFinalReport.test.js
    │   ├── parseSessionStates.test.js
    │   └── parseTranscript.test.js
    │
    ├── utils/
    │   ├── ratingUtils.js    RATING_LABELS, computeAverage, formatAverageLabel, formatRatingLabel
    │   ├── markerUtils.js    getCategoryForMarker, groupMarkersByCategory, synthesizeCategorySummary
    │   └── sessionMeta.js    computeSessionMeta (start/end/runtime/endState)
    │
    ├── utils/__tests__/
    │   ├── ratingUtils.test.js
    │   ├── markerUtils.test.js
    │   └── sessionMeta.test.js
    │
    ├── hooks/
    │   ├── useSessionList.js     GET /api/sessions → [{ sessionId, playerName, drillName }]
    │   └── useSessionData.js     fetch + parse all files for one session
    │
    ├── components/
    │   ├── ErrorState.jsx + .module.css
    │   ├── LoadingSpinner.jsx + .module.css
    │   ├── RatingBadge.jsx + .module.css
    │   └── Nav.jsx + .module.css
    │
    └── pages/
        ├── SessionPicker/
        │   ├── SessionPicker.jsx
        │   └── SessionPicker.module.css
        ├── ReportOverview/
        │   ├── ReportOverview.jsx
        │   ├── ReportOverview.module.css
        │   ├── SessionMeta.jsx
        │   ├── LookingAhead.jsx
        │   ├── MarkersSummary.jsx
        │   ├── FacetsSummary.jsx
        │   └── Timeline.jsx
        ├── MarkersDetail/
        │   ├── MarkersDetail.jsx
        │   └── MarkersDetail.module.css
        ├── FacetsDetail/
        │   ├── FacetsDetail.jsx
        │   └── FacetsDetail.module.css
        └── TranscriptDetail/
            ├── TranscriptDetail.jsx
            ├── TranscriptDetail.module.css
            ├── EventDropsChart.jsx
            └── TranscriptTable.jsx
```

---

## Data Format Notes (for parser writers)

**markers.md / facets.md block structure:**
```
## L3 — Takes explicit ownership    ← heading: ID + em-dash + name
**Rating:** 3                       ← 1|2|3|4 or N/A
**Evidence:**
> "quote1" ... "quote2"             ← blockquote, may span lines
**Rationale:**
Free-form paragraph                 ← multi-paragraph possible
---                                 ← separator between blocks
## Score Summary                    ← trailing section, preserved verbatim
## Caveats                          ← trailing section, preserved verbatim
```

**Marker ID → category:** `L`=Leadership, `C`=Coordination, `M`=Mindset, `K`=Communication.
**Facet IDs in readouts:** `F1`–`F5` (drill-scoped). These do NOT map to `FD*` catalog IDs. Use the heading name as the "brief description".

**session_states.csv:** Has a duplicate 4th column (`session_id` twice) — PapaParse overwrites cleanly; ignore it. Timestamp: `YYYY-MM-DD HH:MM:SS.mmm`.

**transcript CSV:** `datetime, player, channel, message`. Multi-line cells are present — must use PapaParse, not split-by-line. `PLAYER` (uppercase) = human participant.

---

## Rating Scale Reference

| Value | Label |
|-------|-------|
| 1 | Not evident |
| 2 | Practicing |
| 3 | Strengthening |
| 4 | Fluent |
| N/A | Not observed (exclude from averages) |

**Average labeling:** Integer → `3 / Strengthening`. Non-integer → `2.50 / between Practicing and Strengthening`.

---

## Stage 1 — Single-Session Shell

Hardcode session `9423` / player `barry`. Goal: app boots, loads real data, shows metadata and Looking Ahead. Must already feel like a report before any complexity.

### Task 1.1 — Scaffold app directory

- [ ] **Create `app/package.json`:**

```json
{
  "name": "post-drill-report",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "papaparse": "^5.4.1",
    "d3": "^7.9.0",
    "@marmelab/event-drops": "^4.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0",
    "vitest": "^2.0.5",
    "jsdom": "^25.0.0"
  }
}
```

- [ ] Run `npm install` from inside `app/`.

- [ ] **Create `app/index.html`:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Post-Drill Report — Uptime Labs</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Create `app/src/main.jsx`:**

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
)
```

- [ ] **Create `app/src/styles/global.css`:**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --color-bg: #f5f6f8;
  --color-surface: #ffffff;
  --color-border: #e2e5ea;
  --color-text: #1a202c;
  --color-text-muted: #6b7280;
  --color-accent: #1d4ed8;
  --radius: 8px;
  --shadow: 0 1px 3px rgba(0,0,0,0.08);
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body { font-family: var(--font); background: var(--color-bg); color: var(--color-text); line-height: 1.6; font-size: 15px; }
.container { max-width: 1040px; margin: 0 auto; padding: 0 24px; }
.card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 24px; margin-bottom: 20px; }
```

- [ ] **Commit:** `feat: scaffold app directory`

---

### Task 1.2 — Vite config with data plugin

- [ ] **Create `app/vite.config.js`:**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_ROOT = path.resolve(__dirname, '..')

function uplabsDataPlugin() {
  return {
    name: 'uptime-labs-data',
    configureServer(server) {
      server.middlewares.use('/api/sessions', (req, res, next) => {
        if (req.method !== 'GET') return next()
        try {
          const readoutsDir = path.join(DATA_ROOT, 'readouts')
          const sessionIds = fs.readdirSync(readoutsDir)
            .filter(d => fs.statSync(path.join(readoutsDir, d)).isDirectory())
            .sort()

          const transcriptFiles = fs.readdirSync(path.join(DATA_ROOT, 'transcripts'))
            .filter(f => f.endsWith('.csv'))

          const sessions = sessionIds.map(sessionId => {
            const matches = transcriptFiles.filter(f => f.endsWith(`-${sessionId}.csv`))
            if (matches.length === 0) throw new Error(`No transcript for session ${sessionId}`)
            if (matches.length > 1) throw new Error(`Multiple transcripts for session ${sessionId}: ${matches.join(', ')}`)
            return { sessionId, playerName: matches[0].replace(`-${sessionId}.csv`, ''), drillName: 'Snipe Hunt' }
          })

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(sessions))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message }))
        }
      })

      server.middlewares.use('/data', (req, res, next) => {
        if (req.method !== 'GET') return next()
        const filePath = path.resolve(DATA_ROOT, decodeURIComponent(req.url).replace(/^\//, ''))
        if (!filePath.startsWith(DATA_ROOT)) { res.statusCode = 403; res.end('Forbidden'); return }
        try {
          const content = fs.readFileSync(filePath, 'utf8')
          res.setHeader('Content-Type', path.extname(filePath) === '.csv' ? 'text/csv' : 'text/plain; charset=utf-8')
          res.end(content)
        } catch {
          res.statusCode = 404
          res.end(`Not found: ${req.url}`)
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), uplabsDataPlugin()],
  test: { environment: 'node', globals: true }
})
```

- [ ] Run `npm run dev` from `app/`. Visit `localhost:5173/api/sessions` — confirm JSON with 18 sessions.
- [ ] **Commit:** `feat: add Vite data-serving plugin`

---

### Task 1.3 — TDD: parseFinalReport

- [ ] **Write `app/src/parsers/__tests__/parseFinalReport.test.js`:**

```js
import { parseFinalReport } from '../parseFinalReport.js'

const SAMPLE = `# Post-Drill Report — Snipe Hunt\n\n## Some Section\n\nContent here.\n\n---\n\n## Looking Ahead\n\nCarry two things into your next drill. First, practice articulating...\nSecond, look for opportunities.`.trim()

describe('parseFinalReport', () => {
  it('extracts the Looking Ahead section verbatim', () => {
    const result = parseFinalReport(SAMPLE)
    expect(result.lookingAhead).toContain('Carry two things')
    expect(result.lookingAhead).toContain('Second, look for opportunities.')
  })
  it('does not include the ## Looking Ahead heading itself', () => {
    expect(parseFinalReport(SAMPLE).lookingAhead).not.toContain('## Looking Ahead')
  })
  it('throws when Looking Ahead section is missing', () => {
    expect(() => parseFinalReport('# Report\n\n## Other\nContent')).toThrow(/Looking Ahead/)
  })
  it('stops at the next ## heading if one follows', () => {
    const result = parseFinalReport(SAMPLE + '\n\n## Appendix\n\nExtra')
    expect(result.lookingAhead).not.toContain('Appendix')
  })
})
```

- [ ] Run `cd app && npx vitest run src/parsers/__tests__/parseFinalReport.test.js` — expect 4 failures (file missing).

- [ ] **Create `app/src/parsers/parseFinalReport.js`:**

```js
export function parseFinalReport(text) {
  const startRe = /\n## Looking Ahead\n/
  const startMatch = startRe.exec(text)
  if (!startMatch) throw new Error('Missing "## Looking Ahead" section in final report')
  const rest = text.slice(startMatch.index + startMatch[0].length)
  const nextHeading = /\n## /.exec(rest)
  return { lookingAhead: (nextHeading ? rest.slice(0, nextHeading.index) : rest).trim() }
}
```

- [ ] Run tests — expect all 4 to pass.
- [ ] **Commit:** `test+feat: parseFinalReport with TDD`

---

### Task 1.4 — TDD: parseSessionStates

- [ ] **Write `app/src/parsers/__tests__/parseSessionStates.test.js`:**

```js
import { parseSessionStates } from '../parseSessionStates.js'

const CSV = `"session_id","timestamp","state","session_id"
9401,2026-06-10 07:43:50.466,degraded,9401
9401,2026-06-10 07:44:30.862,customer_support_info_1,9401
9401,2026-06-10 08:12:32.260,wrap_up,9401
9418,2026-06-11 07:21:27.212,degraded,9418`

describe('parseSessionStates', () => {
  it('returns only rows for requested session', () => {
    expect(parseSessionStates(CSV, '9401')).toHaveLength(3)
  })
  it('sorts by timestamp ascending', () => {
    const r = parseSessionStates(CSV, '9401')
    expect(r[0].state).toBe('degraded')
    expect(r[2].state).toBe('wrap_up')
  })
  it('parses timestamp as Date', () => {
    expect(parseSessionStates(CSV, '9401')[0].timestamp).toBeInstanceOf(Date)
  })
  it('throws when session not found', () => {
    expect(() => parseSessionStates(CSV, '9999')).toThrow(/9999/)
  })
})
```

- [ ] Run — 4 failures.

- [ ] **Create `app/src/parsers/parseSessionStates.js`:**

```js
import Papa from 'papaparse'

export function parseSessionStates(csvText, sessionId) {
  const { data, errors } = Papa.parse(csvText.trim(), { header: true, skipEmptyLines: true })
  const fatal = errors.filter(e => e.type === 'Abort')
  if (fatal.length > 0) throw new Error(`CSV parse error: ${fatal[0].message}`)

  const rows = data
    .filter(r => String(r.session_id).trim() === String(sessionId).trim())
    .map(r => ({ timestamp: new Date(r.timestamp), state: r.state }))
    .sort((a, b) => a.timestamp - b.timestamp)

  if (rows.length === 0)
    throw new Error(`No session states found for session "${sessionId}" in session_states.csv`)

  return rows
}
```

- [ ] Run — all pass. **Commit:** `test+feat: parseSessionStates with TDD`

---

### Task 1.5 — TDD: parseTranscript

- [ ] **Write `app/src/parsers/__tests__/parseTranscript.test.js`:**

```js
import { parseTranscript } from '../parseTranscript.js'

const SIMPLE = `datetime,player,channel,message
2026-06-11 09:10:39,PLAYER,online-boutique-9423,what are you seeing?
2026-06-11 09:10:45,bob,online-boutique-9423,checkout broken`

const MULTILINE = `datetime,player,channel,message
2026-06-11 09:09:30,uptimelabs,online-boutique-9423,":warning:

You are about to face the Snipe Hunt."
2026-06-11 09:10:39,PLAYER,online-boutique-9423,ready`

describe('parseTranscript', () => {
  it('returns one row per message', () => expect(parseTranscript(SIMPLE)).toHaveLength(2))
  it('parses datetime as Date', () => expect(parseTranscript(SIMPLE)[0].datetime).toBeInstanceOf(Date))
  it('preserves player, channel, message', () => {
    const rows = parseTranscript(SIMPLE)
    expect(rows[0].player).toBe('PLAYER')
    expect(rows[0].message).toBe('what are you seeing?')
  })
  it('handles multi-line cells', () => {
    const rows = parseTranscript(MULTILINE)
    expect(rows).toHaveLength(2)
    expect(rows[0].message).toContain('Snipe Hunt')
  })
})
```

- [ ] Run — 4 failures.

- [ ] **Create `app/src/parsers/parseTranscript.js`:**

```js
import Papa from 'papaparse'

export function parseTranscript(csvText) {
  const { data, errors } = Papa.parse(csvText.trim(), { header: true, skipEmptyLines: true })
  const fatal = errors.filter(e => e.type === 'Abort')
  if (fatal.length > 0) throw new Error(`Transcript CSV parse error: ${fatal[0].message}`)

  return data.map((row, i) => {
    if (!row.datetime || !row.player || !row.channel)
      throw new Error(`Transcript row ${i + 2} is missing required fields`)
    return { datetime: new Date(row.datetime), player: row.player, channel: row.channel, message: row.message ?? '' }
  })
}
```

- [ ] Run — all pass. **Commit:** `test+feat: parseTranscript with TDD`

---

### Task 1.6 — TDD: computeSessionMeta

- [ ] **Write `app/src/utils/__tests__/sessionMeta.test.js`:**

```js
import { computeSessionMeta } from '../sessionMeta.js'

const tx = rows => rows.map(([dt, player]) => ({ datetime: new Date(dt), player, channel: 'ch', message: '' }))
const states = rows => rows.map(([ts, state]) => ({ timestamp: new Date(ts), state }))

describe('computeSessionMeta', () => {
  const transcript = tx([
    ['2026-06-11 09:09:30', 'uptimelabs'],
    ['2026-06-11 09:10:39', 'PLAYER'],  // first PLAYER
    ['2026-06-11 09:37:44', 'PLAYER'],  // last PLAYER
    ['2026-06-11 09:38:00', 'uptimelabs'],
  ])
  const sessionStates = states([
    ['2026-06-11 09:10:14', 'degraded'],
    ['2026-06-11 09:37:57', 'wrap_up'],
  ])

  it('start time is first PLAYER message', () => {
    expect(computeSessionMeta(transcript, sessionStates).startTime.toISOString()).toContain('09:10')
  })
  it('end time is last PLAYER message', () => {
    expect(computeSessionMeta(transcript, sessionStates).endTime.toISOString()).toContain('09:37')
  })
  it('calculates runtime: 27m 5s', () => {
    const m = computeSessionMeta(transcript, sessionStates)
    expect(m.runtimeMinutes).toBe(27)
    expect(m.runtimeSeconds).toBe(5)
  })
  it('end state is last session state', () => {
    expect(computeSessionMeta(transcript, sessionStates).endState).toBe('wrap_up')
  })
  it('throws when no PLAYER messages', () => {
    expect(() => computeSessionMeta(tx([['2026-06-11 09:10:00', 'bob']]), sessionStates)).toThrow(/PLAYER/)
  })
})
```

- [ ] Run — 5 failures.

- [ ] **Create `app/src/utils/sessionMeta.js`:**

```js
export function computeSessionMeta(transcript, sessionStates) {
  const playerRows = transcript.filter(r => r.player === 'PLAYER')
  if (playerRows.length === 0)
    throw new Error('No PLAYER messages found in transcript — cannot compute session start/end time')

  const startTime = playerRows[0].datetime
  const endTime = playerRows[playerRows.length - 1].datetime
  const runtimeMs = endTime - startTime

  return {
    startTime,
    endTime,
    runtimeMinutes: Math.floor(runtimeMs / 60_000),
    runtimeSeconds: Math.floor((runtimeMs % 60_000) / 1_000),
    endState: sessionStates[sessionStates.length - 1].state,
  }
}
```

- [ ] Run — all pass. **Commit:** `test+feat: computeSessionMeta with TDD`

---

### Task 1.7 — Data hooks (Stage 1 scope)

- [ ] **Create `app/src/hooks/useSessionList.js`:**

```js
import { useState, useEffect } from 'react'

export function useSessionList() {
  const [sessions, setSessions] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/sessions')
      .then(r => r.json())
      .then(data => { if (data.error) throw new Error(data.error); setSessions(data) })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { sessions, error, loading }
}
```

- [ ] **Create `app/src/hooks/useSessionData.js`** (loads final-report, session-states, transcript for Stage 1):

```js
import { useState, useEffect, useRef } from 'react'
import { parseFinalReport } from '../parsers/parseFinalReport.js'
import { parseSessionStates } from '../parsers/parseSessionStates.js'
import { parseTranscript } from '../parsers/parseTranscript.js'
import { computeSessionMeta } from '../utils/sessionMeta.js'

const fetchText = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status} — session data file may be missing)`)
  return res.text()
}

export function useSessionData(sessionId, playerName) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const cache = useRef({})

  useEffect(() => {
    if (!sessionId || !playerName) return
    if (cache.current[sessionId]) { setData(cache.current[sessionId]); setLoading(false); return }
    setLoading(true); setError(null); setData(null)

    const load = async () => {
      const [finalReportText, statesText, transcriptText] = await Promise.all([
        fetchText(`/data/readouts/${sessionId}/${sessionId}-final-report.md`),
        fetchText(`/data/session_states/session_states.csv`),
        fetchText(`/data/transcripts/${playerName}-${sessionId}.csv`),
      ])
      const finalReport = parseFinalReport(finalReportText)
      const sessionStates = parseSessionStates(statesText, sessionId)
      const transcript = parseTranscript(transcriptText)
      const meta = computeSessionMeta(transcript, sessionStates)
      return { finalReport, sessionStates, transcript, meta }
    }

    load()
      .then(result => { cache.current[sessionId] = result; setData(result) })
      .catch(err => setError(`Session ${sessionId}: ${err.message}`))
      .finally(() => setLoading(false))
  }, [sessionId, playerName])

  return { data, error, loading }
}
```

- [ ] **Commit:** `feat: data hooks (Stage 1)`

---

### Task 1.8 — Shared components

- [ ] **Create `app/src/components/ErrorState.jsx`:**

```jsx
import styles from './ErrorState.module.css'

export default function ErrorState({ message }) {
  return (
    <div className={styles.root}>
      <div className={styles.icon}>!</div>
      <h2 className={styles.heading}>Data error</h2>
      <p className={styles.message}>{message}</p>
    </div>
  )
}
```

- [ ] **Create `app/src/components/ErrorState.module.css`:**

```css
.root { background: #fef2f2; border: 1px solid #fca5a5; border-radius: var(--radius); padding: 32px 24px; text-align: center; margin: 40px auto; max-width: 560px; }
.icon { font-size: 2rem; color: #ef4444; font-weight: 700; margin-bottom: 12px; }
.heading { font-size: 1.1rem; color: #b91c1c; margin-bottom: 8px; }
.message { color: #6b7280; font-size: 0.9rem; white-space: pre-wrap; }
```

- [ ] **Create `app/src/components/LoadingSpinner.jsx`:**

```jsx
import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className={styles.root}>
      <div className={styles.spinner} />
      <span>{label}</span>
    </div>
  )
}
```

- [ ] **Create `app/src/components/LoadingSpinner.module.css`:**

```css
.root { display: flex; align-items: center; gap: 12px; padding: 40px; justify-content: center; color: var(--color-text-muted); }
.spinner { width: 24px; height: 24px; border: 3px solid var(--color-border); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
```

- [ ] **Commit:** `feat: ErrorState and LoadingSpinner components`

---

### Task 1.9 — Nav component

- [ ] **Create `app/src/components/Nav.jsx`:**

```jsx
import styles from './Nav.module.css'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'markers', label: 'Markers' },
  { id: 'facets', label: 'Facets' },
  { id: 'transcript', label: 'Transcript' },
]

export default function Nav({ view, onNavigate, onBack, playerName, sessionId }) {
  return (
    <nav className={styles.nav}>
      <div className={`${styles.inner} container`}>
        <button className={styles.backBtn} onClick={onBack}>← All Sessions</button>
        {playerName && <span className={styles.context}>{playerName} · Session {sessionId}</span>}
        <div className={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${view === tab.id ? styles.active : ''}`}
              onClick={() => onNavigate(tab.id)}
            >{tab.label}</button>
          ))}
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Create `app/src/components/Nav.module.css`:**

```css
.nav { background: var(--color-surface); border-bottom: 1px solid var(--color-border); position: sticky; top: 0; z-index: 100; }
.inner { display: flex; align-items: center; gap: 16px; height: 52px; }
.backBtn { background: none; border: none; color: var(--color-accent); cursor: pointer; font-size: 0.85rem; white-space: nowrap; padding: 0; }
.backBtn:hover { text-decoration: underline; }
.context { color: var(--color-text-muted); font-size: 0.85rem; flex: 1; }
.tabs { display: flex; gap: 4px; margin-left: auto; }
.tab { background: none; border: none; cursor: pointer; padding: 6px 14px; border-radius: 6px; font-size: 0.9rem; color: var(--color-text-muted); }
.tab:hover { background: var(--color-bg); }
.tab.active { background: #eff6ff; color: var(--color-accent); font-weight: 600; }
```

- [ ] **Commit:** `feat: Nav component`

---

### Task 1.10 — SessionMeta and LookingAhead components

- [ ] **Create `app/src/pages/ReportOverview/SessionMeta.jsx`:**

```jsx
import styles from './ReportOverview.module.css'

const pad = n => String(n).padStart(2, '0')
const fmtDt = d => d.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export default function SessionMeta({ session, meta }) {
  const { startTime, endTime, runtimeMinutes, runtimeSeconds, endState } = meta
  return (
    <div className={`card ${styles.metaCard}`}>
      <dl className={styles.metaGrid}>
        {[
          ['Drill', 'Snipe Hunt'],
          ['Player', session.playerName],
          ['Session', session.sessionId],
          ['Started', fmtDt(startTime)],
          ['Completed', fmtDt(endTime)],
          ['Runtime', `${runtimeMinutes}m ${pad(runtimeSeconds)}s`],
          ['End state', endState.replace(/_/g, ' ')],
        ].map(([label, value]) => (
          <div key={label} className={styles.metaItem}>
            <dt className={styles.metaLabel}>{label}</dt>
            <dd className={styles.metaValue}>{value}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.drillDesc}>
        <h3 className={styles.drillDescLabel}>About this drill</h3>
        <p className={styles.drillDescText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Create `app/src/pages/ReportOverview/LookingAhead.jsx`:**

```jsx
import styles from './ReportOverview.module.css'

export default function LookingAhead({ text }) {
  return (
    <section className={`card ${styles.lookingAheadCard}`}>
      <h2 className={styles.sectionHeading}>Looking Ahead</h2>
      <div className={styles.lookingAheadBody}>
        {text.split(/\n\n+/).map((p, i) => <p key={i}>{p.trim()}</p>)}
      </div>
    </section>
  )
}
```

- [ ] **Create `app/src/pages/ReportOverview/ReportOverview.jsx`** (Stage 1 — metadata + Looking Ahead only):

```jsx
import { useSessionData } from '../../hooks/useSessionData.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import SessionMeta from './SessionMeta.jsx'
import LookingAhead from './LookingAhead.jsx'
import styles from './ReportOverview.module.css'

export default function ReportOverview({ session, onNavigate }) {
  const { data, error, loading } = useSessionData(session.sessionId, session.playerName)

  if (loading) return <LoadingSpinner label={`Loading session ${session.sessionId}…`} />
  if (error) return <ErrorState message={error} />

  return (
    <main className={`container ${styles.root}`}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Post-Drill Report</h1>
        <p className={styles.pageSubtitle}>Snipe Hunt</p>
      </header>
      <SessionMeta session={session} meta={data.meta} />
      <LookingAhead text={data.finalReport.lookingAhead} />
    </main>
  )
}
```

- [ ] **Create `app/src/pages/ReportOverview/ReportOverview.module.css`:**

```css
.root { padding: 32px 0 64px; }
.pageHeader { margin-bottom: 28px; }
.pageTitle { font-size: 1.8rem; font-weight: 700; letter-spacing: -0.02em; }
.pageSubtitle { color: var(--color-text-muted); margin-top: 4px; }

.metaCard dl { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px 24px; }
.metaItem {}
.metaLabel { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; }
.metaValue { font-size: 1rem; font-weight: 500; margin-top: 2px; }
.drillDesc { margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--color-border); }
.drillDescLabel { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; margin-bottom: 6px; }
.drillDescText { color: var(--color-text-muted); font-size: 0.9rem; }

.sectionHeading { font-size: 1.1rem; font-weight: 700; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border); }
.sectionHeaderRow { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 16px; }
.detailLink { background: none; border: none; color: var(--color-accent); cursor: pointer; font-size: 0.9rem; }
.detailLink:hover { text-decoration: underline; }
.lookingAheadBody p { margin-bottom: 14px; line-height: 1.75; }
.lookingAheadBody p:last-child { margin-bottom: 0; }
```

- [ ] **Commit:** `feat: SessionMeta and LookingAhead components`

---

### Task 1.11 — App.jsx (Stage 1 — hardcoded session)

- [ ] **Create `app/src/parsers/index.js`:**

```js
export { parseFinalReport } from './parseFinalReport.js'
export { parseMarkersFile } from './parseMarkersFile.js'
export { parseFacetsFile } from './parseFacetsFile.js'
export { parseSessionStates } from './parseSessionStates.js'
export { parseTranscript } from './parseTranscript.js'
```

- [ ] **Create `app/src/App.jsx`** (hardcoded session 9423 for now; replaced in Stage 7):

```jsx
import { useState } from 'react'
import Nav from './components/Nav.jsx'
import ReportOverview from './pages/ReportOverview/ReportOverview.jsx'
import styles from './App.module.css'

const SESSION = { sessionId: '9423', playerName: 'barry', drillName: 'Snipe Hunt' }

export default function App() {
  const [view, setView] = useState('overview')
  return (
    <div className={styles.app}>
      <Nav view={view} onNavigate={setView} onBack={() => {}} playerName={SESSION.playerName} sessionId={SESSION.sessionId} />
      {view === 'overview' && <ReportOverview session={SESSION} onNavigate={setView} />}
    </div>
  )
}
```

- [ ] **Create `app/src/App.module.css`:** `.app { min-height: 100vh; }`

- [ ] Run `npm run dev` → `localhost:5173`. Verify: session metadata renders for barry/9423, Looking Ahead text is verbatim from the markdown file, runtime shows ~27m, end state is `wrap_up`.
- [ ] **Commit:** `feat: Stage 1 complete — single-session shell with metadata and Looking Ahead`

---

## Stage 2 — Behavioural Markers

### Task 2.1 — parseUtils (shared block splitter)

- [ ] **Create `app/src/parsers/parseUtils.js`:**

```js
export function splitAtH2(text) {
  const result = []
  const regex = /^## (.+)$/gm
  let lastHeading = null, lastIndex = 0, match
  while ((match = regex.exec(text)) !== null) {
    if (lastHeading !== null) result.push({ heading: lastHeading, body: text.slice(lastIndex, match.index) })
    lastHeading = match[1].trim()
    lastIndex = match.index + match[0].length
  }
  if (lastHeading !== null) result.push({ heading: lastHeading, body: text.slice(lastIndex) })
  return result
}

export function parseRatedBlock(id, name, body) {
  const ratingMatch = body.match(/\*\*Rating:\*\*\s*(.+)/)
  if (!ratingMatch) throw new Error(`Missing **Rating:** in block ${id}`)
  const ratingStr = ratingMatch[1].trim()
  let rating
  if (ratingStr === 'N/A') {
    rating = 'N/A'
  } else {
    rating = parseInt(ratingStr, 10)
    if (isNaN(rating) || rating < 1 || rating > 4)
      throw new Error(`Rating "${ratingStr}" is out of range in block ${id} — expected 1–4 or N/A`)
  }
  const evidenceMatch = body.match(/\*\*Evidence:\*\*\n([\s\S]*?)(?=\n\*\*Rationale:\*\*)/)
  const evidence = evidenceMatch ? evidenceMatch[1].trim() : ''
  const rationaleMatch = body.match(/\*\*Rationale:\*\*\n([\s\S]*)/)
  const rationale = rationaleMatch ? rationaleMatch[1].trim().replace(/\n?---\s*$/, '').trim() : ''
  return { id, name, rating, evidence, rationale }
}
```

- [ ] **Commit:** `feat: parseUtils (splitAtH2, parseRatedBlock)`

---

### Task 2.2 — TDD: parseMarkersFile

- [ ] **Write `app/src/parsers/__tests__/parseMarkersFile.test.js`:**

```js
import { parseMarkersFile } from '../parseMarkersFile.js'

const SAMPLE = `---

# Markers Analysis — test

## L3 — Takes explicit ownership

**Rating:** 3

**Evidence:**
> "I'll lead this"

**Rationale:**
The participant clearly drove the response. They made the key decisions.

---

## M5 — Adapts when path isn't working

**Rating:** N/A

**Evidence:**
> "N/A"

**Rationale:**
Not observed.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 | 3 |
| **Mean** | **3.00** |

---

## Caveats

- L3 was a close call.
`

describe('parseMarkersFile', () => {
  it('parses both marker blocks', () => expect(parseMarkersFile(SAMPLE).markers).toHaveLength(2))
  it('parses id and name', () => {
    const { markers } = parseMarkersFile(SAMPLE)
    expect(markers[0].id).toBe('L3')
    expect(markers[0].name).toBe('Takes explicit ownership')
  })
  it('parses numeric rating', () => expect(parseMarkersFile(SAMPLE).markers[0].rating).toBe(3))
  it('parses N/A rating', () => expect(parseMarkersFile(SAMPLE).markers[1].rating).toBe('N/A'))
  it('parses evidence', () => expect(parseMarkersFile(SAMPLE).markers[0].evidence).toContain("I'll lead this"))
  it('parses rationale without trailing ---', () => {
    const r = parseMarkersFile(SAMPLE).markers[0].rationale
    expect(r).toContain('clearly drove the response')
    expect(r).not.toContain('---')
  })
  it('captures scoreSummary', () => expect(parseMarkersFile(SAMPLE).scoreSummary).toContain('Mean'))
  it('captures caveats', () => expect(parseMarkersFile(SAMPLE).caveats).toContain('close call'))
  it('throws on out-of-range rating', () => {
    expect(() => parseMarkersFile(SAMPLE.replace('**Rating:** 3', '**Rating:** 5'))).toThrow(/out of range/)
  })
})
```

- [ ] Run — 9 failures.

- [ ] **Create `app/src/parsers/parseMarkersFile.js`:**

```js
import { splitAtH2, parseRatedBlock } from './parseUtils.js'

const MARKER_ID_RE = /^([LCMK]\d+)\s+[—–-]+\s+(.+)$/

export function parseMarkersFile(text) {
  const sections = splitAtH2(text)
  const markers = []
  let scoreSummary = null, caveats = null

  for (const { heading, body } of sections) {
    if (heading === 'Score Summary') scoreSummary = body.trim().replace(/\n?---\s*$/, '').trim()
    else if (heading === 'Caveats') caveats = body.trim().replace(/\n?---\s*$/, '').trim()
    else {
      const m = MARKER_ID_RE.exec(heading)
      if (m) markers.push(parseRatedBlock(m[1], m[2].trim(), body))
    }
  }

  return { markers, scoreSummary, caveats }
}
```

- [ ] Run — all pass. **Commit:** `test+feat: parseMarkersFile with TDD`

---

### Task 2.3 — TDD: ratingUtils

- [ ] **Write `app/src/utils/__tests__/ratingUtils.test.js`:**

```js
import { RATING_LABELS, computeAverage, formatAverageLabel, formatRatingLabel } from '../ratingUtils.js'

describe('RATING_LABELS', () => {
  it('has labels for 1–4', () => {
    expect(RATING_LABELS[1]).toBe('Not evident')
    expect(RATING_LABELS[2]).toBe('Practicing')
    expect(RATING_LABELS[3]).toBe('Strengthening')
    expect(RATING_LABELS[4]).toBe('Fluent')
  })
})
describe('computeAverage', () => {
  it('excludes N/A', () => expect(computeAverage([2, 'N/A', 3])).toBeCloseTo(2.5))
  it('returns null when all N/A', () => expect(computeAverage(['N/A'])).toBeNull())
  it('handles single value', () => expect(computeAverage([3])).toBe(3))
})
describe('formatAverageLabel', () => {
  it('integer: "3 / Strengthening"', () => expect(formatAverageLabel(3)).toBe('3 / Strengthening'))
  it('non-integer: between phrasing', () => expect(formatAverageLabel(2.5)).toBe('2.50 / between Practicing and Strengthening'))
  it('null: "N/A"', () => expect(formatAverageLabel(null)).toBe('N/A'))
})
describe('formatRatingLabel', () => {
  it('returns label for numeric', () => expect(formatRatingLabel(4)).toBe('Fluent'))
  it('returns "Not observed" for N/A', () => expect(formatRatingLabel('N/A')).toBe('Not observed'))
})
```

- [ ] Run — failures.

- [ ] **Create `app/src/utils/ratingUtils.js`:**

```js
export const RATING_LABELS = { 1: 'Not evident', 2: 'Practicing', 3: 'Strengthening', 4: 'Fluent' }

export function formatRatingLabel(rating) {
  if (rating === 'N/A') return 'Not observed'
  return RATING_LABELS[rating] ?? `Unknown (${rating})`
}

export function computeAverage(ratings) {
  const nums = ratings.filter(r => r !== 'N/A' && typeof r === 'number')
  return nums.length === 0 ? null : nums.reduce((s, r) => s + r, 0) / nums.length
}

export function formatAverageLabel(avg) {
  if (avg === null) return 'N/A'
  if (Number.isInteger(avg)) return `${avg} / ${RATING_LABELS[avg]}`
  return `${avg.toFixed(2)} / between ${RATING_LABELS[Math.floor(avg)]} and ${RATING_LABELS[Math.ceil(avg)]}`
}
```

- [ ] Run — all pass. **Commit:** `test+feat: ratingUtils with TDD`

---

### Task 2.4 — TDD: markerUtils

- [ ] **Write `app/src/utils/__tests__/markerUtils.test.js`:**

```js
import { getCategoryForMarker, groupMarkersByCategory, extractFirstSentence, synthesizeCategorySummary } from '../markerUtils.js'

describe('getCategoryForMarker', () => {
  it('maps L→Leadership', () => expect(getCategoryForMarker('L3')).toBe('Leadership'))
  it('maps C→Coordination', () => expect(getCategoryForMarker('C1')).toBe('Coordination'))
  it('maps M→Mindset', () => expect(getCategoryForMarker('M2')).toBe('Mindset'))
  it('maps K→Communication', () => expect(getCategoryForMarker('K4')).toBe('Communication'))
  it('throws on unknown prefix', () => expect(() => getCategoryForMarker('X9')).toThrow(/Unknown/))
})
describe('extractFirstSentence', () => {
  it('extracts to first sentence terminator', () => {
    expect(extractFirstSentence('The participant drove. They made decisions.')).toBe('The participant drove.')
  })
  it('falls back to first line', () => {
    expect(extractFirstSentence('No period\nSecond line')).toBe('No period')
  })
})
describe('synthesizeCategorySummary', () => {
  const markers = [
    { id: 'C1', rating: 3, rationale: 'They asked good questions. Follow-up was limited.' },
    { id: 'C4', rating: 2, rationale: 'Delegation was vague. Needs work.' },
    { id: 'C6', rating: 'N/A', rationale: 'Not observed.' },
  ]
  it('joins first sentences, excludes N/A markers', () => {
    const summary = synthesizeCategorySummary(markers)
    expect(summary).toContain('They asked good questions.')
    expect(summary).toContain('Delegation was vague.')
    expect(summary).not.toContain('Not observed.')
  })
})
```

- [ ] Run — failures.

- [ ] **Create `app/src/utils/markerUtils.js`:**

```js
const PREFIX_TO_CATEGORY = { L: 'Leadership', C: 'Coordination', M: 'Mindset', K: 'Communication' }

export function getCategoryForMarker(markerId) {
  const cat = PREFIX_TO_CATEGORY[markerId.charAt(0)]
  if (!cat) throw new Error(`Unknown marker category prefix "${markerId.charAt(0)}" in marker "${markerId}"`)
  return cat
}

export function groupMarkersByCategory(markers) {
  return markers.reduce((groups, m) => {
    const cat = getCategoryForMarker(m.id)
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(m)
    return groups
  }, {})
}

export function extractFirstSentence(text) {
  const match = text.match(/^[^.!?]+[.!?]/)
  return match ? match[0].trim() : text.split('\n')[0].trim()
}

export function synthesizeCategorySummary(markers) {
  return markers
    .filter(m => m.rating !== 'N/A')
    .map(m => extractFirstSentence(m.rationale))
    .join(' ')
}
```

- [ ] Run — all pass. **Commit:** `test+feat: markerUtils with TDD`

---

### Task 2.5 — RatingBadge + wire markers into useSessionData

- [ ] **Create `app/src/components/RatingBadge.jsx`:**

```jsx
import { formatRatingLabel } from '../utils/ratingUtils.js'
import styles from './RatingBadge.module.css'

const COLOR = { 1: 'r1', 2: 'r2', 3: 'r3', 4: 'r4', 'N/A': 'rna' }

export default function RatingBadge({ rating, showLabel = false }) {
  const label = formatRatingLabel(rating)
  return (
    <span className={`${styles.badge} ${styles[COLOR[rating] ?? 'rna']}`} title={label}>
      {showLabel ? label : rating}
    </span>
  )
}
```

- [ ] **Create `app/src/components/RatingBadge.module.css`:**

```css
.badge { display: inline-flex; align-items: center; justify-content: center; min-width: 28px; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 700; }
.r1 { background: #fee2e2; color: #b91c1c; }
.r2 { background: #fef3c7; color: #92400e; }
.r3 { background: #dbeafe; color: #1d4ed8; }
.r4 { background: #d1fae5; color: #065f46; }
.rna { background: #f3f4f6; color: #6b7280; }
```

- [ ] Update `useSessionData.js` — extend `Promise.all` to add markers file, import and call `parseMarkersFile`, include `markers` in the return object.
- [ ] **Commit:** `feat: RatingBadge + markers wired into useSessionData`

---

### Task 2.6 — MarkersSummary + MarkersDetail pages

- [ ] **Create `app/src/pages/ReportOverview/MarkersSummary.jsx`:**

```jsx
import { groupMarkersByCategory, synthesizeCategorySummary } from '../../utils/markerUtils.js'
import { computeAverage, formatAverageLabel } from '../../utils/ratingUtils.js'
import styles from './ReportOverview.module.css'

const CATEGORY_ORDER = ['Leadership', 'Coordination', 'Mindset', 'Communication']

export default function MarkersSummary({ markers, onNavigateToDetail }) {
  const groups = groupMarkersByCategory(markers)
  return (
    <section className={`card ${styles.markersSummary}`}>
      <div className={styles.sectionHeaderRow}>
        <h2 className={styles.sectionHeading}>Behavioural Markers</h2>
        <button className={styles.detailLink} onClick={onNavigateToDetail}>View all →</button>
      </div>
      <div className={styles.categoryList}>
        {CATEGORY_ORDER.filter(cat => groups[cat]).map(cat => {
          const catMarkers = groups[cat]
          return (
            <div key={cat} className={styles.categoryRow}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryName}>{cat}</span>
                <span className={styles.categoryAvg}>{formatAverageLabel(computeAverage(catMarkers.map(m => m.rating)))}</span>
              </div>
              <p className={styles.categorySummary}>{synthesizeCategorySummary(catMarkers)}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

Add to `ReportOverview.module.css`:
```css
.categoryList { display: flex; flex-direction: column; gap: 16px; }
.categoryRow { padding: 16px; background: var(--color-bg); border-radius: 6px; }
.categoryHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.categoryName { font-weight: 700; }
.categoryAvg { font-size: 0.85rem; color: var(--color-text-muted); }
.categorySummary { font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; }
```

- [ ] Update `ReportOverview.jsx` — import and add `<MarkersSummary markers={data.markers.markers} onNavigateToDetail={() => onNavigate('markers')} />` between SessionMeta and LookingAhead.

- [ ] **Create `app/src/pages/MarkersDetail/MarkersDetail.jsx`** — iterates `data.markers.markers`, groups by category using `groupMarkersByCategory`, renders each marker as a card with id, name, `RatingBadge`, `formatRatingLabel`, evidence (strip `> ` prefix), rationale paragraphs. Append `scoreSummary` and `caveats` sections at end.

- [ ] **Create `app/src/pages/MarkersDetail/MarkersDetail.module.css`** — follows the visual structure in the File Map.

- [ ] Wire `{view === 'markers' && <MarkersDetail session={...} />}` into `App.jsx`.

- [ ] Visual verify: Overview shows 4 category cards with averages and summaries. Click "View all →" → all markers in category groups with evidence and rationale.
- [ ] **Commit:** `feat: Stage 2 complete — Behavioural Markers summary and detail`

---

## Stage 3 — Complexity Facets

### Task 3.1 — TDD: parseFacetsFile

- [ ] **Write `app/src/parsers/__tests__/parseFacetsFile.test.js`** — same shape as parseMarkersFile tests but using `F\d+` IDs. Test N/A rating, scoreSummary, caveats, and out-of-range error.

- [ ] **Create `app/src/parsers/parseFacetsFile.js`:**

```js
import { splitAtH2, parseRatedBlock } from './parseUtils.js'

const FACET_ID_RE = /^(F\d+)\s+[—–-]+\s+(.+)$/

export function parseFacetsFile(text) {
  const sections = splitAtH2(text)
  const facets = []
  let scoreSummary = null, caveats = null

  for (const { heading, body } of sections) {
    if (heading === 'Score Summary') scoreSummary = body.trim().replace(/\n?---\s*$/, '').trim()
    else if (heading === 'Caveats') caveats = body.trim().replace(/\n?---\s*$/, '').trim()
    else {
      const m = FACET_ID_RE.exec(heading)
      if (m) facets.push(parseRatedBlock(m[1], m[2].trim(), body))
    }
  }

  return { facets, scoreSummary, caveats }
}
```

- [ ] Run — all pass. **Commit:** `test+feat: parseFacetsFile with TDD`

---

### Task 3.2 — Facets UI

- [ ] Update `useSessionData.js` — add facets file to `Promise.all`, import and call `parseFacetsFile`, include in return.

- [ ] **Create `app/src/pages/ReportOverview/FacetsSummary.jsx`** — list of facets (id, `RatingBadge`, name, first sentence of rationale as performance summary). Add "View all →" link.

- [ ] **Create `app/src/pages/FacetsDetail/FacetsDetail.jsx`** — each facet as card: id, name, `RatingBadge`, `formatRatingLabel`, evidence (strip `> `), rationale. Append scoreSummary and caveats.

- [ ] Wire into `ReportOverview.jsx` and `App.jsx`.

- [ ] Visual verify: Overview shows facet list. Detail page shows all 5 facets with full evidence.
- [ ] **Commit:** `feat: Stage 3 complete — Complexity Facets summary and detail`

---

## Stage 4 — Timeline

### Task 4.1 — Timeline component

Session states already loaded in `useSessionData`. No new parser needed.

- [ ] **Create `app/src/pages/ReportOverview/Timeline.jsx`:**

```jsx
import styles from './ReportOverview.module.css'

const fmtTime = d => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

export default function Timeline({ sessionStates }) {
  return (
    <section className={`card ${styles.timelineCard}`}>
      <h2 className={styles.sectionHeading}>Timeline</h2>
      <ol className={styles.timeline}>
        {sessionStates.map((entry, i) => (
          <li key={i} className={`${styles.timelineItem} ${i === sessionStates.length - 1 ? styles.timelineLast : ''}`}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <span className={styles.timelineLabel}>{entry.state.replace(/_/g, ' ')}</span>
              <span className={styles.timelineTs}>{fmtTime(entry.timestamp)}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
```

Add to `ReportOverview.module.css` — vertical line, dots, label/timestamp layout.

- [ ] Add `<Timeline sessionStates={data.sessionStates} />` to `ReportOverview.jsx`.
- [ ] Visual verify: states appear in correct order, last item gets a green dot, raw state names displayed.
- [ ] **Commit:** `feat: Stage 4 complete — Timeline component`

---

## Stage 5 — Transcript Table

### Task 5.1 — Transcript table page

Transcript already loaded. No new parser needed.

- [ ] **Create `app/src/pages/TranscriptDetail/TranscriptTable.jsx`** — table with Time, Speaker, Channel, Message columns. PLAYER rows get a highlight class. Accept `highlightedIndex` prop to yellow-highlight a row. Each `<tr>` has `id={tx-row-${i}}` for scroll targeting.

- [ ] **Create `app/src/pages/TranscriptDetail/TranscriptDetail.jsx`** (Stage 5, no chart yet) — loads via `useSessionData`, renders transcript table. Multi-line messages use `white-space: pre-wrap`.

- [ ] **Create `app/src/pages/TranscriptDetail/TranscriptDetail.module.css`** — full table styling.

- [ ] Wire into `App.jsx`.

- [ ] Visual verify: full transcript visible, PLAYER rows blue, multi-line system messages render inline without breaking.
- [ ] **Commit:** `feat: Stage 5 complete — Transcript table`

---

## Stage 6 — Event-Drops Visualization

### Task 6.1 — EventDropsChart component

- [ ] **Create `app/src/pages/TranscriptDetail/EventDropsChart.jsx`:**

```jsx
import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import styles from './TranscriptDetail.module.css'

function buildSwimlanes(transcript) {
  const lanes = new Map()
  for (const row of transcript) {
    const key = `${row.player} / ${row.channel}`
    if (!lanes.has(key)) lanes.set(key, [])
    lanes.get(key).push(row)
  }
  return Array.from(lanes.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, data]) => ({ name, data }))
}

export default function EventDropsChart({ transcript, onDropClick }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !transcript?.length) return

    import('@marmelab/event-drops').then(({ default: eventDrops }) => {
      const swimlanes = buildSwimlanes(transcript)
      const [minTime, maxTime] = d3.extent(transcript.map(r => r.datetime))

      const chart = eventDrops({
        d3,
        start: new Date(minTime.getTime() - 60_000),
        end: new Date(maxTime.getTime() + 60_000),
        eventLineHeight: 36,
        margin: { top: 20, left: 180, bottom: 20, right: 20 },
        label: { text: d => d.name, width: 170 },
        date: d => d.datetime,
        drop: {
          color: d => d.player === 'PLAYER' ? '#1d4ed8' : '#9ca3af',
          radius: 4,
          onClick: (d) => onDropClick && onDropClick(d),
        },
      })

      const container = d3.select(containerRef.current)
      container.selectAll('*').remove()
      container.datum(swimlanes).call(chart)
    })

    return () => { if (containerRef.current) d3.select(containerRef.current).selectAll('*').remove() }
  }, [transcript])

  return <div ref={containerRef} className={styles.chartContainer} />
}
```

Add `.chartContainer` CSS: white background card, min-height 200px, overflow-x: auto.

- [ ] Update `TranscriptDetail.jsx` — add `useState(null)` for `highlightedIndex`, import `EventDropsChart`, wire `onDropClick` to find the row index in `data.transcript`, `setHighlightedIndex`, and `scrollIntoView`.

- [ ] Visual verify: chart renders above transcript table. PLAYER dots are blue. Clicking a dot highlights the corresponding table row in yellow and scrolls it into view.
- [ ] **Commit:** `feat: Stage 6 complete — event-drops chart with table interaction`

---

## Stage 7 — Multi-Session Discovery + Session Picker

### Task 7.1 — SessionPicker component

- [ ] **Create `app/src/pages/SessionPicker/SessionPicker.jsx`** — uses `useSessionList`, shows loading/error states, renders a CSS grid of session cards (player name, session ID, drill name, "View report →" CTA).

- [ ] **Create `app/src/pages/SessionPicker/SessionPicker.module.css`** — card grid, hover border-color transition.

---

### Task 7.2 — Wire session picker into App.jsx

- [ ] Replace hardcoded `SESSION` constant in `App.jsx` with `useState(null)` for `currentSession`. When `currentSession` is null, render `<SessionPicker onSelectSession={...} />`. When set, render `<Nav>` + page views.

```jsx
export default function App() {
  const [currentSession, setCurrentSession] = useState(null)
  const [view, setView] = useState('overview')

  if (!currentSession) {
    return <SessionPicker onSelectSession={s => { setCurrentSession(s); setView('overview') }} />
  }

  return (
    <div className={styles.app}>
      <Nav view={view} onNavigate={setView} onBack={() => setCurrentSession(null)}
           playerName={currentSession.playerName} sessionId={currentSession.sessionId} />
      {view === 'overview'   && <ReportOverview session={currentSession} onNavigate={setView} />}
      {view === 'markers'    && <MarkersDetail session={currentSession} />}
      {view === 'facets'     && <FacetsDetail session={currentSession} />}
      {view === 'transcript' && <TranscriptDetail session={currentSession} />}
    </div>
  )
}
```

- [ ] Visual verify: picker shows 18 sessions. Click any → correct report loads. "← All Sessions" returns to picker. Sessions with N/A ratings display correctly. Sessions with fewer timeline entries don't break the Timeline component.
- [ ] **Commit:** `feat: Stage 7 complete — multi-session discovery and session picker`

---

## Stage 8 — Polish

### Task 8.1 — Error boundary

- [ ] **Create `app/src/components/ErrorBoundary.jsx`** — class component with `getDerivedStateFromError`, renders `ErrorState` with "Try again" button that resets state.
- [ ] Wrap `<App />` in `main.jsx`.
- [ ] **Commit:** `feat: add ErrorBoundary for uncaught render errors`

---

### Task 8.2 — Final polish

- [ ] Strip `> ` blockquote prefix from evidence before rendering in MarkersDetail and FacetsDetail:
  ```js
  evidence.split('\n').map(line => line.replace(/^>\s*/, '')).join('\n').trim()
  ```
- [ ] Title-case player names on SessionPicker (e.g. `barry` → `Barry`).
- [ ] Add `useEffect(() => { document.title = \`${playerName} — Uptime Labs\` }, [playerName])` to each page.
- [ ] Review: long evidence quotes don't overflow, multi-paragraph rationales render with spacing, N/A badges are visually distinct.

- [ ] **Visual review** for 3 representative sessions:
  - `9423` (barry) — full run, `wrap_up`, 12 markers all rated
  - Any session with N/A facet — N/A badge visible, excluded from averages
  - Any shorter session — timeline has fewer states, runtime is shorter

- [ ] **Commit:** `chore: Stage 8 polish — evidence rendering, title-case, page titles`

---

## Verification

```bash
cd app
npx vitest run                                          # all parser + utility tests
npx vitest run src/parsers/__tests__/                   # parsers only
npx vitest run src/utils/__tests__/                     # utils only
npm run dev                                             # start app at localhost:5173
```

Manual end-to-end:
1. Open `localhost:5173` → session picker shows 18 sessions
2. Click `barry / 9423` → Overview: metadata, timeline, marker summaries, facet list, Looking Ahead
3. Markers tab → 12 markers in 4 category groups, evidence + rationale visible
4. Facets tab → 5 facets with evidence
5. Transcript tab → event-drops chart + full table; click a dot → table scrolls and highlights
6. Click "← All Sessions" → back to picker
7. Select a session with N/A ratings → N/A badge renders, averages exclude it
8. Break a file path intentionally → red error state shows session ID and file name

---

## Key Implementation Risks

- **`splitAtH2` regex**: The em-dash in marker headings (`—`) can be a unicode em-dash, en-dash, or a hyphen. The regex `/\s+[—–-]+\s+/` handles all three.
- **`useSessionData` called per page**: Without the `useRef` cache (added in Stage 7), each tab switch re-fetches and re-parses all files. The cache is added during the data hooks task.
- **event-drops API**: The `@marmelab/event-drops` v4 API is documented in its README. The `d3`, `start/end`, `eventLineHeight`, `label`, `date`, and `drop` config keys may differ in earlier versions. Check the installed version's README if the chart doesn't render.
- **Duplicate `session_id` column**: PapaParse with `header: true` writes the duplicate column's value over the first silently. Both values are identical so `row.session_id` is always correct.
