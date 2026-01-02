import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './Dashboard.css';

// Registra componentes do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

interface DetectionEvent {
    id: string;
    cameraId: string;
    timestamp: string;
    detectedClass: string;
    confidence: number;
    storageRefKey: string;
}

interface AnalyticsSummary {
    totalEvents: number;
    eventsByClass: { [key: string]: number };
    highConfidenceCount: number;
}

/**
 * Dashboard Component - Analytics & Video Access
 */
const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [events, setEvents] = useState<DetectionEvent[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCamera, setSelectedCamera] = useState<string>('all');
    
    useEffect(() => {
        // Verifica autenticação
        const seedKey = sessionStorage.getItem('eyeo_seed_key');
        if (!seedKey) {
            navigate('/login');
            return;
        }
        
        setIsAuthenticated(true);
        loadAnalytics();
        loadRecentEvents();
    }, []);
    
    const loadAnalytics = async () => {
        try {
            const apiGateway = import.meta.env.VITE_API_GATEWAY || 'https://localhost';
            const response = await fetch(`${apiGateway}/api/events/analytics/summary`);
            
            if (response.ok) {
                const data = await response.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.error('Failed to load analytics:', error);
        }
    };
    
    const loadRecentEvents = async () => {
        try {
            setIsLoading(true);
            const apiGateway = import.meta.env.VITE_API_GATEWAY || 'https://localhost';
            
            // Busca últimas 24 horas
            const endTime = new Date().toISOString();
            const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
            
            const response = await fetch(
                `${apiGateway}/api/events/events/range?start=${startTime}&end=${endTime}`
            );
            
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            }
        } catch (error) {
            console.error('Failed to load events:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };
    
    const handleWatchVideo = (storageKey: string) => {
        navigate(`/watch/${storageKey}`);
    };
    
    // Prepara dados para gráficos
    const getChartData = () => {
        if (!analytics) return null;
        
        const labels = Object.keys(analytics.eventsByClass);
        const data = Object.values(analytics.eventsByClass);
        
        return {
            labels,
            datasets: [{
                label: 'Detecções por Classe',
                data,
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6'
                ]
            }]
        };
    };
    
    if (!isAuthenticated) {
        return null;
    }
    
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>📊 EyeO Dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Sair
                </button>
            </header>
            
            {/* Cards de Estatísticas */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total de Eventos</h3>
                    <div className="stat-value">
                        {analytics?.totalEvents || 0}
                    </div>
                </div>
                
                <div className="stat-card">
                    <h3>Alta Confiança</h3>
                    <div className="stat-value">
                        {analytics?.highConfidenceCount || 0}
                    </div>
                </div>
                
                <div className="stat-card">
                    <h3>Últimas 24h</h3>
                    <div className="stat-value">
                        {events.length}
                    </div>
                </div>
            </div>
            
            {/* Gráficos */}
            {analytics && getChartData() && (
                <div className="charts-grid">
                    <div className="chart-card">
                        <h3>Detecções por Classe</h3>
                        <Bar 
                            data={getChartData()!} 
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false }
                                }
                            }}
                        />
                    </div>
                    
                    <div className="chart-card">
                        <h3>Distribuição</h3>
                        <Pie data={getChartData()!} />
                    </div>
                </div>
            )}
            
            {/* Lista de Eventos Recentes */}
            <div className="events-section">
                <h2>📹 Eventos Recentes</h2>
                
                {isLoading ? (
                    <div className="loading">Carregando eventos...</div>
                ) : events.length === 0 ? (
                    <div className="empty-state">
                        Nenhum evento registrado nas últimas 24 horas
                    </div>
                ) : (
                    <div className="events-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Câmera</th>
                                    <th>Classe</th>
                                    <th>Confiança</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event.id}>
                                        <td>
                                            {new Date(event.timestamp).toLocaleString('pt-BR')}
                                        </td>
                                        <td>{event.cameraId}</td>
                                        <td>
                                            <span className="class-badge">
                                                {event.detectedClass}
                                            </span>
                                        </td>
                                        <td>
                                            <span 
                                                className={`confidence ${
                                                    event.confidence >= 0.8 ? 'high' : 
                                                    event.confidence >= 0.5 ? 'medium' : 'low'
                                                }`}
                                            >
                                                {(event.confidence * 100).toFixed(1)}%
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                onClick={() => handleWatchVideo(event.storageRefKey)}
                                                className="watch-btn"
                                            >
                                                ▶️ Assistir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
