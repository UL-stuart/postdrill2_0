import { useEffect } from 'react'
import { useSessionData } from '../../hooks/useSessionData.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import SessionMeta from './SessionMeta.jsx'
import Timeline from './Timeline.jsx'
import LookingAhead from './LookingAhead.jsx'
import MarkersSummary from './MarkersSummary.jsx'
import FacetsSummary from './FacetsSummary.jsx'
import styles from './ReportOverview.module.css'

export default function ReportOverview({ session, onNavigate }) {
  const { data, error, loading } = useSessionData(session.sessionId, session.playerName)

  useEffect(() => { document.title = `${session.playerName} — Post-Drill Report` }, [session.playerName])

  if (loading) return <LoadingSpinner label={`Loading session ${session.sessionId}…`} />
  if (error) return <ErrorState message={error} />

  return (
    <main className={`container ${styles.root}`}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Post-Drill Report</h1>
        <p className={styles.pageSubtitle}>Snipe Hunt</p>
      </header>
      <SessionMeta session={session} meta={data.meta} />
      <Timeline sessionStates={data.sessionStates} />
      <MarkersSummary markers={data.markersReport.markers} onNavigateToDetail={() => onNavigate('markers')} />
      <FacetsSummary facets={data.facetsReport.facets} onNavigateToDetail={() => onNavigate('facets')} />
      <LookingAhead text={data.finalReport.lookingAhead} />
    </main>
  )
}
