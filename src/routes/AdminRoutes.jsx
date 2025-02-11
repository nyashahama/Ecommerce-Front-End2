import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AdminRoutes = () => {
  const { user } = useAuth();
  return user?.role === "ADMIN" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoutes;
