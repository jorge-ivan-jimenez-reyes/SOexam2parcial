import React, { useState, useEffect } from 'react';
import { fetchSpaceMissions, createSpaceMission, deleteSpaceMission } from '../services/api';

const Dashboard = () => {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-navy">Space Missions Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Mission Name"
            value={newMission.name}
            onChange={(e) => setNewMission({ ...newMission, name: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
          />
          <input
            type="text"
            placeholder="Destination"
            value={newMission.destination}
            onChange={(e) => setNewMission({ ...newMission, destination: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
          />
          <input
            type="date"
            placeholder="Launch Date"
            value={newMission.launchDate}
            onChange={(e) => setNewMission({ ...newMission, launchDate: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
          />
          <input
            type="text"
            placeholder="Status"
            value={newMission.status}
            onChange={(e) => setNewMission({ ...newMission, status: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>
        <button type="submit" className="w-full bg-navy text-white py-2 px-4 rounded-md hover:bg-navy-light transition duration-300">Add Mission</button>
      </form>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Destination</th>
              <th className="border px-4 py-2 text-left">Launch Date</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <tr key={mission.ID} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-black">{mission.name}</td>
                <td className="border px-4 py-2 text-black">{mission.destination}</td>
                <td className="border px-4 py-2 text-black">{mission.launchDate}</td>
                <td className="border px-4 py-2 text-black">{mission.status}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleDelete(mission.ID)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
