import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import type { CrossProjectReadinessReport } from "../src/integration/crossProjectReadinessTypes.js";
import { AUTHORIZED_MATURITY_LABEL } from "./productionMaturityContract.js";

describe("v2191 integration capstone evidence", () => {
  it("keeps the live command env-gated and outside default CI", () => {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
      scripts: Record<string, string>;
    };
    const workflow = readFileSync(".github/workflows/node-evidence.yml", "utf8");

    expect(packageJson.scripts["readiness:cross"]).toBe("tsx src/integration/readinessCrossCli.ts");
    expect(workflow).not.toContain("npm run readiness:cross");
  });

  it("archives a complete live pass with explicit no-write and cleanup proof", () => {
    const report = JSON.parse(
      readFileSync("d/2191/evidence/cross-project-readiness/cross-project-readiness.json", "utf8"),
    ) as CrossProjectReadinessReport;

    expect(report).toMatchObject({
      schema_version: "orderops.cross-project-readiness.v1",
      live_requested: true,
      overall_status: "pass",
      read_only: true,
      execution_allowed: false,
    });
    expect(report.requirements.map((requirement) => [requirement.id, requirement.status])).toEqual([
      ["C1", "pass"],
      ["C2", "pass"],
      ["C3", "pass"],
    ]);

    const checks = new Map(report.requirements.flatMap((requirement) => requirement.checks)
      .map((check) => [check.id, check]));
    expect([...checks.values()].every((check) => check.status === "pass")).toBe(true);
    expect(checks.get("java.graceful_shutdown")?.evidence).toMatchObject({
      shutdown_status_code: 200,
      fallback_kill_used: false,
      exit_code: 0,
      application_alive_after_shutdown: false,
      port_open_after_shutdown: false,
    });
    expect(checks.get("mini_kv.check_json")?.evidence).toMatchObject({
      command: "GET",
      read_only: true,
      execution_allowed: false,
      write_command: false,
      touches_wal: false,
    });
  });

  it("keeps the historical v2191 evidence distinct from current execution authority", () => {
    for (const path of ["README.md", "START_HERE.md", "docs/PRODUCTION_BOUNDARIES.md"]) {
      const document = readFileSync(path, "utf8");
      expect(document).toContain(AUTHORIZED_MATURITY_LABEL);
      expect(document).toContain("Stage 2");
      expect(document).not.toContain("external program-end review pending");
    }
  });
});
