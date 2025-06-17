import axios from 'axios';

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const fetchTasks = async (searchQuery, statusFilter, priorityFilter, approvalFilter) => {
  try {
    // Build query parameters to filter tasks
    const params = {
      searchQuery,
      statusFilter,
      priorityFilter,
      approvalFilter,
    };

    const response = await axios.get(`${API_URL}/api/tasks`, { params }); // Send GET request with query parameters
    return response.data;  // Return tasks data
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;  // Propagate the error to be handled in the hook
  }
};

export default {
  fetchTasks,
};
