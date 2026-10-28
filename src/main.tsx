import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/atkinson-hyperlegible/latin-400.css'
import '@fontsource/atkinson-hyperlegible/latin-700.css'
import '@fontsource/bricolage-grotesque/latin-700.css'
import '@fontsource/bricolage-grotesque/latin-800.css'
import 'leaflet/dist/leaflet.css'
import './index.css'
import { App } from './App'

const root = document.getElementById('root')
if (root !== null) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => undefined)
  })
}
