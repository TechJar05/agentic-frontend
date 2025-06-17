// src/hooks/useEmployees.js
import { useState, useEffect } from 'react';
import { getEmployees, addEmployee, updateEmployeePhone } from '../services/employeeService';

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (employeeData) => {
    try {
      const addedEmployee = await addEmployee(employeeData);
      setEmployees((prevEmployees) => [...prevEmployees, addedEmployee]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleUpdatePhone = async (employeeId, newPhone) => {
    try {
      const updatedEmployee = await updateEmployeePhone(employeeId, newPhone);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        )
      );
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  };

  return { employees, loading, handleAddEmployee, handleUpdatePhone };
};

export default useEmployees;
