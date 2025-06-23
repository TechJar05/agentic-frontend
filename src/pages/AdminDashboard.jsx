// import React, { useState } from "react";

// // Mock data for MDs (Managing Directors)
// const initialMDs = [
//   {
//     id: 1,
//     name: "John Smith",
//     department: "HR",
//     date: "2025-06-10",
//     status: "approved",
//   },
//   {
//     id: 2,
//     name: "Sarah Johnson",
//     department: "Finance",
//     date: "2025-06-12",
//     status: "pending",
//   },
//   {
//     id: 3,
//     name: "Michael Chen",
//     department: "Operations",
//     date: "2025-06-15",
//     status: "rejected",
//   },
//   {
//     id: 4,
//     name: "Emily Williams",
//     department: "Marketing",
//     date: "2025-06-16",
//     status: "pending",
//   },
//   {
//     id: 5,
//     name: "Robert Davis",
//     department: "IT",
//     date: "2025-06-14",
//     status: "approved",
//   },
//   {
//     id: 6,
//     name: "Lisa Anderson",
//     department: "Sales",
//     date: "2025-06-11",
//     status: "pending",
//   },
// ];

// const AdminDashboard = () => {
//   const [mds, setMds] = useState(initialMDs); // Using mock data
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");

//   // Filter MDs based on the activeFilter and searchTerm
//   const filteredMDs = mds.filter((md) => {
//     const matchesStatus = activeFilter === "all" || md.status === activeFilter;
//     const matchesSearch =
//       md.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       md.department.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesStatus && matchesSearch;
//   });

//   // Handle filter change
//   const handleFilterChange = (status) => {
//     setActiveFilter(status);
//   };

//   // Simulate updating the MD's status (approve/reject)
//   const handleApprove = (id) => {
//     const updatedMDs = mds.map((md) =>
//       md.id === id ? { ...md, status: "approved" } : md
//     );
//     setMds(updatedMDs);
//   };

//   const handleReject = (id) => {
//     const updatedMDs = mds.map((md) =>
//       md.id === id ? { ...md, status: "rejected" } : md
//     );
//     setMds(updatedMDs);
//   };

//   const handleDelete = (id) => {
//     const updatedMDs = mds.filter((md) => {
//       return md.id !== id;
//     });
//     setMds(updatedMDs);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">
//             MD Approval Dashboard
//           </h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Filter and Search Section */}
//         <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
//               <button
//                 onClick={() => handleFilterChange("all")}
//                 className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap cursor-pointer ${
//                   activeFilter === "all"
//                     ? "bg-indigo-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 All MDs
//               </button>
//               <button
//                 onClick={() => handleFilterChange("approved")}
//                 className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap cursor-pointer ${
//                   activeFilter === "approved"
//                     ? "bg-green-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 Approved
//               </button>
//               <button
//                 onClick={() => handleFilterChange("pending")}
//                 className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap cursor-pointer ${
//                   activeFilter === "pending"
//                     ? "bg-yellow-500 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 Pending
//               </button>
//               <button
//                 onClick={() => handleFilterChange("rejected")}
//                 className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap cursor-pointer ${
//                   activeFilter === "rejected"
//                     ? "bg-red-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 Rejected
//               </button>
//             </div>
//             <div className="relative">
//               <input
//                 type="text"
//                 className="block w-full pl-3 pr-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//                 placeholder="Search MDs"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="bg-white shadow-sm rounded-lg overflow-hidden">
//           <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900">MD List</h2>
//             <p className="mt-1 text-sm text-gray-500">
//               {filteredMDs.length} MD{filteredMDs.length !== 1 && "s"} found
//             </p>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     MD Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Department
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredMDs.map((md) => (
//                   <tr key={md.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">{md.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {md.department}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">{md.date}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           md.status === "approved"
//                             ? "bg-green-100 text-green-800"
//                             : md.status === "pending"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {md.status.charAt(0).toUpperCase() + md.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       {md.status === "pending" ? (
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => handleApprove(md.id)}
//                             className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleReject(md.id)}
//                             className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md"
//                           >
//                             Reject
//                           </button>
//                           <button
//                             onClick={() => handleDelete(md.id)}
//                             className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       ) : (
//                         <span
//                           className={`font-medium ${
//                             md.status === "approved"
//                               ? "text-green-600"
//                               : "text-red-600"
//                           }`}
//                         >
//                           {md.status === "approved" ? "Approved" : "Rejected"}
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import useMDs from "../hooks/useMDs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const { mds, loading, handleReject, handleApprove } = useMDs(user?.id, token);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredMDs = mds.filter((md) => {
    const matchesStatus =
      activeFilter === "all" || md.approvalStatus === activeFilter;
    const matchesSearch = md.mdName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <ToastContainer />

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">MD Approval Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>Logout
        </button>
      </div>

      {/* Filter + Search */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {["all", "approved", "pending", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
                activeFilter === status
                  ? "bg-[#00968a] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search MDs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 focus:ring-[#00968a] focus:border-[#00968a] outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-semibold text-gray-500 uppercase">
                <th className="px-6 py-3">MD Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {filteredMDs.map((md) => (
                <tr key={md.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{md.mdName}</td>
                  <td className="px-6 py-4">{md.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        md.approvalStatus === "approved"
                          ? "bg-green-100 text-green-700"
                          : md.approvalStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {md.approvalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {md.approvalStatus === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(md.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(md.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm capitalize">No Action</span>
                    )}
                  </td>
                </tr>
              ))}
              {!filteredMDs.length && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No MDs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
