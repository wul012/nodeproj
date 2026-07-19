import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import vitestConfig from "../vitest.config.js";

describe("production excellence closeout ratchets", () => {
  it("keeps coverage floors tightened above the N2 baseline", () => {
    const config = vitestConfig as {
      test?: { coverage?: { thresholds?: Record<string, number> } };
    };

    expect(config.test?.coverage?.thresholds).toMatchObject({
      branches: 86,
      functions: 97,
      lines: 94,
      statements: 94,
    });
  });

  it("caps lint warnings and exposes both final governance commands", () => {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts.lint).toBe("eslint src test --max-warnings 0");
    expect(packageJson.scripts["security:scan"]).toBe("node scripts/security-config-scan.mjs");
    expect(packageJson.scripts["archive:retention:census"]).toBe("node scripts/archive-retention-census.mjs");
  });

  it("runs security and retention gates before the full CI test step", () => {
    const workflow = readFileSync(".github/workflows/node-evidence.yml", "utf8");
    const securityIndex = workflow.indexOf("npm run security:scan");
    const retentionIndex = workflow.indexOf("npm run archive:retention:census");
    const coverageIndex = workflow.indexOf("npm run test:coverage");

    expect(securityIndex).toBeGreaterThan(0);
    expect(retentionIndex).toBeGreaterThan(securityIndex);
    expect(coverageIndex).toBeGreaterThan(retentionIndex);
    expect(workflow).toContain('UPSTREAM_ACTIONS_ENABLED: "false"');
  });
});
