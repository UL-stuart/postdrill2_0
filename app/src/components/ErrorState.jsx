import styles from './ErrorState.module.css'

export default function ErrorState({ message }) {
  return (
    <div className={styles.root}>
      <div className={styles.icon}>!</div>
      <h2 className={styles.heading}>Data error</h2>
      <p className={styles.message}>{message}</p>
    </div>
  )
}
