import React, { useState } from "react";
import { useNav } from "../hooks/useNav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePhoneNumber } from "../services/navService";
import { useAuth } from "../context/authContext";
import { X } from "lucide-react";

const Navbar = () => {
  const { mdName, loading } = useNav();
  const { token, setUser } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    if (name.trim()) {
      setUser((prev) => {
        const updatedUser = { ...prev, name: name.trim() };
        localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ persist updated name
        return updatedUser;
      });
    }

    const payload = {
      name: name.trim() || "",
      phone_number: phone.length === 10 ? `91${phone}` : "",
    };

   try {
  const res = await updatePhoneNumber(payload, token);
  if (res?.data?.message) {
    setUser((prev) => {
      const updatedUser = {
        ...prev,
        ...(name.trim() && { name: name.trim() }),
        ...(phone.length === 10 && { phoneNumber: "91" + phone }),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Persist update
      return updatedUser;
    });

    if (name && phone)
      toast.success("Name and Phone updated successfully.");
    else if (name)
      toast.success("Name updated successfully.");
    else
      toast.success("Phone number updated successfully.");

    setShowModal(false);
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
      <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3 bg-white/60 backdrop-blur-md border-b border-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] z-10 relative">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          Welcome, <span className="text-[#10a395]">{mdName}</span>
        </h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 rounded-full bg-[#10a395] flex items-center justify-center cursor-pointer text-white border border-white shadow-md hover:shadow-[0_0_10px_rgba(16,163,149,0.5)] transition duration-200"
          >
            <i className="fas fa-user text-sm"></i>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56  bg-white/80 backdrop-blur-xl text-gray-800 rounded-lg border border-gray-200 shadow-xl animate-fade-in-down z-20">
              <button
                onClick={() => {
                  setShowModal(true);
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-sm text-left cursor-pointer hover:bg-gray-100 transition"
              >
                Update Your Profile
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Profile Update Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => {
            setShowModal(false);
            setFormError("");
          }}
        >
          <div
            className="bg-white p-6 rounded-xl w-full max-w-md mx-4 shadow-2xl relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
              onClick={() => {
                setShowModal(false);
                setFormError("");
              }}
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Update Your Profile
            </h3>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFormError("");
              }}
              className="w-full border border-gray-300 rounded-md p-2 text-sm mb-3 focus:ring-2 focus:ring-[#10a395] outline-none"
            />

            <input
              type="text"
              placeholder="10-digit Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-[#10a395] outline-none"
            />

            {formError && (
              <p className="text-red-500 text-sm mt-2">{formError}</p>
            )}

            <button
              onClick={handleUpdateClick}
              className="mt-4 w-full bg-[#10a395] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[#0d8a7e] transition duration-200"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />

      {/* Animations */}
      <style>{`
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
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

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
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
