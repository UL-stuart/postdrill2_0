import { useState } from 'react'
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

const COLUMNS = [
  { key: 'date',       label: 'Date',            align: 'left' },
  { key: 'player',     label: 'Player',          align: 'left' },
  { key: 'runtime',    label: 'Resolution time', align: 'left' },
  { key: 'markersAvg', label: 'Markers avg',     align: 'right' },
  { key: 'facetsAvg',  label: 'Facets avg',      align: 'right' },
]

function sortValue(session, summary, key) {
  switch (key) {
    case 'date':       return session.date ? new Date(session.date).getTime() : Infinity
    case 'player':     return session.playerName.toLowerCase()
    case 'runtime':    return session.completed ? (session.runtimeSeconds ?? Infinity) : Infinity
    case 'markersAvg': return summary?.markersAvg ?? -Infinity
    case 'facetsAvg':  return summary?.facetsAvg ?? -Infinity
    default:           return 0
  }
}

export default function SessionTable({ sessions, onSelectSession }) {
  const { summaries, loading } = useSessionSummaries(sessions)
  const [sortKey, setSortKey] = useState('date')
  const [sortAsc, setSortAsc] = useState(true)

  function handleHeaderClick(key) {
    if (sortKey === key) setSortAsc(a => !a)
    else { setSortKey(key); setSortAsc(true) }
  }

  const sorted = [...sessions].sort((a, b) => {
    const av = sortValue(a, summaries[a.sessionId], sortKey)
    const bv = sortValue(b, summaries[b.sessionId], sortKey)
    if (av < bv) return sortAsc ? -1 : 1
    if (av > bv) return sortAsc ? 1 : -1
    return 0
  })

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map(col => (
              <th
                key={col.key}
                className={`${styles.th} ${col.align === 'right' ? styles.numCol : ''} ${styles.sortable} ${sortKey === col.key ? styles.sorted : ''}`}
                onClick={() => handleHeaderClick(col.key)}
                aria-sort={sortKey === col.key ? (sortAsc ? 'ascending' : 'descending') : 'none'}
              >
                {col.label}
                <span className={styles.sortIndicator}>
                  {sortKey === col.key ? (sortAsc ? ' ↑' : ' ↓') : ' ↕'}
                </span>
              </th>
            ))}
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
