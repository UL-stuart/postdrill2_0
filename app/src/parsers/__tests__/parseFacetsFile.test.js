import { parseFacetsFile } from '../parseFacetsFile.js'

const SAMPLE = `---

# Facets Analysis — test

## F1 — Breadth of coordination

**Rating:** 2

**Evidence:**
> "I reached out to the DB team and the frontend team"

**Rationale:**
The participant coordinated across two teams. The scope remained narrower than expected.

---

## F3 — Time pressure management

**Rating:** N/A

**Evidence:**
> "N/A"

**Rationale:**
Not observed during this session.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 | 2 |
| **Mean** | **2.00** |

---

## Caveats

- F1 rating was borderline.
`

describe('parseFacetsFile', () => {
  it('parses both facet blocks', () => expect(parseFacetsFile(SAMPLE).facets).toHaveLength(2))
  it('parses id and name', () => {
    const { facets } = parseFacetsFile(SAMPLE)
    expect(facets[0].id).toBe('F1')
    expect(facets[0].name).toBe('Breadth of coordination')
  })
  it('parses numeric rating', () => expect(parseFacetsFile(SAMPLE).facets[0].rating).toBe(2))
  it('parses N/A rating', () => expect(parseFacetsFile(SAMPLE).facets[1].rating).toBe('N/A'))
  it('parses evidence', () => expect(parseFacetsFile(SAMPLE).facets[0].evidence).toContain('DB team'))
  it('parses rationale without trailing ---', () => {
    const r = parseFacetsFile(SAMPLE).facets[0].rationale
    expect(r).toContain('coordinated across two teams')
    expect(r).not.toContain('---')
  })
  it('captures scoreSummary', () => expect(parseFacetsFile(SAMPLE).scoreSummary).toContain('Mean'))
  it('captures caveats', () => expect(parseFacetsFile(SAMPLE).caveats).toContain('borderline'))
  it('throws on out-of-range rating', () => {
    expect(() => parseFacetsFile(SAMPLE.replace('**Rating:** 2', '**Rating:** 5'))).toThrow(/out of range/)
  })
  it('handles en-dash separator', () => {
    const result = parseFacetsFile(SAMPLE.replace(/—/g, '–'))
    expect(result.facets).toHaveLength(2)
    expect(result.facets[0].id).toBe('F1')
  })
  it('handles hyphen separator', () => {
    const result = parseFacetsFile(SAMPLE.replace(/—/g, '-'))
    expect(result.facets).toHaveLength(2)
    expect(result.facets[0].id).toBe('F1')
  })
})
