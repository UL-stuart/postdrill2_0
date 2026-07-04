import { useEffect } from 'react'
import { useSessionList } from '../../hooks/useSessionList.js'
import useSessionSummaries from '../../hooks/useSessionSummaries.js'
import { DRILL_NAME, DRILL_DESCRIPTION } from '../../utils/drillInfo.js'
import { CATEGORY_ORDER } from '../../utils/markerUtils.js'
import ActivityCalendar from '../../components/ActivityCalendar/ActivityCalendar.jsx'
import ActivityTimeline from '../../components/ActivityTimeline/ActivityTimeline.jsx'
import SessionTable from './SessionTable.jsx'
import RadarChart from '../../components/RadarChart/RadarChart.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import styles from './TeamOverview.module.css'

const FACET_DIMENSIONS = [
  { key: 'F1', label: 'Misleading correlations' },
  { key: 'F2', label: 'Hidden coupling' },
  { key: 'F3', label: 'Decreased access to team' },
  { key: 'F4', label: 'Coordination bottlenecks' },
  { key: 'F5', label: 'Data overload' },
]

const CATEGORY_DIMENSIONS = CATEGORY_ORDER.map(cat => ({ key: cat, label: cat }))

function cohortStats(summaries, keys, getter) {
  return Object.fromEntries(keys.map(key => {
    const vals = Object.values(summaries).map(s => getter(s, key)).filter(v => v != null)
    return [key, {
      avg: vals.length ? vals.reduce((a, b) => a + b) / vals.length : null,
      min: vals.length ? Math.min(...vals) : null,
      max: vals.length ? Math.max(...vals) : null,
    }]
  }))
}

export function cohortMaxValues(summaries, keys, getter) {
  return Object.fromEntries(keys.map(key => {
    const vals = Object.values(summaries).map(s => getter(s, key)).filter(v => v != null)
    return [key, vals.length ? Math.max(...vals) : null]
  }))
}

function statsToSeries(stats, keys) {
  return [
    { label: 'Max', values: Object.fromEntries(keys.map(k => [k, stats[k]?.max])), color: '#93c5fd', fillOpacity: 0.3, dashed: true },
    { label: 'Min', values: Object.fromEntries(keys.map(k => [k, stats[k]?.min])), color: '#a5b4fc', fillOpacity: 0.3, dashed: true },
    { label: 'Avg', values: Object.fromEntries(keys.map(k => [k, stats[k]?.avg])), color: '#1d4ed8', fillOpacity: 0.15, dashed: false },
  ]
}

export default function TeamOverview({ onBack, onSelectSession }) {
  useEffect(() => { document.title = 'Team Overview — Uptime Labs' }, [])

  const { sessions, error, loading } = useSessionList()
  const { summaries, loading: summariesLoading } = useSessionSummaries(loading ? [] : sessions)

  if (loading) return <LoadingSpinner label="Loading overview…" />
  if (error) return <ErrorState message={error} />

  const drillRunCount = new Set(sessions.map(s => s.sessionId)).size

  const uniqueSessions = Object.values(
    sessions.reduce((acc, s) => {
      if (!acc[s.sessionId] && s.date) acc[s.sessionId] = s
      return acc
    }, {})
  ).sort((a, b) => new Date(a.date) - new Date(b.date))

  const now = new Date()
  const yearAgo = new Date(now)
  yearAgo.setUTCFullYear(yearAgo.getUTCFullYear() - 1)

  const chartStart = yearAgo
  const chartEnd = now

  const timelineStart = uniqueSessions.length ? new Date(uniqueSessions[0].date) : yearAgo
  const timelineEnd = uniqueSessions.length ? new Date(uniqueSessions[uniqueSessions.length - 1].date) : now

  return (
    <div className={styles.root}>
      <div className="container">
        <button className={styles.backBtn} onClick={onBack}>← All Sessions</button>

        <h1 className={styles.pageTitle}>Team Overview</h1>

        <div className={`card ${styles.descCard}`}>
          <h2 className={styles.drillName}>{DRILL_NAME}</h2>
          <p className={styles.drillDesc}>{DRILL_DESCRIPTION}</p>
        </div>

        <div className={`card ${styles.statCard}`}>
          <span className={styles.statNumber}>{drillRunCount}</span>
          <span className={styles.statLabel}>drill {drillRunCount === 1 ? 'run' : 'runs'}</span>
        </div>

        <div className={`card ${styles.chartCard}`}>
          <h2 className={styles.chartTitle}>Activity — Calendar</h2>
          <ActivityCalendar sessions={uniqueSessions} start={chartStart} end={chartEnd} />
        </div>

        <div className={`card ${styles.chartCard}`}>
          <h2 className={styles.chartTitle}>Activity — Timeline</h2>
          <ActivityTimeline sessions={uniqueSessions} start={timelineStart} end={timelineEnd} />
        </div>

        <div className={`card ${styles.tableCard}`}>
          <h2 className={styles.chartTitle}>Sessions</h2>
          <SessionTable sessions={sessions} onSelectSession={onSelectSession} />
        </div>

        {summariesLoading ? (
          <div className={`card ${styles.chartCard}`}>
            <p className={styles.loadingMsg}>Loading cohort data…</p>
          </div>
        ) : (
          <div className={styles.radarRow}>
            <div className={`card ${styles.radarCard}`}>
              <h2 className={styles.chartTitle}>Cohort — Marker Categories</h2>
              <RadarChart
                dimensions={CATEGORY_DIMENSIONS}
                series={statsToSeries(
                  cohortStats(summaries, CATEGORY_ORDER, (s, k) => s.categoryRatings?.[k]),
                  CATEGORY_ORDER
                )}
              />
            </div>
            <div className={`card ${styles.radarCard}`}>
              <h2 className={styles.chartTitle}>Cohort — Facets</h2>
              <RadarChart
                dimensions={FACET_DIMENSIONS}
                series={statsToSeries(
                  cohortStats(summaries, FACET_DIMENSIONS.map(d => d.key), (s, k) => s.facetRatings?.[k]),
                  FACET_DIMENSIONS.map(d => d.key)
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
