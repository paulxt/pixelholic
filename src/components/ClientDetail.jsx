import { motion } from 'framer-motion'
import { PixelChar } from './PixelCharacters'
import CountUp from './CountUp'
import { ink } from '../utils/accent'

/* ── Theme map (styling only — text comes from translations) ──────────── */
export const clientThemes = {
  kingcart:  { hdrClass: 'client-hdr-indigo', bgClass: 'client-bg-indigo', charType: 'bolt' },
  polaris:   { hdrClass: 'client-hdr-cyan',   bgClass: 'client-bg-cyan',   charType: 'rocket' },
  cmei:      { hdrClass: 'client-hdr-teal',   bgClass: 'client-bg-teal',   charType: 'heart' },
  yunyang:   { hdrClass: 'client-hdr-purple', bgClass: 'client-bg-purple', charType: 'alien' },
  woolbuddy: { hdrClass: 'client-hdr-orange', bgClass: 'client-bg-orange', charType: 'star' },
  letape:    { hdrClass: 'client-hdr-amber',  bgClass: 'client-bg-amber',  charType: 'robot' },
}

/* ── Narrative ramp ──────────────────────────────────────────────────────
   The steps deepen through the client's own theme colour instead of borrowing
   a neutral: pale at the brand背景, full strength at the 解法, darkest at the
   客戶的話 — so the colour itself tells you how far along the story you are. */
function stepRamp(color) {
  return [
    `color-mix(in srgb, ${color} 32%, white)`,
    `color-mix(in srgb, ${color} 60%, white)`,
    color,
    ink(color),
  ]
}

/* ── One stage of the case-study narrative ──────────────────────────────
   The order is implied rather than announced: a bare step number, the section
   name, and a rule that deepens through the client's theme as the story
   advances — no "STAGE" label, no numbered chrome. */
function Stage({ n, tag, tagColor, ruleColor, textColor, last, children }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="pixel-font text-[10px] tracking-widest whitespace-nowrap" style={{ color: textColor }}>
          {n}
        </span>
        <span className="pixel-font text-[10px] tracking-widest whitespace-nowrap" style={{ color: tagColor }}>
          {tag}
        </span>
        <span className="flex-1 h-px" style={{ backgroundColor: ruleColor }} />
      </div>
      {children}
      {!last && (
        <div className="pixel-font text-[9px] text-center mt-4" style={{ color: ruleColor }}>▼</div>
      )}
    </div>
  )
}

/* ── Full case-study detail panel ─────────────────── */
export default function ClientDetail({ c, t, titleTag: TitleTag = 'h2', beamIn = false }) {
  const th = clientThemes[c.id]
  const ramp = stepRamp(c.color)
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

          {/* Left 2/3: story — stacked full width so every paragraph reads at the
              same comfortable measure instead of being squeezed into a narrow ribbon */}
          <div className="lg:col-span-2 space-y-8">
            {/* 01 — Brand overview */}
            <Stage n="01" tag={t('clientsPage.overviewTag')} tagColor={ink(c.color)} ruleColor={ramp[0]} textColor={ink(c.color)}>
              <div className="bg-white p-8 shadow-sm">
                <p className="text-slate-600 text-sm leading-loose">{c.description}</p>
              </div>
            </Stage>

            {/* 02 — Challenge. Tag stays grey — the problem isn't our credit. */}
            <Stage n="02" tag={t('clientsPage.challengeTag')} tagColor="#94A3B8" ruleColor={ramp[1]} textColor={ink(c.color)}>
              <div className="bg-white p-8 shadow-sm">
                <p className="text-slate-600 text-sm leading-loose">{c.challenge}</p>
              </div>
            </Stage>

            {/* 03 — Solution */}
            <Stage n="03" tag={t('clientsPage.solutionTag')} tagColor={ink(c.color)} ruleColor={ramp[2]} textColor={ink(c.color)} last={!c.testimonial}>
              <div className="bg-white p-8 shadow-sm">
                <p className="text-slate-600 text-sm leading-loose">{c.solution}</p>
              </div>
            </Stage>

            {/* 04 — Testimonial: the client's own words close the sequence */}
            {c.testimonial && (
              <Stage n="04" tag={t('clientsPage.voiceTag')} tagColor={ink(c.color)} ruleColor={ramp[3]} textColor={ink(c.color)} last>
                <div className="p-8" style={{ borderLeft: `4px solid ${c.color}`, backgroundColor: `${c.color}08` }}>
                  <p className="text-slate-600 text-base italic leading-loose mb-5">"{c.testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <span className="pixel-font text-lg" style={{ color: ink(c.color) }}>{c.icon}</span>
                    <span className="text-sm font-semibold text-slate-500">— {c.testimonial.author}</span>
                  </div>
                </div>
              </Stage>
            )}
          </div>

          {/* Right 1/3: metrics — sticky so the short rail travels with the story
              instead of leaving a dead column beside it */}
          <div>
            <div className="lg:sticky lg:top-24">
              <div className="pixel-font text-[10px] mb-6 text-slate-400 tracking-widest text-center">{t('clientsPage.resultsTag')}</div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {c.metrics.map((m) => (
                  <div key={m.label} className="bg-white p-5 shadow-sm flex flex-col items-center text-center">
                    <div className="pixel-font mb-2" style={{ color: ink(c.color), fontSize: '15px' }}>
                      <CountUp value={m.value} />
                    </div>
                    <div className="text-xs font-semibold text-slate-600 leading-snug">{m.label}</div>
                    {m.sub && <div className="text-[11px] text-slate-500 mt-1">{m.sub}</div>}
                  </div>
                ))}
              </div>
              <div className="bg-white p-6 shadow-sm text-center">
                <div className="pixel-font text-[9px] text-slate-400 mb-3 tracking-widest">{t('clientsPage.websiteTag')}</div>
                <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: ink(c.color) }}>
                  {c.website.replace('https://', '')} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
