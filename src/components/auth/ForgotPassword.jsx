import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  InputLabel,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSendLink = () => {
    setError("");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLinkSent(true);
      })
      .catch((err) => {
        if (err.message.includes("auth/missing-email")) {
          setError(
            "Looks you there is no email. Please enter one and try again"
          );
        } else if (err.message.includes("auth/invalid-email")) {
          setError(
            "Looks you entered an invalid email. Please enter another one and try again"
          );
        } else {
          setError(
            "Oops... something went wrong. Please enter an email and try again."
          );
        }
      });
  };

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
          {linkSent ? (
            <Typography textAlign={"center"} marginTop={"30px"}>
              Please check your email for instructions to reset your password
            </Typography>
          ) : (
            <>
              <InputLabel
                sx={{
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                Please enter your email
              </InputLabel>
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                onClick={handleSendLink}
                sx={(theme) => ({
                  marginTop: "30px",
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                })}
                disabled={email.length === 0}
              >
                Send code
              </Button>
            </>
          )}
        </Box>
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
      </Stack>
    </Stack>
  );
};
