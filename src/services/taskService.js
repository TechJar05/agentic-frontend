// src/services/taskService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const fetchTasks = async (mdId) => {
  try {
    const response = await axios.get(`${API_URL}md/task-logs/${mdId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export default {
  fetchTasks,
};
