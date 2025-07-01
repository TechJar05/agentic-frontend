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
} from "react-router-dom";
import { useState } from "react";
import MDdashboard from "./pages/MDdashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageEmployee from "./pages/ManageEmployee";
import Layout from "./components/Layout";
import TaskLogs from "./pages/TaskLogs";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import UserGuide from "./pages/UserGuide";

function App() {
  const [user, setUser] = useState(null); // Replace this with  actual authentication logic

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin dashboard protected */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* MD Layout + child routes protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/md-dashboard" element={<MDdashboard />} />
          <Route path="/manage-employee" element={<ManageEmployee />} />
          <Route path="/task-logs" element={<TaskLogs />} />
          <Route path="/user-guide" element={<UserGuide />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
