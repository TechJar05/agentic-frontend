import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async ({ email, password, role }) => {
  return await axios.post(`${API_URL}api/authentication/login`, {
    email,
    password,
    role,
  });
};
