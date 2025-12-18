import { Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Portfolio from './pages/Portfolio'

export default function App() {
  const { t, i18n } = useTranslation()
  return (
    <div>
      <nav aria-label="Primary">
        <a className="skip-link" href="#main">Skip to main content</a>
        <div className="app" style={{ padding: 0 }}>
          <div className="card" style={{ display: 'flex', gap: '0.5rem' }}>
            <Link className="button" to="/">{t('nav.home')}</Link>
            <a className="button" href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">{t('nav.docs')}</a>
            <button className="button" onClick={() => i18n.changeLanguage('en')} aria-label="Switch to English">{t('nav.en')}</button>
            <button className="button" onClick={() => i18n.changeLanguage('ja')} aria-label="日本語に切り替え">{t('nav.ja')}</button>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </div>
  )
}
