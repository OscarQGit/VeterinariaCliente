import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ToastContainer } from 'react-custom-alert';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer floatingTime={5000} />
  </React.StrictMode>,
)
