import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const fetchTasks = async (mdId, token) => {
  try {
    const response = await axios.get(`${API_URL}md/task-logs/${mdId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data?.data?.taskLogs || []; // 🛠 Proper path to taskLogs
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export default {
  fetchTasks,
};
