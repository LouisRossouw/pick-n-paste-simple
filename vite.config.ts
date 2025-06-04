import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, "src/popup/index.html"),
        sidePanel: path.resolve(__dirname, "src/side-panel/index.html"),
        background: path.resolve(__dirname, "src/background.ts"),
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === "background"
            ? "background.js"
            : "[name]/assets/[name].js",
      },
    },
    outDir: "dist", // Ensure it outputs to a single place
    emptyOutDir: true,
  },
});
