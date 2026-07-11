import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'

/* Media outlets that have covered client campaigns — text-mark strip */
export default function MediaStrip() {
  const { t } = useTranslation()
  const outlets = t('media.outlets', { returnObjects: true })

  return (
    <section className="py-12 bg-white" style={{ borderTop: '1px solid #E0E7FF', borderBottom: '1px solid #E0E7FF' }}>
      <Reveal className="page-wrap text-center">
        <div className="pixel-font text-[9px] text-indigo-400 mb-2 tracking-widest">{t('media.tag')}</div>
        <p className="text-slate-500 text-sm mb-8">{t('media.title')}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {outlets.map((name) => (
            <span
              key={name}
              className="text-slate-400 hover:text-slate-600 transition-colors font-semibold tracking-wide select-none"
              style={{ fontSize: '17px' }}
            >
              {name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
