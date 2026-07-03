import { useState } from 'react'
import { computeAverage, formatAverageLabel } from '../../utils/ratingUtils.js'
import { extractFirstSentence } from '../../utils/markerUtils.js'
import RatingBadge from '../../components/RatingBadge.jsx'
import CommentButton from '../../components/CommentButton.jsx'
import CommentDialog from '../../components/CommentDialog.jsx'
import CommentCallout from '../../components/CommentCallout.jsx'
import styles from './ReportOverview.module.css'

export default function FacetsSummary({ facets, onNavigateToDetail, commentControls }) {
  const [hoveredKey, setHoveredKey] = useState(null)
  const [openDialogKey, setOpenDialogKey] = useState(null)
  const { getComment, setComment, deleteComment } = commentControls
  const avg = computeAverage(facets.map(f => f.rating))

  function handleSave(facetId, text) {
    setComment('facet:' + facetId, text)
    setOpenDialogKey(null)
  }

  return (
    <section className={`card ${styles.facetsSummary}`}>
      <div className={styles.sectionHeaderRow}>
        <h2 className={styles.sectionHeading}>Complexity Facets</h2>
        <button type="button" className={styles.detailLink} onClick={onNavigateToDetail}>View all →</button>
      </div>
      <div className={styles.facetsAvgRow}>
        <span className={styles.facetsAvgLabel}>Overall average:</span>
        <span className={styles.facetsAvgValue}>{formatAverageLabel(avg)}</span>
      </div>
      <ul className={styles.facetList}>
        {facets.map(facet => {
          const key = 'facet:' + facet.id
          const comment = getComment(key)
          return (
            <li
              key={facet.id}
              className={styles.facetRow}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredKey(facet.id)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              <div className={styles.facetNameRow}>
                <span className={styles.facetName}>{facet.name}</span>
                <RatingBadge rating={facet.rating} showLabel />
              </div>
              <div className={styles.facetSummary}>{extractFirstSentence(facet.rationale)}</div>
              {(hoveredKey === facet.id || comment) && (
                <CommentButton
                  onClick={() => setOpenDialogKey(facet.id)}
                  hasComment={!!comment}
                />
              )}
              {openDialogKey === facet.id && (
                <CommentDialog
                  initialText={comment?.text ?? ''}
                  onSave={text => handleSave(facet.id, text)}
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
            </li>
          )
        })}
      </ul>
    </section>
  )
}
