import { parseSessionStates } from '../parseSessionStates.js'

const CSV = `"session_id","timestamp","state","session_id"
9401,2026-06-10 07:43:50.466,degraded,9401
9401,2026-06-10 07:44:30.862,customer_support_info_1,9401
9401,2026-06-10 08:12:32.260,wrap_up,9401
9418,2026-06-11 07:21:27.212,degraded,9418`

describe('parseSessionStates', () => {
  it('returns only rows for requested session', () => {
    expect(parseSessionStates(CSV, '9401')).toHaveLength(3)
  })
  it('sorts by timestamp ascending', () => {
    const r = parseSessionStates(CSV, '9401')
    expect(r[0].state).toBe('degraded')
    expect(r[2].state).toBe('wrap_up')
  })
  it('parses timestamp as Date', () => {
    expect(parseSessionStates(CSV, '9401')[0].timestamp).toBeInstanceOf(Date)
  })
  it('throws when session not found', () => {
    expect(() => parseSessionStates(CSV, '9999')).toThrow(/9999/)
  })
})
