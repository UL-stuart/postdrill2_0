import { computeAverage, formatAverageLabel, formatRatingLabel } from '../../utils/ratingUtils.js'
import { extractFirstSentence } from '../../utils/markerUtils.js'
import RatingBadge from '../../components/RatingBadge.jsx'
import styles from './ReportOverview.module.css'

export default function FacetsSummary({ facets, onNavigateToDetail }) {
  const avg = computeAverage(facets.map(f => f.rating))
  return (
    <section className={`card ${styles.facetsSummary}`}>
      <div className={styles.sectionHeaderRow}>
        <h2 className={styles.sectionHeading}>Complexity Facets</h2>
        <button className={styles.detailLink} onClick={onNavigateToDetail}>View all →</button>
      </div>
      <div className={styles.facetsAvgRow}>
        <span className={styles.facetsAvgLabel}>Overall average:</span>
        <span className={styles.facetsAvgValue}>{formatAverageLabel(avg)}</span>
      </div>
      <ul className={styles.facetList}>
        {facets.map(facet => (
          <li key={facet.id} className={styles.facetRow}>
            <div className={styles.facetNameRow}>
              <span className={styles.facetName}>{facet.name}</span>
              <RatingBadge rating={facet.rating} showLabel />
            </div>
            <div className={styles.facetSummary}>{extractFirstSentence(facet.rationale)}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
