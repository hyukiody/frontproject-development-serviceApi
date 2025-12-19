import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="cyberpunk-card">
        <div className="cat-logo-container">
          <div className="cat-logo">🐱</div>
        </div>
        <h1 className="neon-title">Cyberpunk Interface</h1>
        <p className="subtitle">Experience the future of design</p>
        <button className="neon-button">
          <span className="button-content">
            <span className="button-icon">⚡</span>
            <span className="button-text">ACTIVATE</span>
            <span className="button-icon">⚡</span>
          </span>
          <span className="neon-glow"></span>
        </button>
      </div>
    </div>
  );
}

export default App;
