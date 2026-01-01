import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromToken } from "./utils";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
