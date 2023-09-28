import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAccessToken } from "../../hooks/useAccessToken";
import Nav from "../nav/Nav";

const ProtectedRoutes = () => {
  const [accessToken] = useAccessToken();
  return accessToken ? (
    <>
      <Nav>
        <Outlet />
      </Nav>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoutes;
