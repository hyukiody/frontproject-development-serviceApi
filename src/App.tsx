import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Portfolio from './pages/Portfolio'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Showcase from './pages/Showcase'
import ObjectDetectionDemo from './pages/showcase/ObjectDetectionDemo'
import EncryptionDemo from './pages/showcase/EncryptionDemo'
import ArchitectureShowcase from './pages/showcase/ArchitectureShowcase'
import TestDashboard from './components/TestDashboard'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

// Navigation Component
function Navigation() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav aria-label="Primary">
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="app" style={{ padding: 0 }}>
        <div className="card" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link 
              className="button" 
              to="/" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none'
              }}
            >
              <img 
                src="/frontproject-development-serviceApi/cat-logo.svg" 
                alt="Cat logo" 
                style={{ 
                  width: '32px', 
                  height: '32px',
                  display: 'block'
                }} 
              />
              {t('nav.home')}
            </Link>
            {isAuthenticated && (
              <Link className="button" to="/dashboard">
                {t('nav.dashboard')}
              </Link>
            )}
            <Link className="button" to="/showcase">
              Showcase
            </Link>
            <Link className="button" to="/test-dashboard" style={{ background: 'linear-gradient(135deg, #ff7a00 0%, #ff5500 100%)', fontWeight: 'bold' }}>
              🧪 Tests
            </Link>
            <a className="button" href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">{t('nav.docs')}</a>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {isAuthenticated && user && (
              <span style={{ color: '#00FFFF', marginRight: '0.5rem' }}>
                👤 {user.username}
              </span>
            )}
            <button className="button" onClick={() => i18n.changeLanguage('en')} aria-label="Switch to English">{t('nav.en')}</button>
            <button className="button" onClick={() => i18n.changeLanguage('ja')} aria-label="日本語に切り替え">{t('nav.ja')}</button>
            {isAuthenticated ? (
              <button className="button" onClick={logout}>{t('nav.logout')}</button>
            ) : (
              <Link className="button" to="/login">{t('nav.login')}</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div>
        <Navigation />

        {/* Cyberpunk Neon Divider Section */}
        <div className="neon-divider-section">
          <div className="neon-line"></div>
          <div className="neon-text">eyeO SURVEILLANCE PLATFORM</div>
          <div className="neon-line"></div>
        </div>

        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/showcase/object-detection" element={<ObjectDetectionDemo />} />
          <Route path="/showcase/encryption" element={<EncryptionDemo />} />
          <Route path="/showcase/architecture" element={<ArchitectureShowcase />} />
          <Route path="/test-dashboard" element={<TestDashboard />} />
        </Routes>

        <style>{`
        .neon-divider-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 2rem 2rem 1rem 2rem;
          max-width: 720px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .neon-divider-section {
            padding: 1.5rem 1rem 0.75rem 1rem;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .neon-divider-section {
            flex-direction: column;
            gap: 0.75rem;
            padding: 1rem 1rem 0.5rem 1rem;
          }
        }

        .neon-line {
          flex: 1;
          height: 3px;
          background: linear-gradient(90deg, transparent, #00FFFF, transparent);
          box-shadow: 
            0 0 10px rgba(0, 255, 255, 0.8),
            0 0 20px rgba(0, 255, 255, 0.6),
            0 0 30px rgba(0, 255, 255, 0.4);
          animation: neonPulse 2s ease-in-out infinite;
        }

        @media (max-width: 480px) {
          .neon-line {
            width: 100%;
            height: 2px;
          }
        }

        .neon-text {
          color: #00FFFF;
          font-size: 1.2rem;
          font-weight: 900;
          letter-spacing: 4px;
          text-transform: uppercase;
          white-space: nowrap;
          text-shadow: 
            0 0 10px rgba(0, 255, 255, 0.8),
            0 0 20px rgba(0, 255, 255, 0.6),
            0 0 30px rgba(0, 255, 255, 0.4),
            0 0 40px rgba(0, 255, 255, 0.2);
          animation: neonTextPulse 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .neon-text {
            font-size: 1rem;
            letter-spacing: 3px;
          }
        }

        @media (max-width: 480px) {
          .neon-text {
            font-size: 0.875rem;
            letter-spacing: 2px;
          }
        }

        @keyframes neonPulse {
          0%, 100% { 
            opacity: 1;
            box-shadow: 
              0 0 10px rgba(0, 255, 255, 0.8),
              0 0 20px rgba(0, 255, 255, 0.6),
              0 0 30px rgba(0, 255, 255, 0.4);
          }
          50% { 
            opacity: 0.7;
            box-shadow: 
              0 0 20px rgba(0, 255, 255, 1),
              0 0 40px rgba(0, 255, 255, 0.8),
              0 0 60px rgba(0, 255, 255, 0.6);
          }
        }

        @keyframes neonTextPulse {
          0%, 100% { 
            text-shadow: 
              0 0 10px rgba(0, 255, 255, 0.8),
              0 0 20px rgba(0, 255, 255, 0.6),
              0 0 30px rgba(0, 255, 255, 0.4),
              0 0 40px rgba(0, 255, 255, 0.2);
          }
          50% { 
            text-shadow: 
              0 0 20px rgba(0, 255, 255, 1),
              0 0 40px rgba(0, 255, 255, 0.8),
              0 0 60px rgba(0, 255, 255, 0.6),
              0 0 80px rgba(0, 255, 255, 0.4);
          }
        }
      `}</style>
      </div>
    </AuthProvider>
  );
}
