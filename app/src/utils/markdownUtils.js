export function stripBlockquote(text) {
  return text.split('\n').map(l => l.replace(/^>\s*/, '')).join('\n').trim()
}
