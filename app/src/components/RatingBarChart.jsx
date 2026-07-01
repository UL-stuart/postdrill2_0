import styles from './RatingBarChart.module.css'

const RATING_COLORS = { 1: '#fee2e2', 2: '#fef3c7', 3: '#dbeafe', 4: '#d1fae5' }
const AXIS_LABELS = [
  { pct: 25, text: 'Not evident' },
  { pct: 50, text: 'Practicing' },
  { pct: 75, text: 'Strengthening' },
  { pct: 100, text: 'Fluent' },
]

export default function RatingBarChart({ items, onItemClick }) {
  return (
    <div className={styles.chart}>
      <div className={styles.axisRow}>
        <div className={styles.labelSpacer} />
        <div className={styles.axisLabels}>
          {AXIS_LABELS.map(({ pct, text }) => (
            <span key={pct} className={styles.axisLabel} style={{ left: `${pct}%` }}>{text}</span>
          ))}
        </div>
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          className={`${styles.barRow} ${onItemClick ? styles.clickable : ''}`}
          onClick={onItemClick ? () => onItemClick(i) : undefined}
        >
          <div className={styles.barLabel} title={item.label}>{item.label}</div>
          <div className={styles.barTrack}>
            {AXIS_LABELS.map(({ pct }) => (
              <div key={pct} className={styles.gridLine} style={{ left: `${pct}%` }} />
            ))}
            {item.rating !== 'N/A' ? (
              <div
                className={styles.bar}
                style={{ width: `${(item.rating / 4) * 100}%`, background: RATING_COLORS[item.rating] }}
              />
            ) : (
              <span className={styles.naLabel}>N/A</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
