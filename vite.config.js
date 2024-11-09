import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// export default {
//   server: {
//     host: "192.168.0.102", // Change to your local IP address
//     // port: 3000,             // (Optional) Set a custom port if needed
//   },
// };
