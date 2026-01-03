import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Base path for deployment (GitHub Pages or production)
  base: process.env.NODE_ENV === 'production' ? '/eyeO-platform/' : '/',
  
  // Enable Web Workers with ES module format
  worker: {
    format: 'es',
  },
  
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    
    // Security headers for Web Crypto API and SharedArrayBuffer
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    
    // Proxy configuration for all backend services
    proxy: {
      // Data-Core Microkernel (encoding/stream processing)
      '/api/stream': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      
      // Identity Service (auth/licensing)
      '/api/auth': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      },
      
      // Stream Processing Service
      '/api/video': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false,
      },
      
      // Middleware (events/metadata - Blue Flow)
      '/api/events': {
        target: 'http://localhost:8091',
        changeOrigin: true,
        secure: false,
      },
      
      // Edge Node WebSocket (live streaming)
      '/ws': {
        target: 'ws://localhost:8090',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV !== 'production',
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    
    chunkSizeWarningLimit: 1000,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
