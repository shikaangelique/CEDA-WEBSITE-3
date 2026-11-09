import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'

// index.html carries default meta tags for non-JS crawlers and link previews.
// Remove them so the per-page tags React renders are the only ones.
document.head.querySelectorAll('[data-static]').forEach((node) => node.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
