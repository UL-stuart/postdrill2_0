import { computeSessionMeta } from '../sessionMeta.js'

const tx = rows => rows.map(([dt, player]) => ({ datetime: new Date(dt), player, channel: 'ch', message: '' }))
const states = rows => rows.map(([ts, state]) => ({ timestamp: new Date(ts), state }))

describe('computeSessionMeta', () => {
  const transcript = tx([
    ['2026-06-11 09:09:30', 'uptimelabs'],
    ['2026-06-11 09:10:39', 'PLAYER'],
    ['2026-06-11 09:37:44', 'PLAYER'],
    ['2026-06-11 09:38:00', 'uptimelabs'],
  ])
  const sessionStates = states([
    ['2026-06-11 09:10:14', 'degraded'],
    ['2026-06-11 09:37:57', 'wrap_up'],
  ])

  it('start time is first PLAYER message', () => {
    expect(computeSessionMeta(transcript, sessionStates).startTime.toISOString()).toContain('09:10')
  })
  it('end time is last PLAYER message', () => {
    expect(computeSessionMeta(transcript, sessionStates).endTime.toISOString()).toContain('09:37')
  })
  it('calculates runtime: 27m 5s', () => {
    const m = computeSessionMeta(transcript, sessionStates)
    expect(m.runtimeMinutes).toBe(27)
    expect(m.runtimeSeconds).toBe(5)
  })
  it('end state is last session state', () => {
    expect(computeSessionMeta(transcript, sessionStates).endState).toBe('wrap_up')
  })
  it('throws when no PLAYER messages', () => {
    expect(() => computeSessionMeta(tx([['2026-06-11 09:10:00', 'bob']]), sessionStates)).toThrow(/PLAYER/)
  })
})
