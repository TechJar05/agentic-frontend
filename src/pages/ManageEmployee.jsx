// // src/components/Manage_Employee.jsx
// import React, { useState } from 'react';

// const employees = [
//   { id: 1, name: 'John Doe', phone: '123-456-7890', status: 'Active' },
//   { id: 2, name: 'Jane Smith', phone: '987-654-3210', status: 'Inactive' },
//   { id: 3, name: 'Sarah Lee', phone: '555-123-4567', status: 'Active' },
// ];

// const ManageEmployee = () => {
//   // eslint-disable-next-line no-unused-vars
//   const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

//   const updatePhoneNumber = (id) => {
//     alert(`Updating phone number for employee ID: ${id}`);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="text-xl font-semibold">Employee Management</h3>
//         <button
//           onClick={() => setShowAddEmployeeModal(true)}
//           className="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 flex items-center cursor-pointer"
//         >
//           <i className="fas fa-plus mr-2"></i>
//           Add New Employee
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {employees.map((employee) => (
//               <tr key={employee.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{employee.phone}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {employee.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <button
//                     onClick={() => updatePhoneNumber(employee.id)}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                   >
//                     Update Phone Number
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageEmployee;

import React, { useState } from 'react';

const ManageEmployee = () => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  const [employeeName, setEmployeeName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [taskCapacity, setTaskCapacity] = useState('');

  const employees = [
    { id: 1, name: 'John Doe', phone: '123-456-7890', status: 'Active' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210', status: 'Inactive' },
    { id: 3, name: 'Sarah Lee', phone: '555-123-4567', status: 'Active' },
  ];

  const updatePhoneNumber = (id) => {
    alert(`Updating phone number for employee ID: ${id}`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Employee Added: ${employeeName}, ${phoneNumber}, ${taskCapacity}`);
    setShowAddEmployeeModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-semibold">Employee Management</h3>
        <button
          onClick={() => setShowAddEmployeeModal(true)}
          className="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 flex items-center cursor-pointer !rounded-button whitespace-nowrap"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Employee
        </button>
      </div>

      {/* Semi-Transparent Modal */}
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  className="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            {employees.map((employee) => (
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => updatePhoneNumber(employee.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
          <span className="font-medium">{employees.length}</span> of{' '}
          <span className="font-medium">{employees.length}</span> employees
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
