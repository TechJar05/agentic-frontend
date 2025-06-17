import React, { useState } from 'react';

const ManageEmployee = () => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showUpdatePhoneModal, setShowUpdatePhoneModal] = useState(false); // State to control the Update Phone modal
  const [employeeName, setEmployeeName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [taskCapacity, setTaskCapacity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Track which employee is being updated

  const employees = [
    { id: 1, name: 'John Doe', phone: '123-456-7890', status: 'Active' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', status: 'Inactive' },
    { id: 3, name: 'Sarah Lee', phone: '555-123-4567', status: 'Active' },
  ];

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form submission for adding an employee
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Employee Added: ${employeeName}, ${phoneNumber}, ${taskCapacity}`);
    setShowAddEmployeeModal(false);
  };

  // Handle phone number change for validation
  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Allow only numbers and restrict to 10 digits
    if (/[^0-9]/.test(value)) {
      return;
    }

    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  // Open the modal to update phone number and clear previous input
  const openUpdatePhoneModal = (employee) => {
    setSelectedEmployee(employee);
    setPhoneNumber(''); // Clear phone number input when opening the modal
    setShowUpdatePhoneModal(true);
  };

  // Handle phone number update
  const handleUpdatePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      alert(`Phone number for ${selectedEmployee.name} updated to: ${phoneNumber}`);
      setShowUpdatePhoneModal(false);
    } else {
      alert('Phone number must be exactly 10 digits');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-semibold">Employee Management</h3>
        <button
          onClick={() => setShowAddEmployeeModal(true)}
          className="px-4 py-2 bg-[#00968a] text-white rounded-lg hover:bg-[#007870] flex items-center cursor-pointer !rounded-button whitespace-nowrap"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search Employee</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by employee name..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-96 rounded-lg shadow-lg bg-opacity-90">
            <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                <input
                  type="text"
                  placeholder="Enter employee name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Capacity</label>
                <input
                  type="number"
                  placeholder="Enter task capacity"
                  value={taskCapacity}
                  onChange={(e) => setTaskCapacity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00968a] text-white rounded-lg hover:bg-[#007870]"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Phone Modal */}
      {showUpdatePhoneModal && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-96 rounded-lg shadow-lg bg-opacity-90">
            <h2 className="text-lg font-semibold mb-4">Update Phone Number</h2>
            <form onSubmit={handleUpdatePhoneSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  maxLength="10"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowUpdatePhoneModal(false)}
                  className="px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00968a] text-white rounded-lg hover:bg-[#007870]"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employees Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-700 font-medium">{employee.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className=" font- text-sm  px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => openUpdatePhoneModal(employee)}  // Open the modal for updating phone
                    className="px-1 py-1 bg-[#00968a] text-white rounded hover:bg-[#007870]"
                  >
                    Update Phone Number
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to{' '}
          <span className="font-medium">{filteredEmployees.length}</span> of{' '}
          <span className="font-medium">{filteredEmployees.length}</span> employees
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
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


