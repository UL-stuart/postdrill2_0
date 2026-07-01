# Post-Drill Report — Prototype

A local-only viewer for Uptime Labs post-drill reports. It renders session data — transcript, behavioural markers, complexity facets, and timeline — as a structured, interactive UI.

## What it does

After a drill session, the tool reads the generated readout files and presents them across four tabs:

- **Overview** — session metadata, proportional event timeline, summary scores for markers and facets, and a "Looking Ahead" section
- **Behavioural Markers** — scored ratings (1–4) for each marker across Leadership, Coordination, Mindset, and Communication categories, with evidence and rationale; includes a bar chart summary at the top
- **Complexity Facets** — scored ratings for each drill-specific complexity facet, with evidence and rationale; includes a bar chart summary at the top
- **Transcript** — full session transcript with a vertical event timeline alongside it, allowing you to see what was happening in the drill at the time of each message

Clicking a bar in the bar charts scrolls to the corresponding detail card. Clicking a dot in the transcript chart highlights and scrolls to that message.

## Requirements

- Node.js 18+
- The session data files must be present under the project root (see [Data layout](#data-layout) below)

## Running it

```bash
cd app
npm install       # first time only
npm run dev       # starts the dev server at http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173), select a session from the picker, and navigate using the tabs.

## Data layout

All data files live in the **project root** (one level above `app/`):

```
readouts/{sessionId}/
  {sessionId}-final-report.md
  {sessionId}-markers.md
  {sessionId}-facets.md

transcripts/{playerName}-{sessionId}.csv

session_states/session_states.csv
```

The dev server serves these automatically via a Vite middleware plugin — no separate backend is needed.

## Running tests

```bash
cd app
npm test            # run all tests once
npm run test:watch  # watch mode
```

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) (plain JavaScript, no TypeScript)
- [D3 v7](https://d3js.org/) for the transcript event chart
- [Vitest](https://vitest.dev/) for unit tests
- CSS Modules with global design tokens
