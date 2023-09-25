import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoutes = () => {
  const user = useContext(UserContext);
  return !user.isAuthenticated ? <Outlet /> : <Navigate to={"/"} />;
};

export default AuthenticatedRoutes;
