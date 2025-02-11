import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          const response = await axios.get("/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        } catch (error) {
          localStorage.clear();
          setUser(null);
        }
      }
    };
    verifySession();
  }, []);

  const login = (userData) => {
    const user = {
      id: userData.id,
      firstName: userData.firstName,
      role: userData.role,
    };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create and export the custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
