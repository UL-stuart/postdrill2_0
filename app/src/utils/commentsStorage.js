const KEY_PREFIX = 'postdrill_comments_'

export function loadComments(sessionId) {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + sessionId)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveComments(sessionId, comments) {
  localStorage.setItem(KEY_PREFIX + sessionId, JSON.stringify(comments))
}

const INDIVIDUAL_MARKER_RE = /^[LCMK]\d+$/

export function groupCommentsByArea(comments) {
  const result = {
    markerCategories: [],
    individualMarkers: [],
    facets: [],
    lookingAhead: null,
    transcript: [],
  }

  for (const [key, value] of Object.entries(comments)) {
    if (key === 'reflections:freeform') continue

    if (key.startsWith('marker:')) {
      const id = key.slice('marker:'.length)
      if (INDIVIDUAL_MARKER_RE.test(id)) {
        result.individualMarkers.push({ key, ...value })
      } else {
        result.markerCategories.push({ key, ...value })
      }
    } else if (key.startsWith('facet:')) {
      result.facets.push({ key, ...value })
    } else if (key === 'lookingAhead') {
      result.lookingAhead = value
    } else if (key.startsWith('tx:')) {
      const index = parseInt(key.slice('tx:'.length), 10)
      result.transcript.push({ key, index, ...value })
    }
  }

  return result
}
