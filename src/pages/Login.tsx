import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

/**
 * Login Component - Client-Side Authentication
 * 
 * Solicita Seed Key do usuário (nunca enviada ao servidor)
 */
const Login: React.FC = () => {
    const [seedKey, setSeedKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        // Validação básica
        if (seedKey.length < 16) {
            setError('Seed Key deve ter no mínimo 16 caracteres');
            setIsLoading(false);
            return;
        }
        
        try {
            // Deriva chave para testar validade (usando Web Crypto API)
            const encoder = new TextEncoder();
            const keyMaterial = encoder.encode(seedKey);
            
            const importedKey = await crypto.subtle.importKey(
                "raw",
                keyMaterial,
                "PBKDF2",
                false,
                ["deriveKey"]
            );
            
            // Deriva chave de teste
            const salt = encoder.encode("eyeo-platform-salt-v1");
            await crypto.subtle.deriveKey(
                {
                    name: "PBKDF2",
                    salt: salt,
                    iterations: 100000,
                    hash: "SHA-256"
                },
                importedKey,
                {
                    name: "AES-GCM",
                    length: 256
                },
                false,
                ["decrypt"]
            );
            
            // Armazena Seed Key na SessionStorage (memória da sessão)
            // NUNCA em LocalStorage persistente ou Cookies
            sessionStorage.setItem('eyeo_seed_key', seedKey);
            sessionStorage.setItem('eyeo_auth_time', new Date().toISOString());
            
            // Redireciona para dashboard
            navigate('/dashboard');
            
        } catch (err: any) {
            console.error('Login error:', err);
            setError('Falha ao processar Seed Key. Verifique e tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGenerateSeedKey = () => {
        // Gera seed key aleatória (apenas para demo/teste)
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        const generated = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        setSeedKey(generated);
    };
    
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>🔒 EyeO Platform</h1>
                    <p>Zero-Trust Video Surveillance System</p>
                </div>
                
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="seedKey">
                            Master Seed Key
                            <span className="tooltip" title="Chave mestra para descriptografar seus vídeos. NUNCA compartilhe!">
                                ℹ️
                            </span>
                        </label>
                        
                        <input
                            id="seedKey"
                            type="password"
                            value={seedKey}
                            onChange={(e) => setSeedKey(e.target.value)}
                            placeholder="Digite sua Seed Key (mínimo 16 caracteres)"
                            className="seed-input"
                            autoComplete="off"
                            disabled={isLoading}
                        />
                    </div>
                    
                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}
                    
                    <div className="button-group">
                        <button 
                            type="submit" 
                            className="btn-primary"
                            disabled={isLoading || seedKey.length < 16}
                        >
                            {isLoading ? 'Autenticando...' : 'Acessar Sistema'}
                        </button>
                        
                        <button 
                            type="button"
                            onClick={handleGenerateSeedKey}
                            className="btn-secondary"
                            disabled={isLoading}
                        >
                            Gerar Seed Key (Demo)
                        </button>
                    </div>
                </form>
                
                <div className="security-notice">
                    <h3>🛡️ Aviso de Segurança</h3>
                    <ul>
                        <li>Sua Seed Key <strong>NUNCA</strong> é enviada ao servidor</li>
                        <li>Todos os vídeos são descriptografados localmente no seu navegador</li>
                        <li>Sem a Seed Key, nenhum vídeo pode ser visualizado</li>
                        <li>Armazene sua Seed Key em local seguro</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Login;
