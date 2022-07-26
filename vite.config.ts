import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import dts from "vite-dts";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: "material-grid",
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom/client",
        "@mui/material",
        "@tanstack/react-table",
        "@emotion/react",
        "@emotion/styled",
        "@mui/icons-material",
      ],
      output: {
        // Since we publish our ./src folder, there's no point
        // in bloating sourcemaps with another copy of it.
        sourcemapExcludeSources: true,
      },
    },
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: "esnext",
    // Leave minification up to applications.
    minify: false,
  },
});
