import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { accessToken } from "../../utils/getAccessToken";

const AuthenticatedRoutes = () => {
  return !accessToken ? <Outlet /> : <Navigate to={"/"} />;
};

export default AuthenticatedRoutes;
