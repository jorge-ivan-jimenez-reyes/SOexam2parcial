const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const fetchMessage = async () => {
  try {
    const response = await fetch(`${API_URL}/message`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};
