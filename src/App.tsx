import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import catLogo from './assets/cat-logo.png';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav-container">
          <Link 
            to="/" 
            className="logo-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
              padding: '8px',
              borderRadius: '50px',
              boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.4)';
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '50%',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #333',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img 
                src={catLogo} 
                alt="Cat Logo" 
                style={{
                  height: '32px',
                  width: '32px',
                  display: 'block',
                }}
              />
            </div>
            <span 
              style={{
                marginLeft: '12px',
                marginRight: '8px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Home
            </span>
          </Link>
          
          <div className="nav-links">
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="App-footer">
        <p>&copy; 2024 My React App. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
