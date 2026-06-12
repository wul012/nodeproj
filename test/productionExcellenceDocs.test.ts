import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("production excellence documentation", () => {
  it("keeps production boundaries explicit and execution blocked", () => {
    const path = "docs/PRODUCTION_BOUNDARIES.md";
    expect(existsSync(path)).toBe(true);

    const document = readFileSync(path, "utf8");
    expect(document).toContain("Production execution: not authorized");
    expect(document).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(document).toContain("executionAllowed: false");
    expect(document).toContain("readyForProductionOperations: false");
    expect(document).toContain("Java and mini-kv can continue in parallel");
  });

  it("records the git-tag version policy and recent version history", () => {
    const path = "CHANGELOG.md";
    expect(existsSync(path)).toBe(true);

    const document = readFileSync(path, "utf8");
    expect(document).toContain("`package.json` remains `0.1.0`");
    expect(document).toContain("Git tags such as `v2117`");
    expect(document).toContain("## v2117 - 2026-06-12");
    expect(document).toContain("## v2116 - 2026-06-12");
    expect(document).toContain("## v2055 - 2026-06-12");
  });

  it("marks historical sibling fixtures as frozen load-bearing evidence", () => {
    const path = "fixtures/MANIFEST.md";
    expect(existsSync(path)).toBe(true);

    const document = readFileSync(path, "utf8");
    expect(document).toContain("load-bearing historical evidence");
    expect(document).toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/");
    expect(document).toContain("fixtures/historical/sibling-workspaces/mini-kv/");
    expect(document).toContain("v82-v274");
    expect(document).toContain("v91-v610");
    expect(document).toContain("historicalEvidenceResolver.ts");
  });

  it("wires changelog updates into the version completion rule", () => {
    const document = readFileSync("AGENTS.md", "utf8");
    expect(document).toContain("Update `CHANGELOG.md` for the completed version");
    expect(document).toContain("git tags remain the canonical milestone version");
  });
});
