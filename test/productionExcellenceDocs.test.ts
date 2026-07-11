import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  AUTHORIZED_MATURITY_LABEL,
  CAPSTONE_REGRESSION_COMMAND,
} from "./productionMaturityContract.js";

describe("production excellence documentation", () => {
  it("keeps production boundaries explicit and execution blocked", () => {
    const path = "docs/PRODUCTION_BOUNDARIES.md";
    expect(existsSync(path)).toBe(true);

    const document = readFileSync(path, "utf8");
    expect(document).toContain("Production execution: not authorized");
    expect(document).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(document).toContain("executionAllowed: false");
    expect(document).toContain("readyForProductionOperations: false");
    expect(document).toContain(AUTHORIZED_MATURITY_LABEL);
    expect(document).toContain("C1-C4 external program-end review PASS");
    expect(document).toContain("Stage 2 and whole-program closeout remain blocked");
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
    expect(document).toContain("npm run archive:retention:census");
  });

  it("keeps the public entry docs honest about closeout and capstone state", () => {
    const readme = readFileSync("README.md", "utf8");
    const startHere = readFileSync("START_HERE.md", "utf8");

    for (const document of [readme, startHere]) {
      expect(document).toContain(AUTHORIZED_MATURITY_LABEL);
      expect(document).toContain("C1-C4");
      expect(document).toContain("program-end PASS");
      expect(document).toContain("not authorized for production execution");
      expect(document).not.toContain("external program-end review pending");
    }
    expect(readme).toContain('$env:UPSTREAM_PROBES_ENABLED = "false"');
    expect(readme).toContain('$env:UPSTREAM_ACTIONS_ENABLED = "false"');
    expect(startHere).toContain("Node v2193 capstone maintenance closeout");
  });

  it("registers the live capstone rerun without silently enabling default CI", () => {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
      scripts: Record<string, string>;
    };
    const workflow = readFileSync(".github/workflows/node-evidence.yml", "utf8");
    const boundaries = readFileSync("docs/PRODUCTION_BOUNDARIES.md", "utf8");
    const bootstrap = readFileSync("scripts/codex-bootstrap.ps1", "utf8");

    expect(packageJson.scripts["readiness:cross"]).toBe("tsx src/integration/readinessCrossCli.ts");
    expect(boundaries).toContain("## Capstone Regression Surface");
    expect(boundaries).toContain(CAPSTONE_REGRESSION_COMMAND);
    expect(boundaries).toContain("Java track reaches final closeout");
    expect(boundaries).toContain("C1-C4 pass");
    expect(bootstrap).toContain(CAPSTONE_REGRESSION_COMMAND);
    expect(workflow).not.toContain("npm run readiness:cross");
  });

  it("records the N5 external PASS before Phase 3 closeout", () => {
    const evidence = readFileSync("docs/plans/node-n5-close-evidence.md", "utf8");
    const playbook = readFileSync("docs/plans/production-excellence-node-playbook.md", "utf8");

    expect(evidence).toContain("PASS, no corrections");
    expect(evidence).toContain("29131852707");
    expect(playbook).toContain("external N5 review PASS");
    expect(playbook).toContain("Track closeout");
  });

  it("wires changelog updates into the version completion rule", () => {
    const document = readFileSync("AGENTS.md", "utf8");
    expect(document).toContain("Update `CHANGELOG.md` for the completed version");
    expect(document).toContain("git tags remain the canonical milestone version");
  });
});
