import React, { useState, useRef } from "react";
import eaBot from "../assets/eaBot.png";
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

  const handleRoleToggle = (role) => setActiveRole(role);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { username: "", password: "" };

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (newErrors.username) return usernameRef.current?.focus();
    if (newErrors.password) return passwordRef.current?.focus();

    const response = await login({
      email: formData.username,
      password: formData.password,
      role: activeRole,
    });

    if (response.status >= 400) {
      let msg = response.data.message || "Login failed";
      if (response.status === 401 || response.status === 404)
        msg = "Invalid credentials";
      toast.error(msg);
      return;
    }

    toast.success("Login successful!");
    setFormData({ username: "", password: "" });

    setTimeout(() => {
      navigate(
        activeRole === "admin" ? "/admin-dashboard" : "/md-dashboard"
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6fdf8] via-white to-[#e8fdfb] flex items-center justify-center px-4 ">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md animate-fade-in-down">
        {/* Logo */}
        <div className="flex justify-center mb-8 gap-2 hover:scale-105 transition-transform cursor-pointer ">
          <img src={eaBot} alt="Agentic Logo" className="w-14 h-14" />
          <div className="text-3xl font-bold text-gray-800 flex items-center">EA BOT</div>
        </div>

        {/* Role Toggle */}
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

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl p-8 w-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,163,149,0.4)]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {activeRole === "admin" ? "Admin Login" : "MD Login"}
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-5">
              <div
                className={`flex items-center border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 focus-within:border-[#10a395] bg-white transition-colors`}
              >
                <i className="fas fa-user text-gray-400 text-lg"></i>
                <input
                  ref={usernameRef}
                  name="username"
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm bg-transparent"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <div
                className={`flex items-center border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 focus-within:border-[#10a395] bg-white transition-colors`}
              >
                <i className="fas fa-lock text-gray-400 text-lg"></i>
                <input
                  ref={passwordRef}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm bg-transparent"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 ml-2"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#10a395] text-white rounded-lg hover:bg-[#0d8a7e] transition duration-300 font-medium"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            {/* Switch to Register */}
            <div className="flex flex-col items-center mt-6">
              <p className="text-sm text-gray-700 mb-1">
                Don’t have an account yet?
              </p>
              <div
                onClick={() => navigate("/register")}
                className="text-sm text-[#10a395] flex gap-1 items-center cursor-pointer hover:underline"
              >
                <p className="font-medium">Register Now</p>
                <ArrowRightCircle size={20} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
