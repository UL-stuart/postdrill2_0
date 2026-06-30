import { parseMarkersFile } from '../parseMarkersFile.js'

const SAMPLE = `---

# Markers Analysis — test

## L3 — Takes explicit ownership

**Rating:** 3

**Evidence:**
> "I'll lead this"

**Rationale:**
The participant clearly drove the response. They made the key decisions.

---

## M5 — Adapts when path isn't working

**Rating:** N/A

**Evidence:**
> "N/A"

**Rationale:**
Not observed.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 | 3 |
| **Mean** | **3.00** |

---

## Caveats

- L3 was a close call.
`

describe('parseMarkersFile', () => {
  it('parses both marker blocks', () => expect(parseMarkersFile(SAMPLE).markers).toHaveLength(2))
  it('parses id and name', () => {
    const { markers } = parseMarkersFile(SAMPLE)
    expect(markers[0].id).toBe('L3')
    expect(markers[0].name).toBe('Takes explicit ownership')
  })
  it('parses numeric rating', () => expect(parseMarkersFile(SAMPLE).markers[0].rating).toBe(3))
  it('parses N/A rating', () => expect(parseMarkersFile(SAMPLE).markers[1].rating).toBe('N/A'))
  it('parses evidence', () => expect(parseMarkersFile(SAMPLE).markers[0].evidence).toContain("I'll lead this"))
  it('parses rationale without trailing ---', () => {
    const r = parseMarkersFile(SAMPLE).markers[0].rationale
    expect(r).toContain('clearly drove the response')
    expect(r).not.toContain('---')
  })
  it('captures scoreSummary', () => expect(parseMarkersFile(SAMPLE).scoreSummary).toContain('Mean'))
  it('captures caveats', () => expect(parseMarkersFile(SAMPLE).caveats).toContain('close call'))
  it('throws on out-of-range rating', () => {
    expect(() => parseMarkersFile(SAMPLE.replace('**Rating:** 3', '**Rating:** 5'))).toThrow(/out of range/)
  })
  it('parses correctly when headings use en-dash (–)', () => {
    const { markers } = parseMarkersFile(SAMPLE.replace('—', '–'))
    expect(markers).toHaveLength(2)
    expect(markers[0].id).toBe('L3')
    expect(markers[0].name).toBe('Takes explicit ownership')
  })
  it('parses correctly when headings use hyphen (-)', () => {
    const { markers } = parseMarkersFile(SAMPLE.replace('—', '-'))
    expect(markers).toHaveLength(2)
    expect(markers[0].id).toBe('L3')
    expect(markers[0].name).toBe('Takes explicit ownership')
  })
})
