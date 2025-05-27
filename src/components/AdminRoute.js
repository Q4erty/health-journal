// src/components/AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, role } = useAuth();
  return isAuthenticated && role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
