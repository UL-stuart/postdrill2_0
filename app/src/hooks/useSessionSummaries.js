import { useState, useEffect } from 'react'
import { parseMarkersFile } from '../parsers/parseMarkersFile.js'
import { parseFacetsFile } from '../parsers/parseFacetsFile.js'
import { computeAverage } from '../utils/ratingUtils.js'
import { groupMarkersByCategory, CATEGORY_ORDER } from '../utils/markerUtils.js'

const FACET_IDS = ['F1', 'F2', 'F3', 'F4', 'F5']

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

  const facetMap = Object.fromEntries(facets.map(f => [f.id, f.rating === 'N/A' ? null : f.rating]))
  const facetRatings = Object.fromEntries(FACET_IDS.map(id => [id, facetMap[id] ?? null]))

  const byCategory = groupMarkersByCategory(markers)
  const categoryRatings = Object.fromEntries(
    CATEGORY_ORDER.map(cat => [cat, computeAverage((byCategory[cat] || []).map(m => m.rating))])
  )

  return {
    markersAvg: computeAverage(markers.map(m => m.rating)),
    facetsAvg: computeAverage(facets.map(f => f.rating)),
    facetRatings,
    categoryRatings,
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
