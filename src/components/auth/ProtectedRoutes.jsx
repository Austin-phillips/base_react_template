import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAccessToken } from "../../hooks/useAccessToken";
import { Box } from "@mui/material";
import ResponsiveDrawer from "../nav/ResponsiveNave";

const ProtectedRoutes = () => {
  const [accessToken] = useAccessToken();
  return accessToken ? (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
        }}
      >
        <ResponsiveDrawer>
          <Outlet />
        </ResponsiveDrawer>
      </Box>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoutes;
