import styles from './ActivityCalendar.module.css'

const SHORT_DAYS = ['Mon', '', 'Wed', '', 'Fri', '', '']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function toUTCDay(d) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

// Monday-based: Mon=0 … Sun=6
function dow(d) {
  return (d.getUTCDay() + 6) % 7
}

function addDays(d, n) {
  const r = new Date(d)
  r.setUTCDate(r.getUTCDate() + n)
  return r
}

export default function ActivityCalendar({ sessions, start, end }) {
  if (!sessions.length) {
    return <p className={styles.empty}>No sessions recorded yet</p>
  }

  const activeDays = new Set(sessions.map(s => toUTCDay(new Date(s.date)).toISOString()))

  // Pad to complete weeks (Mon–Sun)
  const gridStart = toUTCDay(start)
  gridStart.setUTCDate(gridStart.getUTCDate() - dow(gridStart))

  const gridEnd = toUTCDay(end)
  gridEnd.setUTCDate(gridEnd.getUTCDate() + (6 - dow(gridEnd)))

  // Build week columns: each week = array of 7 days (Mon..Sun)
  const weeks = []
  let d = new Date(gridStart)
  while (d <= gridEnd) {
    const week = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(d)
      week.push({
        iso: day.toISOString().slice(0, 10),
        date: day,
        active: activeDays.has(day.toISOString()),
        inRange: day >= toUTCDay(start) && day <= toUTCDay(end),
      })
      d = addDays(d, 1)
    }
    weeks.push(week)
  }

  // Month labels: emit label when a new month starts in the first row (Monday of the week)
  const monthLabels = weeks.map(week => {
    const mon = week[0]
    return mon.date.getUTCDate() <= 7 ? MONTHS[mon.date.getUTCMonth()] : ''
  })

  return (
    <div className={styles.wrapper}>
      {/* Month label row */}
      <div className={styles.monthRow}>
        <div className={styles.dayLabelCell} />
        {weeks.map((_, i) => (
          <div key={i} className={styles.monthLabelCell}>{monthLabels[i]}</div>
        ))}
      </div>

      {/* 7 day rows */}
      {SHORT_DAYS.map((label, dayIdx) => (
        <div key={dayIdx} className={styles.dayRow}>
          <div className={styles.dayLabelCell}>{label}</div>
          {weeks.map((week, wi) => {
            const cell = week[dayIdx]
            return (
              <div
                key={wi}
                className={`${styles.cell} ${
                  !cell.inRange ? styles.cellOut :
                  cell.active  ? styles.cellActive :
                                 styles.cellEmpty
                }`}
                title={cell.inRange ? cell.iso : ''}
              />
            )
          })}
        </div>
      ))}

      <div className={styles.legend}>
        <span className={`${styles.legendCell} ${styles.cellEmpty}`} /> No drill
        <span className={`${styles.legendCell} ${styles.cellActive}`} /> Drill played
      </div>
    </div>
  )
}
