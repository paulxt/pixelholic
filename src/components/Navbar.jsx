import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: '服務', href: '/#services', id: 'services' },
  { label: '作品', href: '/#portfolio', id: 'portfolio' },
  { label: '客戶案例', href: '/clients', id: null },
  { label: '關於我們', href: '/#about', id: 'about' },
  { label: '聯絡', href: '/#contact', id: 'contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e, id) => {
    if (!id) return
    e.preventDefault()
    setOpen(false)
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b-2 border-indigo-100'
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-18 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5"
        >
          <span className="inline-block w-3.5 h-3.5 bg-indigo-600 animate-pulse-glow" />
          <span className="pixel-font text-indigo-700" style={{ fontSize: '11px' }}>
            PIXELHOLIC
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.id ? (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => handleAnchor(e, l.id)}
                  className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-200" />
                </a>
              </li>
            ) : (
              <li key={l.label}>
                <Link
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* CTA */}
        <a
          href="/#contact"
          onClick={(e) => handleAnchor(e, 'contact')}
          className="hidden md:inline-block pixel-btn"
          style={{ fontSize: '9px', padding: '10px 16px' }}
        >
          免費諮詢
        </a>

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
                key={l.label}
                href={l.href}
                onClick={(e) => { handleAnchor(e, l.id); setOpen(false) }}
                className="block text-base font-medium text-slate-600 hover:text-indigo-600 py-3 border-b border-slate-100 transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-slate-600 hover:text-indigo-600 py-3 border-b border-slate-100 transition-colors"
              >
                {l.label}
              </Link>
            ),
          )}
          <a
            href="/#contact"
            onClick={(e) => { handleAnchor(e, 'contact'); setOpen(false) }}
            className="pixel-btn inline-block mt-4 text-center"
            style={{ fontSize: '9px' }}
          >
            免費諮詢
          </a>
        </div>
      )}
    </nav>
  )
}
