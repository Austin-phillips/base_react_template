import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).catch((err) =>
      console.log("ERROR", err)
    );
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
          width: "550px",
          height: "500px",
          border: "2px solid",
          borderColor: theme.palette.primary.main,
          alignSelf: "center",
          borderRadius: "10px",
          padding: "30px",
        })}
      >
        <Typography
          variant="h3"
          textAlign={"center"}
          sx={{
            marginTop: "50px",
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
