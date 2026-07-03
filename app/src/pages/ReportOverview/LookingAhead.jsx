import { useState } from 'react'
import styles from './ReportOverview.module.css'
import CommentButton from '../../components/CommentButton.jsx'
import CommentDialog from '../../components/CommentDialog.jsx'
import CommentCallout from '../../components/CommentCallout.jsx'

const COMMENT_KEY = 'lookingAhead'

export default function LookingAhead({ text, commentControls }) {
  const [hovered, setHovered] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { getComment, setComment, deleteComment } = commentControls
  const comment = getComment(COMMENT_KEY)

  function handleSave(savedText) {
    setComment(COMMENT_KEY, savedText)
    setDialogOpen(false)
  }

  return (
    <section
      className={`card ${styles.lookingAheadCard}`}
      style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className={styles.sectionHeading}>Looking Ahead</h2>
      {(hovered || comment) && (
        <CommentButton
          onClick={() => setDialogOpen(true)}
          hasComment={!!comment}
        />
      )}
      <div className={styles.lookingAheadBody}>
        {text.split(/\n\n+/).map((p, i) => <p key={i}>{p.trim()}</p>)}
      </div>
      {dialogOpen && (
        <CommentDialog
          initialText={comment?.text ?? ''}
          onSave={handleSave}
          onCancel={() => setDialogOpen(false)}
        />
      )}
      {comment && !dialogOpen && (
        <CommentCallout
          text={comment.text}
          createdAt={comment.createdAt}
          onEdit={() => setDialogOpen(true)}
          onDelete={() => deleteComment(COMMENT_KEY)}
        />
      )}
    </section>
  )
}
