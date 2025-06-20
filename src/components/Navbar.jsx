// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = ({ setIsProfileOpen, isProfileOpen }) => {
//   const [mdName, setMdName] = useState(''); 
  
//   useEffect(() => {
//     const fetchMDName = async () => {
//       try {
//         const response = await fetch('/api/md'); 
//         const data = await response.json();
//         setMdName(data.name); 
//       } catch (error) {
//         console.error('Error fetching MD name:', error);
//       }
//     };

//     fetchMDName();
//   }, []); 

//   return (
//     <header className="bg-white shadow-sm z-10">
//       <div className="flex items-center justify-between px-6 py-4">
//         <h1 className="text-2xl font-semibold text-gray-800">{`Welcome, ${mdName || 'MD'}`}</h1> {/* Display MD name */}
//         <div className="relative">
//           <button
//             onClick={() => setIsProfileOpen(!isProfileOpen)}
//             className="flex items-center focus:outline-none cursor-pointer"
//           >
//             <div className="w-10 h-10 rounded-full bg-[#00968a] flex items-center justify-center text-white">
//               <i className="fas fa-user"></i>
//             </div>
//           </button>
//           {isProfileOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
//               <Link
//                 to="/profile"
//                 className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 cursor-pointer"
//               >
//                 Profile
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { useNav } from "../hooks/useNav";

const Navbar = () => {
  const { mdName, updatePhone, updateStatus, loading } = useNav();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val) || val.length > 10) return;
    setPhone(val);
    setPhoneError("");
  };

  const handleUpdateClick = async () => {
    if (phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }
    await updatePhone(phone);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow">
      <h1 className="text-xl font-semibold">Welcome {mdName}</h1>

      <div className="relative ">
        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="w-10 h-10 rounded-full bg-[#00968a] flex items-center justify-center text-white">
              <i className="fas fa-user"></i>
          </div>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg z-20">
            <button
              onClick={() => {
                setShowCard(true);
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Update Your Phone Number
            </button>
          </div>
        )}
      </div>

      {showCard && (
        <div className="absolute top-16 right-6 w-80 bg-white shadow-lg rounded-lg p-4 z-30">
          <h3 className="text-lg font-semibold mb-2">Update Your Phone Number</h3>
          <input
            type="text"
            placeholder="Enter 10-digit number"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}

          <button
            onClick={handleUpdateClick}
            className="mt-3 w-full bg-[#10a395] text-white px-4 py-2 rounded-md hover:bg-[#0d8a7e]"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>

          {updateStatus && (
            <p className={`mt-2 text-sm ${updateStatus.success ? "text-green-600" : "text-red-500"}`}>
              {updateStatus.message}
            </p>
          )}

          <button
            className="text-xs text-gray-500 mt-3 hover:underline"
            onClick={() => setShowCard(false)}
          >
            Close
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
