import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post("http://localhost:8000/api/token/refresh/", {
        refresh: refreshToken,
      });
  
      localStorage.setItem("accessToken", response.data.access);
      return response.data.access;
    } catch (error) {
      console.error("Error refreshing the token", error);
      return null;
    }
  };

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const updateAuth = (value) => {
    setLoggedIn(value);
  };

  const value = {
    loggedIn,
    updateAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
