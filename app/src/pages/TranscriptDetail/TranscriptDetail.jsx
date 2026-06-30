import { useState } from 'react'
import { useSessionData } from '../../hooks/useSessionData.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import ErrorState from '../../components/ErrorState.jsx'
import TranscriptTable from './TranscriptTable.jsx'
import styles from './TranscriptDetail.module.css'

export default function TranscriptDetail({ session }) {
  const { data, error, loading } = useSessionData(session.sessionId, session.playerName)
  const [highlightedIndex, setHighlightedIndex] = useState(null)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState message={error} />

  return (
    <main className={`container ${styles.root}`}>
      <h1 className={styles.pageTitle}>Transcript</h1>
      <TranscriptTable rows={data.transcript} highlightedIndex={highlightedIndex} />
    </main>
  )
}
