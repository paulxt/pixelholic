import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LanguageSuggestion from './components/LanguageSuggestion'
import ClientsPage from './pages/ClientsPage'
import { langFromPathname } from './utils/langPath'

function HomePage() {
  return (
    <main>
      <Banner />
      <Services />
      <Portfolio />
      <About />
      <Contact />
    </main>
  )
}

function LanguageSync() {
  const { pathname } = useLocation()
  const { i18n, t } = useTranslation()

  useEffect(() => {
    const lang = langFromPathname(pathname)
    if (i18n.language !== lang) i18n.changeLanguage(lang)
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant'
  }, [pathname, i18n])

  useEffect(() => {
    document.title = t('meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
  }, [t, i18n.language])

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
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/clients" element={<ClientsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
