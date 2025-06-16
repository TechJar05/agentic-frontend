import React, { useState } from 'react';

const TaskLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const tasks = [
    {
      id: 'T001',
      description: 'Fix server bug',
      dept: 'IT',
      assignedTo: 'John Doe',
      status: 'In Progress',
      priority: 'High',
      deadline: '2025-06-20',
      createdAt: '2025-06-10',
      pendingApproval: true,
    },
    {
      id: 'T002',
      description: 'Update website',
      dept: 'Marketing',
      assignedTo: 'Jane Smith',
      status: 'Completed',
      priority: 'Medium',
      deadline: '2025-06-15',
      createdAt: '2025-06-08',
      pendingApproval: false,
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesQuery = task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status.toLowerCase().replace(' ', '') === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Task Logs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Task ID', 'Description', 'Department', 'Assigned To', 'Status', 'Priority', 'Deadline', 'Created At', 'Pending Approval'].map((head, idx) => (
                <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.id}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.dept}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.assignedTo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.deadline}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.pendingApproval ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {task.pendingApproval ? 'Pending' : 'Approved'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTasks.length}</span> of <span className="font-medium">{filteredTasks.length}</span> tasks
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TaskLogs;
