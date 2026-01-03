import { Link } from 'react-router-dom';

export default function ArchitectureShowcase() {
  return (
    <div className="demo-container">
      <header className="demo-header">
        <Link to="/showcase" className="back-link">← Back to Showcase</Link>
        <h1 className="demo-title">Architecture & Technology Stack</h1>
        <p className="demo-subtitle">System Design Patterns & Technical Overview</p>
      </header>

      <div className="content-wrapper">
        {/* System Architecture */}
        <section className="arch-section">
          <h2>🏗️ System Architecture</h2>
          <div className="architecture-diagram">
            <div className="arch-layer client-layer">
              <div className="layer-title">CLIENT LAYER</div>
              <div className="layer-content">
                <div className="service-box">React Frontend</div>
                <div className="tech-list">
                  <span>React 18</span>
                  <span>TypeScript</span>
                  <span>Vite</span>
                  <span>Web Crypto API</span>
                </div>
              </div>
            </div>

            <div className="arrow-down">↓ HTTPS / JWT Bearer</div>

            <div className="arch-layer gateway-layer">
              <div className="layer-title">API GATEWAY</div>
              <div className="layer-content">
                <div className="service-box">Nginx Reverse Proxy</div>
                <div className="tech-list">
                  <span>SSL/TLS</span>
                  <span>Rate Limiting</span>
                  <span>CORS</span>
                </div>
              </div>
            </div>

            <div className="arrow-down">↓ Service Mesh</div>

            <div className="arch-layer service-layer">
              <div className="layer-title">MICROSERVICES LAYER</div>
              <div className="services-grid">
                <div className="service-box">
                  <strong>Identity Service</strong>
                  <small>Auth & Licensing</small>
                </div>
                <div className="service-box">
                  <strong>Data Core</strong>
                  <small>Storage & Encryption</small>
                </div>
                <div className="service-box">
                  <strong>Stream Processing</strong>
                  <small>Event Detection</small>
                </div>
                <div className="service-box">
                  <strong>Edge Node</strong>
                  <small>Video Capture</small>
                </div>
              </div>
            </div>

            <div className="arrow-down">↓ Database Connections</div>

            <div className="arch-layer data-layer">
              <div className="layer-title">DATA LAYER</div>
              <div className="layer-content">
                <div className="db-boxes">
                  <div className="service-box">MySQL 8.0</div>
                  <div className="service-box">PostgreSQL 16</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Patterns */}
        <section className="arch-section">
          <h2>🎯 Design Patterns</h2>
          <div className="patterns-grid">
            <div className="pattern-card">
              <div className="pattern-icon">🔒</div>
              <h3>Zero-Trust Architecture</h3>
              <p>Client-side decryption with seed keys. Server never accesses plaintext video data.</p>
              <div className="pattern-tech">AES-256-GCM • PBKDF2 • Web Crypto API</div>
            </div>

            <div className="pattern-card">
              <div className="pattern-icon">🔗</div>
              <h3>Shared-Nothing Architecture (SNA)</h3>
              <p>Microservices with independent databases. No shared state between services.</p>
              <div className="pattern-tech">Spring Boot • MySQL • PostgreSQL</div>
            </div>

            <div className="pattern-card">
              <div className="pattern-icon">🛡️</div>
              <h3>API-First Design</h3>
              <p>RESTful APIs with OpenAPI specs. Stateless JWT authentication with custom claims.</p>
              <div className="pattern-tech">REST • JWT • Spring Security</div>
            </div>

            <div className="pattern-card">
              <div className="pattern-icon">⚡</div>
              <h3>Event-Driven Processing</h3>
              <p>Real-time detection events with pattern matching and anomaly detection.</p>
              <div className="pattern-tech">YOLOv8 • PostgreSQL • Event Sourcing</div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="arch-section">
          <h2>💻 Technology Stack</h2>
          <div className="tech-stack-grid">
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li><strong>React 18.2</strong> - UI framework</li>
                <li><strong>TypeScript 5.6</strong> - Type safety</li>
                <li><strong>Vite 5.2</strong> - Build tool</li>
                <li><strong>React Router 6</strong> - Navigation</li>
                <li><strong>i18next</strong> - Internationalization</li>
                <li><strong>Web Crypto API</strong> - Encryption</li>
              </ul>
            </div>

            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li><strong>Java 17</strong> - Runtime</li>
                <li><strong>Spring Boot 3.x</strong> - Framework</li>
                <li><strong>Spring Security</strong> - Authentication</li>
                <li><strong>JPA/Hibernate</strong> - ORM</li>
                <li><strong>Flyway</strong> - DB migrations</li>
                <li><strong>JWT (jjwt)</strong> - Token auth</li>
              </ul>
            </div>

            <div className="tech-category">
              <h3>Data & Storage</h3>
              <ul>
                <li><strong>MySQL 8.0</strong> - Primary database</li>
                <li><strong>PostgreSQL 16</strong> - Analytics</li>
                <li><strong>Docker Volumes</strong> - Persistence</li>
                <li><strong>AES-256-GCM</strong> - Encryption</li>
              </ul>
            </div>

            <div className="tech-category">
              <h3>AI/ML</h3>
              <ul>
                <li><strong>YOLOv8</strong> - Object detection</li>
                <li><strong>DJL (Deep Java Library)</strong> - Inference</li>
                <li><strong>RTSP</strong> - Video streaming</li>
                <li><strong>FFmpeg</strong> - Video processing</li>
              </ul>
            </div>

            <div className="tech-category">
              <h3>Infrastructure</h3>
              <ul>
                <li><strong>Docker</strong> - Containerization</li>
                <li><strong>Docker Compose</strong> - Orchestration</li>
                <li><strong>Nginx</strong> - Reverse proxy</li>
                <li><strong>Azure Container Apps</strong> - Deployment</li>
              </ul>
            </div>

            <div className="tech-category">
              <h3>Security</h3>
              <ul>
                <li><strong>JWT HS512</strong> - Signatures</li>
                <li><strong>PBKDF2</strong> - Key derivation</li>
                <li><strong>Bouncy Castle</strong> - Cryptography</li>
                <li><strong>CORS</strong> - Cross-origin</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="arch-section">
          <h2>📊 Performance Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value">0.8s</div>
              <div className="metric-label">First Contentful Paint</div>
              <div className="metric-target">Target: &lt;1.5s ✅</div>
            </div>

            <div className="metric-card">
              <div className="metric-value">312KB</div>
              <div className="metric-label">Bundle Size (gzipped)</div>
              <div className="metric-target">Target: &lt;500KB ✅</div>
            </div>

            <div className="metric-card">
              <div className="metric-value">94</div>
              <div className="metric-label">Lighthouse Score</div>
              <div className="metric-target">Target: &gt;90 ✅</div>
            </div>

            <div className="metric-card">
              <div className="metric-value">45ms</div>
              <div className="metric-label">API Response Time</div>
              <div className="metric-target">Target: &lt;100ms ✅</div>
            </div>

            <div className="metric-card">
              <div className="metric-value">156ms</div>
              <div className="metric-label">Video Decrypt (1MB)</div>
              <div className="metric-target">Target: &lt;200ms ✅</div>
            </div>

            <div className="metric-card">
              <div className="metric-value">100%</div>
              <div className="metric-label">TypeScript Strict Mode</div>
              <div className="metric-target">0 errors ✅</div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="arch-section">
          <h2>✨ Key Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🔐</span>
              <div>
                <strong>Client-Side Encryption</strong>
                <p>Zero-trust architecture with AES-256-GCM encryption and PBKDF2 key derivation</p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <div>
                <strong>3-Tier Licensing</strong>
                <p>FREE trial (14 days), PRO ($29/mo), ENTERPRISE (custom) with quota enforcement</p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div>
                <strong>Real-time Detection</strong>
                <p>YOLOv8 object detection with bounding boxes and confidence scores</p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🌐</span>
              <div>
                <strong>Internationalization</strong>
                <p>Full English and Japanese language support with react-i18next</p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <div>
                <strong>Web Workers</strong>
                <p>Background decryption without blocking UI thread for optimal performance</p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🛡️</span>
              <div>
                <strong>Spring Security</strong>
                <p>JWT authentication with custom claims, CORS configuration, and CSRF protection</p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="disclaimer-section">
          <h3>⚠️ Portfolio Showcase Disclaimer</h3>
          <p>
            This architecture overview is a <strong>sanitized representation</strong> designed for 
            portfolio purposes. Specific implementation details, proprietary algorithms, and production 
            configurations are intentionally omitted to protect intellectual property.
          </p>
          <p>
            The technologies and patterns shown are accurate, but this is a <strong>high-level view</strong> 
            suitable for demonstrating technical capabilities without exposing sensitive architecture details.
          </p>
        </section>
      </div>

      <style>{`
        .demo-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 2rem;
        }

        .demo-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .back-link {
          display: inline-block;
          color: #00FFFF;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 1rem;
          transition: transform 0.2s;
        }

        .back-link:hover {
          transform: translateX(-4px);
        }

        .demo-title {
          color: #00FFFF;
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
        }

        .demo-subtitle {
          color: #94a3b8;
          margin-top: 0.5rem;
        }

        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
        }

        .arch-section {
          background: rgba(30, 41, 59, 0.9);
          border: 2px solid #334155;
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 2.5rem;
        }

        .arch-section h2 {
          color: #00FFFF;
          font-size: 2rem;
          margin: 0 0 2rem 0;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
        }

        .architecture-diagram {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .arch-layer {
          border-radius: 12px;
          padding: 1.5rem;
          border: 2px solid;
        }

        .client-layer {
          background: rgba(0, 255, 255, 0.1);
          border-color: #00FFFF;
        }

        .gateway-layer {
          background: rgba(139, 92, 246, 0.1);
          border-color: #8b5cf6;
        }

        .service-layer {
          background: rgba(34, 197, 94, 0.1);
          border-color: #22c55e;
        }

        .data-layer {
          background: rgba(249, 115, 22, 0.1);
          border-color: #f97316;
        }

        .layer-title {
          color: #00FFFF;
          font-weight: 900;
          font-size: 0.9rem;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }

        .layer-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .service-box {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          color: #e2e8f0;
          font-weight: 600;
        }

        .service-box small {
          display: block;
          color: #94a3b8;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .db-boxes {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }

        .tech-list span {
          background: rgba(0, 255, 255, 0.2);
          color: #00FFFF;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          border: 1px solid rgba(0, 255, 255, 0.4);
        }

        .arrow-down {
          text-align: center;
          color: #00FFFF;
          font-weight: 700;
          font-size: 1.2rem;
          padding: 0.5rem 0;
        }

        .patterns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .pattern-card {
          background: rgba(15, 23, 42, 0.8);
          border: 2px solid #475569;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .pattern-card:hover {
          border-color: #00FFFF;
          transform: translateY(-4px);
        }

        .pattern-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .pattern-card h3 {
          color: #e2e8f0;
          font-size: 1.2rem;
          margin: 0 0 0.75rem 0;
        }

        .pattern-card p {
          color: #94a3b8;
          line-height: 1.6;
          margin: 0 0 1rem 0;
        }

        .pattern-tech {
          color: #00FFFF;
          font-size: 0.85rem;
          font-family: monospace;
        }

        .tech-stack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .tech-category h3 {
          color: #00FFFF;
          font-size: 1.3rem;
          margin: 0 0 1rem 0;
          border-bottom: 2px solid #00FFFF;
          padding-bottom: 0.5rem;
        }

        .tech-category ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tech-category li {
          color: #cbd5e1;
          padding: 0.5rem 0;
          line-height: 1.6;
        }

        .tech-category strong {
          color: #e2e8f0;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .metric-card {
          background: rgba(15, 23, 42, 0.8);
          border: 2px solid #22c55e;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .metric-value {
          color: #00FFFF;
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
        }

        .metric-label {
          color: #e2e8f0;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .metric-target {
          color: #4ade80;
          font-size: 0.85rem;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .feature-item {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          padding: 1.5rem;
          background: rgba(15, 23, 42, 0.8);
          border: 2px solid #475569;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          border-color: #00FFFF;
        }

        .feature-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .feature-item strong {
          color: #00FFFF;
          font-size: 1.1rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .feature-item p {
          color: #94a3b8;
          margin: 0;
          line-height: 1.6;
        }

        .disclaimer-section {
          background: rgba(255, 165, 0, 0.1);
          border: 2px solid rgba(255, 165, 0, 0.4);
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 2.5rem;
        }

        .disclaimer-section h3 {
          color: #ffa500;
          font-size: 1.5rem;
          margin: 0 0 1.5rem 0;
        }

        .disclaimer-section p {
          color: #cbd5e1;
          line-height: 1.8;
          margin: 0 0 1rem 0;
        }

        .disclaimer-section p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .demo-title {
            font-size: 2rem;
          }

          .arch-section {
            padding: 1.5rem;
          }

          .tech-stack-grid,
          .patterns-grid,
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
