// src/hooks/useEmployees.js
import { useState, useEffect } from "react";
import {
  getEmployees,
  addEmployee,
  updateEmployeePhone,
  deleteEmployee,
} from "../services/employeeService";
import { useAuth } from "../context/authContext";

const useEmployees = (mdId) => {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees(mdId, token);
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mdId && token) {
      fetchEmployees();
    }
  }, [mdId, token]);

  const handleAddEmployee = async (employeeData) => {
    try {
      const addedEmployee = await addEmployee(employeeData, token);
      setEmployees((prev) => [...prev, addedEmployee]);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleUpdatePhone = async (employeeId, newPhone) => {
    try {
      const updatedEmployee = await updateEmployeePhone(employeeId, newPhone, token);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
      );
    } catch (error) {
      console.error("Error updating phone:", error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId, token);
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return {
    employees,
    loading,
    handleAddEmployee,
    handleUpdatePhone,
    handleDeleteEmployee,
    refetchEmployees: fetchEmployees,
  };
};

export default useEmployees;
