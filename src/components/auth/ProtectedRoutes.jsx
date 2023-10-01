import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAccessToken } from "../../hooks/useAccessToken";
import Nav from "../nav/Nav";
import { TopNav } from "../nav/TopNav";
import { Box } from "@mui/material";

const ProtectedRoutes = () => {
  const [accessToken] = useAccessToken();
  return accessToken ? (
    <>
      <TopNav />
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Nav />
        <Box
          sx={{
            display: "flex",
            flex: 1,
            margin: "0 auto",
            padding: "0 30px",
            position: "relative",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoutes;
