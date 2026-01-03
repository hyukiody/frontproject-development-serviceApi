/**
 * Web Worker for AES-256-GCM Decryption
 * Runs decryption in background thread to avoid blocking UI
 */

let seedKey: string | null = null;
let cryptoKey: CryptoKey | null = null;

// Listen for messages from main thread
self.onmessage = async (event: MessageEvent) => {
  const { type, data, seedKey: newSeedKey } = event.data;

  try {
    switch (type) {
      case 'INIT':
        await initializeCrypto(newSeedKey);
        self.postMessage({ type: 'INIT_SUCCESS' });
        break;

      case 'DECRYPT':
        const decrypted = await decryptData(data);
        self.postMessage({ type: 'DECRYPT_SUCCESS', data: decrypted });
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error: any) {
    self.postMessage({ 
      type: 'ERROR', 
      error: error.message || 'Unknown worker error' 
    });
  }
};

/**
 * Initialize cryptographic key from seed
 */
async function initializeCrypto(seed: string): Promise<void> {
  if (!seed || seed.length < 32) {
    throw new Error('Seed key must be at least 32 characters');
  }

  seedKey = seed;

  // Derive AES-256 key from seed using PBKDF2
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(seed),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  // Use static salt (in production, salt should be stored with encrypted data)
  const salt = encoder.encode('eyeOSurveillance-AES-Salt-2024');

  cryptoKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
}

/**
 * Decrypt AES-256-GCM encrypted data
 * 
 * Expected format:
 * [12-byte IV][encrypted data][16-byte auth tag]
 */
async function decryptData(encryptedBuffer: ArrayBuffer): Promise<ArrayBuffer> {
  if (!cryptoKey) {
    throw new Error('Crypto key not initialized. Call INIT first.');
  }

  // Extract IV (first 12 bytes)
  const iv = new Uint8Array(encryptedBuffer.slice(0, 12));

  // Extract encrypted data + auth tag (remaining bytes)
  const ciphertext = new Uint8Array(encryptedBuffer.slice(12));

  try {
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        tagLength: 128, // 16 bytes
      },
      cryptoKey,
      ciphertext
    );

    return decrypted;
  } catch (error: any) {
    // Decryption failed - likely wrong key or corrupted data
    throw new Error(`Decryption failed: ${error.message}. Verify seed key is correct.`);
  }
}

/**
 * Decrypt chunked stream (for HLS/DASH)
 * Each chunk: [12-byte IV][encrypted chunk][16-byte auth tag]
 */
async function decryptChunkedStream(chunks: ArrayBuffer[]): Promise<ArrayBuffer[]> {
  const decryptedChunks: ArrayBuffer[] = [];

  for (const chunk of chunks) {
    const decrypted = await decryptData(chunk);
    decryptedChunks.push(decrypted);
  }

  return decryptedChunks;
}

// Export type for TypeScript awareness
export {};
