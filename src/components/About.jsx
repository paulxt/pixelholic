import { useTranslation } from 'react-i18next'
import { PixelScatter, SectionCorners } from './PixelCharacters'

export default function About() {
  const { t } = useTranslation()
  const values = t('about.values', { returnObjects: true })
  const process = t('about.process', { returnObjects: true })

  return (
    <section id="about" className="section-pad-l relative bg-white overflow-hidden">
      <SectionCorners color="#059669" />
      <PixelScatter count={4} />
      <div className="page-wrap relative z-10">

        {/* Header — centered */}
        <div className="mb-12 text-center">
          <div className="pixel-font text-[10px] text-green-500 mb-4 animate-pulse-glow tracking-widest">
            {t('about.tag')}
          </div>
          <h2 className="pixel-font text-slate-800 mb-4 mx-auto" style={{ fontSize: 'clamp(18px, 3vw, 30px)', lineHeight: 2 }}>
            {t('about.titleLine1')}<br />
            <span style={{ color: '#059669' }}>{t('about.titleLine2')}</span>
          </h2>
          <p className="text-slate-400 text-base leading-loose max-w-xl mx-auto">
            {t('about.sub')}
          </p>
        </div>

        {/* Intro story — full width, centered */}
        <div className="space-y-6 mb-12 text-center max-w-3xl mx-auto">
          <p className="text-slate-500 text-base leading-loose">
            {t('about.intro1')}
          </p>
          <p className="text-slate-500 text-base leading-loose">
            {t('about.intro2')}
          </p>
        </div>

        {/* Core values / How we work — symmetric two columns */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div>
            <div className="pixel-font text-[10px] text-indigo-400 mb-6 tracking-widest text-center">{t('about.valuesTag')}</div>
            <div className="grid grid-cols-2 gap-8">
              {values.map((v) => (
                <div key={v.title} className="group flex flex-col items-center text-center">
                  <span className="pixel-font mb-5 inline-block group-hover:animate-float" style={{ color: v.color, fontSize: '30px' }}>
                    {v.icon}
                  </span>
                  <h4 className="text-slate-700 font-semibold text-sm mb-3 tracking-wide">{v.title}</h4>
                  <p className="text-slate-400 text-xs leading-loose">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="pixel-font text-[10px] text-indigo-400 mb-6 tracking-widest text-center">{t('about.processTag')}</div>
            <div className="space-y-0 text-left">
              {process.map((p, i) => (
                <div key={p.step} className="flex items-center gap-8 py-6" style={{ borderBottom: i < process.length - 1 ? '1px solid #EEF2FF' : 'none' }}>
                  <span className="pixel-font text-indigo-200 shrink-0" style={{ fontSize: '11px', lineHeight: 2 }}>{p.step}</span>
                  <div>
                    <div className="text-slate-700 font-semibold text-sm mb-1 tracking-wide">{p.title}</div>
                    <div className="text-slate-400 text-sm leading-loose">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
