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
        branches: 85,
        functions: 96,
        lines: 93,
        statements: 93,
      },
    },
    hookTimeout: 180_000,
    testTimeout: 180_000,
  },
});
