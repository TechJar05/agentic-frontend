import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async ({ email, password, role }) => {
  try {
    const response = await axios.post(`${API_URL}api/authentication/login`, {
      email,
      password,
      role,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};