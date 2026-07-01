import styles from './ReportOverview.module.css'

const fmtTime = d => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

const MIN_PB = 12
const TOTAL_PX = 480

function computePaddings(sessionStates) {
  const n = sessionStates.length
  if (n <= 1) return sessionStates.map(() => 0)
  const totalMs = sessionStates[n - 1].timestamp - sessionStates[0].timestamp
  return sessionStates.map((entry, i) => {
    if (i === n - 1) return 0
    const gapMs = sessionStates[i + 1].timestamp - entry.timestamp
    return totalMs > 0 ? Math.max(MIN_PB, Math.round((gapMs / totalMs) * TOTAL_PX)) : MIN_PB
  })
}

export default function Timeline({ sessionStates }) {
  const paddings = computePaddings(sessionStates)
  return (
    <section className={`card ${styles.timelineCard}`}>
      <h2 className={styles.sectionHeading}>Timeline</h2>
      <ol className={styles.timeline}>
        {sessionStates.map((entry, i) => (
          <li
            key={i}
            className={`${styles.timelineItem} ${i === sessionStates.length - 1 ? styles.timelineLast : ''}`}
            style={{ paddingBottom: paddings[i] }}
          >
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <span className={styles.timelineLabel}>{entry.state.replace(/_/g, ' ')}</span>
              <span className={styles.timelineTs}>{fmtTime(entry.timestamp)}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
