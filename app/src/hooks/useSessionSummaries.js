import { useState, useEffect } from 'react'
import { parseMarkersFile } from '../parsers/parseMarkersFile.js'
import { parseFacetsFile } from '../parsers/parseFacetsFile.js'
import { computeAverage } from '../utils/ratingUtils.js'

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return res.text()
}

async function loadSummary(sessionId) {
  const [markersText, facetsText] = await Promise.all([
    fetchText(`/data/readouts/${sessionId}/${sessionId}-markers.md`),
    fetchText(`/data/readouts/${sessionId}/${sessionId}-facets.md`),
  ])
  const { markers } = parseMarkersFile(markersText)
  const { facets } = parseFacetsFile(facetsText)
  return {
    markersAvg: computeAverage(markers.map(m => m.rating)),
    facetsAvg: computeAverage(facets.map(f => f.rating)),
  }
}

export default function useSessionSummaries(sessions) {
  const [summaries, setSummaries] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!sessions.length) { setLoading(false); return }
    setLoading(true)
    const unique = [...new Set(sessions.map(s => s.sessionId))]
    Promise.all(unique.map(id => loadSummary(id).then(s => [id, s])))
      .then(entries => {
        setSummaries(Object.fromEntries(entries))
        setLoading(false)
      })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [sessions])

  return { summaries, loading, error }
}
