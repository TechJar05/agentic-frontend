import { useState } from 'react';
import { loginUser } from '../services/loginService';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        localStorage.setItem('token', response.token);
      } else {
        setError(response.message);
      }
    } catch  {
      setError('Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
