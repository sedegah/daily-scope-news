import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/", // ✅ Use absolute path for Vercel deployment
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
  plugins: [
    react(),
    mode === "development" && require("lovable-tagger")(),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
}));
