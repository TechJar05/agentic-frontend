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

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import eaBot from "../assets/eaBot.png"; 
import { toast } from "react-toastify";

// eslint-disable-next-line no-unused-vars
const Sidebar = ({ activeTab, setActiveTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success("Logged out successfully", { autoClose: 1500 });

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
  };

  return (
    <div className="bg-teal-700 text-white w-64 min-h-screen flex flex-col overflow-hidden border-r border-teal-600">
      {/* Logo */}
      <div className="p-5 border-b border-teal-600 flex items-center gap-2">
        <img src={eaBot} alt="Agentic Logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold tracking-wide">EA BOT</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <Link
              to="/md-dashboard"
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center px-6 py-3 rounded-r-full transition-all duration-150 ${
                currentPath === "/md-dashboard"
                  ? "bg-teal-600 font-semibold"
                  : "hover:bg-teal-600"
              }`}
            >
              <i className="fas fa-tachometer-alt mr-3 w-5 text-sm"></i>
              Dashboard Overview
            </Link>
          </li>
          <li>
            <Link
              to="/manage-employee"
              onClick={() => setActiveTab("employees")}
              className={`flex items-center px-6 py-3 rounded-r-full transition-all duration-150 ${
                currentPath === "/manage-employee"
                  ? "bg-teal-600 font-semibold"
                  : "hover:bg-teal-600"
              }`}
            >
              <i className="fas fa-users mr-3 w-5 text-sm"></i>
              Employee Management
            </Link>
          </li>
          <li>
            <Link
              to="/task-logs"
              onClick={() => setActiveTab("tasks")}
              className={`flex items-center px-6 py-3 rounded-r-full transition-all duration-150 ${
                currentPath === "/task-logs"
                  ? "bg-teal-600 font-semibold"
                  : "hover:bg-teal-600"
              }`}
            >
              <i className="fas fa-tasks mr-3 w-5 text-sm"></i>
              Task Logs
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-teal-600">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 bg-teal-500 hover:bg-teal-400 rounded-lg transition duration-200"
        >
          <i className="fas fa-sign-out-alt mr-3 w-5 text-sm"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
