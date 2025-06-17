import axios from 'axios';

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/dashboard`);
    return response.data;  // Return the data from the response
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;  // Propagate the error to be handled in the hook
  }
};

export default {
  fetchDashboardData,
};
