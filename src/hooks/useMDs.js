import { useState, useEffect } from "react";
import { fetchMDs, rejectMD } from "../services/mdService";
import { useAuth } from "../context/authContext";

const useMDs = (adminId) => {
  const { user } = useAuth(); // 🔐 Grab token from context
  const token = user?.token;

  const [mds, setMds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMDs = async () => {
      try {
        const data = await fetchMDs(adminId, token);
        console.log("Fetching MDs with:", { adminId, token }); // Pass token
        setMds(data);
        setLoading(false);
      } catch {
        setError("Failed to fetch MDs");
        setLoading(false);
      }
    };

    if (adminId && token) getMDs();
  }, [adminId, token]);

  const changeMDStatus = async (id, status) => {
    try {
      if (status === "rejected") {
        await rejectMD(id, token); // Pass token
      }
      setMds((prev) =>
        prev.map((md) => (md.id === id ? { ...md, status } : md))
      );
    } catch {
      setError("Failed to update MD status");
    }
  };

  return { mds, loading, error, changeMDStatus };
};

export default useMDs;
