import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import jwtDecode from 'jwt-decode';
import { useAuth } from './components/AuthContext';

const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired, remove the tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error decoding the token', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return false;
    }
  }

  return false;
};

function AppRouter() {
  const { loggedIn, updateAuth } = useAuth();

  useEffect(() => {
    updateAuth(isAuthenticated());
  }, [loggedIn, updateAuth]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!loggedIn ? <LoginPage /> : <Dashboard />}
        />
        <Route
          path="/register"
          element={!loggedIn ? <RegisterPage /> : <LoginPage />}
        />
        <Route
          path="/"
          element={loggedIn ? <Dashboard /> : <LoginPage />}
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
