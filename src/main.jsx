import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/fusion-pixel-12px-proportional-tc'
import './index.css'
import './i18n/config'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
