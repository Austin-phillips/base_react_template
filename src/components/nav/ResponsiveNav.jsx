import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../firebase";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetButtonDisabled, setResetButtonDisabled] = useState(true);

  const handleResetPassword = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("oobCode")) {
      const code = searchParams.get("oobCode");
      setError("");
      confirmPasswordReset(auth, code, confirmPassword)
        .then(() => {
          window.location.href = "/login";
        })
        .catch((err) => {
          if (err.message.includes("auth/weak-password")) {
            let message = err.message;
            message = message.replace("Firebase: ", "");
            message = message.replace(" (auth/weak-password)", "");
            setError(message);
          } else {
            setError(
              "Oops... something went wrong. Please resend the email and try again."
            );
          }
        });
    } else {
      setError(
        "Oops... It looks like something went wrong. Please try sending the email again."
      );
    }
  };

  useEffect(() => {
    if (newPassword.length > 0 && newPassword === confirmPassword) {
      setResetButtonDisabled(false);
    } else {
      setResetButtonDisabled(true);
    }
  }, [newPassword, confirmPassword, resetButtonDisabled]);

  return (
    <Stack
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100vh"}
    >
      <Stack
        sx={(theme) => ({
          width: "50%",
          minWidth: "300px",
          maxWidth: "500px",
          border: "2px solid",
          borderColor: theme.palette.primary.main,
          alignSelf: "center",
          borderRadius: "10px",
          padding: "30px",
        })}
      >
        <Typography
          variant="h1"
          textAlign={"center"}
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Forgot Password
        </Typography>
        <Box
          component={"form"}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "space-around",
            height: "80%",
          }}
        >
          {error && (
            <Typography
              marginTop={"20px"}
              marginBottom={"20px"}
              textAlign={"center"}
              color={"error"}
              variant="body"
            >
              {error}
            </Typography>
          )}
          <Stack>
            <TextField
              id="newPassword"
              label="New Password"
              type="password"
              variant="outlined"
              sx={{
                marginBottom: "20px",
              }}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              onClick={handleResetPassword}
              sx={(theme) => ({
                marginTop: "30px",
                backgroundColor: theme.palette.primary.main,
                color: "white",
              })}
              disabled={resetButtonDisabled}
            >
              Reset password
            </Button>
          </Stack>
          <Divider
            sx={{
              margin: "30px 0px",
            }}
          />
          <Box
            sx={{
              margin: "0px auto",
            }}
          >
            <Link to="/login">
              <Button
                variant="contained"
                sx={(theme) => ({
                  backgroundColor: theme.palette.green[500],
                })}
              >
                Back to login
              </Button>
            </Link>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};
