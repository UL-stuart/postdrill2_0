import styles from './ReportOverview.module.css'

const pad = n => String(n).padStart(2, '0')
const fmtDt = d => d.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export default function SessionMeta({ session, meta }) {
  const { startTime, endTime, runtimeMinutes, runtimeSeconds, endState } = meta
  return (
    <div className={`card ${styles.metaCard}`}>
      <dl className={styles.metaGrid}>
        {[
          ['Drill', 'Snipe Hunt'],
          ['Player', session.playerName],
          ['Session', session.sessionId],
          ['Started', fmtDt(startTime)],
          ['Completed', fmtDt(endTime)],
          ['Runtime', `${runtimeMinutes}m ${pad(runtimeSeconds)}s`],
          ['End state', endState.replace(/_/g, ' ')],
        ].map(([label, value]) => (
          <div key={label} className={styles.metaItem}>
            <dt className={styles.metaLabel}>{label}</dt>
            <dd className={styles.metaValue}>{value}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.drillDesc}>
        <h3 className={styles.drillDescLabel}>About this drill</h3>
        <p className={styles.drillDescText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  )
}
