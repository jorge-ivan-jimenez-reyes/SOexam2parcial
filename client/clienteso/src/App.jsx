import React from 'react';
import { useMessage } from './hooks/useMessage';
import { MessageDisplay } from './components/MessageDisplay';
import './App.css';

const App = () => {
  const { message, loading, error } = useMessage();

  return (
    <div className="App">
      <h1>React + Go API</h1>
      <MessageDisplay message={message} loading={loading} error={error} />
    </div>
  );
};

export default App;
