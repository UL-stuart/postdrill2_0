import { useRef, useLayoutEffect, useState } from 'react'
import styles from './TranscriptDetail.module.css'

function fmtElapsed(ms) {
  const s = Math.round(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `+${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `+${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function TranscriptTimeline({ transcript, sessionStates }) {
  const sidebarRef = useRef(null)
  const [markers, setMarkers] = useState([])

  useLayoutEffect(() => {
    if (!sidebarRef.current || !transcript.length || !sessionStates.length) return
    const sidebarRect = sidebarRef.current.getBoundingClientRect()
    const t0 = sessionStates[0].timestamp

    const computed = sessionStates.map(event => {
      let nearestIdx = 0, minDiff = Infinity
      transcript.forEach((row, i) => {
        const diff = Math.abs(row.datetime - event.timestamp)
        if (diff < minDiff) { minDiff = diff; nearestIdx = i }
      })

      const rowEl = document.getElementById(`tx-row-${nearestIdx}`)
      if (!rowEl) return null
      const rowRect = rowEl.getBoundingClientRect()
      const top = rowRect.top - sidebarRect.top + rowRect.height / 2

      return {
        top,
        elapsed: fmtElapsed(event.timestamp - t0),
        label: event.state.replace(/_/g, ' '),
      }
    }).filter(Boolean)

    setMarkers(computed)
  }, [transcript, sessionStates])

  return (
    <div ref={sidebarRef} className={styles.sidebar}>
      <div className={styles.rail} />
      {markers.map((m, i) => (
        <div key={i} className={styles.marker} style={{ top: m.top }}>
          <div className={styles.dot} />
          <div className={styles.markerLabels}>
            <span className={styles.markerElapsed}>{m.elapsed}</span>
            <span className={styles.markerState}>{m.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
