import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;