import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const closeWelcomeScreen = () => {
    setShowWelcome(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <nav className="bg-navy text-white p-4 shadow-md">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <Link to="/" className="text-2xl font-bold mb-2 sm:mb-0">Space Missions</Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-navy-light transition duration-300">Home</Link>
              <Link to="/dashboard" className="hover:text-navy-light transition duration-300">Dashboard</Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={showWelcome ? <WelcomeScreen onClose={closeWelcomeScreen} /> : <Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer className="bg-navy text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 UP - Sistemas Operativos</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
