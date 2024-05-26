// vite.config.js
export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      external: ["@mantine/core"],
      // ...
    },
  },
  // ...
});
