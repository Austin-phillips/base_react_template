import {
  Box,
  Icon,
  IconButton,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const TopNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    signOut(auth).then(() => (window.location.href = "/login"));
  };
  return (
    <Box
      sx={{
        display: "block",
        width: "100%",
        height: "75px",
      }}
    >
      <Box
        sx={(theme) => ({
          width: "100%",
          height: "75px",
          backgroundColor: theme.palette.primary.main,
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <Typography
          sx={{
            marginLeft: "30px",
          }}
        >
          LOGO -- Name of Company
        </Typography>
        <Box
          sx={{
            marginRight: "30px",
          }}
        >
          <IconButton onClick={handleClick}>
            <AccountCircleIcon
              sx={{
                width: 32,
                height: 32,
              }}
            />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              zIndex: 9999,
            }}
          >
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/profile"
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};
