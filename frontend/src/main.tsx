import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ImageUpload from './pages/ImageUpload.tsx'
import ToggleProjectContextProvider from './context/ToggleProjectContext.tsx'
import SwitchProject from './pages/SwitchProject.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToggleProjectContextProvider>
      <SwitchProject/>
    </ToggleProjectContextProvider>
  </React.StrictMode>,
)
