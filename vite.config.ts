import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  build: {
    lib: {
      entry: resolve("src/index.ts"),
      name: "MaterialGrid",
      fileName: "material-grid",
    },
    rollupOptions: {
      // external: [
      //   "@emotion/react",
      //   "@emotion/styled",
      //   "@mui/icons-material",
      //   "@mui/material",
      //   "react-dom",
      //   "react",
      // ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
