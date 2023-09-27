import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { accessToken } from "../../utils/getAccessToken";

const ProtectedRoutes = () => {
  return accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
