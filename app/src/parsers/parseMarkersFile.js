import { splitAtH2, parseRatedBlock } from './parseUtils.js'

const MARKER_ID_RE = /^([LCMK]\d+)\s+[—–-]+\s+(.+)$/

export function parseMarkersFile(text) {
  const sections = splitAtH2(text)
  const markers = []
  let scoreSummary = null, caveats = null

  for (const { heading, body } of sections) {
    if (heading === 'Score Summary') scoreSummary = body.trim().replace(/\n?---\s*$/, '').trim()
    else if (heading === 'Caveats') caveats = body.trim().replace(/\n?---\s*$/, '').trim()
    else {
      const m = MARKER_ID_RE.exec(heading)
      if (m) markers.push(parseRatedBlock(m[1], m[2].trim(), body))
    }
  }

  return { markers, scoreSummary, caveats }
}
