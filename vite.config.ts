/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [react(), typescript()],
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
        "@mui/material",
        "@tanstack/react-table",
        "@emotion/react",
        "@emotion/styled",
        "@mui/icons-material",
        "@mui/system",
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
  test: {
    environment: "jsdom",
    setupFiles: "src/test/setup.ts",
  },
});
