/**
 * Parses facets-catalog.md into a lookup of normalisedName → description.
 * Each FD entry is a ### heading like "FD1. Label / subtitle" with a "- **Description:**" bullet.
 * Keys are the primary label part (before " / "), lowercased, for fuzzy matching against
 * per-drill facet names which use drill-scoped IDs (F1, F2, …) rather than FD numbers.
 */
export function parseFacetsCatalog(text) {
  const result = {}
  const chunks = text.split(/\n### /)
  for (const chunk of chunks) {
    const firstLine = chunk.split('\n')[0]
    if (!/^FD\d+\./.test(firstLine)) continue
    // Label is everything after "FDN. ", strip " / subtitle" if present
    const labelRaw = firstLine.replace(/^FD\d+\.\s*/, '').trim()
    const label = labelRaw.split(' / ')[0].toLowerCase()
    // Description may span more than one line — capture from the colon to the next bullet
    const descMatch = chunk.match(/- \*\*Description:\*\*\s*([\s\S]+?)(?=\n- \*\*|\n\n###|\n---|\n\n##|$)/)
    if (descMatch) {
      const desc = descMatch[1].replace(/\s+/g, ' ').trim()
      if (label && desc) result[label] = desc
    }
  }
  return result
}
