import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditLocalAdapterCandidateVerificationReport,
} from "../src/services/managedAuditLocalAdapterCandidateVerificationReport.js";

describe("managed audit local adapter candidate verification report", () => {
  it("verifies the v221 archive without rerunning the local adapter candidate dry-run", () => {
    const profile = loadManagedAuditLocalAdapterCandidateVerificationReport({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-local-adapter-candidate-verification-report.v1",
      reportState: "local-adapter-candidate-verification-ready",
      readyForManagedAuditLocalAdapterCandidateVerificationReport: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyReport: true,
      sourceLocalDryRunWriteObserved: true,
      additionalLocalDryRunWritePerformed: false,
      sourceEndpointRerunPerformed: false,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      automaticUpstreamStart: false,
      sourceArchive: {
        sourceVersion: "Node v221",
        sourceProfileVersion: "managed-audit-local-adapter-candidate-dry-run.v1",
        archiveRoot: "c/221/",
        activePlan: "docs/plans/v221-post-local-adapter-candidate-roadmap.md",
      },
      verification: {
        evidenceSpan: "Node v221 local adapter candidate dry-run archive",
        sourceCandidateState: "local-adapter-dry-run-verified",
        sourceDisabledShellVersion: "Node v220",
        sourceJavaVersion: "Java v80",
        sourceMiniKvVersion: "mini-kv v89",
        sourceMiniKvReceiptDigest: "fnv1a64:76411286a0913dc8",
        sourceAppendRecordCount: 1,
        sourceQueryByRequestIdCount: 1,
        sourceDryRunDirectoryRemoved: true,
        sourceConnectsManagedAudit: false,
        sourceProductionAuditAllowed: false,
        upstreamActionsEnabled: false,
        reportReadsFilesOnly: true,
        sourceEndpointRerunPerformed: false,
        additionalLocalDryRunWritePerformed: false,
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
        sourceRecordShapeRecorded: true,
        sourceDigestLinkageRecorded: true,
        sourceCleanupEvidenceRecorded: true,
        javaV80GuardLinkageRecorded: true,
        miniKvV89GuardLinkageRecorded: true,
        forbiddenOperationsRecorded: true,
        previousPlanClosedOut: true,
        activePlanPointsToV222: true,
        activePlanRequiresParallelJavaMiniKvGuards: true,
        noSourceEndpointRerun: true,
        noAdditionalLocalDryRunWrite: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        restoreExecutionStillBlocked: true,
        readyForManagedAuditLocalAdapterCandidateVerificationReport: true,
      },
      summary: {
        archiveFileCount: 6,
        snippetMatchCount: 18,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.verification.reportDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archivedEvidence.files.every((file) => file.exists && file.sizeBytes > 0 && file.digest?.length === 64)).toBe(true);
    expect(profile.archivedEvidence.snippetMatches.every((snippet) => snippet.matched)).toBe(true);
  });

  it("blocks when upstream actions are enabled while remaining read-only", () => {
    const profile = loadManagedAuditLocalAdapterCandidateVerificationReport({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reportState).toBe("blocked");
    expect(profile.readyForManagedAuditLocalAdapterCandidateVerificationReport).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.additionalLocalDryRunWritePerformed).toBe(false);
    expect(profile.sourceEndpointRerunPerformed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readyForProductionAudit).toBe(false);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-local-adapter-candidate-verification-report",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-local-adapter-candidate-verification-report?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-local-adapter-candidate-verification-report.v1",
        reportState: "local-adapter-candidate-verification-ready",
        readyForProductionAudit: false,
        sourceEndpointRerunPerformed: false,
        additionalLocalDryRunWritePerformed: false,
        checks: {
          sourceCleanupEvidenceRecorded: true,
          noSourceEndpointRerun: true,
          noAdditionalLocalDryRunWrite: true,
          restoreExecutionStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit local adapter candidate verification report");
      expect(markdown.body).toContain("local-adapter-candidate-verification-ready");
      expect(markdown.body).toContain("RUN_PARALLEL_EXTERNAL_ADAPTER_GUARDS");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-222",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v222-verification-report",
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
    PORT: "4317",
    ...overrides,
  });
}
