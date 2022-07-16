import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-dts";

export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MaterialGrid",
      formats: ["es", "cjs"],
      fileName: "material-grid",
    },
    rollupOptions: {
      external: ["@mui/material", "react"],
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
  plugins: [dts()],
});
