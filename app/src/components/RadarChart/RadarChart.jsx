import styles from './RadarChart.module.css'

const VIEW_W = 520
const VIEW_H = 440
const CX = 260
const CY = 220
const R_MAX = 118
const RINGS = [1, 2, 3, 4]
const LABEL_GAP = 18

function axisAngle(i, n) {
  return (2 * Math.PI * i / n) - Math.PI / 2
}

function polarToXY(cx, cy, angle, r) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
}

function valueToR(val, scaleMax) {
  return ((val ?? 0) / scaleMax) * R_MAX
}

function toPathD(points) {
  if (!points.length) return ''
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + ' Z'
}

function dimensionPoints(dimensions, getter, scaleMax) {
  return dimensions.map((dim, i) => {
    const angle = axisAngle(i, dimensions.length)
    const r = valueToR(getter(dim.key), scaleMax)
    return polarToXY(CX, CY, angle, r)
  })
}

function getLabelProps(angle) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const dist = R_MAX + LABEL_GAP
  const x = CX + dist * cos
  const y = CY + dist * sin

  let anchor = 'middle'
  if (cos > 0.3) anchor = 'start'
  else if (cos < -0.3) anchor = 'end'

  let baseline = 'middle'
  if (sin < -0.3) baseline = 'auto'
  else if (sin > 0.3) baseline = 'hanging'

  return { x, y, anchor, baseline }
}

function RadarLabel({ label, angle }) {
  const { x, y, anchor, baseline } = getLabelProps(angle)
  const words = label.split(' ')
  const LINE_H = 13

  // Split into lines of max 2 words
  const lines = []
  for (let i = 0; i < words.length; i += 2) {
    lines.push(words.slice(i, i + 2).join(' '))
  }

  // Vertical centering: shift first dy so block is centred at y
  const totalH = lines.length * LINE_H
  let startY = y
  if (baseline === 'middle') startY = y - (totalH / 2) + LINE_H * 0.35
  else if (baseline === 'auto') startY = y - totalH + LINE_H * 0.35
  else startY = y  // hanging

  return (
    <text textAnchor={anchor} fontSize="11" fill="var(--color-text-muted)">
      {lines.map((line, i) => (
        <tspan key={i} x={x} y={startY + i * LINE_H}>{line}</tspan>
      ))}
    </text>
  )
}

export default function RadarChart({ dimensions, stats, scaleMax = 4 }) {
  const n = dimensions.length

  const avgPoints = dimensionPoints(dimensions, k => stats[k]?.avg, scaleMax)
  const minPoints = dimensionPoints(dimensions, k => stats[k]?.min, scaleMax)
  const maxPoints = dimensionPoints(dimensions, k => stats[k]?.max, scaleMax)

  const ringPoints = (r) =>
    dimensions.map((_, i) => polarToXY(CX, CY, axisAngle(i, n), r))

  return (
    <div className={styles.root}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className={styles.svg} aria-hidden="true">

        {/* Grid rings */}
        {RINGS.map(v => {
          const r = valueToR(v, scaleMax)
          const pts = ringPoints(r)
          return (
            <polygon
              key={v}
              points={pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1"
            />
          )
        })}

        {/* Ring value labels (on the top axis) */}
        {RINGS.map(v => {
          const r = valueToR(v, scaleMax)
          const angle = axisAngle(0, n)
          const pt = polarToXY(CX, CY, angle, r)
          return (
            <text key={v} x={pt.x + 4} y={pt.y} fontSize="9" fill="var(--color-text-muted)" dominantBaseline="middle">
              {v}
            </text>
          )
        })}

        {/* Axes */}
        {dimensions.map((_, i) => {
          const angle = axisAngle(i, n)
          const tip = polarToXY(CX, CY, angle, R_MAX)
          return (
            <line
              key={i}
              x1={CX} y1={CY}
              x2={tip.x.toFixed(2)} y2={tip.y.toFixed(2)}
              stroke="var(--color-border)"
              strokeWidth="1"
            />
          )
        })}

        {/* Max polygon (back) */}
        <path
          d={toPathD(maxPoints)}
          fill="#dbeafe"
          fillOpacity="0.4"
          stroke="#93c5fd"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Min polygon */}
        <path
          d={toPathD(minPoints)}
          fill="#e0e7ff"
          fillOpacity="0.5"
          stroke="#a5b4fc"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Avg polygon (front) */}
        <path
          d={toPathD(avgPoints)}
          fill="var(--color-accent)"
          fillOpacity="0.15"
          stroke="var(--color-accent)"
          strokeWidth="2"
        />

        {/* Avg dots */}
        {avgPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--color-accent)" />
        ))}

        {/* Axis labels */}
        {dimensions.map((dim, i) => (
          <RadarLabel key={dim.key} label={dim.label} angle={axisAngle(i, n)} />
        ))}

      </svg>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swatchAvg}`} /> Avg
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swatchMin}`} /> Min
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swatchMax}`} /> Max
        </span>
      </div>
    </div>
  )
}
