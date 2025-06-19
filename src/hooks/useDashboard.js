import { useState, useEffect } from "react";
import { fetchDashboardData } from "../services/dashboardService";

const useDashboard = () => {
  // const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetchDashboardData(); // Get the data from the service

      return response; // Set the dashboard data
    } catch (error) {
      return error;
    } finally {
      setLoading(false); // Set loading to false once the data is fetched
    }
  };

  //   loadDashboardData();
  // }, []);

  return {
    loadDashboardData,
    loading,
  };
};

export default useDashboard;
