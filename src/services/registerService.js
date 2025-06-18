import axios from "axios";
import { Phone } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async ({ name, email, password, phoneNumber }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      phone_number: "91" + phoneNumber,
    });
    return response;
  } catch (error) {
    // console.log("Error from register service", error.response);

    throw error.response;
  }
};
