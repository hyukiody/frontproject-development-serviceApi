// Type definitions for eyeO Platform Authentication and Monetization

export interface AuthenticationRequest {
  username: string;
  password: string;
  deviceId?: string;
  seedKey?: string; // For video decryption
}

export interface AuthenticationResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  username: string;
  role: string;
  licenseTier?: string;
  message?: string; // Warning messages (grace period, trial)
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  licenseTier: string;
  trialEndDate?: number;
  storageQuotaGb: number;
  apiRateLimit: number;
  subscriptionStatus: string;
  isActive: boolean;
}

export interface LicenseStatus {
  active: boolean;
  tier: string;
  type: string; // TRIAL, SUBSCRIPTION, GRACE_PERIOD, EXPIRED
  expiresAt?: number;
  daysRemaining: number;
  trial: boolean;
  gracePeriod: boolean;
  reason?: string;
}

export interface QuotaUsage {
  cameras: {
    current: number;
    max: number;
    percentage: number;
  };
  storage: {
    currentGb: number;
    maxGb: number;
    percentage: number;
  };
  apiCalls: {
    currentRate: number;
    maxRate: number;
  };
}

export interface DetectionEvent {
  id: number;
  timestamp: number;
  cameraId: string;
  objectType: string;
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  metadata?: Record<string, any>;
}

export interface Camera {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastSeen: number;
  location?: string;
  streamUrl?: string;
}

export interface VideoStream {
  storageKey: string;
  cameraId: string;
  timestamp: number;
  encryptedSize: number;
  duration: number;
  hasWatermark: boolean;
}

export type LicenseTier = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface TierFeatures {
  tier: LicenseTier;
  price: number;
  maxCameras: number;
  storageQuotaGb: number;
  apiRateLimit: number;
  retentionDays: number;
  videoQuality: string;
  hasWatermark: boolean;
  realAiDetection: boolean;
  features: string[];
}
