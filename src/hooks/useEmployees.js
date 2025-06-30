import { useState, useEffect } from "react";
import { getEmployees, addEmployee, updateEmployeePhone, deleteEmployee } from "../services/employeeService";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const useEmployees = (mdId) => {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const employeeList = await getEmployees(mdId, token);
      setEmployees(employeeList);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mdId && token) fetchEmployees();
  }, [mdId, token]);

  const handleAddEmployee = async (employeeData) => {
    try {
      await addEmployee(employeeData, token);
      toast.success("Employee added successfully");
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Failed to add employee");
    }
  };

  const handleUpdatePhone = async (employeeId, updatedData) => {
  try {
    await updateEmployeePhone(employeeId, updatedData, token);
    toast.success("Employee updated");
    await fetchEmployees(); // ✅ add await here
  } catch (error) {
    console.error("Error updating employee:", error);
    toast.error("Failed to update employee");
  }
};

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId, token);
      toast.success("Employee deleted");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
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
