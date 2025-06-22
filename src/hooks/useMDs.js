// import { useState, useEffect } from "react";
// import { fetchMDs, approveMD, rejectMD, deleteMD } from "../services/mdService"; // Updated import

// const useMDs = (adminId, token) => {
//   const [mds, setMDs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!adminId || !token) {
//         setError("Admin ID or token is missing");
//         return;
//       }

//       try {
//         setLoading(true);
//         const data = await fetchMDs(adminId, token); // Use fetchMDs
//         setMDs(data); // Data is already transformed in fetchMDs
//       } catch (err) {
//         setError(err?.response?.data?.message || "Failed to fetch MDs");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [adminId, token]);

//   const changeMDStatus = async (mdId, action) => {
//     try {
//       setLoading(true);
//       if (action === "approved") {
//         await approveMD(mdId, token);
//       } else if (action === "rejected") {
//         await rejectMD(mdId, token);
//       } else if (action === "deleted") {
//         await deleteMD(mdId, token);
//       }
//       const data = await fetchMDs(adminId, token); // Use fetchMDs
//       setMDs(data);
//     } catch (err) {
//       setError(err?.response?.data?.message || `Failed to ${action} MD`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { mds, loading, error, changeMDStatus };
// };

// export default useMDs;

import { useEffect, useState } from "react";
import { getMDList, approveMD, rejectMD } from "../services/mdService";

const useMDs = (adminId, token) => {
  const [mds, setMds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMDs = async () => {
    try {
      setLoading(true);
      const data = await getMDList(adminId, token);

      // 🔧 Access correct nested structure
      const mdArray = data?.data?.mdList || [];

      const transformed = mdArray.map((md) => ({
        id: md.id,
        mdName: md.mdName,
        phoneNumber: md.phoneNumber,
        approvalStatus: md.approvalStatus,
      }));

      setMds(transformed);
    } catch {
      setError("Failed to load MDs.");
    } finally {
      setLoading(false);
    }
  };

  const changeMDStatus = async (mdId, newStatus) => {
    try {
      if (newStatus === "approved") await approveMD(mdId, token);
      else if (newStatus === "rejected") await rejectMD(mdId, token);

      setMds((prevMds) =>
        prevMds.map((md) =>
          md.id === mdId ? { ...md, approvalStatus: newStatus } : md
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  useEffect(() => {
    if (adminId && token) {
      fetchMDs();
    }
  }, [adminId, token]);

  return {
  mds,
  loading,
  error,
  handleReject: (id) => changeMDStatus(id, "rejected"),
  handleApprove: (id) => changeMDStatus(id, "approved"),
};
};

export default useMDs;
