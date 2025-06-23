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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePhoneNumber } from "../services/navService";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { mdName, loading } = useNav();
  const { token, setUser, user } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val) || val.length > 10) return;
    setPhone(val);
    setFormError("");
  };

  const handleUpdateClick = async () => {
    if (!name.trim() && phone.length !== 10) {
      setFormError("Please update either name or phone number.");
      return;
    }

    const payload = {
      name: name.trim() || "",
      phone_number: phone.length === 10 ? `91${phone}` : "",
    };

    try {
      const res = await updatePhoneNumber(payload, token);

      if (res?.data?.message) {
        // Update local context
        if (name.trim()) {
          setUser((prev) => ({ ...prev, name: name.trim() }));
        }

        if (name && phone) {
          toast.success("Name and Phone updated successfully.");
        } else if (name) {
          toast.success("Name updated successfully.");
        } else {
          toast.success("Phone number updated successfully.");
        }

        setShowCard(false);
        setPhone("");
        setName("");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  return (
    <>
      <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3 bg-white shadow gap-2 sm:gap-0">
        <h1 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
          Welcome, {mdName}
        </h1>

        <div className="relative self-end sm:self-auto">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="w-10 h-10 rounded-full bg-[#00968a] flex items-center justify-center text-white">
              <i className="fas fa-user"></i>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20">
              <button
                onClick={() => {
                  setShowCard(true);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Update Your Profile
              </button>
            </div>
          )}
        </div>

        {showCard && (
          <div className="absolute top-16 right-6 w-80 bg-white shadow-lg rounded-lg p-4 z-30">
            <h3 className="text-lg font-semibold mb-3">Update Your Profile</h3>

            <input
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFormError("");
              }}
              className="w-full border border-gray-300 rounded-md p-2 text-sm mb-3"
            />

            <input
              type="text"
              placeholder="10-digit Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            />

            {formError && (
              <p className="text-red-500 text-sm mt-2">{formError}</p>
            )}

            <button
              onClick={handleUpdateClick}
              className="mt-3 w-full bg-[#10a395] text-white px-4 py-2 rounded-md hover:bg-[#0d8a7e]"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              className="text-xs text-gray-500 mt-3 hover:underline"
              onClick={() => {
                setShowCard(false);
                setFormError("");
              }}
            >
              Close
            </button>
          </div>
        )}
      </nav>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Navbar;
