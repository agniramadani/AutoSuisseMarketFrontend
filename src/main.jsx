import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // Strict mode will be automatically ignored in production builds.
  // It is used to help make the code safer by highlighting potential issues.
  // For example, useEffect may run twice in development to detect side effects.
  <StrictMode>
    <App />
  </StrictMode>,
)
