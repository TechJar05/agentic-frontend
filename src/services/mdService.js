// src/services/mdService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get MD list for an admin
export const fetchMDs = async (adminId, token) => {
  const res = await axios.get(`${API_URL}admin/md-list/${adminId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Reject an MD
export const rejectMD = async (mdId, token) => {
  const res = await axios.put(
    `${API_URL}admin/reject-md/${mdId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
