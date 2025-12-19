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
                background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
                color: '#00FFFF',
                padding: '1.2rem 2.5rem',
                borderRadius: '20px',
                border: '3px solid #00FFFF',
                boxShadow: `
                  0 0 20px rgba(0, 255, 255, 0.8),
                  0 0 40px rgba(0, 255, 255, 0.6),
                  0 0 60px rgba(0, 255, 255, 0.4),
                  inset 0 0 20px rgba(0, 255, 255, 0.2)
                `,
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fontWeight: '900',
                fontSize: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                position: 'relative',
                overflow: 'visible',
                textDecoration: 'none',
                textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.15) rotate(-3deg)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #00FFFF 0%, #00BFFF 100%)'
                e.currentTarget.style.color = '#000000'
                e.currentTarget.style.border = '3px solid #000000'
                e.currentTarget.style.boxShadow = `
                  0 0 40px rgba(0, 255, 255, 1),
                  0 0 80px rgba(0, 255, 255, 0.8),
                  0 0 120px rgba(0, 255, 255, 0.6),
                  0 20px 60px rgba(0, 0, 0, 0.8),
                  inset 0 0 40px rgba(255, 255, 255, 0.3)
                `
                e.currentTarget.style.textShadow = '0 0 20px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)'
                e.currentTarget.style.color = '#00FFFF'
                e.currentTarget.style.border = '3px solid #00FFFF'
                e.currentTarget.style.boxShadow = `
                  0 0 20px rgba(0, 255, 255, 0.8),
                  0 0 40px rgba(0, 255, 255, 0.6),
                  0 0 60px rgba(0, 255, 255, 0.4),
                  inset 0 0 20px rgba(0, 255, 255, 0.2)
                `
                e.currentTarget.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5)'
              }}
            >
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/frontproject-development-serviceApi/cat-logo.svg" 
                  alt="Epic Cat" 
                  style={{ 
                    width: '60px', 
                    height: '60px',
                    filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))',
                    display: 'block',
                    animation: 'catPulse 2s ease-in-out infinite'
                  }} 
                />
              </div>
              <span>{t('nav.home')}</span>
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
      
      <style>{`
        @keyframes catPulse {
          0%, 100% { 
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.6));
          }
          50% { 
            transform: scale(1.1);
            filter: drop-shadow(0 0 20px rgba(0, 255, 255, 1)) drop-shadow(0 0 40px rgba(0, 255, 255, 0.8));
          }
        }
      `}</style>
    </div>
  )
}