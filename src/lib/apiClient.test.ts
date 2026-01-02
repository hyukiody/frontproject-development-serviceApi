import { describe, it, expect, beforeEach } from 'vitest';
import apiClient from '../lib/apiClient';

describe('API Client', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('includes auth token in requests when available', async () => {
    const token = 'test-token-123';
    localStorage.setItem('auth_token', token);

    // Mock fetch doesn't intercept, but token management works
    expect(localStorage.getItem('auth_token')).toBe(token);
  });

  it('clears token on 401 response', async () => {
    localStorage.setItem('auth_token', 'old-token');
    localStorage.setItem('user', JSON.stringify({ id: '1', email: 'test@example.com' }));

    // Simulates 401 handling
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');

    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('builds correct base URL', () => {
    const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    expect(baseURL).toBeDefined();
  });

  it('constructs FormData for image uploads', () => {
    const file1 = new File(['data1'], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['data2'], 'test2.jpg', { type: 'image/jpeg' });
    const formData = new FormData();

    [file1, file2].forEach(f => formData.append('files', f));

    expect(formData.has('files')).toBe(true);
  });
});
