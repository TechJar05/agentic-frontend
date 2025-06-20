import { useState, useEffect } from "react";
import { fetchMDName, updatePhoneNumber } from "../services/navService";
import { useAuth } from "../context/authContext";

export const useNav = () => {
  const { token, user } = useAuth();
  const [mdName, setMdName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    const loadMD = async () => {
      try {
        const response = await fetchMDName(token);
        setMdName(response.data.name);
      } catch (err) {
        console.error("Failed to fetch MD name", err);
      }
    };

    // optional: call only if mdName is not already from context
    if (!user?.name) {
      loadMD();
    }
  }, [token, user?.name]);

  const updatePhone = async (phoneNumber) => {
    setLoading(true);
    setUpdateStatus(null);
    try {
      const res = await updatePhoneNumber(phoneNumber, token);
      setUpdateStatus({ success: true, message: res.data.message });
    } catch (err) {
      setUpdateStatus({
        success: false,
        message: err?.response?.data?.message || "Failed to update",
      });
    } finally {
      setLoading(false);
    }
  };

  return { mdName, loading, updateStatus, updatePhone };
};
