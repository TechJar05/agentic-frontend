import { useState } from "react";
import { loginUser } from "../services/loginService";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      // console.log("Response from login hook", response);

      return response;
    } catch (error) {
      // console.log("Error from hook", error);

      return error;
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};
