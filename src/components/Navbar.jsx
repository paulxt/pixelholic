import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { withLang, langFromPathname, stripLangPrefix } from '../utils/langPath'
import { toolboxUrl } from '../utils/toolbox'
import Logo from './Logo'

const links = [
  { labelKey: 'nav.services', id: 'services' },
  { labelKey: 'nav.work', id: 'portfolio' },
  { labelKey: 'nav.clients', id: null, to: '/clients' },
  { labelKey: 'nav.about', id: 'about' },
  { labelKey: 'nav.contact', id: 'contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const lang = langFromPathname(location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e, id) => {
    if (!id) return
    e.preventDefault()
    setOpen(false)
    const homePath = withLang('/', lang)
    if (location.pathname !== homePath) {
      window.location.href = `${homePath}#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const switchLanguage = () => {
    const targetLang = lang === 'en' ? 'zh' : 'en'
    const basePath = stripLangPrefix(location.pathname)
    navigate(`${withLang(basePath, targetLang)}${location.hash}`)
    setOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-sm border-b-2 border-indigo-100'
          : 'bg-white/85 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-18 py-4">
        {/* Logo */}
        <Link
          to={withLang('/', lang)}
          className="flex items-center gap-2.5"
        >
          <Logo size={30} />
          <span className="pixel-font text-indigo-700" style={{ fontSize: '11px' }}>
            PIXELHOLIC
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.id ? (
              <li key={l.labelKey}>
                <a
                  href={`${withLang('/', lang)}#${l.id}`}
                  onClick={(e) => handleAnchor(e, l.id)}
                  className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors relative group"
                >
                  {t(l.labelKey)}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-200" />
                </a>
              </li>
            ) : (
              <li key={l.labelKey}>
                <Link
                  to={withLang(l.to, lang)}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors relative group"
                >
                  {t(l.labelKey)}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* Language switch + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={switchLanguage}
            className="pixel-font text-[9px] text-slate-400 hover:text-indigo-600 transition-colors tracking-widest border border-indigo-100 hover:border-indigo-400 px-3 py-2"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
          <a
            href={toolboxUrl('navbar')}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-font text-[9px] transition-colors tracking-widest hidden lg:flex items-center gap-2 whitespace-nowrap relative group"
            style={{ color: 'var(--cyan-ink)' }}
          >
            <span className="inline-block w-1.5 h-1.5 shrink-0 animate-blink" style={{ backgroundColor: 'var(--cyan)' }} aria-hidden />
            {t('nav.tools')}
            <span
              className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200"
              style={{ backgroundColor: 'var(--cyan)' }}
            />
          </a>
          <a
            href={`${withLang('/', lang)}#contact`}
            onClick={(e) => handleAnchor(e, 'contact')}
            className="pixel-btn pixel-btn-coral"
            style={{ fontSize: '12px', padding: '7px 14px' }}
          >
            {t('nav.cta')}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-6 h-0.5 bg-indigo-600 transition-all duration-200 ${
                open
                  ? i === 0 ? 'rotate-45 translate-y-2'
                  : i === 1 ? 'opacity-0'
                  : '-rotate-45 -translate-y-2'
                  : ''
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-indigo-100 px-8 py-6 grid gap-1">
          {links.map((l) =>
            l.id ? (
              <a
                key={l.labelKey}
                href={`${withLang('/', lang)}#${l.id}`}
                onClick={(e) => handleAnchor(e, l.id)}
                className="block text-base font-medium text-slate-600 hover:text-indigo-600 py-3 border-b border-slate-100 transition-colors"
              >
                {t(l.labelKey)}
              </a>
            ) : (
              <Link
                key={l.labelKey}
                to={withLang(l.to, lang)}
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-slate-600 hover:text-indigo-600 py-3 border-b border-slate-100 transition-colors"
              >
                {t(l.labelKey)}
              </Link>
            ),
          )}
          <button
            onClick={switchLanguage}
            className="pixel-font text-[9px] text-slate-500 hover:text-indigo-600 py-3 border-b border-slate-100 transition-colors tracking-widest text-left"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
          <a
            href={toolboxUrl('navbar')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="pixel-font text-[9px] py-3 border-b border-slate-100 transition-colors tracking-widest flex items-center gap-2"
            style={{ color: 'var(--cyan-ink)' }}
          >
            <span className="inline-block w-1.5 h-1.5 shrink-0 animate-blink" style={{ backgroundColor: 'var(--cyan)' }} aria-hidden />
            {t('nav.tools')}
          </a>
          <a
            href={`${withLang('/', lang)}#contact`}
            onClick={(e) => handleAnchor(e, 'contact')}
            className="pixel-btn pixel-btn-coral inline-block mt-4 text-center"
            style={{ fontSize: '12px' }}
          >
            {t('nav.cta')}
          </a>
        </div>
      )}
    </nav>
  )
}
