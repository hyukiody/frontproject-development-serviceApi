import { Routes, Route, Link } from 'react-router-dom'
import Portfolio from './pages/Portfolio'

export default function App() {
  return (
    <div>
      <nav aria-label="Primary">
        <a className="skip-link" href="#main">Skip to main content</a>
        <div className="app" style={{ padding: 0 }}>
          <div className="card" style={{ display: 'flex', gap: '0.5rem' }}>
            <Link className="button" to="/">Home</Link>
            <a className="button" href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite Docs</a>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </div>
  )
}
