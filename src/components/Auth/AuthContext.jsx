import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:5000"; 

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("/api/auth/check");
      if (response.status === 200) {
        console.log("✅ Authenticated user:", response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("❌ Not authenticated:", error.response?.data?.message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setIsAuthenticated,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
