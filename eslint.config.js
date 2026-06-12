import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "coverage/**",
      "dist/**",
      "node_modules/**",
      "playwright-report/**",
      "test-output/**",
      ".vitest/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts", "test/**/*.ts"],
    rules: {
      // ratchet: fix in N5 after renderer consolidation lowers the service-file pressure.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // ratchet: legacy evidence adapters still use dynamic JSON shapes; replace with typed guards in N5.
      "@typescript-eslint/no-explicit-any": "warn",
      // TypeScript owns symbol resolution; ESLint's JS rule is noisy on TS namespaces and globals.
      "no-undef": "off",
    },
  },
);
