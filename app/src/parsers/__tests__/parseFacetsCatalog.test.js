import { readFileSync } from 'fs'
import { resolve } from 'path'
import { parseFacetsCatalog } from '../parseFacetsCatalog.js'

const catalogText = readFileSync(
  resolve(__dirname, '../../../../facets_and_markers/facets-catalog.md'),
  'utf8'
)

describe('parseFacetsCatalog', () => {
  let result

  beforeAll(() => { result = parseFacetsCatalog(catalogText) })

  test('returns entries for all 38 FD entries', () => {
    expect(Object.keys(result).length).toBe(38)
  })

  test('"stereotype violations" key exists and has description', () => {
    expect(result['stereotype violations']).toBeTruthy()
    expect(result['stereotype violations']).toMatch(/stereotype/i)
  })

  test('"false prime explanations" key exists', () => {
    expect(result['false prime explanations']).toBeTruthy()
  })

  test('"ambiguous cues" key exists', () => {
    expect(result['ambiguous cues']).toBeTruthy()
  })

  test('"signal–noise relationship" key exists', () => {
    expect(result['signal–noise relationship']).toBeTruthy()
  })

  test('no appendix pattern entries included', () => {
    expect(result['diagnostic information access']).toBeUndefined()
    expect(result['workload and pressure management']).toBeUndefined()
  })

  test('descriptions are non-empty strings', () => {
    for (const val of Object.values(result)) {
      expect(typeof val).toBe('string')
      expect(val.length).toBeGreaterThan(10)
    }
  })
})
