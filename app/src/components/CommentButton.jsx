import styles from './CommentButton.module.css'

export default function CommentButton({ onClick, hasComment }) {
  return (
    <button
      className={`${styles.button} ${hasComment ? styles.active : ''}`}
      onClick={onClick}
      title={hasComment ? 'Edit comment' : 'Add comment'}
      aria-label={hasComment ? 'Edit comment' : 'Add comment'}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M2 2h12v9H8.5L6 13.5V11H2V2z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="8" y1="5.5" x2="8" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="6.25" y1="7.25" x2="9.75" y2="7.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </button>
  )
}
