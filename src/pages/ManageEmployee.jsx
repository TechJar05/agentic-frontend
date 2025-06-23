import React, { useEffect, useState } from "react";
import useEmployees from "../hooks/useEmployees";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const ManageEmployee = () => {
  const { user } = useAuth();
  const mdId = user?.id;

  const {
    employees,
    loading,
    handleAddEmployee,
    handleUpdatePhone,
    handleDeleteEmployee,
    refetchEmployees,
  } = useEmployees(mdId);

  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showUpdatePhoneModal, setShowUpdatePhoneModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    phoneNumber: "",
    taskCapacity: "",
    department: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    if (Array.isArray(employees)) {
      setFilteredEmployees(
        employees.filter((emp) =>
          emp.employeeName?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, employees]);

  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && !/^\d{0,10}$/.test(value)) return;
    if (name === "taskCapacity" && parseInt(value) < 0) return;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, phoneNumber, taskCapacity, department } = newEmployee;
    if (!name || !phoneNumber || !taskCapacity || !department) {
      toast.warn("All fields are required");
      return;
    }
    if (phoneNumber.length !== 10) {
      toast.warn("Phone number must be exactly 10 digits");
      return;
    }
    if (parseInt(taskCapacity) <= 0) {
      toast.warn("Task capacity must be greater than 0");
      return;
    }
    const payload = {
      employeeName: name,
      phoneNumber: `91${phoneNumber}`,
      maxTaskCapacity: taskCapacity,
      department,
    };
    await handleAddEmployee(payload);
    setShowAddEmployeeModal(false);
    setNewEmployee({ name: "", phoneNumber: "", taskCapacity: "", department: "" });
  };

  const openUpdatePhoneModal = (employee) => {
    setSelectedEmployee(employee);
    setPhoneNumber("");
    setUpdatedName(employee.employeeName);
    setShowUpdatePhoneModal(true);
  };

  const handleUpdatePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10 && !updatedName.trim()) {
      toast.warn("Please update either name or phone number.");
      return;
    }
    const payload = {};
    if (updatedName.trim()) payload.employeeName = updatedName.trim();
    if (phoneNumber.length === 10) payload.phoneNumber = `91${phoneNumber}`;
    await handleUpdatePhone(selectedEmployee.id, payload);
    setShowUpdatePhoneModal(false);
    await refetchEmployees();
  };

  return (
    <div className="bg-gray-50 px-4 sm:px-8 py-6 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-[#00968a]">
            Manage Employees
          </h2>
          <button
            onClick={() => setShowAddEmployeeModal(true)}
            className="bg-[#10a395] cursor-pointer hover:bg-[#0d8a7e] text-white px-5 py-2 rounded-lg transition-all"
          >
            <i className="fas fa-plus mr-2"></i> Add New Employee
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search employee by name..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:ring-2 focus:ring-[#00968a] outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{emp.employeeName}</td>
                  <td className="px-6 py-4">{emp.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        emp.employeeStatus === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {emp.employeeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => openUpdatePhoneModal(emp)}
                      className="bg-[#10a395] cursor-pointer text-white px-3 py-1.5 rounded hover:bg-[#0d8a7e] transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(emp.id)}
                      className="bg-red-600 cursor-pointer text-white px-3 py-1.5 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!filteredEmployees.length && !loading && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No employees found.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    Loading employees...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl">
            <h3 className="text-lg font-semibold mb-4 cursor-pointer text-center">Add Employee</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {["name", "phoneNumber", "taskCapacity", "department"].map((field) => (
                <input
                  key={field}
                  name={field}
                  type={field === "taskCapacity" ? "number" : "text"}
                  placeholder={
                    field === "taskCapacity"
                      ? "Task Capacity"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  required
                  value={newEmployee[field]}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#00968a] outline-none"
                />
              ))}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="px-4 py-2 rounded cursor-pointer bg-gray-300 hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 cursor-pointer bg-[#00968a] text-white rounded hover:bg-[#007870] text-sm"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdatePhoneModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl">
            <h3 className="text-lg font-semibold mb-4 cursor-pointer text-center">Update Employee</h3>
            <form onSubmit={handleUpdatePhoneSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#00968a] outline-none"
              />
              <input
                type="text"
                placeholder="New Phone (10 digits)"
                maxLength="10"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#00968a] outline-none"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowUpdatePhoneModal(false)}
                  className="px-4 py-2  cursor-pointer rounded bg-gray-300 hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 cursor-pointer bg-[#00968a] text-white rounded hover:bg-[#007870] text-sm"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEmployee;