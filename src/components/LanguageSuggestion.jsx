import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { withLang, langFromPathname, stripLangPrefix } from '../utils/langPath'

const STORAGE_KEY = 'pixelholic_lang_banner_dismissed'

const copy = {
  en: { message: 'Looks like you might prefer English.', switch: 'Switch to English', dismiss: 'No thanks' },
  zh: { message: '看起來您可能想使用中文版。', switch: '切換為中文', dismiss: '不用了' },
}

function detectBrowserLang() {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language || 'zh']
  return langs.some((l) => l.toLowerCase().startsWith('zh')) ? 'zh' : 'en'
}

export default function LanguageSuggestion() {
  const location = useLocation()
  const navigate = useNavigate()
  const [suggestedLang, setSuggestedLang] = useState(null)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const browserLang = detectBrowserLang()
    const currentLang = langFromPathname(location.pathname)
    if (browserLang !== currentLang) setSuggestedLang(browserLang)
    // Only check once, on first load — not on every route change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!suggestedLang) return null

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setSuggestedLang(null)
  }

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    const basePath = stripLangPrefix(location.pathname)
    navigate(`${withLang(basePath, suggestedLang)}${location.hash}`)
    setSuggestedLang(null)
  }

  const c = copy[suggestedLang]

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-white border-2 border-indigo-200 shadow-lg px-6 py-4 flex flex-wrap items-center justify-center gap-4 max-w-[90vw]"
      style={{ boxShadow: 'var(--shadow-lg)' }}
    >
      <p className="text-sm text-slate-600">{c.message}</p>
      <div className="flex items-center gap-4">
        <button onClick={accept} className="pixel-btn" style={{ fontSize: '11px', padding: '8px 14px' }}>
          {c.switch}
        </button>
        <button onClick={dismiss} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
          {c.dismiss}
        </button>
      </div>
    </div>
  )
}
