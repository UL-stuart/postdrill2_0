export function computeSessionMeta(transcript, sessionStates) {
  const playerRows = transcript.filter(r => r.player === 'PLAYER')
  if (playerRows.length === 0)
    throw new Error('No PLAYER messages found in transcript — cannot compute session start/end time')

  const startTime = playerRows[0].datetime
  const endTime = playerRows[playerRows.length - 1].datetime
  const runtimeMs = endTime - startTime

  return {
    startTime,
    endTime,
    runtimeMinutes: Math.floor(runtimeMs / 60_000),
    runtimeSeconds: Math.floor((runtimeMs % 60_000) / 1_000),
    endState: sessionStates[sessionStates.length - 1].state,
  }
}
