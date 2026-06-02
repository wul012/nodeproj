import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const CONSUMER_READINESS_MATURITY_VERSIONS = [
  566,
  567,
  568,
  569,
  570,
  571,
  572,
  573,
  574,
  575,
  576,
  577,
  578,
  579,
] as const;

describe("Java/mini-kv consumer readiness maturity artifacts", () => {
  it("keeps explanation and walkthrough artifacts for v566-v579", () => {
    const projectRoot = process.cwd();
    const walkthroughRoot = path.join(projectRoot, "代码讲解记录_生产雏形阶段3");
    const walkthroughFiles = readdirSync(walkthroughRoot);

    for (const version of CONSUMER_READINESS_MATURITY_VERSIONS) {
      const explanationDir = path.join(projectRoot, "e", String(version), "解释");
      expect(existsSync(explanationDir), `missing explanation dir for v${version}`).toBe(true);
      expect(readdirSync(explanationDir).some((file) => file.endsWith(`-v${version}.md`))).toBe(true);
      expect(walkthroughFiles.some((file) => file.endsWith(`-v${version}.md`))).toBe(true);
    }
  });
});
