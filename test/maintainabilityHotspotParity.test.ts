import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { dashboardHtml } from "../src/ui/dashboard.js";
import { dashboardMarkup } from "../src/ui/dashboardMarkup.js";

const MIGRATED_STATUS_GET_PATHS = [
  "/api/v1/production/real-read-adapter-rehearsal",
  "/api/v1/production/real-read-adapter-operator-window-runbook",
  "/api/v1/production/real-read-adapter-failure-taxonomy",
  "/api/v1/production/real-read-adapter-evidence-archive",
  "/api/v1/production/real-read-adapter-evidence-archive-verification",
  "/api/v1/production/real-read-adapter-imported-window-result-packet",
  "/api/v1/production/real-read-adapter-production-readiness-checkpoint",
  "/api/v1/production/real-read-window-operator-identity-binding",
  "/api/v1/production/real-read-window-audit-store-handoff-contract",
  "/api/v1/production/real-read-window-ci-archive-artifact-manifest",
  "/api/v1/production/real-read-window-ci-artifact-manifest-verification",
  "/api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract",
  "/api/v1/production/cross-project-ci-artifact-retention-gate",
  "/api/v1/production/three-project-real-read-runtime-smoke-preflight",
  "/api/v1/production/three-project-real-read-runtime-smoke-execution-packet",
  "/api/v1/production/three-project-real-read-runtime-smoke-archive-verification",
  "/api/v1/production/post-real-read-production-hardening-triage",
  "/api/v1/production/idempotency-vertical-readiness-review",
  "/api/v1/production/controlled-idempotency-drill-runbook",
  "/api/v1/production/cross-project-release-verification-intake-gate",
  "/api/v1/production/cross-project-release-bundle-gate",
  "/api/v1/production/environment-preflight-checklist",
  "/api/v1/production/post-v166-readiness-summary",
  "/api/v1/production/deployment-evidence-intake-gate",
  "/api/v1/production/deployment-evidence-verification",
  "/api/v1/production/release-window-readiness-packet",
  "/api/v1/production/release-dry-run-envelope",
  "/api/v1/production/release-handoff-readiness-review",
  "/api/v1/production/cross-project-evidence-retention-gate",
  "/api/v1/production/release-pre-approval-packet",
  "/api/v1/production/approval-decision-prerequisite-gate",
  "/api/v1/production/approval-ledger-dry-run-envelope",
  "/api/v1/production/release-approval-decision-rehearsal-packet",
  "/api/v1/production/real-read-rehearsal-intake",
] as const;

describe("maintainability hotspot parity", () => {
  it("freezes dashboard markup and full-page bytes before extraction", () => {
    const html = dashboardHtml();

    expect(dashboardMarkup).toHaveLength(38_137);
    expect(digest(dashboardMarkup)).toBe(
      "9c5bd6bd231afd62cd27fca0ecd46c55236cc8e6e1af67cc83a4f9b3221925dc",
    );
    expect(html).toHaveLength(95_724);
    expect(digest(html)).toBe(
      "b2caa97b5be6bc7d44b35777d40e5c43cb9ef00cf77d338bab47951ef1882197",
    );
  });

  it("freezes the 34 remaining status GET paths before extraction", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      expect(MIGRATED_STATUS_GET_PATHS).toHaveLength(34);
      expect(new Set(MIGRATED_STATUS_GET_PATHS).size).toBe(34);
      for (const url of MIGRATED_STATUS_GET_PATHS) {
        expect(app.hasRoute({ method: "GET", url }), url).toBe(true);
      }
    } finally {
      await app.close();
    }
  });
});

function digest(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
