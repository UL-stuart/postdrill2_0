import { useState } from 'react'
import styles from './CommentDialog.module.css'

export default function CommentDialog({ initialText = '', onSave, onCancel }) {
  const [text, setText] = useState(initialText)

  function handleSave() {
    const trimmed = text.trim()
    if (trimmed) onSave(trimmed)
  }

  return (
    <div className={styles.dialog}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a comment…"
        rows={3}
        autoFocus
      />
      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={onCancel}>Cancel</button>
        <button type="button" className={styles.save} onClick={handleSave} disabled={!text.trim()}>Save</button>
      </div>
    </div>
  )
}
