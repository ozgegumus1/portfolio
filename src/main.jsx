import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

const fallbackUI = (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: '#0d0d10',
    color: '#fff'
  }}>
    <p>Bir şeyler ters gitti. Lütfen sayfayı yenileyin.</p>
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={fallbackUI}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
