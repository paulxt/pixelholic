import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useTranslatedClients from '../hooks/useTranslatedClients'
import { withLang, langFromPathname } from '../utils/langPath'
import { PixelChar, SectionCorners } from '../components/PixelCharacters'
import PixelCover from '../components/PixelCover'

/* ── Theme map (styling only — text comes from translations) ──────────── */
const themes = {
  kingcart:  { hdrClass: 'client-hdr-indigo', bgClass: 'client-bg-indigo', charType: 'bolt' },
  polaris:   { hdrClass: 'client-hdr-cyan',   bgClass: 'client-bg-cyan',   charType: 'rocket' },
  cmei:      { hdrClass: 'client-hdr-green',  bgClass: 'client-bg-green',  charType: 'heart' },
  yunyang:   { hdrClass: 'client-hdr-purple', bgClass: 'client-bg-purple', charType: 'alien' },
  woolbuddy: { hdrClass: 'client-hdr-orange', bgClass: 'client-bg-orange', charType: 'star' },
}

/* ── Grid card (collapsed view) ─────────────────── */
function ClientGridCard({ c, onOpen, t }) {
  const th = themes[c.id]
  return (
    <button
      onClick={() => onOpen(c.id)}
      className="group text-left w-full focus:outline-none"
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
          <h2 className="pixel-font text-white" style={{ fontSize: 'clamp(13px, 1.8vw, 18px)', lineHeight: 1.8 }}>
            {c.name}
          </h2>
        </div>
      </div>

      {/* White body */}
      <div
        className="bg-white p-8 group-hover:shadow-md transition-shadow text-center"
        style={{ boxShadow: 'var(--shadow-sm)', marginTop: -1 }}
      >
        <p className="text-slate-500 text-sm leading-loose mb-6 line-clamp-2">{c.tagline}</p>

        {/* Top metric — centered */}
        <div className="flex items-baseline gap-3 mb-6 justify-center" style={{ borderLeft: `3px solid ${c.color}`, paddingLeft: 14 }}>
          <span className="pixel-font font-bold" style={{ color: c.color, fontSize: '16px' }}>{c.metrics[0].value}</span>
          <span className="text-xs text-slate-400">{c.metrics[0].label}</span>
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

/* ── Expanded detail panel (full-screen overlay content) ──── */
function ClientDetail({ c, t }) {
  const th = themes[c.id]
  return (
    <div className="animate-fadeUp">
      {/* Colored header strip */}
      <div className={`${th.hdrClass} relative overflow-hidden`} style={{ boxShadow: 'var(--shadow-lg)' }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Large pixel char — right */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-10 hidden md:block">
          <PixelChar type={th.charType} color="#ffffff" size={20} />
        </div>
        {/* Large pixel char — left */}
        <div className="absolute left-6 bottom-4 opacity-8 hidden lg:block">
          <PixelChar type={th.charType} color="#ffffff" size={10} />
        </div>

        <div className="relative z-10 px-10 md:px-16 pt-24 pb-14 flex flex-col md:flex-row md:items-center gap-10">
          <img
            src={c.logo}
            alt={`${c.name} logo`}
            className="shrink-0 bg-white p-3 mx-auto md:mx-0"
            style={{ width: 96, height: 96, imageRendering: 'pixelated' }}
          />
          <div className="flex-1 text-center md:text-left">
            <div className="pixel-font text-white/60 text-[10px] tracking-widest mb-4">
              // {c.industry.toUpperCase()} · {c.period}
            </div>
            <h2 className="pixel-font text-white mb-3" style={{ fontSize: 'clamp(16px, 2.5vw, 26px)', lineHeight: 1.8 }}>
              {c.name}
            </h2>
            <p className="text-white/70 italic text-base leading-loose">"{c.tagline}"</p>
          </div>
        </div>

        {/* Service tags in header */}
        <div className="relative z-10 px-10 md:px-16 pb-10 flex flex-wrap gap-2 justify-center md:justify-start">
          {c.services.map((s) => (
            <span key={s} className="text-xs px-4 py-1.5 font-medium text-white/80" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Light body */}
      <div className={`${th.bgClass} px-10 md:px-16 py-14`} style={{ boxShadow: 'var(--shadow-sm)' }}>
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left 2/3: story */}
          <div className="lg:col-span-2 space-y-8">
            {/* Brand overview */}
            <div className="bg-white p-8 shadow-sm">
              <div className="pixel-font text-[10px] mb-5 tracking-widest text-center" style={{ color: c.color }}>{t('clientsPage.overviewTag')}</div>
              <p className="text-slate-500 text-sm leading-loose">{c.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 shadow-sm">
                <div className="pixel-font text-[10px] mb-5 text-slate-300 tracking-widest text-center">{t('clientsPage.challengeTag')}</div>
                <p className="text-slate-500 text-sm leading-loose">{c.challenge}</p>
              </div>
              <div className="bg-white p-8 shadow-sm">
                <div className="pixel-font text-[10px] mb-5 tracking-widest text-center" style={{ color: c.color }}>{t('clientsPage.solutionTag')}</div>
                <p className="text-slate-500 text-sm leading-loose">{c.solution}</p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-8" style={{ borderLeft: `4px solid ${c.color}`, backgroundColor: `${c.color}08` }}>
              <p className="text-slate-600 text-base italic leading-loose mb-5">"{c.testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <span className="pixel-font text-lg" style={{ color: c.color }}>{c.icon}</span>
                <span className="text-sm font-semibold text-slate-400">— {c.testimonial.author}</span>
              </div>
            </div>
          </div>

          {/* Right 1/3: metrics */}
          <div>
            <div className="pixel-font text-[10px] mb-6 text-slate-300 tracking-widest text-center">{t('clientsPage.resultsTag')}</div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {c.metrics.map((m) => (
                <div key={m.label} className="bg-white p-5 shadow-sm flex flex-col items-center text-center">
                  <div className="pixel-font mb-2" style={{ color: c.color, fontSize: '15px' }}>{m.value}</div>
                  <div className="text-xs font-semibold text-slate-600 leading-snug">{m.label}</div>
                  {m.sub && <div className="text-[11px] text-slate-400 mt-1">{m.sub}</div>}
                </div>
              ))}
            </div>
            <div className="bg-white p-6 shadow-sm text-center">
              <div className="pixel-font text-[9px] text-slate-300 mb-3 tracking-widest">{t('clientsPage.websiteTag')}</div>
              <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: c.color }}>
                {c.website.replace('https://', '')} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────── */
export default function ClientsPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = langFromPathname(location.pathname)
  const clients = useTranslatedClients()
  const [openId, setOpenId] = useState(null)
  const [phase, setPhase] = useState('idle') // 'idle' | 'cover' | 'reveal'
  const [pendingId, setPendingId] = useState(null)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && clients.some((c) => c.id === hash)) {
      setOpenId(hash) // deep link: open directly, no transition
    } else {
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.style.overflow = openId ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [openId])

  const openDetail = (id) => {
    if (phase !== 'idle') return
    setPendingId(id)
    setPhase('cover')
  }

  const closeDetail = () => {
    if (phase !== 'idle') return
    setPendingId(null)
    setPhase('cover')
  }

  const overlayColor = clients.find((c) => c.id === (pendingId ?? openId))?.color || '#4338CA'

  const activeClient = openId ? clients.find((c) => c.id === openId) : null

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <PixelCover
        phase={phase}
        color={overlayColor}
        onCoverComplete={() => { setOpenId(pendingId); setPhase('reveal') }}
        onRevealComplete={() => setPhase('idle')}
      />

      {activeClient ? (
        /* ── Full-screen detail overlay ───────────────── */
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'var(--bg)' }}>
          <button
            onClick={closeDetail}
            className="fixed top-6 left-6 z-50 pixel-font text-[10px] bg-white/90 backdrop-blur-sm border border-indigo-100 text-slate-500 hover:text-indigo-600 hover:border-indigo-400 transition-colors px-4 py-3 tracking-widest shadow-md"
          >
            {t('clientsPage.back')}
          </button>
          <ClientDetail c={activeClient} t={t} />
        </div>
      ) : (
        <div className="pt-24 pb-32">
          <div className="page-wrap">

            {/* Page header — centered */}
            <div className="py-20 mb-16 relative grid-bg overflow-hidden text-center">
              <SectionCorners color="#4338CA" inset={16} opacity={0.2} />
              <div className="relative z-10">
                <div className="pixel-font text-[10px] text-indigo-400 mb-6 animate-pulse-glow tracking-widest">
                  {t('clientsPage.tag')}
                </div>
                <h1 className="pixel-font text-slate-800 mb-8 mx-auto" style={{ fontSize: 'clamp(20px, 4vw, 36px)', lineHeight: 2 }}>
                  {t('clientsPage.titleLine1')}<br />
                  <span style={{ color: '#4338CA' }}>{t('clientsPage.titleLine2')}</span>
                </h1>
                <p className="text-slate-400 text-base leading-loose max-w-lg mx-auto">
                  {t('clientsPage.sub')}
                </p>
              </div>
            </div>

            {/* 2×2 client grid */}
            <div className="grid sm:grid-cols-2 gap-7">
              {clients.map((c) => (
                <div key={c.id} id={`client-${c.id}`} className="scroll-mt-28">
                  <ClientGridCard c={c} onOpen={openDetail} t={t} />
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 float-card p-14 text-center">
              <div className="pixel-font text-[10px] text-indigo-400 mb-5 tracking-widest">{t('clientsPage.bottomTag')}</div>
              <h3 className="pixel-font text-slate-800 mb-5" style={{ fontSize: '18px', lineHeight: 2 }}>
                {t('clientsPage.bottomTitle')}
              </h3>
              <p className="text-slate-400 text-sm leading-loose mb-10 max-w-md mx-auto">
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
      )}
    </div>
  )
}
