// Storage utilities for data persistence
export interface User {
  id: string;
  email: string;
  token: string;
  createdAt: string;
}

export interface StorageKeys {
  USER: string;
  TOKEN: string;
  PREFERENCES: string;
  CACHE: string;
}

const keys: StorageKeys = {
  USER: 'app_user',
  TOKEN: 'app_token',
  PREFERENCES: 'app_preferences',
  CACHE: 'app_cache'
};

export const StorageService = {
  // User management
  setUser: (user: User) => {
    localStorage.setItem(keys.USER, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const stored = localStorage.getItem(keys.USER);
    return stored ? JSON.parse(stored) : null;
  },

  clearUser: () => {
    localStorage.removeItem(keys.USER);
    localStorage.removeItem(keys.TOKEN);
  },

  // Token management
  setToken: (token: string) => {
    localStorage.setItem(keys.TOKEN, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(keys.TOKEN);
  },

  // Preferences
  setPreferences: (prefs: Record<string, any>) => {
    localStorage.setItem(keys.PREFERENCES, JSON.stringify(prefs));
  },

  getPreferences: (): Record<string, any> => {
    const stored = localStorage.getItem(keys.PREFERENCES);
    return stored ? JSON.parse(stored) : {};
  },

  // Cache management
  setCache: (key: string, value: any, expiryMinutes: number = 60) => {
    const item = {
      value,
      expiresAt: Date.now() + expiryMinutes * 60000
    };
    const cache = StorageService.getCache() || {};
    cache[key] = item;
    localStorage.setItem(keys.CACHE, JSON.stringify(cache));
  },

  getCache: () => {
    const stored = localStorage.getItem(keys.CACHE);
    return stored ? JSON.parse(stored) : {};
  },

  getCacheItem: (key: string): any => {
    const cache = StorageService.getCache();
    const item = cache[key];
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      delete cache[key];
      localStorage.setItem(keys.CACHE, JSON.stringify(cache));
      return null;
    }
    return item.value;
  },

  clearCache: () => {
    localStorage.removeItem(keys.CACHE);
  },

  // General utilities
  clear: () => {
    localStorage.clear();
  },

  isLoggedIn: (): boolean => {
    return !!StorageService.getToken() && !!StorageService.getUser();
  }
};

export default StorageService;
