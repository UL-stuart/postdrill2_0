export function parseFinalReport(text) {
  const startRe = /\n## Looking (?:Ahead|Forward)\n/
  const startMatch = startRe.exec(text)
  if (!startMatch) throw new Error('Missing "## Looking Ahead" (or "Looking Forward") section in final report')
  const rest = text.slice(startMatch.index + startMatch[0].length)
  const nextHeading = /\n## /.exec(rest)
  return { lookingAhead: (nextHeading ? rest.slice(0, nextHeading.index) : rest).trim() }
}
