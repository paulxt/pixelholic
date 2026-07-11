import { useEffect } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useTranslatedClients from '../hooks/useTranslatedClients'
import { withLang, langFromPathname } from '../utils/langPath'
import ClientDetail from '../components/ClientDetail'
import Seo from '../components/Seo'

export default function ClientCasePage() {
  const { id } = useParams()
  const { t } = useTranslation()
  const location = useLocation()
  const lang = langFromPathname(location.pathname)
  const clients = useTranslatedClients()
  const client = clients.find((c) => c.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!client) return <Navigate to={withLang('/clients', lang)} replace />

  return (
    <div className="min-h-screen pt-16 pb-24" style={{ background: 'var(--bg)' }}>
      <Seo
        title={t('clientsPage.caseMetaTitle', { name: client.name })}
        description={`${client.tagline} — ${client.description}`.slice(0, 155)}
      />

      <div className="page-wrap" style={{ maxWidth: 1100, paddingLeft: 0, paddingRight: 0 }}>
        <div className="px-6 md:px-0 pt-8 pb-6">
          <Link
            to={withLang('/clients', lang)}
            className="pixel-font text-[10px] bg-white/90 border border-indigo-100 text-slate-500 hover:text-indigo-600 hover:border-indigo-400 transition-colors px-4 py-3 tracking-widest shadow-md inline-block"
          >
            {t('clientsPage.back')}
          </Link>
        </div>

        <ClientDetail c={client} t={t} titleTag="h1" beamIn={Boolean(location.state?.stage)} />

        {/* Bottom CTA */}
        <div className="mt-16 float-card p-14 text-center mx-6 md:mx-0">
          <div className="pixel-font text-[10px] text-indigo-400 mb-5 tracking-widest">{t('clientsPage.bottomTag')}</div>
          <h2 className="pixel-font text-slate-800 mb-5" style={{ fontSize: '18px', lineHeight: 1.6 }}>
            {t('clientsPage.bottomTitle')}
          </h2>
          <p className="text-slate-600 text-sm leading-loose mb-10 max-w-md mx-auto">
            {t('clientsPage.bottomSub')}
          </p>
          <Link
            to={withLang('/', lang)}
            onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
            className="pixel-btn"
          >
            {t('clientsPage.bottomCta')}
          </Link>
        </div>
      </div>
    </div>
  )
}
