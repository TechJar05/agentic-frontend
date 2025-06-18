import axios from 'axios';

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}md/dashboard/4`);
    return response.data;  
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error; 
  }
};

export default {
  fetchDashboardData,
};
