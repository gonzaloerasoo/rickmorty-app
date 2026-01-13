import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@characters": path.resolve(__dirname, "src/app/characters"),
      "@shared": path.resolve(__dirname, "src/app/shared"),
    },
  },
});
