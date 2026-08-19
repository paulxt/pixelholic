import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { withLang, langFromPathname, stripLangPrefix } from '../utils/langPath'

/**
 * Language picker for the footer's bottom bar.
 *
 * A native <select> rather than a pair of links: adding a third language later
 * is one line here and costs no layout, where side-by-side links would have to
 * be redesigned. Native also gets the platform's own menu, keyboard handling
 * and screen-reader support for free.
 *
 * Borderless on purpose. The bar's other two items are bare 9px lines, and a
 * boxed control beside them reads as misaligned however well its box is
 * centred — the box is the thing that does not belong, not its position.
 */
const LANGS = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
]

export default function LanguageSelect() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const lang = langFromPathname(location.pathname)

  const handleChange = (e) => {
    const basePath = stripLangPrefix(location.pathname)
    navigate(`${withLang(basePath, e.target.value)}${location.hash}`)
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        value={lang}
        onChange={handleChange}
        aria-label={t('footer.languageTitle')}
        className="pixel-font text-[9px] tracking-widest appearance-none bg-transparent border-0 p-0 pr-5 text-slate-400 hover:text-indigo-400 focus:text-indigo-400 focus-visible:outline-none transition-colors cursor-pointer"
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code} style={{ backgroundColor: '#0F172A', color: '#E2E8F0' }}>
            {l.label}
          </option>
        ))}
      </select>
      {/* Native arrow is hidden by appearance-none; this one matches the pixel type */}
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[7px] text-slate-500" aria-hidden>
        ▼
      </span>
    </div>
  )
}
