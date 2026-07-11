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
              backgroundColor:
                cell === '1' ? color : cell === '2' ? '#fff' : cell === '3' ? '#1E293B' : 'transparent',
            }}
          />
        )),
      )}
    </div>
  )
}

/* Pixel character: rocket (with porthole window) */
const ROCKET = [
  '00011000',
  '00111100',
  '01122110',
  '11122111',
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

/* Pixel character: heart (with a face) */
const HEART = [
  '01100110',
  '11111111',
  '11311311',
  '11111111',
  '01133110',
  '00111100',
  '00011000',
  '00000000',
]

/* Pixel character: ghost (arcade style, with eyes) */
const GHOST = [
  '00111100',
  '01111110',
  '11311311',
  '11311311',
  '11111111',
  '11111111',
  '11111111',
  '11011011',
]

/* Pixel character: crown (with gems) */
const CROWN = [
  '00000000',
  '10100101',
  '11100111',
  '11111111',
  '12112121',
  '11111111',
  '01111110',
  '00000000',
]

/* Pixel character: coin (with a face) */
const COIN = [
  '00111100',
  '01111110',
  '11311311',
  '11111111',
  '11133111',
  '01111110',
  '00111100',
  '00000000',
]

/* Pixel character: mushroom (power-up, with eyes) */
const MUSHROOM = [
  '00111100',
  '01211210',
  '11211211',
  '11111111',
  '01311310',
  '01111110',
  '00111100',
  '00000000',
]

/* Pixel icon: flag (brand positioning) */
const FLAG = [
  '01111110',
  '01111111',
  '01111110',
  '01111100',
  '01000000',
  '01000000',
  '01000000',
  '11100000',
]

/* Pixel icon: speech bubble (social) */
const SPEECH = [
  '01111110',
  '11111111',
  '11313131',
  '11111111',
  '01111110',
  '00110000',
  '00100000',
  '00000000',
]

/* Pixel icon: bullseye target (precise ad targeting) */
const TARGET = [
  '00111100',
  '01111110',
  '11233211',
  '11233211',
  '01111110',
  '00111100',
  '00000000',
  '00000000',
]

/* Pixel icon: TV with play button (video content) */
const TV = [
  '01000010',
  '00100100',
  '11111111',
  '12232221',
  '12233221',
  '12232221',
  '11111111',
  '00000000',
]

/* Pixel icon: shopping cart (e-commerce) */
const CART = [
  '11000000',
  '01111111',
  '01111111',
  '01111111',
  '00111110',
  '00000000',
  '01100110',
  '00000000',
]

/* Pixel icon: rising bar chart (analytics) */
const CHART = [
  '00000011',
  '00000011',
  '00011011',
  '00011011',
  '11011011',
  '11011011',
  '11011011',
  '00000000',
]

/* Pixel icon: crosshair (pixel precision) */
const CROSSHAIR = [
  '00011000',
  '00011000',
  '00011000',
  '11133111',
  '11133111',
  '00011000',
  '00011000',
  '00011000',
]

/* Pixel icon: lightbulb (creativity) */
const BULB = [
  '00111100',
  '01111110',
  '01121110',
  '01111110',
  '00111100',
  '00133100',
  '00111100',
  '00011000',
]

/* Pixel icon: magnifier (data insight) */
const MAGNIFIER = [
  '00111000',
  '01222100',
  '01222100',
  '00111000',
  '00001100',
  '00000110',
  '00000000',
  '00000000',
]

/* Pixel icon: mail envelope */
const MAIL = [
  '00000000',
  '11111111',
  '11100111',
  '11011011',
  '10111101',
  '11111111',
  '11111111',
  '00000000',
]

/* Pixel icon: mobile phone */
const PHONE = [
  '00111100',
  '00133100',
  '00133100',
  '00133100',
  '00133100',
  '00111100',
  '00111100',
  '00000000',
]

/* Pixel icon: location pin */
const PIN = [
  '00111100',
  '01111110',
  '01133110',
  '01133110',
  '01111110',
  '00111100',
  '00011000',
  '00011000',
]

/* Pixel icon: clock */
const CLOCK = [
  '00111100',
  '01111110',
  '11131111',
  '11131111',
  '11133111',
  '11111111',
  '01111110',
  '00111100',
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
  const map = {
    alien: ALIEN, rocket: ROCKET, robot: ROBOT, heart: HEART, star: STAR, bolt: BOLT,
    ghost: GHOST, crown: CROWN, coin: COIN, mushroom: MUSHROOM,
    mail: MAIL, phone: PHONE, pin: PIN, clock: CLOCK,
    flag: FLAG, speech: SPEECH, target: TARGET, tv: TV, cart: CART,
    chart: CHART, crosshair: CROSSHAIR, bulb: BULB, magnifier: MAGNIFIER,
  }
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
