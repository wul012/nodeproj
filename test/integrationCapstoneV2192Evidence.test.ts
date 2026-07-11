import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import type { CrossProjectReadinessReport } from "../src/integration/crossProjectReadinessTypes.js";
import { AUTHORIZED_MATURITY_LABEL } from "./productionMaturityContract.js";

const REPORT_PATH = "d/2192/evidence/cross-project-readiness/cross-project-readiness.json";

describe("v2192 four-project integration capstone evidence", () => {
  it("archives a genuine C1-C4 live pass with all upstream commits pinned", () => {
    const report = JSON.parse(readFileSync(REPORT_PATH, "utf8")) as CrossProjectReadinessReport;

    expect(report).toMatchObject({
      schema_version: "orderops.cross-project-readiness.v2",
      live_requested: true,
      overall_status: "pass",
      read_only: true,
      execution_allowed: false,
      provenance: {
        java_commit: "a7237a85b50fed2de62eb71113739439812bc043",
        mini_kv_commit: "12b08563b2ac7a40c4874e4c2864f8deb3a32eef",
        aiproj_commit: "5d6c288bff244ce5568c032ca7ab4bc6303dbc57",
      },
    });
    expect(report.requirements.map((requirement) => [requirement.id, requirement.status])).toEqual([
      ["C1", "pass"],
      ["C2", "pass"],
      ["C3", "pass"],
      ["C4", "pass"],
    ]);
    expect(report.requirements.flatMap((requirement) => requirement.checks)
      .every((check) => check.status === "pass")).toBe(true);
  });

  it("pins the aiproj registry, artifact contract, and no-promotion boundary", () => {
    const checks = loadChecks();

    expect(checks.get("aiproj.registry")?.evidence).toMatchObject({
      registry_path: "docs/artifact-schema-guard-registry.json",
      registry_sha256: "226f3e03bbdc0e04822eb32e32ba6ca24aa03c49dc881f217601e0083129bf71",
      selected_schema_id: "publication_receipt_v1",
      artifact_kind: "publication_receipt",
    });
    expect(checks.get("aiproj.artifact_integrity")?.evidence).toMatchObject({
      artifact_bytes: 17_996,
      artifact_sha256: "f03a30064a9bbbc49d057d6d9435e5ed4295104a0ef34be0d7ee8d3a36043845",
      aiproj_commit: "5d6c288bff244ce5568c032ca7ab4bc6303dbc57",
    });
    expect(checks.get("aiproj.artifact_contract")?.evidence).toMatchObject({
      required_field_count: 9,
      missing_fields: [],
      expected_value_count: 8,
      expected_value_mismatches: [],
      type_check_count: 4,
      type_mismatches: [],
    });
    expect(checks.get("aiproj.no_promotion")?.evidence).toMatchObject({
      read_only: true,
      process_executed: false,
      promotion_allowed: false,
      granted_use: "downstream_governance_lookup_only",
      promotion_ready: false,
      approved_for_promotion: false,
    });
  });

  it("proves owned processes and the Java port were released", () => {
    const checks = loadChecks();

    expect(checks.get("java.graceful_shutdown")?.evidence).toMatchObject({
      shutdown_status_code: 200,
      fallback_kill_used: false,
      exit_code: 0,
      application_alive_after_shutdown: false,
      port_open_after_shutdown: false,
    });
    expect(checks.get("mini_kv.no_execution")?.evidence).toMatchObject({
      command: "GET",
      write_command: false,
      wal_touched: false,
    });

    const transcript = readFileSync("d/2192/evidence/readiness-cross-live-transcript.txt", "utf8");
    expect(transcript).toContain("readiness:cross overall=pass");
    expect(transcript).toContain("readiness:cross C4=pass");
    expect(transcript).not.toContain("\u0000");
  });

  it("records external review PASS while production execution and Stage 2 stay blocked", () => {
    for (const path of [
      "README.md",
      "START_HERE.md",
      "docs/PRODUCTION_BOUNDARIES.md",
      "docs/plans/node-track-final-evidence.md",
    ]) {
      const document = readFileSync(path, "utf8");
      expect(document).toContain("v2192");
      expect(document).toContain(AUTHORIZED_MATURITY_LABEL);
      expect(document).toContain("Stage 2");
      expect(document).not.toContain("external program-end review pending");
    }
    expect(readFileSync("README.md", "utf8")).toContain("not authorized for production execution");
    expect(readFileSync("docs/PRODUCTION_BOUNDARIES.md", "utf8"))
      .toContain("C1-C4 external program-end review PASS");
  });
});

function loadChecks(): Map<string, CrossProjectReadinessReport["requirements"][number]["checks"][number]> {
  const report = JSON.parse(readFileSync(REPORT_PATH, "utf8")) as CrossProjectReadinessReport;
  return new Map(report.requirements
    .flatMap((requirement) => requirement.checks)
    .map((check) => [check.id, check]));
}
