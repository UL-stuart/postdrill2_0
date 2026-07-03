import styles from './Nav.module.css'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'markers', label: 'Markers' },
  { id: 'facets', label: 'Facets' },
  { id: 'transcript', label: 'Transcript' },
  { id: 'reflections', label: 'Reflections' },
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
