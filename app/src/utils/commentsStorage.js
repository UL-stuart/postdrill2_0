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
