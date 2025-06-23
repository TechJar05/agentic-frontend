// ManageEmployee.jsx
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
    // eslint-disable-next-line no-unused-vars
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    if (Array.isArray(employees)) {
      const filtered = employees.filter((emp) =>
        emp.employeeName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEmployees(filtered);
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
    setNewEmployee({
      name: "",
      phoneNumber: "",
      taskCapacity: "",
      department: "",
    });
  };

  const handleUpdatePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      toast.warn("Phone number must be exactly 10 digits");
      return;
    }
    await handleUpdatePhone(selectedEmployee.id, `91${phoneNumber}`);
    setShowUpdatePhoneModal(false);
  };

  const openUpdatePhoneModal = (employee) => {
    setSelectedEmployee(employee);
    setPhoneNumber("");
    setShowUpdatePhoneModal(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mx-2 sm:mx-4 md:mx-10 my-4">
      <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
        <h3 className="text-lg sm:text-xl font-semibold">
          Employee Management
        </h3>
        <button
          onClick={() => setShowAddEmployeeModal(true)}
          className="px-4 py-2 bg-[#00968a] text-white rounded-lg hover:bg-[#007870] transition duration-200"
        >
          <i className="fas fa-plus mr-2"></i>Add New Employee
        </button>
      </div>

      <div className="p-4 sm:p-6 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full border px-3 py-2 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td className="px-6 py-4">{emp.employeeName}</td>
                <td className="px-6 py-4">{emp.phoneNumber}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      emp.employeeStatus === "active"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {emp.employeeStatus}
                  </span>
                </td>
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  <button
                    className="bg-[#00968a] hover:bg-[#007870] text-white px-3 py-1 rounded"
                    onClick={() => openUpdatePhoneModal(emp)}
                  >
                    Update Phone
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddEmployeeModal && (
      <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50 px-2 transition-all duration-300">
          <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add Employee
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={newEmployee.name}
                onChange={handleNewEmployeeChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00968a]"
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone (10 digits)"
                required
                maxLength="10"
                value={newEmployee.phoneNumber}
                onChange={handleNewEmployeeChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00968a]"
              />
              <input
                type="number"
                name="taskCapacity"
                placeholder="Task Capacity"
                required
                min="1"
                value={newEmployee.taskCapacity}
                onChange={handleNewEmployeeChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00968a]"
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                required
                value={newEmployee.department}
                onChange={handleNewEmployeeChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00968a]"
              />
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition duration-200"
                  onClick={() => setShowAddEmployeeModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00968a] text-white hover:bg-[#007870] rounded transition duration-200"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Phone Modal */}
      {showUpdatePhoneModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50 px-2 transition-all duration-300">
          <div className="bg-white p-6 w-full max-w-xs sm:max-w-md rounded-lg shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
              Update Phone
            </h2>
            <form onSubmit={handleUpdatePhoneSubmit}>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter new phone (10 digits)"
                className="mb-4 w-full p-2 border border-gray-300 rounded"
                maxLength="10"
                required
              />
              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded w-1/2"
                  onClick={() => setShowUpdatePhoneModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00968a] hover:bg-[#007870] text-white rounded w-1/2"
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

// import React, { useState } from 'react';
// import useEmployees from '../hooks/useEmployees';  // Custom hook to fetch employees
// import { addEmployee, updateEmployeePhone } from '../services/employeeService';  // Services to interact with the backend

// const ManageEmployee = () => {
//   const { employees, loading, handleAddEmployee, handleUpdatePhone } = useEmployees();  // Use the hook to manage employees
//   const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
//   const [showUpdatePhoneModal, setShowUpdatePhoneModal] = useState(false);
//   const [employeeName, setEmployeeName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [taskCapacity, setTaskCapacity] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredEmployees = employees.filter((employee) =>
//     employee.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     handleAddEmployee({ name: employeeName, phone: phoneNumber, taskCapacity });
//     setShowAddEmployeeModal(false);
//   };

//   const handlePhoneChange = (e) => {
//     const value = e.target.value;

//     // Allow only numbers and restrict to 10 digits
//     if (/[^0-9]/.test(value)) {
//       return;
//     }

//     if (value.length <= 10) {
//       setPhoneNumber(value);
//     }
//   };

//   const openUpdatePhoneModal = (employee) => {
//     setSelectedEmployee(employee);
//     setPhoneNumber(''); // Clear phone number input when opening the modal
//     setShowUpdatePhoneModal(true);
//   };

//   const handleUpdatePhoneSubmit = (e) => {
//     e.preventDefault();
//     if (phoneNumber.length === 10) {
//       handleUpdatePhone(selectedEmployee.id, phoneNumber);
//       setShowUpdatePhoneModal(false);
//     } else {
//       alert('Phone number must be exactly 10 digits');
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="bg-white rounded-xl shadow-sm">
//       <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="text-xl font-semibold">Employee Management</h3>
//         <button
//           onClick={() => setShowAddEmployeeModal(true)}
//           className="px-4 py-2 bg-[#00968a] text-white rounded-lg hover:bg-[#007870] flex items-center cursor-pointer !rounded-button whitespace-nowrap"
//         >
//           <i className="fas fa-plus mr-2"></i>
//           Add New Employee
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="p-6 border-b border-gray-200">
//         <label className="block text-sm font-medium text-gray-700 mb-1">Search Employee</label>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search by employee name..."
//             className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//         </div>
//       </div>

//       {/* Add Employee Modal */}
//       {showAddEmployeeModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 w-96 rounded-lg shadow-lg bg-opacity-90">
//             <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
//                 <input
//                   type="text"
//                   placeholder="Enter employee name"
//                   value={employeeName}
//                   onChange={(e) => setEmployeeName(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                 <input
//                   type="text"
//                   placeholder="Enter phone number"
//                   value={phoneNumber}
//                   onChange={handlePhoneChange}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Task Capacity</label>
//                 <input
//                   type="number"
//                   placeholder="Enter task capacity"
//                   value={taskCapacity}
//                   onChange={(e) => setTaskCapacity(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddEmployeeModal(false)}
//                   className="px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-[#00968a] text-white rounded-lg hover:bg-[#007870]"
//                 >
//                   Add Employee
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Update Phone Modal */}
//       {showUpdatePhoneModal && selectedEmployee && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 w-96 rounded-lg shadow-lg bg-opacity-90">
//             <h2 className="text-lg font-semibold mb-4">Update Phone Number</h2>
//             <form onSubmit={handleUpdatePhoneSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                 <input
//                   type="text"
//                   placeholder="Enter phone number"
//                   value={phoneNumber}
//                   onChange={handlePhoneChange}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   maxLength="10"
//                   required
//                 />
//               </div>

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={() => setShowUpdatePhoneModal(false)}
//                   className="px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-[#00968a] text-white rounded-lg hover:bg-[#007870]"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Employees Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 table-auto">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredEmployees.map((employee) => (
//               <tr key={employee.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
//                       <span className="text-teal-700 font-medium">{employee.name.charAt(0)}</span>
//                     </div>
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">{employee.name}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}
//                   >
//                     {employee.status}
//                   </span>
//                 </td>
//                 <td className=" font- text-sm  px-6 py-4 whitespace-nowrap">
//                   <button
//                     onClick={() => openUpdatePhoneModal(employee)}  // Open the modal for updating phone
//                     className="px-1 py-1 bg-[#00968a] text-white rounded hover:bg-[#007870]"
//                   >
//                     Update Phone Number
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//         <div className="text-sm text-gray-500">
//           Showing <span className="font-medium">1</span> to{' '}
//           <span className="font-medium">{filteredEmployees.length}</span> of{' '}
//           <span className="font-medium">{filteredEmployees.length}</span> employees
//         </div>
//         <div className="flex space-x-2">
//           <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
//             Previous
//           </button>
//           <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageEmployee;
