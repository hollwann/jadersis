import * as path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },
  plugins: [react(), ...(mode === "development" ? [] : [])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
}));
