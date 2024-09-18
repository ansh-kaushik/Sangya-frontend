import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/index.js";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";

import { ToastContainer } from "react-toastify";
import { darkTheme, theme } from "../theme.js";
const darkMode = localStorage.getItem("darkMode") === "true";
const ThemeWrapper = () => {
  const darkMode = useSelector((state) => state.UI.darkMode);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <App />
      <ToastContainer />
    </ThemeProvider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeWrapper />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
