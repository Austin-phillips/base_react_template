import { createTheme, colors } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3", // Custom primary color
    },
    secondary: {
      main: "#FFC107", // Custom secondary color
    },
    background: {
      default: "#F5F5F5", // Custom background color
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Custom font family
    h1: {
      fontSize: "2rem", // Custom heading 1 font size
    },
    h2: {
      fontSize: "1.5rem", // Custom heading 2 font size
    },
    h3: {
      fontSize: "0.75rem",
    },
    body: {
      fontSize: "1rem",
    },
    // Define other custom typography styles here
  },
  // You can define other custom theme properties here
});

export default theme;
