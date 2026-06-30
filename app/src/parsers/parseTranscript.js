import Papa from 'papaparse'

export function parseTranscript(csvText) {
  const { data, errors } = Papa.parse(csvText.trim(), { header: true, skipEmptyLines: true })
  const fatal = errors.filter(e => e.type === 'Abort')
  if (fatal.length > 0) throw new Error(`Transcript CSV parse error: ${fatal[0].message}`)

  return data.map((row, i) => {
    if (!row.datetime || !row.player || !row.channel)
      throw new Error(`Transcript row ${i + 2} is missing required fields`)
    return { datetime: new Date(row.datetime), player: row.player, channel: row.channel, message: row.message ?? '' }
  })
}
