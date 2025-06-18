import React, { useState } from "react";
import agenticLogo from "../assets/agenticLogo.png";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const { register, loading } = useRegister();

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
    const newErrors = {
      username: "",
      password: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords do not match";
    }

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      // console.log("Form submission failed due to errors:");

      return;
    }
    console.log("Form submitted:", formData);

    const response = await register(formData.username, formData.password);

    console.log("Response from handleRegister:", response);

    if (response.status >= 300) {
      console.log("Registration failed:", response.data);
      alert("Registration failed: " + response.data.message);
      return;
    }

    alert("Success, " + response.data.message);
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

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md p-8 w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Create New Account
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
                  required
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

            {/* Confirm Password Field */}
            <div className="mb-6">
              <div
                className={`flex items-center border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 focus-within:border-[#10a395] transition-colors`}
              >
                <i className="fas fa-lock text-gray-400 text-lg"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                  className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
                  value={formData.confirmPassword}
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#10a395] text-white rounded-md hover:bg-[#0d8a7e] transition-colors font-medium !rounded-button whitespace-nowrap cursor-pointer"
            >
              {loading ? "Loading..." : "Register"}
            </button>

            <div className="flex justify-start">
              <div
                className="text-sm hover:text-[#0d8a7e]
              text-[#10a395]
             hover:cursor-pointer hover:underline mt-6 flex gap-1 justify-end w-fit"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <ArrowLeftCircle size={20} className="" />
                <p className="font-medium ">Log In</p>
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
export default RegisterPage;
