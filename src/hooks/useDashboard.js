import { useState } from "react";
import { fetchDashboardData } from "../services/dashboardService";
import { useAuth } from "../context/authContext";

const useDashboard = () => {
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth(); // ✅ Get MD details from context

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetchDashboardData(user?.id, token); // ✅ use user.id
      return response;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loadDashboardData,
    loading,
  };
};

export default useDashboard;
