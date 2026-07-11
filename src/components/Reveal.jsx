import useInView from '../hooks/useInView'

/* Wraps children in a stepped pixel pop-in when scrolled into view */
export default function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`${className} ${inView ? 'pixel-reveal-in' : 'pixel-reveal'}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
