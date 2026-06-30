import { groupMarkersByCategory, synthesizeCategorySummary, CATEGORY_ORDER } from '../../utils/markerUtils.js'
import { computeAverage, formatAverageLabel } from '../../utils/ratingUtils.js'
import styles from './ReportOverview.module.css'

export default function MarkersSummary({ markers, onNavigateToDetail }) {
  const groups = groupMarkersByCategory(markers)
  return (
    <section className={`card ${styles.markersSummary}`}>
      <div className={styles.sectionHeaderRow}>
        <h2 className={styles.sectionHeading}>Behavioural Markers</h2>
        <button className={styles.detailLink} onClick={onNavigateToDetail}>View all →</button>
      </div>
      <div className={styles.categoryList}>
        {CATEGORY_ORDER.filter(cat => groups[cat]).map(cat => {
          const catMarkers = groups[cat]
          const summary = synthesizeCategorySummary(catMarkers)
          return (
            <div key={cat} className={styles.categoryRow}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryName}>{cat}</span>
                <span className={styles.categoryAvg}>{formatAverageLabel(computeAverage(catMarkers.map(m => m.rating)))}</span>
              </div>
              <p className={styles.categorySummary}>{summary || 'No scored markers in this category.'}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
