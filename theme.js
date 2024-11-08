import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1d2c94",
      red: "#ee2400",
    },
    secondary: {
      main: "#318a34",
      light: "#a1e2a4",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
