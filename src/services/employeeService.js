// src/services/employeeService.js
import axios from 'axios';

// Get the API URL from the environment variables using import.meta.env
const API_URL = import.meta.env.VITE_API_URL;

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch employees from the backend
export const getEmployees = async () => {
  const response = await apiClient.get('/employees');
  return response.data;
};

// Add a new employee
export const addEmployee = async (employeeData) => {
  const response = await apiClient.post('/employees', employeeData);
  return response.data;
};

// Update an employee's phone number
export const updateEmployeePhone = async (employeeId, newPhone) => {
  const response = await apiClient.put(`/employees/${employeeId}`, { phone: newPhone });
  return response.data;
};
