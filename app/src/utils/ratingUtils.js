export const RATING_LABELS = { 1: 'Not evident', 2: 'Practicing', 3: 'Strengthening', 4: 'Fluent' }

export function formatRatingLabel(rating) {
  if (rating === 'N/A') return 'N/A'
  const label = RATING_LABELS[rating]
  return label ? `${rating}: ${label}` : `Unknown (${rating})`
}

export function computeAverage(ratings) {
  const nums = ratings.filter(r => r !== 'N/A' && typeof r === 'number')
  return nums.length === 0 ? null : nums.reduce((s, r) => s + r, 0) / nums.length
}

export function formatAverageLabel(avg) {
  if (avg === null) return 'N/A'
  if (Number.isInteger(avg)) return `${avg} / ${RATING_LABELS[avg]}`
  return `${avg.toFixed(2)} / between ${RATING_LABELS[Math.floor(avg)]} and ${RATING_LABELS[Math.ceil(avg)]}`
}
