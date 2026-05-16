import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditDryRunAdapterCandidate,
} from "../src/services/managedAuditDryRunAdapterCandidate.js";

describe("managed audit dry-run adapter candidate", () => {
  it("writes, queries, digests, and cleans up one local JSONL adapter record", async () => {
    const profile = await loadManagedAuditDryRunAdapterCandidate({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-dry-run-adapter-candidate.v1",
      candidateState: "local-dry-run-adapter-verified",
      readyForManagedAuditDryRunAdapterCandidate: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      upstreamReadOnly: true,
      localDryRunWritePerformed: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      automaticUpstreamStart: false,
      sourceArchiveVerification: {
        profileVersion: "managed-audit-restore-drill-archive-verification.v1",
        verificationState: "verified-restore-drill-archive",
        sourceVersion: "Node v213",
        archiveVerificationVersion: "Node v214",
      },
      upstreamReceipts: {
        javaV77: {
          sourceVersion: "Java v77",
          receiptVersion: "java-release-approval-rehearsal-managed-audit-adapter-boundary-receipt.v1",
          nextNodeCandidateVersion: "Node v215",
          nodeV215MayConsume: true,
          nodeV215MayWriteLocalDryRunFiles: true,
          nodeV215MayConnectManagedAudit: false,
          nodeV215MayCreateApprovalDecision: false,
          nodeV215MayWriteApprovalLedger: false,
          nodeV215MayExecuteSql: false,
          nodeV215MayTriggerDeployment: false,
          nodeV215MayTriggerRollback: false,
          nodeV215MayExecuteRestore: false,
          readyForNodeV215DryRunAdapterCandidate: true,
          receiptWarnings: [],
        },
        miniKvV86: {
          sourceVersion: "mini-kv v86",
          projectVersion: "0.86.0",
          consumer: "Node v215 managed audit dry-run adapter candidate",
          consumedReleaseVersion: "v85",
          consumedMarkerDigest: "fnv1a64:1ea4570c967cfdb1",
          currentArtifactPathHint: "c/86/",
          receiptDigest: "fnv1a64:f39d8e3ef98654ea",
          adapterWriteAllowed: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          managedAuditWriteExecuted: false,
          orderAuthoritative: false,
          readyForNodeV215DryRunAdapterCandidate: true,
        },
      },
      dryRunAdapterRecord: {
        recordVersion: "managed-audit-dry-run-adapter-record.v1-candidate",
        requestId: "managed-audit-v215-dry-run-adapter-request",
        adapter: {
          adapterName: "node-local-jsonl-managed-audit-dry-run-adapter",
          adapterMode: "local-jsonl-dry-run-only",
          targetStore: "node-local-temp-file",
          sourceArchiveVerificationVersion: "Node v214",
          javaReceiptVersion: "Java v77",
          miniKvReceiptVersion: "mini-kv v86",
        },
        writeEnvelope: {
          operation: "append-managed-audit-dry-run-record",
          localTempOnly: true,
          productionStoreTouched: false,
          externalAuditSystemTouched: false,
        },
        approvalBoundary: {
          approvalDecisionCreated: false,
          approvalLedgerWritten: false,
          approvalRecordPersisted: false,
          javaSqlExecuted: false,
          deploymentTriggered: false,
          rollbackTriggered: false,
        },
        restoreBoundary: {
          miniKvLoadExecuted: false,
          miniKvCompactExecuted: false,
          miniKvSetnxexExecuted: false,
          miniKvRestoreExecuted: false,
          restoreExecuted: false,
        },
        boundaries: {
          upstreamReadOnly: true,
          nodeTempDirectoryOnly: true,
          javaWriteAllowed: false,
          miniKvWriteAllowed: false,
          externalAuditSystemAllowed: false,
          productionAuditRecordAllowed: false,
        },
      },
      verification: {
        dryRunRootLabel: ".tmp",
        dryRunDirectoryPrefix: "managed-audit-v215-",
        dryRunDirectoryCreated: true,
        dryRunDirectoryRemoved: true,
        dryRunFileName: "managed-audit-adapter-candidate.jsonl",
        appendRecordCount: 1,
        queryByRequestIdCount: 1,
        javaWriteAttempted: false,
        miniKvWriteAttempted: false,
        externalAuditSystemAccessed: false,
        realApprovalDecisionCreated: false,
        realApprovalLedgerWritten: false,
        restoreExecuted: false,
        productionAuditRecordAllowed: false,
      },
      checks: {
        sourceArchiveVerificationReady: true,
        sourceArchiveStillBlocksProduction: true,
        javaV77ReceiptAccepted: true,
        javaV77NoWriteBoundaryValid: true,
        miniKvV86ReceiptAccepted: true,
        miniKvV86NoRestoreBoundaryValid: true,
        adapterRecordShapeValid: true,
        adapterDigestValid: true,
        tempDirectoryOnly: true,
        appendCovered: true,
        queryCovered: true,
        digestCovered: true,
        cleanupCovered: true,
        javaMiniKvWriteBlocked: true,
        noRealApprovalDecisionCreated: true,
        noExternalManagedAuditAccessed: true,
        restoreStillBlocked: true,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        productionAuditStillBlocked: true,
        readyForManagedAuditDryRunAdapterCandidate: true,
      },
      summary: {
        appendRecordCount: 1,
        queryResultCount: 1,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceArchiveVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.dryRunAdapterRecord.recordId).toMatch(/^[0-9a-f-]{36}$/);
    expect(profile.dryRunAdapterRecord.recordDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.adapterVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.digestBeforeAppend).not.toBe(profile.verification.digestAfterAppend);
    expect(profile.verification.digestAfterAppend).toBe(profile.verification.digestAfterRepeatRead);
    expect(await listV215TempDirectories()).toEqual([]);
  });

  it("blocks when upstream actions are enabled", async () => {
    const profile = await loadManagedAuditDryRunAdapterCandidate({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.candidateState).toBe("blocked");
    expect(profile.readyForManagedAuditDryRunAdapterCandidate).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.verification.dryRunDirectoryRemoved).toBe(true);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.restoreExecutionAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-dry-run-adapter-candidate",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-dry-run-adapter-candidate?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-dry-run-adapter-candidate.v1",
        candidateState: "local-dry-run-adapter-verified",
        readyForProductionAudit: false,
        connectsManagedAudit: false,
        dryRunAdapterRecord: {
          adapter: {
            adapterMode: "local-jsonl-dry-run-only",
          },
          boundaries: {
            productionAuditRecordAllowed: false,
          },
        },
        verification: {
          appendRecordCount: 1,
          queryByRequestIdCount: 1,
          dryRunDirectoryRemoved: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit dry-run adapter candidate");
      expect(markdown.body).toContain("local-jsonl-dry-run-only");
      expect(markdown.body).toContain("VERIFY_V215_ARCHIVE");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-215",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v215-dry-run-adapter",
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
    PORT: "4312",
    ...overrides,
  });
}

async function listV215TempDirectories(): Promise<string[]> {
  const root = path.resolve(process.cwd(), ".tmp");
  if (!existsSync(root)) {
    return [];
  }

  return (await readdir(root, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("managed-audit-v215-"))
    .map((entry) => entry.name);
}
