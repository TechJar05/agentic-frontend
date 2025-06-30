import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import eaBot from "../assets/eaBot.png";
import heroImage from "../assets/2.png";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const features = [
    {
      icon: "fa-tasks",
      title: "Task Management",
      desc: "Create, assign and track tasks with ease.",
    },
    {
      icon: "fa-chart-line",
      title: "Progress Dashboard",
      desc: "Visualize team performance in real-time.",
    },
    {
      icon: "fa-user-shield",
      title: "Secure Access",
      desc: "Advanced control over user permissions.",
    },
    {
      icon: "fa-lock",
      title: "Data Protection",
      desc: "Enterprise-grade security for your data.",
    },
  ];

  return (
    <div className="font-['Inter',sans-serif] text-gray-800 min-h-screen bg-gradient-to-br from-white via-[#f0fdfa] to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md border-b border-gray-200 fixed w-full z-20 font-semibold tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <img src={eaBot} alt="EA BOT Logo" className="w-10 h-10 animate" />
              <h1 className="text-2xl font-extrabold text-black">EA BOT</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm">
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
                className="bg-[#00968a] text-white px-5 py-2 rounded-md shadow hover:bg-[#007f75] hover:scale-105 transition-transform"
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
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6 md:gap-4">
          <div className="md:w-6/12 space-y-3 text-gray-700" data-aos="fade-right">
            {["Empowering", "Task", "Management", "For Smart", "Teams"].map((line, i) => (
              <h1
                key={i}
                className="text-5xl leading-tight font-extrabold tracking-tight max-w-xs"
              >
                {line}
              </h1>
            ))}
            <p className="text-gray-600 mt-6 leading-relaxed max-w-sm">
              Streamline your workflow, boost productivity, and take control of your team's performance with our intuitive dashboard solution.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="mt-4 bg-[#00968a] text-white px-8 py-3 rounded-md shadow-md hover:bg-[#007f75] transform hover:scale-105 transition"
            >
              Get Started
            </button>
          </div>
          <div className="md:w-6/12" data-aos="fade-left">
            <img
              src={heroImage}
              alt="dashboard"
              className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Why Use EA BOT Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="zoom-in-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Why use EA BOT</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dashboard provides everything you need to manage your team and enhance performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-2xl p-6 hover:scale-105 transform transition-transform duration-300"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
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
