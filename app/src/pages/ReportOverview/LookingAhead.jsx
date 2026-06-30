import styles from './ReportOverview.module.css'

export default function LookingAhead({ text }) {
  return (
    <section className={`card ${styles.lookingAheadCard}`}>
      <h2 className={styles.sectionHeading}>Looking Ahead</h2>
      <div className={styles.lookingAheadBody}>
        {text.split(/\n\n+/).map((p, i) => <p key={i}>{p.trim()}</p>)}
      </div>
    </section>
  )
}
