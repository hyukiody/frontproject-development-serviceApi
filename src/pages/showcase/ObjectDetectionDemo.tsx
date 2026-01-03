import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Detection {
  class: string;
  confidence: number;
  bbox: { x: number; y: number; width: number; height: number };
  color: string;
}

const DEMO_CLASSES = [
  { name: 'person', color: '#00FFFF', icon: '🚶' },
  { name: 'car', color: '#FF6B6B', icon: '🚗' },
  { name: 'bicycle', color: '#4ECDC4', icon: '🚴' },
  { name: 'dog', color: '#FFE66D', icon: '🐕' },
  { name: 'cat', color: '#A8E6CF', icon: '🐈' },
  { name: 'backpack', color: '#FF8B94', icon: '🎒' },
];

export default function ObjectDetectionDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [fps, setFps] = useState(0);
  const [frameCount, setFrameCount] = useState(0);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Draw initial frame
    drawBackground(ctx, canvas);
    drawWelcomeMessage(ctx, canvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      startDetection();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isRunning]);

  const drawBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Dark gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid pattern
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
  };

  const drawWelcomeMessage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.font = 'bold 28px monospace';
    ctx.fillStyle = '#00FFFF';
    ctx.textAlign = 'center';
    ctx.fillText('YOLOv8 Object Detection Demo', canvas.width / 2, canvas.height / 2 - 40);

    ctx.font = '16px monospace';
    ctx.fillStyle = '#8892b0';
    ctx.fillText('Click "Start Detection" to begin', canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText('Simulated real-time detection with bounding boxes', canvas.width / 2, canvas.height / 2 + 50);
  };

  const generateRandomDetections = (): Detection[] => {
    const numDetections = Math.floor(Math.random() * 4) + 2; // 2-5 objects
    const newDetections: Detection[] = [];

    for (let i = 0; i < numDetections; i++) {
      const classInfo = DEMO_CLASSES[Math.floor(Math.random() * DEMO_CLASSES.length)];
      const detection: Detection = {
        class: classInfo.name,
        confidence: 0.7 + Math.random() * 0.29, // 70-99%
        bbox: {
          x: Math.random() * 600,
          y: Math.random() * 450,
          width: 80 + Math.random() * 120,
          height: 80 + Math.random() * 120,
        },
        color: classInfo.color,
      };
      newDetections.push(detection);
    }

    return newDetections;
  };

  const drawDetections = (ctx: CanvasRenderingContext2D, detections: Detection[]) => {
    detections.forEach((detection) => {
      const { bbox, class: className, confidence, color } = detection;

      // Draw bounding box
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);

      // Draw filled corner indicators
      const cornerSize = 10;
      ctx.fillStyle = color;
      // Top-left
      ctx.fillRect(bbox.x - 1.5, bbox.y - 1.5, cornerSize, 3);
      ctx.fillRect(bbox.x - 1.5, bbox.y - 1.5, 3, cornerSize);
      // Top-right
      ctx.fillRect(bbox.x + bbox.width - cornerSize + 1.5, bbox.y - 1.5, cornerSize, 3);
      ctx.fillRect(bbox.x + bbox.width - 1.5, bbox.y - 1.5, 3, cornerSize);
      // Bottom-left
      ctx.fillRect(bbox.x - 1.5, bbox.y + bbox.height - 1.5, cornerSize, 3);
      ctx.fillRect(bbox.x - 1.5, bbox.y + bbox.height - cornerSize + 1.5, 3, cornerSize);
      // Bottom-right
      ctx.fillRect(bbox.x + bbox.width - cornerSize + 1.5, bbox.y + bbox.height - 1.5, cornerSize, 3);
      ctx.fillRect(bbox.x + bbox.width - 1.5, bbox.y + bbox.height - cornerSize + 1.5, 3, cornerSize);

      // Draw label background
      const label = `${className} ${(confidence * 100).toFixed(1)}%`;
      ctx.font = 'bold 14px monospace';
      const textWidth = ctx.measureText(label).width;
      ctx.fillStyle = color;
      ctx.fillRect(bbox.x, bbox.y - 25, textWidth + 12, 22);

      // Draw label text
      ctx.fillStyle = '#000';
      ctx.fillText(label, bbox.x + 6, bbox.y - 8);
    });
  };

  const drawStats = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Stats panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 180, 100);

    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = '#00FFFF';
    ctx.textAlign = 'left';
    ctx.fillText('Detection Stats', 20, 30);

    ctx.font = '12px monospace';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`FPS: ${fps}`, 20, 50);
    ctx.fillText(`Objects: ${detections.length}`, 20, 70);
    ctx.fillText(`Frame: ${frameCount}`, 20, 90);

    // Model info
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(canvas.width - 190, 10, 180, 60);

    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = '#00FFFF';
    ctx.textAlign = 'left';
    ctx.fillText('YOLOv8n', canvas.width - 180, 30);

    ctx.font = '12px monospace';
    ctx.fillStyle = '#8892b0';
    ctx.fillText('Confidence: 70%+', canvas.width - 180, 50);
    ctx.fillText('Classes: 6', canvas.width - 180, 65);
  };

  const animate = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    drawBackground(ctx, canvas);

    // Update detections every 30 frames
    if (frameCount % 30 === 0) {
      setDetections(generateRandomDetections());
    }

    // Draw detections
    drawDetections(ctx, detections);

    // Draw stats
    drawStats(ctx, canvas);

    // Calculate FPS
    const now = Date.now();
    if (now - lastTimeRef.current >= 1000) {
      setFps(frameCount);
      setFrameCount(0);
      lastTimeRef.current = now;
    }

    setFrameCount((prev) => prev + 1);

    animationRef.current = requestAnimationFrame(animate);
  };

  const startDetection = () => {
    setFrameCount(0);
    lastTimeRef.current = Date.now();
    animate();
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="demo-container">
      <header className="demo-header">
        <Link to="/showcase" className="back-link">← Back to Showcase</Link>
        <h1 className="demo-title">Object Detection Demo</h1>
        <p className="demo-subtitle">YOLOv8 Real-time Detection Simulation</p>
      </header>

      <div className="demo-content">
        <div className="canvas-wrapper">
          <canvas ref={canvasRef} className="detection-canvas" />
          
          <div className="controls">
            <button 
              className={`control-btn ${isRunning ? 'stop' : 'start'}`}
              onClick={handleToggle}
            >
              {isRunning ? '⏸️ Stop Detection' : '▶️ Start Detection'}
            </button>
          </div>
        </div>

        <aside className="demo-info">
          <section className="info-section">
            <h3>🎯 About This Demo</h3>
            <p>
              This demonstrates <strong>YOLOv8 object detection</strong> with real-time bounding box visualization.
              The demo simulates detection across 6 object classes with confidence thresholds above 70%.
            </p>
          </section>

          <section className="info-section">
            <h3>🔧 Technical Stack</h3>
            <ul>
              <li><strong>Canvas API</strong> - Real-time rendering</li>
              <li><strong>requestAnimationFrame</strong> - 60 FPS animation</li>
              <li><strong>YOLOv8n</strong> - Nano model (simulated)</li>
              <li><strong>TypeScript</strong> - Type-safe implementation</li>
            </ul>
          </section>

          <section className="info-section">
            <h3>📊 Detected Classes</h3>
            <div className="class-list">
              {DEMO_CLASSES.map((cls) => (
                <div key={cls.name} className="class-item">
                  <span className="class-icon">{cls.icon}</span>
                  <span className="class-name">{cls.name}</span>
                  <span 
                    className="class-color" 
                    style={{ backgroundColor: cls.color }}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="info-section disclaimer">
            <h3>⚠️ Demo Notice</h3>
            <p>
              This is a <strong>standalone demonstration</strong> using simulated detections.
              Production implementation uses <strong>real YOLOv8 models</strong> with 
              DJL (Deep Java Library) for inference on actual video streams.
            </p>
          </section>
        </aside>
      </div>

      <style>{`
        .demo-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 2rem;
        }

        .demo-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .back-link {
          display: inline-block;
          color: #00FFFF;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 1rem;
          transition: transform 0.2s;
        }

        .back-link:hover {
          transform: translateX(-4px);
        }

        .demo-title {
          color: #00FFFF;
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
        }

        .demo-subtitle {
          color: #94a3b8;
          margin-top: 0.5rem;
        }

        .demo-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .canvas-wrapper {
          background: rgba(30, 41, 59, 0.9);
          border: 2px solid #00FFFF;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
        }

        .detection-canvas {
          width: 100%;
          height: auto;
          border-radius: 8px;
          display: block;
        }

        .controls {
          margin-top: 1.5rem;
          text-align: center;
        }

        .control-btn {
          background: linear-gradient(135deg, #00FFFF, #0080FF);
          color: #000;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .control-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 255, 255, 0.4);
        }

        .control-btn.stop {
          background: linear-gradient(135deg, #ff6b6b, #ff4757);
          color: #fff;
        }

        .demo-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-section {
          background: rgba(30, 41, 59, 0.9);
          border: 2px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .info-section h3 {
          color: #00FFFF;
          font-size: 1.2rem;
          margin: 0 0 1rem 0;
        }

        .info-section p {
          color: #cbd5e1;
          line-height: 1.6;
          margin: 0;
        }

        .info-section ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #cbd5e1;
        }

        .info-section li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .class-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .class-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
        }

        .class-icon {
          font-size: 1.5rem;
        }

        .class-name {
          flex: 1;
          color: #e2e8f0;
          font-size: 0.9rem;
          text-transform: capitalize;
        }

        .class-color {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .disclaimer {
          border-color: rgba(255, 165, 0, 0.4);
          background: rgba(255, 165, 0, 0.1);
        }

        .disclaimer h3 {
          color: #ffa500;
        }

        @media (max-width: 1200px) {
          .demo-content {
            grid-template-columns: 1fr;
          }

          .demo-info {
            max-width: 800px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .demo-title {
            font-size: 2rem;
          }

          .class-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
