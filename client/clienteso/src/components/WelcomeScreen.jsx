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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ease-in-out hover:scale-105">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Space Missions Manager</h1>
        <h2 className="text-xl text-blue-500 mb-4">Explore the Final Frontier</h2>
        <p className="text-gray-800 mb-6">
          Embark on a journey through the cosmos! Our Space Missions Manager allows you to view, add, and manage exciting space missions. 
          From Moon landings to Mars explorations, keep track of humanity's greatest adventures beyond Earth.
        </p>
        <button 
          onClick={handleClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
        >
          Launch Mission Control
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
