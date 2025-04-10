import { useState, useEffect } from 'react';
import { fetchMessage } from '../services/api';

export const useMessage = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMessage = async () => {
      try {
        setLoading(true);
        const data = await fetchMessage();
        setMessage(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMessage();
  }, []);

  return { message, loading, error };
};
