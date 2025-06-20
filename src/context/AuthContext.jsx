// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(() => localStorage.getItem("token") || null);
//  const [user, setUser] = useState(() => {
//   try {
//     const stored = localStorage.getItem("user");
//     if (!stored || stored === "undefined") return null; // ✅ new condition
//     return JSON.parse(stored);
//   } catch (err) {
//     console.error("Failed to parse user from localStorage:", err);
//     return null;
//   }
// });

// const login = ({ token, user }) => {
//   if (!token || !user) {
//     console.error("Login failed: access token or user missing.");
//     return;
//   }

//   const userWithToken = { ...user, token }; // Include token inside user
//   localStorage.setItem("token", token);
//   localStorage.setItem("user", JSON.stringify(userWithToken)); // ✅ Now user includes token
//   setToken(token);
//   setUser(userWithToken);
// };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("❌ Failed to parse user from localStorage:", err);
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const login = ({ token, user }) => {
    if (token) {
      localStorage.setItem("token", token);
      console.log("🔐 Stored token:", token);
      setToken(token);
    }
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("👤 Stored user:", user);
      setUser(user);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
