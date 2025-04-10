const API_URL = 'http://api:8080/api';

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
