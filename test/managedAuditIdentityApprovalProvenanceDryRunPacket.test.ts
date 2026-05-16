import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AuditLog } from "../src/services/auditLog.js";
import {
  describeAuditStoreRuntime,
} from "../src/services/auditStoreFactory.js";
import {
  loadManagedAuditIdentityApprovalProvenanceDryRunPacket,
} from "../src/services/managedAuditIdentityApprovalProvenanceDryRunPacket.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("managed audit identity approval provenance dry-run packet", () => {
  it("writes and verifies one local packet with Java v75 and mini-kv v84 provenance", async () => {
    const config = loadTestConfig();
    const profile = await loadManagedAuditIdentityApprovalProvenanceDryRunPacket({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-identity-approval-provenance-dry-run-packet.v1",
      packetState: "dry-run-packet-verified",
      readyForManagedAuditIdentityApprovalProvenanceDryRunPacket: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      upstreamReadOnly: true,
      localDryRunWritePerformed: true,
      executionAllowed: false,
      sourceBindingContract: {
        profileVersion: "managed-audit-identity-approval-binding-contract.v1",
        contractState: "ready-for-identity-approval-dry-run-packet",
        targetRecordVersion: "managed-audit-dry-run-record.v2-candidate",
      },
      upstreamEvidence: {
        javaV75: {
          sourceVersion: "Java v75",
          hintVersion: "java-release-approval-rehearsal-approval-record-handoff-hint.v1",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v9",
          approvalRecordHandoffContextComplete: true,
          javaApprovalDecisionCreated: false,
          javaApprovalLedgerWritten: false,
          javaApprovalRecordPersisted: false,
          nodeMayTreatAsProductionApprovalRecord: false,
        },
        miniKvV84: {
          sourceVersion: "mini-kv v84",
          projectVersion: "0.84.0",
          artifactPathHint: "c/84/",
          retentionSourcePathHint: "c/81/",
          expectedBinaryProvenanceDigest: "fnv1a64:c682f9c827129e40",
          retentionProvenanceCheckDigest: "fnv1a64:357cc7e9eec3f223",
          readOnly: true,
          executionAllowed: false,
          managedAuditWriteExecuted: false,
          orderAuthoritative: false,
        },
      },
      dryRunPacket: {
        packetVersion: "managed-audit-dry-run-record.v2-candidate",
        requestId: "managed-audit-v211-identity-approval-provenance-request",
        source: {
          nodeSourceVersion: "Node v211",
          bindingContractVersion: "Node v210",
          javaSourceVersion: "Java v75",
          miniKvSourceVersion: "mini-kv v84",
        },
        identity: {
          operatorId: "operator:v211-dry-run",
          authenticated: true,
          roles: ["auditor", "operator"],
          authSource: "headers",
        },
        approvalDecision: {
          decisionId: "approval-decision-v211-dry-run",
          decision: "approved",
          upstreamTouched: false,
        },
        provenance: {
          javaApprovalRecordHandoffHintVersion: "java-release-approval-rehearsal-approval-record-handoff-hint.v1",
          javaApprovalDecisionCreated: false,
          javaApprovalLedgerWritten: false,
          javaApprovalRecordPersisted: false,
          miniKvRetentionProvenanceCheckDigest: "fnv1a64:357cc7e9eec3f223",
          miniKvManagedAuditWriteExecuted: false,
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
        dryRunDirectoryPrefix: "managed-audit-v211-",
        dryRunDirectoryCreated: true,
        dryRunDirectoryRemoved: true,
        dryRunFileName: "managed-audit-packet.jsonl",
        appendPacketCount: 1,
        queryByRequestIdCount: 1,
        javaWriteAttempted: false,
        miniKvWriteAttempted: false,
        externalAuditSystemAccessed: false,
        realApprovalDecisionCreated: false,
        realApprovalLedgerWritten: false,
        productionAuditRecordAllowed: false,
      },
      checks: {
        sourceBindingContractReady: true,
        sourceBindingContractStillBlocksProduction: true,
        javaV75HandoffAccepted: true,
        javaV75NoWriteBoundaryValid: true,
        miniKvV84ProvenanceAccepted: true,
        miniKvV84NoManagedAuditWrite: true,
        packetShapeBoundToContract: true,
        packetDigestValid: true,
        tempDirectoryOnly: true,
        appendCovered: true,
        queryCovered: true,
        digestCovered: true,
        cleanupCovered: true,
        javaMiniKvWriteBlocked: true,
        noRealApprovalDecisionCreated: true,
        noExternalAuditAccessed: true,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        productionAuditStillBlocked: true,
        readyForManagedAuditIdentityApprovalProvenanceDryRunPacket: true,
      },
      summary: {
        appendPacketCount: 1,
        queryResultCount: 1,
        productionBlockerCount: 0,
      },
    });
    expect(profile.sourceBindingContract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.dryRunPacket.packetId).toMatch(/^[0-9a-f-]{36}$/);
    expect(profile.dryRunPacket.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.dryRunPacket.correlation.traceDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.digestAfterAppend).toBe(profile.verification.digestAfterRepeatRead);
    expect(profile.verification.packetVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.dryRunDirectoryRemoved).toBe(true);
  });

  it("blocks when upstream actions are enabled", async () => {
    const config = loadTestConfig({
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const profile = await loadManagedAuditIdentityApprovalProvenanceDryRunPacket({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
    });

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForManagedAuditIdentityApprovalProvenanceDryRunPacket).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.verification.dryRunDirectoryRemoved).toBe(true);
    expect(profile.dryRunPacket.boundaries.productionAuditRecordAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-identity-approval-provenance-dry-run-packet.v1",
        packetState: "dry-run-packet-verified",
        readyForProductionAudit: false,
        dryRunPacket: {
          approvalDecision: {
            upstreamTouched: false,
          },
          provenance: {
            miniKvRetentionProvenanceCheckDigest: "fnv1a64:357cc7e9eec3f223",
          },
        },
        verification: {
          appendPacketCount: 1,
          queryByRequestIdCount: 1,
          dryRunDirectoryRemoved: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit identity approval provenance dry-run packet");
      expect(markdown.body).toContain("java-release-approval-rehearsal-approval-record-handoff-hint.v1");
      expect(markdown.body).toContain("START_POST_V211_MANAGED_AUDIT_PLAN");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-211",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v211-packet",
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
    PORT: "4308",
    ...overrides,
  });
}

class ThrowingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit provenance packet must not call Java");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("managed audit provenance packet must not call Java");
  }

  releaseApprovalRehearsal(): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
    throw new Error("managed audit provenance packet must not call Java");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit provenance packet must not call mini-kv");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("managed audit provenance packet must not call mini-kv");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("managed audit provenance packet must not call mini-kv");
  }

  execute(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("managed audit provenance packet must not call mini-kv");
  }
}
