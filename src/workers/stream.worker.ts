/**
 * Stream Processing Web Worker
 * Handles data transformation in background thread to avoid blocking UI
 */

let seedKey: string | null = null;
let processorKey: CryptoKey | null = null;

// Listen for messages from main thread
self.onmessage = async (event: MessageEvent) => {
  const { type, data, seedKey: newSeedKey } = event.data;

  try {
    switch (type) {
      case 'INIT':
        await initializeProcessor(newSeedKey);
        self.postMessage({ type: 'INIT_SUCCESS' });
        break;

      case 'PROCESS':
        const processed = await processData(data);
        self.postMessage({ type: 'PROCESS_SUCCESS', data: processed });
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
 * Initialize stream processor with configuration key
 */
async function initializeProcessor(seed: string): Promise<void> {
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

  // Use static salt (in production, salt should be stored with protected data)
  const salt = encoder.encode('eyeOSurveillance-Stream-Salt-2024');

  processorKey = await crypto.subtle.deriveKey(
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
 * Process protected data stream
 * 
 * Expected format:
 * [12-byte IV][protected data][16-byte auth tag]
 */
async function processData(protectedBuffer: ArrayBuffer): Promise<ArrayBuffer> {
  if (!processorKey) {
    throw new Error('Processor key not initialized. Call INIT first.');
  }

  // Extract IV (first 12 bytes)
  const iv = new Uint8Array(protectedBuffer.slice(0, 12));

  // Extract protected data + auth tag (remaining bytes)
  const ciphertext = new Uint8Array(protectedBuffer.slice(12));

  try {
    const processed = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        tagLength: 128, // 16 bytes
      },
      processorKey,
      ciphertext
    );

    return processed;
  } catch (error: any) {
    // Processing failed - likely wrong key or corrupted data
    throw new Error(`Processing failed: ${error.message}. Verify seed key is correct.`);
  }
}

/**
 * Process chunked stream (for HLS/DASH)
 * Each chunk: [12-byte IV][protected chunk][16-byte auth tag]
 */
async function processStreamChunks(chunks: ArrayBuffer[]): Promise<ArrayBuffer[]> {
  const processedChunks: ArrayBuffer[] = [];

  for (const chunk of chunks) {
    const processed = await processData(chunk);
    processedChunks.push(processed);
  }

  return processedChunks;
}

// Export type for TypeScript awareness
export {};
