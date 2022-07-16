import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-dts";

export default defineConfig({
  plugins: [dts()],
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
      external: [
        "@emotion/react",
        "@emotion/styled",
        "@mui/icons-material",
        "@mui/material",
        "react-dom",
        "react",
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
