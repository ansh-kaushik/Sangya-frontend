import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  //   const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar className="mx-auto text-center mb-2" sx={{ bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" className="text-center">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignUp} className="mt-4">
          <TextField
            label="First Name"
            name="first_name"
            placeholder="Enter First Name"
            required
            autoFocus
            type="text"
            sx={{ mb: 2, mr: 1, width: "40%" }}
          />
          <TextField
            label="Last Name"
            name="last_name"
            placeholder="Enter Last Name"
            required
            autoFocus
            type="text"
            sx={{ mb: 2, width: "57%" }}
          />
          <TextField
            label="Email"
            name="email"
            placeholder="Enter  Your Email"
            fullWidth
            required
            autoFocus
            type="email"
            // className="mb-2"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            placeholder="Enter Your Password"
            fullWidth
            required
            autoFocus
            type={showPassword ? "text" : "password"}
            // className="mb-2"
            sx={{ mb: 2 }}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" fullWidth className="mt-1">
            Sign Up
          </Button>
          <Box className="mt-4">
            <Link component="button" variant="body2" onClick={() => navigate("/login")}>
              Already have an account?
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
