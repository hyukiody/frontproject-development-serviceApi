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
          <div className="card" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link 
              className="button home-button" 
              to="/" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #ff7a00 0%, #ff9500 100%)',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 16px rgba(255, 122, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                position: 'relative',
                overflow: 'visible'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(255, 122, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(255, 122, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
            >
              <div style={{
                background: 'white',
                borderRadius: '50%',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                border: '2px solid rgba(255, 122, 0, 0.3)'
              }}>
                <img 
                  src="/frontproject-development-serviceApi/cat-logo.svg" 
                  alt="Cat logo" 
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    display: 'block'
                  }} 
                />
              </div>
              <span style={{ 
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                fontSize: '1.1rem'
              }}>
                {t('nav.home')}
              </span>
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
