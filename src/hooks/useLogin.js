import { useState } from "react";
import { loginUser } from "../services/loginService";
import { useAuth } from "../context/authContext";
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const login = async ({ email, password, role }) => {
    setLoading(true);
    try {
      const response = await loginUser({ email, password, role });

      // Assuming backend returns: { token, user: { name, email, ... } }
      const { token, user } = response.data;

      // Save to context
      authLogin({ token, user });

      return response;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
