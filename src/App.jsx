import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import MediaStrip from './components/MediaStrip'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LanguageSuggestion from './components/LanguageSuggestion'
import Seo from './components/Seo'
import ClientsPage from './pages/ClientsPage'
import ClientCasePage from './pages/ClientCasePage'
import { langFromPathname } from './utils/langPath'

function HomePage() {
  const { t } = useTranslation()
  return (
    <main>
      <Seo title={t('meta.title')} description={t('meta.description')} />
      <Banner />
      <Services />
      <Portfolio />
      <MediaStrip />
      <About />
      <Contact />
    </main>
  )
}

function LanguageSync() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = langFromPathname(pathname)
    if (i18n.language !== lang) i18n.changeLanguage(lang)
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant'
  }, [pathname, i18n])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageSync />
      <LanguageSuggestion />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:id" element={<ClientCasePage />} />
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/clients" element={<ClientsPage />} />
          <Route path="/en/clients/:id" element={<ClientCasePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
