import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    // console.log("Error from register service", error.response);

    throw error.response;
  }
};