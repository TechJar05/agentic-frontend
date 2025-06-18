import { useState } from "react";
import { registerUser } from "../services/registerService";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (email, password) => {
    setLoading(true);
    try {
      const response = await registerUser(email, password);
      // console.log("Response from register hook", response);

      return response;
    } catch (error) {
      // console.log("Error from register hook", error);

      return error;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

