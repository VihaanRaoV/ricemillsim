import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

console.log('App starting...');

try {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Root element not found!');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </StrictMode>
  );

  console.log('App rendered successfully');
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = `
    <div style="min-height: 100vh; background: #0a0a0a; color: white; display: flex; align-items: center; justify-center; font-family: sans-serif;">
      <div style="text-align: center;">
        <h1 style="color: #ef4444;">Failed to Load App</h1>
        <p style="color: #9ca3af; margin-top: 20px;">${error}</p>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    </div>
  `;
}
