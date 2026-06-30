import { useSessionData } from '../../hooks/useSessionData.js'
import { computeAverage, formatAverageLabel, formatRatingLabel } from '../../utils/ratingUtils.js'
import { stripBlockquote } from '../../utils/markdownUtils.js'
import RatingBadge from '../../components/RatingBadge.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import styles from './FacetsDetail.module.css'

export default function FacetsDetail({ session }) {
  const { data, error, loading } = useSessionData(session.sessionId, session.playerName)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState message={error} />

  const { facets, scoreSummary, caveats } = data.facetsReport
  const avg = computeAverage(facets.map(f => f.rating))

  return (
    <main className={`container ${styles.root}`}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Complexity Facets</h1>
        <span className={styles.overallAvg}>{formatAverageLabel(avg)}</span>
      </div>

      {facets.map(facet => (
        <article key={facet.id} className={`card ${styles.facetCard}`}>
          <div className={styles.facetHeader}>
            <div>
              <span className={styles.facetId}>{facet.id}</span>
              <h2 className={styles.facetName}>{facet.name}</h2>
            </div>
            <div className={styles.facetRating}>
              <RatingBadge rating={facet.rating} />
              <span className={styles.ratingLabel}>{formatRatingLabel(facet.rating)}</span>
            </div>
          </div>
          <div className={styles.facetBody}>
            <div className={styles.fieldLabel}>Evidence</div>
            <blockquote className={styles.evidence}>{stripBlockquote(facet.evidence)}</blockquote>
            <div className={styles.fieldLabel}>Rationale</div>
            <div className={styles.rationale}>
              {facet.rationale.split(/\n\n+/).map((p, i) => <p key={i}>{p.trim()}</p>)}
            </div>
          </div>
        </article>
      ))}

      {scoreSummary && (
        <section className={`card ${styles.summarySection}`}>
          <h2 className={styles.summaryHeading}>Score Summary</h2>
          <pre className={styles.summaryTable}>{scoreSummary}</pre>
        </section>
      )}

      {caveats && (
        <section className={`card ${styles.caveatsSection}`}>
          <h2 className={styles.summaryHeading}>Caveats</h2>
          <div className={styles.caveatsBody}>
            {caveats.split('\n').filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </section>
      )}
    </main>
  )
}
