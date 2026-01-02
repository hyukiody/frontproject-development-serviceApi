import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';
import StorageService from '../lib/storageService';

vi.mock('../lib/storageService', () => ({
  default: {
    getUser: vi.fn(),
    setUser: vi.fn(),
    clearUser: vi.fn(),
    getToken: vi.fn(),
    setToken: vi.fn(),
  }
}));

vi.mock('../lib/apiClient', () => ({
  default: {
    login: vi.fn(),
    register: vi.fn(),
  }
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with null user', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('handles successful login', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('handles logout', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(StorageService.clearUser).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
  });

  it('sets error on login failure', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('invalid@example.com', 'wrong');
    });

    expect(result.current.error).toBeTruthy();
  });
});
