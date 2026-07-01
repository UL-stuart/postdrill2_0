import { useRef, useLayoutEffect, useState, Fragment } from 'react'
import styles from './ReportOverview.module.css'

function fmtElapsed(ms) {
  const s = Math.round(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `+${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `+${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

function computeGaps(sessionStates) {
  return sessionStates.slice(0, -1).map((entry, i) =>
    sessionStates[i + 1].timestamp - entry.timestamp
  )
}

export default function Timeline({ sessionStates }) {
  const gaps = computeGaps(sessionStates)
  const t0 = sessionStates[0]?.timestamp ?? 0
  const labelRefs = useRef([])
  const [bottomPad, setBottomPad] = useState(16)

  useLayoutEffect(() => {
    const widths = labelRefs.current.filter(Boolean).map(el => el.offsetWidth)
    const maxW = Math.max(0, ...widths)
    if (maxW > 0) setBottomPad(maxW + 16)
  }, [sessionStates])

  return (
    <section className={`card ${styles.timelineCard}`}>
      <h2 className={styles.sectionHeading}>Timeline</h2>
      <div className={styles.timelineWrapper} style={{ paddingBottom: bottomPad }}>
        <div className={styles.timelineRail} />
        <div className={styles.timeline}>
          {sessionStates.map((entry, i) => (
            <Fragment key={i}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <span className={styles.timelineTs}>{fmtElapsed(entry.timestamp - t0)}</span>
                <span
                  ref={el => { labelRefs.current[i] = el }}
                  className={styles.timelineLabel}
                >
                  {entry.state.replace(/_/g, ' ')}
                </span>
              </div>
              {i < sessionStates.length - 1 && (
                <div className={styles.timelineGap} style={{ flexGrow: gaps[i] }} />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
