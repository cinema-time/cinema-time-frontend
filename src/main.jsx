import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'
import { AuthProviderWrapper } from "./context/auth.context";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProviderWrapper>      {/*  <== ADD  */}
        <App />
      </AuthProviderWrapper>     {/*  <== ADD  */}
    </Router>
  </StrictMode>,
)
