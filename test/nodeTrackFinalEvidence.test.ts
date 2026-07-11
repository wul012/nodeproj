import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("Node production-excellence final evidence", () => {
  it("maps every E gate to a mechanical check without claiming the capstone", () => {
    const path = "docs/plans/node-track-final-evidence.md";
    expect(existsSync(path)).toBe(true);

    const document = readFileSync(path, "utf8");
    for (let gate = 1; gate <= 10; gate += 1) {
      expect(document).toContain(`E${gate}`);
    }
    expect(document).toContain("single-project validation + cross-project contract alignment");
    expect(document).toContain("Integration capstone C1-C4: not started");
    expect(document).toContain("External track-closeout decision: pending");
    expect(document).toContain("npm run test:coverage -- --maxWorkers=2");
  });

  it("enumerates every accepted waiver family in one place", () => {
    const document = readFileSync("docs/plans/node-track-final-evidence.md", "utf8");

    expect(document).toContain("Renderer composition-only waivers: 3");
    expect(document).toContain("Security scan waivers: 5 entries, 6 matches");
    expect(document).toContain("Source size: 0 waivers");
    expect(document).toContain("Archive retention: 0 waivers");
    expect(document).toContain("Coverage: 0 exclusions");
  });

  it("keeps the security and archive policies linked to executable gates", () => {
    for (const path of [
      "docs/SECURITY.md",
      "docs/archive-retention-index.md",
      "docs/archive-retention-budget.json",
      "docs/security-scan-waivers.json",
      ".env.production.example",
    ]) {
      expect(existsSync(path), path).toBe(true);
    }

    const security = readFileSync("docs/SECURITY.md", "utf8");
    const retention = readFileSync("docs/archive-retention-index.md", "utf8");
    expect(security).toContain("npm run security:scan");
    expect(security).toContain("managed-unimplemented");
    expect(retention).toContain("npm run archive:retention:census");
    expect(retention).toContain("non-destructive");
  });
});
