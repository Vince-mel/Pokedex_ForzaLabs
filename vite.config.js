import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {},
  },
  server: {
    // Configure your development server here
    port: 3000, // Default port is 3000
    open: true, // Open the browser automatically on startup
  },
  build: {
    // Configure your production build here
    outDir: "dist", // Default output directory is 'dist'
    rollupOptions: {
      // Configure Rollup options here
      external: ["react-icons/fa"], // Add external dependencies here if needed
    },
  },
});
