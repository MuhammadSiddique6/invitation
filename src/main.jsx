import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const css = `
  html, body, #root {
    margin: 0;
    width: 100%;
    height: 100%;
    background: #17130f;
  }

  * {
    box-sizing: border-box;
  }
`;

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);
