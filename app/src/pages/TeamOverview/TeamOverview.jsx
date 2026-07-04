import { useEffect } from 'react'
import { useSessionList } from '../../hooks/useSessionList.js'
import { DRILL_NAME, DRILL_DESCRIPTION } from '../../utils/drillInfo.js'
import ActivityCalendar from '../../components/ActivityCalendar/ActivityCalendar.jsx'
import ActivityTimeline from '../../components/ActivityTimeline/ActivityTimeline.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import styles from './TeamOverview.module.css'

export default function TeamOverview({ onBack }) {
  useEffect(() => { document.title = 'Team Overview — Uptime Labs' }, [])

  const { sessions, error, loading } = useSessionList()

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
  const minStart = new Date(now)
  minStart.setUTCDate(minStart.getUTCDate() - 90)

  const earliestDate = uniqueSessions.length ? new Date(uniqueSessions[0].date) : minStart
  const latestDate = uniqueSessions.length ? new Date(uniqueSessions[uniqueSessions.length - 1].date) : now

  const chartStart = earliestDate < minStart ? earliestDate : minStart
  const chartEnd = now

  const timelineStart = earliestDate
  const timelineEnd = latestDate

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
      </div>
    </div>
  )
}
