/**
 * Crypto Worker - Descriptografia de Vídeo em Web Worker
 * 
 * Executa AES-GCM descriptografia em thread separada para não bloquear UI
 */

// Importa Web Crypto API
const crypto = self.crypto;

/**
 * Descriptografa chunk de vídeo usando AES-256-GCM
 */
async function decryptChunk(encryptedData: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<ArrayBuffer> {
    try {
        const decrypted = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv,
                tagLength: 128
            },
            key,
            encryptedData
        );
        
        return decrypted;
    } catch (error) {
        console.error('Decryption failed:', error);
        throw error;
    }
}

/**
 * Deriva chave AES a partir da Seed Key do usuário
 */
async function deriveKey(seedKey: string): Promise<CryptoKey> {
    // Converte seed key para ArrayBuffer
    const encoder = new TextEncoder();
    const keyMaterial = encoder.encode(seedKey);
    
    // Importa como material de chave
    const imported = await crypto.subtle.importKey(
        "raw",
        keyMaterial,
        "PBKDF2",
        false,
        ["deriveKey"]
    );
    
    // Deriva chave AES-256
    const salt = encoder.encode("eyeo-platform-salt-v1"); // Em produção, usar salt dinâmico
    
    const derivedKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        imported,
        {
            name: "AES-GCM",
            length: 256
        },
        false,
        ["decrypt"]
    );
    
    return derivedKey;
}

/**
 * Processa blob criptografado completo
 */
async function processEncryptedBlob(
    encryptedBlob: ArrayBuffer,
    seedKey: string
): Promise<ArrayBuffer> {
    
    // Deriva chave de descriptografia
    const key = await deriveKey(seedKey);
    
    // Buffer para dados descriptografados
    const decryptedChunks: ArrayBuffer[] = [];
    const view = new DataView(encryptedBlob);
    let offset = 0;
    
    // Processa cada chunk
    while (offset < encryptedBlob.byteLength) {
        // Lê tamanho do IV
        const ivSize = view.getUint8(offset);
        offset += 1;
        
        // Lê IV
        const iv = new Uint8Array(encryptedBlob, offset, ivSize);
        offset += ivSize;
        
        // Lê chunk criptografado (64KB + 16 bytes GCM tag)
        const chunkSize = Math.min(64 * 1024 + 16, encryptedBlob.byteLength - offset);
        const encryptedChunk = new Uint8Array(encryptedBlob, offset, chunkSize);
        offset += chunkSize;
        
        // Descriptografa chunk
        const decryptedChunk = await decryptChunk(encryptedChunk.buffer, key, iv);
        decryptedChunks.push(decryptedChunk);
        
        // Envia progresso
        const progress = (offset / encryptedBlob.byteLength) * 100;
        self.postMessage({
            type: 'progress',
            progress: progress
        });
    }
    
    // Concatena todos os chunks
    const totalLength = decryptedChunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
    const result = new Uint8Array(totalLength);
    let resultOffset = 0;
    
    for (const chunk of decryptedChunks) {
        result.set(new Uint8Array(chunk), resultOffset);
        resultOffset += chunk.byteLength;
    }
    
    return result.buffer;
}

// Message handler
self.onmessage = async (event: MessageEvent) => {
    const { type, payload } = event.data;
    
    try {
        switch (type) {
            case 'decrypt': {
                const { encryptedBlob, seedKey } = payload;
                
                const decryptedData = await processEncryptedBlob(encryptedBlob, seedKey);
                
                self.postMessage({
                    type: 'success',
                    data: decryptedData
                }, [decryptedData]); // Transfer ownership
                
                break;
            }
            
            case 'deriveKey': {
                const { seedKey } = payload;
                const key = await deriveKey(seedKey);
                
                // Exporta chave para enviar de volta
                const exported = await crypto.subtle.exportKey('raw', key);
                
                self.postMessage({
                    type: 'keyDerived',
                    key: exported
                });
                
                break;
            }
            
            default:
                throw new Error(`Unknown message type: ${type}`);
        }
        
    } catch (error: any) {
        self.postMessage({
            type: 'error',
            message: error.message,
            stack: error.stack
        });
    }
};

// Exporta tipo vazio para TypeScript
export {};
