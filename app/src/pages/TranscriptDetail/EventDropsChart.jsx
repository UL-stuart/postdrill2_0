import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import styles from './TranscriptDetail.module.css'

function buildLanes(transcript) {
  const order = []
  const seen = new Set()
  for (const row of transcript) {
    if (!seen.has(row.player)) { seen.add(row.player); order.push(row.player) }
  }
  return order.map(player => ({
    name: player,
    rows: transcript.map((row, i) => ({ ...row, index: i })).filter(r => r.player === player),
  }))
}

const LANE_HEIGHT = 40
const MARGIN = { top: 24, right: 20, bottom: 32, left: 120 }
const DOT_R = 4

export default function EventDropsChart({ transcript, onDropClick }) {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current || !transcript?.length) return

    const lanes = buildLanes(transcript)
    const times = transcript.map(r => r.datetime)
    const [tMin, tMax] = d3.extent(times)

    const totalWidth = svgRef.current.getBoundingClientRect().width || 800
    const innerW = totalWidth - MARGIN.left - MARGIN.right
    const innerH = lanes.length * LANE_HEIGHT
    const totalHeight = innerH + MARGIN.top + MARGIN.bottom

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.attr('height', totalHeight)

    const xScale = d3.scaleTime()
      .domain([new Date(tMin.getTime() - 30_000), new Date(tMax.getTime() + 30_000)])
      .range([0, innerW])

    const g = svg.append('g').attr('transform', `translate(${MARGIN.left},${MARGIN.top})`)

    // X axis
    g.append('g')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d => d3.timeFormat('%H:%M')(d)))
      .call(ax => ax.select('.domain').remove())

    // Lane rows
    lanes.forEach((lane, li) => {
      const y = li * LANE_HEIGHT + LANE_HEIGHT / 2

      // Lane label
      g.append('text')
        .attr('x', -8).attr('y', y).attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .attr('font-size', '11px')
        .attr('fill', '#6b7280')
        .text(lane.name.length > 14 ? lane.name.slice(0, 13) + '…' : lane.name)

      // Lane baseline
      g.append('line')
        .attr('x1', 0).attr('x2', innerW).attr('y1', y).attr('y2', y)
        .attr('stroke', '#e2e5ea').attr('stroke-width', 1)

      // Dots
      g.selectAll(null)
        .data(lane.rows)
        .join('circle')
        .attr('cx', d => xScale(d.datetime))
        .attr('cy', y)
        .attr('r', DOT_R)
        .attr('fill', lane.name === 'PLAYER' ? '#1d4ed8' : '#9ca3af')
        .attr('cursor', 'pointer')
        .on('click', (event, d) => onDropClick && onDropClick(d))
        .append('title')
        .text(d => `${d.player} — ${d.message?.slice(0, 60) ?? ''}`)
    })
  }, [transcript])

  return (
    <div className={styles.chartContainer}>
      <svg ref={svgRef} width="100%" className={styles.chartSvg} />
    </div>
  )
}
