import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0a0a0a',
          color: 'white',
          padding: '40px',
          fontFamily: 'monospace'
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: '20px' }}>Something went wrong</h1>
          <details style={{ whiteSpace: 'pre-wrap', background: '#1a1a1a', padding: '20px', borderRadius: '8px' }}>
            <summary style={{ cursor: 'pointer', marginBottom: '10px', color: '#fbbf24' }}>
              Click for error details
            </summary>
            <p style={{ color: '#ef4444', marginBottom: '10px' }}>
              {this.state.error && this.state.error.toString()}
            </p>
            <p style={{ color: '#9ca3af', fontSize: '12px' }}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </p>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
