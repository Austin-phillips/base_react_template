import React from "react";
import Box from "@mui/material/Box";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: "white",
        flex: "0 0 auto",
        height: "calc(100vh - 75px)",
        position: "relative",
        width: "220px",
        zIndex: 1,
        borderRight: `1px ${theme.palette.grey[300]} solid`,
        boxShadow: `10px 0 10px -10px ${theme.palette.grey[300]}`,
      })}
    >
      <List>
        <Link style={{ color: "black", textDecoration: "none" }} to={"/"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
}
