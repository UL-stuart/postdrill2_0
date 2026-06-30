import styles from './TranscriptDetail.module.css'

const fmtTime = d => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

export default function TranscriptTable({ rows, highlightedIndex }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thTime}>Time</th>
            <th className={styles.thSpeaker}>Speaker</th>
            <th className={styles.thChannel}>Channel</th>
            <th className={styles.thMessage}>Message</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              id={`tx-row-${i}`}
              className={[
                styles.row,
                row.player === 'PLAYER' ? styles.playerRow : '',
                i === highlightedIndex ? styles.highlightedRow : '',
              ].filter(Boolean).join(' ')}
            >
              <td className={styles.tdTime}>{fmtTime(row.datetime)}</td>
              <td className={styles.tdSpeaker}>{row.player}</td>
              <td className={styles.tdChannel}>{row.channel}</td>
              <td className={styles.tdMessage}>{row.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
