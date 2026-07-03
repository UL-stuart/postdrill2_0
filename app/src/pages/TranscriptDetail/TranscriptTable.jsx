import { useState } from 'react'
import CommentButton from '../../components/CommentButton.jsx'
import CommentDialog from '../../components/CommentDialog.jsx'
import CommentCallout from '../../components/CommentCallout.jsx'
import styles from './TranscriptDetail.module.css'

const fmtTime = d => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

export default function TranscriptTable({ rows, highlightedIndex, commentControls }) {
  const [hoveredKey, setHoveredKey] = useState(null)
  const [openDialogKey, setOpenDialogKey] = useState(null)
  const { getComment, setComment, deleteComment } = commentControls

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thTime}>Time</th>
            <th className={styles.thSpeaker}>Speaker</th>
            <th className={styles.thChannel}>Channel</th>
            <th className={styles.thMessage}>Message</th>
            <th className={styles.thComment}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const key = 'tx:' + i
            const comment = getComment(key)
            return (
              <>
                <tr
                  key={i}
                  id={`tx-row-${i}`}
                  className={[
                    styles.row,
                    row.player === 'PLAYER' ? styles.playerRow : '',
                    i === highlightedIndex ? styles.highlightedRow : '',
                  ].filter(Boolean).join(' ')}
                  onMouseEnter={() => setHoveredKey(i)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  <td className={styles.tdTime}>{fmtTime(row.datetime)}</td>
                  <td className={styles.tdSpeaker}>{row.player}</td>
                  <td className={styles.tdChannel}>{row.channel}</td>
                  <td className={styles.tdMessage}>{row.message}</td>
                  <td className={styles.tdComment} style={{ position: 'relative' }}>
                    {(hoveredKey === i || comment) && (
                      <CommentButton
                        onClick={() => setOpenDialogKey(i)}
                        hasComment={!!comment}
                      />
                    )}
                  </td>
                </tr>
                {openDialogKey === i && (
                  <tr key={`${i}-dialog`} className={styles.commentRow}>
                    <td colSpan={5}>
                      <CommentDialog
                        initialText={comment?.text ?? ''}
                        onSave={text => { setComment(key, text); setOpenDialogKey(null) }}
                        onCancel={() => setOpenDialogKey(null)}
                      />
                    </td>
                  </tr>
                )}
                {comment && openDialogKey !== i && (
                  <tr key={`${i}-callout`} className={styles.commentRow}>
                    <td colSpan={5}>
                      <CommentCallout
                        text={comment.text}
                        createdAt={comment.createdAt}
                        onEdit={() => setOpenDialogKey(i)}
                        onDelete={() => deleteComment(key)}
                      />
                    </td>
                  </tr>
                )}
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
