import { useState } from 'react'
import { useSessionData } from '../../hooks/useSessionData.js'
import useAllComments from '../../hooks/useAllComments.js'
import useComments from '../../hooks/useComments.js'
import { groupCommentsByArea } from '../../utils/commentsStorage.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import styles from './Reflections.module.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function truncate(str, max) {
  if (!str) return ''
  return str.length > max ? str.slice(0, max).trimEnd() + '…' : str
}

function CommentEntry({ label, text, createdAt }) {
  return (
    <div className={styles.entry}>
      {label && <span className={styles.entryLabel}>{label}</span>}
      <p className={styles.entryText}>{text}</p>
      <span className={styles.entryDate}>{formatDate(createdAt)}</span>
    </div>
  )
}

function Section({ title, children, isEmpty }) {
  const [open, setOpen] = useState(true)
  return (
    <section className={`card ${styles.section}`}>
      <button
        type="button"
        className={styles.sectionToggle}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={styles.sectionTitle}>{title}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>›</span>
      </button>
      {open && (
        <div className={styles.sectionBody}>
          {isEmpty
            ? <p className={styles.empty}>No comments yet</p>
            : children
          }
        </div>
      )}
    </section>
  )
}

export default function Reflections({ session }) {
  const { data, error, loading } = useSessionData(session.sessionId, session.playerName)
  const allComments = useAllComments(session.sessionId)
  const { getComment, setComment } = useComments(session.sessionId)

  const [freeformDraft, setFreeformDraft] = useState(() => getComment('reflections:freeform')?.text ?? '')
  const [saved, setSaved] = useState(false)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState message={error} />

  const grouped = groupCommentsByArea(allComments)
  const transcript = data?.transcript ?? []

  function transcriptLabel(index) {
    const row = transcript[index]
    if (!row) return `Transcript row ${index}`
    return `${row.player}: "${truncate(row.message, 80)}"`
  }

  function handleSave() {
    setComment('reflections:freeform', freeformDraft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <main className={`container ${styles.root}`}>
      <h1 className={styles.pageTitle}>Reflections</h1>

      <Section title="Marker Categories" isEmpty={grouped.markerCategories.length === 0}>
        {grouped.markerCategories.map(c => (
          <CommentEntry
            key={c.key}
            label={c.key.slice('marker:'.length)}
            text={c.text}
            createdAt={c.createdAt}
          />
        ))}
      </Section>

      <Section title="Individual Markers" isEmpty={grouped.individualMarkers.length === 0}>
        {grouped.individualMarkers.map(m => (
          <CommentEntry
            key={m.key}
            label={m.key.slice('marker:'.length)}
            text={m.text}
            createdAt={m.createdAt}
          />
        ))}
      </Section>

      <Section title="Facets" isEmpty={grouped.facets.length === 0}>
        {grouped.facets.map(f => (
          <CommentEntry
            key={f.key}
            label={f.key.slice('facet:'.length)}
            text={f.text}
            createdAt={f.createdAt}
          />
        ))}
      </Section>

      <Section title="Looking Ahead" isEmpty={!grouped.lookingAhead}>
        {grouped.lookingAhead && (
          <CommentEntry
            label={null}
            text={grouped.lookingAhead.text}
            createdAt={grouped.lookingAhead.createdAt}
          />
        )}
      </Section>

      <Section title="Transcript" isEmpty={grouped.transcript.length === 0}>
        {grouped.transcript.map(t => (
          <CommentEntry
            key={t.key}
            label={transcriptLabel(t.index)}
            text={t.text}
            createdAt={t.createdAt}
          />
        ))}
      </Section>

      <section className={`card ${styles.freeformSection}`}>
        <h2 className={styles.freeformTitle}>Further Reflections</h2>
        <textarea
          className={styles.freeformTextarea}
          value={freeformDraft}
          onChange={e => { setFreeformDraft(e.target.value); setSaved(false) }}
          placeholder="Add any additional thoughts or reflections…"
          rows={6}
        />
        <div className={styles.freeformActions}>
          <button type="button" className={styles.saveBtn} onClick={handleSave}>Save</button>
          {saved && <span className={styles.savedIndicator}>Saved</span>}
        </div>
      </section>
    </main>
  )
}
