import React, { useState, useRef } from "react";
import agenticLogo from "../assets/agenticLogo.png";
import { ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

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
    const newErrors = { username: "", password: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (newErrors.username) {
      usernameRef.current?.focus();
      return;
    }
    if (newErrors.password) {
      passwordRef.current?.focus();
      return;
    }

    const response = await login({
      email: formData.username,
      password: formData.password,
      role: activeRole,
    });

    if (response.status >= 400) {
      let msg = response.data.message || "Login failed";

      // 🔁 Custom message override
      if (response.status === 401 || response.status === 404) {
        msg = "Invalid credentials";
      }

      toast.error(msg);

      if (msg.toLowerCase().includes("email")) {
        usernameRef.current?.focus();
      } else if (msg.toLowerCase().includes("password")) {
        passwordRef.current?.focus();
      }

      return;
    }

    toast.success("Login successful!");
    setFormData({ username: "", password: "" });

    setTimeout(() => {
      if (activeRole === "admin") navigate("/admin-dashboard");
      else if (activeRole === "md") navigate("/md-dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8 gap-[2%] cursor-pointer hover:scale-105 transition-transform duration-300">
          <img src={agenticLogo} alt="Agentic Logo" className="w-14 h-14" />
          <div className="text-3xl flex items-center font-bold text-gray-800 ">
            <p>AGENTIC</p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative bg-gray-100 rounded-full w-[280px] h-12 flex items-center">
            <div
              className={
                "absolute top-1 bottom-1 w-[136px] bg-[#10a395] rounded-full transition-all duration-900 ease-in-out " +
                (activeRole === "admin" ? "left-1" : "left-[142px]")
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

        <div className="bg-white rounded-lg shadow-md p-8 w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {activeRole === "admin" ? "Admin Login" : "MD Login"}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-5">
              <div
                className={`flex items-center border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 focus-within:border-[#10a395] transition-colors`}
              >
                <i className="fas fa-user text-gray-400 text-lg"></i>
                <input
                  type="email"
                  name="username"
                  ref={usernameRef}
                  required
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

            {/* Password */}
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
                  ref={passwordRef}
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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#10a395] text-white rounded-md hover:bg-[#0d8a7e] transition-colors font-medium !rounded-button whitespace-nowrap cursor-pointer"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="flex justify-center">
              <div className="flex flex-col items-center mt-6">
                <p className="text-sm text-gray-700 mb-1">
                  Don't have an account yet?
                </p>
                <div
                  className="text-sm hover:text-[#0d8a7e] text-[#10a395] hover:cursor-pointer hover:underline flex gap-1 items-center justify-center"
                  onClick={() => navigate("/register")}
                >
                  <p className="font-medium">Register Now</p>
                  <ArrowRightCircle size={20} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
