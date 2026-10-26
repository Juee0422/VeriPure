import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HealthProfileProvider } from './context/HealthProfileContext';
import { Navbar } from './components/navbar/Navbar';
import { HomePage } from './pages/HomePage';
import { ScannerPage } from './pages/ScannerPage';
import { ResultPage } from './pages/ResultPage';
import { DatabaseSearchPage } from './pages/DatabaseSearchPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';

// Helper to scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <HealthProfileProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-background text-navy-900 font-sans flex flex-col antialiased selection:bg-sage-100 selection:text-sage-900">
            {/* Interactive Sticky Glassmorphic Navbar */}
            <Navbar />

            {/* Main Content Viewport */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/scan" element={<ScannerPage />} />
                <Route path="/result/:id" element={<ResultPage />} />
                <Route path="/search" element={<DatabaseSearchPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<LoginPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </HealthProfileProvider>
    </AuthProvider>
  );
};

export default App;
