import styles from './ActivityTimeline.module.css'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function fmtShort(d) {
  const date = new Date(d)
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`
}

function pct(date, start, end) {
  const total = end - start
  if (total === 0) return 50
  return Math.min(100, Math.max(0, ((new Date(date) - start) / total) * 100))
}

function monthTicks(start, end) {
  const ticks = []
  const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1))
  while (d <= end) {
    ticks.push({ label: MONTHS[d.getUTCMonth()] + ' ' + d.getUTCFullYear(), pct: pct(d, start, end) })
    d.setUTCMonth(d.getUTCMonth() + 1)
  }
  return ticks
}

export default function ActivityTimeline({ sessions, start, end }) {
  if (!sessions.length) {
    return <p className={styles.empty}>No sessions recorded yet</p>
  }

  const ticks = monthTicks(start, end)

  return (
    <div className={styles.wrapper}>
      {/* Month tick labels */}
      <div className={styles.tickRow}>
        {ticks.map(t => (
          <div key={t.label} className={styles.tick} style={{ left: `${t.pct}%` }}>
            {t.label}
          </div>
        ))}
      </div>

      {/* Track + dots */}
      <div className={styles.track}>
        <div className={styles.line} />
        {sessions.map(s => (
          <div
            key={s.sessionId}
            className={styles.dot}
            style={{ left: `${pct(s.date, start, end)}%` }}
            title={fmtShort(s.date)}
          />
        ))}
      </div>

      {/* Date labels below dots */}
      <div className={styles.labelRow}>
        {sessions.map(s => (
          <div
            key={s.sessionId}
            className={styles.dateLabel}
            style={{ left: `${pct(s.date, start, end)}%` }}
          >
            {fmtShort(s.date)}
          </div>
        ))}
      </div>
    </div>
  )
}
