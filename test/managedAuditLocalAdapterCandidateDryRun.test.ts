import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  LocalJsonlManagedAuditAdapterCandidate,
  loadManagedAuditLocalAdapterCandidateDryRun,
} from "../src/services/managedAuditLocalAdapterCandidateDryRun.js";

describe("managed audit local adapter candidate dry-run", () => {
  it("consumes Node v220, Java v80, and mini-kv v89 while keeping the dry-run local", async () => {
    const profile = await loadManagedAuditLocalAdapterCandidateDryRun({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-local-adapter-candidate-dry-run.v1",
      candidateState: "local-adapter-dry-run-verified",
      readyForManagedAuditLocalAdapterCandidateDryRun: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      automaticUpstreamStart: false,
      sourceDisabledShell: {
        sourceVersion: "Node v220",
        profileVersion: "managed-audit-adapter-disabled-shell.v1",
        shellState: "disabled-shell-ready",
        readyForDisabledShell: true,
        selectedAdapterKind: "disabled",
      },
      upstreamReceipts: {
        javaV80: {
          sourceVersion: "Java v80",
          receiptVersion: "java-release-approval-rehearsal-managed-audit-adapter-implementation-guard-receipt.v1",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v14",
          consumedByNodeDisabledShellVersion: "Node v220",
          nextNodeCandidateVersion: "Node v221",
          readyForNodeV221LocalAdapterCandidateDryRun: true,
          nodeV220SelectedAdapterDisabled: true,
          nodeV220AppendWritten: false,
          nodeV220ExternalManagedAuditAccessed: false,
          nodeV220LocalDryRunWritePerformed: false,
          javaApprovalLedgerWritten: false,
          javaManagedAuditStoreWritten: false,
          javaSqlExecuted: false,
          nodeMayTreatAsProductionAuditRecord: false,
        },
        miniKvV89: {
          sourceVersion: "mini-kv v89",
          projectVersion: "0.89.0",
          receiptDigest: "fnv1a64:76411286a0913dc8",
          adapterShellStorageBackend: false,
          storageBackendAllowed: false,
          managedAuditWriteExecuted: false,
          localDryRunRecordsWritten: false,
          orderAuthoritative: false,
          readOnly: true,
          executionAllowed: false,
          readyForNodeV221LocalAdapterCandidateDryRun: true,
        },
      },
      candidateAdapter: {
        adapterName: "LocalJsonlManagedAuditAdapterCandidate",
        adapterKind: "local-dry-run",
        targetStore: "node-local-temp-jsonl",
        localTempOnly: true,
        productionStoreTouched: false,
        externalManagedAuditAccessed: false,
      },
      verification: {
        dryRunRootLabel: ".tmp",
        dryRunDirectoryPrefix: "managed-audit-v221-",
        dryRunDirectoryCreated: true,
        dryRunDirectoryRemoved: true,
        appendStatus: "appended",
        appendAccepted: true,
        appendWritten: true,
        queryStatus: "queried",
        queryByRequestIdCount: 1,
        adapterHealthStatus: "healthy",
        adapterDescriptionKind: "local-dry-run",
        javaWriteAttempted: false,
        miniKvWriteAttempted: false,
        externalManagedAuditAccessed: false,
        productionAuditRecordAllowed: false,
      },
      checks: {
        sourceDisabledShellReady: true,
        javaV80ReceiptAccepted: true,
        javaV80NoWriteBoundaryValid: true,
        miniKvV89ReceiptAccepted: true,
        miniKvV89NonStorageBoundaryValid: true,
        localTempDirectoryOnly: true,
        localDryRunAppendCovered: true,
        localDryRunQueryCovered: true,
        localDryRunDigestCovered: true,
        localDryRunCleanupCovered: true,
        noExternalManagedAuditAccessed: true,
        javaMiniKvWriteBlocked: true,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        productionAuditStillBlocked: true,
        readyForManagedAuditLocalAdapterCandidateDryRun: true,
      },
      summary: {
        appendRecordCount: 1,
        queryResultCount: 1,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.upstreamReceipts.javaV80.guardDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.dryRunRecord.recordId).toMatch(/^[0-9a-f-]{36}$/);
    expect(profile.dryRunRecord.recordDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.candidateVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.digestBeforeAppend).not.toBe(profile.verification.digestAfterAppend);
    expect(profile.verification.digestAfterAppend).toBe(profile.verification.digestAfterRepeatRead);
    await expectNoV221TempDirs();
  });

  it("appends, queries, and digests through the local candidate adapter", async () => {
    const root = path.join(process.cwd(), ".tmp", "managed-audit-v221-direct-test");
    const adapter = new LocalJsonlManagedAuditAdapterCandidate(root);
    try {
      const before = await adapter.digest();
      const append = await adapter.append({
        requestId: "request-v221-direct",
        eventType: "DIRECT_LOCAL_DRY_RUN",
        payload: { production: false },
      });
      const query = await adapter.query({ requestId: "request-v221-direct" });
      const after = await adapter.digest();
      const repeat = await adapter.digest();
      const health = await adapter.health();
      const description = await adapter.describe();

      expect(before.recordCount).toBe(0);
      expect(append).toMatchObject({
        status: "appended",
        accepted: true,
        written: true,
      });
      expect(query).toMatchObject({
        status: "queried",
        recordCount: 1,
      });
      expect(after.recordCount).toBe(1);
      expect(after.digest).toBe(repeat.digest);
      expect(health).toMatchObject({
        status: "healthy",
        writable: true,
        externalConnectionAttempted: false,
      });
      expect(description).toMatchObject({
        adapterName: "LocalJsonlManagedAuditAdapterCandidate",
        adapterKind: "local-dry-run",
        externalConnectionEnabled: false,
        localDryRunEnabled: true,
      });
    } finally {
      if (existsSync(root)) {
        await import("node:fs/promises").then(({ rm }) => rm(root, { recursive: true, force: true }));
      }
    }
  });

  it("blocks when upstream actions are enabled while still cleaning up local dry-run files", async () => {
    const profile = await loadManagedAuditLocalAdapterCandidateDryRun({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.candidateState).toBe("blocked");
    expect(profile.readyForManagedAuditLocalAdapterCandidateDryRun).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.verification.dryRunDirectoryRemoved).toBe(true);
    expect(profile.readyForProductionAudit).toBe(false);
    await expectNoV221TempDirs();
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-local-adapter-candidate-dry-run",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-local-adapter-candidate-dry-run?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-local-adapter-candidate-dry-run.v1",
        candidateState: "local-adapter-dry-run-verified",
        readyForProductionAudit: false,
        connectsManagedAudit: false,
        upstreamReceipts: {
          javaV80: {
            readyForNodeV221LocalAdapterCandidateDryRun: true,
          },
          miniKvV89: {
            receiptDigest: "fnv1a64:76411286a0913dc8",
            adapterShellStorageBackend: false,
          },
        },
        verification: {
          appendWritten: true,
          queryByRequestIdCount: 1,
          dryRunDirectoryRemoved: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit local adapter candidate dry-run");
      expect(markdown.body).toContain("Java v80");
      expect(markdown.body).toContain("mini-kv v89");
      expect(markdown.body).toContain("LOCAL_DRY_RUN_ONLY");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-221",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v221-local-adapter",
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
    AUDIT_STORE_KIND: "memory",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4316",
    ...overrides,
  });
}

async function expectNoV221TempDirs() {
  const tmpRoot = path.join(process.cwd(), ".tmp");
  if (!existsSync(tmpRoot)) {
    return;
  }
  const entries = await readdir(tmpRoot);
  expect(entries.filter((entry) => entry.startsWith("managed-audit-v221-"))).toEqual([]);
}
