import { useEffect, useState } from 'react'
import { useSessionData } from '../../hooks/useSessionData.js'
import useComments from '../../hooks/useComments.js'
import { groupMarkersByCategory, CATEGORY_ORDER } from '../../utils/markerUtils.js'
import { computeAverage, formatAverageLabel } from '../../utils/ratingUtils.js'
import { stripBlockquote } from '../../utils/markdownUtils.js'
import { parseMarkersCatalog } from '../../parsers/parseMarkersCatalog.js'
import RatingBadge from '../../components/RatingBadge.jsx'
import RatingBarChart from '../../components/RatingBarChart.jsx'
import CommentButton from '../../components/CommentButton.jsx'
import CommentDialog from '../../components/CommentDialog.jsx'
import CommentCallout from '../../components/CommentCallout.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import styles from './MarkersDetail.module.css'

export default function MarkersDetail({ session }) {
  const { data, error, loading } = useSessionData(session.sessionId, session.playerName)
  const [markerDescs, setMarkerDescs] = useState(null)
  const { getComment, setComment, deleteComment } = useComments(session.sessionId)
  const [hoveredKey, setHoveredKey] = useState(null)
  const [openDialogKey, setOpenDialogKey] = useState(null)

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
  const allMarkers = CATEGORY_ORDER.filter(cat => groups[cat]).flatMap(cat => groups[cat])

  return (
    <main className={`container ${styles.root}`}>
      <h1 className={styles.pageTitle}>Behavioural Markers</h1>
      <div className={`card ${styles.chartCard}`}>
        <RatingBarChart
          items={allMarkers.map(m => ({ label: m.name, rating: m.rating }))}
          onItemClick={i => document.getElementById(`marker-${allMarkers[i].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        />
      </div>

      {CATEGORY_ORDER.filter(cat => groups[cat]).map(cat => {
        const catMarkers = groups[cat]
        const avg = computeAverage(catMarkers.map(m => m.rating))
        return (
          <section key={cat} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryName}>{cat}</h2>
              <span className={styles.categoryAvg}>{formatAverageLabel(avg)}</span>
            </div>
            {catMarkers.map(marker => {
              const key = 'marker:' + marker.id
              const comment = getComment(key)
              return (
                <article
                  key={marker.id}
                  id={`marker-${marker.id}`}
                  className={`card ${styles.markerCard}`}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredKey(marker.id)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
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
                  {(hoveredKey === marker.id || comment) && (
                    <CommentButton
                      onClick={() => setOpenDialogKey(marker.id)}
                      hasComment={!!comment}
                    />
                  )}
                  {openDialogKey === marker.id && (
                    <CommentDialog
                      initialText={comment?.text ?? ''}
                      onSave={text => { setComment(key, text); setOpenDialogKey(null) }}
                      onCancel={() => setOpenDialogKey(null)}
                    />
                  )}
                  {comment && openDialogKey !== marker.id && (
                    <CommentCallout
                      text={comment.text}
                      createdAt={comment.createdAt}
                      onEdit={() => setOpenDialogKey(marker.id)}
                      onDelete={() => deleteComment(key)}
                    />
                  )}
                </article>
              )
            })}
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
