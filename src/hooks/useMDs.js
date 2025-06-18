import { useState, useEffect } from 'react';
import { fetchMDs, updateMDStatus } from '../services/mdService'; // Import service functions

const useMDs = () => {
  const [mds, setMds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch MDs list on component mount
  useEffect(() => {
    const getMDs = async () => {
      try {
        const data = await fetchMDs(); // Fetch MDs using the service
        setMds(data);
        setLoading(false);
      } catch  {
        setError('Failed to fetch MDs');
        setLoading(false);
      }
    };

    getMDs();
  }, []);

  // Update MD status (approve/reject)
  const changeMDStatus = async (id, status) => {
    try {
      const updatedMD = await updateMDStatus(id, status);
      setMds((prevMds) =>
        prevMds.map((md) => (md.id === id ? { ...md, status: updatedMD.status } : md))
      );
    } catch  {
      setError('Failed to update MD status');
    }
  };

  return { mds, loading, error, changeMDStatus };
};

export default useMDs;
