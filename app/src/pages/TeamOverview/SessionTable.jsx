import useSessionSummaries from '../../hooks/useSessionSummaries.js'
import styles from './SessionTable.module.css'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function fmtDate(iso) {
  const d = new Date(iso)
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

function fmtRuntime(seconds, completed) {
  if (!completed) return 'Not ended'
  if (seconds == null) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${String(s).padStart(2, '0')}s`
}

function fmtAvg(val, loading) {
  if (loading) return '…'
  if (val == null) return '—'
  return val.toFixed(1)
}

function toTitleCase(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

export default function SessionTable({ sessions, onSelectSession }) {
  const { summaries, loading } = useSessionSummaries(sessions)

  const sorted = [...sessions].sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(a.date) - new Date(b.date)
  })

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Player</th>
            <th className={styles.th}>Resolution time</th>
            <th className={`${styles.th} ${styles.numCol}`}>Markers avg</th>
            <th className={`${styles.th} ${styles.numCol}`}>Facets avg</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(session => {
            const summary = summaries[session.sessionId]
            return (
              <tr
                key={`${session.sessionId}-${session.playerName}`}
                className={styles.row}
                onClick={() => onSelectSession(session)}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSelectSession(session)}
              >
                <td className={styles.td}>{session.date ? fmtDate(session.date) : '—'}</td>
                <td className={styles.td}>{toTitleCase(session.playerName)}</td>
                <td className={`${styles.td} ${!session.completed ? styles.notEnded : ''}`}>
                  {fmtRuntime(session.runtimeSeconds, session.completed)}
                </td>
                <td className={`${styles.td} ${styles.numCol}`}>
                  {fmtAvg(summary?.markersAvg, loading)}
                </td>
                <td className={`${styles.td} ${styles.numCol}`}>
                  {fmtAvg(summary?.facetsAvg, loading)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
