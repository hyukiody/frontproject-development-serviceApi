import { useState, useCallback } from 'react';
import StorageService, { User } from '../lib/storageService';
import apiClient from '../lib/apiClient';

type AuthPayload = {
  id: string;
  email: string;
  token: string;
};

const toUser = (data: AuthPayload): User => ({
  id: data.id,
  email: data.email,
  token: data.token,
  createdAt: new Date().toISOString(),
});

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => StorageService.getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = useCallback((data: AuthPayload) => {
    const userData = toUser(data);
    StorageService.setUser(userData);
    StorageService.setToken(userData.token);
    setUser(userData);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.login(email, password);
      if (response.status !== 200 || !response.data?.token) {
        throw new Error(response.error || 'Login failed');
      }

      handleSuccess(response.data as AuthPayload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login error');
    } finally {
      setIsLoading(false);
    }
  }, [handleSuccess]);

  const register = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.register(email, password);
      if ((response.status !== 201 && response.status !== 200) || !response.data?.token) {
        throw new Error(response.error || 'Registration failed');
      }

      handleSuccess(response.data as AuthPayload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration error');
    } finally {
      setIsLoading(false);
    }
  }, [handleSuccess]);

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
