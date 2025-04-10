import React from 'react';
import './MessageDisplay.css';

export const MessageDisplay = ({ message, loading, error }) => {
  return (
    <div className="message-display">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && (
        <div className="message">
          <h2>Message from API:</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};
