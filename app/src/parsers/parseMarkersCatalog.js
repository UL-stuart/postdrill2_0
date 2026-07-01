/**
 * Parses markers-catalog.md into a lookup of markerId → "What to look for" description.
 * Each entry is a ### heading like "L1. Label [🔧]" with a "- **What to look for:**" bullet.
 */
export function parseMarkersCatalog(text) {
  const result = {}
  const chunks = text.split(/\n### /)
  for (const chunk of chunks) {
    const firstLine = chunk.split('\n')[0]
    const idMatch = firstLine.match(/^([LCMK]\d+)\./)
    if (!idMatch) continue
    const id = idMatch[1]
    const wtlfMatch = chunk.match(/- \*\*What to look for:\*\*\s*(.+)/)
    if (wtlfMatch) result[id] = wtlfMatch[1].trim()
  }
  return result
}
