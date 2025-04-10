import React, { useState, useEffect } from 'react';
import { fetchSpaceMissions, createSpaceMission, updateSpaceMission, deleteSpaceMission } from './services/api';
import './App.css';

const App = () => {
  const [missions, setMissions] = useState([]);
  const [newMission, setNewMission] = useState({ name: '', destination: '', launchDate: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      setLoading(true);
      const data = await fetchSpaceMissions();
      setMissions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load space missions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSpaceMission(newMission);
      setNewMission({ name: '', destination: '', launchDate: '', status: '' });
      loadMissions();
    } catch (err) {
      setError('Failed to create space mission');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSpaceMission(id);
      loadMissions();
    } catch (err) {
      setError('Failed to delete space mission');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Space Missions Manager</h1>
      </header>
      <main className="App-main">
        <h2>Add New Mission</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Mission Name"
            value={newMission.name}
            onChange={(e) => setNewMission({ ...newMission, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Destination"
            value={newMission.destination}
            onChange={(e) => setNewMission({ ...newMission, destination: e.target.value })}
            required
          />
          <input
            type="date"
            placeholder="Launch Date"
            value={newMission.launchDate}
            onChange={(e) => setNewMission({ ...newMission, launchDate: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Status"
            value={newMission.status}
            onChange={(e) => setNewMission({ ...newMission, status: e.target.value })}
            required
          />
          <button type="submit">Add Mission</button>
        </form>

        <h2>Space Missions</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <ul>
          {missions.map((mission) => (
            <li key={mission.ID}>
              {mission.name} - {mission.destination} - {mission.launchDate} - {mission.status}
              <button onClick={() => handleDelete(mission.ID)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
      <footer className="App-footer">
        <p>&copy; 2025 UP - Sistemas Operativos</p>
      </footer>
    </div>
  );
};

export default App;
