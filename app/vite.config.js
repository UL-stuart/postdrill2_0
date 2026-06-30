import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_ROOT = path.resolve(__dirname, '..')

function uplabsDataPlugin() {
  return {
    name: 'uptime-labs-data',
    configureServer(server) {
      server.middlewares.use('/api/sessions', (req, res, next) => {
        if (req.method !== 'GET') return next()
        try {
          const readoutsDir = path.join(DATA_ROOT, 'readouts')
          const sessionIds = fs.readdirSync(readoutsDir)
            .filter(d => fs.statSync(path.join(readoutsDir, d)).isDirectory())
            .sort()

          const transcriptFiles = fs.readdirSync(path.join(DATA_ROOT, 'transcripts'))
            .filter(f => f.endsWith('.csv'))

          const sessions = sessionIds.map(sessionId => {
            const matches = transcriptFiles.filter(f => f.endsWith(`-${sessionId}.csv`))
            if (matches.length === 0) throw new Error(`No transcript for session ${sessionId}`)
            if (matches.length > 1) throw new Error(`Multiple transcripts for session ${sessionId}: ${matches.join(', ')}`)
            return { sessionId, playerName: matches[0].replace(`-${sessionId}.csv`, ''), drillName: 'Snipe Hunt' }
          })

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(sessions))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message }))
        }
      })

      server.middlewares.use('/data', (req, res, next) => {
        if (req.method !== 'GET') return next()
        const relPath = decodeURIComponent(req.url).replace(/^\/data\//, '').replace(/^\//, '')
        const filePath = path.resolve(DATA_ROOT, relPath)
        if (!filePath.startsWith(DATA_ROOT)) { res.statusCode = 403; res.end('Forbidden'); return }
        try {
          const content = fs.readFileSync(filePath, 'utf8')
          res.setHeader('Content-Type', path.extname(filePath) === '.csv' ? 'text/csv' : 'text/plain; charset=utf-8')
          res.end(content)
        } catch {
          res.statusCode = 404
          res.end(`Not found: ${req.url}`)
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), uplabsDataPlugin()],
  test: { environment: 'node', globals: true, env: { TZ: 'UTC' } }
})
