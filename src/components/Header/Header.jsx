import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { alpha, Button, IconButton, InputBase, Menu, MenuItem, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { authActions, UIactions } from "../../store";
import axios from "axios";
import { DarkMode, LightMode } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const darkMode = useSelector((state) => state.UI.darkMode);
  const selectedMenu = useSelector((state) => state.UI.selectedMenu);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    dispatch(UIactions.setSelectedMenu({ selectedMenu: undefined }));
    navigate("/profile");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    await axios.post(`${BASE_URL}/users/logout`, {}, { withCredentials: true });
    // Update logout state
    window.location.reload();
  };
  const handleDarkModeToggle = () => {
    dispatch(UIactions.toggleDarkMode());
  };
  // console.log(darkMode);

  return (
    <div
      className={` sticky top-0 flex items-center justify-between  space-x-4 p-4 bg-blue-600 dark:bg-zinc-900 text-white shadow-md`}
    >
      <h1
        onClick={() => navigate("/")}
        className="text-xl hover:cursor-pointer font-bold dark:text-blue-700"
      >
        SANGYA
      </h1>
      {selectedMenu && (
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>
      )}

      <nav className="space-x-4 flex ">
        {
          <Button onClick={handleDarkModeToggle}>
            {!darkMode ? (
              <DarkMode sx={{ color: "#36454F" }} />
            ) : (
              <LightMode sx={{ color: "white" }} />
            )}
          </Button>
        }
        {!auth ? (
          <Button onClick={() => navigate("/login")} color="inherit" variant="outlined">
            Sign In
          </Button>
        ) : (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </nav>
    </div>
  );
}
