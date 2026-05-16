import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AuditLog } from "../src/services/auditLog.js";
import {
  describeAuditStoreRuntime,
} from "../src/services/auditStoreFactory.js";
import {
  loadManagedAuditPersistenceDryRunVerification,
} from "../src/services/managedAuditPersistenceDryRunVerification.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("managed audit persistence dry-run verification", () => {
  it("writes, queries, digests, and cleans up one local dry-run audit record", async () => {
    const config = loadTestConfig();
    const profile = await loadManagedAuditPersistenceDryRunVerification({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-persistence-dry-run-verification.v1",
      verificationState: "dry-run-verified",
      readyForManagedAuditPersistenceDryRunVerification: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      upstreamReadOnly: true,
      localDryRunWritePerformed: true,
      executionAllowed: false,
      sourceCandidate: {
        profileVersion: "managed-audit-persistence-boundary-candidate.v1",
        candidateState: "ready-for-managed-audit-dry-run",
        javaHandoffHintVersion: "java-release-approval-rehearsal-audit-persistence-handoff-hint.v1",
        miniKvProvenanceDigest: "fnv1a64:c1c0896fc6b77fe2",
      },
      dryRunRecord: {
        recordVersion: "managed-audit-dry-run-record.v1",
        requestId: "managed-audit-dry-run-v209-request",
        operatorId: "operator:v209-dry-run",
        eventType: "MANAGED_AUDIT_DRY_RUN_APPEND_QUERY_DIGEST",
        source: {
          nodeSourceVersion: "Node v209",
          candidateSourceVersion: "Node v208",
          javaSourceVersion: "Java v74",
          miniKvSourceVersion: "mini-kv v83",
        },
        boundaries: {
          nodeTempDirectoryOnly: true,
          upstreamReadOnly: true,
          javaWriteAllowed: false,
          miniKvWriteAllowed: false,
          externalAuditSystemAllowed: false,
          productionAuditRecordAllowed: false,
        },
      },
      verification: {
        dryRunRootLabel: ".tmp",
        dryRunDirectoryPrefix: "managed-audit-v209-",
        dryRunDirectoryCreated: true,
        dryRunDirectoryRemoved: true,
        dryRunFileName: "audit-dry-run.jsonl",
        appendRecordCount: 1,
        queryByRequestIdCount: 1,
        javaWriteAttempted: false,
        miniKvWriteAttempted: false,
        externalAuditSystemAccessed: false,
        productionAuditRecordAllowed: false,
      },
      checks: {
        sourceCandidateReady: true,
        sourceCandidateDigestValid: true,
        sourceCandidateStillBlocksProduction: true,
        tempDirectoryOnly: true,
        appendCovered: true,
        queryCovered: true,
        digestCovered: true,
        cleanupCovered: true,
        javaMiniKvWriteBlocked: true,
        externalAuditSystemNotAccessed: true,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        productionAuditStillBlocked: true,
        readyForManagedAuditPersistenceDryRunVerification: true,
      },
      summary: {
        appendRecordCount: 1,
        queryResultCount: 1,
        productionBlockerCount: 0,
      },
    });
    expect(profile.sourceCandidate.candidateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.dryRunRecord.recordId).toMatch(/^[0-9a-f-]{36}$/);
    expect(profile.dryRunRecord.payloadDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.digestBeforeAppend).not.toBe(profile.verification.digestAfterAppend);
    expect(profile.verification.digestAfterAppend).toBe(profile.verification.digestAfterRepeatRead);
    expect(profile.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "START_NODE_V210_IDENTITY_APPROVAL_BINDING",
    );
    expect(profile.verification.dryRunDirectoryRemoved).toBe(true);
  });

  it("blocks when upstream actions are enabled", async () => {
    const config = loadTestConfig({
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const profile = await loadManagedAuditPersistenceDryRunVerification({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditPersistenceDryRunVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.verification.dryRunDirectoryRemoved).toBe(true);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-persistence-dry-run-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-persistence-dry-run-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-persistence-dry-run-verification.v1",
        verificationState: "dry-run-verified",
        readyForManagedAuditPersistenceDryRunVerification: true,
        readyForProductionAudit: false,
        verification: {
          dryRunDirectoryRemoved: true,
          appendRecordCount: 1,
          queryByRequestIdCount: 1,
        },
        checks: {
          appendCovered: true,
          queryCovered: true,
          digestCovered: true,
          cleanupCovered: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit persistence dry-run verification");
      expect(markdown.body).toContain("append-query-digest-cleanup");
      expect(markdown.body).toContain("START_NODE_V210_IDENTITY_APPROVAL_BINDING");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-209",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v209-managed-audit-dry-run",
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
    PORT: "4306",
    ...overrides,
  });
}

class ThrowingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit dry-run verification must not call Java");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit dry-run verification must not call Java");
  }

  releaseApprovalRehearsal(): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
    throw new Error("managed audit dry-run verification must not call Java");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit dry-run verification must not call mini-kv");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("managed audit dry-run verification must not call mini-kv");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("managed audit dry-run verification must not call mini-kv");
  }

  execute(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit dry-run verification must not call mini-kv");
  }
}
