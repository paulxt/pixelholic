import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { withLang } from '../utils/langPath'

/* Mega Man stage-select pacing: panel blink → READY screen → warp in */
const BLINK_MS = 640
const READY_MS = 1000

/**
 * Drives the stage-select transition into a case-study page.
 * Returns { transition, start }: call start(clientId) on click; `transition`
 * is null | { id, phase: 'blink' | 'ready' } for rendering the blink class
 * and the READY overlay.
 */
export default function useStageTransition(lang) {
  const navigate = useNavigate()
  const [transition, setTransition] = useState(null)

  useEffect(() => {
    if (!transition) return
    if (transition.phase === 'blink') {
      const timer = setTimeout(() => setTransition({ id: transition.id, phase: 'ready' }), BLINK_MS)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(
      () => navigate(withLang(`/clients/${transition.id}`, lang), { state: { stage: true } }),
      READY_MS,
    )
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transition])

  const start = (id) => {
    if (!transition) setTransition({ id, phase: 'blink' })
  }

  return { transition, start }
}
