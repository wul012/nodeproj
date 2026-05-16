import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditDryRunAdapterArchiveVerification,
} from "../src/services/managedAuditDryRunAdapterArchiveVerification.js";

describe("managed audit dry-run adapter archive verification", () => {
  it("verifies the v215 archive without rerunning the local dry-run adapter", () => {
    const profile = loadManagedAuditDryRunAdapterArchiveVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-dry-run-adapter-archive-verification.v1",
      verificationState: "verified-dry-run-adapter-archive",
      readyForManagedAuditDryRunAdapterArchiveVerification: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyVerification: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      archiveVerificationRerunsSourceEndpoint: false,
      localDryRunWritePerformed: false,
      automaticUpstreamStart: false,
      sourceArchive: {
        sourceVersion: "Node v215",
        sourceProfileVersion: "managed-audit-dry-run-adapter-candidate.v1",
        archiveRoot: "c/215/",
        activePlan: "docs/plans/v215-post-dry-run-adapter-roadmap.md",
      },
      verification: {
        evidenceSpan: "Node v215 dry-run adapter candidate archive",
        sourceCandidateState: "local-dry-run-adapter-verified",
        sourceArchiveVerificationVersion: "Node v214",
        sourceJavaReceiptVersion: "Java v77",
        sourceMiniKvReceiptVersion: "mini-kv v86",
        sourceMiniKvReceiptDigest: "fnv1a64:f39d8e3ef98654ea",
        sourceAppendRecordCount: 1,
        sourceQueryByRequestIdCount: 1,
        sourceDryRunDirectoryRemoved: true,
        sourceRestoreExecutionAllowed: false,
        sourceConnectsManagedAudit: false,
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
        sourceCandidateStateRecorded: true,
        sourceReceiptsRecorded: true,
        localJsonlDryRunRecorded: true,
        appendQueryDigestCleanupRecorded: true,
        forbiddenOperationsRecorded: true,
        previousPlanClosedOut: true,
        activePlanPointsToV216: true,
        activePlanAllowsParallelJavaMiniKvReceipts: true,
        noArchiveVerificationUpstreamRerun: true,
        noArchiveVerificationLocalDryRunRerun: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        restoreExecutionStillBlocked: true,
        readyForManagedAuditDryRunAdapterArchiveVerification: true,
      },
      summary: {
        archiveFileCount: 6,
        snippetMatchCount: 21,
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
    const profile = loadManagedAuditDryRunAdapterArchiveVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditDryRunAdapterArchiveVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.localDryRunWritePerformed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-dry-run-adapter-archive-verification.v1",
        verificationState: "verified-dry-run-adapter-archive",
        readyForProductionAudit: false,
        localDryRunWritePerformed: false,
        checks: {
          appendQueryDigestCleanupRecorded: true,
          noArchiveVerificationLocalDryRunRerun: true,
          restoreExecutionStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit dry-run adapter archive verification");
      expect(markdown.body).toContain("verified-dry-run-adapter-archive");
      expect(markdown.body).toContain("RUN_PARALLEL_PRODUCTION_PREREQUISITE_RECEIPTS");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-216",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v216-archive-verification",
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
    PORT: "4313",
    ...overrides,
  });
}
