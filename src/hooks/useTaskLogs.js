import { useState, useEffect } from 'react';
import taskService from '../services/taskService';

const useTaskLogs = () => {
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
        const data = await taskService.fetchTasks(searchQuery, statusFilter, priorityFilter, approvalFilter);
        setTasks(data);  // Set tasks data
      } catch  {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasksData();
  }, [searchQuery, statusFilter, priorityFilter, approvalFilter]);  // Re-fetch when filters change

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
