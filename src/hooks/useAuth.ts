import { useState, useCallback } from 'react';
import StorageService, { User } from '../lib/storageService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => StorageService.getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call - replace with real endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      const userData: User = {
        id: data.id,
        email: data.email,
        token: data.token,
        createdAt: new Date().toISOString()
      };

      StorageService.setUser(userData);
      StorageService.setToken(data.token);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Registration failed');

      const data = await response.json();
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration error');
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const logout = useCallback(() => {
    StorageService.clearUser();
    setUser(null);
  }, []);

  const isAuthenticated = !!user && !!StorageService.getToken();

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated
  };
};
