import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchSpaceMissions, createSpaceMission, deleteSpaceMission } from '../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px); // Subtracting header and footer height
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  overflow-y: auto;
`;

const Title = styled.h1`
  color: #0047ab;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #0047ab;
  color: white;
  padding: 12px;
  text-align: left;
  &:first-child {
    border-top-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
  }
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e6f2ff;
  &:last-child {
    border-bottom: none;
  }
`;

const Button = styled.button`
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4169e1;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #b0c4de;
  border-radius: 4px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #4169e1;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  text-align: center;
  margin-bottom: 16px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin-bottom: 16px;
  color: #0047ab;
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
      <ContentWrapper>
        <Title>Space Missions Manager</Title>
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

        {loading && <LoadingMessage>Loading...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
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
      </ContentWrapper>
    </Container>
  );
};

export default MissionsManager;
