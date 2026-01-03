import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Showcase() {
  const { t } = useTranslation();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <div className="showcase-container">
      <header className="showcase-header">
        <h1 className="showcase-title">Technical Showcase</h1>
        <p className="showcase-subtitle">
          Isolated demonstrations of key technologies • No proprietary code exposed
        </p>
      </header>

      <div className="showcase-grid">
        {/* Object Detection Demo Card */}
        <Link to="/showcase/object-detection" className="showcase-card">
          <div className="card-icon">🎯</div>
          <h2 className="card-title">Object Detection</h2>
          <p className="card-description">
            Real-time YOLOv8 object detection with canvas visualization
          </p>
          <div className="card-tags">
            <span className="tag">YOLOv8</span>
            <span className="tag">Canvas API</span>
            <span className="tag">Real-time</span>
          </div>
          <div className="card-footer">
            <span className="card-action">View Demo →</span>
          </div>
        </Link>

        {/* Encryption Demo Card */}
        <Link to="/showcase/encryption" className="showcase-card">
          <div className="card-icon">🔐</div>
          <h2 className="card-title">AES-256 Encryption</h2>
          <p className="card-description">
            Browser-based encryption/decryption with Web Crypto API
          </p>
          <div className="card-tags">
            <span className="tag">AES-256-GCM</span>
            <span className="tag">PBKDF2</span>
            <span className="tag">Zero-Trust</span>
          </div>
          <div className="card-footer">
            <span className="card-action">View Demo →</span>
          </div>
        </Link>

        {/* Architecture Card */}
        <Link to="/showcase/architecture" className="showcase-card">
          <div className="card-icon">🏗️</div>
          <h2 className="card-title">Architecture & Stack</h2>
          <p className="card-description">
            System design patterns and technology overview
          </p>
          <div className="card-tags">
            <span className="tag">Microservices</span>
            <span className="tag">Zero-Trust</span>
            <span className="tag">SNA</span>
          </div>
          <div className="card-footer">
            <span className="card-action">View Details →</span>
          </div>
        </Link>

        {/* Code Samples Card */}
        <div className="showcase-card coming-soon">
          <div className="card-icon">💻</div>
          <h2 className="card-title">Code Samples</h2>
          <p className="card-description">
            Curated code snippets and design patterns
          </p>
          <div className="card-tags">
            <span className="tag">TypeScript</span>
            <span className="tag">Java</span>
            <span className="tag">React</span>
          </div>
          <div className="card-footer">
            <span className="card-badge">Coming Soon</span>
          </div>
        </div>

        {/* Performance Metrics Card */}
        <div className="showcase-card coming-soon">
          <div className="card-icon">📊</div>
          <h2 className="card-title">Performance Metrics</h2>
          <p className="card-description">
            Lighthouse scores, bundle analysis, optimization techniques
          </p>
          <div className="card-tags">
            <span className="tag">Vite</span>
            <span className="tag">Optimization</span>
            <span className="tag">PWA</span>
          </div>
          <div className="card-footer">
            <span className="card-badge">Coming Soon</span>
          </div>
        </div>

        {/* Security Patterns Card */}
        <div className="showcase-card coming-soon">
          <div className="card-icon">🛡️</div>
          <h2 className="card-title">Security Patterns</h2>
          <p className="card-description">
            JWT implementation, CORS, CSRF protection strategies
          </p>
          <div className="card-tags">
            <span className="tag">JWT</span>
            <span className="tag">CORS</span>
            <span className="tag">Spring Security</span>
          </div>
          <div className="card-footer">
            <span className="card-badge">Coming Soon</span>
          </div>
        </div>
      </div>

      <section className="showcase-disclaimer">
        <h3>⚠️ Showcase Disclaimer</h3>
        <p>
          These demonstrations are <strong>isolated modules</strong> designed for portfolio purposes.
          They showcase technical capabilities without exposing proprietary architecture or production code.
          All demos use simulated data and standalone implementations.
        </p>
      </section>

      <style>{`
        .showcase-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 2rem;
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2rem 0;
        }

        .showcase-title {
          color: #00FFFF;
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: 2px;
          margin: 0;
          text-shadow: 
            0 0 10px rgba(0, 255, 255, 0.8),
            0 0 20px rgba(0, 255, 255, 0.6),
            0 0 30px rgba(0, 255, 255, 0.4);
        }

        .showcase-subtitle {
          color: #94a3b8;
          font-size: 1.1rem;
          margin-top: 1rem;
        }

        .showcase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto 3rem;
        }

        .showcase-card {
          background: rgba(30, 41, 59, 0.9);
          border: 2px solid #334155;
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .showcase-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #00FFFF, #0080FF);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .showcase-card:hover::before {
          transform: scaleX(1);
        }

        .showcase-card:hover {
          border-color: #00FFFF;
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 255, 255, 0.3);
        }

        .showcase-card.coming-soon {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .showcase-card.coming-soon:hover {
          transform: none;
          border-color: #334155;
          box-shadow: none;
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .card-title {
          color: #e2e8f0;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
        }

        .card-description {
          color: #94a3b8;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tag {
          background: rgba(0, 255, 255, 0.1);
          color: #00FFFF;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          border: 1px solid rgba(0, 255, 255, 0.3);
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-action {
          color: #00FFFF;
          font-weight: 600;
          font-size: 1rem;
        }

        .card-badge {
          background: rgba(255, 165, 0, 0.2);
          color: #ffa500;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(255, 165, 0, 0.4);
        }

        .showcase-disclaimer {
          max-width: 900px;
          margin: 3rem auto;
          padding: 2rem;
          background: rgba(255, 165, 0, 0.1);
          border: 2px solid rgba(255, 165, 0, 0.4);
          border-radius: 12px;
        }

        .showcase-disclaimer h3 {
          color: #ffa500;
          margin: 0 0 1rem 0;
          font-size: 1.2rem;
        }

        .showcase-disclaimer p {
          color: #cbd5e1;
          line-height: 1.8;
          margin: 0;
        }

        @media (max-width: 768px) {
          .showcase-title {
            font-size: 2rem;
          }

          .showcase-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .showcase-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
