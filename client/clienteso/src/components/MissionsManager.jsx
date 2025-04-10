import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchSpaceMissions, createSpaceMission, deleteSpaceMission } from '../services/api';

const Container = styled.div`
  padding: 20px;
  background-color: #f0f8ff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: #0047ab;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e6f2ff;
`;

const Button = styled.button`
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #4169e1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 8px;
  flex: 1;
  border: 1px solid #b0c4de;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #4169e1;
  }
`;

const Title = styled.h1`
  color: #0047ab;
  margin-bottom: 20px;
`;

const MissionsManager = () => {
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
    <Container>
      <h1>Space Missions Manager</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Mission Name"
          value={newMission.name}
          onChange={(e) => setNewMission({ ...newMission, name: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Destination"
          value={newMission.destination}
          onChange={(e) => setNewMission({ ...newMission, destination: e.target.value })}
          required
        />
        <Input
          type="date"
          placeholder="Launch Date"
          value={newMission.launchDate}
          onChange={(e) => setNewMission({ ...newMission, launchDate: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Status"
          value={newMission.status}
          onChange={(e) => setNewMission({ ...newMission, status: e.target.value })}
          required
        />
        <Button type="submit">Add Mission</Button>
      </Form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Destination</Th>
            <Th>Launch Date</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.ID}>
              <Td>{mission.name}</Td>
              <Td>{mission.destination}</Td>
              <Td>{mission.launchDate}</Td>
              <Td>{mission.status}</Td>
              <Td>
                <Button onClick={() => handleDelete(mission.ID)}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MissionsManager;
