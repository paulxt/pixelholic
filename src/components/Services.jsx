import { useTranslation } from 'react-i18next'
import { SectionCorners, PixelScatter } from './PixelCharacters'

function ServiceCard({ s }) {
  return (
    <div className="float-card p-10 group cursor-default flex flex-col items-center text-center">
      {/* Number */}
      <div className="pixel-font text-[9px] text-slate-200 mb-4 self-end">{s.num}</div>

      {/* Icon */}
      <span className="pixel-font group-hover:animate-float inline-block mb-6" style={{ color: s.color, lineHeight: 1, fontSize: '40px' }}>
        {s.icon}
      </span>

      <h3 className="text-slate-800 font-semibold text-lg mb-4 leading-snug tracking-wide group-hover:text-indigo-600 transition-colors">
        {s.title}
      </h3>

      <p className="text-slate-400 text-sm leading-loose mb-8 flex-1">
        {s.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        {s.tags.map((t) => (
          <span key={t} className="text-[11px] font-medium tracking-wide" style={{ color: s.color }}>
            {t} ·
          </span>
        ))}
      </div>

      {/* Color accent bar */}
      <div className="mt-8 h-0.5 w-8 group-hover:w-24 transition-all duration-500" style={{ backgroundColor: s.color }} />
    </div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const services = t('services.items', { returnObjects: true })
  const ticker = t('services.ticker', { returnObjects: true })

  return (
    <section id="services" className="section-pad-l relative bg-white overflow-hidden">
      <SectionCorners color="#4338CA" />
      <PixelScatter count={3} />

      <div className="page-wrap relative z-10">

        {/* Header — centered */}
        <div className="mb-12 text-center">
          <div className="pixel-font text-[10px] text-indigo-400 mb-4 animate-pulse-glow tracking-widest">
            {t('services.tag')}
          </div>
          <h2 className="pixel-font text-slate-800 mb-4 mx-auto" style={{ fontSize: 'clamp(18px, 3vw, 30px)', lineHeight: 2 }}>
            {t('services.titleLine1')}<br />
            <span style={{ color: '#4338CA' }}>{t('services.titleLine2')}</span>
          </h2>
          <p className="text-slate-400 text-base leading-loose max-w-xl mx-auto">
            {t('services.sub')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => <ServiceCard key={s.title} s={s} />)}
        </div>

        {/* Ticker */}
        <div className="mt-12 py-6 overflow-hidden" style={{ borderTop: '1px solid #E0E7FF', borderBottom: '1px solid #E0E7FF' }}>
          <div className="animate-marquee whitespace-nowrap flex gap-16">
            {[0, 1].map((ri) => (
              <span key={ri} className="inline-flex gap-16">
                {ticker.map((word, i) => (
                  <span key={`${ri}-${i}`} className="pixel-font text-[10px] text-indigo-200 tracking-widest">◈ {word}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
