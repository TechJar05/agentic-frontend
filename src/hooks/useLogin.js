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

      const response = await loginUser({ email, password, role });
      const { access_token, id, name, role: userRole } = response.data;

      if (!access_token) {
        return { status: 401, data: { message: "Invalid credentials" } };
      }

      login({
        token: access_token,
        user: { id, name, role: userRole, token: access_token },
      });

      return { status: 200, data: response.data };
    } catch (error) {
      const status = error?.response?.status || 500;

      // ✅ Explicit handling of 403 error
      if (status === 403) {
        const message = error?.response?.data?.detail || "Access forbidden";
        return { status: 403, data: { message } };
      }

      const message = error?.response?.data?.message || "Login failed";
      return { status, data: { message } };
    } finally {
      setLoading(false);
    }
  };

  return { login: loginHandler, loading };
};

export default useLogin;
