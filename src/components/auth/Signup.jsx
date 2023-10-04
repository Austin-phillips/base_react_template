import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => (window.location.href = "/"))
      .catch((err) => {
        console.log("ERROR", err.message);
        if (err.message.includes("(auth/email-already-in-use)")) {
          setError(
            "It looks like that email already exists. Please try a different one or log in."
          );
        } else {
          setError("Opps... There was an issue logging in. Please try again.");
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
          Sign Up
        </Typography>
        <Box
          onSubmit={signUp}
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
              textAlign={"center"}
              component={"body"}
              color={"error"}
            >
              {error}
            </Typography>
          )}
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            sx={{
              marginTop: "30px",
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            sx={{
              marginTop: "30px",
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            sx={(theme) => ({
              marginTop: "30px",
              backgroundColor: theme.palette.primary.main,
              color: "white",
            })}
          >
            Sign Up
          </Button>
          <Typography
            textAlign={"center"}
            sx={{
              marginTop: "30px",
            }}
          >
            Already have an account? click <Link to={"/login"}>Here</Link>
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
