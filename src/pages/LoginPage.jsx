import React, { useState } from "react";
import agenticLogo from "../assets/agenticLogo.png";
import { ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const { login, loading } = useLogin();

  const handleRoleToggle = (role) => {
    setActiveRole(role);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validation checks
    const newErrors = {
      username: "",
      password: "",
    };
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);

    if (newErrors.username && newErrors.password) {
      return;
    }
    // Submit form logic
    // console.log("Form submitted:", formData);

    const response = await login({ ...formData, role: activeRole });

    if (response.status >= 300) {
      // console.log("Error in handleSubmit");
      alert(response.data.message);
      return;
    }

    // console.log("From handleSubmit", response);
    alert("Success");
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8 gap-[2%] cursor-pointer hover:scale-105 transition-transform duration-300">
          <img src={agenticLogo} alt="Agentic Logo" className="w-14 h-14" />
          <div className="text-3xl flex items-center font-bold text-gray-800 ">
            <p>AGENTIC</p>
          </div>
        </div>
        {/* Role Toggle */}
        <div className="flex justify-center mb-8">
          <div className="relative bg-gray-100 rounded-full w-[280px] h-12 flex items-center">
            <div
              className={
                "absolute top-1 bottom-1 w-[136px] bg-[#10a395] rounded-full transition-all duration-900 ease-in-out " +
                  activeRole ===
                "admin"
                  ? "left-1"
                  : "left-[142px]"
              }
            ></div>
            <button
              onClick={() => handleRoleToggle("admin")}
              className={`z-10 flex-1 h-full flex items-center justify-center rounded-l-full text-sm font-medium transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer ${
                activeRole === "admin"
                  ? "text-white bg-teal-600"
                  : "text-gray-600"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => handleRoleToggle("md")}
              className={`z-10 flex-1 h-full flex items-center justify-center rounded-r-full text-sm font-medium transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer ${
                activeRole === "md" ? "text-white bg-teal-600" : "text-gray-600"
              }`}
            >
              MD
            </button>
          </div>
        </div>
        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md p-8 w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {activeRole === "admin" ? "Admin Login" : "MD Login"}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Username/Email Field */}
            <div className="mb-5">
              <div
                className={`flex items-center border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 focus-within:border-[#10a395] transition-colors`}
              >
                <i className="fas fa-user text-gray-400 text-lg"></i>
                <input
                  type="email"
                  required={true}
                  name="username"
                  placeholder="Email"
                  className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-xs mt-1 flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.username}
                </p>
              )}
            </div>
            {/* Password Field */}
            <div className="mb-6">
              <div
                className={`flex items-center border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 focus-within:border-[#10a395] transition-colors`}
              >
                <i className="fas fa-lock text-gray-400 text-lg"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1 flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.password}
                </p>
              )}
            </div>
            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-end mb-6">
              {/*<div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-[#10a395] border-gray-300 rounded focus:ring-[#10a395]"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                  Remember Me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-[#10a395] hover:underline cursor-pointer"
              >
                Forgot Password?
              </a>
              */}
            </div>
            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#10a395] text-white rounded-md hover:bg-[#0d8a7e] transition-colors font-medium !rounded-button whitespace-nowrap cursor-pointer"
            >
              {loading ? "Loading..." : "Log In"}
            </button>

            <div className="flex justify-end">
              <div
                className="text-sm hover:text-[#0d8a7e]
              text-[#10a395]
             hover:cursor-pointer hover:underline mt-6 flex gap-1 justify-end w-fit"
                onClick={() => {
                  navigate("/register");
                }}
              >
                <p className="font-medium ">Register Now</p>
                <ArrowRightCircle size={20} className="" />
              </div>
            </div>
          </form>
        </div>
        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          {/* <p>© {new Date().getFullYear()} AGENTIC. All rights reserved.</p> */}
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
