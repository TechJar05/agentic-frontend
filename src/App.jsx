// src/App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MDdashboard from './pages/MDdashboard';
// import ManageEmployee from './pages/ManageEmployee';
// import Layout from './components/Layout';
// import TaskLogs from './pages/TaskLogs';
// import Profile from './pages/Profile';
// import AdminDashboard from './pages/AdminDashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<MDdashboard />} />
//           <Route path="/manage-employee" element={<ManageEmployee />} />
//            <Route path="/task-logs" element={<TaskLogs />} />
//            <Route path="/profile" element={<Profile />} />
//            <Route path="/admin" element={<AdminDashboard />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.js

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Make sure Navigate is imported here
import { useState } from "react";
import MDdashboard from "./pages/MDdashboard";
import AdminDashboard from "./pages/AdminDashboard"; // Import the Admin Dashboard
import ManageEmployee from "./pages/ManageEmployee";
import Layout from "./components/Layout";
import TaskLogs from "./pages/TaskLogs";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null); // Replace this with your actual authentication logic

  return (
    <Router>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Routes>
        {/* Starting Page - LoginPage */}
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Redirect to login as the starting page */}
        {/* Routes for pages that need the Layout (sidebar and navbar) */}
        {/* Route for Admin Dashboard after login */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Layout />}>
          {/* Route for MD dashboard after login */}
          <Route
            path="/md-dashboard"
            element={
              user && user.role === "md" ? (
                <MDdashboard />
              ) : (
                <MDdashboard />
                // <Navigate to="/login" />
              )
            }
          />

          {/* Other Routes */}
          <Route path="/manage-employee" element={<ManageEmployee />} />
          <Route path="/task-logs" element={<TaskLogs />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Route>
        {/* Routes for Login and Register pages without Layout */}
        {/* <Route path="/login" element={<LoginPage setUser={setUser} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
