// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the config to include credentials
    config.withCredentials = true;
    return config;
  },
  (error) => {
    // Handle the error before passing it down
    return Promise.reject(error);
  }
);

export default axiosInstance;
