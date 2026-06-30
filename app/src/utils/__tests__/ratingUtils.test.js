import { RATING_LABELS, computeAverage, formatAverageLabel, formatRatingLabel } from '../ratingUtils.js'

describe('RATING_LABELS', () => {
  it('has labels for 1–4', () => {
    expect(RATING_LABELS[1]).toBe('Not evident')
    expect(RATING_LABELS[2]).toBe('Practicing')
    expect(RATING_LABELS[3]).toBe('Strengthening')
    expect(RATING_LABELS[4]).toBe('Fluent')
  })
})
describe('computeAverage', () => {
  it('excludes N/A', () => expect(computeAverage([2, 'N/A', 3])).toBeCloseTo(2.5))
  it('returns null when all N/A', () => expect(computeAverage(['N/A'])).toBeNull())
  it('handles single value', () => expect(computeAverage([3])).toBe(3))
})
describe('formatAverageLabel', () => {
  it('integer: "3 / Strengthening"', () => expect(formatAverageLabel(3)).toBe('3 / Strengthening'))
  it('non-integer: between phrasing', () => expect(formatAverageLabel(2.5)).toBe('2.50 / between Practicing and Strengthening'))
  it('null: "N/A"', () => expect(formatAverageLabel(null)).toBe('N/A'))
})
describe('formatRatingLabel', () => {
  it('returns label for numeric', () => expect(formatRatingLabel(4)).toBe('Fluent'))
  it('returns "Not observed" for N/A', () => expect(formatRatingLabel('N/A')).toBe('Not observed'))
})
