import styles from './ReportOverview.module.css'

const fmtTime = d => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

export default function Timeline({ sessionStates }) {
  return (
    <section className={`card ${styles.timelineCard}`}>
      <h2 className={styles.sectionHeading}>Timeline</h2>
      <ol className={styles.timeline}>
        {sessionStates.map((entry, i) => (
          <li
            key={i}
            className={`${styles.timelineItem} ${i === sessionStates.length - 1 ? styles.timelineLast : ''}`}
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
