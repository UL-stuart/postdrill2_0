import { useState, useEffect } from 'react'
import { loadComments } from '../utils/commentsStorage.js'

export default function useAllComments(sessionId) {
  const [comments, setComments] = useState(() => loadComments(sessionId))

  useEffect(() => {
    setComments(loadComments(sessionId))
  }, [sessionId])

  return comments
}
