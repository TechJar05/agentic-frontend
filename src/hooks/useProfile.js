import { useState, useEffect } from 'react';
import profileService from '../services/profileService';  // Import profileService to interact with the API

const useProfile = () => {
  const [profile, setProfile] = useState(null);  // Store MD profile data
  const [loading, setLoading] = useState(true);  // Loading state for API call
  const [error, setError] = useState(null);  // Error state for API call

  // Fetch profile data when the component mounts
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.fetchProfile();  // Fetch the MD's profile
        setProfile(data);  // Set the profile data (MD's name and phone number)
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);  // Only run on mount

  // Update MD's phone number
  const updatePhoneNumber = async (phoneNumber) => {
    try {
      const updatedProfile = await profileService.updatePhoneNumber(phoneNumber);
      setProfile(updatedProfile);  // Update profile with the new phone number
    } catch {
      setError('Failed to update phone number');
    }
  };

  return {
    profile,
    loading,
    error,
    updatePhoneNumber,
  };
};

export default useProfile;
