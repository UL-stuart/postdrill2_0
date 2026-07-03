# Overview Commenting System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add hover-triggered, per-item comments to the overview page (marker category rows, facet rows, Looking Ahead section) stored in localStorage per session.

**Architecture:** A `commentsStorage` pure utility handles localStorage I/O; a `useComments` hook wraps it with React state and exposes `getComment`/`setComment`/`deleteComment`; `ReportOverview` calls the hook and passes a single `commentControls` prop to `MarkersSummary`, `FacetsSummary`, and `LookingAhead`, each of which manages local hover/dialog state and renders shared `CommentButton`, `CommentDialog`, and `CommentCallout` components.

**Tech Stack:** React 18 (plain JS, no TypeScript), CSS Modules, Vitest (node environment), localStorage

---

## File Map

**Create:**
- `app/src/utils/commentsStorage.js` — pure localStorage helpers (testable in node)
- `app/src/utils/__tests__/commentsStorage.test.js` — unit tests
- `app/src/hooks/useComments.js` — React hook wrapping commentsStorage
- `app/src/components/CommentButton.jsx` + `CommentButton.module.css`
- `app/src/components/CommentDialog.jsx` + `CommentDialog.module.css`
- `app/src/components/CommentCallout.jsx` + `CommentCallout.module.css`

**Modify:**
- `app/src/pages/ReportOverview/ReportOverview.jsx` — call `useComments`, pass `commentControls`
- `app/src/pages/ReportOverview/LookingAhead.jsx` — add hover + comment UI
- `app/src/pages/ReportOverview/FacetsSummary.jsx` — add hover + comment UI per facet
- `app/src/pages/ReportOverview/MarkersSummary.jsx` — add hover + comment UI per category

---

## Task 1: Create branch

- [ ] **Create feature branch**

```bash
git checkout -b overview-commenting
```

---

## Task 2: `commentsStorage` utility with tests (TDD)

**Files:**
- Create: `app/src/utils/commentsStorage.js`
- Create: `app/src/utils/__tests__/commentsStorage.test.js`

- [ ] **Write the failing tests**

Create `app/src/utils/__tests__/commentsStorage.test.js`:

```js
import { loadComments, saveComments } from '../commentsStorage.js'

let store = {}

beforeAll(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v) },
      removeItem: k => { delete store[k] },
      clear: () => { store = {} }
    },
    writable: true
  })
})

beforeEach(() => { store = {} })

describe('loadComments', () => {
  it('returns empty object when no comments stored', () => {
    expect(loadComments('abc123')).toEqual({})
  })

  it('returns parsed comments for the given sessionId', () => {
    const comments = { 'marker:Leadership': { text: 'Good', createdAt: '2026-07-03T10:00:00Z' } }
    store['postdrill_comments_abc123'] = JSON.stringify(comments)
    expect(loadComments('abc123')).toEqual(comments)
  })

  it('does not return comments from a different session', () => {
    store['postdrill_comments_other'] = JSON.stringify({ 'facet:F1': { text: 'X', createdAt: '2026-07-03T10:00:00Z' } })
    expect(loadComments('abc123')).toEqual({})
  })

  it('returns empty object if stored value is invalid JSON', () => {
    store['postdrill_comments_abc123'] = 'not-json'
    expect(loadComments('abc123')).toEqual({})
  })
})

describe('saveComments', () => {
  it('persists comments to localStorage under the session key', () => {
    const comments = { 'lookingAhead': { text: 'Note', createdAt: '2026-07-03T10:00:00Z' } }
    saveComments('abc123', comments)
    expect(JSON.parse(store['postdrill_comments_abc123'])).toEqual(comments)
  })

  it('overwrites existing comments for the same session', () => {
    saveComments('abc123', { 'facet:F1': { text: 'Old', createdAt: '2026-07-03T10:00:00Z' } })
    saveComments('abc123', { 'facet:F1': { text: 'New', createdAt: '2026-07-03T10:01:00Z' } })
    expect(JSON.parse(store['postdrill_comments_abc123'])['facet:F1'].text).toBe('New')
  })

  it('does not overwrite a different session', () => {
    saveComments('abc123', { 'lookingAhead': { text: 'A', createdAt: '2026-07-03T10:00:00Z' } })
    saveComments('xyz999', { 'lookingAhead': { text: 'B', createdAt: '2026-07-03T10:00:00Z' } })
    expect(JSON.parse(store['postdrill_comments_abc123'])['lookingAhead'].text).toBe('A')
    expect(JSON.parse(store['postdrill_comments_xyz999'])['lookingAhead'].text).toBe('B')
  })
})
```

- [ ] **Run tests — expect them to fail**

```bash
cd app && npx vitest run src/utils/__tests__/commentsStorage.test.js
```

Expected: FAIL with "Cannot find module '../commentsStorage.js'"

- [ ] **Create `app/src/utils/commentsStorage.js`**

```js
const KEY_PREFIX = 'postdrill_comments_'

export function loadComments(sessionId) {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + sessionId)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveComments(sessionId, comments) {
  localStorage.setItem(KEY_PREFIX + sessionId, JSON.stringify(comments))
}
```

- [ ] **Run tests — expect them to pass**

```bash
npx vitest run src/utils/__tests__/commentsStorage.test.js
```

Expected: 7 tests pass

- [ ] **Run full test suite to confirm no regressions**

```bash
npm test
```

Expected: all tests pass

- [ ] **Commit**

```bash
git add app/src/utils/commentsStorage.js app/src/utils/__tests__/commentsStorage.test.js
git commit -m "feat: add commentsStorage utility with localStorage I/O"
```

---

## Task 3: `useComments` hook

**Files:**
- Create: `app/src/hooks/useComments.js`

- [ ] **Create `app/src/hooks/useComments.js`**

```js
import { useState, useEffect } from 'react'
import { loadComments, saveComments } from '../utils/commentsStorage.js'

export default function useComments(sessionId) {
  const [comments, setComments] = useState(() => loadComments(sessionId))

  useEffect(() => {
    setComments(loadComments(sessionId))
  }, [sessionId])

  function getComment(key) {
    return comments[key] ?? null
  }

  function setComment(key, text) {
    const next = { ...comments, [key]: { text, createdAt: new Date().toISOString() } }
    setComments(next)
    saveComments(sessionId, next)
  }

  function deleteComment(key) {
    const next = { ...comments }
    delete next[key]
    setComments(next)
    saveComments(sessionId, next)
  }

  return { getComment, setComment, deleteComment }
}
```

- [ ] **Run full test suite**

```bash
npm test
```

Expected: all tests pass (no tests for this hook — it's a thin React wrapper over the already-tested storage layer)

- [ ] **Commit**

```bash
git add app/src/hooks/useComments.js
git commit -m "feat: add useComments hook"
```

---

## Task 4: Wire `useComments` into `ReportOverview`

**Files:**
- Modify: `app/src/pages/ReportOverview/ReportOverview.jsx`

- [ ] **Replace `app/src/pages/ReportOverview/ReportOverview.jsx` with**

```jsx
import { useEffect } from 'react'
import { useSessionData } from '../../hooks/useSessionData.js'
import useComments from '../../hooks/useComments.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import SessionMeta from './SessionMeta.jsx'
import Timeline from './Timeline.jsx'
import LookingAhead from './LookingAhead.jsx'
import MarkersSummary from './MarkersSummary.jsx'
import FacetsSummary from './FacetsSummary.jsx'
import styles from './ReportOverview.module.css'

export default function ReportOverview({ session, onNavigate }) {
  const { data, error, loading } = useSessionData(session.sessionId, session.playerName)
  const commentControls = useComments(session.sessionId)

  useEffect(() => { document.title = `${session.playerName} — Post-Drill Report` }, [session.playerName])

  if (loading) return <LoadingSpinner label={`Loading session ${session.sessionId}…`} />
  if (error) return <ErrorState message={error} />

  return (
    <main className={`container ${styles.root}`}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Post-Drill Report</h1>
        <p className={styles.pageSubtitle}>Snipe Hunt</p>
      </header>
      <SessionMeta session={session} meta={data.meta} />
      <Timeline sessionStates={data.sessionStates} />
      <MarkersSummary
        markers={data.markersReport.markers}
        onNavigateToDetail={() => onNavigate('markers')}
        commentControls={commentControls}
      />
      <FacetsSummary
        facets={data.facetsReport.facets}
        onNavigateToDetail={() => onNavigate('facets')}
        commentControls={commentControls}
      />
      <LookingAhead
        text={data.finalReport.lookingAhead}
        commentControls={commentControls}
      />
    </main>
  )
}
```

- [ ] **Run full test suite**

```bash
npm test
```

Expected: all tests pass

- [ ] **Commit**

```bash
git add app/src/pages/ReportOverview/ReportOverview.jsx
git commit -m "feat: wire useComments into ReportOverview"
```

---

## Task 5: `CommentButton` component

**Files:**
- Create: `app/src/components/CommentButton.jsx`
- Create: `app/src/components/CommentButton.module.css`

- [ ] **Create `app/src/components/CommentButton.jsx`**

```jsx
import styles from './CommentButton.module.css'

export default function CommentButton({ onClick, hasComment }) {
  return (
    <button
      className={`${styles.button} ${hasComment ? styles.active : ''}`}
      onClick={onClick}
      title={hasComment ? 'Edit comment' : 'Add comment'}
      aria-label={hasComment ? 'Edit comment' : 'Add comment'}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M2 2h12v9H8.5L6 13.5V11H2V2z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="8" y1="5.5" x2="8" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="6.25" y1="7.25" x2="9.75" y2="7.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </button>
  )
}
```

- [ ] **Create `app/src/components/CommentButton.module.css`**

```css
.button {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0;
  transition: color 0.15s, border-color 0.15s;
}

.button:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.active {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
```

- [ ] **Run full test suite**

```bash
npm test
```

Expected: all tests pass

- [ ] **Commit**

```bash
git add app/src/components/CommentButton.jsx app/src/components/CommentButton.module.css
git commit -m "feat: add CommentButton component"
```

---

## Task 6: `CommentDialog` component

**Files:**
- Create: `app/src/components/CommentDialog.jsx`
- Create: `app/src/components/CommentDialog.module.css`

- [ ] **Create `app/src/components/CommentDialog.jsx`**

```jsx
import { useState } from 'react'
import styles from './CommentDialog.module.css'

export default function CommentDialog({ initialText = '', onSave, onCancel }) {
  const [text, setText] = useState(initialText)

  function handleSave() {
    const trimmed = text.trim()
    if (trimmed) onSave(trimmed)
  }

  return (
    <div className={styles.dialog}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a comment…"
        rows={3}
        autoFocus
      />
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onCancel}>Cancel</button>
        <button className={styles.save} onClick={handleSave} disabled={!text.trim()}>Save</button>
      </div>
    </div>
  )
}
```

- [ ] **Create `app/src/components/CommentDialog.module.css`**

```css
.dialog {
  margin-top: 8px;
  padding: 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.textarea {
  width: 100%;
  font-family: var(--font);
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 8px;
  resize: vertical;
  color: var(--color-text);
  background: var(--color-bg);
}

.textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}

.cancel {
  font-size: 13px;
  padding: 4px 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: none;
  color: var(--color-text-muted);
  cursor: pointer;
}

.cancel:hover {
  background: var(--color-bg);
}

.save {
  font-size: 13px;
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  background: var(--color-accent);
  color: #fff;
  cursor: pointer;
}

.save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

- [ ] **Run full test suite**

```bash
npm test
```

Expected: all tests pass

- [ ] **Commit**

```bash
git add app/src/components/CommentDialog.jsx app/src/components/CommentDialog.module.css
git commit -m "feat: add CommentDialog component"
```

---

## Task 7: `CommentCallout` component

**Files:**
- Create: `app/src/components/CommentCallout.jsx`
- Create: `app/src/components/CommentCallout.module.css`

- [ ] **Create `app/src/components/CommentCallout.jsx`**

```jsx
import styles from './CommentCallout.module.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export default function CommentCallout({ text, createdAt, onEdit, onDelete }) {
  return (
    <div className={styles.callout}>
      <div className={styles.header}>
        <span className={styles.label}>Comment</span>
        <span className={styles.date}>{formatDate(createdAt)}</span>
      </div>
      <p className={styles.text}>{text}</p>
      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={onEdit}>Edit</button>
        <button className={styles.actionBtn} onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
```

- [ ] **Create `app/src/components/CommentCallout.module.css`**

```css
.callout {
  margin-top: 10px;
  padding: 10px 12px;
  background: #eff6ff;
  border-left: 3px solid var(--color-accent);
  border-radius: 0 4px 4px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.date {
  font-size: 11px;
  color: var(--color-text-muted);
}

.text {
  font-size: 13px;
  color: var(--color-text);
  line-height: 1.5;
  margin-bottom: 6px;
}

.actions {
  display: flex;
  gap: 8px;
}

.actionBtn {
  font-size: 12px;
  color: var(--color-text-muted);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
}

.actionBtn:hover {
  color: var(--color-accent);
}
```

- [ ] **Run full test suite**

```bash
npm test
```

Expected: all tests pass

- [ ] **Commit**

```bash
git add app/src/components/CommentCallout.jsx app/src/components/CommentCallout.module.css
git commit -m "feat: add CommentCallout component"
```

---

## Task 8: Wire commenting into `LookingAhead`

**Files:**
- Modify: `app/src/pages/ReportOverview/LookingAhead.jsx`

- [ ] **Replace `app/src/pages/ReportOverview/LookingAhead.jsx` with**

```jsx
import { useState } from 'react'
import styles from './ReportOverview.module.css'
import CommentButton from '../../components/CommentButton.jsx'
import CommentDialog from '../../components/CommentDialog.jsx'
import CommentCallout from '../../components/CommentCallout.jsx'

const COMMENT_KEY = 'lookingAhead'

export default function LookingAhead({ text, commentControls }) {
  const [hovered, setHovered] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { getComment, setComment, deleteComment } = commentControls
  const comment = getComment(COMMENT_KEY)

  function handleSave(savedText) {
    setComment(COMMENT_KEY, savedText)
    setDialogOpen(false)
  }

  return (
    <section
      className={`card ${styles.lookingAheadCard}`}
      style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className={styles.sectionHeading}>Looking Ahead</h2>
      {(hovered || comment) && (
        <CommentButton
          onClick={() => setDialogOpen(true)}
          hasComment={!!comment}
        />
      )}
      <div className={styles.lookingAheadBody}>
        {text.split(/\n\n+/).map((p, i) => <p key={i}>{p.trim()}</p>)}
      </div>
      {dialogOpen && (
        <CommentDialog
          initialText={comment?.text ?? ''}
          onSave={handleSave}
          onCancel={() => setDialogOpen(false)}
        />
      )}
      {comment && !dialogOpen && (
        <CommentCallout
          text={comment.text}
          createdAt={comment.createdAt}
          onEdit={() => setDialogOpen(true)}
          onDelete={() => deleteComment(COMMENT_KEY)}
        />
      )}
    </section>
  )
}
```

- [ ] **Start dev server and manually verify**

```bash
npm run dev
```

Open http://localhost:5173, load a session, go to Overview. Verify:
- Hover the Looking Ahead card → speech bubble button appears top-right
- Click it → dialog opens with empty textarea
- Type a comment, click Save → dialog closes, callout appears with text + today's date
- Click Edit → dialog re-opens pre-populated with existing text; change it, Save → callout updates
- Click Delete → callout disappears
- Refresh page → comment still present (localStorage persists across page refreshes)

- [ ] **Run full test suite**

```bash
npm test
```

Expected: all tests pass

- [ ] **Commit**

```bash
git add app/src/pages/ReportOverview/LookingAhead.jsx
git commit -m "feat: add inline commenting to Looking Ahead section"
```

---

## Task 9: Wire commenting into `FacetsSummary`

**Files:**
- Modify: `app/src/pages/ReportOverview/FacetsSummary.jsx`

- [ ] **Replace `app/src/pages/ReportOverview/FacetsSummary.jsx` with**

```jsx
import { useState } from 'react'
import { computeAverage, formatAverageLabel } from '../../utils/ratingUtils.js'
import { extractFirstSentence } from '../../utils/markerUtils.js'
import RatingBadge from '../../components/RatingBadge.jsx'
import CommentButton from '../../components/CommentButton.jsx'
import CommentDialog from '../../components/CommentDialog.jsx'
import CommentCallout from '../../components/CommentCallout.jsx'
import styles from './ReportOverview.module.css'

export default function FacetsSummary({ facets, onNavigateToDetail, commentControls }) {
  const [hoveredKey, setHoveredKey] = useState(null)
  const [openDialogKey, setOpenDialogKey] = useState(null)
  const { getComment, setComment, deleteComment } = commentControls
  const avg = computeAverage(facets.map(f => f.rating))

  function handleSave(facetId, text) {
    setComment('facet:' + facetId, text)
    setOpenDialogKey(null)
  }

  return (
    <section className={`card ${styles.facetsSummary}`}>
      <div className={styles.sectionHeaderRow}>
        <h2 className={styles.sectionHeading}>Complexity Facets</h2>
        <button className={styles.detailLink} onClick={onNavigateToDetail}>View all →</button>
      </div>
      <div className={styles.facetsAvgRow}>
        <span className={styles.facetsAvgLabel}>Overall average:</span>
        <span className={styles.facetsAvgValue}>{formatAverageLabel(avg)}</span>
      </div>
      <ul className={styles.facetList}>
        {facets.map(facet => {
          const key = 'facet:' + facet.id
          const comment = getComment(key)
          return (
            <li
              key={facet.id}
              className={styles.facetRow}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredKey(facet.id)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              <div className={styles.facetNameRow}>
                <span className={styles.facetName}>{facet.name}</span>
                <RatingBadge rating={facet.rating} showLabel />
              </div>
              <div className={styles.facetSummary}>{extractFirstSentence(facet.rationale)}</div>
              {(hoveredKey === facet.id || comment) && (
                <CommentButton
                  onClick={() => setOpenDialogKey(facet.id)}
                  hasComment={!!comment}
                />
              )}
              {openDialogKey === facet.id && (
                <CommentDialog
                  initialText={comment?.text ?? ''}
                  onSave={text => handleSave(facet.id, text)}
                  onCancel={() => setOpenDialogKey(null)}
                />
              )}
              {comment && openDialogKey !== facet.id && (
                <CommentCallout
                  text={comment.text}
                  createdAt={comment.createdAt}
                  onEdit={() => setOpenDialogKey(facet.id)}
                  onDelete={() => deleteComment(key)}
                />
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
```

- [ ] **Manually verify in running dev server**

With dev server running at http://localhost:5173:
- Hover a facet row → speech bubble appears top-right of that row only
- Add a comment → callout appears below that facet's summary
- Hover a different facet → its own speech bubble appears independently
- Comments on different facets are independent
- Existing Looking Ahead comment still present

- [ ] **Run full test suite**

```bash
npm test
```

Expected: all tests pass

- [ ] **Commit**

```bash
git add app/src/pages/ReportOverview/FacetsSummary.jsx
git commit -m "feat: add inline commenting to Complexity Facets section"
```

---

## Task 10: Wire commenting into `MarkersSummary`

**Files:**
- Modify: `app/src/pages/ReportOverview/MarkersSummary.jsx`

- [ ] **Replace `app/src/pages/ReportOverview/MarkersSummary.jsx` with**

```jsx
import { useState } from 'react'
import { groupMarkersByCategory, synthesizeCategorySummary, CATEGORY_ORDER } from '../../utils/markerUtils.js'
import { computeAverage, formatAverageLabel } from '../../utils/ratingUtils.js'
import CommentButton from '../../components/CommentButton.jsx'
import CommentDialog from '../../components/CommentDialog.jsx'
import CommentCallout from '../../components/CommentCallout.jsx'
import styles from './ReportOverview.module.css'

export default function MarkersSummary({ markers, onNavigateToDetail, commentControls }) {
  const [hoveredKey, setHoveredKey] = useState(null)
  const [openDialogKey, setOpenDialogKey] = useState(null)
  const { getComment, setComment, deleteComment } = commentControls
  const groups = groupMarkersByCategory(markers)

  function handleSave(cat, text) {
    setComment('marker:' + cat, text)
    setOpenDialogKey(null)
  }

  return (
    <section className={`card ${styles.markersSummary}`}>
      <div className={styles.sectionHeaderRow}>
        <h2 className={styles.sectionHeading}>Behavioural Markers</h2>
        <button className={styles.detailLink} onClick={onNavigateToDetail}>View all →</button>
      </div>
      <div className={styles.categoryList}>
        {CATEGORY_ORDER.filter(cat => groups[cat]).map(cat => {
          const catMarkers = groups[cat]
          const summary = synthesizeCategorySummary(catMarkers)
          const key = 'marker:' + cat
          const comment = getComment(key)
          return (
            <div
              key={cat}
              className={styles.categoryRow}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredKey(cat)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryName}>{cat}</span>
                <span className={styles.categoryAvg}>{formatAverageLabel(computeAverage(catMarkers.map(m => m.rating)))}</span>
              </div>
              <p className={styles.categorySummary}>{summary || 'No scored markers in this category.'}</p>
              {(hoveredKey === cat || comment) && (
                <CommentButton
                  onClick={() => setOpenDialogKey(cat)}
                  hasComment={!!comment}
                />
              )}
              {openDialogKey === cat && (
                <CommentDialog
                  initialText={comment?.text ?? ''}
                  onSave={text => handleSave(cat, text)}
                  onCancel={() => setOpenDialogKey(null)}
                />
              )}
              {comment && openDialogKey !== cat && (
                <CommentCallout
                  text={comment.text}
                  createdAt={comment.createdAt}
                  onEdit={() => setOpenDialogKey(cat)}
                  onDelete={() => deleteComment(key)}
                />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Manually verify in running dev server**

With dev server running at http://localhost:5173:
- Hover a category row → speech bubble appears
- Add a comment → callout appears below that category's summary text
- All four categories (Leadership, Coordination, Mindset, Communication) work independently
- CommentButton shows as filled/active (blue) when a comment already exists for that category
- Switching sessions clears comments (each session has its own localStorage key)
- All three sections (Markers, Facets, Looking Ahead) work together on the same page

- [ ] **Run full test suite**

```bash
npm test
```

Expected: all tests pass

- [ ] **Commit**

```bash
git add app/src/pages/ReportOverview/MarkersSummary.jsx
git commit -m "feat: add inline commenting to Behavioural Markers section"
```

---

## Task 11: Merge to main

- [ ] **Merge branch to main**

```bash
git checkout main
git merge --no-ff overview-commenting
git branch -d overview-commenting
```
