import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import lightTheme from "./theme";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
