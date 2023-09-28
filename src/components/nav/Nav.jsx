import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { UserContext } from "../../context/UserContext";
import { Stack, Typography } from "@mui/material";

const drawerWidth = 240;

export default function Nav({ children }) {
  const user = useContext(UserContext);
  const signOutUser = () => {
    signOut(auth).then(() => (window.location.href = "/login"));
  };

  return (
    <Stack display={"flex"}>
      <Box
        sx={{
          height: "75px",
          width: "100%",
          borderBottom: "1px grey solid",
        }}
      >
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            height: "100%",
          }}
        >
          <Typography>LOGO & IMAGE</Typography>
          <Typography>MENU</Typography>
        </Stack>
      </Box>
      <Stack display={"flex"} flexDirection={"row"}>
        <Box
          sx={{
            height: "100vh",
            width: "150px",
            borderRight: "1px grey solid",
            padding: "30px",
          }}
        >
          <Typography>NAV</Typography>
        </Box>
        <Box
          sx={{
            padding: "30px",
          }}
        >
          {children}
        </Box>
      </Stack>
    </Stack>
  );
}
