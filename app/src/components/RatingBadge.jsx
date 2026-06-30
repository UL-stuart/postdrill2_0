import { formatRatingLabel } from '../utils/ratingUtils.js'
import styles from './RatingBadge.module.css'

const COLOR = { 1: 'r1', 2: 'r2', 3: 'r3', 4: 'r4', 'N/A': 'rna' }

export default function RatingBadge({ rating, showLabel = false }) {
  const label = formatRatingLabel(rating)
  return (
    <span className={`${styles.badge} ${styles[COLOR[rating] ?? 'rna']}`} title={label}>
      {showLabel ? label : rating}
    </span>
  )
}
