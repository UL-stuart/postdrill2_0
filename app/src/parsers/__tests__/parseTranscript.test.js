import { parseTranscript } from '../parseTranscript.js'

const SIMPLE = `datetime,player,channel,message
2026-06-11 09:10:39,PLAYER,online-boutique-9423,what are you seeing?
2026-06-11 09:10:45,bob,online-boutique-9423,checkout broken`

const MULTILINE = `datetime,player,channel,message
2026-06-11 09:09:30,uptimelabs,online-boutique-9423,":warning:

You are about to face the Snipe Hunt."
2026-06-11 09:10:39,PLAYER,online-boutique-9423,ready`

describe('parseTranscript', () => {
  it('returns one row per message', () => expect(parseTranscript(SIMPLE)).toHaveLength(2))
  it('parses datetime as Date', () => expect(parseTranscript(SIMPLE)[0].datetime).toBeInstanceOf(Date))
  it('preserves player, channel, message', () => {
    const rows = parseTranscript(SIMPLE)
    expect(rows[0].player).toBe('PLAYER')
    expect(rows[0].message).toBe('what are you seeing?')
  })
  it('handles multi-line cells', () => {
    const rows = parseTranscript(MULTILINE)
    expect(rows).toHaveLength(2)
    expect(rows[0].message).toContain('Snipe Hunt')
  })
})
