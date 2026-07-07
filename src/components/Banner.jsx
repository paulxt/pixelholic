import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { PixelHeroDecor, SectionCorners } from './PixelCharacters'

export default function Banner() {
  const { t } = useTranslation()
  const slides = t('banner.slides', { returnObjects: true })
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => { setCurrent(idx); setAnimating(false) }, 280)
  }, [animating])

  useEffect(() => {
    const t = setInterval(() => goTo((current + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [current, goTo])

  const slide = slides[current]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center grid-bg overflow-hidden"
    >
      {/* Gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${slide.accent}14 0%, transparent 70%)`, transition: 'background 0.5s' }} />

      {/* Floating squares */}
      {[
        { top: '12%', right: '8%',  size: 18, delay: '0s' },
        { top: '30%', right: '20%', size: 10, delay: '1.2s' },
        { bottom: '24%', right: '6%', size: 14, delay: '0.6s' },
        { top: '60%', left: '4%',  size: 10, delay: '1.8s' },
        { top: '20%', left: '8%',  size: 8,  delay: '2.4s' },
      ].map((d, i) => (
        <div key={i} className="absolute animate-float" style={{ top: d.top, right: d.right, bottom: d.bottom, left: d.left, width: d.size, height: d.size, backgroundColor: slide.accent, opacity: 0.2, animationDelay: d.delay, transition: 'background-color 0.5s' }} />
      ))}

      {/* Large BG letter */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <span className="pixel-font font-bold opacity-[0.04]" style={{ fontSize: 'clamp(80px, 16vw, 220px)', color: slide.accent }}>PXL</span>
      </div>

      {/* Pixel corner brackets */}
      <SectionCorners color={slide.accent} size={28} inset={24} opacity={0.25} />

      {/* Pixel characters */}
      <PixelHeroDecor accentColor={slide.accent} />

      {/* Content — all centered */}
      <div className="page-wrap py-24 md:py-20 w-full relative z-10 text-center flex flex-col items-center">
        <div
          className={`transition-all duration-300 w-full ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        >
          {/* Tag */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="pixel-font text-[10px] animate-pulse-glow tracking-widest" style={{ color: slide.accent }}>{slide.tag}</span>
            <span className="animate-blink pixel-font text-[10px]" style={{ color: slide.accent }}>_</span>
          </div>

          {/* Title */}
          <h1
            className="glitch pixel-font mb-6 mx-auto"
            data-text={slide.title}
            style={{ fontSize: 'clamp(26px, 5vw, 52px)', lineHeight: 1.8, color: '#0F172A', whiteSpace: 'pre-line' }}
          >
            {slide.title}
          </h1>

          <p className="text-slate-400 text-lg leading-loose mb-8 max-w-xl mx-auto" style={{ letterSpacing: '0.01em' }}>
            {slide.sub}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 justify-center mb-12">
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="pixel-btn">
              {t('banner.ctaPrimary')}
            </a>
            <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }} className="pixel-btn pixel-btn-cyan">
              {t('banner.ctaSecondary')}
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-12 md:gap-20 justify-center pt-12" style={{ borderTop: '1px solid #E0E7FF' }}>
            {[
              { n: '20+', label: t('banner.statBrands') },
              { n: '98%', label: t('banner.statSatisfaction') },
              { n: t('banner.statExperienceValue', { years: new Date().getFullYear() - 2020 }), label: t('banner.statExperience') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="pixel-font mb-2" style={{ color: slide.accent, fontSize: '20px' }}>{s.n}</div>
                <div className="text-slate-400 text-sm tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide dots */}
        <div className="flex gap-3 justify-center mt-10">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="transition-all duration-200" style={{ width: i === current ? 28 : 10, height: 10, backgroundColor: i === current ? slide.accent : '#C7D2FE' }} aria-label={`slide ${i + 1}`} />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-slate-400 tracking-widest">{t('banner.scroll')}</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-indigo-400 to-transparent" />
      </div>
    </section>
  )
}
