import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, register, error: authError } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    seedKey: '',
  });
  const [showSeedKey, setShowSeedKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLoginMode) {
        await login(formData.username, formData.password, formData.seedKey);
      } else {
        if (!formData.email) {
          throw new Error(t('login.errors.emailRequired'));
        }
        await register(formData.username, formData.email, formData.password, formData.seedKey);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || t('login.errors.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo and Title */}
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-circle">
              <svg viewBox="0 0 100 100" className="logo-eye">
                <circle cx="50" cy="50" r="40" className="eye-outer" />
                <circle cx="50" cy="50" r="20" className="eye-pupil" />
                <circle cx="50" cy="50" r="8" className="eye-iris" />
              </svg>
            </div>
          </div>
          <h1 className="login-title">eyeO Platform</h1>
          <p className="login-subtitle">
            {isLoginMode ? t('login.welcomeBack') : t('login.createAccount')}
          </p>
        </div>

        {/* Error Message */}
        {(error || authError) && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            {error || authError}
          </div>
        )}

        {/* Login/Register Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">{t('login.username')}</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder={t('login.usernamePlaceholder')}
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="email">{t('login.email')}</label>
              <input
                id="email"
                name="email"
                type="email"
                required={!isLoginMode}
                value={formData.email}
                onChange={handleChange}
                placeholder={t('login.emailPlaceholder')}
                autoComplete="email"
                disabled={isLoading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder={t('login.passwordPlaceholder')}
              autoComplete={isLoginMode ? 'current-password' : 'new-password'}
              disabled={isLoading}
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seedKey">
              {t('login.seedKey')}
              <span className="tooltip-icon" title={t('login.seedKeyTooltip')}>ℹ️</span>
            </label>
            <div className="password-input-container">
              <input
                id="seedKey"
                name="seedKey"
                type={showSeedKey ? 'text' : 'password'}
                required
                value={formData.seedKey}
                onChange={handleChange}
                placeholder={t('login.seedKeyPlaceholder')}
                autoComplete="off"
                disabled={isLoading}
                minLength={32}
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowSeedKey(!showSeedKey)}
                aria-label={showSeedKey ? t('login.hideSeedKey') : t('login.showSeedKey')}
              >
                {showSeedKey ? '👁️' : '🙈'}
              </button>
            </div>
            <small className="form-hint">
              {t('login.seedKeyHint')}
            </small>
          </div>

          <button
            type="submit"
            className="btn-primary btn-large"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">⏳ {t('login.loading')}</span>
            ) : (
              isLoginMode ? t('login.signIn') : t('login.signUp')
            )}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="login-footer">
          <button
            type="button"
            className="btn-link"
            onClick={() => setIsLoginMode(!isLoginMode)}
            disabled={isLoading}
          >
            {isLoginMode ? t('login.needAccount') : t('login.haveAccount')}
          </button>
        </div>

        {/* Trial Info Banner */}
        {!isLoginMode && (
          <div className="trial-banner">
            <span className="trial-icon">🎁</span>
            <div className="trial-text">
              <strong>{t('login.trialOffer')}</strong>
              <small>{t('login.trialDetails')}</small>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }

        .login-card {
          width: 100%;
          max-width: 480px;
          background: rgba(26, 26, 46, 0.95);
          border: 2px solid #00FFFF;
          border-radius: 16px;
          padding: 3rem 2rem;
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.3),
            0 0 40px rgba(0, 255, 255, 0.2);
          animation: cardGlow 3s ease-in-out infinite;
        }

        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
          50% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.5); }
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .logo-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, #00FFFF, #0080FF);
          padding: 4px;
          animation: logoPulse 2s ease-in-out infinite;
        }

        @keyframes logoPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .logo-eye {
          width: 100%;
          height: 100%;
        }

        .eye-outer {
          fill: none;
          stroke: #16213e;
          stroke-width: 2;
        }

        .eye-pupil {
          fill: #16213e;
        }

        .eye-iris {
          fill: #00FFFF;
          animation: irisGlow 1.5s ease-in-out infinite;
        }

        @keyframes irisGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .login-title {
          color: #00FFFF;
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: 3px;
          margin: 0.5rem 0;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
        }

        .login-subtitle {
          color: #8892b0;
          font-size: 0.95rem;
          margin: 0;
        }

        .alert {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .alert-error {
          background: rgba(255, 69, 58, 0.15);
          border: 1px solid #ff453a;
          color: #ff6961;
        }

        .alert-icon {
          font-size: 1.25rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          color: #00FFFF;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tooltip-icon {
          cursor: help;
          font-size: 0.9rem;
          opacity: 0.7;
        }

        .form-group input {
          padding: 0.875rem;
          border: 2px solid #2d3748;
          border-radius: 8px;
          background: rgba(22, 33, 62, 0.8);
          color: #e2e8f0;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #00FFFF;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }

        .form-group input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .password-input-container {
          position: relative;
        }

        .toggle-visibility {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem;
        }

        .form-hint {
          color: #8892b0;
          font-size: 0.8rem;
          margin-top: -0.25rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #00FFFF, #0080FF);
          color: #1a1a2e;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 255, 255, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-large {
          padding: 1.125rem;
          font-size: 1.05rem;
        }

        .loading-spinner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .login-footer {
          text-align: center;
          margin-top: 1.5rem;
        }

        .btn-link {
          background: transparent;
          border: none;
          color: #00FFFF;
          font-size: 0.95rem;
          cursor: pointer;
          text-decoration: underline;
          padding: 0.5rem;
        }

        .btn-link:hover:not(:disabled) {
          color: #00d4d4;
        }

        .trial-banner {
          margin-top: 1.5rem;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(255, 165, 0, 0.15), rgba(255, 140, 0, 0.15));
          border: 2px solid #ff8c00;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .trial-icon {
          font-size: 2rem;
        }

        .trial-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .trial-text strong {
          color: #ffa500;
          font-size: 1rem;
        }

        .trial-text small {
          color: #8892b0;
          font-size: 0.85rem;
        }

        @media (max-width: 640px) {
          .login-container {
            padding: 1rem;
          }

          .login-card {
            padding: 2rem 1.5rem;
          }

          .login-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}
