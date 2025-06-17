import React from "react";
import { Link, Navigate, useLocation ,useNavigate} from "react-router-dom";
import agenticLogo from "../assets/agenticLogo.png";

// eslint-disable-next-line no-unused-vars
const Sidebar = ({ activeTab, setActiveTab }) => {
  const location = useLocation();

  const currentPath = location.pathname;
   const navigate = useNavigate();

 
  const handleLogout = () => {
   
    localStorage.clear(); 
    sessionStorage.clear(); 
    alert("Logging out...");
    navigate("/login"); 
  };

  return (
    <div className="bg-teal-700 text-white w-64 p-4 flex flex-col overflow-hidden">
      <div className="p-5 border-b border-teal-600 flex items-center space-x-2">
        <img src={agenticLogo} alt="Agentic Logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold">AGENTIC</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center w-full px-6 py-3 text-left ${
                currentPath === "/" ? "bg-teal-600" : "hover:bg-teal-600"
              } cursor-pointer whitespace-nowrap`}
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard Overview
            </Link>
          </li>
          <li>
            <Link
              to="/manage-employee"
              onClick={() => setActiveTab("employees")}
              className={`flex items-center w-full px-6 py-3 text-left ${
                currentPath === "/manage-employee"
                  ? "bg-teal-600"
                  : "hover:bg-teal-600"
              } cursor-pointer whitespace-nowrap`}
            >
              <i className="fas fa-users mr-3"></i>
              Employee Management
            </Link>
          </li>
          <li>
            <Link
              to="/task-logs"
              onClick={() => setActiveTab("tasks")}
              className={`flex items-center w-full px-6 py-3 text-left ${
                currentPath === "/task-logs"
                  ? "bg-teal-600"
                  : "hover:bg-teal-600"
              } cursor-pointer whitespace-nowrap`}
            >
              <i className="fas fa-tasks mr-3"></i>
              Task Logs
            </Link>
          </li>

          <Link
            to="/profile"
            className={`flex items-center w-full px-6 py-3 text-left ${
              currentPath === "/profile" ? "bg-teal-600" : "hover:bg-teal-600"
            } cursor-pointer whitespace-nowrap`}
          >
            <i className="fas fa-user-circle mr-3"></i>
            Profile
          </Link>
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t border-teal-600">
        <button
          onClick={handleLogout}  // Call handleLogout on click
          className="flex items-center w-full px-4 py-2 text-left text-white bg-teal-500 rounded-lg hover:bg-teal-400 cursor-pointer whitespace-nowrap"
        >
          <i className="fas fa-sign-out-alt mr-3"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
