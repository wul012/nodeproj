import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionEvidenceChecklist,
} from "../src/services/managedAuditManualSandboxConnectionEvidenceChecklist.js";

describe("managed audit manual sandbox connection evidence checklist", () => {
  it("consumes Node v226, Java v86, and mini-kv v95 evidence without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionEvidenceChecklist({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-evidence-checklist.v1",
      checklistState: "manual-sandbox-connection-evidence-checklist-ready",
      readyForManagedAuditManualSandboxConnectionEvidenceChecklist: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyChecklist: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV226: {
        sourceVersion: "Node v226",
        profileVersion: "managed-audit-manual-sandbox-adapter-connection-runbook.v1",
        runbookState: "manual-sandbox-connection-runbook-ready",
        readyForRunbook: true,
        readyForConnectionFromSource: false,
        checklistStepCount: 8,
        forbiddenOperationCount: 8,
        pauseConditionCount: 8,
        failureClassCount: 8,
      },
      upstreamEvidence: {
        javaV86: {
          sourceVersion: "Java v86",
          headTag: "v86订单平台release-approval-rehearsal-internal-boolean-flags",
          evidencePresent: true,
          contractPreservingRefactor: true,
          builderFlagsApplied: true,
          responseShapeUnchanged: true,
          schemaVersionUnchanged: true,
          noLedgerWriteBoundary: true,
          noSqlBoundary: true,
          noCredentialBoundary: true,
          readyForNodeV227EvidenceChecklist: true,
        },
        miniKvV95: {
          sourceVersion: "mini-kv v95",
          headTag: "第九十五版字符串工具共享拆分",
          evidencePresent: true,
          projectVersion: "0.97.0",
          releaseVersion: "v97",
          currentArtifactPathHint: "c/97/",
          receiptDigest: "fnv1a64:d71b79804d9cfd94",
          preservedV95ReceiptDigest: "fnv1a64:ceaed265f7f9560c",
          stringUtilsSharedSplit: true,
          commandCppUnderOneThousandLines: true,
          readOnly: true,
          executionAllowed: false,
          sandboxAdapterStorageBackend: false,
          credentialValueReadAllowed: false,
          sandboxManagedAuditStateWriteAllowed: false,
          readyForNodeV227EvidenceChecklist: true,
        },
      },
      verification: {
        evidenceSpan: "Node v226 + Java v86 + mini-kv v95",
        verificationMode: "manual-sandbox-evidence-checklist-only",
        javaAndMiniKvConsumed: true,
        connectionExecutionAllowed: false,
        credentialValueRequired: false,
        schemaMigrationExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        automaticServiceStartAllowed: false,
        nodeV227BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV226RunbookReady: true,
        sourceNodeV226StillBlocksConnection: true,
        javaV86EvidencePresent: true,
        javaV86ContractPreservingRefactorAccepted: true,
        javaV86NoWriteNoSqlNoCredentialBoundaryAccepted: true,
        miniKvV95EvidencePresent: true,
        miniKvV95RuntimeFixtureAccepted: true,
        miniKvV95SandboxNonStorageBoundaryAccepted: true,
        miniKvV95QualitySplitAccepted: true,
        evidenceChecklistComplete: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        automaticServiceStartStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionEvidenceChecklist: true,
      },
      summary: {
        evidenceFileCount: 6,
        matchedSnippetCount: 14,
        checklistItemCount: 8,
        requiredChecklistItemCount: 8,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV226.runbookDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.checklistDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.evidenceChecklist.every((item) => item.verified)).toBe(true);
  });

  it("blocks the checklist when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionEvidenceChecklist({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.checklistState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionEvidenceChecklist).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.verification.connectionExecutionAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes for v227 evidence checklist", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-evidence-checklist.v1",
        checklistState: "manual-sandbox-connection-evidence-checklist-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection evidence checklist");
      expect(markdown.body).toContain("CHECKLIST_ONLY_NO_CONNECTION");
      expect(markdown.body).toContain("mini-kv v95");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-227",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v227-evidence-checklist",
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
    PORT: "4320",
    ...overrides,
  });
}
