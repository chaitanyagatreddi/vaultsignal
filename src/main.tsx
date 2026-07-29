import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Cursor preview sometimes opens #%2F instead of #/ → blank route
if (window.location.hash === '#%2F' || window.location.hash === '#%2f') {
    window.location.hash = '#/'
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
