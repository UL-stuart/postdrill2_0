import { getCategoryForMarker, groupMarkersByCategory, extractFirstSentence, synthesizeCategorySummary } from '../markerUtils.js'

describe('getCategoryForMarker', () => {
  it('maps L→Leadership', () => expect(getCategoryForMarker('L3')).toBe('Leadership'))
  it('maps C→Coordination', () => expect(getCategoryForMarker('C1')).toBe('Coordination'))
  it('maps M→Mindset', () => expect(getCategoryForMarker('M2')).toBe('Mindset'))
  it('maps K→Communication', () => expect(getCategoryForMarker('K4')).toBe('Communication'))
  it('throws on unknown prefix', () => expect(() => getCategoryForMarker('X9')).toThrow(/Unknown/))
})
describe('extractFirstSentence', () => {
  it('extracts to first sentence terminator', () => {
    expect(extractFirstSentence('The participant drove. They made decisions.')).toBe('The participant drove.')
  })
  it('falls back to first line', () => {
    expect(extractFirstSentence('No period\nSecond line')).toBe('No period')
  })
})
describe('synthesizeCategorySummary', () => {
  const markers = [
    { id: 'C1', rating: 3, rationale: 'They asked good questions. Follow-up was limited.' },
    { id: 'C4', rating: 2, rationale: 'Delegation was vague. Needs work.' },
    { id: 'C6', rating: 'N/A', rationale: 'Not observed.' },
  ]
  it('joins first sentences, excludes N/A markers', () => {
    const summary = synthesizeCategorySummary(markers)
    expect(summary).toContain('They asked good questions.')
    expect(summary).toContain('Delegation was vague.')
    expect(summary).not.toContain('Not observed.')
  })
})
