import { useState, useEffect } from 'react';
import dashboardService from '../services/dashboardService';

const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await dashboardService.fetchDashboardData();  // Get the data from the service
        setDashboardData(data);  // Set the dashboard data
      } catch {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);  // Set loading to false once the data is fetched
      }
    };

    loadDashboardData();
  }, []);

  return {
    dashboardData,
    loading,
    error,
  };
};

export default useDashboard;
