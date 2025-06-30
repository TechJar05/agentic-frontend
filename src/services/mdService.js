// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// // Get MD list for an admin
// // export const fetchMDs = async (adminId, token) => {
// //   const res = await axios.get(`${API_URL}admin/md-list/${adminId}`, {
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //   });

// //   const transformedMDs = res.data.data.mdList.map((md) => ({
// //     id: md.id,
// //     name: md.mdName,
// //     department: "N/A",
// //     date: new Date().toLocaleDateString(),
// //     status: md.approvalStatus,
// //   }));

// //   return transformedMDs;
// // };
// export const fetchMDs = async (adminId, token) => {
//   try {
//     const res = await axios.get(`${API_URL}admin/md-list/${adminId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log("API Response:", res.data); // Log the raw response

//     const transformedMDs = res.data.data.mdList.map((md) => {
//       console.log("Processing MD:", md); // Log each MD
//       return {
//         id: md.id,
//         name: md.mdName,
//         department: "N/A",
//         date: new Date().toLocaleDateString(),
//         status: md.approvalStatus,
//       };
//     });

//     console.log("Transformed MDs:", transformedMDs); // Log transformed data
//     return transformedMDs;
//   } catch (error) {
//     console.error("Error fetching MDs:", error);
//     throw error;
//   }
// };
// // Approve an MD
// export const approveMD = async (mdId, token) => {
//   const res = await axios.put(
//     `${API_URL}admin/approve-md/${mdId}`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return res.data;
// };

// // Reject an MD
// export const rejectMD = async (mdId, token) => {
//   const res = await axios.put(
//     `${API_URL}admin/reject-md/${mdId}`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return res.data;
// };

// // Delete an MD
// export const deleteMD = async (mdId, token) => {
//   const res = await axios.delete(`${API_URL}admin/delete-md/${mdId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.data;
// };


// services/mdService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getMDList = async (adminId, token) => {
  const response = await axios.get(`${API_URL}admin/md-list/${adminId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("🟩 API Data Received:", response.data); // ✅ Add this
  return response.data;
};

export const approveMD = async (mdId, token) => {
  const response = await axios.post(
    `${API_URL}admin/approve-md/${mdId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const rejectMD = async (mdId, token) => {
  const response = await axios.post(
    `${API_URL}admin/reject-md/${mdId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
