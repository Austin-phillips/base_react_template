import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { UserContext } from "../../context/UserContext";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Nav({ children }) {
  const user = useContext(UserContext);
  const signOutUser = () => {
    signOut(auth).then(() => (window.location.href = "/login"));
  };

  return (
    <Stack
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflowX: "none",
      }}
    >
      <Box
        sx={(theme) => ({
          height: "75px",
          width: "100%",
          borderBottom: `1px ${theme.palette.grey[300]} solid`,
        })}
      >
        <Stack
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            height: "100%",
          }}
        >
          <Typography
            sx={{
              marginLeft: "25px",
            }}
          >
            LOGO & IMAGE
          </Typography>
        </Stack>
      </Box>
      <Stack display={"flex"} flexDirection={"row"}>
        <Box
          sx={(theme) => ({
            height: "calc(100vh - 75px)",
            width: "200px",
            borderRight: `1px ${theme.palette.grey[300]} solid`,
          })}
        >
          <List
            sx={{
              width: "100%",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  style={{
                    display: "flex",
                    color: "black",
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
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
