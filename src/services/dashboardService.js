import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchDashboardData = async (mdId, token) => {
  try {
    const response = await axios.get(`${API_URL}md/dashboard/${mdId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error.response;
  }
};
