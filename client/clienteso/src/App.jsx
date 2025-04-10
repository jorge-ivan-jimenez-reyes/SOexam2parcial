import React from 'react';
import { useMessage } from './hooks/useMessage';
import { MessageDisplay } from './components/MessageDisplay';
import './App.css';

const App = () => {
  const { message, loading, error } = useMessage();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Examen Segundo Parcial</h1>
      </header>
      <main className="App-main">
        <MessageDisplay message={message} loading={loading} error={error} />
      </main>
      <footer className="App-footer">
        <p>&copy; 2025 UP - Sistemas Operativos</p>
      </footer>
    </div>
  );
};

export default App;
