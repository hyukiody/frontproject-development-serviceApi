import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { VideoStream } from '../types';

interface VideoPlayerProps {
  streamUrl: string;
  seedKey: string;
  autoplay?: boolean;
  onError?: (error: Error) => void;
}

export default function VideoPlayer({ streamUrl, seedKey, autoplay = false, onError }: VideoPlayerProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    initializePlayer();
    return () => cleanup();
  }, [streamUrl, seedKey]);

  const initializePlayer = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize Web Worker for stream processing
      workerRef.current = new Worker(
        new URL('../workers/stream.worker.ts', import.meta.url),
        { type: 'module' }
      );

      workerRef.current.onmessage = handleWorkerMessage;
      workerRef.current.onerror = (err) => {
        const error = new Error(`Worker error: ${err.message}`);
        setError(error.message);
        onError?.(error);
      };

      // Send initialization data to worker
      workerRef.current.postMessage({
        type: 'INIT',
        seedKey,
      });

      // Fetch encrypted stream
      await fetchAndDecryptStream();

      setIsLoading(false);

      if (autoplay && videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (err: any) {
      const error = new Error(`Failed to initialize player: ${err.message}`);
      setError(error.message);
      setIsLoading(false);
      onError?.(error);
    }
  };

  const fetchAndDecryptStream = async () => {
    try {
      const response = await fetch(streamUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const encryptedData = await response.arrayBuffer();

      // Send protected data to worker for processing
      workerRef.current?.postMessage({
        type: 'PROCESS',
        data: encryptedData,
      });
    } catch (err: any) {
      throw new Error(`Failed to fetch stream: ${err.message}`);
    }
  };

  const handleWorkerMessage = (event: MessageEvent) => {
    const { type, data, error: workerError } = event.data;

    switch (type) {
      case 'INIT_SUCCESS':
        console.log('Stream processor initialized');
        break;

      case 'PROCESS_SUCCESS':
        // Create blob URL from processed data
        const blob = new Blob([data], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        
        if (videoRef.current) {
          videoRef.current.src = url;
        }
        break;

      case 'ERROR':
        const error = new Error(workerError);
        setError(workerError);
        onError?.(error);
        break;

      default:
        console.warn('Unknown worker message type:', type);
    }
  };

  const cleanup = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }

    if (videoRef.current?.src) {
      URL.revokeObjectURL(videoRef.current.src);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = async () => {
    if (!videoRef.current) return;

    try {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          await videoRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(event.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const captureSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Download snapshot
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `snapshot-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="video-player-container">
      {isLoading && (
        <div className="player-overlay loading-overlay">
          <div className="loading-spinner">⏳ Loading encrypted stream...</div>
        </div>
      )}

      {error && (
        <div className="player-overlay error-overlay">
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-element"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={(e) => {
            const error = new Error('Video playback error');
            setError(error.message);
            onError?.(error);
          }}
        />

        {/* Hidden canvas for snapshots */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Controls Overlay */}
        <div className="controls-overlay">
          {/* Timeline */}
          <div className="timeline-container">
            <input
              type="range"
              className="timeline-slider"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
            />
            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="controls-buttons">
            <button className="control-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>

            <button className="control-btn" onClick={captureSnapshot} title="Take Snapshot">
              📸
            </button>

            <div className="spacer" />

            <button className="control-btn" onClick={toggleFullscreen} title="Fullscreen">
              {isFullscreen ? '⏹️' : '⛶'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .video-player-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
        }

        .video-element {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .player-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .loading-overlay {
          background: rgba(0, 0, 0, 0.9);
        }

        .loading-spinner {
          color: #00FFFF;
          font-size: 1.5rem;
          text-align: center;
        }

        .error-overlay {
          background: rgba(26, 26, 46, 0.95);
        }

        .error-message {
          text-align: center;
          color: #ff6961;
        }

        .error-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .error-message p {
          font-size: 1.1rem;
          margin: 0;
        }

        .controls-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
          padding: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 5;
        }

        .video-wrapper:hover .controls-overlay {
          opacity: 1;
        }

        .timeline-container {
          margin-bottom: 1rem;
        }

        .timeline-slider {
          width: 100%;
          height: 6px;
          background: rgba(136, 146, 176, 0.3);
          outline: none;
          border-radius: 3px;
          -webkit-appearance: none;
        }

        .timeline-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #00FFFF;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
        }

        .timeline-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #00FFFF;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
        }

        .time-display {
          color: #e2e8f0;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          text-align: right;
        }

        .controls-buttons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .control-btn {
          background: rgba(0, 255, 255, 0.2);
          border: 2px solid #00FFFF;
          color: #00FFFF;
          width: 48px;
          height: 48px;
          border-radius: 8px;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn:hover {
          background: rgba(0, 255, 255, 0.4);
          transform: scale(1.1);
        }

        .spacer {
          flex: 1;
        }

        @media (max-width: 768px) {
          .controls-overlay {
            opacity: 1;
          }

          .control-btn {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
