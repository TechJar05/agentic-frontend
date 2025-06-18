import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setIsProfileOpen, isProfileOpen }) => {
  const [mdName, setMdName] = useState(''); 
  
  useEffect(() => {
    const fetchMDName = async () => {
      try {
        const response = await fetch('/api/md'); 
        const data = await response.json();
        setMdName(data.name); 
      } catch (error) {
        console.error('Error fetching MD name:', error);
      }
    };

    fetchMDName();
  }, []); 

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">{`Welcome, ${mdName || 'MD'}`}</h1> {/* Display MD name */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#00968a] flex items-center justify-center text-white">
              <i className="fas fa-user"></i>
            </div>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 cursor-pointer"
              >
                Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
