// import { useState } from "react";
// import { loginUser } from "../services/loginService";
// import { useAuth } from "../context/authContext";

// export const useLogin = () => {
//   const { login } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const loginHandler = async ({ email, password, role }) => {
//     try {
//       setLoading(true);
//       const response = await loginUser({ email, password, role });

//       // destructure response data
//       const { tokens, user } = response.data;

//       // Save user + access token in one object (required for AdminDashboard)
//       login({
//         token: tokens.access,  // ✅ pass access token
//         user: {
//           ...user,
//           token: tokens.access, // ✅ attach token into user object
//         },
//       });

//       return response;
//     } catch (error) {
//       return error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { login: loginHandler, loading };
// };
// export default useLogin;

import { useState } from "react";
import { loginUser } from "../services/loginService";
import { useAuth } from "../context/authContext";

export const useLogin = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const loginHandler = async ({ email, password, role }) => {
    try {
      setLoading(true);
      localStorage.removeItem("user"); // Clear previous user data
      localStorage.removeItem("token"); // Clear previous token
      const response = await loginUser({ email, password, role });
      console.log("Backend response:", response.data);
      const { tokens, user } = response.data;
      console.log("Tokens:", tokens, "User:", user);
      login({
        token: tokens.access,
        user: {
          ...user,
          id: user.id || user.userId, // Handle potential userId field
          token: tokens.access,
        },
      });
      return response;
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { login: loginHandler, loading };
};
export default useLogin;