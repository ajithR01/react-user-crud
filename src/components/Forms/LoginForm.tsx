import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/loginSchema";
import FormInput from "../Inputs/FormInput";
import { Button, Box, Typography } from "@mui/material";
import { useLoginUserMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Login } from "../../types/login";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginUserMutation();

  const { control, handleSubmit } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "eve.holt@reqres.in",
      password: "cityslicka",
    } as Login,
  });

  const notify = (message: string, type: "success" | "error" = "success") => {
    type === "success" ? toast.success(message) : toast.error(message);
  };

  const onSubmit = async (data: Login) => {
    try {
      const res = await login(data).unwrap();

      if (res && res.token) {
        notify("Login successful!");
        localStorage.setItem("token", res.token);
        dispatch(setAuth(true));
        navigate("/users");
      }
    } catch (error: any) {
      notify(error.data.error, "error");
    }
  };

  return (
    <Box className="p-6 bg-white" sx={{ width: "100%", boxShadow: 3, p: 4, borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="username" control={control} label="Username" />
        <FormInput name="password" control={control} label="Password" type="password" />

        <Button
          disabled={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          loading={isLoading}
        >
          Login
          {/* {isLoading ? "Logging in..." : "Login"} */}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
