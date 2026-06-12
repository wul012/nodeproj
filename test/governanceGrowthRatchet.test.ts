import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Governance growth ratchet (AGENTS.md "Governance Growth Control").
//
// These baselines were frozen at the v2114 consolidation milestone
// (docs/plans/v2114-governance-consolidation-roadmap.md). The counts may go
// DOWN as echo/verification/readiness chains are consolidated into
// catalog/template builders such as src/services/verificationReportBuilder.ts,
// but they must not go UP.
//
// If this test fails because you added a new service or route file: do not
// raise the baseline. First consolidate at least one existing near-duplicate
// chain into a shared builder (net file count must not increase), and include
// the necessity proof for the new chain in the active plan document.
const SERVICE_FILE_BASELINE = 1125;
const ROUTE_FILE_BASELINE = 80;

function countTsFiles(relativeDir: string): number {
  const dir = fileURLToPath(new URL(relativeDir, import.meta.url));
  return readdirSync(dir).filter((name) => name.endsWith(".ts")).length;
}

describe("governance growth ratchet", () => {
  it(`keeps src/services at or below the consolidation baseline (${SERVICE_FILE_BASELINE} files)`, () => {
    expect(countTsFiles("../src/services")).toBeLessThanOrEqual(SERVICE_FILE_BASELINE);
  });

  it(`keeps src/routes at or below the consolidation baseline (${ROUTE_FILE_BASELINE} files)`, () => {
    expect(countTsFiles("../src/routes")).toBeLessThanOrEqual(ROUTE_FILE_BASELINE);
  });
});
