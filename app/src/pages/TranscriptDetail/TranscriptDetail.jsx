import { useState, useEffect } from 'react'
import { useSessionData } from '../../hooks/useSessionData.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import EventDropsChart from './EventDropsChart.jsx'
import TranscriptTable from './TranscriptTable.jsx'
import styles from './TranscriptDetail.module.css'

export default function TranscriptDetail({ session }) {
  const { data, error, loading } = useSessionData(session.sessionId, session.playerName)
  const [highlightedIndex, setHighlightedIndex] = useState(null)

  useEffect(() => { document.title = `${session.playerName} — Post-Drill Report` }, [session.playerName])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState message={error} />

  const handleDropClick = (row) => {
    const idx = row.index
    setHighlightedIndex(idx)
    const el = document.getElementById(`tx-row-${idx}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <main className={`container ${styles.root}`}>
      <h1 className={styles.pageTitle}>Transcript</h1>
      <div className={`card ${styles.chartCard}`}>
        <EventDropsChart transcript={data.transcript.map((r, i) => ({ ...r, index: i }))} onDropClick={handleDropClick} />
      </div>
      <TranscriptTable rows={data.transcript} highlightedIndex={highlightedIndex} />
    </main>
  )
}
