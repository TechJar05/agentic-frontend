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
import { useAuth } from "../context/authContext";
import useMDs from "../hooks/useMDs";

const AdminDashboard = () => {
  const { user } = useAuth(); // ✅ Get admin ID from context
  const adminId = user?.id;

  const { mds, loading, error, changeMDStatus } = useMDs(adminId);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredMDs = mds.filter((md) => {
    const matchesStatus = activeFilter === "all" || md.status === activeFilter;
    const matchesSearch =
      md.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      md.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) return <div>Loading MDs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">MD Approval Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              {["all", "approved", "pending", "rejected"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`px-4 py-2 text-sm font-medium rounded-full ${
                    activeFilter === status
                      ? `bg-${status === "approved"
                          ? "green"
                          : status === "pending"
                          ? "yellow"
                          : status === "rejected"
                          ? "red"
                          : "indigo"
                        }-600 text-white`
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <input
              type="text"
              className="border px-3 py-2 rounded-md shadow-sm text-sm"
              placeholder="Search MDs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b">
            <h2 className="text-lg font-medium text-gray-900">MD List</h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredMDs.length} MD{filteredMDs.length !== 1 && "s"} found
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MD Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {filteredMDs.map((md) => (
                  <tr key={md.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{md.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{md.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{md.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        md.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : md.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {md.status.charAt(0).toUpperCase() + md.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {md.status === "pending" ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => changeMDStatus(md.id, "approved")}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => changeMDStatus(md.id, "rejected")}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`font-medium ${
                            md.status === "approved" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {md.status.charAt(0).toUpperCase() + md.status.slice(1)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
;
export default AdminDashboard;
