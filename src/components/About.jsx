import { useTranslation } from 'react-i18next'
import { PixelScatter, SectionCorners, PixelChar } from './PixelCharacters'
import Reveal from './Reveal'

/* Content-matched pixel icons, one per core value (by order):
   crosshair=precision, bulb=creativity, magnifier=data insight, mushroom=power-up/evolve */
const valuePixelChars = ['crosshair', 'bulb', 'magnifier', 'mushroom']

export default function About() {
  const { t } = useTranslation()
  const values = t('about.values', { returnObjects: true })
  const process = t('about.process', { returnObjects: true })

  return (
    <section id="about" className="section-pad-l relative bg-white overflow-hidden">
      <SectionCorners color="#0891B2" />
      <PixelScatter count={4} />
      <div className="page-wrap relative z-10">

        {/* Header — centered */}
        <div className="mb-12 text-center">
          <div className="pixel-font text-[10px] text-cyan-600 mb-4 animate-pulse-glow tracking-widest">
            {t('about.tag')}
          </div>
          <h2 className="pixel-font text-slate-800 mb-4 mx-auto" style={{ fontSize: 'clamp(18px, 3vw, 30px)', lineHeight: 1.6 }}>
            {t('about.titleLine1')}<br />
            <span style={{ color: '#0891B2' }}>{t('about.titleLine2')}</span>
          </h2>
          <p className="text-slate-600 text-base leading-loose max-w-xl mx-auto">
            {t('about.sub')}
          </p>
        </div>

        {/* Intro story — full width, centered */}
        <div className="space-y-6 mb-12 text-center max-w-3xl mx-auto">
          <p className="text-slate-600 text-base leading-loose">
            {t('about.intro1')}
          </p>
          <p className="text-slate-600 text-base leading-loose">
            {t('about.intro2')}
          </p>
        </div>

        {/* Core values / How we work — symmetric two columns */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div>
            <div className="pixel-font text-[10px] text-indigo-400 mb-6 tracking-widest text-center">{t('about.valuesTag')}</div>
            <div className="grid grid-cols-2 gap-8">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 90} className="group flex flex-col items-center text-center">
                  <span className="mb-5 inline-block group-hover:animate-float">
                    <PixelChar type={valuePixelChars[i % valuePixelChars.length]} color={v.color} size={5} />
                  </span>
                  <h4 className="text-slate-700 font-semibold text-sm mb-3 tracking-wide">{v.title}</h4>
                  <p className="text-slate-500 text-xs leading-loose">{v.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <div className="pixel-font text-[10px] text-indigo-400 mb-6 tracking-widest text-center">{t('about.processTag')}</div>
            <div className="space-y-0 text-left">
              {process.map((p, i) => (
                <Reveal key={p.step} delay={i * 110}>
                  <div className="flex items-center gap-8 py-6" style={{ borderBottom: i < process.length - 1 ? '1px solid #EEF2FF' : 'none' }}>
                    <span className="pixel-font text-indigo-300 shrink-0" style={{ fontSize: '11px', lineHeight: 2 }}>{p.step}</span>
                    <div>
                      <div className="text-slate-700 font-semibold text-sm mb-1 tracking-wide">{p.title}</div>
                      <div className="text-slate-500 text-sm leading-loose">{p.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
