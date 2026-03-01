import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  // No token at all → new user → go to register
  if (!token) {
    return <Navigate to="/register" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Token expired → existing user → go to login
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return <Navigate to="/login" replace />;
    }

    // Role check
    if (requiredRole && decoded.status?.toLowerCase() !== requiredRole.toLowerCase()) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (err) {
    console.error("Invalid token:", err);
    // If token is invalid, treat as new user → register
    return <Navigate to="/register" replace />;
  }
};

export default ProtectedRoute;
