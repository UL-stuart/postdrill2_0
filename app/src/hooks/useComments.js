import { useState, useEffect } from 'react'
import { loadComments, saveComments } from '../utils/commentsStorage.js'

export default function useComments(sessionId) {
  const [comments, setComments] = useState(() => loadComments(sessionId))

  useEffect(() => {
    setComments(loadComments(sessionId))
  }, [sessionId])

  function getComment(key) {
    return comments[key] ?? null
  }

  function setComment(key, text) {
    const next = { ...comments, [key]: { text, createdAt: new Date().toISOString() } }
    setComments(next)
    saveComments(sessionId, next)
  }

  function deleteComment(key) {
    const next = { ...comments }
    delete next[key]
    setComments(next)
    saveComments(sessionId, next)
  }

  return { getComment, setComment, deleteComment }
}
