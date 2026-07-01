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
          Snipe Hunt is designed to stress your ability to reason through systemic complexity, separating misleading signals from real mechanisms, navigating coordination constraints when key people are unavailable, and synthesising information as it arrives from multiple sources under time pressure.
        </p>
      </div>
    </div>
  )
}
