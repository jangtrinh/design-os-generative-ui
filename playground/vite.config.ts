import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "./playground",
  resolve: {
    alias: {
      "design-os-generative-ui": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3300,
    open: false,
  },
});
