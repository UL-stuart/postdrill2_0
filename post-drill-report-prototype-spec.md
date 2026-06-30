# Uptime Labs Post-Drill Report Prototype Specification

## Purpose

Create a polished local JavaScript prototype for a new Uptime Labs post-drill report format.

The prototype is primarily for the Uptime Labs product development team to test which report formats and content structures work. Eventually, the report will be player-facing and should help Uptime Labs players reflect on their performance after a drill.

The report should be both evaluative and reflective, with the emphasis on reflection. Ratings and evidence should support learning, not dominate the experience.

## Prototype Scope

- Drill: Snipe Hunt only.
- Data source: local files already present in this repository.
- Runtime: a locally runnable JavaScript application.
- Sessions: automatically support every local drill session available under `readouts/`.
- Design reference: `design/report_design.png` may be used as a rough visual reference for colour, spacing, and general layout feel only. Do not infer report sections, categories, or information architecture from the image. The report structure must come from this specification.

## Local Data Sources

The application must read the following local data:

- `readouts/{session_id}/{session_id}-final-report.md`
- `readouts/{session_id}/{session_id}-markers.md`
- `readouts/{session_id}/{session_id}-facets.md`
- `readouts/{session_id}/{session_id}-combined.md`
- `facets_and_markers/markers-catalog.md`
- `facets_and_markers/facets-catalog.md`
- `session_states/session_states.csv`
- `transcripts/*.csv`

Each transcript filename contains a player identifier and session id, for example:

- `barry-9423.csv`
- `eamonn.boyle-9462.csv`

Match transcripts to readouts by extracting the session id from the filename.

## Failure Policy

Fail loudly when data is missing, malformed, duplicated ambiguously, or inconsistent.

Examples:

- A readout folder is missing one of the expected files.
- No transcript can be matched to a session id.
- Multiple transcripts match the same session id.
- No session states exist for a session id.
- A marker or facet block cannot be parsed.
- A rating is outside the supported scale.
- A marker id cannot be mapped to a category from the marker catalog.

The UI should show an obvious error state naming the affected session and file.

## Rating Scale

Use the following scale everywhere ratings appear:

| Source Value | Label | Meaning |
| --- | --- | --- |
| `1` | Not evident | Participant shows no engagement with the marker or facet. For facets, this means the complexity surfaced but the participant did not engage with it. |
| `2` | Practicing | Engaged but inconsistent; partial, late, or only after strong NPC nudging. |
| `3` | Strengthening | Engaged systematically on evidence; meets novice expectation. |
| `4` | Fluent | Actively leveraged evidence; triangulated across sources; notably above novice baseline. |
| `N/A` | Not observed | The marker or facet did not manifest in this run, for example because the participant ran out of time before the trigger fired. |

Important distinction:

- `1` means the behaviour or complexity surfaced and the participant did not engage.
- `N/A` means the drill never surfaced that item for this participant.

When calculating averages, exclude `N/A`.

## Report Structure

### Session Picker

The app must provide a way to select any local session discovered under `readouts/`.

For each session, show at minimum:

- Session id.
- Player identifier inferred from transcript filename.
- Drill name: `Snipe Hunt`.

### Report Overview

The front page of each report must include:

- Drill name: `Snipe Hunt`.
- Player identifier.
- Session id.
- Date and time started.
- Date and time completed.
- Overall run time in minutes and seconds.
- End state.
- Drill description.

For this prototype, the drill description should be placeholder lorem ipsum copy. Do not attempt to infer or generate the drill description from the readout files.

#### Time and End-State Derivation

- Start time: timestamp of the first `PLAYER` message in the matched transcript CSV.
- Completion time: timestamp of the last `PLAYER` message in the matched transcript CSV.
- Runtime: difference between start time and completion time, displayed as minutes and seconds.
- End state: the final state for that session id in `session_states/session_states.csv`, ordered by timestamp.

### Looking Ahead

Surface the `## Looking Ahead` section from `{session_id}-final-report.md` verbatim.

Do not rewrite, summarize, or embellish this text.

### Behavioural Markers Summary

Behavioural markers are grouped into four categories:

- Leadership
- Mindset
- Communication
- Coordination

Use `facets_and_markers/markers-catalog.md` to map marker ids to categories. For example, `L*` markers are Leadership, `M*` markers are Mindset, `K*` markers are Communication, and `C*` markers are Coordination.

Only show assessed markers from `{session_id}-markers.md`. Do not show unassessed markers anywhere.

For each category represented in the assessed marker set:

- Display category name.
- Display average score for assessed markers in that category, excluding `N/A`.
- Display the mapped rating label for the average.
- Display synthesized summary text derived mechanically from the assessed marker rationales in that category.
- Provide a clear way to navigate to the full marker detail page.

Categories with only one assessed marker should still show an average. The average will be the same as that single marker score.

If a category has no assessed markers for a session, omit it.

#### Average Labeling

For non-integer averages, display the numeric average to two decimal places and describe the range without collapsing it to a single whole-number rating.

Example:

- `2.50` should display as `2.50 / between Practicing and Strengthening`.
- `3.25` should display as `3.25 / between Strengthening and Fluent`.

Avoid implying precision that the rubric does not support.

### Behavioural Markers Detail Page

The detailed marker page must expose the full detail from `{session_id}-markers.md`.

For each assessed marker:

- Marker id and name.
- Category.
- Rating value and label.
- Evidence.
- Rationale.

Preserve evidence quotes from the source file. Do not rewrite evidence.

Also include the score summary and caveats from the source file if present.

### Complexity Facets Summary

The front page must contain a summary list of every assessed complexity facet from `{session_id}-facets.md`.

For each facet, display:

- Facet id.
- Facet name.
- Brief description.
- Brief description of the player's performance against this facet.
- Rating value and label.

Facet names, ratings, evidence, and rationales come from `{session_id}-facets.md`.

For the prototype, brief facet descriptions may be derived from the facet heading and/or a local mapping for Snipe Hunt facets. Do not attempt broad semantic mapping from the full `facets-catalog.md` unless it is reliable and explicit.

### Complexity Facets Detail Page

The detailed facet page must expose the full detail from `{session_id}-facets.md`.

For each assessed facet:

- Facet id and name.
- Rating value and label.
- Evidence.
- Rationale.

Preserve evidence quotes from the source file. Do not rewrite evidence.

Also include the score summary and caveats from the source file if present.

### Timeline

The report must include a timeline based on `session_states/session_states.csv`.

For the selected session:

- Filter rows by session id.
- Sort by timestamp ascending.
- Display each state transition in order.
- Use the raw `state` value as the milestone label for this prototype.
- Include the timestamp for each state.

Do not attempt to align timeline events with behavioural markers.

### Transcript Visualization

The report must include a transcript visualization using the `event-drops` framework:

- Library: `marmelab/eventdrops`.
- Each utterance in the transcript should appear as a colored blob.
- The visualization should help users understand overall patterns of interaction during the drill.
- Uptime Labs system messages must be included.
- Swimlanes must be grouped by both speaker and channel.

Swimlane identity:

```text
{player} / {channel}
```

This means that if the same individual communicates in more than one channel, they should appear in more than one swimlane.

The transcript CSV columns are:

- `datetime`
- `player`
- `channel`
- `message`

Use `PLAYER` as the player participant. Other `player` values are drill characters, NPCs, or system actors.

#### Transcript Subpage

Create a dedicated transcript page or subpage that contains:

- The full event-drops visualization.
- The full transcript below it.

The transcript table/list below the visualization must show:

- Timestamp.
- Speaker.
- Channel.
- Message.

It should be possible to visually connect the event-drops blobs to the detailed transcript, for example by click/hover highlighting, tooltip, or shared row focus.

## Parsing Requirements

### Markdown Readout Parsing

Parse marker and facet Markdown using the existing structure:

```markdown
## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> ...

**Rationale:**
...
```

Expected block fields:

- Heading with id and title.
- Rating.
- Evidence.
- Rationale.

Also preserve:

- `## Score Summary`
- `## Caveats`

The parser should be robust to:

- Numeric ratings.
- `N/A` ratings.
- Markdown blockquotes in evidence.
- Multi-paragraph rationales.

### Looking Ahead Parsing

Extract from `{session_id}-final-report.md`:

- Start at `## Looking Ahead`.
- Include all content until the next heading of the same or higher level, or end of file.
- Display verbatim.

### CSV Parsing

Use a real CSV parser. Do not parse CSV files with line splitting.

This matters because transcript messages may contain commas, quotes, links, or multi-line text.

## UI Priorities

The most important outcome is a polished UI that product stakeholders can react to.

The prototype should feel like a real report experience, not a raw data viewer.

Prioritize:

- Clear hierarchy.
- Reflection-first framing.
- Ratings that are visible but not overpowering.
- Strong session overview.
- Easy navigation from summaries to detail pages.
- Readable evidence and rationale.
- A useful transcript interaction visualization.
- Consistent styling across all sessions.

Do not include reflection capture or saving in the first version.

## Suggested Navigation

The app should include these main views:

- Report overview.
- Behavioural markers detail.
- Complexity facets detail.
- Transcript detail.

The overview should link clearly to the detail views.

## Sensible Implementation Stages

This is a large prototype specification. Implement it in stages so that each stage creates a coherent, reviewable product increment rather than a half-built version of every feature.

The suggested order below prioritizes visible product learning first, then data breadth.

### Stage 1: Single-Session Report Shell

Build the application around one known-good session first, for example `9423`.

Goals:

- Establish the local JavaScript app structure.
- Load one session's local files.
- Render a polished report shell with the intended visual hierarchy.
- Show basic session metadata:
  - Drill name.
  - Player identifier.
  - Session id.
  - Start time.
  - Completion time.
  - Runtime.
  - End state.
  - Placeholder drill description.
- Show the verbatim `Looking Ahead` section.

Why this stage matters:

- It lets the product team react to the basic report shape before the parser and visualization work becomes complex.
- It proves the local data-loading approach.
- It creates a polished vertical slice with real report content.

Done when:

- One hardcoded session renders cleanly.
- The page already feels like a report, not a parser demo.
- Missing data for the hardcoded session fails loudly.

### Stage 2: Behavioural Markers

Add behavioural marker parsing and presentation for the same single session.

Goals:

- Parse `{session_id}-markers.md`.
- Map assessed markers to Leadership, Mindset, Communication, and Coordination.
- Exclude unassessed markers entirely.
- Render category summaries on the report overview.
- Render the full marker detail page.
- Apply the specified rating labels and `N/A` handling.

Why this stage matters:

- Behavioural markers are a central part of the report's coaching value.
- Category summaries are likely to shape how users perceive their performance, so they deserve focused review.

Done when:

- Category averages are correct.
- Single-marker categories still display correctly.
- Marker detail preserves evidence and rationale from the source file.
- No unassessed catalog markers appear.

### Stage 3: Complexity Facets

Add complexity facet parsing and presentation for the same single session.

Goals:

- Parse `{session_id}-facets.md`.
- Render facet summaries on the overview.
- Render the full facet detail page.
- Show facet id, name, brief description, player performance summary, and rating.
- Apply the specified rating labels and `N/A` handling.

Why this stage matters:

- Facets explain the designed complexity of the drill and how the participant handled it.
- They are conceptually different from behavioural markers, so the UI should make that difference legible.

Done when:

- Every assessed facet for the selected session appears in summary and detail.
- Evidence and rationale are preserved.
- The distinction between marker categories and drill-specific complexity facets is visually clear.

### Stage 4: Timeline

Add the session-state timeline for the same single session.

Goals:

- Parse `session_states/session_states.csv` with a real CSV parser.
- Filter by session id.
- Sort by timestamp.
- Render all raw state names in order.
- Use the final state as the report end state.

Why this stage matters:

- Timeline gives the report temporal structure without requiring transcript visualization yet.
- It helps product reviewers see whether raw state names are good enough for a prototype or need friendlier labels later.

Done when:

- Timeline order matches the CSV timestamps.
- Raw states are displayed exactly as stored.
- The report end state comes from the last state transition.

### Stage 5: Transcript Detail Without Event-Drops

Before adding event-drops, add the transcript detail page as readable structured content.

Goals:

- Parse the matched transcript CSV with a real CSV parser.
- Render the full transcript in timestamp order.
- Include timestamp, speaker, channel, and message.
- Include Uptime Labs system messages.
- Group or visually distinguish speaker/channel combinations.

Why this stage matters:

- It validates transcript parsing before adding visualization complexity.
- It gives product reviewers immediate access to the raw interaction record.
- It creates a fallback if event-drops integration takes longer than expected.

Done when:

- The full transcript is readable.
- Multi-line messages render correctly.
- Messages with commas, quotes, links, or Markdown-like text are preserved.

### Stage 6: Transcript Event-Drops Visualization

Add the event-drops visualization after the transcript data model is stable.

Goals:

- Use `marmelab/eventdrops`.
- Render each utterance as a colored blob.
- Use one swimlane per `{player} / {channel}` combination.
- Include `PLAYER`, NPCs, and Uptime Labs system messages.
- Add hover or click affordances connecting blobs to transcript rows.

Why this stage matters:

- Event-drops is the most specialized UI dependency.
- Implementing it after the transcript table reduces risk and makes visual QA easier.

Done when:

- Every transcript utterance appears in the visualization.
- Swimlanes split correctly when one speaker uses multiple channels.
- A user can inspect what an individual blob represents.
- The visualization communicates interaction patterns without replacing the full transcript.

### Stage 7: Multi-Session Discovery And Selection

Add automatic support for every local session only after the single-session report is working end to end.

Goals:

- Discover session ids from `readouts/`.
- Match readout folders to transcript files by session id.
- Match session-state rows by session id.
- Add a session picker.
- Preserve loud failure behavior for missing or inconsistent sessions.

Why this stage matters:

- Multi-session support multiplies edge cases.
- Waiting until the single-session report is solid keeps debugging focused.

Done when:

- Every valid local session can be selected and rendered.
- Invalid or incomplete sessions produce clear actionable errors.
- The UI remains polished when switching between sessions with different scores, transcript lengths, or missing `N/A` values.

### Stage 8: Polish, Responsiveness, And Product Review Pass

Use the final stage to improve the report as a product artifact rather than adding new data features.

Goals:

- Tighten spacing, typography, color, and hierarchy.
- Check desktop and mobile layouts.
- Ensure long evidence quotes and transcript messages do not break layout.
- Make rating labels consistent across summary and detail.
- Improve empty, loading, and error states.
- Review whether any section feels too evaluative for a reflection-first report.

Why this stage matters:

- The prototype's main purpose is to help the product team judge format and content.
- A polished, coherent report will produce better feedback than a feature-complete but rough interface.

Done when:

- The app feels ready for internal product critique.
- The report remains readable across sessions and viewport sizes.
- Known limitations are documented for the next prototype iteration.

### Recommended Stage Boundaries

Prefer separate commits or pull requests for each stage.

Do not start by implementing all parsers, all pages, and all sessions at once. The recommended build path is:

1. One-session overview.
2. Markers.
3. Facets.
4. Timeline.
5. Transcript table.
6. Event-drops visualization.
7. Multi-session picker.
8. Polish and review.

If time is limited, stop after any completed stage and leave the prototype in a coherent state.

## Implementation Guidance

Use a modern local JavaScript stack suitable for a polished prototype, for example:

- Vite.
- React.
- TypeScript if convenient.
- `event-drops` for transcript visualization.
- A Markdown parser for report parsing.
- A CSV parser for transcript and session-state parsing.

The exact stack is less important than producing a clean, locally runnable, polished prototype.

## Data Model

The app should normalize local files into an internal session model similar to:

```ts
type RatingValue = 1 | 2 | 3 | 4 | "N/A";

type SessionReport = {
  sessionId: string;
  playerId: string;
  drillName: "Snipe Hunt";
  startTime: string;
  completionTime: string;
  runtimeSeconds: number;
  endState: string;
  drillDescription: string;
  lookingAhead: string;
  markerCategories: MarkerCategorySummary[];
  markers: MarkerAssessment[];
  facets: FacetAssessment[];
  timeline: SessionState[];
  transcript: TranscriptEvent[];
};
```

## Acceptance Criteria

The prototype is complete when:

- It runs locally as a JavaScript application.
- It automatically discovers all local sessions under `readouts/`.
- Each session can be selected and rendered.
- Missing or inconsistent data produces a clear loud failure.
- The report overview shows drill/session metadata, end state, runtime, placeholder drill description, looking-ahead text, marker category summaries, facet summaries, timeline, and transcript visualization.
- The marker detail page shows all assessed marker detail and no unassessed markers.
- The facet detail page shows all assessed facet detail.
- The transcript detail page shows event-drops plus the full transcript.
- Ratings use the specified labels and definitions.
- `N/A` is handled distinctly from `1`.
- `design/report_design.png` is used only as rough visual inspiration, not as a source of report sections.

## Open Product Questions For Later

These should not block the prototype:

- Should player-facing reports hide numeric ratings entirely?
- Should the report include player-entered reflections?
- Should timeline states eventually be mapped to human-readable labels?
- Should timeline states eventually align with specific evidence moments?
- Should report wording adapt based on player skill level or customer context?
- Should the transcript visualization highlight player activity separately from NPC/system activity?
- Should final reports support export to PDF or sharing?
