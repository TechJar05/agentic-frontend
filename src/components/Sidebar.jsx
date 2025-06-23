// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import agenticLogo from "../assets/agenticLogo.png";
// import { toast } from "react-toastify";

// // eslint-disable-next-line no-unused-vars
// const Sidebar = ({ activeTab, setActiveTab }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const currentPath = location.pathname;

//   const handleLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     toast.success("Logged out successfully", { autoClose: 1500 });

//     // Delay navigation to allow toast to show
//     setTimeout(() => {
//       navigate("/", { replace: true });
//     }, 1500);
//   };

//   return (
//     <div className="bg-teal-700 text-white w-64 p-4 flex flex-col overflow-hidden">
//       <div className="p-5 border-b border-teal-600 flex items-center space-x-2">
//         <img src={agenticLogo} alt="Agentic Logo" className="w-8 h-8" />
//         <h1 className="text-xl font-bold">AGENTIC</h1>
//       </div>

//       <nav className="flex-1 overflow-y-auto py-4">
//         <ul>
//           <li>
//             <Link
//               to="/md-dashboard"
//               onClick={() => setActiveTab("dashboard")}
//               className={`flex items-center w-full px-6 py-3 text-left ${
//                 currentPath === "/md-dashboard" ? "bg-teal-600" : "hover:bg-teal-600"
//               } cursor-pointer whitespace-nowrap`}
//             >
//               <i className="fas fa-tachometer-alt mr-3"></i>
//               Dashboard Overview
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/manage-employee"
//               onClick={() => setActiveTab("employees")}
//               className={`flex items-center w-full px-6 py-3 text-left ${
//                 currentPath === "/manage-employee" ? "bg-teal-600" : "hover:bg-teal-600"
//               } cursor-pointer whitespace-nowrap`}
//             >
//               <i className="fas fa-users mr-3"></i>
//               Employee Management
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/task-logs"
//               onClick={() => setActiveTab("tasks")}
//               className={`flex items-center w-full px-6 py-3 text-left ${
//                 currentPath === "/task-logs" ? "bg-teal-600" : "hover:bg-teal-600"
//               } cursor-pointer whitespace-nowrap`}
//             >
//               <i className="fas fa-tasks mr-3"></i>
//               Task Logs
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       <div className="mt-auto p-4 border-t border-teal-600">
//         <button
//           onClick={handleLogout}
//           className="flex items-center w-full px-4 py-2 text-left text-white bg-teal-500 rounded-lg hover:bg-teal-400 cursor-pointer whitespace-nowrap"
//         >
//           <i className="fas fa-sign-out-alt mr-3"></i>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import eaBot from "../assets/eaBot.png";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {useAuth} from "../context/AuthContext";

const menuItems = [
  {
    path: "/md-dashboard",
    label: "Dashboard Overview",
    icon: "fas fa-tachometer-alt",
    key: "dashboard",
  },
  {
    path: "/manage-employee",
    label: "Employee Management",
    icon: "fas fa-users",
    key: "employees",
  },
  {
    path: "/task-logs",
    label: "Task Logs",
    icon: "fas fa-tasks",
    key: "tasks",
  },
];

// eslint-disable-next-line no-unused-vars
const Sidebar = ({ activeTab, setActiveTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const currentPath = location.pathname;

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully", { autoClose: 1500 });
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-teal-800 to-teal-600 text-white  min-h-screen flex flex-col border-r border-teal-700 transition-all duration-300 shadow-lg`}
    >
      {/* Logo & Collapse Button */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-teal-700">
        <div className="flex items-center gap-2 ">
          <img src={eaBot} alt="Logo" className="w-8 h-8 " />
          {!isCollapsed && (
            <h1 className="text-xl font-bold tracking-wide">EA BOT</h1>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white cursor-pointer focus:outline-none"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          {menuItems.map(({ path, label, icon, key }) => (
            <li key={key}>
              <Link
                to={path}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 ${
                  currentPath === path
                    ? "bg-white/20 text-white font-semibold shadow-inner"
                    : "hover:bg-white/10 hover:shadow-md"
                }`}
              >
                <i className={`${icon} text-sm w-5 text-center`}></i>
                {!isCollapsed && (
                  <span className="whitespace-nowrap">{label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
        <Link
          to="/user-guide"
          className="flex items-center px-6 py-3 rounded-r-full transition-all duration-150 hover:bg-teal-600"
        >
          <i className="fas fa-book mr-3 w-5 text-sm"></i>
          {!isCollapsed && <span>User Guide</span>}
        </Link>
      {/* Logout */}
      <div className="p-4 border-t border-teal-700">
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-start gap-3"
          } w-full px-4 py-2 bg-teal-500 hover:bg-teal-400 rounded-lg transition duration-200`}
        >
          <i className="fas fa-sign-out-alt w-5 text-sm"></i>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
