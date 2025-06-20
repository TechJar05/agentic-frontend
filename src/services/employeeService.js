// src/services/employeeService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get employees
export const getEmployees = async (mdId, token) => {
  const res = await axios.get(`${API_URL}md/employee-list/${mdId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Add new employee
export const addEmployee = async (employeeData, token) => {
  const payload = {
    ...employeeData,
    phone_number: `91${employeeData.phone_number}`,
  };

  const res = await axios.post(`${API_URL}md/create-employee`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Update phone number
export const updateEmployeePhone = async (employeeId, phone, token) => {
  const res = await axios.put(
    `${API_URL}md/update-employee-phone/${employeeId}`,
    { phone_number: phone },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// Delete employee
export const deleteEmployee = async (employeeId, token) => {
  return await axios.delete(`${API_URL}md/delete-employee/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
