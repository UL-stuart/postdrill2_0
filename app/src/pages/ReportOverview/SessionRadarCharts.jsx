import { useSessionList } from '../../hooks/useSessionList.js'
import useSessionSummaries from '../../hooks/useSessionSummaries.js'
import { groupMarkersByCategory, CATEGORY_ORDER } from '../../utils/markerUtils.js'
import { computeAverage } from '../../utils/ratingUtils.js'
import RadarChart from '../../components/RadarChart/RadarChart.jsx'
import styles from './SessionRadarCharts.module.css'

const FACET_DIMENSIONS = [
  { key: 'F1', label: 'Misleading correlations' },
  { key: 'F2', label: 'Hidden coupling' },
  { key: 'F3', label: 'Decreased access to team' },
  { key: 'F4', label: 'Coordination bottlenecks' },
  { key: 'F5', label: 'Data overload' },
]
const CATEGORY_DIMENSIONS = CATEGORY_ORDER.map(cat => ({ key: cat, label: cat }))

const SESSION_COLOR = '#1d4ed8'
const COHORT_COLOR = '#93c5fd'

function maxPerKey(summaries, keys, getter) {
  return Object.fromEntries(keys.map(key => {
    const vals = Object.values(summaries).map(s => getter(s, key)).filter(v => v != null)
    return [key, vals.length ? Math.max(...vals) : null]
  }))
}

function sessionCategoryScores(markers) {
  const byCategory = groupMarkersByCategory(markers)
  return Object.fromEntries(
    CATEGORY_ORDER.map(cat => [cat, computeAverage((byCategory[cat] || []).map(m => m.rating))])
  )
}

function sessionFacetScores(facets) {
  const map = Object.fromEntries(facets.map(f => [f.id, f.rating === 'N/A' ? null : f.rating]))
  return Object.fromEntries(FACET_DIMENSIONS.map(d => [d.key, map[d.key] ?? null]))
}

export default function SessionRadarCharts({ markers, facets }) {
  const { sessions } = useSessionList()
  const { summaries, loading } = useSessionSummaries(sessions ?? [])

  const categoryScores = sessionCategoryScores(markers)
  const facetScores = sessionFacetScores(facets)

  const cohortCategoryMax = loading ? null : maxPerKey(summaries, CATEGORY_ORDER, (s, k) => s.categoryRatings?.[k])
  const cohortFacetMax = loading ? null : maxPerKey(summaries, FACET_DIMENSIONS.map(d => d.key), (s, k) => s.facetRatings?.[k])

  const categorySeries = [
    ...(cohortCategoryMax ? [{ label: 'Cohort max', values: cohortCategoryMax, color: COHORT_COLOR, fillOpacity: 0.25, dashed: true }] : []),
    { label: 'This session', values: categoryScores, color: SESSION_COLOR, fillOpacity: 0.15, dashed: false },
  ]

  const facetSeries = [
    ...(cohortFacetMax ? [{ label: 'Cohort max', values: cohortFacetMax, color: COHORT_COLOR, fillOpacity: 0.25, dashed: true }] : []),
    { label: 'This session', values: facetScores, color: SESSION_COLOR, fillOpacity: 0.15, dashed: false },
  ]

  return (
    <div className={styles.row}>
      <div className={`card ${styles.card}`}>
        <h2 className={styles.title}>Marker Categories</h2>
        <RadarChart dimensions={CATEGORY_DIMENSIONS} series={categorySeries} />
      </div>
      <div className={`card ${styles.card}`}>
        <h2 className={styles.title}>Facets</h2>
        <RadarChart dimensions={FACET_DIMENSIONS} series={facetSeries} />
      </div>
    </div>
  )
}
