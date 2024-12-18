import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Подключаем стили
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Включаем отчёты о производительности (опционально)
reportWebVitals();
