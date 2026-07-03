import { useEffect, useState } from 'react'
import { useSessionData } from '../../hooks/useSessionData.js'
import useComments from '../../hooks/useComments.js'
import { computeAverage, formatAverageLabel } from '../../utils/ratingUtils.js'
import { stripBlockquote } from '../../utils/markdownUtils.js'
import { parseFacetsCatalog } from '../../parsers/parseFacetsCatalog.js'
import RatingBadge from '../../components/RatingBadge.jsx'
import RatingBarChart from '../../components/RatingBarChart.jsx'
import CommentButton from '../../components/CommentButton.jsx'
import CommentDialog from '../../components/CommentDialog.jsx'
import CommentCallout from '../../components/CommentCallout.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import styles from './FacetsDetail.module.css'

// Fuzzy lookup: strip subtitle, then try exact → catalog-prefix → facet-prefix → first-word match.
// Drill facet names are often abbreviated (e.g. "Decreased access to team") or differently worded
// (e.g. "Misleading correlations") compared to the full PRW catalog labels.
function findFacetDesc(facetName, descs) {
  if (!descs) return null
  const primary = facetName.toLowerCase().split(' / ')[0].trim()
  if (descs[primary]) return descs[primary]
  const catalogKeys = Object.keys(descs)
  const prefixMatch = catalogKeys.find(k => k.startsWith(primary))
  if (prefixMatch) return descs[prefixMatch]
  const reverseMatch = catalogKeys.find(k => primary.startsWith(k))
  if (reverseMatch) return descs[reverseMatch]
  const firstWord = primary.split(/\s+/)[0]
  const wordMatch = catalogKeys.find(k => k === firstWord || k.startsWith(firstWord + ' '))
  if (wordMatch) return descs[wordMatch]
  return null
}

export default function FacetsDetail({ session }) {
  const { data, error, loading } = useSessionData(session.sessionId, session.playerName)
  const [facetDescs, setFacetDescs] = useState(null)
  const { getComment, setComment, deleteComment } = useComments(session.sessionId)
  const [hoveredKey, setHoveredKey] = useState(null)
  const [openDialogKey, setOpenDialogKey] = useState(null)

  useEffect(() => { document.title = `${session.playerName} — Post-Drill Report` }, [session.playerName])

  useEffect(() => {
    fetch('/data/facets_and_markers/facets-catalog.md')
      .then(r => r.text())
      .then(text => setFacetDescs(parseFacetsCatalog(text)))
      .catch(() => {})
  }, [])

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

      <div className={`card ${styles.chartCard}`}>
        <RatingBarChart
          items={facets.map(f => ({ label: f.name, rating: f.rating }))}
          onItemClick={i => document.getElementById(`facet-${facets[i].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        />
      </div>

      {facets.map(facet => {
        const key = 'facet:' + facet.id
        const comment = getComment(key)
        return (
          <article
            key={facet.id}
            id={`facet-${facet.id}`}
            className={`card ${styles.facetCard}`}
            style={{ position: 'relative' }}
            onMouseEnter={() => setHoveredKey(facet.id)}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <div className={styles.facetHeader}>
              <div className={styles.facetTitleRow}>
                <h2 className={styles.facetName}>{facet.name}</h2>
                <RatingBadge rating={facet.rating} showLabel />
              </div>
              {findFacetDesc(facet.name, facetDescs) && (
                <p className={styles.facetDescription}>{findFacetDesc(facet.name, facetDescs)}</p>
              )}
            </div>
            <div className={styles.facetBody}>
              <div className={styles.fieldLabel}>Evidence</div>
              <blockquote className={styles.evidence}>{stripBlockquote(facet.evidence)}</blockquote>
              <div className={styles.fieldLabel}>Rationale</div>
              <div className={styles.rationale}>
                {facet.rationale.split(/\n\n+/).map((p, i) => <p key={i}>{p.trim()}</p>)}
              </div>
            </div>
            {(hoveredKey === facet.id || comment) && (
              <CommentButton
                onClick={() => setOpenDialogKey(facet.id)}
                hasComment={!!comment}
              />
            )}
            {openDialogKey === facet.id && (
              <CommentDialog
                initialText={comment?.text ?? ''}
                onSave={text => { setComment(key, text); setOpenDialogKey(null) }}
                onCancel={() => setOpenDialogKey(null)}
              />
            )}
            {comment && openDialogKey !== facet.id && (
              <CommentCallout
                text={comment.text}
                createdAt={comment.createdAt}
                onEdit={() => setOpenDialogKey(facet.id)}
                onDelete={() => deleteComment(key)}
              />
            )}
          </article>
        )
      })}

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
