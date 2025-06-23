import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eaBot from "../assets/eaBot.png"; // Adjust the path as necessary

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="font-['Inter',sans-serif] text-gray-800 min-h-screen bg-gradient-to-br from-white via-[#f0fdfa] to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md border-b border-gray-200 fixed w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <img src={eaBot} alt="Agentic Logo" className="w-8 h-8 animate-pulse" />
              <h1 className="text-xl font-bold text-[#00968a] tracking-wide">AGENTIC</h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About", "Contact"].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-600 hover:text-[#00968a] hover:underline underline-offset-4 transition-all"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => navigate("/register")}
                className="bg-[#00968a] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#007f75] hover:scale-105 transition-transform"
              >
                Get Started
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-[#00968a]"
              >
                <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`} />
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              {["Home", "About", "Contact"].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-gray-600 hover:text-[#00968a] transition"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => navigate("/register")}
                className="w-full mt-2 bg-[#00968a] text-white px-6 py-2 rounded-md shadow hover:bg-[#007f75]"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 animate-fade">
            <h1 className="text-5xl font-extrabold text-[#00968a] mb-4">Agentic</h1>
            <p className="text-2xl text-gray-600 mb-6">
              Empowering Task Management for Smart Teams
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Streamline your workflow, boost productivity, and take control of
              your team's performance with our intuitive dashboard solution.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-[#00968a] text-white px-8 py-3 rounded-md shadow-md hover:bg-[#007f75] transform hover:scale-105 transition"
            >
              Get Started
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/business-dashboard-5743045-4802239.png"
              alt="dashboard"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Why Choose Agentic</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dashboard provides everything you need to manage your team and enhance performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "fa-tasks",
                title: "Task Management",
                desc: "Create, assign, and track tasks. Set priorities and deadlines easily.",
              },
              {
                icon: "fa-user-shield",
                title: "Employee Oversight",
                desc: "Track time, monitor performance and manage resources efficiently.",
              },
              {
                icon: "fa-chart-line",
                title: "Real-time Logs",
                desc: "Get instant activity logs and progress updates across the platform.",
              },
              {
                icon: "fa-lock",
                title: "Secure Controls",
                desc: "Advanced permission settings with secure admin access controls.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-xl p-6 hover:scale-105 transform transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-[#00968a]/10 rounded-full flex items-center justify-center mb-4">
                  <i className={`fas ${feature.icon} text-[#00968a] text-xl`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
