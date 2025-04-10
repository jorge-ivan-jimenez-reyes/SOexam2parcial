import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl max-w-lg w-full transform transition-all duration-300 ease-in-out hover:scale-105 border-2 border-blue-400">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">Welcome to Space Missions Manager</h1>
        <h2 className="text-2xl text-blue-300 mb-4">Explore the Final Frontier</h2>
        <p className="text-gray-300 mb-6">
          Embark on a journey through the cosmos! Our Space Missions Manager allows you to view, add, and manage exciting space missions. 
          From Moon landings to Mars explorations, keep track of humanity's greatest adventures beyond Earth.
        </p>
        <div className="flex justify-center">
          <button 
            onClick={handleClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Launch Mission Control
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
