import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "https://yageun.pro",
        changeOrigin: true,
      },
    },
  },
});
