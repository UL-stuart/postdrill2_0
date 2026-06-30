import { splitAtH2, parseRatedBlock } from './parseUtils.js'

const FACET_ID_RE = /^(F\d+)\s+[—–-]+\s+(.+)$/

export function parseFacetsFile(text) {
  const sections = splitAtH2(text)
  const facets = []
  let scoreSummary = null, caveats = null

  for (const { heading, body } of sections) {
    if (heading === 'Score Summary') scoreSummary = body.trim().replace(/\n?---\s*$/, '').trim()
    else if (heading === 'Caveats') caveats = body.trim().replace(/\n?---\s*$/, '').trim()
    else {
      const m = FACET_ID_RE.exec(heading)
      if (m) facets.push(parseRatedBlock(m[1], m[2].trim(), body))
    }
  }

  return { facets, scoreSummary, caveats }
}
