import { useSessionList } from '../../hooks/useSessionList.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import styles from './SessionPicker.module.css'

function toTitleCase(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

export default function SessionPicker({ onSelectSession }) {
  const { sessions, error, loading } = useSessionList()

  if (loading) return <LoadingSpinner label="Loading sessions…" />
  if (error) return <ErrorState message={error} />

  return (
    <div className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Post-Drill Reports</h1>
          <p className={styles.subtitle}>Snipe Hunt · {sessions.length} sessions</p>
        </header>
        <div className={styles.grid}>
          {sessions.map(session => (
            <button
              key={session.sessionId}
              className={styles.card}
              onClick={() => onSelectSession(session)}
            >
              <div className={styles.playerName}>{toTitleCase(session.playerName)}</div>
              <div className={styles.sessionId}>Session {session.sessionId}</div>
              <div className={styles.drillName}>{session.drillName}</div>
              <span className={styles.cta}>View report →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
