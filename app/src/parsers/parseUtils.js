export function splitAtH2(text) {
  const result = []
  const regex = /^## (.+)$/gm
  let lastHeading = null, lastIndex = 0, match
  while ((match = regex.exec(text)) !== null) {
    if (lastHeading !== null) result.push({ heading: lastHeading, body: text.slice(lastIndex, match.index) })
    lastHeading = match[1].trim()
    lastIndex = match.index + match[0].length
  }
  if (lastHeading !== null) result.push({ heading: lastHeading, body: text.slice(lastIndex) })
  return result
}

export function parseRatedBlock(id, name, body) {
  const ratingMatch = body.match(/\*\*Rating:\*\*\s*(.+)/)
  if (!ratingMatch) throw new Error(`Missing **Rating:** in block ${id}`)
  const ratingStr = ratingMatch[1].trim()
  let rating
  if (ratingStr === 'N/A') {
    rating = 'N/A'
  } else {
    rating = parseInt(ratingStr, 10)
    if (isNaN(rating) || rating < 1 || rating > 4)
      throw new Error(`Rating "${ratingStr}" is out of range in block ${id} — expected 1–4 or N/A`)
  }
  const evidenceMatch = body.match(/\*\*Evidence:\*\*\n([\s\S]*?)(?=\n\*\*Rationale:\*\*)/)
  const evidence = evidenceMatch ? evidenceMatch[1].trim() : ''
  const rationaleMatch = body.match(/\*\*Rationale:\*\*\n([\s\S]*)/)
  const rationale = rationaleMatch ? rationaleMatch[1].trim().replace(/\n?---\s*$/, '').trim() : ''
  return { id, name, rating, evidence, rationale }
}
