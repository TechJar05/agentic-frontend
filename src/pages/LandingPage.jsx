import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import agenticLogo from "../assets/agenticLogo.png";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="font-['Inter',sans-serif] text-gray-800 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
             <div className="p-5  flex items-center space-x-2">
                    <img src={agenticLogo} alt="Agentic Logo" className="w-8 h-8" />
                    <h1 className="text-xl font-bold text-[#00968a]">AGENTIC</h1>
                  </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-[#00968a] transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#00968a] transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#00968a] transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="hidden md:flex items-center">
              <button
                onClick={() => navigate("/register")}
                className="bg-[#00968a] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#007f75] transition-colors"
              >
                Get Started
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-[#00968a]"
              >
                <i
                  className={`fas ${
                    isMenuOpen ? "fa-times" : "fa-bars"
                  } text-xl`}
                />
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-3 space-y-2">
              <a href="#" className="block text-gray-600 hover:text-[#00968a]">
                Home
              </a>
              <a href="#" className="block text-gray-600 hover:text-[#00968a]">
                About
              </a>
              <a href="#" className="block text-gray-600 hover:text-[#00968a]">
                Contact
              </a>
              <button
                onClick={() => navigate("/register")}
                className="w-full mt-2 bg-[#00968a] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#007f75]"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#00968a]/10 to-white">
          <div
            className="absolute inset-0"
            style={{
              // backgroundImage: `url('/src/assets/b8c21059d9352800e36fe30a7461be72.jpg')`,
              backgroundPosition: "right center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              opacity: 0.8,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              <span className="text-[#00968a]">Agentic</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Empowering Task Management for Smart Teams
            </p>
            <p className="text-gray-600 mb-8 max-w-lg">
              Streamline your workflow, boost productivity, and take control of
              your team's performance with our intuitive dashboard solution.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-[#00968a] text-white px-8 py-3 rounded-md shadow-md hover:bg-[#007f75] transition-all transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Agentic
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive dashboard provides everything you need to manage
              your team effectively and boost productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transform hover:scale-105 transition duration-300">
              <div className="w-12 h-12 bg-[#00968a]/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-tasks text-[#00968a] text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-gray-600">
                Create, assign, and track tasks with ease. Set priorities and
                deadlines to keep your team on schedule.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transform hover:scale-105 transition duration-300">
              <div className="w-12 h-12 bg-[#00968a]/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-user-shield text-[#00968a] text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Employee Oversight</h3>
              <p className="text-gray-600">
                Monitor performance, track time, and manage resources
                efficiently with comprehensive analytics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transform hover:scale-105 transition duration-300">
              <div className="w-12 h-12 bg-[#00968a]/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-chart-line text-[#00968a] text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Logs</h3>
              <p className="text-gray-600">
                Get instant updates and activity logs to stay informed about
                your team's progress in real-time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transform hover:scale-105 transition duration-300">
              <div className="w-12 h-12 bg-[#00968a]/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-lock text-[#00968a] text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Secure Admin Controls
              </h3>
              <p className="text-gray-600">
                Advanced permission settings and secure access controls to
                protect your sensitive data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
