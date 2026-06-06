import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n/config'

const rootElement = document.getElementById('root') || document.getElementById('u177513650_mathwabdi')
if (!rootElement) throw new Error('Failed to find the root element')

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
