import React from "react";
import { Container, Box } from "@mui/material";
import LoginForm from "../components/Forms/LoginForm";

const Login: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <LoginForm />
      </Box>
    </Container>
  );
};

export default Login;
