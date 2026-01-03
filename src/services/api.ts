// API Service for eyeO Platform
import type { AuthenticationRequest, AuthenticationResponse, User, DetectionEvent, Camera, QuotaUsage } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';
const STREAM_API_URL = import.meta.env.VITE_STREAM_API_URL || 'http://localhost:8082';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('eyeo_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  // ===== Authentication =====

  async login(credentials: AuthenticationRequest): Promise<AuthenticationResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store token and seed key
    localStorage.setItem('eyeo_token', data.accessToken);
    if (credentials.seedKey) {
      localStorage.setItem('eyeo_seed_key', credentials.seedKey);
    }

    return data;
  }

  async register(credentials: AuthenticationRequest): Promise<AuthenticationResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    
    localStorage.setItem('eyeo_token', data.accessToken);
    if (credentials.seedKey) {
      localStorage.setItem('eyeo_seed_key', credentials.seedKey);
    }

    return data;
  }

  logout(): void {
    localStorage.removeItem('eyeo_token');
    localStorage.removeItem('eyeo_seed_key');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('eyeo_token');
  }

  getSeedKey(): string | null {
    return localStorage.getItem('eyeo_seed_key');
  }

  // ===== User Profile =====

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return response.json();
  }

  // ===== Quota Usage =====

  async getQuotaUsage(): Promise<QuotaUsage> {
    const response = await fetch(`${API_BASE_URL}/users/me/quota`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quota usage');
    }

    return response.json();
  }

  // ===== Detection Events =====

  async getDetectionEvents(limit: number = 50, cameraId?: string): Promise<DetectionEvent[]> {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (cameraId) params.append('cameraId', cameraId);

    const response = await fetch(`${STREAM_API_URL}/blue-flow/events?${params}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch detection events');
    }

    return response.json();
  }

  // ===== Cameras =====

  async getCameras(): Promise<Camera[]> {
    const response = await fetch(`${API_BASE_URL}/cameras`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cameras');
    }

    return response.json();
  }

  async addCamera(camera: Omit<Camera, 'id'>): Promise<Camera> {
    const response = await fetch(`${API_BASE_URL}/cameras`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(camera),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add camera');
    }

    return response.json();
  }

  // ===== Video Streams =====

  async getStreamUrl(storageKey: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/storage/${storageKey}/url`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to get stream URL');
    }

    const data = await response.json();
    return data.url;
  }
}

export const apiService = new ApiService();
export default apiService;
