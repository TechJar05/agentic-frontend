import axios from 'axios';

// Create an Axios instance with the base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Get the base URL from Vite's env variable
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch all MDs
export const fetchMDs = async () => {
  try {
    const response = await api.get('/mds'); // Get list of MDs from the backend
    return response.data; // Return the list of MDs
  } catch (error) {
    console.error('Error fetching MDs:', error);
    throw error;
  }
};

// Function to update the MD's status (approve or reject)
export const updateMDStatus = async (id, status) => {
  try {
    const response = await api.post(`/mds/${id}/status`, { status });
    return response.data; // Return the updated MD
  } catch (error) {
    console.error('Error updating MD status:', error);
    throw error;
  }
};
