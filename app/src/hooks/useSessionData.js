import { useState, useEffect, useRef } from 'react'
import { parseFinalReport } from '../parsers/parseFinalReport.js'
import { parseSessionStates } from '../parsers/parseSessionStates.js'
import { parseTranscript } from '../parsers/parseTranscript.js'
import { parseMarkersFile } from '../parsers/parseMarkersFile.js'
import { computeSessionMeta } from '../utils/sessionMeta.js'

const fetchText = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status} — session data file may be missing)`)
  return res.text()
}

export function useSessionData(sessionId, playerName) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const cache = useRef({})

  useEffect(() => {
    if (!sessionId || !playerName) return
    if (cache.current[sessionId]) { setData(cache.current[sessionId]); setLoading(false); return }
    setLoading(true); setError(null); setData(null)

    const load = async () => {
      const [finalReportText, statesText, transcriptText, markersText] = await Promise.all([
        fetchText(`/data/readouts/${sessionId}/${sessionId}-final-report.md`),
        fetchText(`/data/session_states/session_states.csv`),
        fetchText(`/data/transcripts/${playerName}-${sessionId}.csv`),
        fetchText(`/data/readouts/${sessionId}/${sessionId}-markers.md`),
      ])
      const finalReport = parseFinalReport(finalReportText)
      const sessionStates = parseSessionStates(statesText, sessionId)
      const transcript = parseTranscript(transcriptText)
      const meta = computeSessionMeta(transcript, sessionStates)
      const markers = parseMarkersFile(markersText)
      return { finalReport, sessionStates, transcript, meta, markers }
    }

    load()
      .then(result => { cache.current[sessionId] = result; setData(result) })
      .catch(err => setError(`Session ${sessionId}: ${err.message}`))
      .finally(() => setLoading(false))
  }, [sessionId, playerName])

  return { data, error, loading }
}
