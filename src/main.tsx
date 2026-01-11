import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

console.log('=== App Starting ===');
console.log('Environment variables:', {
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'present' : 'MISSING'
});

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

  console.log('=== App Rendered Successfully ===');
} catch (error) {
  console.error('=== FATAL ERROR ===', error);
  document.body.innerHTML = `
    <div style="min-height: 100vh; background: #0a0a0a; color: white; display: flex; align-items: center; justify-content: center; font-family: sans-serif; padding: 20px;">
      <div style="max-width: 600px; text-align: center;">
        <h1 style="color: #ef4444; font-size: 32px; margin-bottom: 20px;">Failed to Load App</h1>
        <p style="color: #9ca3af; margin-bottom: 30px; font-size: 16px;">${error}</p>
        <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; text-align: left; margin-bottom: 20px;">
          <p style="color: #fbbf24; margin-bottom: 10px; font-weight: bold;">Debug Info:</p>
          <p style="color: #9ca3af; font-size: 14px; font-family: monospace;">
            URL: ${import.meta.env.VITE_SUPABASE_URL || 'MISSING'}<br>
            Key: ${import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'MISSING'}
          </p>
        </div>
        <button onclick="window.location.reload()" style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;">
          Reload Page
        </button>
      </div>
    </div>
  `;
}
