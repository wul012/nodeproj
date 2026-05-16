import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditRestoreDrillArchiveVerification,
} from "../src/services/managedAuditRestoreDrillArchiveVerification.js";

describe("managed audit restore drill archive verification", () => {
  it("verifies the v213 archive without rerunning upstream or restore logic", () => {
    const profile = loadManagedAuditRestoreDrillArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-restore-drill-archive-verification.v1",
      verificationState: "verified-restore-drill-archive",
      readyForManagedAuditRestoreDrillArchiveVerification: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyVerification: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      archiveVerificationRerunsSourceEndpoint: false,
      automaticUpstreamStart: false,
      sourceArchive: {
        sourceVersion: "Node v213",
        sourceProfileVersion: "managed-audit-packet-restore-drill-plan.v1",
        archiveRoot: "c/213/",
        htmlArchive: "c/213/managed-audit-packet-restore-drill-plan-v213.html",
        activePlan: "docs/plans/v213-post-restore-drill-plan-roadmap.md",
      },
      verification: {
        evidenceSpan: "Node v213 restore drill plan archive",
        sourceDrillState: "ready-for-manual-dry-run-plan",
        sourcePlanMode: "manual-dry-run-plan-only",
        sourcePacketSourceVersion: "Node v211",
        sourceVerificationSourceVersion: "Node v212",
        sourceJavaReceiptVersion: "Java v76",
        sourceMiniKvReceiptVersion: "mini-kv v85",
        sourceMiniKvMarkerDigest: "fnv1a64:1ea4570c967cfdb1",
        sourceRestoreExecutionAllowed: false,
        sourceConnectsManagedAudit: false,
        sourceAutomaticUpstreamStart: false,
        upstreamActionsEnabled: false,
        productionAuditAllowed: false,
        archiveVerificationReadsFilesOnly: true,
      },
      checks: {
        archiveFilesPresent: true,
        archiveFilesNonEmpty: true,
        screenshotPresent: true,
        screenshotNonEmpty: true,
        htmlArchivePresent: true,
        explanationPresent: true,
        walkthroughPresent: true,
        sourceDrillStateRecorded: true,
        sourceReceiptsRecorded: true,
        httpSmokeRecorded: true,
        forbiddenOperationsRecorded: true,
        normalizedEvidenceHintsRecorded: true,
        previousPlanClosedOut: true,
        activePlanPointsToV214: true,
        activePlanAllowsParallelJavaMiniKvReceipts: true,
        noArchiveVerificationUpstreamRerun: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        restoreExecutionStillBlocked: true,
        readyForManagedAuditRestoreDrillArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 6,
        snippetMatchCount: 18,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archivedEvidence.files.every((file) => file.exists && file.sizeBytes > 0 && file.digest?.length === 64)).toBe(true);
    expect(profile.archivedEvidence.snippetMatches.every((snippet) => snippet.matched)).toBe(true);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditRestoreDrillArchiveVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditRestoreDrillArchiveVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.restoreExecutionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-restore-drill-archive-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-restore-drill-archive-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-restore-drill-archive-verification.v1",
        verificationState: "verified-restore-drill-archive",
        readyForProductionAudit: false,
        restoreExecutionAllowed: false,
        checks: {
          sourceReceiptsRecorded: true,
          normalizedEvidenceHintsRecorded: true,
          restoreExecutionStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit restore drill archive verification");
      expect(markdown.body).toContain("verified-restore-drill-archive");
      expect(markdown.body).toContain("archiveFilesPresent: true");
      expect(markdown.body).toContain("RUN_PARALLEL_UPSTREAM_RECEIPTS");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-214",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v214-archive-verification",
  };
}

function loadTestConfig(overrides: Record<string, string> = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4311",
    ...overrides,
  });
}
