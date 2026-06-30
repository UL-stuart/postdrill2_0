import { parseFinalReport } from '../parseFinalReport.js'

const SAMPLE = `# Post-Drill Report — Snipe Hunt\n\n## Some Section\n\nContent here.\n\n---\n\n## Looking Ahead\n\nCarry two things into your next drill. First, practice articulating...\nSecond, look for opportunities.`.trim()

describe('parseFinalReport', () => {
  it('extracts the Looking Ahead section verbatim', () => {
    const result = parseFinalReport(SAMPLE)
    expect(result.lookingAhead).toContain('Carry two things')
    expect(result.lookingAhead).toContain('Second, look for opportunities.')
  })
  it('does not include the ## Looking Ahead heading itself', () => {
    expect(parseFinalReport(SAMPLE).lookingAhead).not.toContain('## Looking Ahead')
  })
  it('throws when neither Looking Ahead nor Looking Forward is present', () => {
    expect(() => parseFinalReport('# Report\n\n## Other\nContent')).toThrow(/Looking/)
  })
  it('accepts "Looking Forward" as the section heading', () => {
    const forward = SAMPLE.replace('## Looking Ahead', '## Looking Forward')
    expect(parseFinalReport(forward).lookingAhead).toContain('Carry two things')
  })
  it('stops at the next ## heading if one follows', () => {
    const result = parseFinalReport(SAMPLE + '\n\n## Appendix\n\nExtra')
    expect(result.lookingAhead).not.toContain('Appendix')
  })
})
