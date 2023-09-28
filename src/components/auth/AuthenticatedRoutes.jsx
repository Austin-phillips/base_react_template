import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAccessToken } from "../../hooks/useAccessToken";

const AuthenticatedRoutes = () => {
  const [accessToken] = useAccessToken();
  return !accessToken ? <Outlet /> : <Navigate to={"/"} />;
};

export default AuthenticatedRoutes;
