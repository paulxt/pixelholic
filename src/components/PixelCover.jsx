import { motion } from 'framer-motion'

const COLS = 12
const ROWS = 7
const CELLS = COLS * ROWS

const container = {
  hidden: {},
  cover: { transition: { staggerChildren: 0.01 } },
  reveal: { transition: { staggerChildren: 0.01, staggerDirection: -1 } },
}

/* Cells are rectangles, not squares (grid cols != rows), so rotation must land
   on a multiple of 180deg — 90/270 would swap width/height and leave a gap.
   Alternating 180 vs 540 (both == 180 mod 360) still gives every other cell a
   full extra spin, so the sweep still reads as "pixels rotating in". */
const cell = {
  hidden: { scale: 0, rotate: 0, opacity: 1 },
  cover: (i) => ({
    scale: 1.08,
    rotate: 180 + (i % 2) * 360,
    opacity: 1,
    transition: { duration: 0.32, ease: 'easeOut' },
  }),
  reveal: (i) => ({
    scale: 0,
    rotate: 360 + (i % 2) * 360,
    opacity: 1,
    transition: { duration: 0.32, ease: 'easeIn' },
  }),
}

/**
 * Full-screen pixel-dissolve wipe. `phase` drives the animation:
 * 'cover' fills the screen with rotating squares, 'reveal' spins them away.
 * Content swap should happen on the cover -> reveal handoff (see onCoverComplete).
 */
export default function PixelCover({ phase, color = '#4338CA', onCoverComplete, onRevealComplete }) {
  if (phase === 'idle') return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
      variants={container}
      initial="hidden"
      animate={phase}
      onAnimationComplete={(def) => {
        if (def === 'cover') onCoverComplete?.()
        if (def === 'reveal') onRevealComplete?.()
      }}
    >
      {Array.from({ length: CELLS }).map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={cell}
          style={{ backgroundColor: color }}
        />
      ))}
    </motion.div>
  )
}
