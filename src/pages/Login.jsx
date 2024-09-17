import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions, UIactions } from "../store";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  let auth = useSelector((state) => state.auth.auth);
  if (!auth) auth = localStorage.getItem("auth");
  // const selectedMenu = useSelector((state) => state.UI.selectedMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    localStorage.setItem("email", email);
    // localStorage.setItem("password", password);

    const res = await axios.post(
      `${BASE_URL}/users/login`,
      { email, password },
      { withCredentials: true }
    );
    const data = res.data;
    // console.log(data);
    if (data.statusCode == 200) {
      dispatch(
        authActions.login({ email, name: data.data.user.fullName, avatar: data.data.user.avatar })
      );
      localStorage.setItem("avatar", data.data.user.avatar);
      localStorage.setItem("name", data.data.user.fullName);
      localStorage.setItem("email", email);
      localStorage.setItem("auth", true);
      dispatch(UIactions.setSelectedMenu({ selectedMenu: "Home" }));
      toast.success("Logged in successfully");
      navigate("/");
    }
  };
  return (
    <>
      {/* <ToastContainer></ToastContainer> */}
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
          <Avatar sx={{ mx: "auto", bgcolor: "secondary.main", textAlign: "center", mb: 1 }}>
            <LockOutlined></LockOutlined>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              name="email"
              placeholder="Enter email"
              fullWidth
              required
              autoFocus
              type="email"
              sx={{ mb: 2 }}
            />
            <TextField
              placeholder="Enter password"
              fullWidth
              required
              name="password"
              type="password"
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
              Sign In
            </Button>
            <Box component="div" className="flex justify-between mt-4">
              <Link component="button" variant="body2">
                Forgot Password?
              </Link>
              <Link component="button" variant="body2" onClick={() => navigate("/signUp")}>
                Register
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
