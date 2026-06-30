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
describe('groupMarkersByCategory', () => {
  const markers = [
    { id: 'L3', rating: 3, rationale: 'foo', evidence: '', name: 'X' },
    { id: 'C1', rating: 2, rationale: 'bar', evidence: '', name: 'Y' },
    { id: 'L5', rating: 4, rationale: 'baz', evidence: '', name: 'Z' },
  ]
  it('groups markers by their category prefix', () => {
    const groups = groupMarkersByCategory(markers)
    expect(groups).toHaveProperty('Leadership')
    expect(groups).toHaveProperty('Coordination')
  })
  it('returns each group as an array', () => {
    const groups = groupMarkersByCategory(markers)
    expect(Array.isArray(groups.Leadership)).toBe(true)
    expect(Array.isArray(groups.Coordination)).toBe(true)
  })
  it('places multiple markers with the same prefix in the same array', () => {
    const groups = groupMarkersByCategory(markers)
    expect(groups.Leadership).toHaveLength(2)
    expect(groups.Coordination).toHaveLength(1)
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
