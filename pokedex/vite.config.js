import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Aggiungi qui i tuoi alias se necessario
    },
  },
  build: {
    rollupOptions: {
      external: [
        // Aggiungi qui i moduli da trattare come esterni se necessario
      ],
    },
  },
  optimizeDeps: {
    include: ["@mantine/core"],
  },
});
