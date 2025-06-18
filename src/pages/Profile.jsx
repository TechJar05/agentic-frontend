// import React, { useState } from 'react';

// const Profile = () => {
//   const [name] = useState('MD Name'); 
//   const [phone, setPhone] = useState(''); 
//   const [isEditing, setIsEditing] = useState(false); 
//   const [phoneError, setPhoneError] = useState(''); 

//   const handlePhoneChange = (e) => {
//     const value = e.target.value;
    
//     // Only allow numbers and ensure it's 10 digits
//     if (/[^0-9]/.test(value)) {
//       setPhoneError('Only numbers are allowed.');
//       return;
//     }
    
//     // Set phone value if it's valid
//     setPhone(value);

//     if (value.length < 10) {
//       setPhoneError('Phone number must be 10 digits.');
//     } else if (value.length === 10) {
//       setPhoneError('');
//     }
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
    
//     // Ensure the phone number is valid
//     if (phone.length === 10 && !phoneError) {
//       setIsEditing(false);
//       alert(`Phone number updated to: ${phone}`);
//     } else {
//       alert('Please enter a valid 10-digit phone number');
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <h2 className="font-bold text-gray-800 mb-4">Profile</h2>
      
//       <div className="mb-6">
//         <p className="font-bold text-gray-600">
//           <strong></strong> {name}
//         </p>
//       </div>
      
//       {/* Phone number section */}
//       <div className="mb-6">
//         <div className="flex items-center">
//           <p className=" text-gray-600 mr-4">
//             <strong>Actions:</strong>
//           </p>

//           {/* Phone number edit section */}
//           {isEditing ? (
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={handlePhoneChange}
//                 className="border border-gray-300 p-2 rounded-lg"
//                 placeholder="Enter phone number"
//                 maxLength="10"  
//                 required
//               />
//               {phoneError && (
//                 <span className="text-red-500 text-sm ml-2">{phoneError}</span>
//               )}
//               <button
//                 onClick={handleSave}
//                 className="ml-4 bg-[#00968a] text-white px-4 py-2 rounded-lg hover:bg-[#007870]"
//               >
//                 Update
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="ml-2 bg-[#00968a]  text-white px-2 py-2 rounded-lg hover:bg-[#007870]"
//             >
//               Update Phone Number
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from 'react';
import useProfile from '../hooks/useProfile';  // Import the custom hook

const Profile = () => {
  const { profile, loading, error, updatePhoneNumber } = useProfile();  // Use the custom hook for fetching profile
  const [phone, setPhone] = useState(profile ? profile.phone : '');  // Initialize phone state from profile
  const [isEditing, setIsEditing] = useState(false);  // Manage edit mode for phone number
  const [phoneError, setPhoneError] = useState('');  // Phone error validation message

  // Handle phone number input change
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    
    // Only allow numbers and ensure it's 10 digits
    if (/[^0-9]/.test(value)) {
      setPhoneError('Only numbers are allowed.');
      return;
    }
    
    // Set phone value if it's valid
    setPhone(value);

    if (value.length < 10) {
      setPhoneError('Phone number must be 10 digits.');
    } else if (value.length === 10) {
      setPhoneError('');
    }
  };

  // Save the updated phone number
  const handleSave = (e) => {
    e.preventDefault();
    
    // Ensure the phone number is valid
    if (phone.length === 10 && !phoneError) {
      updatePhoneNumber(phone);  // Call updatePhoneNumber from the hook
      setIsEditing(false);
      alert(`Phone number updated to: ${phone}`);
    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="font-bold text-gray-800 mb-4">Profile</h2>
      
      <div className="mb-6">
        <p className="font-bold text-gray-600">
          <strong>Name: </strong> {profile.name}  {/* Display MD name */}
        </p>
      </div>
      
      {/* Phone number section */}
      <div className="mb-6">
        <div className="flex items-center">
          <p className="text-gray-600 mr-4">
            <strong>Actions:</strong>
          </p>

          {/* Phone number edit section */}
          {isEditing ? (
            <div className="flex items-center">
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                className="border border-gray-300 p-2 rounded-lg"
                placeholder="Enter phone number"
                maxLength="10"  
                required
              />
              {phoneError && (
                <span className="text-red-500 text-sm ml-2">{phoneError}</span>
              )}
              <button
                onClick={handleSave}
                className="ml-4 bg-[#00968a] text-white px-4 py-2 rounded-lg hover:bg-[#007870]"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="ml-2 bg-[#00968a] text-white px-2 py-2 rounded-lg hover:bg-[#007870]"
            >
              Update Phone Number
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
