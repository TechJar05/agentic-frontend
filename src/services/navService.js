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

// Update MD Name and/or Phone Number
export const updatePhoneNumber = async ({ name, phone }, token) => {
  const body = {};
  if (name) body.name = name;
  if (phone) body.phone_number = `91${phone}`;

  return await axios.put(`${API_URL}md/update-phone`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

