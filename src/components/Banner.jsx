import { useState, useEffect, useCallback } from 'react'
import { PixelHeroDecor, SectionCorners } from './PixelCharacters'

const slides = [
  { tag: '// DIGITAL MARKETING', title: '像素驅動\n品牌進化', sub: '結合前衛像素美學與資料驅動策略，打造令人難忘的數位品牌體驗', accent: '#4338CA', shadow: '#7C3AED', symbol: '◈' },
  { tag: '// CREATIVE CAMPAIGNS', title: '創意無界\n突破格局', sub: '從社群媒體到整合行銷，我們為您的品牌注入源源不絕的創意動能', accent: '#0891B2', shadow: '#4338CA', symbol: '◉' },
  { tag: '// BRAND STRATEGY', title: '策略為本\n成效為王', sub: '深度洞察市場趨勢，量身打造高轉換率的全通路行銷解決方案', accent: '#059669', shadow: '#0891B2', symbol: '◇' },
]

export default function Banner() {
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
      <div className="page-wrap py-40 md:py-56 w-full relative z-10 text-center flex flex-col items-center">
        <div
          className={`transition-all duration-300 w-full ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        >
          {/* Tag */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="pixel-font text-[10px] animate-pulse-glow tracking-widest" style={{ color: slide.accent }}>{slide.tag}</span>
            <span className="animate-blink pixel-font text-[10px]" style={{ color: slide.accent }}>_</span>
          </div>

          {/* Title */}
          <h1
            className="glitch pixel-font mb-10 mx-auto"
            data-text={slide.title.replace('\n', ' ')}
            style={{ fontSize: 'clamp(26px, 5vw, 52px)', lineHeight: 1.8, color: '#0F172A', whiteSpace: 'pre-line' }}
          >
            {slide.title}
          </h1>

          <p className="text-slate-400 text-lg leading-loose mb-14 max-w-xl mx-auto" style={{ letterSpacing: '0.01em' }}>
            {slide.sub}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 justify-center mb-20">
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="pixel-btn">
              開始合作
            </a>
            <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }} className="pixel-btn pixel-btn-cyan">
              了解服務
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-12 md:gap-20 justify-center pt-12" style={{ borderTop: '1px solid #E0E7FF' }}>
            {[
              { n: '20+', label: '合作品牌' },
              { n: '98%', label: '客戶滿意度' },
              { n: `${new Date().getFullYear() - 2020}年`, label: '業界深耕' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="pixel-font mb-2" style={{ color: slide.accent, fontSize: '20px' }}>{s.n}</div>
                <div className="text-slate-400 text-sm tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide dots */}
        <div className="flex gap-3 justify-center mt-16">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="transition-all duration-200" style={{ width: i === current ? 28 : 10, height: 10, backgroundColor: i === current ? slide.accent : '#C7D2FE' }} aria-label={`slide ${i + 1}`} />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-slate-400 tracking-widest">SCROLL</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-indigo-400 to-transparent" />
      </div>
    </section>
  )
}
