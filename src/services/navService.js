import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get MD Name
export const fetchMDName = async (token) => {
  return await axios.get(`${API_URL}md-name`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update Phone Number
export const updatePhoneNumber = async (phoneNumber, token) => {
  return await axios.put(
    `${API_URL}/update-phone-number`,
    {
      phone_number: `91${phoneNumber}`,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
