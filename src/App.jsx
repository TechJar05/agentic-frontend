// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import MDdashboard from './pages/MDdashboard'
// import ManageEmployee from './pages/ManageEmployee';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/dashboard" element={<MDdashboard />} />
//         <Route path="/manage-employee" element={<ManageEmployee />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MDdashboard from './pages/MDdashboard';
import ManageEmployee from './pages/ManageEmployee';
import Layout from './components/Layout';
import TaskLogs from './pages/TaskLogs';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MDdashboard />} />
          <Route path="/manage-employee" element={<ManageEmployee />} />
           <Route path="/task-logs" element={<TaskLogs />} /> 
           <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

