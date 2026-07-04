import { useEffect } from 'react'
import { useSessionList } from '../../hooks/useSessionList.js'
import { DRILL_NAME, DRILL_DESCRIPTION } from '../../utils/drillInfo.js'
import ActivityCalendar from '../../components/ActivityCalendar/ActivityCalendar.jsx'
import ActivityTimeline from '../../components/ActivityTimeline/ActivityTimeline.jsx'
import SessionTable from './SessionTable.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import styles from './TeamOverview.module.css'

export default function TeamOverview({ onBack, onSelectSession }) {
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
      </div>
    </div>
  )
}
