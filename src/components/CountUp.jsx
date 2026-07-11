import { useEffect, useState } from 'react'
import useInView from '../hooks/useInView'

/* Arcade score roll-up for values like "+286%", "2,600+", "8.4x", "6年".
   Non-numeric values (e.g. "A.S.O.", "售罄") render as-is. */
export default function CountUp({ value, duration = 900 }) {
  const [ref, inView] = useInView()
  const match = typeof value === 'string' ? value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/) : null
  const [display, setDisplay] = useState(match ? '0' : value)

  useEffect(() => {
    if (!inView || !match) return
    const target = parseFloat(match[2].replace(/,/g, ''))
    const decimals = (match[2].split('.')[1] || '').length
    const hasComma = match[2].includes(',')
    const format = (n) => {
      const fixed = Number(n.toFixed(decimals))
      return hasComma
        ? fixed.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : fixed.toFixed(decimals)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(format(target))
      return
    }

    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - p) ** 2
      setDisplay(format(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  if (!match) return value
  return (
    <span ref={ref}>
      {match[1]}{display}{match[3]}
    </span>
  )
}
