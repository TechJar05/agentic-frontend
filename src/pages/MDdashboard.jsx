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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import useDashboard from "../hooks/useDashboard";
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
  const navigate = useNavigate();
  const { loadDashboardData, loading } = useDashboard();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await loadDashboardData();
        setDashboardData(response.data.data);
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
        alert("Failed to fetch dashboard data");
      }
    }

    fetchData();
  }, []);

  const handleViewAllTasks = () => navigate("/task-logs");

  if (loading || !dashboardData)
    return (
      <div className="p-8 text-center text-gray-600 animate-pulse">
        Loading Dashboard...
      </div>
    );

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Task Completion Rate",
        data: dashboardData.taskCompletionRate || [10, 20, 30, 25, 35, 20, 30],
        fill: true,
        backgroundColor: "rgba(16, 163, 149, 0.15)",
        borderColor: "#10a395",
        tension: 0.3,
      },
    ],
  };

  const metrics = [
    { title: "Total Employees", value: dashboardData.totalEmployees, icon: "fa-users" },
    { title: "Tasks Assigned", value: dashboardData.tasksAssigned, icon: "fa-tasks" },
    { title: "Tasks In Progress", value: dashboardData.tasksInProgress, icon: "fa-spinner" },
    { title: "Pending Approval", value: dashboardData.pendingApprovals, icon: "fa-clock" },
    { title: "Tasks Completed", value: dashboardData.tasksCompleted, icon: "fa-check" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#f3f7f6] to-[#e8f3f2] min-h-screen">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 font-bold">
        {metrics.map((metric, index) => (
          <div
            key={index}
            onClick={handleViewAllTasks}
            className="cursor-pointer  bg-white border border-gray-400 rounded-2xl p-6 flex justify-between items-center hover:shadow-[0_0_15px_rgba(16,163,149,0.3)] hover:scale-[1.02] transition-all duration-300"
          >
            <div>
              <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
              <h3 className="text-3xl text-[#10a395] font-bold">
                {metric.value}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#e6f9f7] flex items-center justify-center text-[#10a395] border border-[#b5eae4] shadow-sm">
              <i className={`fas ${metric.icon} text-xl`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white border border-gray-400 rounded-2xl shadow-sm p-6 mb-10 hover:shadow-[0_0_15px_rgba(16,163,149,0.2)] hover:scale-[1.01] transition-transform duration-300">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
          Weekly Task Completion Rate
        </h3>
        <div className="min-w-[320px]">
          <Line data={chartData} />
        </div>
      </div>

      {/* View All Tasks Button */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 text-center hover:shadow-[0_0_12px_rgba(16,163,149,0.2)] transition">
        <button
          onClick={handleViewAllTasks}
          className="w-full sm:w-auto px-6 py-3 cursor-pointer bg-[#10a395] text-white rounded-lg font-medium hover:bg-[#0d8a7e] transition-all duration-300 transform hover:scale-105"
        >
          <i className="fas fa-tasks mr-2"></i>
          View All Tasks
        </button>
      </div>
    </div>
  );
};

export default MDdashboard;
