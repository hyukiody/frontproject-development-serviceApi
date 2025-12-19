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
                gap: '1rem',
                background: '#FFFFFF',
                color: '#ff7a00',
                padding: '1rem 2rem',
                borderRadius: '16px',
                border: '4px solid #ff7a00',
                boxShadow: '0 10px 30px rgba(255, 122, 0, 0.6), 0 0 60px rgba(255, 122, 0, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                fontWeight: '900',
                fontSize: '1.4rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                position: 'relative',
                overflow: 'visible',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.1) rotate(-2deg)'
                e.currentTarget.style.background = '#ff7a00'
                e.currentTarget.style.color = '#FFFFFF'
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 122, 0, 0.8), 0 0 100px rgba(255, 122, 0, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)'
                e.currentTarget.style.background = '#FFFFFF'
                e.currentTarget.style.color = '#ff7a00'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 122, 0, 0.6), 0 0 60px rgba(255, 122, 0, 0.4)'
              }}
            >
              <span style={{ fontSize: '3rem', lineHeight: '1', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>🐱</span>
              <span style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>{t('nav.home')}</span>
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