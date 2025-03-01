import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#edede9",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
    },
  },
});

export default lightTheme;
