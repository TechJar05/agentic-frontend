import { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import { useAuth } from '../context/authContext';

const useTaskLogs = () => {
  const { user } = useAuth();
  const mdId = user?.id;
  const token = user?.token;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [approvalFilter, setApprovalFilter] = useState('all');

  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        if (!mdId || !token) return;
        const data = await taskService.fetchTasks(mdId, token);
        setTasks(data?.taskLogs || []);
      } catch {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasksData();
  }, [mdId, token]);

  return {
    tasks,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    approvalFilter,
    setApprovalFilter,
  };
};

export default useTaskLogs;
