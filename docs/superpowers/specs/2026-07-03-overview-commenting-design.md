# Overview Commenting System — Design Spec

**Date:** 2026-07-03  
**Status:** Approved

---

## Context

The post-drill report overview page surfaces category-level behavioural marker summaries, individual complexity facet rows, and a Looking Ahead section. Reviewers (coaches, facilitators) need a way to annotate these sections with their own observations — inline, without leaving the report. Comments are ephemeral prototype-grade: stored in `localStorage`, scoped per session, and not required to survive an app restart.

---

## Comment Targets

| Key | Source component | Target element |
|-----|-----------------|----------------|
| `marker:Leadership` | `MarkersSummary` | Leadership category row |
| `marker:Coordination` | `MarkersSummary` | Coordination category row |
| `marker:Mindset` | `MarkersSummary` | Mindset category row |
| `marker:Communication` | `MarkersSummary` | Communication category row |
| `facet:{facet.id}` | `FacetsSummary` | Individual facet row (F1–F5) |
| `lookingAhead` | `LookingAhead` | Entire Looking Ahead card |

One comment maximum per target. Comments are scoped to a session — different sessions have independent comment sets.

---

## Data & Storage

**localStorage key:** `postdrill_comments_{sessionId}`

**Shape:**
```js
{
  "marker:Leadership": { text: string, createdAt: ISO8601string },
  "facet:F2":          { text: string, createdAt: ISO8601string },
  "lookingAhead":      { text: string, createdAt: ISO8601string }
}
```

---

## `useComments(sessionId)` Hook

Lives at `src/hooks/useComments.js`. Manages a single `useState` holding the full comment map for the session. Initialises from `localStorage` on mount.

**API:**
- `getComment(key)` → `{ text, createdAt } | null`
- `setComment(key, text)` → writes entry with `new Date().toISOString()` as `createdAt`, persists to localStorage
- `deleteComment(key)` → removes entry, persists to localStorage

---

## New Components

### `CommentButton` (`src/components/CommentButton.jsx`)

- Speech bubble icon with `+`, ~20px, subtle gray
- Props: `onClick`, `hasComment` (boolean — fills/highlights icon when comment exists)
- Positioned absolutely at top-right of its `position: relative` parent
- Only rendered when the parent row/card is hovered

### `CommentDialog` (`src/components/CommentDialog.jsx`)

- Inline popover (not a modal) rendered below the trigger row
- Contains: `<textarea>` (pre-populated when editing), Save button, Cancel button
- Props: `initialText`, `onSave(text)`, `onCancel`
- Closes on Cancel; calls `onSave` then closes on Save

### `CommentCallout` (`src/components/CommentCallout.jsx`)

- Inline block rendered below the row's content when a comment exists
- Shows: "Comment" label, comment text, formatted timestamp, Edit button, Delete button
- Styled with light background + left accent border — visually distinct from report content
- Props: `text`, `createdAt`, `onEdit`, `onDelete`

---

## Integration

### `ReportOverview.jsx`

```js
const commentControls = useComments(session.sessionId)
// Pass to children:
<MarkersSummary ... commentControls={commentControls} />
<FacetsSummary  ... commentControls={commentControls} />
<LookingAhead   ... commentControls={commentControls} />
```

### `MarkersSummary.jsx`

- `useState(null)` tracking `hoveredKey` (e.g. `"Leadership"`)
- `useState(null)` tracking `openDialogKey`
- Each `categoryRow` div: `position: relative`, `onMouseEnter`/`onMouseLeave` updating `hoveredKey`
- When `hoveredKey === cat`: render `CommentButton` (top-right, absolute)
- When `openDialogKey === cat`: render `CommentDialog` below the row
- When `getComment("marker:" + cat)` is non-null: render `CommentCallout` below the summary paragraph

### `FacetsSummary.jsx`

Same pattern as `MarkersSummary`, applied per `facetRow` `<li>`. Key: `"facet:" + facet.id`.

### `LookingAhead.jsx`

- Entire card is the hover target (`hoveredKey` is just a boolean here)
- Single key `"lookingAhead"`
- `CommentButton` appears on card hover; `CommentCallout` renders after the paragraphs if comment exists

---

## Styling

- All new components get their own CSS module
- `CommentButton`: absolute-positioned, opacity transition on parent hover
- `CommentDialog`: `position: absolute` or inline block, subtle box-shadow, `z-index` above card content
- `CommentCallout`: `margin-top: 8px`, light-coloured background (matches existing token colours from `global.css`), 3px left border in accent colour, `font-size` slightly smaller than body

---

## Verification

1. Run `npm run dev` from `app/`
2. Load a session, navigate to Overview
3. Hover a category row → speech bubble icon appears top-right
4. Click icon → dialog opens; type a comment, click Save
5. Comment callout appears below the row with text and timestamp
6. Click Edit → dialog re-opens pre-populated; change text, Save → callout updates
7. Click Delete → callout disappears
8. Repeat steps 3–7 for a facet row and the Looking Ahead section
9. Refresh the page → comments persist (localStorage survives page refresh; clearing browser storage removes them)
10. Switch sessions and back → each session has independent comments
11. Run `npm test` — existing tests should continue to pass (no parser/hook changes that affect them)
