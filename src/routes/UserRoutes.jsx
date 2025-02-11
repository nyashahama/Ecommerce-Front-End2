import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const UserRoutes = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserRoutes;
