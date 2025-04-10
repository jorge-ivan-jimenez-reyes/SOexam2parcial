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
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Space Missions</Link>
            <div>
              <Link to="/" className="mr-4 hover:text-blue-200">Home</Link>
              <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={showWelcome ? <WelcomeScreen onClose={closeWelcomeScreen} /> : <Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer className="bg-blue-600 text-white p-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 UP - Sistemas Operativos</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
