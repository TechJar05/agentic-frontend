import axios from "axios";

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}md/dashboard/4`);

    return response;
  } catch (error) {
    console.log("Error fetching dashboard data:", error);

    throw error.response;
  }
};
