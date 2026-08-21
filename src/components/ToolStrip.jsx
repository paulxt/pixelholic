import { useTranslation } from 'react-i18next'
import { toolboxUrl } from '../utils/toolbox'

/**
 * The seam between About (white) and Contact (the one warm ground on the site).
 *
 * It opens on About's white so it reads as the tail of the page's argument —
 * the low-commitment option offered just before the ask — then cools into the
 * site blue and stops at a drawn edge. Contact's warm ground starting on the
 * other side of that line is the real boundary: cool meeting warm is the
 * sharpest division the palette has, so this cannot blur into the section
 * below the way it did against the case studies.
 */
export default function ToolStrip() {
  const { t } = useTranslation()

  return (
    <aside
      aria-label={t('toolStrip.tag')}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #EEF2FF 55%, #EAEFFF 100%)' }}
    >
      {/* Site grid, faded in from the white top so About hands over without a seam */}
      <div
        className="absolute inset-0 grid-bg pointer-events-none"
        style={{
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 55%, #000 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 55%, #000 100%)',
        }}
        aria-hidden
      />

      {/* Bottom edge — same hairline treatment as .section-divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #C7D2FE, transparent)' }}
        aria-hidden
      />

      <div className="page-wrap py-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-10 gap-y-4 text-center sm:text-left">
          <div>
            <div className="pixel-font text-[10px] mb-1.5 flex items-center justify-center sm:justify-start gap-2" style={{ color: 'var(--cyan-ink)' }}>
              <span className="inline-block w-1.5 h-1.5 shrink-0 animate-blink" style={{ backgroundColor: 'var(--cyan)' }} aria-hidden />
              {t('toolStrip.tag')}
            </div>
            <p className="text-slate-800 font-semibold text-base leading-snug">
              {t('toolStrip.title')}
            </p>
            <p className="text-slate-500 text-sm mt-1">
              {t('toolStrip.sub')}
            </p>

            {/* What the report actually contains. Naming the five checks does
                more for willingness than another sentence would: the hesitation
                with an audit tool is not the 30 seconds, it is not knowing what
                you get or what you have to hand over for it. */}
            <ul className="mt-3 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1.5">
              {t('toolStrip.checks', { returnObjects: true }).map((c) => (
                <li key={c} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span style={{ color: 'var(--cyan-ink)' }} aria-hidden>✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={toolboxUrl('contact_seam')}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn pixel-btn-cyan shrink-0 whitespace-nowrap"
            style={{ fontSize: '12px', padding: '10px 18px' }}
          >
            {t('toolStrip.cta')}
          </a>
        </div>
      </div>
    </aside>
  )
}
