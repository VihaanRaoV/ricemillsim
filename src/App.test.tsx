import { useState, useEffect } from 'react';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('App mounted successfully');
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px'
    }}>
      <div>
        <h1>Test App Running {mounted ? '✓' : '...'}</h1>
        <p style={{ fontSize: '16px', marginTop: '20px' }}>
          If you see this, React is working!
        </p>
      </div>
    </div>
  );
}

export default App;
