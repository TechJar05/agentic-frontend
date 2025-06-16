import { useState, useEffect } from 'react';

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating an API call with a mock response
        setTimeout(() => {
          setDashboardData({
            totalEmployees: 5,
            tasksAssigned: 12,
            tasksInProgress: 3,
            tasksPendingApproval: 2,
            tasksCompleted:4,
            taskCompletionRate: [90, 80, 85, 70, 75, 95, 80],
          });
          setLoading(false);
        }, 1000);
      } catch  {
        setError('Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { dashboardData, loading, error };
};
