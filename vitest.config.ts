import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: ["src/**/*.ts"],
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "coverage",
      thresholds: {
        branches: 86,
        functions: 97,
        lines: 94,
        statements: 94,
      },
    },
    hookTimeout: 180_000,
    testTimeout: 180_000,
  },
});
