// Pixel-grid brand mark. Geometry mirrors public/favicon.svg — keep both in sync.
const SQUARES = [
  { x: 186, y: 182, s: 124, rx: 8, fill: '#22A8C4', o: 0.45 },
  { x: 394, y: 92, s: 172, rx: 11, fill: '#4338CA', o: 1 },
  { x: 656, y: 178, s: 124, rx: 8, fill: '#5B4FD6', o: 0.9 },
  { x: 92, y: 394, s: 172, rx: 11, fill: '#0891B2', o: 0.55 },
  { x: 350, y: 350, s: 260, rx: 16, fill: '#EA580C', o: 1 },
  { x: 696, y: 394, s: 172, rx: 11, fill: '#0891B2', o: 0.95 },
  { x: 186, y: 654, s: 116, rx: 7, fill: '#5B4FD6', o: 0.6 },
  { x: 394, y: 692, s: 172, rx: 11, fill: '#4338CA', o: 0.75 },
  { x: 654, y: 658, s: 116, rx: 7, fill: '#22A8C4', o: 0.8 },
]

/**
 * @param {number} size  rendered px (square)
 * @param {'light'|'dark'} on  background it sits on — dark lifts the faint
 *   squares so they don't sink into slate-900
 */
export default function Logo({ size = 28, on = 'light', className = '' }) {
  const lift = on === 'dark' ? (o) => 0.55 + o * 0.45 : (o) => o

  return (
    <svg
      width={size}
      height={size}
      viewBox="84 84 792 792"
      className={className}
      role="img"
      aria-label="PIXELHOLIC"
    >
      {SQUARES.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width={s.s}
          height={s.s}
          rx={s.rx}
          fill={s.fill}
          opacity={lift(s.o)}
        />
      ))}
    </svg>
  )
}
