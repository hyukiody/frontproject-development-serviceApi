import StorageService from './storageService';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export class ApiClient {
  private baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      const token = StorageService.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const config: RequestInit = {
        method,
        headers,
      };

      if (body) {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(`${this.baseURL}${path}`, config);

      if (response.status === 401) {
        StorageService.clearUser();
      }

      const data = response.ok ? await response.json() : null;

      return {
        data: response.ok ? data : undefined,
        error: !response.ok ? `HTTP ${response.status}` : undefined,
        status: response.status,
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : 'Network error',
        status: 0,
      };
    }
  }

  public async login(email: string, password: string) {
    return this.request('/api/auth/login', 'POST', { email, password });
  }

  public async register(email: string, password: string) {
    return this.request('/api/auth/register', 'POST', { email, password });
  }

  public async uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));

    const headers: HeadersInit = {};
    const token = StorageService.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}/api/images/batch-process`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return {
      data: response.ok ? await response.json() : null,
      status: response.status,
    };
  }

  public async encryptGCM(plaintext: string, aesKey: string) {
    return this.request('/api/stream/encrypt-gcm', 'POST', { plaintext, aesKey });
  }

  public async decryptGCM(ciphertext: string, iv: string, aesKey: string) {
    return this.request('/api/stream/decrypt-gcm', 'POST', { ciphertext, iv, aesKey });
  }
}

export default new ApiClient();
