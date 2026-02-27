import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Check expiry
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return <Navigate to="/login" replace />;
    }

    // Check role if required
    if (requiredRole && decoded.status?.toLowerCase() !== requiredRole.toLowerCase()) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
