// import React, { useState } from "react";
// import { useNav } from "../hooks/useNav";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { updatePhoneNumber } from "../services/navService";
// import { useAuth } from "../context/authContext";

// const Navbar = () => {
//   const { mdName, loading } = useNav();
//   const { token, setUser, user } = useAuth();

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showCard, setShowCard] = useState(false);
//   const [phone, setPhone] = useState("");
//   const [name, setName] = useState("");
//   const [formError, setFormError] = useState("");

//   const handlePhoneChange = (e) => {
//     const val = e.target.value;
//     if (!/^\d*$/.test(val) || val.length > 10) return;
//     setPhone(val);
//     setFormError("");
//   };

//   const handleUpdateClick = async () => {
//     if (!name.trim() && phone.length !== 10) {
//       setFormError("Please update either name or phone number.");
//       return;
//     }

//     const payload = {
//       name: name.trim() || "",
//       phone_number: phone.length === 10 ? `91${phone}` : "",
//     };

//     try {
//       const res = await updatePhoneNumber(payload, token);

//       if (res?.data?.message) {
//         // Update local context
//         if (name.trim()) {
//           setUser((prev) => ({ ...prev, name: name.trim() }));
//         }

//         if (name && phone) {
//           toast.success("Name and Phone updated successfully.");
//         } else if (name) {
//           toast.success("Name updated successfully.");
//         } else {
//           toast.success("Phone number updated successfully.");
//         }

//         setShowCard(false);
//         setPhone("");
//         setName("");
//       } else {
//         toast.error("Something went wrong.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Update failed.");
//     }
//   };

//   return (
//     <>
//       <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3 bg-white shadow gap-2 sm:gap-0">
//         <h1 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
//           Welcome, {mdName}
//         </h1>

//         <div className="relative self-end sm:self-auto">
//           <button onClick={() => setDropdownOpen(!dropdownOpen)}>
//             <div className="w-10 h-10 rounded-full bg-[#00968a] flex items-center justify-center text-white">
//               <i className="fas fa-user"></i>
//             </div>
//           </button>

//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20">
//               <button
//                 onClick={() => {
//                   setShowCard(true);
//                   setDropdownOpen(false);
//                 }}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
//               >
//                 Update Your Profile
//               </button>
//             </div>
//           )}
//         </div>

//         {showCard && (
//           <div className="absolute top-16 right-6 w-80 bg-white shadow-lg rounded-lg p-4 z-30">
//             <h3 className="text-lg font-semibold mb-3">Update Your Profile</h3>

//             <input
//               type="text"
//               placeholder="First Name"
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//                 setFormError("");
//               }}
//               className="w-full border border-gray-300 rounded-md p-2 text-sm mb-3"
//             />

//             <input
//               type="text"
//               placeholder="10-digit Phone Number"
//               value={phone}
//               onChange={handlePhoneChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-sm"
//             />

//             {formError && (
//               <p className="text-red-500 text-sm mt-2">{formError}</p>
//             )}

//             <button
//               onClick={handleUpdateClick}
//               className="mt-3 w-full bg-[#10a395] text-white px-4 py-2 rounded-md hover:bg-[#0d8a7e]"
//               disabled={loading}
//             >
//               {loading ? "Updating..." : "Update"}
//             </button>

//             <button
//               className="text-xs text-gray-500 mt-3 hover:underline"
//               onClick={() => {
//                 setShowCard(false);
//                 setFormError("");
//               }}
//             >
//               Close
//             </button>
//           </div>
//         )}
//       </nav>

//       <ToastContainer position="top-center" autoClose={3000} />
//     </>
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
  const { token, setUser } = useAuth();

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
      <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3 bg-white shadow-md border-b border-gray-200 gap-2 sm:gap-0 transition-all duration-300">
        <h1 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
          Welcome, {mdName}
        </h1>

        <div className="relative self-end sm:self-auto">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="transition-transform duration-200 transform hover:scale-105"
          >
            <div className="w-10 h-10 rounded-full bg-[#00968a] flex items-center justify-center text-white border border-white shadow-md">
              <i className="fas fa-user"></i>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-20 animate-fade-in-down">
              <button
                onClick={() => {
                  setShowCard(true);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition duration-200"
              >
                Update Your Profile
              </button>
            </div>
          )}
        </div>

        {showCard && (
          <div className="absolute top-16 right-6 w-80 bg-white shadow-2xl border border-gray-300 rounded-lg p-4 z-30 animate-fade-in-down">
            <h3 className="text-lg font-semibold mb-3">Update Your Profile</h3>

            <input
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFormError("");
              }}
              className="w-full border border-gray-300 rounded-md p-2 text-sm mb-3 focus:ring-2 focus:ring-[#00968a] outline-none"
            />

            <input
              type="text"
              placeholder="10-digit Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-[#00968a] outline-none"
            />

            {formError && (
              <p className="text-red-500 text-sm mt-2">{formError}</p>
            )}

            <button
              onClick={handleUpdateClick}
              className="mt-3 w-full bg-[#10a395] text-white px-4 py-2 rounded-md hover:bg-[#0d8a7e] transition duration-200"
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

      {/* Animations */}
      <style>{`
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }

        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
