import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VideoPlayer.css';

/**
 * Secure Video Player Component
 * 
 * Descriptografa e reproduz vídeos usando Web Worker
 */
const VideoPlayer: React.FC = () => {
    const { storageKey } = useParams<{ storageKey: string }>();
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const workerRef = useRef<Worker | null>(null);
    
    useEffect(() => {
        // Verifica autenticação
        const seedKey = sessionStorage.getItem('eyeo_seed_key');
        if (!seedKey) {
            navigate('/login');
            return;
        }
        
        // Inicializa worker
        workerRef.current = new Worker(
            new URL('../workers/crypto.worker.ts', import.meta.url),
            { type: 'module' }
        );
        
        // Carrega e descriptografa vídeo
        loadAndDecryptVideo(storageKey!, seedKey);
        
        return () => {
            // Cleanup
            if (workerRef.current) {
                workerRef.current.terminate();
            }
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
        };
    }, [storageKey]);
    
    const loadAndDecryptVideo = async (key: string, seedKey: string) => {
        try {
            setIsLoading(true);
            setProgress(0);
            
            // 1. Baixa blob criptografado do Gateway
            const apiGateway = import.meta.env.VITE_API_GATEWAY || 'https://localhost';
            const response = await fetch(`${apiGateway}/api/storage/${key}`);
            
            if (!response.ok) {
                throw new Error(`Falha ao carregar vídeo: ${response.status}`);
            }
            
            const encryptedBlob = await response.arrayBuffer();
            
            setProgress(30);
            
            // 2. Descriptografa usando Web Worker
            if (!workerRef.current) {
                throw new Error('Worker não inicializado');
            }
            
            workerRef.current.onmessage = (event) => {
                const { type, data, progress: workerProgress, message } = event.data;
                
                switch (type) {
                    case 'progress':
                        setProgress(30 + (workerProgress * 0.6)); // 30% - 90%
                        break;
                        
                    case 'success':
                        // Cria Blob URL do vídeo descriptografado
                        const blob = new Blob([data], { type: 'video/mp4' });
                        const url = URL.createObjectURL(blob);
                        
                        setVideoUrl(url);
                        setProgress(100);
                        setIsLoading(false);
                        break;
                        
                    case 'error':
                        setError(`Erro de descriptografia: ${message}`);
                        setIsLoading(false);
                        break;
                }
            };
            
            // Envia para descriptografia
            workerRef.current.postMessage({
                type: 'decrypt',
                payload: {
                    encryptedBlob,
                    seedKey
                }
            });
            
        } catch (err: any) {
            console.error('Video loading error:', err);
            setError(err.message || 'Erro ao carregar vídeo');
            setIsLoading(false);
        }
    };
    
    return (
        <div className="video-player-container">
            <div className="player-header">
                <button onClick={() => navigate('/dashboard')} className="back-btn">
                    ← Voltar ao Dashboard
                </button>
                <h2>🎥 Reprodução Segura</h2>
                <div className="storage-key">Storage Key: {storageKey}</div>
            </div>
            
            {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Descriptografando vídeo...</p>
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="progress-text">{Math.round(progress)}%</span>
                </div>
            )}
            
            {error && (
                <div className="error-overlay">
                    <div className="error-box">
                        <h3>❌ Erro</h3>
                        <p>{error}</p>
                        <button onClick={() => navigate('/dashboard')}>
                            Voltar ao Dashboard
                        </button>
                    </div>
                </div>
            )}
            
            {videoUrl && !isLoading && (
                <div className="video-wrapper">
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        controls
                        autoPlay
                        className="video-element"
                    />
                    
                    <div className="video-info">
                        <p>
                            ✓ Vídeo descriptografado localmente no seu navegador
                        </p>
                        <p className="warning">
                            ⚠️ Não compartilhe esta sessão. O vídeo existe apenas na memória do navegador.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
