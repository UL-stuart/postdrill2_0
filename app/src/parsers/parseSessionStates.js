import Papa from 'papaparse'

export function parseSessionStates(csvText, sessionId) {
  const { data, errors } = Papa.parse(csvText.trim(), { header: true, skipEmptyLines: true })
  const fatal = errors.filter(e => e.type === 'Abort')
  if (fatal.length > 0) throw new Error(`CSV parse error: ${fatal[0].message}`)

  const rows = data
    .filter(r => String(r.session_id).trim() === String(sessionId).trim())
    .map(r => ({ timestamp: new Date(r.timestamp), state: r.state }))
    .sort((a, b) => a.timestamp - b.timestamp)

  if (rows.length === 0)
    throw new Error(`No session states found for session "${sessionId}" in session_states.csv`)

  return rows
}
