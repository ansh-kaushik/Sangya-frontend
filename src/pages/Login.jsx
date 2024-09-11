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

export default function Login() {
  const auth = useSelector((state) => state.auth.auth);
  // const selectedMenu = useSelector((state) => state.UI.selectedMenu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    // console.log(email, password);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    dispatch(authActions.login());
    dispatch(UIactions.setSelectedMenu({ selectedMenu: "Home" }));
    navigate("/");
  };
  return (
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
  );
}
