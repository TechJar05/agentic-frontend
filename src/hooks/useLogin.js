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
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      const response = await loginUser({ email, password, role });
      console.log("Backend response:", response.data);

      // eslint-disable-next-line no-unused-vars
      const { access_token, refresh_token, id, name, role: userRole } = response.data;

      login({
        token: access_token,
        user: {
          id,
          name,
          role: userRole,
          token: access_token,
        },
      });

      return { status: 200, data: response.data };
    } catch (error) {
      console.error("Login error:", error?.response?.data);
      return {
        status: error?.response?.status || 500,
        data: error?.response?.data || { message: "Login failed" },
      };
    } finally {
      setLoading(false);
    }
  };

  return { login: loginHandler, loading };
};
