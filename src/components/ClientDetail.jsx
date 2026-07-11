import { motion } from 'framer-motion'
import { PixelChar } from './PixelCharacters'
import CountUp from './CountUp'

/* ── Theme map (styling only — text comes from translations) ──────────── */
export const clientThemes = {
  kingcart:  { hdrClass: 'client-hdr-indigo', bgClass: 'client-bg-indigo', charType: 'bolt' },
  polaris:   { hdrClass: 'client-hdr-cyan',   bgClass: 'client-bg-cyan',   charType: 'rocket' },
  cmei:      { hdrClass: 'client-hdr-green',  bgClass: 'client-bg-green',  charType: 'heart' },
  yunyang:   { hdrClass: 'client-hdr-purple', bgClass: 'client-bg-purple', charType: 'alien' },
  woolbuddy: { hdrClass: 'client-hdr-orange', bgClass: 'client-bg-orange', charType: 'star' },
  letape:    { hdrClass: 'client-hdr-amber',  bgClass: 'client-bg-amber',  charType: 'robot' },
}

/* ── Full case-study detail panel ─────────────────── */
export default function ClientDetail({ c, t, titleTag: TitleTag = 'h2', beamIn = false }) {
  const th = clientThemes[c.id]
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
          {beamIn ? (
            /* Mega Man warp-in: drop from the top as a thin light beam, then materialize */
            <motion.img
              src={c.logo}
              alt={`${c.name} logo`}
              className="shrink-0 bg-white p-3 mx-auto md:mx-0"
              style={{ width: 96, height: 96, imageRendering: 'pixelated', transformOrigin: 'center bottom' }}
              animate={{ y: [-360, 0, 0], scaleX: [0.12, 0.12, 1], scaleY: [3, 2.4, 1] }}
              transition={{ duration: 0.55, times: [0, 0.55, 1], ease: ['easeIn', 'easeOut'] }}
            />
          ) : (
            <img
              src={c.logo}
              alt={`${c.name} logo`}
              className="shrink-0 bg-white p-3 mx-auto md:mx-0"
              style={{ width: 96, height: 96, imageRendering: 'pixelated' }}
            />
          )}
          <div className="flex-1 text-center md:text-left">
            <div className="pixel-font text-white/60 text-[10px] tracking-widest mb-4">
              // {c.industry.toUpperCase()} · {c.period}
            </div>
            <TitleTag className="pixel-font text-white mb-3" style={{ fontSize: 'clamp(16px, 2.5vw, 26px)', lineHeight: 1.6 }}>
              {c.name}
            </TitleTag>
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
              <p className="text-slate-600 text-sm leading-loose">{c.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 shadow-sm">
                <div className="pixel-font text-[10px] mb-5 text-slate-400 tracking-widest text-center">{t('clientsPage.challengeTag')}</div>
                <p className="text-slate-600 text-sm leading-loose">{c.challenge}</p>
              </div>
              <div className="bg-white p-8 shadow-sm">
                <div className="pixel-font text-[10px] mb-5 tracking-widest text-center" style={{ color: c.color }}>{t('clientsPage.solutionTag')}</div>
                <p className="text-slate-600 text-sm leading-loose">{c.solution}</p>
              </div>
            </div>

            {/* Testimonial */}
            {c.testimonial && (
              <div className="p-8" style={{ borderLeft: `4px solid ${c.color}`, backgroundColor: `${c.color}08` }}>
                <p className="text-slate-600 text-base italic leading-loose mb-5">"{c.testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <span className="pixel-font text-lg" style={{ color: c.color }}>{c.icon}</span>
                  <span className="text-sm font-semibold text-slate-500">— {c.testimonial.author}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right 1/3: metrics */}
          <div>
            <div className="pixel-font text-[10px] mb-6 text-slate-400 tracking-widest text-center">{t('clientsPage.resultsTag')}</div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {c.metrics.map((m) => (
                <div key={m.label} className="bg-white p-5 shadow-sm flex flex-col items-center text-center">
                  <div className="pixel-font mb-2" style={{ color: c.color, fontSize: '15px' }}>
                    <CountUp value={m.value} />
                  </div>
                  <div className="text-xs font-semibold text-slate-600 leading-snug">{m.label}</div>
                  {m.sub && <div className="text-[11px] text-slate-500 mt-1">{m.sub}</div>}
                </div>
              ))}
            </div>
            <div className="bg-white p-6 shadow-sm text-center">
              <div className="pixel-font text-[9px] text-slate-400 mb-3 tracking-widest">{t('clientsPage.websiteTag')}</div>
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
