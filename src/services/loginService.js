import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async ({ email, password, role }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
      role,
    });

    return response;
  } catch (error) {
    // console.log("Error from login service", error.response);

    throw error.response;
  }
};
