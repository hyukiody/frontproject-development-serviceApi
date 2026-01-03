import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EncryptionDemo() {
  const [plaintext, setPlaintext] = useState('Hello, secure world! 🔐');
  const [password, setPassword] = useState('my-secret-password-2026');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const deriveKey = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  };

  const handleEncrypt = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Generate random salt and IV
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Derive encryption key
      const key = await deriveKey(password, salt);

      // Encrypt data
      const encoder = new TextEncoder();
      const data = encoder.encode(plaintext);
      const encryptedData = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
      );

      // Combine salt + IV + encrypted data
      const combined = new Uint8Array(salt.length + iv.length + encryptedData.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encryptedData), salt.length + iv.length);

      // Convert to base64
      const encryptedBase64 = arrayBufferToBase64(combined.buffer);
      setEncrypted(encryptedBase64);
      setDecrypted('');
    } catch (err: any) {
      setError(`Encryption failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrypt = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Decode base64
      const combined = new Uint8Array(base64ToArrayBuffer(encrypted));

      // Extract salt, IV, and encrypted data
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const encryptedData = combined.slice(28);

      // Derive decryption key
      const key = await deriveKey(password, salt);

      // Decrypt data
      const decryptedData = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encryptedData
      );

      // Convert to text
      const decoder = new TextDecoder();
      const decryptedText = decoder.decode(decryptedData);
      setDecrypted(decryptedText);
    } catch (err: any) {
      setError(`Decryption failed: ${err.message}. Check password.`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="demo-container">
      <header className="demo-header">
        <Link to="/showcase" className="back-link">← Back to Showcase</Link>
        <h1 className="demo-title">AES-256 Encryption Demo</h1>
        <p className="demo-subtitle">Browser-based encryption with Web Crypto API</p>
      </header>

      <div className="demo-content">
        <div className="demo-main">
          {/* Input Section */}
          <section className="demo-section">
            <h3>1️⃣ Input Data</h3>
            <label htmlFor="plaintext">Plaintext Message</label>
            <textarea
              id="plaintext"
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              placeholder="Enter text to encrypt..."
              rows={4}
            />

            <label htmlFor="password">Encryption Password</label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (min 8 characters)"
            />

            <button
              className="action-btn encrypt-btn"
              onClick={handleEncrypt}
              disabled={isProcessing || !plaintext || password.length < 8}
            >
              {isProcessing ? '⏳ Encrypting...' : '🔒 Encrypt with AES-256-GCM'}
            </button>
          </section>

          {/* Encrypted Output */}
          {encrypted && (
            <section className="demo-section">
              <h3>2️⃣ Encrypted Output</h3>
              <div className="output-box">
                <div className="output-label">Base64 Encoded Ciphertext:</div>
                <div className="output-value encrypted">
                  {encrypted}
                </div>
                <div className="output-meta">
                  Length: {encrypted.length} characters • 
                  Format: [16B Salt][12B IV][Encrypted Data][16B Auth Tag]
                </div>
              </div>

              <button
                className="action-btn decrypt-btn"
                onClick={handleDecrypt}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Decrypting...' : '🔓 Decrypt Back to Plaintext'}
              </button>
            </section>
          )}

          {/* Decrypted Output */}
          {decrypted && (
            <section className="demo-section success">
              <h3>✅ Decryption Successful</h3>
              <div className="output-box">
                <div className="output-label">Decrypted Plaintext:</div>
                <div className="output-value decrypted">
                  {decrypted}
                </div>
                <div className="output-meta success-msg">
                  ✓ Message integrity verified via AES-GCM authentication tag
                </div>
              </div>
            </section>
          )}

          {/* Error Display */}
          {error && (
            <section className="demo-section error">
              <h3>⚠️ Error</h3>
              <div className="error-message">{error}</div>
            </section>
          )}
        </div>

        {/* Info Sidebar */}
        <aside className="demo-info">
          <section className="info-section">
            <h3>🔐 How It Works</h3>
            <ol>
              <li><strong>PBKDF2 Key Derivation</strong> - Password → 256-bit key (100k iterations)</li>
              <li><strong>Random Salt & IV</strong> - Unique per encryption</li>
              <li><strong>AES-256-GCM Encryption</strong> - Authenticated encryption</li>
              <li><strong>Base64 Encoding</strong> - Binary → text format</li>
            </ol>
          </section>

          <section className="info-section">
            <h3>🛡️ Security Features</h3>
            <ul>
              <li><strong>AES-256</strong> - Military-grade encryption</li>
              <li><strong>GCM Mode</strong> - Authenticated encryption (prevents tampering)</li>
              <li><strong>PBKDF2</strong> - Password-based key derivation</li>
              <li><strong>100k Iterations</strong> - Resistant to brute-force</li>
              <li><strong>Random Salt</strong> - Prevents rainbow table attacks</li>
              <li><strong>12-byte IV</strong> - Nonce for GCM mode</li>
            </ul>
          </section>

          <section className="info-section">
            <h3>💻 Technical Stack</h3>
            <ul>
              <li><strong>Web Crypto API</strong> - Browser-native crypto</li>
              <li><strong>AES-256-GCM</strong> - Symmetric encryption</li>
              <li><strong>PBKDF2-SHA256</strong> - Key derivation function</li>
              <li><strong>TypeScript</strong> - Type-safe implementation</li>
            </ul>
          </section>

          <section className="info-section">
            <h3>📋 Data Format</h3>
            <pre className="code-block">{`[16 bytes] Salt (PBKDF2)
[12 bytes] IV (GCM nonce)
[N bytes]  Encrypted data
[16 bytes] Auth tag (GCM)

Total: Base64 encoded`}</pre>
          </section>

          <section className="info-section disclaimer">
            <h3>⚠️ Demo Notice</h3>
            <p>
              This is a <strong>educational demonstration</strong> of client-side encryption.
              In production, the eyeO platform uses this same technique for 
              <strong> Zero-Trust video decryption</strong> with Web Workers for 
              non-blocking performance.
            </p>
          </section>

          <section className="info-section">
            <h3>🔗 Production Use Case</h3>
            <p>
              The eyeO platform encrypts video streams server-side with AES-256-GCM,
              then decrypts client-side using the user's seed key. This ensures
              <strong> zero-trust architecture</strong> - the server never has access
              to decrypted video content.
            </p>
          </section>
        </aside>
      </div>

      <style>{`
        .demo-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 2rem;
        }

        .demo-header {
          text-align: center;
          margin-bottom: 2rem;
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

        .demo-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .demo-main {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .demo-section {
          background: rgba(30, 41, 59, 0.9);
          border: 2px solid #334155;
          border-radius: 12px;
          padding: 2rem;
        }

        .demo-section.success {
          border-color: #4ade80;
          background: rgba(74, 222, 128, 0.1);
        }

        .demo-section.error {
          border-color: #f87171;
          background: rgba(248, 113, 113, 0.1);
        }

        .demo-section h3 {
          color: #00FFFF;
          font-size: 1.3rem;
          margin: 0 0 1.5rem 0;
        }

        .demo-section.success h3 {
          color: #4ade80;
        }

        .demo-section.error h3 {
          color: #f87171;
        }

        label {
          display: block;
          color: #cbd5e1;
          font-weight: 600;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
        }

        label:first-of-type {
          margin-top: 0;
        }

        textarea, input[type="text"] {
          width: 100%;
          background: rgba(15, 23, 42, 0.8);
          border: 2px solid #475569;
          border-radius: 8px;
          padding: 0.75rem;
          color: #e2e8f0;
          font-family: 'Courier New', monospace;
          font-size: 0.95rem;
          resize: vertical;
        }

        textarea:focus, input:focus {
          outline: none;
          border-color: #00FFFF;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }

        .action-btn {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .encrypt-btn {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #000;
        }

        .encrypt-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
        }

        .decrypt-btn {
          background: linear-gradient(135deg, #00FFFF, #0080FF);
          color: #000;
        }

        .decrypt-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 255, 255, 0.4);
        }

        .output-box {
          background: rgba(15, 23, 42, 0.8);
          border: 2px solid #475569;
          border-radius: 8px;
          padding: 1rem;
        }

        .output-label {
          color: #94a3b8;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .output-value {
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
          word-break: break-all;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 0.75rem;
        }

        .output-value.encrypted {
          background: rgba(245, 158, 11, 0.1);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .output-value.decrypted {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
          border: 1px solid rgba(74, 222, 128, 0.3);
          font-size: 1.1rem;
        }

        .output-meta {
          color: #64748b;
          font-size: 0.8rem;
          font-family: monospace;
        }

        .output-meta.success-msg {
          color: #4ade80;
          font-weight: 600;
        }

        .error-message {
          color: #f87171;
          font-weight: 600;
          padding: 1rem;
          background: rgba(248, 113, 113, 0.1);
          border-radius: 8px;
        }

        .demo-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-section {
          background: rgba(30, 41, 59, 0.9);
          border: 2px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .info-section h3 {
          color: #00FFFF;
          font-size: 1.1rem;
          margin: 0 0 1rem 0;
        }

        .info-section ol, .info-section ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #cbd5e1;
        }

        .info-section li {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }

        .info-section p {
          color: #cbd5e1;
          line-height: 1.6;
          margin: 0;
        }

        .code-block {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid #475569;
          border-radius: 6px;
          padding: 1rem;
          color: #4ade80;
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          line-height: 1.8;
          overflow-x: auto;
          margin: 0;
        }

        .disclaimer {
          border-color: rgba(255, 165, 0, 0.4);
          background: rgba(255, 165, 0, 0.1);
        }

        .disclaimer h3 {
          color: #ffa500;
        }

        @media (max-width: 1200px) {
          .demo-content {
            grid-template-columns: 1fr;
          }

          .demo-info {
            max-width: 800px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .demo-title {
            font-size: 2rem;
          }

          .demo-section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
