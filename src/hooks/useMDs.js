// import { useState, useEffect } from "react";
// import { fetchMDs, rejectMD } from "../services/mdService";


// const useMDs = (adminId, token) => {
//   const [mds, setMds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getMDs = async () => {
//       try {
//         console.log("Calling fetchMDs with:", { adminId, token });
//         const data = await fetchMDs(adminId, token);
//         setMds(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Fetch MDs failed", err);
//         setError("Failed to fetch MDs");
//         setLoading(false);
//       }
//     };

//     if (adminId && token) {
//       getMDs(); // ✅ Only fire when both exist
//     }
//   }, [adminId, token]);

//   const changeMDStatus = async (id, status) => {
//     try {
//       if (status === "rejected") {
//         await rejectMD(id, token);
//       }
//       setMds((prev) =>
//         prev.map((md) => (md.id === id ? { ...md, status } : md))
//       );
//     } catch {
//       setError("Failed to update MD status");
//     }
//   };

//   return { mds, loading, error, changeMDStatus };
// };
// export default useMDs;
import { useState, useEffect } from "react";
import { fetchMDs, approveMD, rejectMD, deleteMD } from "../services/mdService"; // Updated import

const useMDs = (adminId, token) => {
  const [mds, setMDs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!adminId || !token) {
        setError("Admin ID or token is missing");
        return;
      }

      try {
        setLoading(true);
        const data = await fetchMDs(adminId, token); // Use fetchMDs
        setMDs(data); // Data is already transformed in fetchMDs
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch MDs");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [adminId, token]);

  const changeMDStatus = async (mdId, action) => {
    try {
      setLoading(true);
      if (action === "approved") {
        await approveMD(mdId, token);
      } else if (action === "rejected") {
        await rejectMD(mdId, token);
      } else if (action === "deleted") {
        await deleteMD(mdId, token);
      }
      const data = await fetchMDs(adminId, token); // Use fetchMDs
      setMDs(data);
    } catch (err) {
      setError(err?.response?.data?.message || `Failed to ${action} MD`);
    } finally {
      setLoading(false);
    }
  };

  return { mds, loading, error, changeMDStatus };
};

export default useMDs;