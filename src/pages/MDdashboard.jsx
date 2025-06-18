// import { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { useNavigate } from 'react-router-dom';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// const fetchDashboardData = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         totalEmployees: 5,
//         tasksAssigned: 12,
//         tasksInProgress: 3,
//         tasksPendingApproval: 2,
//         tasksCompleted: 7,
//         taskCompletionRate: [90, 80, 85, 70, 75, 95, 80],
//       });
//     }, 1000);
//   });
// };

// const MDdashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadData = async () => {
//       const data = await fetchDashboardData();
//       setDashboardData(data);
//     };
//     loadData();
//   }, []);

//   if (!dashboardData) return <div>Loading...</div>;

//   const chartData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Task Completion Rate',
//         data: dashboardData.taskCompletionRate,
//         fill: true,
//         backgroundColor: 'rgba(0, 150, 138,0.2)',
//         borderColor: 'rgba(1, 117, 48,1)',
//         tension: 0.3,
//       },
//     ],
//   };

//   const metrics = [
//     { title: 'Total Employees', value: dashboardData.totalEmployees, icon: 'fa-users' },
//     { title: 'Tasks Assigned', value: dashboardData.tasksAssigned, icon: 'fa-tasks' },
//     { title: 'Tasks In Progress', value: dashboardData.tasksInProgress, icon: 'fa-spinner' },
//     { title: 'Pending Approval', value: dashboardData.tasksPendingApproval, icon: 'fa-clock' },
//     { title: 'Tasks Completed', value: dashboardData.tasksCompleted, icon: 'fa-check' },
//   ];

//   const handleViewAllTasks = () => {
//     navigate('/task-logs');
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 font-bold">
//         {metrics.map((metric, index) => (
//           <div key={index} className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-black text-sm">{metric.title}</p>
//                 <h3 className="text-3xl text-gray-500 mt-1">{metric.value}</h3>
//               </div>
//               <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-800">
//                 <i className={`fas ${metric.icon} text-xl`}></i>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//         <h3 className="text-xl font-semibold mb-4">Task Completion Rate</h3>
//         <Line data={chartData} />
//       </div>

//       <div className="bg-white rounded-xl shadow-sm p-6 text-center">
//         <button
//           onClick={handleViewAllTasks}
//           className="px-6 py-3 bg-[#00968a] text-white rounded-lg hover:bg-[#007870] flex items-center mx-auto cursor-pointer"
//         >
//           <i className="fas fa-tasks mr-2"></i>
//           View All Tasks
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MDdashboard;

import React from "react";
import { useNavigate } from "react-router-dom"; // Navigation hook
import { Line } from "react-chartjs-2"; // Chart component
import useDashboard from "../hooks/useDashboard"; // Import the custom hook to fetch dashboard data
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MDdashboard = () => {
  const navigate = useNavigate(); // Hook to navigate to other pages
  const { dashboardData, loading, error } = useDashboard(); // Using the custom hook to fetch dashboard data

  // Handle the button click to navigate to the Task Logs page
  const handleViewAllTasks = () => {
    navigate("/task-logs");
  };

  if (loading) return <div>Loading...</div>; // Show loading state while data is being fetched
  if (error) return <div>Error: {error}</div>; // Show error message if data fetching fails

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Task Completion Rate",
        data: dashboardData.taskCompletionRate,
        fill: true,
        backgroundColor: "rgba(0, 150, 138,0.2)",
        borderColor: "rgba(1, 117, 48,1)",
        tension: 0.3,
      },
    ],
  };

  const metrics = [
    {
      title: "Total Employees",
      value: dashboardData.totalEmployees,
      icon: "fa-users",
    },
    {
      title: "Tasks Assigned",
      value: dashboardData.tasksAssigned,
      icon: "fa-tasks",
    },
    {
      title: "Tasks In Progress",
      value: dashboardData.tasksInProgress,
      icon: "fa-spinner",
    },
    {
      title: "Pending Approval",
      value: dashboardData.tasksPendingApproval,
      icon: "fa-clock",
    },
    {
      title: "Tasks Completed",
      value: dashboardData.tasksCompleted,
      icon: "fa-check",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 font-bold">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black text-sm">{metric.title}</p>
                <h3 className="text-3xl text-gray-500 mt-1">{metric.value}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                <i className={`fas ${metric.icon} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Task Completion Rate</h3>
        <Line data={chartData} />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <button
          onClick={handleViewAllTasks}
          className="px-6 py-3 bg-[#00968a] text-white rounded-lg hover:bg-[#007870] flex items-center mx-auto cursor-pointer"
        >
          <i className="fas fa-tasks mr-2"></i>
          View All Tasks
        </button>
      </div>
    </div>
  );
};

export default MDdashboard;
