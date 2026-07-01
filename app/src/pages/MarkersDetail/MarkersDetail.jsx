import { useEffect, useState } from 'react'
import { useSessionData } from '../../hooks/useSessionData.js'
import { groupMarkersByCategory, CATEGORY_ORDER } from '../../utils/markerUtils.js'
import { computeAverage, formatAverageLabel } from '../../utils/ratingUtils.js'
import { stripBlockquote } from '../../utils/markdownUtils.js'
import { parseMarkersCatalog } from '../../parsers/parseMarkersCatalog.js'
import RatingBadge from '../../components/RatingBadge.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import styles from './MarkersDetail.module.css'

export default function MarkersDetail({ session }) {
  const { data, error, loading } = useSessionData(session.sessionId, session.playerName)
  const [markerDescs, setMarkerDescs] = useState(null)

  useEffect(() => { document.title = `${session.playerName} — Post-Drill Report` }, [session.playerName])

  useEffect(() => {
    fetch('/data/facets_and_markers/markers-catalog.md')
      .then(r => r.text())
      .then(text => setMarkerDescs(parseMarkersCatalog(text)))
      .catch(() => {})
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState message={error} />

  const groups = groupMarkersByCategory(data.markersReport.markers)

  return (
    <main className={`container ${styles.root}`}>
      <h1 className={styles.pageTitle}>Behavioural Markers</h1>

      {CATEGORY_ORDER.filter(cat => groups[cat]).map(cat => {
        const catMarkers = groups[cat]
        const avg = computeAverage(catMarkers.map(m => m.rating))
        return (
          <section key={cat} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryName}>{cat}</h2>
              <span className={styles.categoryAvg}>{formatAverageLabel(avg)}</span>
            </div>
            {catMarkers.map(marker => (
              <article key={marker.id} className={`card ${styles.markerCard}`}>
                <div className={styles.markerHeader}>
                  <div className={styles.markerTitleRow}>
                    <h3 className={styles.markerName}>{marker.name}</h3>
                    <RatingBadge rating={marker.rating} showLabel />
                  </div>
                  {markerDescs?.[marker.id] && (
                    <p className={styles.markerDescription}>{markerDescs[marker.id]}</p>
                  )}
                </div>
                <div className={styles.markerBody}>
                  <div className={styles.fieldLabel}>Evidence</div>
                  <blockquote className={styles.evidence}>{stripBlockquote(marker.evidence)}</blockquote>
                  <div className={styles.fieldLabel}>Rationale</div>
                  <div className={styles.rationale}>
                    {marker.rationale.split(/\n\n+/).map((p, i) => <p key={i}>{p.trim()}</p>)}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )
      })}

      {data.markersReport.scoreSummary && (
        <section className={`card ${styles.summarySection}`}>
          <h2 className={styles.summaryHeading}>Score Summary</h2>
          <pre className={styles.summaryTable}>{data.markersReport.scoreSummary}</pre>
        </section>
      )}

      {data.markersReport.caveats && (
        <section className={`card ${styles.caveatsSection}`}>
          <h2 className={styles.summaryHeading}>Caveats</h2>
          <div className={styles.caveatsBody}>
            {data.markersReport.caveats.split('\n').filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </section>
      )}
    </main>
  )
}
