import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useTranslatedClients from '../hooks/useTranslatedClients'
import { withLang, langFromPathname } from '../utils/langPath'
import { PixelChar, SectionCorners } from '../components/PixelCharacters'
import { clientThemes } from '../components/ClientDetail'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

/* Mega Man stage-select pacing: panel blink → READY screen → warp in */
const BLINK_MS = 640
const READY_MS = 1000

/* ── Grid card (links to the case-study page) ─────── */
function ClientGridCard({ c, onOpen, blinking, t }) {
  const th = clientThemes[c.id]
  return (
    <button
      onClick={() => onOpen(c.id)}
      className={`group text-left w-full focus:outline-none${blinking ? ' stage-blink' : ''}`}
    >
      {/* Colored header */}
      <div className={`${th.hdrClass} relative overflow-hidden p-10 pb-14`} style={{ boxShadow: 'var(--shadow-md)' }}>
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Pixel char decoration — right */}
        <div className="absolute bottom-4 right-5 opacity-20 group-hover:opacity-30 transition-opacity">
          <PixelChar type={th.charType} color="#ffffff" size={8} />
        </div>
        {/* Pixel char decoration — left (smaller) */}
        <div className="absolute top-4 left-5 opacity-10 group-hover:opacity-20 transition-opacity">
          <PixelChar type={th.charType} color="#ffffff" size={4} />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="pixel-font text-white/60 text-[9px] tracking-widest block mb-6">
            // {c.themeTag.toUpperCase()}
          </span>
          <img
            src={c.logo}
            alt={`${c.name} logo`}
            className="block mb-4 mx-auto animate-float bg-white p-2"
            style={{ width: 72, height: 72, animationDelay: '0.2s', imageRendering: 'pixelated' }}
          />
          <h2 className="pixel-font text-white" style={{ fontSize: 'clamp(13px, 1.8vw, 18px)', lineHeight: 1.6 }}>
            {c.name}
          </h2>
        </div>
      </div>

      {/* White body */}
      <div
        className="bg-white p-8 group-hover:shadow-md transition-shadow text-center"
        style={{ boxShadow: 'var(--shadow-sm)', marginTop: -1 }}
      >
        <p className="text-slate-600 text-sm leading-loose mb-6 line-clamp-2">{c.tagline}</p>

        {/* Top metric — centered */}
        <div className="flex items-baseline gap-3 mb-6 justify-center" style={{ borderLeft: `3px solid ${c.color}`, paddingLeft: 14 }}>
          <span className="pixel-font font-bold" style={{ color: c.color, fontSize: '16px' }}>{c.metrics[0].value}</span>
          <span className="text-xs text-slate-500">{c.metrics[0].label}</span>
        </div>

        {/* Service tags — centered */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {c.services.slice(0, 3).map((s) => (
            <span key={s} className="text-[11px] font-medium" style={{ color: c.color }}>
              {s} ·
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-4 justify-center" style={{ color: c.color }}>
          {t('common.viewFullCase')} <span>→</span>
        </div>
      </div>
    </button>
  )
}

/* ── Page ────────────────────────────────────────── */
export default function ClientsPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const lang = langFromPathname(location.pathname)
  const clients = useTranslatedClients()
  const [transition, setTransition] = useState(null) // null | { id, phase: 'blink' | 'ready' }

  useEffect(() => {
    // Legacy deep links used /clients#id — forward them to the case-study route
    const hash = window.location.hash.slice(1)
    if (hash && clients.some((c) => c.id === hash)) {
      navigate(withLang(`/clients/${hash}`, lang), { replace: true })
      return
    }
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const openDetail = (id) => {
    if (transition) return
    setTransition({ id, phase: 'blink' })
  }

  const activeClient = transition ? clients.find((c) => c.id === transition.id) : null

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Seo title={t('meta.clientsTitle')} description={t('meta.clientsDescription')} />

      {/* READY screen — Mega Man stage intro */}
      {transition?.phase === 'ready' && activeClient && (
        <div
          className="fixed inset-0 z-[100] scanlines flex flex-col items-center justify-center gap-10"
          style={{ backgroundColor: '#0B1020' }}
        >
          <PixelChar type={clientThemes[activeClient.id].charType} color={activeClient.color} size={9} />
          <span className="pixel-font text-white tracking-[0.3em] animate-blink-fast" style={{ fontSize: 22 }}>
            READY
          </span>
        </div>
      )}

      <div className="pt-24 pb-32">
        <div className="page-wrap">

          {/* Page header — centered */}
          <div className="py-20 mb-16 relative grid-bg overflow-hidden text-center">
            <SectionCorners color="#4338CA" inset={16} opacity={0.2} />
            <div className="relative z-10">
              <div className="pixel-font text-[10px] text-indigo-400 mb-6 animate-pulse-glow tracking-widest">
                {t('clientsPage.tag')}
              </div>
              <h1 className="pixel-font text-slate-800 mb-8 mx-auto" style={{ fontSize: 'clamp(20px, 4vw, 36px)', lineHeight: 1.6 }}>
                {t('clientsPage.titleLine1')}<br />
                <span style={{ color: '#4338CA' }}>{t('clientsPage.titleLine2')}</span>
              </h1>
              <p className="text-slate-600 text-base leading-loose max-w-lg mx-auto">
                {t('clientsPage.sub')}
              </p>
            </div>
          </div>

          {/* 2×2 client grid */}
          <div className="grid sm:grid-cols-2 gap-7">
            {clients.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 100}>
                <div id={`client-${c.id}`} className="scroll-mt-28">
                  <ClientGridCard c={c} onOpen={openDetail} blinking={transition?.id === c.id} t={t} />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 float-card p-14 text-center">
            <div className="pixel-font text-[10px] text-indigo-400 mb-5 tracking-widest">{t('clientsPage.bottomTag')}</div>
            <h3 className="pixel-font text-slate-800 mb-5" style={{ fontSize: '18px', lineHeight: 1.6 }}>
              {t('clientsPage.bottomTitle')}
            </h3>
            <p className="text-slate-600 text-sm leading-loose mb-10 max-w-md mx-auto">
              {t('clientsPage.bottomSub')}
            </p>
            <Link
              to={withLang('/', lang)}
              onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
              className="pixel-btn"
            >
              {t('clientsPage.bottomCta')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
