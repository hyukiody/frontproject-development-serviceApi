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
          <div className="card" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Link 
              className="button home-button" 
              to="/" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #FF8C42 0%, #FFB380 100%)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(255, 140, 66, 0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(255, 140, 66, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(255, 140, 66, 0.3)'
              }}
            >
              <img 
                src="/frontproject-development-serviceApi/cat-logo.svg" 
                alt="Cat logo" 
                style={{ 
                  width: '32px', 
                  height: '32px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }} 
              />
              {t('nav.home')}
            </Link>
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
