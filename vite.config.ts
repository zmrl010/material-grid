import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: "material-grid",
    },
    rollupOptions: {
      external: ["@mui/material", "react", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
        },
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
  plugins: [react(), dts()],
});
