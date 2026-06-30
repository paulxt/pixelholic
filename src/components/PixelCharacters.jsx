/* Pure CSS pixel-art characters using div grids — no images needed */

const COLORS = {
  primary: '#4338CA',
  cyan: '#0891B2',
  green: '#059669',
  coral: '#EA580C',
  purple: '#7C3AED',
  amber: '#D97706',
}

/* 8×8 pixel grid painter */
function PixelGrid({ pixels, color, size = 6, className = '' }) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(8, ${size}px)`,
        gridTemplateRows: `repeat(8, ${size}px)`,
        gap: 1,
        imageRendering: 'pixelated',
      }}
    >
      {pixels.map((row, y) =>
        row.split('').map((cell, x) => (
          <div
            key={`${y}-${x}`}
            style={{
              width: size,
              height: size,
              backgroundColor: cell === '1' ? color : cell === '2' ? '#fff' : 'transparent',
            }}
          />
        )),
      )}
    </div>
  )
}

/* Pixel character: rocket */
const ROCKET = [
  '00011000',
  '00111100',
  '01111110',
  '11111111',
  '01111110',
  '00100100',
  '01100110',
  '00000000',
]

/* Pixel character: star */
const STAR = [
  '00010000',
  '00010000',
  '01111100',
  '00111000',
  '01101100',
  '11000110',
  '00000000',
  '00000000',
]

/* Pixel character: alien */
const ALIEN = [
  '01100110',
  '11111111',
  '11011011',
  '11111111',
  '01111110',
  '00100100',
  '01011010',
  '10000001',
]

/* Pixel character: robot head */
const ROBOT = [
  '01111110',
  '11111111',
  '10110101',
  '11111111',
  '01111110',
  '00111100',
  '01111110',
  '01100110',
]

/* Pixel character: heart */
const HEART = [
  '01100110',
  '11111111',
  '11111111',
  '01111110',
  '00111100',
  '00011000',
  '00000000',
  '00000000',
]

/* Pixel character: lightning */
const BOLT = [
  '00011100',
  '00111000',
  '01110000',
  '11111110',
  '00011100',
  '00111000',
  '01110000',
  '00000000',
]

const CHARACTERS = [
  { data: ALIEN,  color: COLORS.primary,  label: 'alien'  },
  { data: ROCKET, color: COLORS.cyan,     label: 'rocket' },
  { data: ROBOT,  color: COLORS.purple,   label: 'robot'  },
  { data: HEART,  color: COLORS.coral,    label: 'heart'  },
  { data: STAR,   color: COLORS.amber,    label: 'star'   },
  { data: BOLT,   color: COLORS.green,    label: 'bolt'   },
]

/* Decorative scattered pixel characters — distributed on both left and right sides */
export function PixelScatter({ count = 4, className = '' }) {
  const picks = CHARACTERS.slice(0, count)
  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {picks.map((c, i) => {
        const onLeft = i % 2 === 0
        return (
          <div
            key={c.label}
            className="absolute animate-float"
            style={{
              top:  `${12 + i * 20}%`,
              ...(onLeft ? { left: `${2 + (i % 3) * 1.5}%` } : { right: `${2 + (i % 3) * 1.5}%` }),
              opacity: 0.12,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3.5 + i * 0.5}s`,
            }}
          >
            <PixelGrid pixels={c.data} color={c.color} size={5} />
          </div>
        )
      })}
    </div>
  )
}

/* Single character for inline decoration */
export function PixelChar({ type = 'alien', color, size = 6, className = '' }) {
  const map = { alien: ALIEN, rocket: ROCKET, robot: ROBOT, heart: HEART, star: STAR, bolt: BOLT }
  const data = map[type] || ALIEN
  const col = color || COLORS.primary
  return <PixelGrid pixels={data} color={col} size={size} className={className} />
}

/* Hero section pixel cluster — both left and right floating decorations */
export function PixelHeroDecor({ accentColor = '#4338CA' }) {
  return (
    <>
      {/* Right side — 4 characters, slightly larger */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-8 pointer-events-none select-none opacity-20 hidden xl:flex">
        {CHARACTERS.slice(0, 4).map((c, i) => (
          <div key={c.label} className="animate-float" style={{ animationDelay: `${i * 0.6}s`, animationDuration: `${3 + i * 0.4}s` }}>
            <PixelGrid pixels={c.data} color={accentColor} size={5} />
          </div>
        ))}
      </div>
      {/* Left side — 3 characters, slightly smaller & offset */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-10 pointer-events-none select-none opacity-14 hidden xl:flex" style={{ opacity: 0.14 }}>
        {CHARACTERS.slice(2, 5).map((c, i) => (
          <div key={c.label} className="animate-float" style={{ animationDelay: `${i * 0.9 + 0.4}s`, animationDuration: `${3.5 + i * 0.5}s` }}>
            <PixelGrid pixels={c.data} color={accentColor} size={4} />
          </div>
        ))}
      </div>
    </>
  )
}

/* Pixel-art corner bracket decorations for sections */
export function SectionCorners({ color = '#4338CA', size = 22, thickness = 3, inset = 18, opacity = 0.18 }) {
  const corners = [
    { top: inset, left: inset,   bars: [{ top: 0, left: 0, w: size, h: thickness }, { top: 0, left: 0, w: thickness, h: size }] },
    { top: inset, right: inset,  bars: [{ top: 0, right: 0, w: size, h: thickness }, { top: 0, right: 0, w: thickness, h: size }] },
    { bottom: inset, left: inset,  bars: [{ bottom: 0, left: 0, w: size, h: thickness }, { bottom: 0, left: 0, w: thickness, h: size }] },
    { bottom: inset, right: inset, bars: [{ bottom: 0, right: 0, w: size, h: thickness }, { bottom: 0, right: 0, w: thickness, h: size }] },
  ]
  return (
    <>
      {corners.map((corner, ci) => {
        const { bars, ...pos } = corner
        return (
          <div
            key={ci}
            style={{ position: 'absolute', width: size, height: size, opacity, pointerEvents: 'none', ...pos }}
          >
            {bars.map((bar, bi) => (
              <div
                key={bi}
                style={{
                  position: 'absolute',
                  width: bar.w,
                  height: bar.h,
                  top: bar.top,
                  left: bar.left,
                  right: bar.right,
                  bottom: bar.bottom,
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        )
      })}
    </>
  )
}

export default PixelChar
