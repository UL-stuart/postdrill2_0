import { useState } from 'react'
import { groupMarkersByCategory, synthesizeCategorySummary, CATEGORY_ORDER } from '../../utils/markerUtils.js'
import { computeAverage, formatAverageLabel } from '../../utils/ratingUtils.js'
import CommentButton from '../../components/CommentButton.jsx'
import CommentDialog from '../../components/CommentDialog.jsx'
import CommentCallout from '../../components/CommentCallout.jsx'
import styles from './ReportOverview.module.css'

export default function MarkersSummary({ markers, onNavigateToDetail, commentControls }) {
  const [hoveredKey, setHoveredKey] = useState(null)
  const [openDialogKey, setOpenDialogKey] = useState(null)
  const { getComment, setComment, deleteComment } = commentControls
  const groups = groupMarkersByCategory(markers)

  function handleSave(cat, text) {
    setComment('marker:' + cat, text)
    setOpenDialogKey(null)
  }

  return (
    <section className={`card ${styles.markersSummary}`}>
      <div className={styles.sectionHeaderRow}>
        <h2 className={styles.sectionHeading}>Behavioural Markers</h2>
        <button type="button" className={styles.detailLink} onClick={onNavigateToDetail}>View all →</button>
      </div>
      <div className={styles.categoryList}>
        {CATEGORY_ORDER.filter(cat => groups[cat]).map(cat => {
          const catMarkers = groups[cat]
          const summary = synthesizeCategorySummary(catMarkers)
          const key = 'marker:' + cat
          const comment = getComment(key)
          return (
            <div
              key={cat}
              className={styles.categoryRow}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredKey(cat)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryName}>{cat}</span>
                <span className={styles.categoryAvg}>{formatAverageLabel(computeAverage(catMarkers.map(m => m.rating)))}</span>
              </div>
              <p className={styles.categorySummary}>{summary || 'No scored markers in this category.'}</p>
              {(hoveredKey === cat || comment) && (
                <CommentButton
                  onClick={() => setOpenDialogKey(cat)}
                  hasComment={!!comment}
                />
              )}
              {openDialogKey === cat && (
                <CommentDialog
                  initialText={comment?.text ?? ''}
                  onSave={text => handleSave(cat, text)}
                  onCancel={() => setOpenDialogKey(null)}
                />
              )}
              {comment && openDialogKey !== cat && (
                <CommentCallout
                  text={comment.text}
                  createdAt={comment.createdAt}
                  onEdit={() => setOpenDialogKey(cat)}
                  onDelete={() => deleteComment(key)}
                />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
