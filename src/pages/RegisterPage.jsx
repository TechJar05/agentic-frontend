// import React, { useState } from "react";
// import agenticLogo from "../assets/agenticLogo.png";
// import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useRegister } from "../hooks/useRegister";

// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: "",
//   });

//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//     phoneNumber: "",
//   });

//   const { register, loading } = useRegister();

//   const handleInputChange = (e) => {
//     // let { name, value } = e.target;
//     const { name } = e.target;
//     let { value } = e.target;

//     //allow only numeric input for phone number
//     if (name === "phoneNumber") {
//       if (!/^\d*$/.test(value)) {
//         return;
//       }
//       value = value.trim();
//     }

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       });
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {
//       email: "",
//       password: "",
//       phoneNumber: "",
//     };

//     if (!formData.email.trim()) {
//       newErrors.email = "email is required";
//     }

//     if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.password = "Passwords do not match";
//     }

//     //force phone number to be 10 digits and all numeric
//     if (formData.phoneNumber.trim().length !== 10) {
//       newErrors.phoneNumber = "Phone number must be 10 digits";
//     }

//     setErrors(newErrors);

//     if (newErrors.email || newErrors.password || newErrors.phoneNumber) {
//       // console.log("Form submission failed due to errors:");

//       return;
//     }
//     console.log("Form submitted:", formData);

//     const response = await register({ ...formData });

//     console.log("Response from handleRegister:", response);

//     if (response.status >= 300) {
//       console.log("Registration failed:", response.data);
//       alert("Registration failed: " + response.data.message);
//       return;
//     }

//     alert("Success, " + response.data.message);
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="flex justify-center mb-8 gap-[2%] cursor-pointer hover:scale-105 transition-transform duration-300">
//           <img src={agenticLogo} alt="Agentic Logo" className="w-14 h-14" />
//           <div className="text-3xl flex items-center font-bold text-gray-800 ">
//             <p>AGENTIC</p>
//           </div>
//         </div>

//         {/* Form Container */}
//         <div className="bg-white rounded-lg shadow-md p-8 w-full">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//             Create New Account
//           </h2>
//           <form onSubmit={handleSubmit}>
//             {/* Name Field */}
//             <div className="mb-5">
//               <div
//                 className={`flex items-center border ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 } rounded-md px-3 focus-within:border-[#10a395] transition-colors`}
//               >
//                 <i className="fas fa-user text-gray-400 text-lg"></i>
//                 <input
//                   type="text"
//                   required
//                   name="name"
//                   placeholder="Name"
//                   className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-600 text-xs mt-1 flex items-center">
//                   <i className="fas fa-exclamation-circle mr-1"></i>
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="mb-5">
//               <div
//                 className={`flex items-center border ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 } rounded-md px-3 focus-within:border-[#10a395] transition-colors`}
//               >
//                 <i className="fas fa-envelope text-gray-400 text-lg"></i>
//                 <input
//                   type="email"
//                   required
//                   name="email"
//                   placeholder="Email"
//                   className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-600 text-xs mt-1 flex items-center">
//                   <i className="fas fa-exclamation-circle mr-1"></i>
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Phone Number */}
//             <div className="mb-6">
//               <div
//                 className={`flex items-center border ${
//                   errors.phoneNumber ? "border-red-500" : "border-gray-300"
//                 } rounded-md px-3 focus-within:border-[#10a395] transition-colors`}
//               >
//                 <i className="fas fa-phone-alt text-gray-400 text-md">(+91)</i>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   required
//                   placeholder="Phone Number"
//                   className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               {errors.phoneNumber && (
//                 <p className="text-red-600 text-xs mt-1 flex items-center">
//                   <i className="fas fa-phone-alt mr-1"></i>
//                   {errors.phoneNumber}
//                 </p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="mb-6">
//               <div
//                 className={`flex items-center border ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 } rounded-md px-3 focus-within:border-[#10a395] transition-colors`}
//               >
//                 <i className="fas fa-lock text-gray-400 text-lg"></i>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   required
//                   placeholder="Password"
//                   className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
//                 >
//                   <i
//                     className={`fas ${
//                       showPassword ? "fa-eye" : "fa-eye-slash"
//                     }`}
//                   ></i>
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-600 text-xs mt-1 flex items-center">
//                   <i className="fas fa-exclamation-circle mr-1"></i>
//                   {errors.password}
//                 </p>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="mb-6">
//               <div
//                 className={`flex items-center border ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 } rounded-md px-3 focus-within:border-[#10a395] transition-colors`}
//               >
//                 <i className="fas fa-lock text-gray-400 text-lg"></i>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   required
//                   placeholder="Confirm Password"
//                   className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
//                 >
//                   <i
//                     className={`fas ${
//                       showPassword ? "fa-eye" : "fa-eye-slash"
//                     }`}
//                   ></i>
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-600 text-xs mt-1 flex items-center">
//                   <i className="fas fa-exclamation-circle mr-1"></i>
//                   {errors.password}
//                 </p>
//               )}
//             </div>

//             {/* Register Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full h-12 bg-[#10a395] text-white rounded-md hover:bg-[#0d8a7e] transition-colors font-medium !rounded-button whitespace-nowrap cursor-pointer"
//             >
//               {loading ? "Loading..." : "Register"}
//             </button>

//             <div className="flex justify-start">
//               <div
//                 className="text-sm hover:text-[#0d8a7e]
//               text-[#10a395]
//              hover:cursor-pointer hover:underline mt-6 flex gap-1 justify-end w-fit"
//                 onClick={() => {
//                   navigate("/");
//                 }}
//               >
//                 <ArrowLeftCircle size={20} className="" />
//                 <p className="font-medium ">Log In</p>
//               </div>
//             </div>
//           </form>
//         </div>
//         {/* Footer */}
//         <div className="mt-6 text-center text-sm text-gray-500">
//           {/* <p>© {new Date().getFullYear()} AGENTIC. All rights reserved.</p> */}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default RegisterPage;

import React, { useState } from "react";
import agenticLogo from "../assets/agenticLogo.png";
import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("register"); // "register" or "otp"
  const [otp, setOtp] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [resendDisabled, setResendDisabled] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    otp: "",
  });

  const { register, verifyOtp, loading } = useRegister();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && (!/^\d*$/.test(value) || value.length > 10)) return;

    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { name: "", email: "", password: "", phoneNumber: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    else if (formData.password !== formData.confirmPassword) newErrors.password = "Passwords do not match";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone number must be exactly 10 digits";

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const response = await register(formData);
    if (response.status >= 300) {
      toast.error("Registration failed: " + response.data.message);
      return;
    }

    toast.success("OTP sent to your email");
    setStep("otp");
    setResendDisabled(true);
    setTimeout(() => setResendDisabled(false), 60000);
  };

  const handleOtpSubmit = async (e) => {
  e.preventDefault();

  if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
    setErrors((prev) => ({ ...prev, otp: "OTP must be 6 digits" }));
    return;
  }

  const otpVerifyResponse = await verifyOtp(formData.email, otp);
  if (otpVerifyResponse.status >= 300) {
    toast.error("OTP verification failed: " + otpVerifyResponse.data.message);
    return;
  }

  toast.success("Successfully registered!");
  setTimeout(() => navigate("/"), 1500);
};
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8 mt-4 gap-[2%] cursor-pointer hover:scale-105 transition-transform duration-300">
          <img src={agenticLogo} alt="Agentic Logo" className="w-14 h-14" />
          <div className="text-3xl flex items-center font-bold text-gray-800">
            <p>AGENTIC</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 w-full">
          {step === "register" ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create New Account</h2>
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <InputField icon="fas fa-user" name="name" placeholder="Name" value={formData.name} error={errors.name} onChange={handleInputChange} />
                {/* Email */}
                <InputField icon="fas fa-envelope" name="email" placeholder="Email" value={formData.email} error={errors.email} onChange={handleInputChange} type="email" />
                {/* Phone */}
                <div className="mb-5">
                  <div className={`flex items-center border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-md px-3 focus-within:border-[#10a395]`}>
                    <span className="text-gray-400 text-sm">+91</span>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>
                {/* Password */}
                <PasswordField show={showPassword} toggle={() => setShowPassword(!showPassword)} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} error={errors.password} />
                {/* Confirm Password */}
                <PasswordField show={showPassword} toggle={() => setShowPassword(!showPassword)} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} />

                <button type="submit" disabled={loading} className="w-full h-12 bg-[#10a395] text-white rounded-md hover:bg-[#0d8a7e] transition-colors font-medium">
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Verify OTP</h2>
              <form onSubmit={handleOtpSubmit}>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="w-full h-12 mb-3 px-3 border border-gray-300 rounded-md text-sm focus:outline-none"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {errors.otp && <p className="text-red-600 text-xs mb-2">{errors.otp}</p>}
                <button type="submit" className="w-full h-12 bg-[#10a395] text-white rounded-md hover:bg-[#0d8a7e] transition-colors font-medium mb-3" disabled={loading}>
                  {loading ? "Verifying..." : "Verify and Complete"}
                </button>
              </form>
            </>
          )}

          <div className="text-sm text-[#10a395] mt-6 flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <ArrowLeftCircle size={20} />
            <p className="font-medium">Log In</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ icon, name, placeholder, value, onChange, error, type = "text" }) => (
  <div className="mb-5">
    <div className={`flex items-center border ${error ? "border-red-500" : "border-gray-300"} rounded-md px-3 focus-within:border-[#10a395]`}>
      <i className={`${icon} text-gray-400 text-lg`}></i>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
        value={value}
        onChange={onChange}
      />
    </div>
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);

const PasswordField = ({ name, placeholder, value, onChange, error, show, toggle }) => (
  <div className="mb-5">
    <div className={`flex items-center border ${error ? "border-red-500" : "border-gray-300"} rounded-md px-3 focus-within:border-[#10a395]`}>
      <i className="fas fa-lock text-gray-400 text-lg"></i>
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        className="w-full h-12 pl-3 text-gray-700 focus:outline-none border-none text-sm"
        value={value}
        onChange={onChange}
      />
      <button type="button" onClick={toggle} className="text-gray-400 ml-2">
        <i className={`fas ${show ? "fa-eye" : "fa-eye-slash"}`}></i>
      </button>
    </div>
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);

export default RegisterPage;
