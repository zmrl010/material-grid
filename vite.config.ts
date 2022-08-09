/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [
    typescript({
      exclude: [
        "**/*.{spec,test}.{ts,tsx}",
        "**/{spec,test,__test__}/*.{ts,tsx}",
      ],
    }),
    react(),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "clsx",
        "@mui/material",
        "@tanstack/react-table",
        "react",
        "react/jsx-runtime",
        "prop-types",
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
    globals: true,
    environment: "jsdom",
    setupFiles: "src/test/setup.ts",
  },
});
