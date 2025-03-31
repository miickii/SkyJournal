import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Initialize dark mode based on localStorage or system preference
const initializeDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode');
  
  if (savedMode === 'true' || 
     (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
  }
};

// Initialize dark mode
initializeDarkMode();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
