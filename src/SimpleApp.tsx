function SimpleApp() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          App Is Working!
        </h1>
        <p style={{ fontSize: '18px', color: '#9ca3af' }}>
          React is rendering correctly
        </p>
      </div>
    </div>
  );
}

export default SimpleApp;
