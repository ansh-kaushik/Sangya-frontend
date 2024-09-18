import React, { useEffect } from "react";
import PageWrapper from "./PageWrapper";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tabs } from "@mui/base";

import { styled } from "@mui/system";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";

export default function Profile() {
  let { name, email, avatar, auth } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.UI);
  const [firstName, lastName] = name.split(" ");
  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
  };
  const handleUpdatePassword = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, navigate]);

  return (
    <PageWrapper>
      <Container className="shadow-lg h-full p-4 rounded-lg flex flex-col w-full gap-5 max-w-3xl dark:bg-zinc-900 dark:text-white mx-auto bg-white mt-4">
        <Box className="flex items-center gap-5 mb-20 ">
          {avatar ? (
            <img
              width="100px"
              className="border-transparent rounded-full"
              src={avatar}
              alt="avatar"
            />
          ) : (
            <AccountCircleIcon sx={{ fontSize: "100px" }} />
          )}

          <Typography variant="h4" component="h1" className="font-bold text-xl">
            {name}
          </Typography>
        </Box>
        <Box className="mt-4">
          <Tabs defaultValue={1}>
            <TabsList className="w-72 ">
              <Tab value={1}>General</Tab>
              <Tab value={2}>Security</Tab>
              <Tab value={3}>Notfications</Tab>
            </TabsList>
            <TabPanel value={1}>
              <Box type="form" className="flex flex-wrap gap-4 mt-10 ">
                <TextField className="w-1/4" defaultValue={firstName} label="First Name" />
                <TextField className="w-1/4" defaultValue={lastName} label="Last Name" />
                <TextField className="w-1/3" defaultValue={email} label="Email" />
                <Button type="submit" onClick={handleUpdate} variant="contained" color="secondary">
                  Save Changes
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={2}>
              <Box type="form" className="flex  flex-col flex-wrap gap-4 mt-10 ">
                <TextField
                  className="w-1/4"
                  type="password"
                  label="New Password"
                  placeholder="New Password"
                />
                <TextField
                  className="w-1/4"
                  type="password"
                  label="Repeat New Password"
                  placeholder="Repeat New Password"
                />

                <Button
                  className="w-1/4"
                  type="submit"
                  onClick={handleUpdatePassword}
                  variant="contained"
                  color="secondary"
                >
                  Update Password
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={3}>
              <h1>No New Notifications</h1>
            </TabPanel>
          </Tabs>
        </Box>
      </Container>
    </PageWrapper>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.4)" : "rgba(0,0,0, 0.2)"
  };
  `
);
