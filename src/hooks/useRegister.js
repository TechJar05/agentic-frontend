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
      return await registerUser({ name, email, password, phoneNumber });
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email, otp) => {
    setLoading(true);
    try {
      return await verifyEmailOtp(email, otp);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { register, verifyOtp, loading };
};
