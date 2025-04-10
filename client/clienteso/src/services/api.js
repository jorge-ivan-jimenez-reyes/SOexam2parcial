const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchSpaceMissions = async () => {
  const response = await fetch(`${API_URL}/space-missions`);
  if (!response.ok) {
    throw new Error('Failed to fetch space missions');
  }
  return response.json();
};

export const createSpaceMission = async (mission) => {
  const response = await fetch(`${API_URL}/space-missions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mission),
  });
  if (!response.ok) {
    throw new Error('Failed to create space mission');
  }
  return response.json();
};

export const updateSpaceMission = async (mission) => {
  const response = await fetch(`${API_URL}/space-missions/${mission.ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mission),
  });
  if (!response.ok) {
    throw new Error('Failed to update space mission');
  }
  return response.json();
};

export const deleteSpaceMission = async (id) => {
  const response = await fetch(`${API_URL}/space-missions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete space mission');
  }
};
