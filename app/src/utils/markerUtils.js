const PREFIX_TO_CATEGORY = { L: 'Leadership', C: 'Coordination', M: 'Mindset', K: 'Communication' }

export function getCategoryForMarker(markerId) {
  const cat = PREFIX_TO_CATEGORY[markerId.charAt(0)]
  if (!cat) throw new Error(`Unknown marker category prefix "${markerId.charAt(0)}" in marker "${markerId}"`)
  return cat
}

export function groupMarkersByCategory(markers) {
  return markers.reduce((groups, m) => {
    const cat = getCategoryForMarker(m.id)
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(m)
    return groups
  }, {})
}

export function extractFirstSentence(text) {
  const match = text.match(/^[^.!?]+[.!?]/)
  return match ? match[0].trim() : text.split('\n')[0].trim()
}

export function synthesizeCategorySummary(markers) {
  return markers
    .filter(m => m.rating !== 'N/A')
    .map(m => extractFirstSentence(m.rationale))
    .join(' ')
}
