import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthenticationResponse, User } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string, seedKey: string) => Promise<void>;
  register: (username: string, email: string, password: string, seedKey: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token on mount
    const initAuth = async () => {
      const storedToken = localStorage.getItem('eyeo_token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const userData = await apiService.getCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error('Failed to load user:', err);
          apiService.logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string, seedKey: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AuthenticationResponse = await apiService.login({
        username,
        password,
        seedKey,
        deviceId: navigator.userAgent,
      });

      setToken(response.accessToken);
      
      // Fetch full user profile
      const userData = await apiService.getCurrentUser();
      setUser(userData);

      // Show warning message if present (grace period, trial)
      if (response.message) {
        console.warn('Auth message:', response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, seedKey: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AuthenticationResponse = await apiService.register({
        username,
        password,
        seedKey,
        deviceId: navigator.userAgent,
      });

      setToken(response.accessToken);
      
      const userData = await apiService.getCurrentUser();
      setUser(userData);

      if (response.message) {
        console.info('Registration message:', response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
