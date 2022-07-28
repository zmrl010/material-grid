/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        sourceType: "module",
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["**/dist/**"],
};
