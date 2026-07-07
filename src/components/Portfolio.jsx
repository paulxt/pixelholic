import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useTranslatedClients from '../hooks/useTranslatedClients'
import { withLang, langFromPathname } from '../utils/langPath'
import { PixelScatter, SectionCorners } from './PixelCharacters'

function ClientDropdown({ clients, selected, onChange, t }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-white border-2 border-indigo-200 hover:border-indigo-500 transition-colors pixel-font text-[12px] text-slate-600"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
          padding: '12px 20px',
        }}
      >
        {selected ? (
          <>
            <span style={{ color: selected.color }}>{selected.icon}</span>
            <span>{selected.name}</span>
          </>
        ) : (
          <span className="text-slate-400">{t('portfolio.selectPlaceholder')}</span>
        )}
        <span className={`ml-2 text-indigo-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-indigo-200 shadow-xl z-20"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
          }}
        >
          <button
            className="w-full text-left px-5 py-3 pixel-font text-[9px] text-slate-400 hover:bg-indigo-50 border-b border-indigo-100"
            onClick={() => { onChange(null); setOpen(false) }}
          >
            {t('portfolio.allCases')}
          </button>
          {clients.map((c) => (
            <button
              key={c.id}
              className="w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-indigo-50 transition-colors border-b border-indigo-50 last:border-0"
              onClick={() => { onChange(c); setOpen(false) }}
            >
              <span className="pixel-font text-lg" style={{ color: c.color }}>{c.icon}</span>
              <div>
                <div className="text-sm font-semibold text-slate-700">{c.name}</div>
                <div className="text-xs text-slate-400">{c.industry}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ClientCard({ c, featured, lang, t }) {
  return (
    <div
      className={`pixel-card group ${featured ? 'col-span-full' : ''}`}
      style={{ borderColor: `${c.color}40` }}
    >
      {featured ? (
        <div className="grid md:grid-cols-2 gap-0">
          {/* Visual */}
          <div
            className="flex items-center justify-center p-16 relative overflow-hidden"
            style={{ backgroundColor: `${c.color}08` }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(${c.color}40 1px, transparent 1px), linear-gradient(90deg, ${c.color}40 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
            <img
              src={c.logo}
              alt={`${c.name} logo`}
              className="relative z-10 animate-float"
              style={{ width: 128, height: 128, imageRendering: 'pixelated' }}
            />
          </div>

          {/* Content */}
          <div className="p-10 flex flex-col justify-center text-center">
            <div className="pixel-font text-[9px] mb-3" style={{ color: c.color }}>
              // {c.industry.toUpperCase()}
            </div>
            <h3 className="pixel-font text-slate-800 mb-2" style={{ fontSize: '16px' }}>{c.name}</h3>
            <p className="text-slate-400 text-sm mb-6 italic">"{c.tagline}"</p>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{c.description}</p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {c.metrics.slice(0, 4).map((m) => (
                <div
                  key={m.label}
                  className="p-4 flex flex-col items-center text-center"
                  style={{ borderColor: `${c.color}30`, backgroundColor: `${c.color}06`, border: `1px solid ${c.color}30` }}
                >
                  <div className="pixel-font mb-1" style={{ color: c.color, fontSize: '14px' }}>
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">{m.label}</div>
                  <div className="text-xs text-slate-400">{m.sub}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                to={withLang(`/clients#${c.id}`, lang)}
                className="pixel-btn"
                style={{
                  borderColor: c.color,
                  color: c.color,
                  boxShadow: `3px 3px 0px ${c.color}60`,
                  fontSize: '13px',
                }}
              >
                {t('common.viewFullCase')}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Mini visual */}
          <div
            className="h-24 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: `${c.color}08` }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(${c.color}50 1px, transparent 1px), linear-gradient(90deg, ${c.color}50 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
            <img
              src={c.logo}
              alt={`${c.name} logo`}
              className="relative z-10 group-hover:animate-float"
              style={{ width: 64, height: 64, imageRendering: 'pixelated' }}
            />
          </div>

          {/* Content */}
          <div className="p-4 text-center">
            <div className="pixel-font text-[9px] mb-1" style={{ color: c.color }}>{c.industry}</div>
            <h3 className="font-semibold text-slate-800 text-base mb-1 group-hover:text-indigo-600 transition-colors">
              {c.name}
            </h3>
            <p className="text-slate-500 text-sm mb-3 line-clamp-2">{c.tagline}</p>

            {/* Top metric */}
            <div
              className="inline-flex items-center gap-3 px-3 py-2 mb-3"
              style={{ backgroundColor: `${c.color}08`, borderLeft: `3px solid ${c.color}` }}
            >
              <span className="pixel-font font-bold" style={{ color: c.color, fontSize: '13px' }}>
                {c.metrics[0].value}
              </span>
              <span className="text-xs text-slate-500">{c.metrics[0].label}</span>
            </div>

            <div className="flex justify-center">
              <Link
                to={withLang(`/clients#${c.id}`, lang)}
                className="text-sm font-semibold inline-flex items-center gap-1.5 transition-all group-hover:gap-3"
                style={{ color: c.color }}
              >
                {t('portfolio.viewCase')} <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Portfolio() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = langFromPathname(location.pathname)
  const clients = useTranslatedClients()
  const [selected, setSelected] = useState(null)

  const displayed = selected ? [selected] : clients

  return (
    <section id="portfolio" className="section-pad-l relative overflow-hidden">
      <SectionCorners color="#0891B2" />
      <PixelScatter count={4} />

      <div className="page-wrap relative z-10">
        {/* Header — centered */}
        <div className="text-center" style={{ marginBottom: '1.25rem' }}>
          <div className="pixel-font text-[10px] text-cyan-600 mb-3 animate-pulse-glow">
            {t('portfolio.tag')}
          </div>
          <h2
            className="pixel-font text-slate-800 leading-relaxed mb-4"
            style={{ fontSize: 'clamp(18px, 3vw, 30px)' }}
          >
            {t('portfolio.titleLine1')}<br />
            <span style={{ color: '#0891B2' }}>{t('portfolio.titleLine2')}</span>
          </h2>

          <div className="flex flex-wrap items-center gap-4 justify-center">
            <ClientDropdown clients={clients} selected={selected} onChange={setSelected} t={t} />
            <Link to={withLang('/clients', lang)} className="pixel-btn pixel-btn-cyan" style={{ fontSize: '13px' }}>
              {t('portfolio.viewAllCta')}
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.length === 1 ? (
            <ClientCard c={displayed[0]} featured lang={lang} t={t} />
          ) : (
            displayed.map((c) => <ClientCard key={c.id} c={c} lang={lang} t={t} />)
          )}
        </div>

        {/* More cases — compact bar, not a full grid cell */}
        {displayed.length > 1 && (
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="group flex flex-wrap items-center justify-center gap-2 text-center py-4 px-6 border-2 border-dashed transition-colors cursor-pointer"
            style={{ borderColor: '#C7D2FE', marginTop: '1.25rem' }}
          >
            <span className="pixel-font text-base text-indigo-300 group-hover:text-indigo-500 transition-colors">+</span>
            <span className="text-slate-500 text-sm font-medium group-hover:text-indigo-600 transition-colors">
              {t('portfolio.moreCasesTitle')}
            </span>
            <span className="text-xs text-slate-400 group-hover:text-indigo-400 transition-colors">
              {t('portfolio.moreCasesSub')}
            </span>
          </a>
        )}

        {/* Bottom CTA */}
        <div className="pixel-card p-12 flex flex-col md:flex-row items-center justify-center gap-8 text-center" style={{ marginTop: '2rem' }}>
          <div>
            <div className="pixel-font text-[9px] text-green-600 mb-2">{t('portfolio.bottomTag')}</div>
            <p className="text-slate-800 text-lg font-semibold">
              {t('portfolio.bottomTitle')}
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="pixel-btn whitespace-nowrap"
          >
            {t('portfolio.bottomCta')}
          </a>
        </div>
      </div>
    </section>
  )
}
