import styles from './CommentCallout.module.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export default function CommentCallout({ text, createdAt, onEdit, onDelete }) {
  return (
    <div className={styles.callout}>
      <div className={styles.header}>
        <span className={styles.label}>Comment</span>
        <span className={styles.date}>{formatDate(createdAt)}</span>
      </div>
      <p className={styles.text}>{text}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.actionBtn} onClick={onEdit}>Edit</button>
        <button type="button" className={styles.actionBtn} onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
