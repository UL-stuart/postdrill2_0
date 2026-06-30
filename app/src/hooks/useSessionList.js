import { useState, useEffect } from 'react'

export function useSessionList() {
  const [sessions, setSessions] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/sessions')
      .then(r => r.json())
      .then(data => { if (data.error) throw new Error(data.error); setSessions(data) })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { sessions, error, loading }
}
