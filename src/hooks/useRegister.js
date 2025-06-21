// import { useState } from "react";
// import { registerUser } from "../services/registerService";

// export const useRegister = () => {
//   const [loading, setLoading] = useState(false);

//   const register = async ({ email, password, phoneNumber, name }) => {
//     setLoading(true);
//     try {
//       const response = await registerUser({
//         email,
//         password,
//         phoneNumber,
//         name,
//       });
//       // console.log("Response from register hook", response);

//       return response;
//     } catch (error) {
//       // console.log("Error from register hook", error);

//       return error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { register, loading };
// };

import { useState } from "react";
import { registerUser, verifyEmailOtp } from "../services/registerService";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async ({ name, email, password, phoneNumber }) => {
    setLoading(true);
    try {
      const res = await registerUser({ name, email, password, phoneNumber });
      return { status: res.status, data: res.data };
    } catch (error) {
      return {
        status: error?.response?.status || 500,
        data: error?.response?.data || { message: "Registration failed. Please try again." },
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email, otp) => {
    setLoading(true);
    try {
      const res = await verifyEmailOtp(email, otp);
      return { status: res.status, data: res.data };
    } catch (error) {
      return {
        status: error?.response?.status || 500,
        data: error?.response?.data || { message: "OTP verification failed. Try again." },
      };
    } finally {
      setLoading(false);
    }
  };

  return { register, verifyOtp, loading };
};
