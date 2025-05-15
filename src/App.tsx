import React, { ErrorInfo } from 'react';
import { TopUpProvider, useTopUp } from './context/TopUpContext';
import { useTheme } from './features/theme/ThemeProvider';
import Header from './components/Header';
import GameSelection from './pages/GameSelection';
import TopUpSelection from './pages/TopUpSelection';
import VerificationFlow from './pages/VerificationFlow';
import { BrowserRouter } from 'react-router-dom';

const AppContent: React.FC = () => {
  const { state } = useTopUp();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Header />
      
      <main className="py-6">
        {state.stage === 'game-selection' && <GameSelection />}
        {state.stage === 'topup-selection' && <TopUpSelection />}
        {['msisdn-input', 'otp-verification', 'processing', 'confirmation'].includes(state.stage) && (
          <VerificationFlow />
        )}
      </main>
      
      <footer className={`py-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} text-center`}>
        <div className="container mx-auto px-4">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} GameTopUp. All rights reserved.
          </p>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
            This is a demo application. No actual purchases are made.
          </p>
        </div>
      </footer>
    </div>
  );
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Error:', error);
    // You can also log this error to an error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 p-8 text-red-900">
          <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
          <p className="mt-4">We've encountered an unexpected error.</p>
          <p className="mt-2 text-sm">Please check the console for more details.</p>
          <button 
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <TopUpProvider>
          <AppContent />
        </TopUpProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;