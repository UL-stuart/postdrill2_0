import { readFileSync } from 'fs'
import { resolve } from 'path'
import { parseMarkersCatalog } from '../parseMarkersCatalog.js'

const catalogText = readFileSync(
  resolve(__dirname, '../../../../facets_and_markers/markers-catalog.md'),
  'utf8'
)

describe('parseMarkersCatalog', () => {
  let result

  beforeAll(() => { result = parseMarkersCatalog(catalogText) })

  test('returns all 23 marker IDs', () => {
    const expected = ['L1','L2','L3','L4','L5','C1','C2','C3','C4','C5','C6','C7','M1','M2','M3','M4','M5','K1','K2','K3','K4','K5','K6']
    expect(Object.keys(result).sort()).toEqual(expected.sort())
  })

  test('L1 description starts with "Participant uses"', () => {
    expect(result.L1).toMatch(/^Participant uses/)
  })

  test('K4 description mentions "technical channel"', () => {
    expect(result.K4).toMatch(/technical channel/i)
  })

  test('descriptions are non-empty strings', () => {
    for (const val of Object.values(result)) {
      expect(typeof val).toBe('string')
      expect(val.length).toBeGreaterThan(10)
    }
  })
})
