import { useEffect, useRef, useState } from 'react'

/* One-shot in-view detection; resolves immediately under reduced motion */
export default function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      // Fire slightly before the element scrolls into view so fast
      // scrolling never shows blank gaps waiting to pop in
      { threshold, rootMargin: '0px 0px 120px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, inView]
}
