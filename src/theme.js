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
    grey: {
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
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
