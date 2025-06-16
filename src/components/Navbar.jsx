import React from 'react';

const Navbar = ({ setIsProfileOpen, isProfileOpen }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome, MD</h2>
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white">
              <i className="fas fa-user"></i>
            </div>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 cursor-pointer"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 cursor-pointer"
              >
                Change Phone Number
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 cursor-pointer"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
