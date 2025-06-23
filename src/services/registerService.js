// import axios from "axios";
// import { Phone } from "lucide-react";

// const API_URL = import.meta.env.VITE_API_URL;

// export const registerUser = async ({ name, email, password, phoneNumber }) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, {
//       name,
//       email,
//       password,
//       phone_number: "91" + phoneNumber,
//     });
//     return response;
//   } catch (error) {
//     // console.log("Error from register service", error.response);

//     throw error.response;
//   }
// };

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async ({ name, email, password, phoneNumber }) => {
  return await axios.post(`${API_URL}api/authentication/register`, {
    name,
    email,
    password,
    phone_number: `91${phoneNumber}`,
  });
};

export const verifyEmailOtp = async (email, otp) => {
  return await axios.post(`${API_URL}api/authentication/verify-otp`, {
    email,
    otp,
  });
};
