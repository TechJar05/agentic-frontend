import axios from 'axios';

// Fetch MD profile data from the backend
const fetchProfile = async () => {
  try {
    const response = await axios.get('/api/profile');  // Use the API URL from the environment
    return response.data;  // Return the profile data (MD's name and phone number)
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;  // Propagate the error to be handled in the hook
  }
};

// Update MD phone number
const updatePhoneNumber = async (phoneNumber) => {
  try {
    const response = await axios.post('/api/profile/phone', { phoneNumber });  // API endpoint for updating phone number
    return response.data;  // Return the updated profile data
  } catch (error) {
    console.error('Error updating phone number:', error);
    throw error;
  }
};

export default {
  fetchProfile,
  updatePhoneNumber,
};
