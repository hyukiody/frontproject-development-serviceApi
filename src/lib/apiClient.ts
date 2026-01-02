import StorageService from './storageService';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

const identityBase = import.meta.env.VITE_IDENTITY_API_URL || 'http://localhost:8081';
const streamBase = import.meta.env.VITE_STREAM_API_URL || 'http://localhost:8080';
const imageBase = import.meta.env.VITE_IMAGE_API_URL || 'http://localhost:8082';

export class ApiClient {
  private async request<T>(
    baseUrl: string,
    path: string,
    method: string,
    body?: unknown,
    headers: HeadersInit = { 'Content-Type': 'application/json' }
  ): Promise<ApiResponse<T>> {
    try {
      const requestHeaders: HeadersInit = { ...headers };

      const token = StorageService.getToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }

      const config: RequestInit = {
        method,
        headers: requestHeaders,
      };

      if (body) {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(`${baseUrl}${path}`, config);

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
    return this.request(identityBase, '/api/auth/login', 'POST', { email, password });
  }

  public async register(email: string, password: string) {
    return this.request(identityBase, '/api/auth/register', 'POST', { email, password });
  }

  public async uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));

    const headers: HeadersInit = {};
    const token = StorageService.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${imageBase}/api/images/batch-process`, {
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
    return this.request(streamBase, '/api/stream/encrypt-gcm', 'POST', { plaintext, aesKey });
  }

  public async decryptGCM(ciphertext: string, iv: string, aesKey: string) {
    return this.request(streamBase, '/api/stream/decrypt-gcm', 'POST', { ciphertext, iv, aesKey });
  }
}

export default new ApiClient();
